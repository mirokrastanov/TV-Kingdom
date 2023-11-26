import React, { useEffect, useState } from 'react';
import './Shows.css';
import ShowCard from '../showCard/ShowCard';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';

export default function Shows() {
    const INITIAL_VALUES = {
        showsData: [],
        showsPage: 0,
        loading: true,
    };

    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const pageControl = {
        next: () => setPageValues({ ...pageValues, showsPage: pageValues.showsPage + 1 }),
        previous: () => {
            if (pageValues.showsPage - 1 < 0) return;
            setPageValues({ ...pageValues, showsPage: pageValues.showsPage - 1 });
        },
    };

    const fetchSingleShow = async () => {
        const data = await shows.oneShow.mainInfo(2999);
        console.log(data);
    };

    useEffect(() => {
        shows.page(pageValues.showsPage)
            .then(data => {
                setPageValues({ ...pageValues, showsData: data, loading: false });
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })

        // return () => { };
    }, []);


    return (
        <div className="shows-ctr">
            <h1>Shows</h1>
            <div className="cards-cage">
                {pageValues.loading
                    ? (<PageLoader />)
                    : (pageValues.showsData.map(x => (<ShowCard key={x.id} {...x} />)))
                }
                {/* Testing renders below */}
                {/* {pageValues.showsData.slice(0, 10).map(x => (<ShowCard key={x.id} {...x} />))} */}
                {/* {pageValues.showsData.slice(0, 1).map(x => (<ShowCard key={x.id} {...x} />))} */}
            </div>
        </div>
    )
};
