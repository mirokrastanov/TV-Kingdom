import React, { useState } from 'react';
import './Home.css';
import { shows } from '../../services/showService';
import { useEffect } from 'react';
import PageLoader from '../shared/pageLoader/PageLoader';
import { plotRating } from '../../utilities/showUtility';
import { Link } from 'react-router-dom';

export default function Home() {
    const [mySwiper, setMySwiper] = useState(null);
    const [cards, setCards] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        shows.page(0)
            .then(sData => {
                // console.log(sData[0]);
                setCards(sData.slice(0, 9));

                setLoading(false);
            })
            .catch(err => {
                // console.log(err.message);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        // console.log(cards);

        if (mySwiper && mySwiper?.initialized) {
            // console.log('init');
            // mySwiper.destroy(true, true);
            mySwiper.update();
        } else {
            let swiper = new Swiper('.swiper', {
                effect: 'cards',
                grabCursor: true,
                initialSlide: 3,
                loop: true,
                rotate: true,
                mousewheel: {
                    invert: false,
                },
                on: {
                    init: function () {
                        // console.log('swiper initialized');
                    },
                    destroy: function () {
                        // console.log('swiper destroyed');
                    },
                    update: function () {
                        // console.log('swiper updated');
                    },
                },
            });
            setMySwiper(swiper);
        }
    }, [cards])

    return (
        <div className='home-ctr'>
            {loading
                ? (<PageLoader />)
                : (<>
                    <section className='h--section-top'>
                        <div className="h--content">
                            <div className="h--info">
                                <p>
                                    Join us for a world of entertainment at your fingertips! Your ultimate destination for all things television: ratings, summaries, comments, we've got it all!
                                </p>
                                <Link className='btn' to={'/user/sign-up'}>Join</Link>
                            </div>
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    {cards.map(x => (
                                        <div className="swiper-slide" key={x.id + '--card-dynamic'}
                                            style={{
                                                backgroundImage: (!x.image ? "url('/src/assets/the100-1.jpg')" : (!x.image?.medium
                                                    ? "url('/src/assets/the100-1.jpg')" : (`url('${x.image.medium}')`))),
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "bottom center"
                                            }}
                                        >
                                            {/* <span>{x.rating?.average ? x.rating.average : ''}</span> */}
                                            {/* <h2>{x.name ? x.name : ''}</h2> */}
                                            <div className="tags">
                                                {x.genres.map(y => (<span key={y.toLowerCase()} className={y.toLowerCase()}>{y}</span>))}
                                            </div>
                                            <h2>
                                                {plotRating(x.rating.average).map((y, i) => {
                                                    if (y == 1) return (<b key={`rating-${i}-${x.id}`} className="material-symbols-outlined fill-n-thin-symbol">star</b>);
                                                    else if (y > 0 & y < 1) return (<b key={`rating-${i}-${x.id}`} className="material-symbols-outlined thin-symbol">star_half</b>);
                                                    else return (<b key={`rating-${i}-${x.id}`} className="material-symbols-outlined thin-symbol">star</b>);
                                                })}
                                            </h2>
                                            {/* <span className="rating-number">{x.rating.average ?? 0}/10</span> */}
                                        </div>
                                    ))}



                                    {/* <div className="swiper-slide">
                                        <span>9.5</span>
                                        <h2>Breaking Bad</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>8.1</span>
                                        <h2>Wednesday</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>8.7</span>
                                        <h2>Stranger Things</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>8.6</span>
                                        <h2>Anne with an E</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>8.9</span>
                                        <h2>Friends</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>8.6</span>
                                        <h2>The Crown</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>8.7</span>
                                        <h2>House M.D.</h2>
                                    </div>
                                    <div className="swiper-slide">
                                        <span>9.2</span>
                                        <h2>Game of Thrones</h2>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </>)}
        </div>
    )
}
