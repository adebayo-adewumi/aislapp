import React, { useState } from 'react';
import logo from '../../../assets/images/anchoria.svg';
import notification from '../../../assets/images/notification.svg';
import { Link } from 'react-router-dom';
import PhoneBlackIcon from '../../../assets/images/phone-black.svg';
import SecurityIcon from '../../../assets/images/security.svg';
import LogoutIcon from '../../../assets/images/logout.svg';

const UserAreaHeader = () => {
    let authCustomerInfo = JSON.parse(localStorage.getItem('aislCustomerInfo') as string);
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
        <div className="shadow-xs fixed w-full bg-white z-40" style={{borderBottom:' 2px solid rgb(237,242,247)'}}>
            <header className="px-6">
                <div className="flex justify-between items-center py-3">
                    <div className="flex-1 flex items-center space-x-5">
                        <button className="block bg-transparent border-0 text-gray-600 hover:text-gray-700 pt-4 pb-0 lg:hidden">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM4 17a1 1 0 100 2h7a1 1 0 100-2H4z"></path>
                            </svg>
                        </button> 
                        
                        <div className="relative ml-3 lg:ml-0">
                            <img src={logo} alt="Anchoria Logo" width="144" height="40"/>
                        </div>
                    </div> 
                    
                    <div className="flex items-center">
                        <Link to="/profile?type=notification" className='bg-transparent border-0'>
                            <img src={notification} alt="bell" style={{ width: '2rem' }} />
                        </Link> 
                        
                        <div className="ml-5 relative" onClick={toggleHeaderMenu}>
                            <button className="cursor-pointer bg-transparent border-0 relative flex items-center focus:outline-none">
                                <img src={"https://ui-avatars.com/api/?name="+authCustomerFullname} className="rounded-full h-10 w-10" alt=""/> 
                                
                                <span className="hidden xl:block ml-2 font-medium text-sm">{authCustomerFullname}</span>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current text-gray-700">
                                    <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path>
                                </svg>
                            </button> 

                            <div className={showHeaderMenu ? 'absolute bg-white rounded w-full border shadow-sm' : 'hidden'} style={{ top: '110%' }}>
                                <div className='px-3 py-2 text-sm'>
                                    <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                        <Link to="/learn?type=contactus" className='flex space-x-3 no-underline text-black items-center hover:text-green-900'>
                                            <div>
                                                <img src={PhoneBlackIcon} alt="" style={{ width: '1.3rem' }} />
                                            </div>

                                            <div> Contact Us</div>
                                        </Link>
                                    </div>

                                    <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                        <Link to="/profile?type=security" className='flex space-x-3 no-underline text-black items-center hover:text-green-900'>
                                            <div><img src={SecurityIcon} alt="" style={{ width: '1.5rem' }} /></div>
                                            <div className='w-full'> Security</div>
                                        </Link>
                                    </div>

                                    <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                        <Link to="/" className='flex space-x-3 no-underline text-black items-center hover:text-green-900'>
                                            <div><img src={LogoutIcon} alt="" style={{ width: '1.5rem' }} /></div>
                                            <div className='w-full' onClick={doLogout}> Logout</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default UserAreaHeader;