import React from 'react';
import './index.scss';
import img from '../../../assets/images/anchoria.svg';

const AuthPagesHeader = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={img} alt="Anchoria Logo" />
            </div>
        </div>
    );
};

export default AuthPagesHeader;