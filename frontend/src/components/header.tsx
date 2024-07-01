import React from 'react';
import { InitButton } from './initButton';
import '../styles/header.css'

const Header = () => {
    return (
        <div className='HeaderWrapper'>
            <div className='HeaderContainer1'></div>
            <div className='HeaderContainer2'>
                <div className='Logo'></div>
                <h1>EE Camp Wallet</h1>
            </div>
            <div className='HeaderContainer3'>
                <InitButton />
            </div>
        </div>
    );
}

export { Header };