import React, { useState } from 'react';
import './Home.css';
import { shows } from '../../services/showsService';

const INITIAL_VALUES = {
    showsData: {},
    showsPage: 0,
};

export default function Home() {
    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const pageControl = {
        next: () => setPageValues({ ...pageValues, showsPage: pageValues.showsPage + 1 }),
        previous: () => {
            if (pageValues.showsPage - 1 < 0) return;
            setPageValues({ ...pageValues, showsPage: pageValues.showsPage - 1 });
        },
    };

    const fetchShowsPage = async () => {
        const data = await shows.page(pageValues.showsPage);
        setPageValues({ ...pageValues, showsData: data })
        console.log(data);
    };

    const fetchSingleShow = async () => {
        const data = await shows.oneShow.mainInfo(2999);
        console.log(data);
    };

    return (
        <div className='home-ctr'>
            <div className="hero">
                <h1>RULE YOUR WATCHLIST</h1>
            </div>

            <div className="container">
                <div className="btn-cage">
                    <button className='btn' onClick={pageControl.previous}>Prev page: {pageValues.showsPage - 1 >= 0 ? pageValues.showsPage - 1 : 'X'}</button>
                    <p>Page = {pageValues.showsPage}</p>
                    <button className='btn' onClick={pageControl.next}>Next page: {pageValues.showsPage + 1}</button>
                </div>
                <div className="btn-cage">
                    <button className='btn' onClick={fetchShowsPage}>Fetch page</button>
                    <button className='btn' onClick={fetchSingleShow}>Fetch one</button>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa sequi nemo perspiciatis adipisci repellendus molestiae, nesciunt ex mollitia amet cum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus soluta unde id nulla natus nostrum laudantium minima magni! Quos, exercitationem qui! Laudantium maiores ipsa, nihil totam deleniti, quae in sit fuga possimus itaque mollitia. At labore, numquam cumque illo quae molestiae sunt non similique obcaecati beatae in expedita facere omnis!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eligendi suscipit excepturi eius recusandae laboriosam aperiam nobis sint? Voluptatem amet cupiditate corrupti! Eius quasi quae eveniet laborum soluta delectus, perspiciatis similique totam unde, molestiae nesciunt harum possimus ad eaque deleniti iste natus consequuntur odio recusandae? Dolores, tenetur voluptatibus praesentium impedit unde voluptates, consectetur corporis nulla nihil velit ratione debitis eligendi ad animi est ex officia maxime enim quaerat iusto deserunt perferendis dolorem repellat. Odit nostrum quasi qui excepturi sed. A doloremque error sequi et optio harum magni natus qui necessitatibus minima, reprehenderit quae veritatis quasi, voluptatem non illum nihil at temporibus minus obcaecati ipsam, rerum perferendis. Blanditiis nisi ipsam, placeat fugiat incidunt sequi dolorem voluptas nihil. Et, eum. Labore, rerum. Ipsa suscipit officia praesentium alias corrupti, esse assumenda debitis veniam sequi maxime numquam, illum natus temporibus! Aspernatur officia soluta nam explicabo error consectetur ab facilis dolores omnis, amet dolore et culpa, tempora saepe possimus perspiciatis ratione quam. Nulla saepe rerum totam magnam in quia, alias labore, vitae ad dolorem facere sapiente eligendi tempore dolor iste error. Inventore ad quis repudiandae neque ut laudantium facilis error ab voluptatibus. Consequuntur blanditiis ipsam itaque minus sit corporis sed illum soluta sequi, qui doloremque.</p>
            </div>
        </div>
    )
}
