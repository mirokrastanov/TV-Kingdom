import React, { useEffect, useState } from 'react';
import './Shows.css';
import ShowCard from '../showCard/ShowCard';
import { shows } from '../../services/showService';
import PageLoader from '../shared/pageLoader/PageLoader';
import { returnInfData } from '../../util/showMath';

export default function Shows() {
    const INITIAL_VALUES = {
        showsData: [],
        showsPage: 0,
        loading: true,
        infSize: 50,
        infData: [],
        infPage: 0,
        displayData: [],
    };

    const [pageValues, setPageValues] = useState(INITIAL_VALUES);

    const infScrollHandler = () => {
        // const innerHeight = window.innerHeight;
        // const scrollTop = document.documentElement.scrollTop;
        // const scrollHeight = document.documentElement.scrollHeight;
        // if (innerHeight + scrollTop + 1 >= scrollHeight) {
        //     // setPageValues(prev => ({ ...prev, loading: true }));
        //     switchPage();
        // }

        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {
            switchPage();
        }
    };

    const fetchShowsData = () => {
        shows.page(pageValues.showsPage)
            .then(data => {
                setPageValues({
                    ...pageValues, showsData: data,
                    infData: returnInfData(data, pageValues.infSize, pageValues.infPage),
                    displayData: returnInfData(data, pageValues.infSize, pageValues.infPage),
                    loading: false,
                });
                // console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };

    const switchPage = () => {
        const all = pageValues.showsData;
        const inf = pageValues.infData;
        if (all[all.length - 1] == inf[inf.length - 1]) {
            setPageValues(prev => ({ ...prev, infPage: 0, showsPage: prev.showsPage + 1 }));
        } else {
            setPageValues(prev => ({ ...prev, infPage: prev.infPage + 1 }));
        }
    };


    useEffect(() => { // when inf page is changed
        console.log('page changed');
        // console.log(pageValues.displayData);
        const newInfData = returnInfData(pageValues.showsData, pageValues.infSize, pageValues.infPage);
        // console.log(newInfData);
        if (pageValues.displayData[0] == newInfData[0]) return;
        setPageValues(prev => ({
            ...prev,
            infData: newInfData,
            displayData: [...pageValues.displayData, ...newInfData],
            loading: false,
        }));
    }, [pageValues.infPage]);

    useEffect(() => { // when shows page is changed
        console.log('show page changed');
        fetchShowsData();

    }, [pageValues.showsPage]);

    useEffect(() => {
        window.addEventListener('scroll', infScrollHandler);
        // fetchShowsData();

        return () => {
            window.removeEventListener('scroll', infScrollHandler);
        };
    }, []);

    return (
        <div className="shows-ctr">
            <h1>Shows</h1>
            <div className="cards-cage">
                {pageValues.loading
                    ? (<PageLoader />)
                    : (pageValues.displayData.map(x => (<ShowCard key={x.id} {...x} />)))
                    // : (pageValues.showsData.map(x => (<ShowCard key={x.id} {...x} />)))
                }


                {/* Testing renders below */}
                {/* {pageValues.showsData.slice(0, 10).map(x => (<ShowCard key={x.id} {...x} />))} */}
                {/* {pageValues.showsData.slice(0, 1).map(x => (<ShowCard key={x.id} {...x} />))} */}
            </div>
        </div>
    )
};
