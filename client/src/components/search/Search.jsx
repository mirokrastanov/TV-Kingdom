import React from 'react';
import './Search.css';

export default function Search() {

    return (
        <div className="search-page-ctr">
            <div id="form-ctr">
                <h1>Search</h1>
                <form>
                    <input type="text" placeholder='Type Keywords...' />
                    <span class="s-icon material-symbols-outlined">search</span>
                </form>
                <h3>Search among thousands of shows, actors and crew.</h3>
            </div>
            <div id="results-ctr">
                {/* New component here. Would receive props from search res */}
            </div>
        </div>
    )
};
