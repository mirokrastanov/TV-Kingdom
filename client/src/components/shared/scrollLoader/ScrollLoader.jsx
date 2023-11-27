import React from 'react';
import './ScrollLoader.css';
import Spinner from '../Spinner/Spinner';

export default function ScrollLoader() {

    return (
        <div className='scroll-loader-cage'>
            <Spinner />
        </div>
    )
}
