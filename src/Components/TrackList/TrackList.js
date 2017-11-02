import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/* render each track in the tracks property */}
                {this.props.tracks.map(track =>
                    <Track key={track.ID}
                           track={track}
                           onAdd={this.props.onAdd}
                           onRemove={this.props.onRemove}
                           isRemoval={this.props.isRemoval}
                    />
                )}
            </div>
        );
    }
}

export default TrackList;