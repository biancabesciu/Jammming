import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchResults: [], playlistTracks: [], playlistName: 'New Playlist'};
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

    }

    addTrack(track) {
        let currentPlaylistArray = this.state.playlistTracks.concat(track);
        this.setState({playlistTracks: currentPlaylistArray});
    }

    removeTrack(track) {
        let currentPlaylistArray = this.state.playlistTracks;
        this.setState({playlistTracks: currentPlaylistArray})

    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">

                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}
                                       onAdd={this.addTrack}
                                       onRemove={this.removeTrack}

                        />
                        <Playlist playlistName={this.state.playlistName}
                                  playlistTracks={this.state.playlistTracks}
                                  onAdd={this.addTrack}
                                  onRemove={this.removeTrack()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;