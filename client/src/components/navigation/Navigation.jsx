import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext';
import './Navigation.css';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { NavBtn } from '../shared/navBtn/NavBtn.jsx';

export default function Navigation() {
    const { user } = useAuth();
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
                {/* NAV => SHOWS */}
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <Link to='/shows' onClick={navHandler} className='nav-a'>
                        {mobileWidth ? 'Shows' : (<span className="material-symbols-outlined">smart_display</span>)}
                    </Link>
                    <div className='tooltip'>Shows</div>
                </li>
                {/* NAV => ACTORS */}
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <Link to='/actors' onClick={navHandler} className='nav-a'>
                        {mobileWidth ? 'Actors' : (<span className="material-symbols-outlined">person</span>)}
                    </Link>
                    <div className='tooltip'>Actors</div>
                </li>
                {/* NAV => SCHEDULE */}
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <Link to='/schedule' onClick={navHandler} className='nav-a'>
                        {mobileWidth ? 'Schedule' : (<span className="material-symbols-outlined">calendar_month</span>)}
                    </Link>
                    <div className='tooltip'>Schedule</div>
                </li>
                {/* NAV => SIGN UP */}
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <Link to='/user/sign-up' onClick={navHandler} className='nav-a'>
                        {mobileWidth ? 'Sign Up' : (<span className="material-symbols-outlined">person_add</span>)}
                    </Link>
                    <div className='tooltip'>Sign Up</div>
                </li>
                {/* NAV => SIGN IN */}
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <Link to='/user/sign-in' onClick={navHandler} className='nav-a'>
                        {mobileWidth ? 'Sign In' : (<span className="material-symbols-outlined">login</span>)}
                    </Link>
                    <div className='tooltip'>Sign In</div>
                </li>

                {/* PROTECTED ROUTES BELOW */}
                {/* NAV => PROFILE */}
                {/* <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <Link to='/user/profile' onClick={navHandler} className='nav-a'>
                        {mobileWidth ? 'My Profile' : (<span className="material-symbols-outlined">account_circle</span>)}
                    </Link>
                    <div className='tooltip'>My Profile</div>
                </li> */}

                <NavBtn target={'My Profile'} check={mobileWidth} handler={navHandler} user={user} />



                {/* NAV SEARCH & NAV LOGOUT should be separate entities */}

                {/* Future protected routes 

                <div id="user-links"> Enclose respective nav links here </div>
                <div id="guest-links"> Enclose respective nav links here </div>
        
                - PROFILE
                - LOGOUT
                - SEARCH -> to add to protected
                - SCHEDULE -> to add to protected
                - ACTORS -> to add to protected
                - Also limit shows in some way - figure it out later!
                
                */}
                {/* <li className="nav-link a-left"><a href="javascript:void(0)">Profile</a></li> */}
            </ul>
        </header>
        // the profile can be here as well - TODO later on!
    )
}





{/* <li className="nav-link a-left" title='Search'>
    <a href="javascript:void(0)"><span className="material-symbols-outlined">search</span></a>
</li>
<li className="nav-link a-left" title='Log In'>
    <a href="javascript:void(0)"><span className="material-symbols-outlined">login</span></a>
</li>
<li className="nav-link a-left" title='Sign Up'>
    <a href="javascript:void(0)"><span className="material-symbols-outlined">person_add</span></a>
</li>
<li className="nav-link a-left" title='Log Out'>
    <a href="javascript:void(0)"><span className="material-symbols-outlined">logout</span></a>
</li>
<li className="nav-link a-left" title='Profile Modal'> 
// Change title when the modal is implemented
<a href="javascript:void(0)"><span className="material-symbols-outlined">account_circle</span></a>
</li> */}

{/* <li className="nav-link a-left tooltip-anchor">
<a href="javascript:void(0)">Sign In</a>
<div className='tooltip'>Sign In</div>
</li> */}

