import React from 'react';
import { Link } from 'react-router-dom';
import './RemovedFromDB.css';

export default function RemovedFromDB() {



    return (
        <div className='removed-from-db'>
            <h2>Unavailable or nonexistant in DB.</h2>
            <h2>Quick links</h2>
            <div className="top-links-ctr-each">
                <Link className='btn' to={`/shows`}>Shows</Link>
                <Link className='btn' to={`/actors`}>Actors</Link>
                <Link className='btn' to={`/schedule`}>Schedule</Link>
            </div>
        </div>
    )
}
