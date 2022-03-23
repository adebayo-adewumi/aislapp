import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../dashboard/index.scss';
import WalletIcon from '../../assets/images/wallet.svg';
import ShowPasswordIcon from '../../assets/images/show-password.svg';
import HidePasswordIcon from '../../assets/images/hide-password.svg';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowBidirectionalIcon from '../../assets/images/arrow-bidirectional.svg';
import ArrowUpWhiteIcon from '../../assets/images/arrowup-white.svg';
import LearnWhiteIcon from '../../assets/images/learn-white.svg';
import CommerceIcon from '../../assets/images/commerce.svg';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import SearchIcon from '../../assets/images/search.svg';
import CloseIcon from '../../assets/images/close.svg';
import Sidebar from '../../components/Sidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import axios from 'axios';
import * as HelperFunctions from '../../lib/helper';
import moment from 'moment';
import ArrowDownIcon from '../../assets/images/arrow-down.svg';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import {authOnboardingServiceBaseUrl, getNewsEndpoint, getPortfolioEndpoint, getTopGainersEndpoint, getTopLosersEndpoint, getTopMoverByValueEndpoint, portfolioServiceBaseUrlUrl, stockTradingServiceBaseUrlUrl, utilityServiceBaseUrlUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';

const Dashboard = () => {

    let navigate = useNavigate();

    const [walletBalance, setWalletBalance] = useState(0);
    const [unsettledBalance, setUnsettledBalance] = useState(0);
    const [reservedBalance, setReservedBalance] = useState(0);
    const [showWalletBalance, setShowWalletBalance] = useState<boolean>(false);

    const [showTopGainer, setShowTopGainer] = useState<boolean>(false);
    const [showTopLoser, setShowTopLoser] = useState<boolean>(false);

    const [showModalBG, setShowModalBG] = useState<boolean>(false);

    const [topGainersList, setTopGainersList] = useState('');
    const [topGainersSeeMore, setTopGainersSeeMore] = useState([]);

    const [topLosersList, setTopLosersList] = useState('');
    const [topLosersSeeMore, setTopLosersSeeMore] = useState([]);

    const [topMoversList, setTopMoversList] = useState('');

    const [newsList, setNewsList] = useState('');

    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [netPortfolioReturns, setNetPortfolioReturns] = useState(0);
    const [netPortfolioReturnsPercentage, setNetPortfolioReturnsPercentage] = useState(0);

    const [byValueActive, setByValueActive] = useState<boolean>(true);
    const [byVolumeActive, setByVolumeActive] = useState<boolean>(false);

    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    const [topGainersApiResponseSuccess, setTopGainersApiResponseSuccess] = useState<boolean>(false);
    const [topLosersApiResponseSuccess, setTopLosersApiResponseSuccess] = useState<boolean>(false);
    const [topMoversApiResponseSuccess, setTopMoversApiResponseSuccess] = useState<boolean>(false);
    const [newsApiResponseSuccess, setNewsApiResponseSuccess] = useState<boolean>(false);

    const [customer] = useState(JSON.parse(localStorage.getItem('aislCustomerInfo') as string));

    const [searchQuery, setSearchQuery] = useState('');

    const [isShowPortfolioBalance, setIsShowPortfolioBalance] = useState<boolean>(false);
    const [isShowWalletBalance, setIsShowWalletBalance] = useState<boolean>(false);

    const [kycStatus, setKYCStatus] = useState('{"data": { "kycLevel":"Level1" }}');

    useEffect(() => {
        document.title = "Dashboard - Anchoria";

        HelperFunctions.addOverflowAndPaddingToModalBody();

        function getPortfolioList() {

            getAxios(axios).get(getPortfolioEndpoint)
                .then(function (response) {
                    setTotalPortfolioValue(response.data.data.totalCurrentPrice);
                    setNetPortfolioReturns(response.data.data.totalPortfolioReturn);
                    setNetPortfolioReturnsPercentage(response.data.data.percentageReturn);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getTopMovers() {
            let url = getTopMoverByValueEndpoint;

            getAxios(axios).get(url)
                .then(function (response) {
                    const topmovers = response.data.data.map((el: any, index :any) =>
                        <div className="card md:w-2/5 w-full md:p-5 px-3 py-3 md:mb-0 mb-6">
                            <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.stockCode + "&sign=" + (parseFloat(el.percentageChange) >= 0 ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose+"&tradeAction=buy"} className='no-underline' key={index}>
                                <div className="mb-10">
                                    <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt=""/>
                                </div>

                                <div className="flex w-full justify-between space-x-5 md:mb-0 md:text-sm text-xs">
                                    <div className="font-bold text-gray-900 md:text-xs text-xs">{el.stockCode.substring(0, 5)}...</div>
                                    <div className="font-bold text-black md:text-xs text-xs">₦ {HelperFunctions.formatCurrencyWithDecimal(el.price)} </div>
                                </div>

                                <div className='hidden'>
                                    <div className="text-green-500 md:text-sm text-xs">{HelperFunctions.formatCurrencyWithDecimal(el.percentageChange).replace("-","")} % </div>
                                </div>
                            </Link>
                        </div>
                    );

                    setTopMoversList(topmovers);
                    setTopMoversApiResponseSuccess(true);
                })
                .catch(function (error) {
                    setTopMoversApiResponseSuccess(false);
                });
        }

        function getWalletBalance() {

            let customer = HelperFunctions.getCustomerInfo();



            getAxios(axios).get(portfolioServiceBaseUrlUrl + '/account/balance?customerId=' + customer.id)
                .then(function (response) {
                    HelperFunctions.removeOverflowAndPaddingFromModalBody();

                    setWalletBalance(response.data.data.balance);
                    setReservedBalance(response.data.data.reservedBalance);
                    setUnsettledBalance(response.data.data.unsettledBalance);
                    setShowPageLoader(false);
                })
                .catch(function (error) {
                    HelperFunctions.removeOverflowAndPaddingFromModalBody();
                    console.log(error)
                });
        }

        function getTopGainers() {

            getAxios(axios).get(getTopGainersEndpoint)
                .then(function (response) {
                    const fullGainersList = response.data.data;
                    const takeGainers = [response.data.data[0], response.data.data[1], response.data.data[2]];

                    const listTopGainers = takeGainers.map((el: any, index :any) =>
                        <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.stockCode + "&sign=positive&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose+"&tradeAction=buy"} className='no-underline' key={index}>
                            <div className="card mb-30 md:px-3 px-3 py-3">
                                <div className="flex justify-between w-full">
                                    <div className="flex md:space-x-5 space-x-3">
                                        <div>
                                            <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt=""/>
                                        </div>

                                        <div className="mt-1">
                                            <div className="font-bold mb-5 text-black md:text-sm text-xs">{el.stockCode}</div>

                                            <div className="md:mt-3 md:text-sm text-xs text-gray-500 md:block hidden">{el.name.substring(0,15)}...</div>

                                            <div className="md:mt-3 md:text-sm text-xs text-gray-500 md:hidden block">{el.name.substring(0,15)}...</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-1">
                                            <div className="font-bold mb-5 text-black text-right md:text-sm text-xs">₦ {HelperFunctions.formatCurrencyWithDecimal(parseFloat(el.price))}</div>

                                            <div className={parseFloat(el.percentageChange) >= 0 ? "mt-3 text-green-500 md:text-sm text-xs" : "text-red-500 mt-3 md:text-sm text-xs"}> { HelperFunctions.formatCurrencyWithDecimal(el.percentageChange.replace('-',''))}%  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) as unknown as string;

                    setTopGainersList(listTopGainers);
                    setTopGainersSeeMore(fullGainersList);
                    setTopGainersApiResponseSuccess(true);
                })
                .catch(function (error) {
                    setTopGainersApiResponseSuccess(false);
                });
        }

        function getTopLosers() {

            getAxios(axios).get(getTopLosersEndpoint)
                .then(function (response) {
                    const fullLosersList = response.data.data;
                    const takeLosers = [response.data.data[0], response.data.data[1], response.data.data[2]];

                    const listTopLosers = takeLosers.map((item: any, index :any) =>
                        <Link to={"/stock?name=" + item.name + "&sector=" + item.sector + "&symbol=" + item.stockCode + "&sign=negative&change=" + item.change + "&close=" + item.close + "&open=" + item.open + "&high=" + item.high + "&low=" + item.low + "&wkhigh=" + item.weekHigh52 + "&wklow=" + item.weekLow52 + "&volume=" + item.volume + "&mktsegment=" + item.mktSegment + "&pclose=" + item.pclose+"&tradeAction=buy"} className='no-underline' key={index}>
                            <div className="card mb-30 md:px-3 px-3 py-3">
                                <div className="flex justify-between w-full">
                                    <div className="flex md:space-x-5 space-x-3">
                                        <div>
                                            <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" />
                                        </div>

                                        <div className="mt-1">
                                            <div className="font-bold text-black md:text-sm text-xs mb-5">{item.stockCode}</div>

                                            <div className="md:mt-3 text-gray-500 md:text-sm text-xs md:block hidden">{item.name.substring(0,15)}...</div>

                                            <div className="md:mt-3 text-gray-500 md:text-sm text-xs md:hidden block">{item.name.substring(0,15)}...</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-1">
                                            <div className="font-bold text-black mb-5 text-right md:text-sm text-xs">₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>

                                            <div className={parseFloat(item.percentageChange) >= 0 ? "mt-3 text-green-500 md:text-sm text-xs" : "text-red-500 mt-3 md:text-sm text-xs"}> { HelperFunctions.formatCurrencyWithDecimal(item.percentageChange.replace('-',''))}%  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) as unknown as string;

                    setTopLosersList(listTopLosers);
                    setTopLosersSeeMore(fullLosersList);
                    setTopLosersApiResponseSuccess(true);
                })
                .catch(function (error) {
                    setTopLosersApiResponseSuccess(false);
                });
        }

        function getNews() {

            getAxios(axios).get(getNewsEndpoint)
                .then(function (response) {
                    const takeNews = [response.data.data[0], response.data.data[1]];

                    const newsItem = takeNews.map((item: any, index :any) =>
                        
                        <div className="flex justify-between md:space-x-5 space-x-3  md:mb-0 mb-11 md:w-1/2 w-full">
                            <div>
                                <div className="font-bold md:text-sm text-xs mb-10 text-black">
                                    <a href={item.url === null || item.url === '' ? '#': item.url} className='text-black no-underline' target="_blank" key={index} rel="noreferrer">{item.title}</a>
                                </div>

                                <div className="md:text-sm text-xs text-gray-500 mb-10 leading-5 md:block hidden">
                                    <a href={item.url === null || item.url === '' ? '#': item.url} className='text-black no-underline' target="_blank" key={index} rel="noreferrer">{item.snippet}</a>
                                </div>

                                <div className="md:text-sm text-xs text-gray-500 mb-10 leading-5 md:hidden block">
                                    <a href={item.url === null || item.url === '' ? '#': item.url} className='text-black no-underline' target="_blank" key={index} rel="noreferrer">{item.snippet.substring(0, 100)}...</a>
                                </div>

                                <div className="font-bold md:text-sm text-xs text-black mb-10">
                                    <a href={item.url === null || item.url === '' ? '#': item.url} className='text-black no-underline' target="_blank" key={index} rel="noreferrer">&middot; {moment(item.date).format("MMM Do YYYY, hh:ss a")}</a>
                                </div>
                            </div>

                            <div > 
                                <a href={item.url === null || item.url === '' ? '#': item.url} className='no-underline text-black' target="_blank" key={index} rel="noreferrer">
                                    <img src={item.imageUrl} className='newsImg rounded-lg' alt="" />
                                </a>
                            </div>
                        </div>
                    ) as unknown as string;

                    setNewsList(newsItem);
                    setNewsApiResponseSuccess(true);
                })
                .catch(function (error) {
                    setNewsApiResponseSuccess(false);
                });
        }

        function getWatchlist() {
            let customer = HelperFunctions.getCustomerInfo();

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/watchlist?customerId=' + customer.id)
            .then(function (response) {
                localStorage.SetItem("aislUserWatchlist", JSON.stringify(response.data.data));
            })
            .catch(function (error) {
            });
        }

        function testData() {
          

            getAxios(axios).get(utilityServiceBaseUrlUrl + '/lov/stocks-details')
            .then(function (response) {
               
            })
            .catch(function (error) {
            });
        }

        getWalletBalance();
        getTopGainers();
        getTopLosers();
        getNews();
        getPortfolioList();
        getTopMovers();
        getWatchlist();
        testData();
        

    }, []);

    useEffect(()=>{

        function getCustomerKYCStatus() {

            getAxios(axios).get(authOnboardingServiceBaseUrl + '/customer/kyc/status')
                .then(function (response) { 
                    setKYCStatus(JSON.stringify(response.data.data));
                })
                .catch(function (error) { });
        }

        getCustomerKYCStatus();

    },[])

    function showBalanceModal() {
        setShowModalBG(true);
        setShowWalletBalance(true);
        setShowTopGainer(false);
        setShowTopLoser(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function showTopGainerModal() {
        setShowModalBG(true);
        setShowWalletBalance(false);
        setShowTopGainer(true);
        setShowTopLoser(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function showTopLoserModal() {
        setShowModalBG(true);
        setShowWalletBalance(false);
        setShowTopGainer(false);
        setShowTopLoser(true);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function closeModal() {
        setShowModalBG(false);
        setShowWalletBalance(false);
        setShowTopGainer(false);
        setShowTopLoser(false);

        HelperFunctions.removeOverflowAndPaddingFromModalBody();
    }

    function getTopMovers(event: any) {
        let targetValue = event.target.getAttribute("data-value");
        let url = utilityServiceBaseUrlUrl.concat('/utils/top-movers?type=') + targetValue;

        if (targetValue === "value") {
            setByValueActive(true);
            setByVolumeActive(false);
        }
        else {
            setByValueActive(false);
            setByVolumeActive(true);
        }

        getAxios(axios).get(url)
            .then(function (response) {

                const topmovers = response.data.data.map((el: any, index :any) =>
                    <div className="card md:w-2/5 w-full md:p-5 px-3 py-3 md:mb-0 mb-6" key={index}>
                        <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.stockCode + "&sign=" + (parseFloat(el.percentageChange) >= 0 ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose+"&tradeAction=buy"} className='no-underline' >
                            <div className="mb-10">
                            <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" />
                            </div>

                            <div className="flex w-full justify-between space-x-5 mb:mb-10 md:text-sm text-xs">
                                <div className="font-bold text-gray-900 md:text-xs text-xs">{el.stockCode.substring(0,5)}...</div>
                                <div className="font-bold text-black md:text-xs text-xs">₦ {HelperFunctions.formatCurrencyWithDecimal(el.price)} </div>
                            </div>

                            <div className='hidden'>
                                <div className="text-green-500 md:text-sm text-xs">{HelperFunctions.formatCurrencyWithDecimal(el.percentageChange).replace("-","")} % </div>
                            </div>
                        </Link>
                    </div>
                );

                setTopMoversList(topmovers);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    function searchForStocks(event: any) {
        if (event.keyCode === 13 || event.key === "Enter") {
            navigate("/search/quick?search=" + searchQuery);
        }

        return;
    }

    function togglePortfolioBalanceDisplay(event :any){
        let amountPlaceholder = event.target.getAttribute("data-placeholder");
        let amount = event.target.getAttribute("data-amount");
        let type = event.target.getAttribute("data-type");
        let el = document.getElementById(type) as HTMLElement;

        if(isShowPortfolioBalance){
            setIsShowPortfolioBalance(false);

            el.innerHTML = amount;
        }
        else{
            setIsShowPortfolioBalance(true);
            el.innerHTML = amountPlaceholder;
        }

    }

    function toggleWalletBalanceDisplay(event :any){
        let amountPlaceholder = event.target.getAttribute("data-placeholder");
        let amount = event.target.getAttribute("data-amount");
        let type = event.target.getAttribute("data-type");
        let el = document.getElementById(type) as HTMLElement;

        if(isShowWalletBalance){
            setIsShowWalletBalance(false);

            el.innerHTML = amount;
        }
        else{
            setIsShowWalletBalance(true);
            el.innerHTML = amountPlaceholder;
        }

    }

    return (
        <div className="relative">

            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar/>

                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className="md:text-3xl text-xl md:mb-20 mb-5">
                                <span className="font-bold text-green-900">Hello {customer.firstName}</span> 👋🏾
                            </div>

                            <div className="text-sm font-bold mb-30">
                                Overview of your account activities
                            </div>

                            {/* KYC Status Section */}
                            <div className={JSON.parse(kycStatus).kycLevel === 'Level1' ? '':'hidden'}>
                                <div className='bg-white p-7 border border-gray-500 rounded-lg updatekyc-bg md:bg-right-bottom'>
                                    <div className='font-bold md:text-2xl text-xl font-gotham-black-regular mb-10'>Update your KYC</div>

                                    <div className='mb-20 leading-6 w-full md:w-6/12 text-sm'>Hello {customer.firstName}, as part of our onboarding process you are required to provide some additional information to complete your onboarding</div>

                                    <div>
                                        <Link to="/profile">
                                            <button className='cursor-pointer border-0 rounded-lg text-white bg-green-900 px-14 py-4'>Update KYC</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            <div className="md:flex mt-10 md:justify-between md:space-x-5 md:mb-8 mb-3">
                                <div className="card-lg md:w-1/2 md:mb-0 mb-6">
                                    <div className="w-full mb-10">
                                        <div className="md:flex md:justify-between w-full">
                                            <div>
                                                <div className="mb-10 text-sm">Total Portfolio Balance</div>

                                                <div className="font-bold text-xl font-gotham-black-regular mb-3">
                                                    <img src={WalletIcon} alt="" className='align-middle w-5' /> ₦ <span id='portfolio-balance'>{HelperFunctions.formatCurrencyWithDecimal(totalPortfolioValue)}</span>
                                                    
                                                    <img onClick={togglePortfolioBalanceDisplay} src={HidePasswordIcon} data-placeholder="XXXXXX.XX" data-amount={HelperFunctions.formatCurrencyWithDecimal(totalPortfolioValue)} alt="" width="20" className={isShowPortfolioBalance ? "cursor-pointer align-middle": "hidden"} data-type="portfolio-balance" />

                                                    <img onClick={togglePortfolioBalanceDisplay} data-placeholder="XXXXXX.XX" data-amount={HelperFunctions.formatCurrencyWithDecimal(totalPortfolioValue)} src={ShowPasswordIcon} data-type="portfolio-balance" alt="" width="20" className={isShowPortfolioBalance ? "hidden": "cursor-pointer align-middle ml-1"} />
                                                </div>

                                                <div className='md:mb-0 mb-4'>
                                                    <img src={netPortfolioReturns >= 0 ? ArrowUpIcon : ArrowDownIcon} alt="" width="20" className="align-middle" />
                                                    <span data-placeholder="" className={netPortfolioReturns >= 0 ? "text-green-500 font-bold font-gotham-black-regular mx-2" : "text-red-500 font-bold font-gotham-black-regular mx-2"}>{netPortfolioReturns >= 0 ? HelperFunctions.formatCurrencyWithDecimal(netPortfolioReturns).replace("-","") : HelperFunctions.formatCurrencyWithDecimal(netPortfolioReturns).replace("-","")} | {HelperFunctions.formatCurrencyWithDecimal(netPortfolioReturnsPercentage).replace("-","")}%</span>
                                                </div>
                                            </div>

                                            <div>
                                                <Link to="/portfolio">
                                                    <button className="button font-bold mt-2">View Portfolio</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-md md:w-1/2 md:mb-0 mb-11">
                                    <div className="w-full mb-10">
                                        <div className="md:flex md:justify-between w-full">
                                            <div>
                                                <div className="mb-10 text-sm">Total Wallet Balance</div>

                                                <div className="font-bold text-xl font-gotham-black-regular md:mb-0 mb-4">
                                                    <img src={WalletIcon} alt="" className='align-middle w-5'/> ₦ <span id='wallet-balance'>{HelperFunctions.formatCurrencyWithDecimal(walletBalance)} </span>
                                                    
                                                    <img onClick={toggleWalletBalanceDisplay} src={HidePasswordIcon} data-placeholder="XXXXXX.XX" data-amount={HelperFunctions.formatCurrencyWithDecimal(walletBalance)} alt="" width="20" className={isShowWalletBalance ? "cursor-pointer align-middle": "hidden"} data-type="wallet-balance" />

                                                    <img onClick={toggleWalletBalanceDisplay} data-placeholder="XXXXXX.XX" data-amount={HelperFunctions.formatCurrencyWithDecimal(walletBalance)} src={ShowPasswordIcon} data-type="wallet-balance" alt="" width="20" className={isShowWalletBalance ? "hidden": "cursor-pointer align-middle ml-1"} />
                                                </div>
                                            </div>

                                            <div>
                                                <button onClick={showBalanceModal} className="button font-bold mt-2">View Balances</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Search Section*/}
                            <div className="flex justify-between mb-0 items-center">
                                <div>
                                    <div className="font-bold text-color-2 mb-5">Quick links</div>

                                    <div className="flex justify-between w-full md:space-x-10 space-x-3">
                                        <div>
                                            <Link to="/trade" className='no-underline text-green-900'>
                                                <div className="md:text-center">
                                                    <button className="button-xsm cursor-pointer" type='button'>
                                                        <img src={ArrowBidirectionalIcon} alt="" />
                                                    </button>
                                                </div>

                                                <div className="text-xs md:text-sm font-bold md:text-center md:ml-0">Buy Stocks</div>
                                            </Link>
                                        </div>

                                        <div>
                                            <Link to="/account/fund" className='cursor-pointer no-underline text-green-900'>
                                                <div className="text-center">
                                                    <button className="cursor-pointer button-xsm">
                                                        <img src={CommerceIcon} alt="" />
                                                    </button>
                                                </div>

                                                <div className="text-xs md:text-sm text-center font-bold">Fund Wallet</div>
                                            </Link>
                                        </div>

                                        <div>
                                            <Link to="/account/withdraw" className='cursor-pointer no-underline text-green-900'>
                                                <div className="text-center">
                                                    <button className="cursor-pointer button-xsm">
                                                        <img src={ArrowUpWhiteIcon} alt="" />
                                                    </button>
                                                </div>

                                                <div className="text-xs md:text-sm text-center font-bold">Withdraw Funds</div>
                                            </Link>
                                        </div>

                                        <div>
                                            <Link to="/learn" className='cursor-pointer no-underline text-green-900'>
                                                <div className="text-center">
                                                    <button className="cursor-pointer button-xsm">
                                                        <img src={LearnWhiteIcon} alt="" />
                                                    </button>
                                                </div>

                                                <div className="text-xs md:text-sm font-bold text-center">Learn</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-490 hidden">
                                    <div className="items-center flex border_1 rounded-lg pr-3 bg-white w-full">
                                        <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                        <div className="w-full">
                                            <input type="text" className="outline-white input p-2 w-full border-0" placeholder="Type the name of a stock and hit Enter" onChange={e => setSearchQuery(e.target.value)} onKeyDown={searchForStocks} value={searchQuery} />
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-2 text-12 h-1/3 hidden">
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

                            {/*Top Gainers and Losers Section */}
                            <div className="md:flex w-full md:space-x-10 mb-12">
                                {/*Top gainers section */}
                                <div className="w-full md:mb-0 mb-11">
                                    <div className="flex justify-between w-full mb-20">
                                        <div className="font-bold md:text-sm text-xs">Top Gainers</div>
                                        <div onClick={showTopGainerModal} className="cursor-pointer font-bold text-green-900 md:text-sm text-xs">
                                            See More
                                        </div>
                                    </div>

                                    <div>
                                        <div className={topGainersApiResponseSuccess ? 'hidden' : 'text-sm text-gray-400'}>Nothing to display</div>
                                        {topGainersList}
                                    </div>
                                </div>
                                {/*end */}

                                {/*Top losers section */}
                                <div className="w-full">
                                    <div className="flex justify-between w-full mb-20">
                                        <div className="font-bold md:text-sm text-xs">Top Losers</div>
                                        <div onClick={showTopLoserModal} className="cursor-pointer font-bold text-green-900 md:text-sm text-xs">See More</div>
                                    </div>

                                    <div>
                                        <div className={topLosersApiResponseSuccess ? 'hidden' : 'text-sm text-gray-400'}>Nothing to display</div>
                                        {topLosersList}
                                    </div>
                                </div>
                                {/*end */}
                            </div>
                            {/*End */}

                            {/* Top Movers Section */}
                            <div className='mb-24'>
                                <div className="mb-30">
                                    <div className="text-green-900 font-bold mb-10 md:text-sm text-xs">Top Movers</div>

                                    <div className="flex md:justify-between md:w-96 w-60 rounded-lg border border-gray-500 p-1">
                                        <div className='text-sm w-1/2'>
                                            <button data-value="value" type='button' className={byValueActive ? "rounded-lg bg-green-900 text-white border-0 py-3 md:px-12 px-5 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 md:px-12 px-5 font-bold border-0 bg-transparent w-full"} onClick={getTopMovers}>By Value</button>
                                        </div>

                                        <div className='text-sm w-1/2'>
                                            <button data-value="volume" type='button' className={byVolumeActive ? "rounded-lg bg-green-900 text-white border-0 py-3 md:px-12 px-5 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 md:px-12 px-5 font-bold border-0 bg-transparent w-full"} onClick={getTopMovers}>By Volume</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mb-14">
                                    <div className={topMoversApiResponseSuccess ? 'hidden' : 'text-sm text-gray-400'}>Nothing to display</div>

                                    <div className={topMoversApiResponseSuccess ? "md:flex md:justify-between md:space-x-5 md:overflow-x-scroll md:pr-12" : "hidden"}>
                                        {topMoversList}
                                    </div>
                                </div>
                            </div>
                            {/* End */}


                            {/* News Section */}
                            <div className="flex justify-between font-bold mb-20">
                                <div className="font-gotham-black-regular md:text-lg text-sm">News and Insights</div>
                                <Link to="/news" className='no-underline'><div className="text-green-900 text-sm">See More</div></Link>
                            </div>

                            <div className="mb-11">
                                <div className={newsApiResponseSuccess ? 'hidden' : 'text-sm text-gray-400'}>Nothing to display</div>

                                <div className="md:flex news-section md:justify-between md:space-x-10 w-full">
                                    {newsList}
                                </div>
                            </div>
                            {/* End */}

                            {/* Page Loader Section */}
                            <div className={showPageLoader ? "page-loader-backdrop opacity-90 hidden" : "hidden"}>
                                <div className='w-96 relative lg:ml-72'>
                                    <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                                    <div className='text-center'><img src={AnchoriaSpinner} alt="" /></div>
                                </div>
                            </div>
                            {/* End */}
                        </div>

                    </div>
                </div>
            </div>

            <div className={showWalletBalance ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="wallet-balance-modal">
                        <div className="mb-10 flex justify-between">
                            <div className="font-bold text-25">Your wallet balances</div>

                            <div onClick={closeModal}>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className="border-1 mb-30"></div>

                        <div className="wallet-balance-card mb-30">
                            <div className="italic text-green-500 mb-5">Available Balance</div>
                            <div className="font-bold text-3xl font-gotham-black-regular text-white mb-5">
                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                </svg>
                                <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(walletBalance)}</span>
                            </div>
                            <div className="text-white text-sm">Cash available in your wallet for trading or immediate withdrawal</div>
                        </div>

                        <div className="wallet-balance-card mb-30">
                            <div className="italic text-yellow-500 mb-5">Unsettled Balance</div>
                            <div className="font-bold text-3xl font-gotham-black-regular text-white mb-5">
                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                </svg>
                                <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(unsettledBalance)}</span>
                            </div>
                            <div className="text-white text-sm">Money from your recent sell orders that is yet to reflect in available balance</div>
                        </div>

                        <div className="wallet-balance-card mb-30">
                            <div className="italic text-green-950 mb-5">Reserved Balance</div>
                            <div className="font-bold text-3xl font-gotham-black-regular text-white mb-5">
                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                </svg>
                                <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(reservedBalance)}</span>
                            </div>
                            <div className="text-white text-sm">This balance is money reserved for your queued Buy Orders</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showTopGainer ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="top-gainers-modal">
                        <div className="mb-10 flex justify-between">
                            <div className="font-bold text-25">Top Gainers</div>

                            <div onClick={closeModal}>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className="border-1 mb-30"></div>

                        <div className='overflow-y-auto max-h-96 p-5'>
                            {topGainersSeeMore.map((item: any, index :any) =>
                                <Link to={"/stock?name=" + item.name + "&sector=" + item.sector + "&symbol=" + item.stockCode + "&sign=positive&change=" + item.change + "&close=" + item.close + "&open=" + item.open + "&high=" + item.high + "&low=" + item.low + "&wkhigh=" + item.weekHigh52 + "&wklow=" + item.weekLow52 + "&volume=" + item.volume + "&mktsegment=" + item.mktSegment + "&pclose=" + item.pclose+"&tradeAction=buy"} className='no-underline' key={index}>
                                    <div className="card mb-30 p-3">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" />
                                                </div>

                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-sm">{item.stockCode}</div>
                                                    <div className="mt-3 text-black text-sm">{item.name.substring(0,16)}...</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦ {HelperFunctions.formatCurrencyWithDecimal(parseFloat(item.price))}</div>
                                                    <div className={(parseFloat(item.price) - parseFloat(item.lclose)) >= 0 ? "mt-3 text-green-500" : "text-red-500 mt-3"}> { HelperFunctions.formatCurrencyWithDecimal(item.percentageChange)}%  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={showTopLoser ? "generic-modal" : "hidden"}>
                <div className='generic-modal-dialog'>
                    <div className="top-losers-modal">
                        <div className="mb-10 flex justify-between">
                            <div className="font-bold text-25">Top Losers</div>

                            <div onClick={closeModal}>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className="border-1 mb-30"></div>

                        <div className='overflow-y-auto max-h-96 p-5'>
                            {topLosersSeeMore.map((item: any, index :any) =>
                                <Link to={"/stock?name=" + item.name + "&sector=" + item.sector + "&symbol=" + item.stockCode + "&sign=negative&change=" + item.change + "&close=" + item.close + "&open=" + item.open + "&high=" + item.high + "&low=" + item.low + "&wkhigh=" + item.weekHigh52 + "&wklow=" + item.weekLow52 + "&volume=" + item.volume + "&mktsegment=" + item.mktSegment + "&pclose=" + item.pclose+"&tradeAction=buy"} className='no-underline' key={index}>
                                    <div className="card mb-30 p-3">
                                        <div className="flex justify-between w-full">
                                            <div className="flex space-x-5">
                                                <div>
                                                <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" />
                                                </div>

                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-sm">{item.stockCode}</div>
                                                    <div className="mt-3 text-black text-sm">{item.name.substring(0,16)}...</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mt-1">
                                                    <div className="font-bold text-color-2 mb-5 text-right">₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                                                    <div className={((parseFloat(item.price) - parseFloat(item.lclose))) >= 0 ? "mt-3 text-green-500" : "text-red-500 mt-3"}> { HelperFunctions.formatCurrencyWithDecimal(item.percentageChange.replace('-',''))}%  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
            </div>
        </div>
    );
};

export default Dashboard;