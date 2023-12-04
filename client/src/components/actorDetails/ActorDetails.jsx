import React, { useEffect, useState } from 'react';
import './ActorDetails.css';
import { Link, useParams } from 'react-router-dom';
import { actors, shows, urlBuilder } from '../../services/showService';
import { extractYear, plotRating } from '../../utilities/showUtility';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';

export default function ActorDetails() {
    const { actorId } = useParams();
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(actorId);

        actors.oneActor.details(actorId)
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

    return (
        <div className='actor-details-ctr'>
            <h1>Actor Details</h1>
        </div>
    )
}
