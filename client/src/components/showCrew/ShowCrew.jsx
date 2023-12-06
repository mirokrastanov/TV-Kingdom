import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import RemovedFromDB from '../shared/removedFromDB/RemovedFromDB';


export default function ShowCrew() {
    const { showId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log(showId);

        shows.oneShow.showCrew(showId)
            .then(data => {
                // console.log(data);
                setP(data);
                setLoading(false);
            })
            .catch(err => {
                // console.log(err.message);
            })

        return () => { };
    }, []);


    return (<>
        {loading
            ? (<PageLoader />)
            : (p.length > 0 ? (<>
                <div className="show-cast-ctr">
                    <h1>Show Crew</h1>
                    <div className="top-links">
                        <Link className='btn' to={`/shows/${showId}/details`}>Main Details</Link>
                        <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                        <Link className='btn' to={`/shows/${showId}/episodes`}>All episodes</Link>
                    </div>
                    {p.map((x, i, arr) => (
                        <article key={`${x.person.id}-crew-${x.type}`} data-id={x.person.id}>
                            <section className='cast-img'>
                                {x.person.image
                                    ? (<img src={x.person.image.medium} alt="img" />)
                                    : (<div className='no-img'>No Image Available</div>)}
                            </section>
                            <section className='cast-info'>
                                <div>Crew member:</div>
                                <div>{x.person.name}</div>
                                <div>Role:</div>
                                <div>{x.type}</div>
                                <Link className='btn' to={`/actors/${x.person.id}/details`}>Profile</Link>
                            </section>
                        </article>
                    ))}
                </div>
            </>) : (
                <div className="show-extra-ctr one-season"><RemovedFromDB /></div>
            ))
        }
    </>);
}
