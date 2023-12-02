import React from 'react';
import { useEffect } from 'react';

export function NavSearch({ searchValue, checks = [], user, handlers = [] }) {
    const [searchShown, mobileWidth] = checks;
    const [searchToggleHandler, searchOnSubmitHandler, searchOnChangeHandler] = handlers;

    useEffect(() => {
        // console.log(searchValue, checks, handlers, user);
    }, [])

    if (user) {
        return (<li className={`nav-link ${searchShown || mobileWidth ? '' : 'a-left tooltip-anchor'}`}
            onClick={searchToggleHandler}>
            <a className={mobileWidth ? 'search-mobile' : ''}>{mobileWidth ? 'Search' : (
                <div className="search-slider-ctr">
                    <div className={`search${searchShown ? ' active' : ''}`}>
                        <div className="icon">
                            <span className="material-symbols-outlined"
                            >{searchShown ? 'search_off' : 'search'}</span>
                        </div>
                        <form className="input" onSubmit={searchOnSubmitHandler}>
                            <input
                                type="text"
                                placeholder='Search...'
                                id='my-search'
                                value={searchValue}
                                onChange={searchOnChangeHandler} />
                        </form>
                    </div>
                </div>
            )}</a>
            <div className='tooltip'>Search</div>
        </li>)
    }
    return null;
}