import React from 'react';
import logo from './../../assets/icons/logo.png';
import './index.scss';

const Logo = () => {
    return (
        <div className="app-logo">
            <div style={{textAlign: 'right'}}>
                <img src={logo} alt="logo" />
            </div>
            <h2 style={{fontWeight: 800, margin: 0, color: 'white'}}>anchoria</h2>
        </div>
    );
};

export default Logo;