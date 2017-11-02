import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        //bind this.method to the current value of this
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    /* accept an event that is triggered by an onChange attribute
       in the Playlist component's <input> element */
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return(
            <div className="Playlist">
                <input defaultValue={this.props.name}
                       onChange={this.handleNameChange}
                       placeholder="Enter Playlist Name"

                />

                {/* pass the playlist tracks from the Playlist component
                to the TrackList component */}
                <TrackList tracks={this.props.playlistTracks}
                           isRemoval = {true}
                           onAdd={this.props.onAdd}
                           onRemove={this.props.onRemove}

                />
                <a className="Playlist-save"
                   onClick={this.props.onSave}
                >SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;