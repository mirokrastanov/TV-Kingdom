import React from 'react';
import './CardLoader.css';
import Spinner from '../Spinner/Spinner';

export default function CardLoader() {

    return (
        <div className='card-loader-cage'>
            <Spinner />
        </div>

    )
}
