import React, { useEffect, useState } from 'react';
import './ShowImages.css';
import { Link, useParams } from 'react-router-dom';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import RemovedFromDB from '../shared/removedFromDB/RemovedFromDB';

export default function ShowImages() {
    const { showId } = useParams();
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log(showId);

        shows.oneShow.showImages(showId)
            .then(data => {
                // console.log(data);
                setP(data);
                setLoading(false);
            })
            .catch(err => {
                // console.log(err.message);
            })

        return () => { };
    }, []);

    return (<>
        {loading
            ? (<PageLoader />)
            : (p.length > 0 ? (<>
                <div className="show-images-ctr">
                    <h1>Show Images</h1>
                    <div className="top-links">
                        <Link className='btn' to={`/shows/${showId}/details`}>Main Details</Link>
                        <Link className='btn' to={`/shows/${showId}/seasons`}>Seasons</Link>
                        <Link className='btn' to={`/shows/${showId}/episodes`}>All episodes</Link>
                    </div>
                    <div className="cards-cage">
                        {p.map((x, i, arr) => (
                            <article key={`${x.id}-img`} data-id={x.id} className='tooltip-anchor'>

                                {x.resolutions && (<>
                                    <Link to={x.resolutions.original.url} target='_blank'>
                                        <img src={x.resolutions.original.url} alt="img" />
                                        <div className='tooltip'>View original image</div>
                                    </Link>
                                </>)}

                                {/* <Link className='btn' to={`/actors/${x.person.id}/details`}>Profile</Link> */}
                            </article>
                        ))}
                    </div>
                </div>
            </>) : (
                <div className="show-extra-ctr one-season"><RemovedFromDB /></div>
            ))
        }
    </>);
}
