import React, { useEffect, useState } from 'react';
import './ScheduleCard.css';
import CardLoader from '../shared/cardLoader/CardLoader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ScheduleCard = React.forwardRef((props, ref) => {
    const { user } = useAuth();
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const clickHandler = (e) => {
        const showId = e.currentTarget.dataset.id;
        // console.log('clicked', id);
        if (user) navigate(`/shows/${showId}/details`);
        else navigate('/user/sign-up');
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
            ? (<div className="card schedule-card"><CardLoader /></div>)
            : (<div className="card schedule-card tooltip-anchor" data-id={p._embedded.show.id} ref={ref ? ref : null} onClick={clickHandler}>
                <div className="poster">
                    {p._embedded.show.image ? (
                        <img src={p._embedded.show.image.medium} alt="card-poster" />
                    ) : (<div className='no-img'><p style={{ color: 'white' }}>No image available</p></div>)}
                </div>
                <div className="details">
                    <div className='title-ctr'><h2>{p._embedded.show.name}</h2></div>
                    <span>{p.airdate} - {p.airtime}</span>
                    <div className="tags">
                        {p._embedded.show.genres.map(x => (<span key={x.toLowerCase()} className={x.toLowerCase()}>{x}</span>))}
                        {(!p._embedded.show.genres || p._embedded.show.genres.length == 0) && (<span>Variety</span>)}
                    </div>
                    <div className="extra" style={{ marginTop: '5px' }}>
                        <p>Language: <b>{p._embedded.show.language}</b></p>
                    </div>
                    <br />
                    <div className="extra">
                        <p>Episode Info:</p>
                        <p><b>{p.name}</b></p>
                    </div>
                </div>
                {!user && (<div className="tooltip">To access the details please Sign In/Up.</div>)}
            </div>
            )
        }
    </>)
})

export default ScheduleCard;
