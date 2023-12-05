import React, { useEffect, useState } from 'react';
import './ActorDetails.css';
import { Link, useParams } from 'react-router-dom';
import { actors, shows, urlBuilder } from '../../services/showService';
import { extractYear, plotRating } from '../../utilities/showUtility';
import PageLoader from '../shared/pageLoader/PageLoader';
import SummaryComplete from '../shared/summary/SummaryComplete';
import ShowCard from '../showCard/ShowCard';

export default function ActorDetails() {
    const { actorId } = useParams();
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(actorId);

        actors.oneActor.details(actorId)
            .then(details => {
                // console.log(details);
                setP(prev => ({ ...prev, d: details }));

                actors.oneActor.castCredits(actorId)
                    .then(castCredits => {
                        // console.log(castCredits);
                        setP(prev => ({ ...prev, cast: castCredits }));

                        actors.oneActor.crewCredits(actorId)
                            .then(crewCredits => {
                                // console.log(crewCredits);
                                setP(prev => ({ ...prev, crew: crewCredits }));

                                actors.oneActor.guestCastCredits(actorId)
                                    .then(guestCastCredits => {
                                        console.log(guestCastCredits);
                                        setP(prev => ({ ...prev, guest: guestCastCredits }));

                                        setLoading(false);
                                    })
                            })
                    })
            })
            .catch(err => {
                console.log(err.message);
            })

        return () => { };
    }, []);

    return (
        <div className='actor-details-ctr'>
            <h1>Actor Details</h1>
            {loading ? (<PageLoader />) : (<>
                <div className="g-full" data-id={p.id}>
                    <div className="actor-img">
                        {p.d.image ? (
                            <img src={p.d.image.original} alt="person-img" />
                        ) : (<div className='no-img'><p>No image available</p></div>)}
                    </div>
                    <div className="actor-info">
                        <h2>{p.d.name}</h2>
                        <p>{p.d.birthday}{p.d.deathday ? ` - ${p.d.deathday}` : ''}</p>
                        <p>{p.d.gender}</p>
                        <p>{p.d.country ? p.d.country.name : ''}</p>
                    </div>
                </div>
                <div className="w-full">
                    <h2>Cast Credits</h2>
                </div>
                <div className="cards-cage">
                    {p.cast.length == 0 && <h3>No cast credits</h3>}
                    {p.cast.map(x => (<ShowCard {...x._embedded.show} key={`${x._embedded.show.id}-cast`} />))}
                </div>
                <div className="w-full">
                    <h2>Crew Credits</h2>
                    <h3>Show - Role</h3>
                </div>
                <div className="cards-cage">
                    {/* {p.crew.map(x => (<ShowCard {...x._embedded.show} genres={[x.type]} key={`${x._embedded.show.id}-crew-${x.type}`} />))} */}
                    {p.crew.length == 0 && <h3>No crew credits</h3>}
                    {p.crew.map(x => (
                        <div className='crew-div' key={`${x._embedded.show.id}-crew-${x.type}`}>
                            <Link to={`/shows/${x._embedded.show.id}/details`}>
                                <div>
                                    <p>{x._embedded.show.name}</p>
                                    <p>- {x.type}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </>)}
        </div>
    )
}
