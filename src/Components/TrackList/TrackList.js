import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
               <Track track={this.props.mapTracks()}
                      onAdd={this.props.onAdd}
                      onRemove={this.props.onRemove}

               />
            </div>
        );
    }
}

export default TrackList;