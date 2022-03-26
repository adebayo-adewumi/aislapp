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
        <div className={showSidebar === 'show' ? "sidebar fixed block md:block h-full lg:inset-auto lg:static lg:translate-x-0 translate-x-0 ease-out transition-medium":"sidebar fixed h-full hidden md:block lg:inset-auto lg:static lg:translate-x-0 -translate-x-full ease-in transition-medium"}>
            <ul>
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

            <a href="https://merchant.payflexi.co/" className="-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg bg-indigo-100 border border-indigo-200 menu-link-active" >
                <span className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 transition-all ease-out transition-medium">
                        <path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5h3a1 1 0 00.83-.45L10 8.8l5.17 7.75a1 1 0 001.66 0l1.7-2.55H21z" className="ic-sec"></path> 
                        <path d="M21 12h-3a1 1 0 00-.83.45L16 14.2l-5.17-7.75a1 1 0 00-1.66 0L5.47 12H3V5c0-1.1.9-2 2-2h14a2 2 0 012 2v7z" className="ic-pri"></path>
                    </svg> 
                    <span className="ml-2 text-indigo-700 font-semibold">Dashboard</span>
                </span>
            </a>
        </div>
    );
};

export default Sidebar;