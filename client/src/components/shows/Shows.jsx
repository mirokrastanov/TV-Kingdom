import React from 'react';
import './Shows.css';
import Card from '../shared/card/card';

export default function Shows() {

    return (
        <div className="shows-ctr">
            <h1>Shows</h1>
            <div className="cards-cage">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
};
