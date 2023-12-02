import React, { useState } from 'react';
import './Search.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useEffect } from 'react';


export default function Search() {
    const [results, setResults] = useState([1, 2, 3]);

    const { user } = useAuth();
    const searchValue = useSearch();
    const updateSearchValue = useSearchUpdate();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(searchValue);
    // }, [searchValue])

    useEffect(() => {
        // console.log(searchValue);
        if (searchValue != '') loadResults();

        return () => { updateSearchValue('') }
    }, []);

    function searchOnChangeHandler(e) {
        updateSearchValue(e.target.value);
    };

    function searchOnSubmitHandler(e) {
        e.preventDefault();


    };

    async function loadResults() {

    };

    return (
        <div className="search-page-ctr">
            <div id="form-ctr">
                <h1>Search</h1>
                <form onSubmit={searchOnSubmitHandler}>
                    <input
                        type="text"
                        placeholder='Type Keywords...'
                        name='search'
                        autoComplete='off'
                        value={searchValue}
                        onChange={searchOnChangeHandler}
                    />
                    <span className="s-icon material-symbols-outlined"
                        onClick={searchOnSubmitHandler}>search</span>
                </form>
                <h4>Navigate through an extensive database featuring a diverse array of shows, actors, and crew members.</h4>
            </div>
            <div id="results-ctr">
                {results.map(x => (
                    <div key={x}>x</div>
                    // create actorCard first - keep size the same az show card - just switch content inside
                    // determine whether the result is a show or a person and render showCard or actorCard for it
                ))}
            </div>
        </div>
    )
};
