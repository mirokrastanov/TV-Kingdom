import React from 'react';
import './Search.css';

export default function Search() {

    return (
        <div className="search-page-ctr">
            <div id="form-ctr">
                <h1>Search</h1>
                <form>
                    <input type="text" placeholder='Type Keywords...' name='search' />
                    <span className="s-icon material-symbols-outlined">search</span>
                </form>
                <h4>Navigate through an extensive database featuring a diverse array of shows, actors, and crew members.</h4>
            </div>
            <div id="results-ctr">
                {/* New component here. Would receive props from search res */}
            </div>
        </div>
    )
};
