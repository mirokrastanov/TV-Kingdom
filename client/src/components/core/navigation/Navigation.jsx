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
                <li className="nav-link a-left"><a href="javascript:void(0)">Log In</a></li>
                <li className="nav-link a-left"><a href="javascript:void(0)">Sign Up</a></li>

                {/* Future protected routes */}
                {/* <li className="nav-link a-left"><a href="javascript:void(0)">Profile</a></li> */}
            </ul>
        </header>
        // the profile can be here as well - TODO later on!
    )
}



/*

<li className="nav-link a-left" title='Search'>
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
</li>

*/
