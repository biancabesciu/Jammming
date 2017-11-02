import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify  from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        /* pass the state of a user's custom playlist title and tracks
           from the App component down to components that render them */
        this.state = {
            playlistName: 'New playlist',
            playlistTracks: [],
            searchResults: [] /* pass the state of a search results parameter
                                 through a series of components to render an Array of tracks
                              */
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    /* adding a song to the Playlist state */
    addTrack(track) {
        let isOnTrack = false;
        //check if the current song is in the playlistTracks state
        this.state.playlistTracks.forEach(playlistTrack => {
            if (playlistTrack.URI === track.URI) {
                isOnTrack = true;
            }
        });

        //if the id is new, add a song to the end of the playlist
        if (!isOnTrack) {
            this.state.playlistTracks.push(track);
            this.setState({ playlistTracks: this.state.playlistTracks });
        }
    }

    /* removing a song to the Playlist state */
    removeTrack(track) {
        //uses the tracks'id property to filter it out of the playlistTracks
        const playlistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.URI !== track.URI);
        this.setState({ playlistTracks: playlistTracks });
    }

    /* change the name of the playlist
     * save the updated value to the App's state */
    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    /* save a user's playlist to their Spotify account
       and resets the state of the playlist name and tracks array. */
    savePlaylist() {
        const trackUris = this.state.playlistTracks.map(track => track.URI);

        if (trackUris.length > 0) {
            Spotify.savePlaylist(this.state.playlistName, trackUris)
                .then(() => {
                this.setState({
                    searchResults: [],
                    playlistName: 'New Playlist',
                    playlistTracks: [] });
            })
        } else {
            console.log('No tracks to add');
        }

    }

    /* updates the searchResults parameter in the App component
       with a user's search results */
    search(term) {
        if (term !== '') {
            Spotify.search(term).then(results => {
                console.log(results);
                /* update the state of searchResults with the value
                   resolved from Spotify.search()'s promise */
                this.setState({ searchResults: results })
            });
        } else {
            this.setState({ searchResults: [] })
        }
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />

                    <div className="App-playlist">
                        {/* pass the state of the App component's searchResults
                          to the SearchResults component */}
                        <SearchResults searchResults={this.state.searchResults}
                                       onAdd={this.addTrack} />

                        {/* pass the playlist name and tracks from the App component
                           to the Playlist component */}
                        <Playlist playlistName={this.state.playlistName}
                                  playlistTracks={this.state.playlistTracks}
                                  onRemove={this.removeTrack}
                                  onNameChange={this.updatePlaylistName}
                                  onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;