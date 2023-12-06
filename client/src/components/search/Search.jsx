import React, { useState } from 'react';
import './Search.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useEffect } from 'react';
import { search } from '../../services/showService.js';
import PageLoader from '../shared/pageLoader/PageLoader.jsx';
import ShowCard from '../showCard/ShowCard.jsx';
import ActorCard from '../actorCard/ActorCard.jsx';


export default function Search() {
    const [showResults, setShowResults] = useState([]);
    const [personResults, setPersonResults] = useState([]);
    const [resType, setResType] = useState('shows');
    const [loading, setLoading] = useState(true);
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
        setLoading(false);

        // return () => { updateSearchValue('') }
    }, []);

    function searchOnChangeHandler(e) {
        updateSearchValue(e.target.value);
    };

    async function searchOnSubmitHandler(e) {
        e.preventDefault();
        if (searchValue == '') return;

        await loadResults();
    };

    function switchSelected() {
        if (resType == 'shows') setResType('actors');
        else setResType('shows');
    }

    async function loadResults() {
        setLoading(true);

        search.shows(searchValue)
            .then(sData => {
                // console.log(sData);
                setShowResults(sData);
                setLoading(false);

                search.actors(searchValue)
                    .then(pData => {
                        // console.log(pData);
                        setPersonResults(pData);

                        setLoading(false);
                    })
                    .catch(err => {
                        // console.log(err.message);
                        setLoading(false);
                    })
            })
            .catch(err => {
                // console.log(err.message);
                setLoading(false);
            })
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
            <div id="controls-res" onClick={switchSelected}>
                <div className={resType == 'shows' ? 'selected-res' : ''}>Shows</div>
                <div className={resType == 'actors' ? 'selected-res' : ''}>People</div>
            </div>
            <div id="showResults-ctr">
                {searchValue != '' && (showResults.length > 0 || personResults.length) > 0 && (loading
                    ? (<PageLoader />)
                    : (<>
                        <div id="s-r-1" className={`${resType == 'actors' ? 'hidden-res-ctr' : ''} cards-cage`}>
                            {showResults.map(s => (<ShowCard key={`${s.show.id}-shows`} {...s.show} />))}
                            {showResults.length == 0 && (<h2>No results</h2>)}
                        </div>
                        <div id="p-r-2" className={`${resType == 'shows' ? 'hidden-res-ctr' : ''} cards-cage`}>
                            {personResults.map(p => (<ActorCard key={`${p.person.id}-person`} {...p.person} />))}
                            {personResults.length == 0 && (<h2>No results</h2>)}
                        </div>
                    </>)
                )}
            </div>
        </div>
    )
};
