import React, { useEffect } from 'react';
import './ShowDetails.css';
import { useParams } from 'react-router-dom';

export default function ShowDetails() {


    const { showId } = useParams();


    useEffect(() => {
        console.log(showId);

        return () => { };
    }, []);

    return (
        <div className="show-details-ctr">
            <h1>Show Details</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repudiandae eius dolorum enim. Nobis quo vitae placeat neque itaque. Illum?</p>
        </div>
    )
}
