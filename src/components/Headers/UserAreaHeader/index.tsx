import React, { useState } from 'react';
import logo from '../../../assets/images/anchoria.svg';
import notification from '../../../assets/images/notification.svg';
import chevronDown from '../../../assets/images/chevron-down.svg';
import { Link } from 'react-router-dom';
import PhoneBlackIcon from '../../../assets/images/phone-black.svg';
import SecurityIcon from '../../../assets/images/security.svg';
import LogoutIcon from '../../../assets/images/logout.svg';

const UserAreaHeader = () => {
    let authCustomerInfo = JSON.parse(localStorage.getItem('aislCustomerInfo') as string);
    let authCustomerInitials = authCustomerInfo.firstName[0] + '' + authCustomerInfo.lastName[0];
    let authCustomerFullname = authCustomerInfo.firstName + ' ' + authCustomerInfo.lastName;

    const [showHeaderMenu, setShowHeaderMenu] = useState<boolean>(false);

    function toggleHeaderMenu() {

        if (showHeaderMenu) {
            setShowHeaderMenu(false)
        }
        else {
            setShowHeaderMenu(true)
        }
    }

    const doLogout = () => {
        localStorage.clear();
    }

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
                            <Link to="/profile?type=notification">
                                <div className="pt-2">
                                    <img src={notification} alt="bell" style={{ width: '2rem' }} />
                                </div>
                            </Link>

                            <div className='relative cursor-pointer' onClick={toggleHeaderMenu}>
                                <div className="flex space-x-4">
                                    <div className="pt-1">
                                        <div className='rounded-full w-10 h-10 bg-green-900 text-white '>
                                            <div className='pt-3 pl-2 font-bold hidden'>{authCustomerInitials}</div>
                                            <img src={"https://ui-avatars.com/api/?name="+authCustomerFullname} className="rounded-full h-10 w-10"  alt=""/>
                                        </div>
                                    </div>

                                    <div className="font-bold text-color-1 pt-4">{authCustomerFullname}</div>

                                    <div className="pt-4">
                                        <img src={chevronDown} alt="" />
                                    </div>
                                </div>

                                <div className={showHeaderMenu ? 'absolute bg-white rounded w-full border border-gray-500 shadow-sm' : 'hidden'} style={{ top: '110%' }}>
                                    <div className='px-3 py-2 text-sm'>
                                        <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                            <Link to="/learn" className='flex space-x-3 no-underline text-black items-center'>
                                                <div style={{ marginTop: '6px' }}><img src={PhoneBlackIcon} alt="" style={{ width: '1.3rem' }} /></div>

                                                <div> Contact Us</div>
                                            </Link>
                                        </div>

                                        <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                            <Link to="/profile" className='flex space-x-3 no-underline text-black items-center'>
                                                <div><img src={SecurityIcon} alt="" style={{ width: '1.5rem' }} /></div>
                                                <div className='mb-5'> Security</div>
                                            </Link>
                                        </div>

                                        <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                            <Link to="/" className='flex space-x-3 no-underline text-black items-center'>
                                                <div><img src={LogoutIcon} alt="" style={{ width: '1.5rem' }} /></div>
                                                <div className='mb-5' onClick={doLogout}> Logout</div>
                                            </Link>
                                        </div>
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