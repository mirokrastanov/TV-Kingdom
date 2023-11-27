import React, { useEffect, useState } from 'react';
import './Shows.css';
import ShowCard from '../showCard/ShowCard';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import { createPartials } from '../../util/showMath';
import ScrollLoader from '../shared/scrollLoader/ScrollLoader';

export default function Shows() {
    const INITIAL_VALUES = {
        showsData: [],
        showsPage: 0,
        partialData: [],
        displayData: [],
        pageLoading: true,
        scrollLoading: false,
    };

    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const fetchShowsData = () => {
        shows.page(pageValues.showsPage)
            .then(data => {
                const partials = createPartials(data);
                const first = partials.shift();
                setPageValues(prev => ({
                    ...prev,
                    showsData: [...data],
                    partialData: partials,
                    displayData: [...prev.displayData, ...first],
                    pageLoading: false,
                }));
                // console.log(data);
                // console.log(pageValues);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };

    useEffect(() => {

    }, [pageValues.displayData]);

    useEffect(() => {
        setPageValues(INITIAL_VALUES);
        fetchShowsData();
    }, []);

    return (
        <div className="shows-ctr">
            <h1>Shows</h1>
            <div className="cards-cage">
                {pageValues.pageLoading
                    ? (<PageLoader />)
                    : (pageValues.displayData.map(x => (<ShowCard key={x.id} {...x} />)))
                }
                {/* Testing renders below */}
                {/* {pageValues.showsData.slice(0, 10).map(x => (<ShowCard key={x.id} {...x} />))} */}
                {/* {pageValues.showsData.slice(0, 1).map(x => (<ShowCard key={x.id} {...x} />))} */}

                {pageValues.scrollLoading && <ScrollLoader />}
            </div>
        </div>
    )
};
