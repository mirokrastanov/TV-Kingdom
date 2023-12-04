import React, { useEffect, useState } from 'react';
import './ShowSeasons.css';
import { Link, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';

export default function ShowSeasons() {
    const { showId } = useParams();
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(showId);

        shows.oneShow.seasons(showId)
            .then(data => {
                console.log(data);
                setP(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
            })

        return () => { };
    }, []);

    return (<>
        {loading
            ? (<PageLoader />)
            : (<div className="show-extra-ctr">
                <h1>Show Name</h1>
                <h2>Seasons</h2>
                <div className="show-extra-data">

                </div>
            </div>)
        }
    </>);
}