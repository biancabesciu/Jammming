import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    render() {
        return (
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album"
                />
                <a>SEARCH</a>
            </div>
        )
    }
}

export default SearchBar;