import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ShowEpisode.css';
import { episodes, urlBuilder } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import { getUniqueArr, plotNum, plotRating } from '../../utilities/showUtility';
import RemovedFromDB from '../shared/removedFromDB/RemovedFromDB';
import CommentsContainer from '../shared/commentsContainer/CommentsContainer';

export default function ShowEpisode() {
    const { episodeId } = useParams();
    const [p, setP] = useState({});
    const [g, setG] = useState([]);
    const [c, setC] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showId, setShowId] = useState(1);

    useEffect(() => {
        // console.log(episodeId);

        episodes.oneEpisode.details(episodeId)
            .then(details => {
                // console.log(details);
                setP(details);
                setShowId(details._embedded.show.id ?? 1);

                episodes.oneEpisode.guestCast(episodeId)
                    .then(guestCast => {
                        // console.log(guestCast);
                        setG(guestCast);

                        episodes.oneEpisode.guestCrew(episodeId)
                            .then(guestCrew => {
                                // console.log(guestCrew);
                                setC(guestCrew);

                                setLoading(false);
                            })
                    })
            })
            .catch(err => {
                // console.log(err.message);
                setLoading(false);
            })

        return () => { };
    }, []);

    return (<>
        {loading
            ? (<PageLoader />)
            : (p.id ? (<div className="show-extra-ctr one-season episode-current" id='ep-1'>
                <h1>{p.name} </h1>
                <div className="top-links-ctr-each">
                    <Link className='btn' to={`/shows/${showId}/details`}>Show Details</Link>
                    <Link className='btn' to={`/shows/${showId}/seasons`}>Show Seasons</Link>
                    <Link className='btn' to={`/shows/${showId}/episodes`}>Show episodes</Link>
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
                        </article>
                    </div>
                    {p.summary
                        ? (<SummaryComplete summary={p.summary} />)
                        : (<p style={{ padding: '20px' }}>We don't have a summary for episode {p.number} yet.</p>)}
                    <div><h2>Guest stars</h2></div>
                    <div className="top-cast">
                        {!g || g.length == 0 ? (<p>None</p>) : (null)}
                        {g && (getUniqueArr(g).map(y => (
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
                    </div>
                    <div><h2>Crew</h2></div>
                    <div className="cards-cage all-crew">
                        {c.length == 0 && <h3>No crew credits</h3>}
                        {getUniqueArr(c).map(x => (
                            <Link to={`/actors/${x.person.id}/details`} key={`${x.person.id}-crew-2-${x.guestCrewType}`}>
                                <div className='crew-div'>
                                    <div>
                                        <p>{x.person.name}</p>
                                        <p>- {x.guestCrewType}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="com-title">
                    <h2>Comments</h2>
                    <CommentsContainer />
                </div>
            </div>) : (
                <div className="show-extra-ctr one-season"><RemovedFromDB /></div>
            ))
        }
    </>);
}
