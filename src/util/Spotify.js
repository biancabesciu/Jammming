import React from 'react';

//data for accessing Spotify API
const clientId = '69912399392e43e3a4ed3806edd90acf';
const redirectURI = 'http://localhost:3000/';
const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
let accessToken = '';


const apiURL = 'https://api.spotify.com/v1';
const headers = { headers: { Authorization: `Bearer ${accessToken}` } };


const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        }

        //check if access token is obtained
        let curentUrl = window.location.href;
        if(curentUrl.match(/access_token=([^&]*)/) && curentUrl.match(/expires_in=([^&]*)/)) {
            accessToken = curentUrl.match(/access_token=([^&]*)/);
            const expiresIn = curentUrl.match(/expires_in=([^&]*)/);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        //if not get an access token
        } else {
            if(!accessToken && curentUrl.match(/access_token=([^&]*)/)) {
                //retrieve access token from Spotify url and redirect to it
                return window.location = url;
            }
        }

    },

    search(term) {
        if(!accessToken) { Spotify.getAccessToken(); }
        const searchUrl = `${apiURL}/search?type=track&q=${term}`;

        return fetch(searchUrl, headers).then(response => response.json()).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        });
    },

    savePlaylist(playlistName, playlistTracks) {
        if(!playlistName || !playlistTracks) return;

            let userId = '';
            let playlistId = '';
            const userUrl = `${apiURL}me`;

            //GET user ID
            return fetch(userUrl, {headers: headers})
                .then(response => response.json())
                .then(jsonResponse => userId = jsonResponse.id)
                .then(() => {
                    const createPlaylistUrl = `${apiURL}/users/${userId}/playlists`;
                    return fetch(createPlaylistUrl, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            name: playlistName
                        })
                    })
                        //POST tracks to the new Playlist
                        .then(response => response.json())
                        .then(jsonResponse => playlistId = jsonResponse.id)
                        .then(() => {
                            const addPlaylistTRacksUrl = `${createPlaylistUrl}/${playlistId}/tracks`;
                            return fetch(addPlaylistTRacksUrl, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({
                                    uris: playlistTracks
                                })
                            });
                        })
                });

    },

};

export default Spotify;


