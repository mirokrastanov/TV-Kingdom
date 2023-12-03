import React from 'react';
import './Summary.css';

export default function SummaryComplete({ summary }) {

    return (
        <div className='info-full' dangerouslySetInnerHTML={{ __html: summary }} />
    );
}
