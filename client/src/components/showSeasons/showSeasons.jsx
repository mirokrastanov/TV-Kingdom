import React, { useEffect, useState } from 'react';
import './ShowSeasons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';


export default function ShowSeasons() {
    const { showId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    function routeTo(e) {
        const url = e.currentTarget.dataset.id;
        navigate(url);
    };

    return (<>
        {loading
            ? (<PageLoader />)
            : (<div className="show-extra-ctr">
                <h1>Seasons</h1>
                <div className="top-links-ctr-each">
                    <Link className='btn' to={`/shows/${showId}/details`}>Main Details</Link>
                    <Link className='btn' to={`/shows/${showId}/episodes`}>Episodes</Link>
                </div>
                {p.map(x => (
                    <div key={`${x.id}-show-seasons`} data-id={x.id} className="show-extra-data" onClick={routeTo}>
                        <div className="s-n">{x.number}</div>
                        <article>
                            {x.image
                                ? (<img src={x.image.original} alt="season-img" />)
                                : (<img style={{ background: 'var(--color-accent-2)' }} src='/src/assets/replace-img.jpg' alt="season-img" />)}
                        </article>
                        <article>
                            {x.summary
                                ? (<SummaryComplete summary={x.summary} />)
                                : (<p>We don't have a summary for Season {x.number} yet.</p>)}
                            <p>Episodes: <b>{x.episodeOrder}</b></p>
                            <p>Premiere: <b>{x.premiereDate}</b></p>
                            <p>Ended: <b>{x.endDate ? x.endDate : '-'}</b></p>
                        </article>
                    </div>
                ))}
            </div>)
        }
    </>);
}