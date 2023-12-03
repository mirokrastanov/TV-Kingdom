import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { useParams } from 'react-router-dom';
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
        <div className="show-details-ctr">
            <h1>Show Details</h1>
            {loading
                ? (<PageLoader />)
                : (<>
                    <div className="card-cage" data-id={p.id}>
                        <div className="details-img">
                            <img src={p.image.original} alt="card-poster" />
                        </div>
                        <div className="main-details-ctr">
                            <div className='inner-details'>
                                <div className='title-ctr'><h2>{p.name}</h2></div>
                                <div className='year-ctr'>
                                    <span>{extractYear(p.premiered)} - {extractYear(p.ended)}</span>
                                    <span className='imdb tooltip-anchor'>
                                        <a href={urlBuilder.imdb(p.externals.imdb)} target='_blank'>
                                            <img src="/src/assets/IMDB_Logo.png" alt="imdb-link" />
                                        </a>
                                        <div className="tooltip">View in IMDb
                                            <span className='material-symbols-outlined'>open_in_new</span>
                                        </div>
                                    </span>
                                </div>
                                <div className="rating-ctr">
                                    {plotRating(p.rating.average).map((x, i) => {
                                        if (x == 1) return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined fill-n-thin-symbol">star</span>);
                                        else if (x > 0 & x < 1) return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined thin-symbol">star_half</span>);
                                        else return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined thin-symbol">star</span>);
                                    })}
                                    <span className="rating-num">{p.rating.average ?? 0}/10</span>
                                </div>
                                <div className="tags" id='details-tags'>
                                    {p.genres.map(x => (<span key={x.toLowerCase()} className={x.toLowerCase()}>{x}</span>))}
                                </div>



                            </div>
                        </div>
                    </div>
                    <div className="w-full" data-id={p.id}>
                        <SummaryComplete summary={p.summary} />
                    </div>

                    <div className="card" data-id={p.id}>
                        <div className="poster"><img src={p.image.medium} alt="card-poster" /></div>
                        <div className="details">
                            <div className='title-ctr'><h2>{p.name}</h2></div>
                            <span>{extractYear(p.premiered)} - {extractYear(p.ended)}</span>
                            <div className="rating">
                                {plotRating(p.rating.average).map((x, i) => {
                                    if (x == 1) return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined fill-n-thin-symbol">star</span>);
                                    else if (x > 0 & x < 1) return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined thin-symbol">star_half</span>);
                                    else return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined thin-symbol">star</span>);
                                })}
                                <span className="rating-number">{p.rating.average ?? 0}/10</span>
                            </div>
                            <div className="tags">
                                {p.genres.map(x => (<span key={x.toLowerCase()} className={x.toLowerCase()}>{x}</span>))}
                            </div>
                            <Summary summary={p.summary} />
                            <div className="extra">
                                <p>Language: <b>{p.language}</b></p>
                            </div>
                        </div>
                    </div>
                </>)
            }
        </div>
    )
}
