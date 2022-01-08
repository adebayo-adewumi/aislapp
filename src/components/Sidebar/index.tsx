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
                    <Link to='/dashboard' className={ urlPath === '/dashboard' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}> 
                        <div><img src={urlPath === '/dashboard' ? PageActiveIcon : PageIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Home</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/trade" className={ urlPath === '/trade' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}>
                        <div><img src={urlPath === '/trade' ? TradeActiveIcon : TradeIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Trade</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/portfolio" className={ urlPath === '/portfolio' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}>
                        <div><img src={urlPath === '/portfolio' ? PortfolioActiveIcon : PortfolioIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Portfolio</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/watchlist" className={ urlPath === '/watchlist' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}>
                        <div><img src={urlPath === '/watchlist' ? StarGrayActiveIcon : StarGrayIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Watchlist</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/account" className={ urlPath === '/account' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}>
                        <div><img src={urlPath === '/account' ? AccountActiveIcon : AccountIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Account</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/profile" className={ urlPath === '/profile' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}>
                        <div><img src={urlPath === '/profile' ? ProfileActiveIcon : ProfileIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Profile</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/learn" className={ urlPath === '/learn' ? "active w-full no-underline flex text-color-1" : "w-full no-underline flex text-gray-700"}>
                        <div><img src={urlPath === '/learn' ? LearnActiveIcon : LearnIcon} alt="" /></div>
                        <div className="pl-5 pt-1">Learn</div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;