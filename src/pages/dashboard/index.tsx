import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../dashboard/index.scss';
import WalletIcon from '../../assets/images/wallet.svg';
import HidePasswordIcon from '../../assets/images/hide-password.svg';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowBidirectionalIcon from '../../assets/images/arrow-bidirectional.svg';
import ArrowUpWhiteIcon from '../../assets/images/arrowup-white.svg';
import LearnWhiteIcon from '../../assets/images/learn-white.svg';
import CommerceIcon from '../../assets/images/commerce.svg';
import DangoteIcon from '../../assets/images/dangote.svg';
import AtlasIcon from '../../assets/images/atlas.svg';
import AppleIcon from '../../assets/images/apple.svg';
import CadburyIcon from '../../assets/images/cadbury.svg';
import Girl1 from '../../assets/images/girl-1.png';
import Girl2 from '../../assets/images/girl-2.png';
import Computer from '../../assets/images/computer.png';
import SearchIcon from '../../assets/images/search.svg';
import CloseIcon from '../../assets/images/close.svg';
import Sidebar from '../../components/Sidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';

const Dashboard = () => {

    const [showWalletBalance, setShowWalletBalance] = useState<boolean>(false);
    const [showTopGainer, setShowTopGainer] = useState<boolean>(false);
    const [showTopLoser, setShowTopLoser] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);

    function showBalanceModal(){
        setShowModalBG(true);
        setShowWalletBalance(true);
        setShowTopGainer(false);
        setShowTopLoser(false);
    }

    function showTopGainerModal(){
        setShowModalBG(true);
        setShowWalletBalance(false);
        setShowTopGainer(true);
        setShowTopLoser(false);
    }

    function showTopLoserModal(){
        setShowModalBG(true);
        setShowWalletBalance(false);
        setShowTopGainer(false);
        setShowTopLoser(true);
    }

    function closeBalanceModal(){
        setShowModalBG(false);
        setShowWalletBalance(false);
        setShowTopGainer(false);
        setShowTopLoser(false);
    }

    return (
        <div className="relative">
           <UserAreaHeader / >
               
            <div>
                <div className="flex">
                    <Sidebar />   

                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-20">
                            <span className="font-bold text-color-1">Hello Funmi</span> 👋🏾
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">
                            Overview of your account activities
                        </div>

                        <div className="flex mt-10 justify-between mb-30">
                            <div className="card-lg">
                                <div className="w-full mb-10">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="mb-10">Total Portfolio Balance</div>

                                            <div className="font-bold text-28 font-gotham-black-regular">
                                                <img src={WalletIcon} alt="" /> ₦5,000,000.00 <img src={HidePasswordIcon} alt="" width="20" className="cursor-pointer"/>
                                            </div>
                                        </div>

                                        <div>
                                            <Link to="/portfolio">
                                                <button className="button font-bold mt-2">View Portfolio</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <img src={ArrowUpIcon} alt="" width="20" className="align-middle" /> 
                                    <span className="text-green-500 font-bold font-gotham-black-regular mx-2">+500 | 5.55%</span>  7days
                                </div>
                            </div>

                            <div className="card-md">
                                <div className="w-full mb-10">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="mb-10">Total Wallet Balance</div>

                                            <div className="font-bold text-25 font-gotham-black-regular">
                                                <img src={WalletIcon} alt="" /> ₦5,000,000.00 <img src={HidePasswordIcon} alt="" width="20" className="cursor-pointer"/>
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={showBalanceModal} className="button font-bold mt-2">View Balances</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Quick Links Section*/}
                        <div className="flex justify-between mb-0">
                            <div>
                                <div className="font-bold text-color-2 mb-5">Quick links</div>
                                <div className="flex justify-between w-full space-x-10">
                                    <div>
                                        <Link to="/trade" className='no-underline text-color-1'>
                                            <div className="text-center">
                                                <button className="button-xsm cursor-pointer" type='button'>
                                                    <img src={ArrowBidirectionalIcon} alt="" />
                                                </button>
                                            </div>
                                            <div className="text-13 font-bold">Buy Stocks</div>
                                        </Link>
                                    </div>

                                    <div>
                                        <div className="text-center">
                                            <button className="button-xsm">
                                                <img src={CommerceIcon} alt="" />
                                            </button>
                                        </div>
                                        <div className="text-13 font-bold">Fund Wallet</div>
                                    </div>

                                    <div>
                                        <div className="text-center">
                                            <button className="button-xsm">
                                                <img src={ArrowUpWhiteIcon} alt="" />
                                            </button>
                                        </div>
                                        <div className="text-13 font-bold">Withdraw Funds</div>
                                    </div>

                                    <div>
                                        <div className="text-center">
                                            <button className="button-xsm">
                                                <img src={LearnWhiteIcon} alt="" />
                                            </button>
                                        </div>
                                        <div className="text-13 font-bold text-center">Learn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-490">
                                <div className="items-center flex border_1 rounded-lg pr-3 bg-white w-80 mb-20">
                                    <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                    <div className="w-full">
                                        <input type="text" className="input p-2 w-full border-0" placeholder="Quick search"/>
                                    </div>
                                </div>

                                <div className="flex justify-between space-x-2 text-12 h-1/3">
                                    <div className="quick-search">FCMG</div>
                                    <div className="quick-search">Healthcare</div>
                                    <div className="quick-search">Oil & Gas</div>
                                    <div className="quick-search">Technology</div>
                                    <div className="quick-search">Energy</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="border-bottom-1d my-10"></div>

                        <div className="flex w-full space-x-10 mb-30">
                            <div className="w-full">
                                <div className="flex justify-between w-full mb-20">
                                    <div className="font-bold">Top Gainers</div>
                                    <div onClick={showTopGainerModal} className="cursor-pointer font-bold text-color-1 text-14">
                                        See More
                                    </div>
                                </div>

                                <div>
                                    <div className="card mb-30">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                    <img src={DangoteIcon} alt="" />
                                                </div>
                                                
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5">Dangote</div>
                                                    <div className="mt-3">Dangote PLC</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                                    <div className="mt-3 text-green-500"> (10.55%) 1 day  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-30">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                    <img src={AtlasIcon} alt="" />
                                                </div>
                                                
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5">Atlas</div>
                                                    <div className="mt-3">Atlas Brent</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                                    <div className="mt-3 text-red-500"> (10.55%) 1 day  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                    <img src={AppleIcon} alt="" />
                                                </div>
                                                
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5">APPL</div>
                                                    <div className="mt-3">Apple Inc</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                                    <div className="mt-3 text-red-500"> (10.55%) 1 day  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between w-full mb-20">
                                    <div className="font-bold">Top Losers</div>
                                    <div onClick={showTopLoserModal} className="cursor-pointer font-bold text-color-1 text-14">See More</div>
                                </div>

                                <div>
                                    <div className="card mb-30">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                    <img src={DangoteIcon} alt="" />
                                                </div>
                                                
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5">Dangote</div>
                                                    <div className="mt-3">Dangote PLC</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                                    <div className="mt-3 text-green-500"> (10.55%) 1 day  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-30">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                    <img src={DangoteIcon} alt="" />
                                                </div>
                                                
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5">Dangote</div>
                                                    <div className="mt-3">Dangote PLC</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                                    <div className="mt-3 text-green-500"> (10.55%) 24hr  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-30">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                    <img src={DangoteIcon} alt="" />
                                                </div>
                                                
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5">Dangote</div>
                                                    <div className="mt-3">Dangote PLC</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                                    <div className="mt-3 text-red-500"> (10.55%) 1 day  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Movers Section */}
                        <div>
                            <div className="mb-30">
                                <div className="text-color-2 font-bold mb-20">Top Movers</div>
                                
                                <div className="border_1 flex w-21rem rounded-lg p-02rem">
                                    <div>
                                        <button type='button' className="rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">By Value</button>
                                    </div>

                                    <div>
                                        <button type='button' className="cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f">By Volume</button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-14">
                                <div className="flex justify-between space-x-5 overflow-x-scroll pr-12">
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}


                        {/* News Section */}
                        <div className="flex justify-between font-bold mb-20">
                            <div className="font-gotham-black-regular">News and Insights</div>
                            <div className="text-color-1 text-14">See More</div>
                        </div>

                        <div className="mb-32">
                            <div className="flex space-x-10">
                                <div className="flex justify-between space-x-5">
                                    <div>
                                        <div className="font-bold text-13 mb-10">How to Make Money in Stocks</div>
                                        <div className="text-13 text-color-5 mb-10 leading-5">
                                            The secret to making money in stocks? Staying invested long-term, through good times and bad. Here's how to do it
                                        </div>
                                        <div className="font-bold text-13 mb-10">&middot; 27 Aug, 2020</div>
                                    </div>

                                    <div> <img src={Girl1} alt="" /></div>
                                </div>
                                
                                <div className="flex justify-between space-x-5">
                                    <div>
                                        <div className="font-bold text-13 mb-10">How to Make Money in Stocks</div>
                                        <div className="leading-5 text-color-5 text-13 mb-10">
                                            The secret to making money in stocks? Staying invested long-term, through good times and bad. Here's how to do it
                                        </div>
                                        <div className="font-bold text-13 mb-10">&middot; 27 Aug, 2020</div>
                                    </div>

                                    <div> <img src={Computer} alt="" /></div>
                                </div>

                                <div className="flex justify-between space-x-5">
                                    <div>
                                        <div className="font-bold text-13 mb-10">How to Make Money in Stocks</div>
                                        <div className="leading-5 text-color-5 text-13 mb-10">
                                            The secret to making money in stocks? Staying invested long-term, through good times and bad. Here's how to do it
                                        </div>
                                        <div className="font-bold text-13">&middot; 27 Aug, 2020</div>
                                    </div>

                                    <div> <img src={Girl2} alt="" /></div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                    </div>                    
                </div>
            </div>

            <div className={showWalletBalance ? "wallet-balance-modal" : "wallet-balance-modal hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-25">Your wallet balances</div>

                    <div onClick={closeBalanceModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div className="wallet-balance-card mb-30">
                    <div className="italic text-green-500 mb-5">Available Balance</div>
                    <div className="font-bold text-28 font-gotham-black-regular text-white mb-5">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                        </svg> 
                        <span className="ml-2">₦5,000,000.00</span>
                    </div>
                    <div className="text-white text-13">Cash available in your wallet for trading or immediate withdrawal</div>
                </div>

                <div className="wallet-balance-card mb-30">
                    <div className="italic text-yellow-500 mb-5">Unsettled Balance</div>
                    <div className="font-bold text-28 font-gotham-black-regular text-white mb-5">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                        </svg> 
                        <span className="ml-2">₦53,000.00</span>
                    </div>
                    <div className="text-white text-13">Money from your recent sell orders that are yet to reflect in available balance</div>
                </div>

                <div className="wallet-balance-card mb-30">
                    <div className="italic text-green-950 mb-5">Reserved Balance</div>
                    <div className="font-bold text-28 font-gotham-black-regular text-white mb-5">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                        </svg> 
                        <span className="ml-2">₦100,000.00</span>
                    </div>
                    <div className="text-white text-13">This balance is money reserved for your queued Buy Orders</div>
                </div>
            </div>

            <div className={showTopGainer ? "top-gainers-modal" : "top-gainers-modal hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-25">Top Gainers</div>

                    <div onClick={closeBalanceModal}>
                    <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div className="card-xsm mb-30">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-5">
                                <div>
                                    <img src={DangoteIcon} alt="" />
                                </div>
                                
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5">Dangote</div>
                                    <div className="mt-3">Dangote PLC</div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                    <div className="mt-3 text-green-500"> (10.55%) 1 day  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-xsm mb-30">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-5">
                                <div>
                                    <img src={AtlasIcon} alt="" />
                                </div>
                                
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5">Atlas</div>
                                    <div className="mt-3">Atlas Brent</div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                    <div className="mt-3 text-green-500"> (10.55%) 1 day  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-xsm mb-30">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-5">
                                <div>
                                    <img src={AppleIcon} alt="" />
                                </div>
                                
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5">APPL</div>
                                    <div className="mt-3">Apple Inc</div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                    <div className="mt-3 text-green-500"> (10.55%) 1 day  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showTopLoser ? "top-losers-modal" : "top-losers-modal hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-25">Top Losers</div>

                    <div onClick={closeBalanceModal}>
                    <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div className="card-xsm mb-30">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-5">
                                <div>
                                    <img src={DangoteIcon} alt="" />
                                </div>
                                
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5">Dangote</div>
                                    <div className="mt-3">Dangote PLC</div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                    <div className="mt-3 text-red-500"> (10.55%) 1 day  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-xsm mb-30">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-5">
                                <div>
                                    <img src={AtlasIcon} alt="" />
                                </div>
                                
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5">Atlas</div>
                                    <div className="mt-3">Atlas Brent</div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                    <div className="mt-3 text-red-500"> (10.55%) 1 day  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-xsm mb-30">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-5">
                                <div>
                                    <img src={AppleIcon} alt="" />
                                </div>
                                
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5">APPL</div>
                                    <div className="mt-3">Apple Inc</div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-1">
                                    <div className="font-bold text-color-2 mb-5 text-right">₦23.5</div>
                                    <div className="mt-3 text-red-500"> (10.55%) 1 day  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden" }>
            </div>
        </div>
    );
};

export default Dashboard;