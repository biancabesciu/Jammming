import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {/* pass the search results from the SearchResults component
                  to the TrackList component */}
                <TrackList tracks={this.props.searchResults}
                           isRemoval = {false}
                           onAdd={this.props.onAdd}

                />
            </div>
        )
    }
}

export default SearchResults;