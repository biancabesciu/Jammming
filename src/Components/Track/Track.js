import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        //bind this.method to the current value of this
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <a className="Track-action"
                      id={this.props.track.key}
                      /* remove track when clicking on "-" */
                      onClick={this.removeTrack}

            >-</a>

        } else {
            return <a className="Track-action"
                      id={this.props.track.key}
                      /* add track when clicking on "+" */
                      onClick={this.addTrack}

            >+</a>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    {/* render the track name, artist, and album */}
                    <h3>{this.props.track.Name}</h3>
                    <p>{this.props.track.Artist} | {this.props.track.Album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;