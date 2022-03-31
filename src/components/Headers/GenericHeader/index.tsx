import React from 'react';
import './index.scss';
import img from '../../../assets/images/anchoria.svg';
import { Header } from 'antd/lib/layout/layout';

const AuthPagesHeader = () => {
    return (
        <Header className="header" style={{backgroundColor: 'white'}}>
            <div className="logo">
                <img src={img} alt="Anchoria Logo" style={{height: '40px'}}/>
            </div>
        </Header>
    );
};

export default AuthPagesHeader;