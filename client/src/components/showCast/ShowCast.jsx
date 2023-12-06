import React, { useEffect, useState } from 'react';
import './ShowCast.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import { getUniqueArr, plotNum, plotRating } from '../../utilities/showUtility';
import RemovedFromDB from '../shared/removedFromDB/RemovedFromDB';


export default function ShowCast() {
    const { showId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(showId);

        shows.oneShow.showCast(showId)
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
            : (p.length > 0 ? (<>
                <div className="show-cast-ctr">
                    <h1>Show Cast</h1>
                    <div className="top-links">
                        <Link className='btn' to={`/shows/${showId}/details`}>Main Details</Link>
                        <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                        <Link className='btn' to={`/shows/${showId}/episodes`}>All episodes</Link>
                    </div>
                    {p.map((x, i, arr) => (
                        <article key={`${x.person.id}-cast-${x.character.id}`} data-id={x.person.id}>
                            <section className='cast-img'>
                                {x.character.image
                                    ? (<img src={x.character.image.medium} alt="img" />)
                                    : (<div className='no-img'>No Image Available</div>)}
                            </section>
                            <section className='cast-info'>
                                <div>Actor:</div>
                                <div>{x.person.name}</div>
                                <div>Character:</div>
                                <div>{x.character.name}</div>
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
