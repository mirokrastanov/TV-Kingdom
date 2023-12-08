import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { Link, useParams } from 'react-router-dom';
import { shows, urlBuilder } from '../../services/showService';
import { extractYear, plotRating } from '../../utilities/showUtility';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import RemovedFromDB from '../shared/removedFromDB/RemovedFromDB';
import CommentsContainer from '../shared/commentsContainer/CommentsContainer';

export default function ShowDetails() {
    const { showId } = useParams();
    const [p, setP] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log(showId);

        shows.oneShow.mainInfo(showId)
            .then(data => {
                // console.log(data);
                setP(data);
                setLoading(false);
            })
            .catch(err => {
                // console.log(err.message);
                setLoading(false);
            })

        return () => { };
    }, []);

    return (
        <div className='show-details-ctr'>
            <h1>Show Details</h1>
            {loading
                ? (<PageLoader />)
                : (!p ? (<RemovedFromDB />) : (
                    <>
                        <div className='card-cage' data-id={p.id}>
                            <div className='details-img'>
                                {/* <img src={p.image.original} alt='card-poster' /> */}
                                {p.image ? (
                                    <img src={p.image.original} alt="card-poster" />
                                ) : (<div className='no-img'><p>No image available</p></div>)}
                            </div>
                            <div className='main-details-ctr'>
                                <div className='inner-details'>
                                    <div className='title-ctr'><h2>{p.name}</h2></div>
                                    <div className='year-ctr'>
                                        <span>{extractYear(p.premiered)} - {extractYear(p.ended)} ({p.status ?? ''})</span>
                                        <span className='imdb tooltip-anchor'>
                                            <a href={p.externals.imdb
                                                ? (urlBuilder.imdb(p.externals.imdb))
                                                : (`https://www.imdb.com/find/?q=${p.name}`)} target='_blank'>
                                                <img src='/IMDB_Logo.png' alt='imdb-link' />
                                            </a>
                                            <div className='tooltip'>View in IMDb
                                                <span className='material-symbols-outlined'>open_in_new</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className='rating-ctr'>
                                        {plotRating(p.rating.average).map((x, i) => {
                                            if (x == 1) return (<span key={`rating-${i}-${p.id}`} className='material-symbols-outlined fill-n-thin-symbol'>star</span>);
                                            else if (x > 0 & x < 1) return (<span key={`rating-${i}-${p.id}`} className='material-symbols-outlined thin-symbol'>star_half</span>);
                                            else return (<span key={`rating-${i}-${p.id}`} className='material-symbols-outlined thin-symbol'>star</span>);
                                        })}
                                        <span className='rating-num'>{p.rating.average ?? 0}/10</span>
                                    </div>
                                    <div className='tags' id='details-tags'>
                                        {p.genres.map(x => (<span key={x.toLowerCase()} className={x.toLowerCase()}>{x}</span>))}
                                    </div>
                                    <div className='details-p'>
                                        {p.averageRuntime && (<p>Average runtime: <b>{p.averageRuntime} min</b></p>)}
                                    </div>
                                    <div className="details-p">
                                        {p.language && (p.network
                                            ? (<p>Language: <b>{p.language} | {p.network.country.code}</b></p>)
                                            : (<p>Language: <b>{p.language}</b></p>)
                                        )}
                                    </div>
                                    <div className="details-p">
                                        {p.network && (p.network.officialSite
                                            ? (<p>Network: <a className='btn' href={p.network.officialSite} target='_blank'>{p.network.name}</a></p>)
                                            : (<p>Network: <b>{p.network.name}</b></p>)
                                        )}
                                        {!p.network && p.webChannel && (p.webChannel.officialSite
                                            ? (<p>Web Channel: <a className='btn' href={p.webChannel.officialSite}
                                                target='_blank'>{p.webChannel.name}</a></p>)
                                            : (<p>Web Channel: <b>{p.webChannel.name}</b></p>)
                                        )}
                                    </div>
                                    <div className='details-p'>
                                        <p style={{ marginBottom: '5px' }}><b>Schedule:</b></p>
                                        {p.schedule.time ? (p.network
                                            ? (<>
                                                {p.schedule.days && <>
                                                    {p.schedule.days.map((x, i, a) => (
                                                        <React.Fragment key={`${x}--${i}-schedule-d`}>{`${x}${i < a.length - 1 ? ', ' : ''}`}</React.Fragment>
                                                    ))}
                                                    :<b>{p.schedule.time}</b>

                                                </>}
                                                <p style={{ marginTop: '5px' }}>Timezone: <b>{p.network.country.timezone}</b></p>
                                            </>)
                                            : (<p><b>{p.schedule.time}</b></p>)
                                        ) : (<p>-</p>)}
                                    </div>
                                    <div className="details-p" style={{ marginTop: '5px' }}>{p._embedded.cast && (<p><b>Top Cast:</b></p>)}</div>
                                    <div className="top-cast">
                                        {p._embedded && (p._embedded.cast.slice(0, 5).map(x => (
                                            <div key={`${x.person.id}-top-c`} className='tooltip-anchor'>
                                                <div key={x.person.id} className='img-circle-sm'><Link to={`/actors/${x.person.id}/details`}>
                                                    {/* <img src={x.person.image.medium} alt="member-img" /> */}
                                                    {x.person.image ? (
                                                        <img src={x.person.image.medium} alt="member-img" />
                                                    ) : (<div className='no-img'><p>No image</p></div>)}
                                                </Link>
                                                </div>
                                                <div className="tooltip">{x.person.name}</div>
                                            </div>
                                        )))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full summary' data-id={p.id}>
                            <div><h2>Summary</h2></div>
                            <SummaryComplete summary={p.summary} />
                        </div>
                        <div className="w-full extra-links" data-id={p.id}>
                            <div><h2>Find out more</h2></div>
                            <div className="details-p">
                                <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                                <Link className='btn' to={`/shows/${showId}/episodes`}>Episodes</Link>
                                <Link className='btn' to={`/shows/${showId}/cast`}>Cast</Link>
                                <Link className='btn' to={`/shows/${showId}/crew`}>Crew</Link>
                                <Link className='btn' to={`/shows/${showId}/images`}>Images</Link>
                            </div>
                        </div>

                    </>
                ))
            }
            <div className="com-title">
                <h2>Comments</h2>
                <CommentsContainer />
            </div>
        </div>
    )
}
