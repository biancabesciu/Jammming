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
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

    }

    addTrack(track) {
        let currentPlaylistArray = this.state.playlistTracks.concat(track);
        this.setState({playlistTracks: currentPlaylistArray});
    }

    removeTrack(track) {
        let currentPlaylistArray = this.state.playlistTracks;
        this.setState({playlistTracks: currentPlaylistArray})

    }

    updatePlaylistName(name) {
        this.setState({playlistName: name})
    }

    savePlaylist() {
        let playlistArray = this.state.playlistTracks;
        let uriArray = playlistArray.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, uriArray);
        this.setState({playlistTracks: [], playlistName: 'New Playlist'});
     }

     search(term) {
        Spotify.search(term).then(results => Array.from(results)).then(trackArray => {
            this.setState({searchResults: trackArray})
        });
     }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>

                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}
                                       onAdd={this.addTrack}
                                       onRemove={this.removeTrack}

                        />
                        <Playlist playlistTracks={this.state.playlistTracks}
                                  name={this.state.playlistName}
                                  onNameChange={this.updatePlaylistName}
                                  onSave={this.savePlaylist}
                                  onAdd={this.addTrack}
                                  onRemove={this.removeTrack()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;