import React from 'react';

//data for accessing Spotify API
const clientId = '669912399392e43e3a4ed3806edd90acf';
const redirectURI = 'http://localhost:3000/';
const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
let accessToken = '';


const headers = { headers: { Authorization: `Bearer ${accessToken}` } };


const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        }

        //check if access token is obtained
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if(urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            let expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            //This clears the parameters, allowing
            //to grab a new access token when it expires
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        //if not get an access token
        } else {
                window.location = url;
        }

    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace('', '%20')}`;

        return fetch(searchUrl,
            {headers: headers
        })
            .then(response => response.json()).then(jsonResponse => {
            if(!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            });

        });
    },

    savePlaylist(playlistName, playlistTracks) {
        if(!playlistName || !playlistTracks) return;

            let userId = '';
            let playlistId = '';
            const userUrl = `https://api.spotify.com/v1/me`;

            //GET user ID
            return fetch(userUrl, {
                headers: headers
            })
                .then(response => response.json())
                .then(jsonResponse => userId = jsonResponse.id)
                .then(() => {
                    const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
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
                            const addPlaylistTracksUrl = `${createPlaylistUrl}/${playlistId}/tracks`;
                            return fetch(addPlaylistTracksUrl, {
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


