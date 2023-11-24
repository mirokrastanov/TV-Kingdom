import React, { useEffect } from 'react';
import './Card.css';

export default function Card(props) {
    // id, name, language, genres[], premiered, ended, rating.average, network.name, image.medium. summmary

    let p = { // Mockup data for pre-rendering, testing & to replace missing assets at start
        id: 82, name: 'Game of Thrones', genres: ['Drama', 'Adventure', 'Fantasy'], premiered: '2011-04-17', ended: '2019-05-19',
        rating: { average: 8.9 }, network: { name: 'HBO' }, image: { medium: 'https://posterspy.com/wp-content/uploads/2020/10/got.jpg' },
        summary: '<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>'
    };

    const extractYear = (date) => (date.split('-'))[0];
    const plotRating = (rating) => {
        let output = [];
        for (let i = 1; i <= 10; i++) {
            if (i <= rating) output.push(1);
            else if (i - 1 < rating && i > rating) output.push(0.5);
            else if (i > rating ) output.push(0);
        }
        return output;
    };

    useEffect(() => {
        if (props.id) {
            p = props;
        }

        return () => { };
    }, [props]);


    return (
        <div className="card">
            <div className="poster">
                <img src={p.image.medium} alt="card-poster" />
            </div>
            <div className="details">
                <div className='title-ctr'><h2>{p.name}</h2></div>
                <span>{extractYear(p.premiered)} - {extractYear(p.ended)}</span>

                <div className="rating">
                    {plotRating(p.rating.average).map((x, i) => {
                        if (x == 1) return(<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined filled-symbol">star</span>);
                        else if (x > 0 & x < 1) return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined">star_half</span>); 
                        else return (<span key={`rating-${i}-${p.id}`} className="material-symbols-outlined">star</span>);
                    })}

                    {/* <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined">star_half</span>
                    <span className="material-symbols-outlined">star</span> */}
                    <span className="rating-number">8.6/10</span>
                </div>
                <div className="tags">
                    <span className="fantasy">Fantasy</span>
                    <span className="romance">Romance</span>
                </div>
                <div className="info">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere veritatis quisquam reprehenderit
                        odit facilis quos fugiat dolorem cum laboriosam sint harum odio ipsum labore, quaerat maiores
                        consectetur, architecto ea hic vero voluptatibus! Sequi id aut tempora exercitationem eligendi
                        dolorem accusantium.</p>
                </div>
                <div className="extra">
                    <p>Language: <b>English</b></p>
                    <p>Network: <b>CBS</b></p>
                </div>
            </div>
        </div>
    )
}
