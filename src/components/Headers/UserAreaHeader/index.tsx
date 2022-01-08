import React, {useEffect} from 'react';
import logo from '../../../assets/images/anchoria.svg';
import notification from '../../../assets/images/notification.svg';
import chevronDown from '../../../assets/images/chevron-down.svg';

const UserAreaHeader = () => {    

    let authUserFullname = localStorage.getItem('aislUserFullname')
    let authUserInitials = authUserFullname?.split(' ')[0][0] +''+ authUserFullname?.split(' ')[1][0];

    return (
        <div className="relative">
            <div className="topbar py-3 pl-4 pr-20 z-10">
                <div className="flex justify-between">
                    <div>
                        <div className="logo-container">
                            <img className="user-area-logo" src={logo} alt="Anchoria Logo" width="120" />
                        </div>
                    </div>

                    <div>
                        <div className="flex space-x-8">
                            <div className="pt-2"><img src={notification} alt="bell" /></div>
                            <div>
                                <div className="flex space-x-4">
                                    <div className="pt-1">
                                        <div className='rounded-full w-10 h-10 bg-green-900 text-white '>
                                            <div className='pt-3 pl-2 font-bold'>{authUserInitials}</div>  
                                        </div>
                                    </div>

                                    <div className="font-bold text-color-1 pt-4">{authUserFullname}</div>

                                    <div className="pt-4">
                                        <img src={chevronDown} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAreaHeader;