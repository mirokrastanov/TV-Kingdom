import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { Link, useParams } from 'react-router-dom';
import { shows, urlBuilder } from '../../services/showService';
import { extractYear, plotRating } from '../../utilities/showUtility';
import Summary from '../shared/summary/Summary';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';

export default function ShowDetails() {
    const { showId } = useParams();
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(showId);

        shows.oneShow.mainInfo(showId)
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
        <div className='show-details-ctr'>
            <h1>Show Details</h1>
            {loading
                ? (<PageLoader />)
                : (<>
                    <div className='card-cage' data-id={p.id}>
                        <div className='details-img'>
                            <img src={p.image.original} alt='card-poster' />
                        </div>
                        <div className='main-details-ctr'>
                            <div className='inner-details'>
                                <div className='title-ctr'><h2>{p.name}</h2></div>
                                <div className='year-ctr'>
                                    <span>{extractYear(p.premiered)} - {extractYear(p.ended)} ({p.status ?? ''})</span>
                                    <span className='imdb tooltip-anchor'>
                                        <a href={urlBuilder.imdb(p.externals.imdb)} target='_blank'>
                                            <img src='/src/assets/IMDB_Logo.png' alt='imdb-link' />
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
                                    {p.language && (p.network.country.code
                                        ? (<p>Language: <b>{p.language} | {p.network.country.code}</b></p>)
                                        : (<p>Language: <b>{p.language}</b></p>)
                                    )}
                                </div>
                                <div className="details-p">
                                    {p.network.name && (p.network.officialSite
                                        ? (<p>Network: <a className='a-left' href={p.network.officialSite} target='_blank'>{p.network.name}</a></p>)
                                        : (<p>Network: <b>{p.network.name}</b></p>)
                                    )}
                                </div>
                                <div className='details-p'>
                                    <p style={{ marginBottom: '5px' }}><b>Schedule:</b></p>
                                    {p.schedule.time ? (p.network.country.timezone
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
                                    {p._embedded.cast && (p._embedded.cast.slice(0, 5).map(x => (
                                        <div key={`${x.person.id}-top-c`} className='tooltip-anchor'>
                                            <div key={x.person.id} className='img-circle-sm'><Link to={`/actors/${x.person.id}`}>
                                                <img src={x.person.image.medium} alt="member-img" />
                                            </Link>
                                            </div>
                                            <div className="tooltip">{x.person.name}</div>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="details-p" style={{ margin: '0 auto' }}><b>Summary</b></div>
                    </div>
                    <div className='w-full' data-id={p.id}>
                        <SummaryComplete summary={p.summary} />
                    </div>
                    <div className="w-full extra-links">
                        <div><h3>Find out more</h3></div>
                        <div className="details-p">
                            <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                            <Link className='btn' to={`/shows/${showId}/episodes`}>Episodes</Link>
                            <Link className='btn' to={`/shows/${showId}/cast`}>Cast</Link>
                            <Link className='btn' to={`/shows/${showId}/crew`}>Crew</Link>
                            <Link className='btn' to={`/shows/${showId}/images`}>Images</Link>
                        </div>
                    </div>

                </>)
            }
        </div>
    )
}
