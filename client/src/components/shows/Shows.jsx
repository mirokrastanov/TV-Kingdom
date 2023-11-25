import React, { useEffect, useState } from 'react';
import './Shows.css';
import Card from '../shared/card/card';
import { shows } from '../../services/showService';

export default function Shows() {
    const INITIAL_VALUES = {
        showsData: [],
        showsPage: 0,
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
        // async () => {
        //     const data = await shows.page(pageValues.showsPage);
        //     setPageValues({ ...pageValues, showsData: data })
        // };
        // fetchShowsPage().catch(console.log);

        shows.page(pageValues.showsPage)
            .then(data => setPageValues({ ...pageValues, showsData: data }))
            .catch((err) => {
                console.log(err.message);
            });

        console.log(pageValues.showsData);

        // return () => { };
    }, []);


    return (
        <div className="shows-ctr">
            <h1>Shows</h1>
            <div className="cards-cage">
                {pageValues.showsData.slice(0, 10).map(x => (<Card key={x.id} {...x} />))}
                {/* {pageValues.showsData.slice(0, 1).map(x => (<Card key={x.id} {...x} />))} */}
            </div>
        </div>
    )
};
