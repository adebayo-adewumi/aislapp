import React, { useState } from 'react';
import logo from '../../../assets/images/anchoria.svg';
import notification from '../../../assets/images/notification.svg';
import { Link } from 'react-router-dom';
import PhoneBlackIcon from '../../../assets/images/phone-black.svg';
import SecurityIcon from '../../../assets/images/security.svg';
import LogoutIcon from '../../../assets/images/logout.svg';
import { Layout, Menu } from 'antd';

const UserAreaHeader = () => {
    let authCustomerInfo = JSON.parse(localStorage.getItem('aislCustomerInfo') as string);
    let authCustomerFullname = authCustomerInfo.firstName + ' ' + authCustomerInfo.lastName;

    const [showHeaderMenu, setShowHeaderMenu] = useState<boolean>(false);

    const { Header } = Layout;

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
        <Layout>
            <Header className=" justify-between">
                <div className="logo">
                    <img src={logo} alt="Anchoria Logo" style={{height: '40px'}}/>
                </div>

                <div>

                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="justify-end" style={{height: '0'}}>
                        <Menu.Item key="1" className='hover:bg-white'>
                            <Link to="/profile?type=notification">
                                <div>
                                    <img src={notification} alt="bell" style={{ width: '2rem' }} />
                                </div>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="1" className='menu-list-pr' onClick={toggleHeaderMenu}>
                            <div style={{paddingRight: '10px'}}>
                                <img src={"https://ui-avatars.com/api/?name="+authCustomerFullname} className="rounded-full h-10 w-10" alt="" />
                            </div> 
                        </Menu.Item>
                        
                        <Menu.Item key="1" className='menu-list-pl menu-list-pr' onClick={toggleHeaderMenu}>
                            <span style={{color: '#000000'}}>{authCustomerFullname}</span>
                        </Menu.Item>

                        <Menu.Item key="1" className='menu-list-pl' style={{height: '.4rem'}} onClick={toggleHeaderMenu}>
                            <div style={{marginTop: '4px', paddingLeft: '5px', height: '.4rem'}}>
                                <svg fill="#777777" viewBox="0 0 20 20" style={{width: '20px', height: '20px'}}>
                                    <path d="M10 14a1 1 0 0 1-.755-.349L5.329 9.182a1.367 1.367 0 0 1-.205-1.46A1.184 1.184 0 0 1 6.2 7h7.6a1.18 1.18 0 0 1 1.074.721 1.357 1.357 0 0 1-.2 1.457l-3.918 4.473A1 1 0 0 1 10 14z"></path>
                                </svg> 
                            </div>

                            
                        </Menu.Item>
                    </Menu>

                    <div className={showHeaderMenu ? 'absolute bg-white rounded w-64 border border-gray-500 shadow-sm top-16 right-16' : 'hidden'}>
                        <div className='px-3 py-2 text-sm'>
                            <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                <Link to="/learn?type=contactus" className='flex space-x-3 text-black items-center'>
                                    <img src={PhoneBlackIcon} alt="" style={{ width: '1.3rem' }} />

                                    <div className='w-full' style={{color: '#000000'}}> Contact Us</div>
                                </Link>
                            </div>

                            <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                <Link to="/profile?type=security" className='flex space-x-3 text-black items-center'>
                                    <img src={SecurityIcon} alt="" style={{ width: '1.5rem' }} />
                                    <div className='w-full' style={{color: '#000000'}}> Security</div>
                                </Link>
                            </div>

                            <div className='hover:bg-gray-100 hover:font-bold px-3 rounded py-2'>
                                <Link to="/" className='flex space-x-3 text-black items-center'>
                                    <img src={LogoutIcon} alt="" style={{ width: '1.5rem' }} />
                                    <div className='w-full' onClick={doLogout} style={{color: '#000000'}}> Logout</div>
                                </Link>
                            </div>
                            
                        </div>

                        
                    </div>
                </div>

                
            </Header>
        </Layout>
    );
};

export default UserAreaHeader;