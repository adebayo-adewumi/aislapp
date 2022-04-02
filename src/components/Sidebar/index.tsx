import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import PageIcon from '../../assets/images/page.svg';
import PageActiveIcon from '../../assets/images/page-active.svg';
import TradeIcon from '../../assets/images/trade.svg';
import TradeActiveIcon from '../../assets/images/trade-active.svg';
import PortfolioIcon from '../../assets/images/portfolio.svg';
import PortfolioActiveIcon from '../../assets/images/portfolio-active.svg';
import StarGrayIcon from '../../assets/images/star-gray.svg';
import StarGrayActiveIcon from '../../assets/images/star-gray-active.svg';
import AccountIcon from '../../assets/images/account.svg';
import AccountActiveIcon from '../../assets/images/account-active.svg';
import ProfileIcon from '../../assets/images/profile.svg';
import ProfileActiveIcon from '../../assets/images/profile-active.svg';
import LearnIcon from '../../assets/images/learn.svg';
import LearnActiveIcon from '../../assets/images/learn-active.svg';
import '../../components/Sidebar/index.scss'

const Sidebar = (props :any) => {    

    const [urlPath, setURLPath] = useState('/dashboard');
    const [showSidebar, setShowSidebar] = useState('hide');

    let routePath = useLocation().pathname;

    const regex = new RegExp('/account/*');

    useEffect(()=>{

        async function getURLPath(){           

            setURLPath(routePath);
        }

        getURLPath();
    });

    useEffect(()=>{

        function toggleSidebar(){ 
            setInterval(()=>{
                setShowSidebar(localStorage.getItem("aislToggleSidebar") as string);
            },100);
        }

        toggleSidebar();
    });


    return (
        <div className={ showSidebar === 'show' ? "fixed z-30 inset-y-0 left-0 w-64 px-8 py-4 bg-white border-r overflow-y-auto lg:inset-auto lg:static lg:translate-x-0 -translate-x-full ease-in transition-medium":"fixed z-30 inset-y-0 left-0 w-64 px-8 py-4 bg-white border-r overflow-y-auto lg:inset-auto lg:static lg:translate-x-0 -translate-x-full ease-in transition-medium"}>
            <nav>  
                <div className='mt-24'>
                    <Link to="/dashboard" className={ urlPath === '/dashboard' || urlPath === "/news" ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={urlPath === '/dashboard' ? PageActiveIcon : PageIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Home</span></span>
                    </Link>   

                    <Link to="/trade" className={ urlPath === '/trade' ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={urlPath === '/trade' ? TradeActiveIcon : TradeIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Trade</span></span>
                    </Link>   

                    <Link to="/portfolio" className={ urlPath === '/portfolio' ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={urlPath === '/portfolio' ? PortfolioActiveIcon : PortfolioIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Portfolio</span></span>
                    </Link>   

                    <Link to="/watchlist" className={ urlPath === '/watchlist' ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={urlPath === '/watchlist' ? StarGrayActiveIcon : StarGrayIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Watchlist</span></span>
                    </Link> 
                                       
                    <Link to="/account" className={ urlPath === '/account' ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={regex.test(urlPath) ? AccountActiveIcon : AccountIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Account</span></span>
                    </Link>     

                    <Link to="/profile" className={ urlPath === '/profile' ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={urlPath === '/profile' ? ProfileActiveIcon : ProfileIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Profile</span></span>
                    </Link> 

                    <Link to="/learn" className={ urlPath === '/learn' ? "-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100 bg-green-100 sidebar-active font-bold":"-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-green-100"}><span className="inline-flex items-center">
                        <img src={urlPath === '/learn' ? LearnActiveIcon : LearnIcon} alt="" className="h-6 w-6 transition-all ease-out transition-medium" />

                        <span className="ml-2 text-gray-700">Learn</span></span>
                    </Link>                    
                </div>   
            </nav>

            <ul className='hidden'>
                <li className="space-x-5">
                    <Link to='/dashboard' className={ urlPath === '/dashboard' || urlPath === "/news" ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}> 
                        <div><img src={urlPath === '/dashboard' || urlPath === "/news" ? PageActiveIcon : PageIcon} alt="" /></div>
                        <div className="pl-5">Home</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/trade" className={ urlPath === '/trade' ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/trade' ? TradeActiveIcon : TradeIcon} alt="" /></div>
                        <div className="pl-5">Trade</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/portfolio" className={ urlPath === '/portfolio' ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/portfolio' ? PortfolioActiveIcon : PortfolioIcon} alt="" /></div>
                        <div className="pl-5">Portfolio</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/watchlist" className={ urlPath === '/watchlist' ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/watchlist' ? StarGrayActiveIcon : StarGrayIcon} alt="" /></div>
                        <div className="pl-5">Watchlist</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/account" className={ regex.test(urlPath) ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={regex.test(urlPath) ? AccountActiveIcon : AccountIcon} alt="" /></div>
                        <div className="pl-5">Account</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/profile" className={ urlPath === '/profile' ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/profile' ? ProfileActiveIcon : ProfileIcon} alt="" /></div>
                        <div className="pl-5">Profile</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/learn" className={ urlPath === '/learn' ? "items-center active w-full no-underline flex text-green-900" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/learn' ? LearnActiveIcon : LearnIcon} alt="" /></div>
                        <div className="pl-5">Learn</div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;