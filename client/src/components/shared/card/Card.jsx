import React from 'react';
import './Card.css';

export default function Card(p) {

    return (
        <div className="card">
            <div className="poster">
                <img src="https://posterspy.com/wp-content/uploads/2020/10/got.jpg" alt="card-poster" />
                /</div>
            <div className="details">
                <div className='title-ctr'><h2>The Chronicles of Narnia: The Lion, the Witch and the Wardrobe</h2></div>
                <span>2017 - 2023</span>

                <div className="rating">
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined filled-symbol">star</span>
                    <span className="material-symbols-outlined">star_half</span>
                    <span className="material-symbols-outlined">star</span>
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
