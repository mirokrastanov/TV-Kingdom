import React, { useEffect, useState } from 'react';
import { useTheme, useThemeUpdate } from '../../../contexts/ThemeContext';
import './Navigation.css';

export default function Navigation() {
    const [topScroll, setTopScroll] = useState(true);
    const [mobileWidth, setMobileWidth] = useState(false);

    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    useEffect(() => {
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
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <a href="javascript:void(0)">
                        {mobileWidth ? 'Shows' : (<span className="material-symbols-outlined">smart_display</span>)}
                    </a>
                    <div className='tooltip'>Shows</div>
                </li>
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <a href="javascript:void(0)">
                        {mobileWidth ? 'Actors' : (<span className="material-symbols-outlined">person</span>)}
                    </a>
                    <div className='tooltip'>Actors</div>
                </li>
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <a href="javascript:void(0)">
                        {mobileWidth ? 'Schedule' : (<span className="material-symbols-outlined">calendar_month</span>)}
                    </a>
                    <div className='tooltip'>Schedule</div>
                </li>
                <li className={`nav-link a-left${mobileWidth ? '' : ' tooltip-anchor'}`}>
                    <a href="javascript:void(0)">
                        {mobileWidth ? 'Sign In' : (<span className="material-symbols-outlined">login</span>)}
                    </a>
                    <div className='tooltip'>Sign In</div>
                </li>



                {/* Future protected routes */}
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

