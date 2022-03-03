import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import '../portfolio/index.scss';
import SuccessIcon from '../../assets/images/success.gif';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowDownIcon from '../../assets/images/arrow-down.svg';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import AtlasIcon from '../../assets/images/atlas.svg';
import CloseIcon from '../../assets/images/close.svg';
import BriefcaseIcon from '../../assets/images/briefcase.svg';
import SaveTagIcon from '../../assets/images/save-tag.svg';
import ChartIcon from '../../assets/images/chart.svg';
import SpinnerHolderIcon from '../../assets/images/spinner-holder.svg';
import SpinnerIcon from '../../assets/images/spinner.gif';
import Chart from "react-apexcharts";
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import { formatCurrencyWithDecimal } from '../../lib/helper';
import * as HelperFunctions from '../../lib/helper';
import moment from 'moment';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import { getPortfolioEndpoint,getStocksEndpoint,stockTradingServiceBaseUrlUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import { Accordion, Form } from 'react-bootstrap';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';


const PortfolioDetails = () => {
    const { portfolioId } = useParams<string>();

    HelperFunctions.removeOverflowAndPaddingFromModalBody();

    const [showAddNewStockModal, setShowAddNewStockModal] = useState<boolean>(false);
    const [showPortfolioListModal, setShowPortfolioListModal] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [showloader, setShowLoader] = useState<boolean>(false);
    const [showWatchlistModal, setShowWatchlistModal] = useState<boolean>(false);
    const [showMarketplaceModal, setShowMarketplaceModal] = useState<boolean>(false);

    const [, setApiResponseHasError] = useState<boolean>(false);
    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');

    const [stockSelected, ] = useState<string[]>([]);

    const [stocksInPortfolio, setStocksInPortfolio] = useState('');
    

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [isStockAddToPortfolioSuccessful, setIsStockAddToPortfolioSuccessful] = useState<boolean>(false);

    const [portfolioDetails, setPortfolioDetails] = useState(Object.assign({}));

    const [watchListStocks, setWatchListStocks] = useState([]);

    const [portfolioList, setPortfolioList] = useState([]);

    const [stocksList, setStocksList] = useState([]);

    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    let options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            tooltip: {
                enabled: false
            }
        },
        markers: {
            colors: ['#A41856'],
            strokeColors: '#00C48C',
            strokeWidth: 4
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
                //colorStops: ['#A0F2DB', 'rgba(187, 230, 217, 0)']
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: '#A0F2DB',
                            opacity: 1
                        },
                        {
                            offset: 100,
                            color: 'rgba(187, 230, 217, 0)',
                            opacity: 1
                        }
                    ],
                ]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            colors: ['#3BC359']
        },
        grid: {
            show: true,
            borderColor: '#F3F4F6 '
        },
        tooltip: {
            followCursor: false
        }

    };

    let series = [
        {
            name: "series-1",
            data: [45, 52, 38, 45, 19, 23, 2, 45, 52, 38, 45, 19]
        }
    ];

    useEffect(() => {

        function getPortfolioDetails() {
            let urlToCall: string = getPortfolioEndpoint.concat("/details/".concat(String(portfolioId)));
            getAxios(axios).get(urlToCall)
            .then(function (response) {
                document.title = response.data.data.name+" - Anchoria";

                setPortfolioDetails(response.data.data);

                HelperFunctions.removeOverflowAndPaddingFromModalBody();

                const listOfStocks = response.data.data.listOfStocks.map((item: any) =>
                    <div>
                        <Link to={"/stock?name=" + item.name + "&symbol=" + item.symbol + "&sign=" + (item.sign === '+' ? 'positive' : 'negative') + "&currentPrice=" + item.currentPrice + "&tradeAction=sell&units=" + item.units} className='no-underline'>
                            <div className="card mb-30 p-3" key={item.id}>
                                <div className="flex justify-between items-center">
                                    <div> <img src={AtlasIcon} alt="" /></div>

                                    <div className="text-color-2">
                                        <div className='font-bold mb-10 text-sm'>{item.symbol}</div>
                                        <div className='text-sm'>{item.name.substring(0,10)}...</div>
                                    </div>

                                    <div className="text-color-2 hidden">
                                        <div className='mb-10'>Entry Price</div>
                                        <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                                    </div>

                                    <div className="text-color-2">
                                        <div className='mb-10 text-sm'>Current Price</div>
                                        <div className='font-bold text-sm'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                                    </div>

                                    <div className="text-color-2">
                                        <div className='mb-10 text-sm'>Units</div>
                                        <div className='font-bold text-sm'>{HelperFunctions.formatCurrencyWithDecimal(item.units)}</div>
                                    </div>

                                    <div className="text-color-2">
                                        <div className='mb-10 text-sm'>Returns</div>
                                        <div className='font-bold text-sm'>
                                            <span className='mr-3'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.estimatedValue)}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <button className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer text-sm">View</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );

                setStocksInPortfolio(listOfStocks);

                setShowPageLoader(false);
            })
            .catch(function (error) {

                setApiResponseHasError(true);

                setTimeout(() => {
                    setApiResponseHasError(false);
                }, 3000);
            });
        }  
        
        function getWatchlist() {
            let customer = HelperFunctions.getCustomerInfo();            

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/watchlist?customerId=' + customer.id)
                .then(function (response) {
                    setWatchListStocks(response.data.data.stocks);
                })
                .catch(function (error) {});
        }

        function getPortfolioList() {
            getAxios(axios).get(getPortfolioEndpoint)
                .then(function (response) {    
                    setPortfolioList(response.data.data.portfolio.filter((item :any) => item.hasOwnProperty("listOfStocks")));
                })
                .catch(function () {});
        }

        function getStocks() {

            getAxios(axios).get(getStocksEndpoint)
            .then(function (response) {
                setStocksList(Object.values(response.data.data) as []);
                
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        getPortfolioDetails();
        getWatchlist();
        getPortfolioList();
        getStocks(); 

    },[portfolioId]);

    function displayAddNewStockModal() {
        setShowModalBG(true);
        setShowAddNewStockModal(true);
        setShowPortfolioListModal(false);
        setShowSuccessModal(false);
        setShowLoader(false);
        setShowSuccessModal(false);
        setShowWatchlistModal(false);
        setShowMarketplaceModal(false);
    }

    function displayPortfolioListModal() {
        setShowModalBG(true);
        setShowAddNewStockModal(false);
        setShowPortfolioListModal(true);
        setShowSuccessModal(false);
        setShowLoader(false);
        setShowSuccessModal(false);
        setShowWatchlistModal(false);
        setShowMarketplaceModal(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function closeModal() {
        setShowModalBG(false);
        setShowAddNewStockModal(false);
        setShowPortfolioListModal(false);
        setShowLoader(false);
        setShowSuccessModal(false);
    }   

    function addStockToPortfolio() {
        let requestData = {
            "portfolioId": portfolioId,
            "stocks": stockSelected
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);        

        getAxios(axios).put(getPortfolioEndpoint.concat('/stock/move'),
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);
                setIsStockAddToPortfolioSuccessful(true);
                setApiResponseSuccessMsg(response.data.message);

                setTimeout(()=>{
                   window.location.reload(); 
                },2000)
            })
            .catch(function (error) {
                setShowSpinner(false);
            });
    }    

    function closeApiResponseMsg() {
        setApiResponseHasError(false);
        setIsStockAddToPortfolioSuccessful(false);
    }

    function selectStockToMove(event :any){
        if(event.target.checked){
            let selectedStock  = event.target.getAttribute("data-value");

            stockSelected.push(selectedStock);
        }
    }

    function displayWatchlistModal(){
        setShowWatchlistModal(true);
        setShowModalBG(true);
        setShowPortfolioListModal(false);
        setShowSuccessModal(false);
        setShowAddNewStockModal(false);
        setShowMarketplaceModal(false);
    }

    function displayMarketplaceModal(){
        setShowWatchlistModal(false);
        setShowModalBG(true);
        setShowPortfolioListModal(false);
        setShowSuccessModal(false);
        setShowAddNewStockModal(false);
        setShowMarketplaceModal(true);
    }


    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className='flex justify-between'>
                                <div>
                                    <div className="text-2xl mb-10">
                                        <span className="font-bold text-green-900">Portfolio Details</span>
                                    </div>

                                    <div className="text-sm font-bold text-color-2 mb-12">
                                        Overview of portfolio performance
                                    </div>
                                </div>

                                <div className='cursor-pointer text-xl'>
                                    <Link to="/portfolio" className='no-underline'><img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back</Link>
                                </div>
                            </div>

                            <div className='mb-12'>
                                <div className='flex space-x-10'>
                                    <div>
                                        <div className='mb-10'>Portfolio Name</div>
                                        <div className='font-bold'>{portfolioDetails.name}</div>
                                    </div>

                                    <div>
                                        <div className='mb-10'>Date Created</div>
                                        <div className='font-bold'>{moment(portfolioDetails.createdOn).format('Do MMM YYYY')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-12'>
                                <div className='card-black w-1/2 flex justify-between'>
                                    <div className='text-white'>
                                        <div className='mb-10 font-bold'>Total Portfolio Value</div>
                                        <div className='font-bold text-xl'>₦ {formatCurrencyWithDecimal(parseFloat(portfolioDetails.currentValue as string))}</div>
                                    </div>

                                    <div className='text-white'>
                                        <div className='mb-10 font-bold'>Portfolio Returns</div>
                                        <div className='font-bold text-xl mb-10'>
                                            <img src={portfolioDetails.portfolioReturn >= 0 ? ArrowUpIcon : ArrowDownIcon} alt="" width="30" className="align-middle mr-3" />

                                            <span className={portfolioDetails.portfolioReturn >= 0 ? 'text-green-500' : 'text-red-500'}>₦ {String(formatCurrencyWithDecimal(portfolioDetails.portfolioReturn)).replace("-","")}</span>
                                        </div>
                                        <div>
                                            <span className={portfolioDetails.portfolioReturn >= 0 ? 'text-green-500' : 'text-red-500'}>{String(HelperFunctions.formatCurrencyWithDecimal(portfolioDetails.portfolioPercentageReturn)).replace("-","")}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-30'>
                                <div className='card p-10'>
                                    <div className='mb-30'>
                                        <div className='flex justify-between items-center'>
                                            <div className='font-gotham-black-regular font-bold text-green-900 text-xl'>Portfolio Performance</div>
                                            <div className='w-1/2 flex bg-gray-300 p-1 rounded justify-between'>
                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1D</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1W</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1M</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>3M</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>6M</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1Y</button>
                                            </div>
                                        </div>

                                        <div className='text-lg '>Portfolio Value</div>
                                        <div className='font-gotham-black-regular font-bold text-green-900 text-xl'>₦ {formatCurrencyWithDecimal(parseFloat(portfolioDetails.currentValue))}</div>
                                    </div>

                                    <div>
                                        {/* <Line options={options} data={data} id='canvas'/> */}
                                        <Chart options={options} series={series} type="area" height='400' />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-30">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-gotham-black-regular">My Assest</div>
                                    <div className='flex space-x-3'>
                                        <button className="hidden cursor-pointer bg-gray-300 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline" type='button'>
                                            Move stocks
                                        </button>

                                        <button onClick={displayAddNewStockModal} className="cursor-pointer bg-green-900 rounded-lg text-white border-0 py-3 px-3 font-bold focus:shadow-outline" type='button'>
                                            Add New Stocks
                                        </button>

                                        <select className='rounded-lg border-gray-300 font-bold p-3 hidden'>
                                            <option>Filter by: 30 Days</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginBottom:'10rem'}}>
                                <div className={stocksInPortfolio === '' ? 'text-gray-500':'hidden'}>No stocks in this portfolio</div>
                                {stocksInPortfolio}
                            </div>


                            {/*Add New Stocks Modal */}
                            <div className={showAddNewStockModal ? "add-stock-modal" : "add-stock-modal hidden"}>
                                <div className="mb-20 flex justify-between">
                                    <div className="font-bold text-25 opacity-0">Top Losers</div>

                                    <div onClick={closeModal}>
                                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                                    </div>
                                </div>

                                <div>
                                    <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-10">Add new stocks</div>
                                    <div className="font-bold mb-30">Choose where you want to add stocks from</div>

                                    <div>
                                        <div onClick={displayPortfolioListModal} className='flex space-x-10 selectbox-border p-5 rounded-lg border-1 hover:bg-gray-100 cursor-pointer mb-30'>
                                            <div>
                                                <img src={BriefcaseIcon} alt="" width='50' />
                                            </div>
                                            <div>
                                                <div className='font-bold mb-10'>Other Portfolio</div>
                                                <div className='text-sm'>Move stocks from your list of created portfolio</div>
                                            </div>
                                        </div>

                                        <div className='flex space-x-10 selectbox-border p-5 rounded-lg border-1 hover:bg-gray-100 cursor-pointer mb-30 hidden' onClick={displayWatchlistModal}>
                                            <div>
                                                    <img src={SaveTagIcon} alt="" width='50' />
                                            </div>
                                            <div>
                                                <div className='no-underline text-gray-900'>
                                                    <div className='font-bold mb-10'>My Watchlist</div>
                                                    <div className='text-sm'>Select from your added watchlist</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex space-x-10 selectbox-border p-5 rounded-lg border-1 hover:bg-gray-100 cursor-pointer' onClick={displayMarketplaceModal}>
                                            <div>
                                                    <img src={ChartIcon} alt="" width='50' />
                                            </div>
                                            <div>
                                                <div className='no-underline text-gray-900'>
                                                    <div className='font-bold mb-10'>Marketplace</div>
                                                    <div className='text-sm'>Explore market place and buy a new stocks </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/*End */}


                            {/*Watchlist Modal */}
                            <div className={showWatchlistModal ? "add-stock-modal hidden":"hidden"}>
                                <div className="mb-20 flex items-center justify-between">
                                    <div className="text-2xl text-green-900 font-gotham-black-regular font-bold mb-10">My Watchlists</div>

                                    <div className='cursor-pointer' onClick={displayAddNewStockModal}>
                                        <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </div>
                                </div>

                                <div>
                                    {watchListStocks.length === 0 ? 'No stocks in your watchlist.' : watchListStocks.map((item: any, index: number) =>
                                        <div className="card mb-20 p-3" key={index}>
                                            <div className="flex justify-between items-center">
                                                <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" width="25"/></div>

                                                <div className="font-bold text-color-2 text-sm">{item.name}</div>

                                                <div className="text-ellipsis overflow-hidden text-sm">{item.name}</div>

                                                <div className="font-bold text-color-2 text-right text-sm">₦ {HelperFunctions.formatCurrencyWithDecimal(item.currentPrice)}</div>

                                                <div className='flex justify-between space-x-2 cursor-pointer'>
                                                    <Form.Check onChange={selectStockToMove} data-value={item.id} type="checkbox" className='portfoliolist-checkbox cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button onClick={addStockToPortfolio} type='button' className='w-full px-10 py-3 border-0 bg-green-900 text-white font-bold rounded-lg cursor-pointer text-lg'>
                                        Add 
                                    </button>
                                </div>
                            </div>
                            {/*End */}

                            {/*Marketplace Modal */}
                            <div className={showMarketplaceModal ? "add-stock-modal":"hidden"}>
                                <div className="mb-20 flex items-center justify-between">
                                    <div className="text-2xl text-green-900 font-gotham-black-regular font-bold mb-10">Market Place</div>

                                    <div className='cursor-pointer' onClick={displayAddNewStockModal}>
                                        <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </div>
                                </div>

                                <div style={{overflowY:'scroll', maxHeight: '20rem'}}>
                                    {stocksList.map((el: any, ind: number) =>
                                        el.map((item: any, index: any) =>
                                            <div className="card mb-20 p-5" key={index}>
                                                <div className="flex justify-between items-center">
                                                    <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" width="25"/></div>

                                                    <div className="font-bold text-color-2 text-sm">{item.symbol}</div>

                                                    <div className="text-ellipsis overflow-hidden text-sm">{item.name}</div>

                                                    <div className="font-bold text-color-2 text-right text-sm">₦ {HelperFunctions.formatCurrencyWithDecimal(item.close)}</div>

                                                    <div className='flex justify-between space-x-2 cursor-pointer'>
                                                        <Link to={"/stock?name=" + item.name + "&sector=" + item.sector + "&symbol=" + item.symbol + "&sign=" + (item.sign === '+' ? 'positive' : 'negative') + "&change=" + item.change + "&close=" + item.close + "&open=" + item.open + "&high=" + item.high + "&low=" + item.low + "&wkhigh=" + item.weekHigh52 + "&wklow=" + item.weekLow52 + "&volume=" + item.volume + "&mktsegment=" + item.mktSegment + "&pclose=" + item.pclose + "&tradeAction=buy"}>
                                                            <button type='button' className="rounded-lg bg-green-800 py-2 px-3 border-0 font-bold text-white cursor-pointer text-xs">View</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div>
                                    <button onClick={addStockToPortfolio} type='button' className='w-full px-10 py-3 border-0 bg-green-900 text-white font-bold rounded-lg cursor-pointer text-lg hidden'>
                                        Add 
                                    </button>
                                </div>
                            </div>
                            {/*End */}

                            {/*Portfolio List Modal */}
                            <div className={showPortfolioListModal ? "portfoliolist-modal" : "portfoliolist-modal hidden"}>
                                {/* Stock add  Success */}
                                <div className={isStockAddToPortfolioSuccessful ? "otp-alert mb-20" : "hidden"}>
                                    <div className="flex otp-validated justify-between space-x-1 pt-3">
                                        <div className="flex">
                                            <div>
                                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                    <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                                </svg>
                                            </div>

                                            <div className="pt-1 text-sm text-green-900">{apiResponseSuccessMsg}</div>
                                        </div>

                                        <div className="cursor-pointer" onClick={closeApiResponseMsg}>
                                            <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                <div className={showloader ? 'absolute w-full z-10 top-1/3' : 'absolute w-full z-10 top-1/3 hidden'}>
                                    <div className='relative text-center w-90pc'>
                                        <img src={SpinnerHolderIcon} alt="" width='120' />
                                        <img src={SpinnerIcon} alt="" width='50' className='absolute left-47pc top-1/4' />
                                    </div>
                                </div>

                                <div>
                                    <div className='flex justify-between '>
                                        <div>
                                            <div className="text-xl text-green-900 font-gotham-black-regular font-bold mb-10">
                                                Portfolio List
                                            </div>
                                            <div className="font-bold mb-30">Select the stocks you want to move to this porfolio</div>
                                        </div>

                                        <div className='cursor-pointer' onClick={displayAddNewStockModal}>
                                            <img src={ArrowBackIcon} width="20" alt="" className="cursor-pointer align-middle" /> Back
                                        </div>
                                    </div>

                                    <div className='mb-20'>
                                        <div className='overscroll-y-auto max-h-96 overflow-y-auto px-5'>
                                            {portfolioList.map((item :any, index :any) =>
                                            <div className={portfolioDetails.name === item.name ? 'hidden':''}>
                                                <Accordion defaultActiveKey="0" className='mb-30 portfoliolist-accordion'>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header className='portfoliolist-accordion-header m-0 bg-transparent font-bold'>{item.name}</Accordion.Header>

                                                        <Accordion.Body>
                                                            {item.listOfStocks.map((item :any, index :any) =>
                                                                <div className="card mb-20 p-3" key={index}>
                                                                    <div className="flex justify-between items-center">
                                                                        <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" width="25"/></div>
                        
                                                                        <div className="font-bold text-color-2 text-sm">{item.name}</div>
                        
                                                                        <div className="text-ellipsis overflow-hidden text-sm">{item.name}</div>
                        
                                                                        <div className="font-bold text-color-2 text-right text-sm">₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                        
                                                                        <div className='flex justify-between space-x-2 cursor-pointer'>
                                                                            <Form.Check onChange={selectStockToMove} data-value={item.id} type="checkbox" className='portfoliolist-checkbox cursor-pointer' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Accordion.Body>

                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-5">
                                        <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Cancel</button>

                                        <button type="button" onClick={addStockToPortfolio} className="py-4 px-24 font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">
                                            <span className={showSpinner ? "hidden" : ""}>Add</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {/*End */}

                            {/*Success Modal */}
                            <div className={showSuccess ? "portfolio-success-modal" : "portfolio-success-modal hidden"}>
                                <div className="ml-8 mr-auto w-80 h-64 relative">
                                    <img src={SuccessIcon} alt="success icon" className="w-96" />
                                    <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                </div>

                                <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                                <div className="text-color-4 text-sm text-center mb-14">Your portfolio has been successfully created</div>

                                <div className="flex space-x-5 mb-30">
                                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
                                </div>
                            </div>

                            {/*Delete Modal */}
                            <div className="set-price-alert-modal rounded-lg hidden">
                                <div className="mb-10 flex justify-between">
                                    <div className="font-bold text-3xl text-green-900 font-gotham-black-regular"></div>

                                    <div onClick={closeModal}>
                                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                                    </div>
                                </div>

                                <div>
                                    {/* Delete Success */}
                                    <div >
                                        <div className="flex otp-validated justify-between space-x-1 pt-3">
                                            <div className="flex">
                                                <div>
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                        <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                    </svg>
                                                </div>

                                                <div className="pt-1 text-sm text-green-900">{apiResponseSuccessMsg}</div>
                                            </div>
                                            
                                            <div className="cursor-pointer">
                                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className='text-center mb-20'>
                                        <img  alt='' />
                                    </div>
                                    <div className='text-red-500 font-bold text-3xl text-center mb-30'>Delete Portfolio</div>
                                    <div className='text-center my-8 hidden'>Enter your transaction to PIN confirm</div>
                                    <div className='font-bold text-center my-5 hidden'>Enter PIN</div>
                                    <div className='flex space-x-3 my-10 hidden'>
                                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />                        
                                    </div>
                                </div>

                                <div className="flex space-x-5 mb-10">
                                    <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                                    <button  type="button" className="py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer">
                                        <span className={ showSpinner ? "hidden" : ""}>Delete</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                                    </button>
                                </div>
                            </div>
                            {/*End */}

                            {/* Modal BG*/}
                            <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
                            </div>
                            {/* End */}

                            {/* Page Loader Section */}
                            <div className={showPageLoader ? "page-loader-backdrop opacity-90" : "hidden"}>
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
        </div>
    );
};

export default PortfolioDetails;