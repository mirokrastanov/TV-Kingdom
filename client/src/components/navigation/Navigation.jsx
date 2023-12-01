import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext';
import './Navigation.css';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { NavBtn } from '../shared/navBtn/NavBtn.jsx';
import { NavLogout } from '../navLogout/NavLogout.jsx';

export default function Navigation() {
    const { user, logoutUser } = useAuth();
    const [topScroll, setTopScroll] = useState(true);
    const [mobileWidth, setMobileWidth] = useState(false);
    const [searchShown, setSearchShown] = useState(false);
    const [hamburgerShown, setHamburgerShown] = useState(false);

    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const searchValue = useSearch();
    const updateSearchValue = useSearchUpdate();
    const navigate = useNavigate();

    const scrollHandler = (e) => {
        const scrollPos = window.scrollY;
        if (scrollPos > 10) setTopScroll(false);
        else setTopScroll(true);
    };

    const screenResizeHandler = (e) => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 767) setMobileWidth(true);
        else setMobileWidth(false);
    };

    const hamburgerOnChangeHandler = (e) => {
        if (e.target.checked) setHamburgerShown(true);
        else setHamburgerShown(false);
    };

    const navHandler = (e) => {
        if (mobileWidth) setHamburgerShown(false);
    };

    const searchToggleHandler = (e) => {
        if (mobileWidth) {
            setHamburgerShown(false);
            updateSearchValue('');
            navigate('/search');
            return;
        }
        if (searchShown) {
            if (!e.target.classList.contains('material-symbols-outlined')) return;
            setSearchShown(false);
        }
        else setSearchShown(true);
    };

    const searchOnChangeHandler = (e) => {
        updateSearchValue(e.target.value);
    };

    const searchOnSubmitHandler = (e) => {
        e.preventDefault();
        setSearchShown(false);
        navigate('/search');
    };

    // TODO: Add form reset
    // TODO: Add errors as a state

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('load', screenResizeHandler);
        window.addEventListener('resize', screenResizeHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('load', screenResizeHandler);
            window.removeEventListener('resize', screenResizeHandler);
        };
    }, []);

    return (
        <header className={`main-header ${topScroll ? '' : 'scrolled'}`}>
            <div className="logo">
                {/* LOGO */}
                <Link className='home-link' to='/'>
                    TV Kingdom
                    <p className='powered-by'>Powered by: TVMAZE.com</p>
                </Link>
                {/* DARK MODE TOGGLE */}
                <div className="theme-toggle">
                    <input type="checkbox" id="darkmode-toggle" checked={darkTheme} onChange={toggleTheme} />
                    <label htmlFor="darkmode-toggle" className='tooltip-anchor'>
                        <span className="material-symbols-outlined">light_mode</span>
                        <div className='tooltip mode-tooltip'>{darkTheme ? 'Lights ON' : 'Go Dark'}</div>
                        <span className="material-symbols-outlined">dark_mode</span>
                    </label>
                </div>
            </div>
            {/* HAMBURGER MENU (MOBILE) */}
            <input checked={hamburgerShown} type="checkbox" className='menu-btn' id='menu-btn' onChange={hamburgerOnChangeHandler} />
            <label htmlFor="menu-btn" className='menu-icon'>
                <span className='menu-icon__line'></span>
            </label>

            <ul className="nav-links">
                {/* NAV => SEARCH */}
                <li className={`nav-link ${searchShown || mobileWidth ? '' : 'a-left tooltip-anchor'}`}
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
                </li>
                {/* NAV SEARCH should be separate entity & protected */}


                {/* USER ROUTES */}
                <NavBtn target={'Shows'} check={mobileWidth} handler={navHandler} user={user} />
                <NavBtn target={'Actors'} check={mobileWidth} handler={navHandler} user={user} />

                {/* SHARED ROUTES */}
                <NavBtn target={'Schedule'} check={mobileWidth} handler={navHandler} user={user} />

                {/* USER ROUTES */}
                <NavBtn target={'My Profile'} check={mobileWidth} handler={navHandler} user={user} />

                {/* GUEST ROUTES */}
                <NavBtn target={'Sign Up'} check={mobileWidth} handler={navHandler} user={user} />
                <NavBtn target={'Sign In'} check={mobileWidth} handler={navHandler} user={user} />


                {/* Logout to move inside My Profile after it's converted to a modal */}
                <NavLogout logout={logoutUser} check={mobileWidth} handler={navHandler} user={user} />

            </ul>
        </header>
    )
}




// {/* NAV => SHOWS */}
// <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
// <Link to='/shows' onClick={navHandler} className='nav-a'>
//     {mobileWidth ? 'Shows' : (<span className="material-symbols-outlined">smart_display</span>)}
// </Link>
// <div className='tooltip'>Shows</div>
// </li>

