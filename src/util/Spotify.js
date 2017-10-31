//data for accessing Spotify API
const clientId = '669912399392e43e3a4ed3806edd90acf';
const redirectUri ='http://venomous-lake.surge.sh/';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;

let accessToken = '';


const headers = { headers: { Authorization: `Bearer ${accessToken}` } };


const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else {
            //check if access token is obtained
            const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
            const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

            if(urlAccessToken && urlExpiresIn) {
                accessToken = urlAccessToken[1];
                let expiresIn = urlExpiresIn[1];
                window.setTimeout(() => accessToken = ' ', expiresIn * 1000);
                //This clears the parameters, allowing
                //to grab a new access token when it expires
                window.history.pushState('Access Token', null, '/');
                //if not get an access token
                return accessToken;
            } else {
                window.location = spotifyUrl;
            }
        }
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        return fetch(searchUrl, headers)
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

    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length) return;

            accessToken = Spotify.getAccessToken();
            let userId = '';
            let playlistId = '';
            const userUrl = 'https://api.spotify.com/v1/me';

            //GET user ID
            return fetch(userUrl, headers)
                .then(response => response.json())
                .then(jsonResponse =>  { userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            name: name
                        })
                })
                    //POST tracks to the new Playlist
                    .then(response => response.json())
                    .then(jsonResponse => {
                        playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackUris
                            })
                        });
                    })
                });

    },

};

export default Spotify;


