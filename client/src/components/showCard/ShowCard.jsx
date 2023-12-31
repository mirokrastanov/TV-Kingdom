import React, { useEffect, useState } from 'react';
import './ShowCard.css';
import Summary from '../shared/summary/Summary';
import CardLoader from '../shared/cardLoader/CardLoader';
import { useNavigate } from 'react-router-dom';
import { extractYear, plotRating } from '../../utilities/showUtility';

// id, name, language, genres[], premiered, ended, rating.average, network.name, image.medium. summmary
const mockup = {
    id: 82, name: 'Game of Thrones', show: { language: 'English' }, genres: ['Drama', 'Adventure', 'Fantasy'], premiered: '2011-04-17',
    ended: '2019-05-19', rating: { average: 8.9 }, network: { name: 'HBO' },
    image: { medium: 'https://posterspy.com/wp-content/uploads/2020/10/got.jpg' },
    summary: '<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>'
};

const ShowCard = React.forwardRef((props, ref) => {
    const [p, setP] = useState(mockup);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const clickHandler = (e) => {
        const showId = e.currentTarget.dataset.id;
        // console.log('clicked', id);

        navigate(`/shows/${showId}/details`);
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
            ? (<div className="card"><CardLoader /></div>)
            : (<div className="card" data-id={p.id} ref={ref ? ref : null} onClick={clickHandler}>
                <div className="poster">
                    {/* <img src={p.image.medium} alt="card-poster" /> */}
                    {p.image ? (
                        <img src={p.image.medium} alt="card-poster" />
                    ) : (<div className='no-img'><p style={{color: 'white'}}>No image available</p></div>)}
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
    </>)
})

export default ShowCard;
