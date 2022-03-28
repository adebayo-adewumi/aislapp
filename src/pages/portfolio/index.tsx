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
import { createPortfolioEndpoint, getPortfolioEndpoint, getPortfolioPerformanceEndpoint } from "../../apiUrls";
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
import { Link, useNavigate } from 'react-router-dom';

const Portfolio = () => {
    document.title = "Portfolio - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    let navigate = useNavigate();

    const [showCreatePortfolio, setShowCreatePortfolio] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [portfolioName, setPortfolioName] = useState('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [apiResponseHasError, setApiResponseHasError] = useState<boolean>(false);
    const [apiResponseHasMsg, setApiResponseHasMsg] = useState('');

    const [portfolioIsNullOrEmpty, setPortfolioIsNullOrEmpty] = useState<boolean>(true);
    const [portfolioCount, setPortfolioCount] = useState(0);

    const [portfolioList, setPortfolioList] = useState<any[]>([]);

    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [netPortfolioReturns, setNetPortfolioReturns] = useState(0);
    const [netPortfolioReturnsPercentage, setNetPortfolioReturnsPercentage] = useState(0);
    
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [portfolioId, setPortfolioId] = useState('');
    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');
    const [apiResponseErrorMsg, setApiResponseErrorMsg] = useState('');

    const [graphYAxis, setGraphYAxis] = useState<string[]>(["0","0","0","0","0","0","0","0","0","0","0","0"]);
    const [graphXAxis, setGraphXAxis] = useState<string[]>(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

    const [graph1DYAxis, setGraph1DYAxis] = useState<string[]>([]);
    const [graph1DXAxis, setGraph1DXAxis] = useState<string[]>([]);

    const [graph1WYAxis, setGraph1WYAxis] = useState<string[]>([]);
    const [graph1WXAxis, setGraph1WXAxis] = useState<string[]>([]);

    const [graph1MYAxis, setGraph1MYAxis] = useState<string[]>([]);
    const [graph1MXAxis, setGraph1MXAxis] = useState<string[]>([]);

    const [graph3MYAxis, setGraph3MYAxis] = useState<string[]>([]);
    const [graph3MXAxis, setGraph3MXAxis] = useState<string[]>([]);

    const [graph6MYAxis, setGraph6MYAxis] = useState<string[]>([]);
    const [graph6MXAxis, setGraph6MXAxis] = useState<string[]>([]);

    const [graph1YYAxis, setGraph1YYAxis] = useState<string[]>([]);
    const [graph1YXAxis, setGraph1YXAxis] = useState<string[]>([]);
    

    let options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: graphXAxis,
            tooltip: {
                enabled: false
            },
            title: {
                text: "",
            },
            labels:{
                show: false
            }
        },
        yaxis: {
            tooltip: {
                enabled: false
            },
            title: {
                text: "Porfolio Returns (₦)",
            },
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
        },

    };

    let series = [
        {
            name: "series-1",
            data: graphYAxis
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

        checkIfPortfolioIsNullOrEmpty();
    });

    useEffect(()=>{
        function getPortfolioList() {
            getAxios(axios).get(getPortfolioEndpoint)
                .then(function (response) {
                    setShowPageLoader(false);
                    setPortfolioCount(response.data.data.portfolio.length);
                    setTotalPortfolioValue(response.data.data.totalCurrentPrice);
                    setInvestmentAmount(response.data.data.totalPurchasedPrice);
                    setNetPortfolioReturns(response.data.data.totalPortfolioReturn);
                    setNetPortfolioReturnsPercentage(response.data.data.percentageReturn);
    
                    const listItems = response.data.data.portfolio;
    
                    setPortfolioList(listItems);
                })
                .catch(function () {
    
                    setApiResponseHasError(true);
    
                    setTimeout(() => {
                        setApiResponseHasError(false);
                    }, 3000);
                });
        }

        getPortfolioList();
    },[]);

    useEffect(() => {
        function get1DStockGraphData() {

            let requestData = {
                "startDate":moment().subtract(1, 'days').format("DD-MM-YYYY hh:mm:ss"),
                "endDate":moment().format("DD-MM-YYYY hh:mm:ss")
            }

            getAxios(axios).post(getPortfolioPerformanceEndpoint, requestData)
            .then(function (response) { 
                if(response.data.data.length === 0){
                    setGraph1DYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    
                    setGraph1DXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.data.map((item :any)=>{
                        graph1DYAxis.push(item.portfolioReturn);
                        graph1DXAxis.push(moment(item.createdOn).format("MMM Do, YY"));

                        setGraphYAxis(graph1DYAxis);
                        setGraphXAxis(graph1DXAxis);

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get1DStockGraphData();
    },[graph1DXAxis, graph1DYAxis]);

    useEffect(() => {
        function get1WStockGraphData() {

            let requestData = {
                "startDate":moment().subtract(1, 'weeks').format("DD-MM-YYYY hh:mm:ss"),
                "endDate":moment().format("DD-MM-YYYY hh:mm:ss")
            }

            getAxios(axios).post(getPortfolioPerformanceEndpoint, requestData)
            .then(function (response) { 
                if(response.data.data.length === 0){
                    setGraph1WYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    
                    setGraph1WXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.data.map((item :any)=>{
                        graph1WYAxis.push(item.portfolioReturn);
                        graph1WXAxis.push(moment(item.createdOn).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get1WStockGraphData();
    },[graph1WXAxis, graph1WYAxis]);

    useEffect(() => {
        function get1MStockGraphData() {

            let requestData = {
                "startDate":moment().subtract(1, 'months').format("DD-MM-YYYY hh:mm:ss"),
                "endDate":moment().format("DD-MM-YYYY hh:mm:ss")
            }

            getAxios(axios).post(getPortfolioPerformanceEndpoint, requestData)
            .then(function (response) { 
                if(response.data.data.length === 0){
                    setGraph1MYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    
                    setGraph1MXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.data.map((item :any)=>{
                        graph1MYAxis.push(item.portfolioReturn);
                        graph1MXAxis.push(moment(item.createdOn).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get1MStockGraphData();
    },[graph1MXAxis, graph1MYAxis]);
    
    useEffect(() => {
        function get3MStockGraphData() {

            let requestData = {
                "startDate":moment().subtract(3, 'months').format("DD-MM-YYYY hh:mm:ss"),
                "endDate":moment().format("DD-MM-YYYY hh:mm:ss")
            }

            getAxios(axios).post(getPortfolioPerformanceEndpoint, requestData)
            .then(function (response) { 
                if(response.data.data.length === 0){
                    setGraph3MYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    
                    setGraph3MXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.data.map((item :any)=>{
                        graph3MYAxis.push(item.portfolioReturn);
                        graph3MXAxis.push(moment(item.createdOn).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get3MStockGraphData();
    },[graph3MXAxis, graph3MYAxis]);

    useEffect(() => {
        function get6MStockGraphData() {

            let requestData = {
                "startDate":moment().subtract(6, 'months').format("DD-MM-YYYY hh:mm:ss"),
                "endDate":moment().format("DD-MM-YYYY hh:mm:ss")
            }

            getAxios(axios).post(getPortfolioPerformanceEndpoint, requestData)
            .then(function (response) { 
                if(response.data.data.length === 0){
                    setGraph6MYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    
                    setGraph6MXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.data.map((item :any)=>{
                        graph6MYAxis.push(item.portfolioReturn);
                        graph6MXAxis.push(moment(item.createdOn).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get6MStockGraphData();
    },[graph6MXAxis, graph6MYAxis]);

    useEffect(() => {
        function get1YStockGraphData() {

            let requestData = {
                "startDate":moment().subtract(1, 'years').format("DD-MM-YYYY hh:mm:ss"),
                "endDate":moment().format("DD-MM-YYYY hh:mm:ss")
            }

            getAxios(axios).post(getPortfolioPerformanceEndpoint, requestData)
            .then(function (response) { 
                if(response.data.data.length === 0){
                    setGraph1YYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    
                    setGraph1YXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.data.map((item :any)=>{
                        graph1YYAxis.push(item.portfolioReturn);
                        graph1YXAxis.push(moment(item.createdOn).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get1YStockGraphData();
    },[graph1YXAxis, graph1YYAxis]);

    

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

    function viewPortfolioDetails(event :any){
        let idAttr = event.target.getAttribute("id");

        if(idAttr !== "deleteIcon"){
            navigate("details/".concat(idAttr));
        }
    }

    function filterGraph(event :any){
        let filterType = event.target.getAttribute("data-filter");
        let filterBtns = document.getElementsByClassName("filter-btn");
        
        [].forEach.call(filterBtns, (el :any) =>{
            el.classList.remove("active");
            el.classList.add("inactive");
        });

        event.target.classList.remove("inactive");
        event.target.classList.add("active");
        
        if(filterType === "1D"){
            setGraphYAxis(graph1DYAxis);
            setGraphXAxis(graph1DXAxis);
        }
        else if(filterType === "1W"){

            setGraphYAxis(graph1WYAxis);
            setGraphXAxis(graph1WXAxis);
        }
        else if(filterType === "1M"){
            setGraphYAxis(graph1MYAxis);
            setGraphXAxis(graph1MXAxis);
        }
        else if(filterType === "3M"){
            setGraphYAxis(graph3MYAxis);
            setGraphXAxis(graph3MXAxis);
        }
        else if(filterType === "6M"){
            setGraphYAxis(graph6MYAxis);
            setGraphXAxis(graph6MXAxis);
        }
        else if(filterType === "1Y"){
            setGraphYAxis(graph1YYAxis);
            setGraphXAxis(graph1YXAxis);
        }
        else{
            setGraphYAxis(graph1DYAxis);
            setGraphXAxis(graph1DXAxis);
        }

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
                                                <div className='w-1/2 md:mb-0 mb-6'>
                                                    <div className='font-gotham-black-regular font-bold text-green-900 text-xl'>Total Portfolio Performance</div>

                                                    <div className='text-lg'>Total Portfolio Value</div>

                                                    <div className='font-gotham-black-regular font-bold text-green-900 text-xl'>₦ {formatCurrencyWithDecimal(totalPortfolioValue)}</div>
                                                </div>

                                                <div className='w-1/3 flex bg-gray-300 p-1 rounded justify-between'>
                                                    <button onClick={filterGraph} className='py-3 px-5 lg:py-2 lg:px-3 rounded border-0 cursor-pointer font-bold filter-btn active hover:bg-green-900 hover:text-white' type='button' data-filter="1D">1D</button>

                                                    <button onClick={filterGraph} className='py-3 px-5 lg:py-2 lg:px-3 rounded border-0  cursor-pointer font-bold filter-btn inactive' type='button' data-filter="1W">1W</button>

                                                    <button onClick={filterGraph} className='py-3 px-5 lg:py-2 lg:px-3 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="1M">1M</button>

                                                    <button onClick={filterGraph} className='py-3 px-5 lg:py-2 lg:px-3 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="3M">3M</button>

                                                    <button onClick={filterGraph} className='py-3 px-5 lg:py-2 lg:px-3 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="6M">6M</button>

                                                    <button onClick={filterGraph} className='py-3 px-5 lg:py-2 lg:px-3 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="1Y">1Y</button>
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
                                        <div className={portfolioList.length === 0 ? '':'hidden' }>
                                            You have not created any portfolio.
                                        </div>

                                        {portfolioList.map((item :any, index :any)=>
                                            <div onClick={viewPortfolioDetails} className="card-custom p-5 flex justify-between cursor-pointer md:mb-0 mb-6" id={item.uuid} key={index}>
                                            <div className="flex space-x-4" id={item.uuid}>
                                                <div id={item.uuid}><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" id={item.uuid} /></div>
                
                                                <div className="text-sm" id={item.uuid}>
                                                    <div className="mb-10 font-bold text-color-2" id={item.uuid}>{item.name}</div>
                                                    <div id={item.uuid} className={item.hasOwnProperty("listOfStocks") ? 'text-black':'hidden'}>Count: {item.hasOwnProperty("listOfStocks") ? item.listOfStocks.length : 0}</div>
                                                </div>
                                            </div>
                
                                            <div className="text-sm" id={item.uuid}> 
                                                <div className="flex mb-10 justify-between" id={item.uuid}>
                                                    <div className="text-green-900 font-bold" id={item.uuid}>Portfolio Value</div>
                                                </div>
                                                <div className="font-gotham-black-regular text-green-900 text-24 mb-10" id={item.uuid}>₦ {formatCurrencyWithDecimal(item.currentValue)}</div>
                                                <div id={item.uuid} className={item.hasOwnProperty("uuid") ? '':'hidden'}>
                                                    <span className={(item.portfolioReturn) >= 0 ? "text-green-500 text-24 font-bold" : "text-red-500 text-24 font-bold"} id={item.uuid}>
                                                        <span id={item.uuid}>{formatCurrencyWithDecimal(defaultToZeroIfNullOrUndefined(item.portfolioReturn)).replace("-","")}</span> |
                                                        <span className='ml-1' id={item.uuid}>{isNullOrUndefined(item.portfolioPercentageReturn)
                                                            ? 0 : formatCurrencyWithDecimal(item.portfolioPercentageReturn).replace("-","")}</span>%</span>
                                                    <span className='text-black hidden' id={item.uuid}> 7days</span>
                                                </div>
                                            </div>
                
                                            <div className={item.hasOwnProperty("uuid") ? 'row d-flex justify-content-end align-items-end':'hidden'} id={item.uuid}>
                                                <div id={item.uuid}>
                                                    <Link to={"details/"+item.uuid} id={item.uuid}><img src={ChevronRightIcon} alt="" id={item.uuid}/></Link>
                                                </div>
                
                                                <div className='mr-2' id='deleteIcon' onClick={displayDeleteModal} data-value={item.id}>
                                                    <img src={DeleteIcon} alt="" id='deleteIcon' data-value={item.uuid}/>
                                                </div>
                                            </div>
                                        </div>
                                        )}
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