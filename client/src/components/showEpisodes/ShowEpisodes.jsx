import React, { useEffect, useState } from 'react';
import './ShowEpisodes.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import { getUniqueArr, plotNum, plotRating } from '../../utilities/showUtility';


export default function ShowEpisodes() {
    const { showId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(showId);

        shows.oneShow.episodes(showId)
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
            : (<div className="show-extra-ctr one-season episodes">
                <h1>Episodes</h1>
                <div className="top-links-ctr-each">
                    <Link className='btn' to={`/shows/${showId}/details`}>Main Details</Link>
                    <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                </div>
                {p.map(x => (
                    <div className="topper" key={`${x.id}-one-season`} data-id={x.id} >
                        <div className="show-extra-data">
                            <div className="s-n">{x.number}</div>
                            <article>
                                {x.image
                                    ? (<img src={x.image.original} alt="episode-img" />)
                                    : (<img style={{ background: 'var(--color-accent-2)' }} src='/src/assets/replace-img.jpg' alt="episode-img" />)}
                            </article>
                            <article>
                                <p>Episode: <b>s{plotNum(x.season)} e{plotNum(x.number)}</b></p>
                                <p><b>{x.name}</b></p>
                                <div className='rating-ctr'>
                                    {plotRating(x.rating.average).map((x, i) => {
                                        if (x == 1) return (<span key={`rating-${i}-${x.id}`} className='material-symbols-outlined fill-n-thin-symbol'>star</span>);
                                        else if (x > 0 & x < 1) return (<span key={`rating-${i}-${x.id}`} className='material-symbols-outlined thin-symbol'>star_half</span>);
                                        else return (<span key={`rating-${i}-${x.id}`} className='material-symbols-outlined thin-symbol'>star</span>);
                                    })}
                                    <span className='rating-num'>{x.rating.average ?? 0}/10</span>
                                </div>
                                <p>Air date: <b>{x.airdate}</b></p>
                                <p>Air time: <b>{x.airtime}</b></p>
                            </article>
                        </div>
                        {x.summary
                            ? (<SummaryComplete summary={x.summary} />)
                            : (<p>We don't have a summary for episode {x.number} yet.</p>)}
                    </div>
                ))}
            </div>)
        }
    </>);
}