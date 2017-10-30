import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Reac.Component {
    render() {
        return(
            <div className="Playlist">
                <input defaultValue={"New Playlist"}/>
                <TrackList tracks={this.props.playlistTracks}
                           onAdd={this.props.onAdd}
                           onRemove={this.props.onRemove}

                />
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;