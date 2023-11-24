import React from 'react';
import './Summary.css';

export default function Summary({ summary }) {

    return (
        <div className='info' dangerouslySetInnerHTML={{ __html: summary }} />
    );
}
