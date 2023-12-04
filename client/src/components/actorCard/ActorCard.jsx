import React, { useEffect, useState } from 'react';
import './ActorCard.css';
import CardLoader from '../shared/cardLoader/CardLoader';
import { useNavigate } from 'react-router-dom';


const ActorCard = React.forwardRef((props, ref) => {
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const clickHandler = (e) => {
        const actorId = e.currentTarget.dataset.id;
        // console.log('clicked', actorId);

        navigate(`${actorId}/details`);
    };

    useEffect(() => {
        // console.log(props);
        if (props.id) {
            setP({ ...props });
            setLoading(false);
        };

        return () => { };
    }, [props]);


    return (<>
        {loading
            ? (<div className="card actor-card"><CardLoader /></div>)
            : (<div className="card actor-card" data-id={p.id} ref={ref ? ref : null} onClick={clickHandler}>
                <div className="poster">
                    {p.image && (<img src={p.image.medium} alt="card-poster" />)}
                    {!p.image && (<div className='no-img'>No Image Available</div>)}
                </div>
                <div className="details">
                    <div className='title-ctr'><h2>{p.name}</h2></div>
                    <span>{p.birthday}{p.deathday && ` - ${p.deathday}`}</span>

                    <div className="extra">
                        <p>Gender: <b>{p.gender}</b></p>
                        <p>{p.country && (<>Country: <b>{p.country.name}</b></>)}</p>
                    </div>
                </div>
                <div className='r-m-hidden'>Read More...</div>
            </div>
            )
        }
    </>)
})

export default ActorCard;