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

const Sidebar = () => {    

    const [urlPath, setURLPath] = useState('/dashboard');

    let routePath = useLocation().pathname;

    const regex = new RegExp('/account/*');

    useEffect(()=>{

        async function getURLPath(){           

            setURLPath(routePath);
        }

        getURLPath();
    });

    return (
        <div className="sidebar">
            <ul>
                <li className="space-x-5">
                    <Link to='/dashboard' className={ urlPath === '/dashboard' || urlPath === "/news" ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}> 
                        <div><img src={urlPath === '/dashboard' || urlPath === "/news" ? PageActiveIcon : PageIcon} alt="" /></div>
                        <div className="pl-5">Home</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/trade" className={ urlPath === '/trade' ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/trade' ? TradeActiveIcon : TradeIcon} alt="" /></div>
                        <div className="pl-5">Trade</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/portfolio" className={ urlPath === '/portfolio' ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/portfolio' ? PortfolioActiveIcon : PortfolioIcon} alt="" /></div>
                        <div className="pl-5">Portfolio</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/watchlist" className={ urlPath === '/watchlist' ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/watchlist' ? StarGrayActiveIcon : StarGrayIcon} alt="" /></div>
                        <div className="pl-5">Watchlist</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/account" className={ regex.test(urlPath) ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={regex.test(urlPath) ? AccountActiveIcon : AccountIcon} alt="" /></div>
                        <div className="pl-5">Account</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/profile" className={ urlPath === '/profile' ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/profile' ? ProfileActiveIcon : ProfileIcon} alt="" /></div>
                        <div className="pl-5">Profile</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/learn" className={ urlPath === '/learn' ? "items-center active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700 items-center"}>
                        <div><img src={urlPath === '/learn' ? LearnActiveIcon : LearnIcon} alt="" /></div>
                        <div className="pl-5">Learn</div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;