import React, { useEffect, useState } from 'react';
import './ShowSeason.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import { getUniqueArr, plotNum, plotRating } from '../../utilities/showUtility';


export default function ShowSeason() {
    const { showId, seasonId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(showId);

        shows.oneShow.oneSeasonEpisodes(seasonId)
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
            : (<div className="show-extra-ctr one-season">
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
                            : (<p>We don't have a summary for Season {x.number} yet.</p>)}
                        <div><h3>Guest stars</h3></div>
                        <div className="top-cast">
                            {x._embedded.guestcast && (getUniqueArr(x._embedded.guestcast).map(y => (
                                y.person.image && (
                                    <div key={`${y.person.id}-${y.character.id}-${x.id}`} className='tooltip-anchor'>
                                        <div key={y.person.id} className='img-circle-sm'><Link to={`/actors/${y.person.id}`}>
                                            <img src={y.person.image.medium} alt="member-img" />
                                        </Link>
                                        </div>
                                        <div className="tooltip">{y.person.name}</div>
                                    </div>
                                )
                            )))}
                        </div>
                    </div>
                ))}
            </div>)
        }
    </>);
}