import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import { extractYear, plotRating } from '../../utilities/showUtility';
import Summary from '../shared/summary/Summary';
import CardLoader from '../shared/cardLoader/CardLoader';

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
            <div className="card-cage">
                {loading
                    ? (<div className="card"><CardLoader /></div>)
                    : (<div className="card" data-id={p.id}>
                        <div className="poster">
                            <img src={p.image.medium} alt="card-poster" />
                        </div>
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
                    )
                }
            </div>
        </div>
    )
}
