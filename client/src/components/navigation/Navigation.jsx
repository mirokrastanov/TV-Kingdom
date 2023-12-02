import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext';
import './Navigation.css';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { NavBtn } from '../shared/navBtn/NavBtn.jsx';
import { NavLogout } from '../navLogout/NavLogout.jsx';
import { NavSearch } from '../shared/navSearch/NavSearch.jsx';

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
                {/* USER */}
                <NavSearch searchValue={searchValue} user={user} checks={[searchShown, mobileWidth]}
                    handlers={[searchToggleHandler, searchOnSubmitHandler, searchOnChangeHandler]} />
                <NavBtn target={'Shows'} check={mobileWidth} handler={navHandler} user={user} />
                <NavBtn target={'Actors'} check={mobileWidth} handler={navHandler} user={user} />

                {/* ALL */}
                <NavBtn target={'Schedule'} check={mobileWidth} handler={navHandler} user={user} />

                {/* USER */}
                <NavBtn target={'My Profile'} check={mobileWidth} handler={navHandler} user={user} />

                {/* GUEST */}
                <NavBtn target={'Sign Up'} check={mobileWidth} handler={navHandler} user={user} />
                <NavBtn target={'Sign In'} check={mobileWidth} handler={navHandler} user={user} />

                {/* USER */}
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
