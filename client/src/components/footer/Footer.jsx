import React from 'react';
import './Footer.css';

export default function Footer() {

    return (
        <footer className='footer-ctr'>
            <p>Author: <a href="https://github.com/mirokrastanov" target='_blank' className='a-left'>Miro Krastanov</a></p>
            <p>Powered by: <a href="https://www.tvmaze.com/api" target='_blank' className='a-left'>TVMaze.com</a></p>
        </footer>
    )
}
