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

    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">

                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}/>
                        <Playlist playlistName={this.state.playlistName}
                                  playlistTracks={this.state.playlistTracks}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;