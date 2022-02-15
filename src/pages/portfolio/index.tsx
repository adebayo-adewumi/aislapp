import React, { useState, useEffect } from 'react';
import '../portfolio/index.scss';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowDownIcon from '../../assets/images/arrow-down.svg';
import SuccessIcon from '../../assets/images/success.gif';
import CloseIcon from '../../assets/images/close.svg';
import Sidebar from '../../components/Sidebar';
import Chart from "react-apexcharts";
import axios from 'axios';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import { formatCurrencyWithDecimal } from '../../lib/helper';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import * as HelperFunctions from '../../lib/helper';
import { createPortfolioEndpoint, getPortfolioEndpoint, stockTradingServiceBaseUrlUrl } from "../../apiUrls";
import PortfolioInfoCard from '../../components/PortfolioInfoCard';
import { getAxios } from "../../network/httpClientWrapper"
import LoaderContainer from '../../containers/LoaderContainer';
import moment from 'moment';

const Portfolio = () => {
    document.title = "Portfolio - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [showCreatePortfolio, setShowCreatePortfolio] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [portfolioName, setPortfolioName] = useState('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [apiResponseHasError, setApiResponseHasError] = useState<boolean>(false);
    const [portfolioIsNullOrEmpty, setPortfolioIsNullOrEmpty] = useState<boolean>(true);
    const [portfolioCount, setPortfolioCount] = useState(0);
    const [portfolioList, setPortfolioList] = useState('');
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [netPortfolioReturns, setNetPortfolioReturns] = useState(0);
    const [netPortfolioReturnsPercentage, setNetPortfolioReturnsPercentage] = useState(0);
    const [, setShowPageLoader] = useState<boolean>(true);
    const [graphYAxis, ] = useState<string[]>([]);
    const [graphXAxis, ] = useState<string[]>([]);

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

    useEffect(() => {
        function checkIfPortfolioIsNullOrEmpty() {

            if (portfolioName === '') {
                setPortfolioIsNullOrEmpty(true);
            }
            else {
                setPortfolioIsNullOrEmpty(false);
            }
        }

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
                        <PortfolioInfoCard
                            item={item}
                            title={'Portfolio value'}
                            onReload={getPortfolioList}
                        />
                    );
    
                    setPortfolioList(listItems);
                })
                .catch(function () {
    
                    console.log(apiResponseHasError);
    
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
                    //setGraphYAxis(gy);

                    graphXAxis.push(moment(item.date).format("MMM Do"));

                    return false; 
                    //setGraphXAxis(gx);
                });
                
            })
            .catch(function (error) {
                
            });
        }
    
        getStockGraphData();
        getPortfolioList();
        checkIfPortfolioIsNullOrEmpty();
    });

    function showCreatePorfolioModal() {
        setShowCreatePortfolio(true);
        setShowModalBG(true);
    }

    function closeModal() {
        setShowCreatePortfolio(false);
        setShowModalBG(false);
        setShowSuccessModal(false);
        setPortfolioName('');
    }

    function createPortfolio() {
        let requestData = {
            "name": portfolioName
        }
        setShowSpinner(true);
        let createPortfolioCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('createPortfolioCypher', createPortfolioCypher);

        //Login User
        if (localStorage.getItem('createPortfolioCypher')) {
            setShowSpinner(true);
            

            getAxios(axios).post(createPortfolioEndpoint,
                {
                    "text": localStorage.getItem('createPortfolioCypher')
                })
                .then(function () {
                    setShowSpinner(false);
                    setShowCreatePortfolio(false);
                    setShowModalBG(true);
                    setShowSuccessModal(true);
                    //getPortfolioList();
                })
                .catch(function (error) {

                    console.log(error);

                    setShowSpinner(false);

                    setApiResponseHasError(true);

                    setTimeout(() => {
                        setApiResponseHasError(false);
                    }, 3000);
                });
        }
    }

    HelperFunctions.removeOverflowAndPaddingFromModalBody();

    return (
        <LoaderContainer showPageLoader={showSpinner}>
            <div className="relative">
                <UserAreaHeader />

                <div>
                    <div className="flex">
                        <Sidebar />

                        <div className="main-content w-full p-10">
                            <div className="text-28 mb-20">
                                <span className="font-bold text-color-1">Portfolio</span>
                            </div>

                            <div className="text-16 font-bold text-color-2 mb-30">
                                Overview of portfolio performance
                            </div>

                            <div className="flex mt-10 space-x-10 mb-30">
                                <div className="card-50">
                                    <div className="mb-10 py-3">
                                        <div className="flex justify-between w-full">
                                            <div>
                                                <div className="mb-10">Total Portfolio Value</div>

                                                <div className="font-bold text-25 font-gotham-black-regular">
                                                    ₦ {formatCurrencyWithDecimal(totalPortfolioValue)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mb-10">Investment Amount</div>

                                                <div className="font-bold text-25 font-gotham-black-regular">
                                                    ₦ {formatCurrencyWithDecimal(investmentAmount)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-50">
                                    <div className="w-full mb-10 py-3">
                                        <div className="flex justify-between w-full">
                                            <div>
                                                <div className="mb-10">Net Portfolio Returns</div>
                                                <div>
                                                    <img src={netPortfolioReturns >= 0 ? ArrowUpIcon : ArrowDownIcon} alt="" width="20" className="align-middle" />
                                                    <span className={netPortfolioReturns >= 0 ? "text-green-500 font-bold font-gotham-black-regular mx-2" : "text-red-500 font-bold font-gotham-black-regular mx-2"}>{netPortfolioReturns >= 0 ? '+' + formatCurrencyWithDecimal(netPortfolioReturns).replace("-","") : formatCurrencyWithDecimal(netPortfolioReturns).replace("-","")} | {formatCurrencyWithDecimal(netPortfolioReturnsPercentage).replace("-","")}%</span>
                                                </div>

                                                <div className="hidden font-bold text-28 font-gotham-black-regular">
                                                    {netPortfolioReturns}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mb-10">Number of Portfolio</div>

                                                <div className="font-bold text-28 font-gotham-black-regular">
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
                                <div className='card mx-auto' style={{ width: '95%' }}>
                                    <div className='mb-30'>
                                        <div className='flex justify-between items-center'>
                                            <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>Total Portfolio Performance</div>
                                            <div className='w-1/2 flex bg-gray-300 p-1 rounded justify-between'>
                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1D</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1W</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1M</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>3M</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>6M</button>

                                                <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1Y</button>
                                            </div>
                                        </div>

                                        <div className='text-lg'>Total Portfolio Value</div>
                                        <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>₦ {formatCurrencyWithDecimal(totalPortfolioValue)}</div>
                                    </div>

                                    <div>
                                        {/* <Line options={options} data={data} id='canvas'/> */}
                                        <Chart options={options} series={series} type="area" height='490' />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-gotham-black-regular">My Portfolio List</div>
                                    <div>
                                        <button onClick={showCreatePorfolioModal} className="cursor-pointer bgcolor-1 rounded-lg text-white border-0 py-3 px-5 font-bold focus:shadow-outline" type='button'>
                                            Create new portfolio
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-30">
                                <div className="grid grid-cols-2 gap-4">
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
                                    <div className="text-28 font-bold mb-30">Create New Portfolio</div>

                                    <form>
                                        <div>
                                            <div className="mb-10">Name</div>
                                            <div className="mb-30">
                                                <input value={portfolioName} onChange={e => setPortfolioName(e.target.value)} type="text" className="text-xl outline-white input-xsm p-3" />
                                            </div>

                                            <div className="flex space-x-5">
                                                <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Cancel</button>

                                                <button disabled={showSpinner} onClick={createPortfolio} className={portfolioIsNullOrEmpty
                                                    ? "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer" : "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer"} type='button'>
                                                    <span className={showSpinner ? "hidden" : ""}>Add</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
                                <div className="mx-auto h-64 relative">
                                    <img src={SuccessIcon} alt="success icon" className="w-96" />
                                    <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                </div>

                                <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>

                                <div className="text-color-4 text-16 text-center mb-14">Your portfolio has been successfully created</div>

                                <div className="flex space-x-5 mb-30">
                                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
                                </div>
                            </div>

                            <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
                            </div>

                            {/* <div className={showPageLoader ? "page-loader-backdrop opacity-90" : "hidden"}>
                                <div className='ml-custom w-96 my-custom relative'>
                                    <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                                    <div className='text-center'><img src={AnchoriaSpinner} alt="" /></div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </LoaderContainer>
    );
};

export default Portfolio;