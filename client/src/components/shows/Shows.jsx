import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Shows.css';
import ShowCard from '../showCard/ShowCard';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import ScrollLoader from '../shared/scrollLoader/ScrollLoader';
import { createPartials } from '../../utilities/showUtility';

export default function Shows() {
    const INITIAL_VALUES = {
        showsData: [], showsPage: 0, partialData: [], displayData: [],
        displayPage: 1, pageLoading: true, scrollLoading: true, isIntersecting: false,
    };

    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const intObserver = useRef();
    const lastCardRef = useCallback(card => {
        if (pageValues.pageLoading) return;
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(cards => {
            if (cards[0].isIntersecting) {
                // console.log('Near last card!', card);
                setPageValues(prev => ({ ...prev, displayPage: prev.displayPage + 1, isIntersecting: true }));
            }
        }, {
            threshold: 1, // full element on screen, before trigger
            rootMargin: '-60px', // + a margin for the scroll loader
        });

        if (card) intObserver.current.observe(card);
    }, [pageValues.pageLoading]);

    function fetchShowsData(p) {
        shows.page(p)
            .then(data => {
                if (!data || !Array.isArray(data)) {
                    setPageValues(prev => ({ ...prev, scrollLoading: false }));
                }
                const partials = createPartials(data);
                const first = partials.shift();
                setPageValues(prev => ({
                    ...prev,
                    showsData: [...data],
                    partialData: [...partials],
                    displayData: [...prev.displayData, ...first],
                    pageLoading: false,
                    isIntersecting: false,
                }));
            })
            .catch((err) => {
                console.log(err.message);
            })
    };

    function loadDisplayData() {
        const length = pageValues.partialData.length;
        if (length > 0) {
            const partial = pageValues.partialData.shift();
            setPageValues(prev => ({
                ...prev,
                displayData: [...prev.displayData, ...partial],
                pageLoading: false,
                isIntersecting: false,
            }));
        } else {
            fetchShowsData(pageValues.showsPage + 1);
            setPageValues(prev => ({ ...prev, showsPage: prev.showsPage + 1 }));
        }
    };

    // LOAD ON SCROLL
    useEffect(() => {
        if (!pageValues.isIntersecting) return;

        loadDisplayData();
    }, [pageValues.displayPage]);

    // DEV LOG
    // useEffect(() => {
    //     console.log(pageValues.displayData);
    // }, [pageValues.displayData]);

    // ON INIT
    useEffect(() => {
        setPageValues(INITIAL_VALUES);
        fetchShowsData(0);
    }, []);

    return (
        <div className="shows-ctr">
            <h1 id='top'>Shows</h1>
            <div className="cards-cage">
                {pageValues.pageLoading
                    ? (<PageLoader />)
                    : (pageValues.displayData.map((x, i) => {
                        if (pageValues.displayData.length == i + 1) {
                            return (<ShowCard ref={lastCardRef} key={x.id} {...x} />)
                        }
                        return (<ShowCard key={x.id} {...x} />)
                    }))
                }
                {(!pageValues.pageLoading && pageValues.scrollLoading) && <ScrollLoader />}
            </div>
            {(pageValues.pageLoading && !pageValues.scrollLoading)
                ? null
                : (<p className='top-link btn'><a href="#top">Back to Top</a></p>)}
        </div>
    )
};
