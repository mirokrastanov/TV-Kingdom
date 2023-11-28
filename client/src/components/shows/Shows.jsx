import React, { useCallback, useEffect, useRef, useState } from 'react';
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
        displayPage: 1,
        pageLoading: true,
        isIntersecting: false,
    };

    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const intObserver = useRef();
    const lastCardRef = useCallback(card => {
        if (pageValues.pageLoading) return;
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(cards => {
            if (cards[0].isIntersecting) {
                pageValues.isIntersecting = true;
                console.log('Near last card!');
                console.log(card);
                setPageValues(prev => ({ ...prev, displayPage: prev.displayPage + 1 }));
            }
        }, {
            threshold: 1,
            rootMargin: '-80px',
        });

        if (card) intObserver.current.observe(card);

    }, [pageValues.pageLoading]);

    const fetchShowsData = () => {
        setPageValues(prev => ({ ...prev, pageLoading: true }));

        shows.page(pageValues.showsPage)
            .then(data => {
                const partials = createPartials(data);
                const first = partials.shift();
                setPageValues(prev => ({
                    ...prev,
                    showsData: [...data],
                    partialData: partials,
                    displayData: [...new Set([...prev.displayData, ...first])], // ensure uniqueness
                    pageLoading: false,
                }));
                // console.log(data);
                // console.log(pageValues);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };

    const fetchDisplayData = () => {
        setPageValues(prev => ({ ...prev, pageLoading: true }));

        const length = pageValues.partialData.length;
        if (length > 0) {
            const partial = pageValues.partialData.shift();
            setPageValues(prev => ({
                ...prev,
                displayData: [...new Set([...prev.displayData, ...partial])], // ensure uniqueness
                pageLoading: false,
            }));
        } else {
            // fetch shows, but persist some values
        }
    };

    useEffect(() => {
        if (!pageValues.isIntersecting) return;

        fetchDisplayData();
    }, [pageValues.displayPage]);

    useEffect(() => {
        setPageValues(INITIAL_VALUES);
        fetchShowsData();
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
                <ScrollLoader />
            </div>
            {pageValues.pageLoading
                ? null
                : (<p className='top-link btn'><a href="#top">Back to Top</a></p>)}
        </div>
    )
};
