//data for accessing Spotify API
const clientId = '69912399392e43e3a4ed3806edd90acf';
const redirectUri = 'http://localhost:3000/';

let userAccessToken = '';

const Spotify = {
    /* method accepts a search term input,
       passes the search term value to a Spotify request,
       then returns the response as a list of tracks in JSON format
    */
    search: async function (term) {
        this.getUserAccessToken();
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAccessToken
                }
            });

            if (response.ok) {
                let jsonResponse = await response.json();

                let tracks = jsonResponse.tracks.items.map(track => {
                    return {
                        ID: track.id,
                        Artist: track.artists[0].name,
                        Name: track.name,
                        Album: track.album.name,
                        URI: track.uri
                    }
                });
                return tracks;
            }
            throw new Error('Error on retrieving data from Spotify API');

        } catch (error) {
            console.log(error);
        }
    },

    savePlaylist: async function (name, tracks) {
        this.getUserAccessToken();

        /* check if there are values saved to the method's name and tracks
           if not, return*/
        if (!tracks || name === undefined) {
            return
        }

        try {
            // Get user info

            /* request that returns the user's Spotify username
               convert the response to JSON and
               save the response to the userInfo variable
            */
            let headers = { 'Authorization': 'Bearer ' + userAccessToken };
            let urlUserInfo = 'https://api.spotify.com/v1/me';
            let response = await fetch(urlUserInfo, { headers: headers });

            if (!response.ok) {
                throw new Error('Fail to get user info');
            }

            let userInfo = await response.json();

            // Create new playlist for user
            headers = { ...headers, 'Content-Type': 'application/json' };
            const urlPlaylist = `https://api.spotify.com/v1/users/${userInfo.id}/playlists`;

            response = await fetch(urlPlaylist, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ name: name })
                }
            );

            if (!response.ok) {
                throw new Error('Fail to create playlist');
            }
            
            let playlistInfo = await response.json();
            let playlistId = playlistInfo.id;
            const urlPlaylistTracks = `https://api.spotify.com/v1/users/${userInfo.id}/playlists/${playlistId}/tracks`;
            response = await fetch(urlPlaylistTracks, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: tracks })
            });

            if (!response.ok) {
                throw new Error('Fail to add tracks to playlist');
            }
        } catch (error) {
            console.log(error);
        }

    },

    /* get a user's access token so that they can make requests to the Spotify API */
    getUserAccessToken: function () {
        /* check if the user's access token is already set
           if so, return the value saved to access token */
        if (userAccessToken) {
            return userAccessToken;
        }

        /* if the access token and expiration time are in the URL,
           implement the following steps:
                *set the access token value
                *set a variable for expiration time
        */
        else if (window.location.href.match(/access_token=([^&]*)/) !== null) {
            userAccessToken = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1];
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split("=")[1];

            /* set the access token to expire at the value for expiration time */
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);

            /* clear the parameters from the URL,
            so the app doesn't try grabbing the access token after it has expired */
            window.history.pushState('Access Token', null, '/');

        } else {
            /* check the URL to see if it has just been obtained */
            const authUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

            console.log(authUri);
            window.location.href = authUri;
        }
    }
};

export default Spotify;
