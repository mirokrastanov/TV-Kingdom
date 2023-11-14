import React from 'react';
import './Navbar.css';

export default function Navbar() {

  return (
    <header className='main-header'>
        <div className="logo">
            <a href="javascript:void(0)">TV Kingdom</a>
        </div>

        <input type="checkbox" className='menu-btn' id='menu-btn' />
        <label htmlFor="menu-btn" className='menu-icon'>
            <span className='menu-icon__line'></span>
        </label>

        <ul className="nav-links">
            <li className="nav-link"><a href="javascript:void(0)">Shows</a></li>
            <li className="nav-link"><a href="javascript:void(0)">Actors</a></li>
            <li className="nav-link"><a href="javascript:void(0)">Schedule</a></li>
            <li className="nav-link"><a href="javascript:void(0)">Search</a></li>
            <li className="nav-link"><a href="javascript:void(0)">Profile</a></li> {/* Placeholder for Sign In, Sign Up or Profile Icon 
            - figure out where it goes on mobile res */}
        </ul>
    </header>
  )
}
