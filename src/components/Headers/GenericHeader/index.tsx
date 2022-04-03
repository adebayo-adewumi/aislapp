import React from 'react';
import './index.scss';
import img from '../../../assets/images/anchoria.svg';

const AuthPagesHeader = () => {
    return (
        <div className="shadow-xs fixed w-full bg-white z-40" style={{borderBottom:' 2px solid rgb(237,242,247)'}}>
            <header className="px-6">
                <div className="flex justify-between items-center py-3">
                    <div className="flex-1 flex items-center space-x-5">                        
                        <div className="relative ml-3 lg:ml-0">
                            <img src={img} alt="Anchoria Logo" width="144" height="40"/>
                        </div>
                    </div> 
                </div>
            </header>
        </div>
    );
};

export default AuthPagesHeader;