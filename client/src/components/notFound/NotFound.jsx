import React from 'react';
import './NotFound.css';

export default function NotFound() {

    return (
        <>
            <div className="not-found-ctr">
                <h1>404</h1>
                <div className='upper'>
                    <h2>Page not found!</h2>
                </div>
                <div className='lower'>
                    <button>Home page</button>
                </div>
            </div>

        </>
    )
}
