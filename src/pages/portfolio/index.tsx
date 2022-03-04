import React, { useState, useEffect } from 'react';
import '../portfolio/index.scss';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowDownIcon from '../../assets/images/arrow-down.svg';
import SuccessIcon from '../../assets/images/success-check.svg';
import CloseIcon from '../../assets/images/close.svg';
import Sidebar from '../../components/Sidebar';
import Chart from "react-apexcharts";
import axios from 'axios';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import * as HelperFunctions from '../../lib/helper';
import { createPortfolioEndpoint, getPortfolioEndpoint, stockTradingServiceBaseUrlUrl } from "../../apiUrls";
import { getAxios } from "../../network/httpClientWrapper";
import moment from 'moment';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import ChevronRightIcon from "../../assets/images/chevron-right.svg";
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import DeleteIcon from '../../assets/images/delete-icon.svg';
import { defaultToZeroIfNullOrUndefined, isNullOrUndefined } from '../../common/Utilities';
import { formatCurrencyWithDecimal } from '../../lib/helper';
import DeleteCardIcon from '../../assets/images/delete-card.svg';

const Portfolio = () => {
    document.title = "Portfolio - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [showCreatePortfolio, setShowCreatePortfolio] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [portfolioName, setPortfolioName] = useState('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [apiResponseHasError, setApiResponseHasError] = useState<boolean>(false);
    const [apiResponseHasMsg, setApiResponseHasMsg] = useState('');

    const [portfolioIsNullOrEmpty, setPortfolioIsNullOrEmpty] = useState<boolean>(true);
    const [portfolioCount, setPortfolioCount] = useState(0);
    const [portfolioList, setPortfolioList] = useState('');
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [netPortfolioReturns, setNetPortfolioReturns] = useState(0);
    const [netPortfolioReturnsPercentage, setNetPortfolioReturnsPercentage] = useState(0);
    const [graphYAxis, ] = useState<string[]>([]);
    const [graphXAxis, ] = useState<string[]>([]);
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [portfolioId, setPortfolioId] = useState('');
    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');
    const [apiResponseErrorMsg, setApiResponseErrorMsg] = useState('');
    

    let options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
            data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
    ];

    HelperFunctions.removeOverflowAndPaddingFromModalBody();

    useEffect(() => {
        function checkIfPortfolioIsNullOrEmpty() {

            if (portfolioName === '') {
                setPortfolioIsNullOrEmpty(true);
            }
            else {
                setPortfolioIsNullOrEmpty(false);
            }
        }

        checkIfPortfolioIsNullOrEmpty();
    });

    useEffect(() =>{

        function getPortfolioList() {
            getAxios(axios).get(getPortfolioEndpoint)
                .then(function (response) {
                    setShowPageLoader(false);
                    setPortfolioCount(response.data.data.portfolio.length);
                    setTotalPortfolioValue(response.data.data.totalCurrentPrice);
                    setInvestmentAmount(response.data.data.totalPurchasedPrice);
                    setNetPortfolioReturns(response.data.data.portfolioReturn);
                    setNetPortfolioReturnsPercentage(response.data.data.percentageReturn);
    
                    const listItems = response.data.data.portfolio.map((item: any) =>
                        // <PortfolioInfoCard
                        //     item={item}
                        //     title={'Portfolio value'}
                        //     onReload={getPortfolioList}
                        // />

                        <div className="card-custom p-5 flex justify-between cursor-pointer md:mb-0 mb-6">
                            <div className="flex space-x-4">
                                <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" /></div>

                                <div className="text-sm">
                                    <div className="mb-10 font-bold text-color-2">{item.name}</div>
                                    <div className={item.hasOwnProperty("listOfStocks") ? 'text-black':'hidden'}>Count: {item.hasOwnProperty("listOfStocks") ? item.listOfStocks.length : 0}</div>
                                </div>
                            </div>

                            <div className="text-sm">
                                <div className="flex mb-10 justify-between">
                                    <div className="text-green-900 font-bold">Portfolio Value</div>
                                </div>
                                <div className="font-gotham-black-regular text-green-900 text-24 mb-10">₦ {formatCurrencyWithDecimal(item.currentValue)}</div>
                                <div className={item.hasOwnProperty("uuid") ? '':'hidden'}>
                                    <span className={(item.portfolioReturn) >= 0 ? "text-green-500 text-24 font-bold" : "text-red-500 text-24 font-bold"}>
                                        <span>{formatCurrencyWithDecimal(defaultToZeroIfNullOrUndefined(item.portfolioReturn)).replace("-","")}</span> |
                                        <span className='ml-1'>{isNullOrUndefined(item.portfolioPercentageReturn)
                                            ? 0 : formatCurrencyWithDecimal(item.portfolioPercentageReturn).replace("-","")}</span>%</span>
                                    <span className='text-black hidden'> 7days</span>
                                </div>
                            </div>

                            <div className={item.hasOwnProperty("uuid") ? 'row d-flex justify-content-end align-items-end':'hidden'}>
                                <div>
                                    <img src={ChevronRightIcon} alt="" />
                                </div>

                                <div className='mr-2' onClick={displayDeleteModal} data-value={item.id}>
                                    <img src={DeleteIcon} alt="" data-value={item.uuid}/>
                                </div>
                            </div>
                        </div>
                    );
    
                    setPortfolioList(listItems);
                })
                .catch(function () {
    
                    setApiResponseHasError(true);
    
                    setTimeout(() => {
                        setApiResponseHasError(false);
                    }, 3000);
                });
        }

        function getStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode=NGXPREMIUM&endDate=2022-02-13&startDate=2022-01-12')
            .then(function (response) { 

                response.data.map((item :any, index :any)=>{
                    graphYAxis.push(item.price);

                    graphXAxis.push(moment(item.date).format("MMM Do"));
                    
                    return true;
                });
                
            })
            .catch(function (error) {
                
            });
        }
    
        getStockGraphData();
        getPortfolioList();
        
    },[graphXAxis,graphYAxis]);

    function showCreatePorfolioModal() {
        setShowCreatePortfolio(true);
        setShowModalBG(true);
    }

    function closeModal() {
        setShowCreatePortfolio(false);
        setShowModalBG(false);
        setShowSuccessModal(false);
        setPortfolioName('');
        setShowDeleteModal(false);
    }

    function createPortfolio() {
        let requestData = {
            "name": portfolioName
        }

        console.log(requestData)

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        localStorage.setItem('genericCypher', genericCypher);

        //Login User
        if (localStorage.getItem('genericCypher')) {
            setShowSpinner(true);            

            getAxios(axios).post(createPortfolioEndpoint,
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function () {
                    setShowSpinner(false);
                    setShowCreatePortfolio(false);
                    setShowModalBG(true);
                    setShowSuccessModal(true);

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(function (error) {

                    setShowSpinner(false);

                    setApiResponseHasError(true);
                    setApiResponseHasMsg("Portfolio with this name already exist.");

                    setTimeout(() => {
                        setApiResponseHasError(false);
                    }, 3000);
                });
        }
    }

    const deletePortfolio = () => {
        setShowSpinner(true);

        let urlToCall: string = getPortfolioEndpoint.concat("/".concat(portfolioId));

        getAxios(axios).delete(urlToCall).then((response) => {
            setShowModalBG(true);
            setShowSuccessModal(false);
            setApiResponseSuccessMsg("Portfolio deleted successfully.")
            setShowSpinner(false);
            setIsDeleteSuccess(true);
            setApiResponseHasError(false);

            setTimeout(()=>{
                window.location.reload();
            },2000)

        }).catch((error) => {
            setShowSpinner(false);
            setApiResponseHasError(true);
            setApiResponseErrorMsg(error.response.data.message);

            setTimeout(()=>{
                setApiResponseHasError(false);
                setApiResponseErrorMsg('');
            },2000)
        });
    }

    function displayDeleteModal(event: any) {

        let deleteId =  event.target.getAttribute("data-value");

        setPortfolioId(deleteId);
        setShowModalBG(true);
        setShowDeleteModal(true);
    }


    return (
            <div className="relative">
                <UserAreaHeader />

                <div>
                    <div className="h-screen flex">
                        <Sidebar />

                        <div className="mt-20 flex-1 min-w-0 flex flex-col">
                            <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                                <div className="text-3xl mb-6">
                                    <span className="font-bold text-green-900">Portfolio</span>
                                </div>

                                <div className="text-sm font-bold text-color-2 mb-11">
                                    Overview of portfolio performance
                                </div>

                                <div className="md:flex md:space-x-10 mb-11 md:items-center">
                                    <div className="card p-5 w-full md:mb-0 mb-6">
                                        <div className="py-3">
                                            <div className="flex justify-between w-full">
                                                <div>
                                                    <div className="mb-10 text-sm font-bold">Total Portfolio Value</div>

                                                    <div className="font-bold text-xl font-gotham-black-regular">
                                                        ₦ {formatCurrencyWithDecimal(totalPortfolioValue)}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="mb-10 text-sm font-bold">Investment Amount</div>

                                                    <div className="font-bold text-xl font-gotham-black-regular">
                                                        ₦ {formatCurrencyWithDecimal(investmentAmount)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card p-5 w-full">
                                        <div className="w-full py-3">
                                            <div className="flex justify-between w-full">
                                                <div>
                                                    <div className="mb-10 text-sm font-bold">Net Portfolio Returns</div>
                                                    <div>
                                                        <img src={netPortfolioReturns >= 0 ? ArrowUpIcon : ArrowDownIcon} alt="" width="20" className="align-middle" />
                                                        <span className={netPortfolioReturns >= 0 ? "text-green-500 font-bold font-gotham-black-regular mx-2" : "text-red-500 font-bold font-gotham-black-regular mx-2"}>{netPortfolioReturns >= 0 ? '+' + formatCurrencyWithDecimal(netPortfolioReturns).replace("-","") : formatCurrencyWithDecimal(netPortfolioReturns).replace("-","")} | {formatCurrencyWithDecimal(netPortfolioReturnsPercentage).replace("-","")}%</span>
                                                    </div>

                                                    <div className="hidden font-bold text-3xl font-gotham-black-regular">
                                                        {netPortfolioReturns}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="mb-10 text-sm font-bold">Number of Portfolio</div>

                                                    <div className="font-bold text-xl font-gotham-black-regular">
                                                        {portfolioCount}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='hidden'>
                                            <img src={ArrowUpIcon} alt="" width="20" className="align-middle" />
                                            <span className="text-green-500 font-bold font-gotham-black-regular mx-2">+500 | 5.55%</span>  7days
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-16'>
                                    <div className='card p-6'>
                                        <div className='mb-30'>
                                            <div className='md:flex md:justify-between md:items-center '>
                                                <div className='md:mb-0 mb-6'>
                                                    <div className='font-gotham-black-regular font-bold text-green-900 text-xl'>Total Portfolio Performance</div>

                                                    <div className='text-lg'>Total Portfolio Value</div>

                                                    <div className='font-gotham-black-regular font-bold text-green-900 text-xl'>₦ {formatCurrencyWithDecimal(totalPortfolioValue)}</div>
                                                </div>

                                                <div className='md:w-1/2 w-full flex bg-gray-300 p-1 rounded justify-between'>
                                                    <button className='bg-gray-300 hover:text-white md:py-3 md:px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold py-2 px-2' type='button'>1D</button>

                                                    <button className='bg-gray-300 hover:text-white md:py-3 md:px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold py-2 px-2' type='button'>1W</button>

                                                    <button className='bg-gray-300 hover:text-white md:py-3 md:px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold py-2 px-2' type='button'>1M</button>

                                                    <button className='bg-gray-300 hover:text-white md:py-3 md:px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold py-2 px-2' type='button'>3M</button>

                                                    <button className='bg-gray-300 hover:text-white md:py-3 md:px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold py-2 px-2' type='button'>6M</button>

                                                    <button className='bg-gray-300 hover:text-white md:py-3 md:px-5 py-2 px-2 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1Y</button>
                                                </div>
                                            </div>                                            
                                        </div>

                                        <div>
                                            {/* <Line options={options} data={data} id='canvas'/> */}
                                            <Chart options={options} series={series} type="area" height='490' />
                                        </div>
                                    </div>
                                </div>

                                <div className="md:mb-10 mb-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-lg font-gotham-black-regular">My Portfolio List</div>
                                        <div>
                                            <button onClick={showCreatePorfolioModal} className="cursor-pointer bg-green-900 rounded-lg text-white border-0 py-3 px-5 font-bold focus:shadow-outline" type='button'>
                                                Create new portfolio
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-30">
                                    <div className="md:grid md:grid-cols-2 md:gap-4">
                                        {portfolioList === '' ? 'You have not created any portfolio.' : portfolioList}
                                    </div>
                                </div>

                                <div className={showCreatePortfolio ? "create-portfolio-modal" : "create-portfolio-modal hidden"}>
                                    <div className="mb-20 flex justify-between">
                                        <div className="font-bold text-25 opacity-0">Top Losers</div>

                                        <div onClick={closeModal}>
                                            <img src={CloseIcon} alt="" className="cursor-pointer" />
                                        </div>
                                    </div>

                                    <div>
                                        {/* Portfolio Error */}
                                        <div className={apiResponseHasError ? "error-alert mb-20 p-2":"hidden"}>
                                            <div className="">
                                                <div className="flex  items-center space-x-1">
                                                    <div className='mt-2'>
                                                        <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                        </svg>
                                                    </div>

                                                    <div className="text-sm">{apiResponseHasMsg}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className="text-3xl font-bold mb-30">Create New Portfolio</div>      

                                        <form>
                                            <div>
                                                <div className="mb-10">Name</div>
                                                <div className="mb-30">
                                                    <input value={portfolioName} onChange={e => setPortfolioName(e.target.value)} type="text" className="text-xl outline-white input-xsm p-3" />
                                                </div>

                                                <div className="flex space-x-5">
                                                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Cancel</button>

                                                    <button disabled={portfolioIsNullOrEmpty} onClick={createPortfolio} className={portfolioIsNullOrEmpty
                                                        ? "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer opacity-50" : "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer"} type='button'>
                                                        <span className={showSpinner ? "hidden" : ""}>Add</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
                                    <div className="mx-auto w-1/2">
                                        <img src={SuccessIcon} alt="success icon" className="w-full" />
                                    </div>

                                    <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                                    <div className="text-color-4 text-sm text-center mb-14">Your portfolio has been successfully created</div>

                                    <div className="flex space-x-5 mb-30">
                                        <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                                        <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
                                    </div>
                                </div>

                                <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
                                </div>

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

                        {/* Delete Modal */}
                        <div className={showDeleteModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                            <div className="mb-10 flex justify-between">
                                <div className="font-bold text-3xl text-green-900 font-gotham-black-regular"></div>

                                <div onClick={closeModal}>
                                    <img src={CloseIcon} alt="" className="cursor-pointer" />
                                </div>
                            </div>

                            <div>
                                {/* Delete Success */}
                                <div className={isDeleteSuccess ? "otp-alert mb-20" : "hidden"}>
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
                                    </div>
                                </div>
                                {/* End */}

                                {/* Delete Error */}
                                <div className={apiResponseHasError ? "error-alert mb-20" : "hidden"}>
                                    <div className="flex justify-between space-x-1 pt-3">
                                        <div className="flex">
                                            <div>
                                                <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                </svg>
                                            </div>

                                            <div className="text-sm">{apiResponseErrorMsg}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                <div className='text-center mb-20'>
                                    <img src={DeleteCardIcon} alt='' />
                                </div>

                                <div className='text-red-500 font-bold text-3xl text-center mb-30'>Delete this portfolio</div>           
                                

                            </div>

                            <div className="flex space-x-5 mb-10">
                                <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                                <button onClick={deletePortfolio} type="button" className="py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer">
                                    <span className={showSpinner ? "hidden" : ""}>Delete</span>
                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                </button>
                            </div>
                        </div>
                        {/* End */}

                        {/* Modal BG */}
                        <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
                        </div>
                        {/* End */}
                    </div>
                </div>
            </div>
    );
};

export default Portfolio;