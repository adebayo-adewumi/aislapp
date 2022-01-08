import React from 'react';
import './index.scss';
import img from './../../assets/images/auth.canvas.png';
import Logo from './../Logo/index';

const AuthScreenCanvas = () => {
    return (
        <div className="auth-canvas">
            <div className="auth-screen-logo">
                <Logo />
            </div>
            <img className="auth-canvas-img" src={img} alt="auth.canvas" />
        </div>
    );
};

export default AuthScreenCanvas;