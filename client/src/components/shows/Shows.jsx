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
        btnLoading: false,
    };

    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const fetchShowsData = () => {
        shows.page(pageValues.showsPage)
            .then(data => {
                setPageValues({
                    showsData: data,
                    loading: false,
                });
                // console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };
    
    useEffect(() => {
        fetchShowsData();
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
