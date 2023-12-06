import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Actors.css';
import ActorCard from '../actorCard/ActorCard';
import { actors } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import ScrollLoader from '../shared/scrollLoader/ScrollLoader';
import { createPartials } from '../../utilities/showUtility';


export default function Actors() {
    const INITIAL_VALUES = {
        actorsData: [], actorsPage: 0, partialData: [], displayData: [],
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
            // rootMargin: '-60px', // + a margin for the scroll loader
        });

        if (card) intObserver.current.observe(card);
    }, [pageValues.pageLoading]);

    function fetchActorsData(p) {
        actors.page(p)
            .then(data => {
                if (!data || !Array.isArray(data)) {
                    setPageValues(prev => ({ ...prev, scrollLoading: false }));
                }
                // console.log(data[0]);
                const partials = createPartials(data);
                const first = partials.shift();
                setPageValues(prev => ({
                    ...prev,
                    actorsData: [...data],
                    partialData: [...partials],
                    displayData: [...prev.displayData, ...first],
                    pageLoading: false,
                    isIntersecting: false,
                }));
            })
            .catch((err) => {
                // console.log(err.message);
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
            fetchActorsData(pageValues.actorsPage + 1);
            setPageValues(prev => ({ ...prev, actorsPage: prev.actorsPage + 1 }));
        }
    };

    // LOAD ON SCROLL
    useEffect(() => {
        if (!pageValues.isIntersecting) return;

        loadDisplayData();
    }, [pageValues.displayPage]);

    // // DEV LOG
    // useEffect(() => {
    //     console.log(pageValues.displayData);
    // }, [pageValues.displayData]);

    // ON INIT
    useEffect(() => {
        setPageValues(INITIAL_VALUES);
        fetchActorsData(0);
    }, []);

    return (
        <div className="actors-ctr">
            <h1 id='top'>Actors</h1>
            <div className="cards-cage">
                {pageValues.pageLoading
                    ? (<PageLoader />)
                    : (pageValues.displayData.map((x, i) => {
                        if (pageValues.displayData.length == i + 1) {
                            return (<ActorCard ref={lastCardRef} key={x.id} {...x} />)
                        }
                        return (<ActorCard key={x.id} {...x} />)
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
