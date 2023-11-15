import React, { useEffect, useState } from 'react';
import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext';
import './Navigation.css';

export default function Navigation() {
    const [topScroll, setTopScroll] = useState(true);

    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    useEffect(() => {
        const scrollHandler = (e) => {
            const scrollPos = window.scrollY;
            if (scrollPos > 10) setTopScroll(false);
            else setTopScroll(true);
        };
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <header className={`main-header ${!topScroll && 'scrolled'}`}>
            <div className="logo" onClick={toggleTheme}>
                {/* 
                - REPLACE THE TOGGLE WITH A CHECKBOX. 
                - Figure out the positioning.
                - Figure out a space outside the ul for the future Profile circle 
                */}
                <a href="javascript:void(0)">TV Kingdom</a>
            </div>

            <input type="checkbox" className='menu-btn' id='menu-btn' />
            <label htmlFor="menu-btn" className='menu-icon'>
                <span className='menu-icon__line'></span>
            </label>

            <ul className="nav-links">
                <li className="nav-link a-left"><a href="javascript:void(0)">Shows</a></li>
                <li className="nav-link a-left"><a href="javascript:void(0)">Actors</a></li>
                <li className="nav-link a-left"><a href="javascript:void(0)">Schedule</a></li>
                <li className="nav-link a-left"><a href="javascript:void(0)">Search</a></li>
                <li className="nav-link a-left"><a href="javascript:void(0)">Profile</a></li> {/* Placeholder for Sign In, Sign Up or Profile Icon 
            - figure out where it goes on mobile res */}
            </ul>
        </header>
        // the profile can be here as well - TODO later on!
    )
}
