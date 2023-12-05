import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { episodes, urlBuilder } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import { plotNum, plotRating } from '../../utilities/showUtility';
import RemovedFromDB from '../shared/removedFromDB/RemovedFromDB';

export default function ShowEpisode() {
    const { episodeId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showId, setShowId] = useState(1);

    useEffect(() => {
        console.log(episodeId);

        episodes.oneEpisode.details(episodeId)
            .then(data => {
                console.log(data);
                setP(data);
                setShowId(data._embedded.show.id ?? 1);

                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            })

        return () => { };
    }, []);

    return (<>
        {loading
            ? (<PageLoader />)
            : (p.id ? (<div className="show-extra-ctr one-season">
                <h1>{p.name} </h1>
                <div className="top-links-ctr-each">
                    <Link className='btn' to={`/shows/${showId}/details`}>Main Details</Link>
                    <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                    <Link className='btn' to={`/shows/${showId}/episodes`}>All episodes</Link>
                </div>
                <div className="topper" key={`${p.id}-one-ep`} data-id={p.id} >
                    <div className="show-extra-data">
                        <article>
                            {p.image
                                ? (<img src={p.image.original} alt="episode-img" />)
                                : (<img style={{ background: 'var(--color-accent-2)' }} src='/src/assets/replace-img.jpg' alt="episode-img" />)}
                        </article>
                        <article>
                            <p>Show: <b>{p._embedded.show.name && p._embedded.show.name != '' ? p._embedded.show.name : '-'}</b></p>
                            <div className='rating-ctr'>
                                {plotRating(p.rating.average).map((x, i) => {
                                    if (x == 1) return (<span key={`rating-${i}-${p.id}`} className='material-symbols-outlined fill-n-thin-symbol'>star</span>);
                                    else if (x > 0 & x < 1) return (<span key={`rating-${i}-${p.id}`} className='material-symbols-outlined thin-symbol'>star_half</span>);
                                    else return (<span key={`rating-${i}-${p.id}`} className='material-symbols-outlined thin-symbol'>star</span>);
                                })}
                                <span className='rating-num'>{p.rating.average ?? 0}/10</span>
                            </div>
                            <p>s{plotNum(p.season)} e{plotNum(p.number)}</p>
                            <p>Air date: <b>{p.airdate && p.airdate != '' ? p.airdate : '-'}</b></p>
                            <p>Air time: <b>{p.airtime && p.airtime != '' ? p.airtime : '-'}</b></p>
                            <p>Duration: <b>{p.runtime && p.runtime != '' ? p.runtime + ' min' : '-'}</b></p>
                            <p>Show: <b>{p._embedded.show.name && p._embedded.show.name != '' ? p._embedded.show.name : '-'}</b></p>


                        </article>
                    </div>
                    {p.summary
                        ? (<SummaryComplete summary={p.summary} />)
                        : (<p>We don't have a summary for episode {p.number} yet.</p>)}
                    {/* <div><h3>Guest stars</h3></div>
                    <div className="top-cast">
                        {!p._embedded.guestcast || p._embedded.guestcast.length == 0 ? (<p>None</p>) : (null)}
                        {p._embedded.guestcast && (getUniqueArr(p._embedded.guestcast).map(y => (
                            y.person.image && (
                                <div key={`${y.person.id}-${y.character.id}-${p.id}`} className='tooltip-anchor'>
                                    <div key={y.person.id} className='img-circle-sm'><Link to={`/actors/${y.person.id}/details`}>
                                        <img src={y.person.image.medium} alt="member-img" />
                                    </Link>
                                    </div>
                                    <div className="tooltip">{y.person.name}</div>
                                </div>
                            )
                        )))}
                    </div> */}
                </div>
            </div>) : (
                <div className="show-extra-ctr one-season"><RemovedFromDB /></div>
            ))
        }
    </>);
}
