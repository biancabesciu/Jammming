import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify  from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: 'New playlist',
            playlistTracks: [],
            searchResults: []
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let isOnTrack = false;
        this.state.playlistTracks.forEach(playlistTrack => {
            if (playlistTrack.URI === track.URI) {
                isOnTrack = true;
            }
        });

        if (!isOnTrack) {
            this.state.playlistTracks.push(track);
            this.setState({ playlistTracks: this.state.playlistTracks });
        }
    }

    removeTrack(track) {
        const playlistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.URI !== track.URI);
        this.setState({ playlistTracks: playlistTracks });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        const trackUris = this.state.playlistTracks.map(track => track.URI);

        if (trackUris.length > 0) {
            Spotify.savePlaylist(this.state.playlistName, trackUris)
                .then(results => {
                this.setState({
                    searchResults: [],
                    playlistName: 'New Playlist',
                    playlistTracks: [] });
            });
        } else {
            console.log('No tracks to add');
        }

    }
    search(term) {
        if (term !== '') {
            Spotify.search(term).then(results => {
                console.log(results);
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
                        <SearchResults searchResults={this.state.searchResults}
                                       onAdd={this.addTrack} />

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