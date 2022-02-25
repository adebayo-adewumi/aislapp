import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../stock/index.scss';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import StarIcon from '../../assets/images/star.svg';
import CloseIcon from '../../assets/images/close.svg';
import SuccessIcon from '../../assets/images/success.gif';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Form from 'react-bootstrap/Form';
import Sidebar from '../../components/Sidebar';
import Chart from "react-apexcharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from '../../assets/images/calendar.svg';
import ChevronDownIcon from '../../assets/images/chevron-down.svg';
import moment from 'moment';
import axios from 'axios';
import AtlasIcon from '../../assets/images/atlas.svg';
import * as HelperFunctions from '../../lib/helper';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import { authOnboardingServiceBaseUrl, portfolioServiceBaseUrlUrl, stockTradingServiceBaseUrlUrl, utilityServiceBaseUrlUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';

const Stock = () => {
    const params = new URLSearchParams(window.location.search);

    document.title = "Stock: " + params.get("symbol") + " - Anchoria";

    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [showSummary, setShowSummary] = useState<boolean>(true);
    const [showAbout, setShowAbout] = useState<boolean>(false);
    const [showNews, setShowNews] = useState<boolean>(false);

    const [showOrderSummaryModal, setShowOrderSummaryModal] = useState<boolean>(false);
    const [showAddToWatchListModal, setShowAddToWatchListModal] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showTradeStockModal, setShowTradeStockModal] = useState<boolean>(false);
    const [showSetPriceAlertModal, setShowSetPriceAlertModal] = useState<boolean>(false);

    const [showHighLow, setShowHighLow] = useState<boolean>(false);
    const [enablePriceAlert, setEnablePriceAlert] = useState<boolean>(false);

    const [orderType, setOrderType] = useState('Market');
    const [duration, setDuration] = useState('End of day');
    const [stockUnit, setStockUnit] = useState('');
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [, setActualCost] = useState(0);
    const [priceToleranceAndLimit, setPriceToleranceAndLimit] = useState("0");

    const [showOrderTypeDropdown, setShowOrderTypeDropdown] = useState<boolean>(false);
    const [limitOrderType, setLimitOrderType] = useState<boolean>(false);
    const [stopLossOrderType, setStopLossOrderType] = useState<boolean>(false);
    const [stopLimitOrderType, setStopLimitOrderType] = useState<boolean>(false);

    const [showLimitDurationDropdown, setShowLimitDurationDropdown] = useState<boolean>(false);
    const [showStopLossDurationDropdown, setShowStopLossDurationDropdown] = useState<boolean>(false);
    const [showStopLimitDurationDropdown, setShowStopLimitDurationDropdown] = useState<boolean>(false);
    const [endOfDayDuration, setEndOfDayDuration] = useState<boolean>(false);
    const [fillOrKillDuration, setFillOrKillDuration] = useState<boolean>(false);
    const [immediateOrCancelDuration, setImmediateOrCancelDuration] = useState<boolean>(false);
    const [goodTillCancelledDuration, setGoodTillCancelledDuration] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [dateState, setDateState] = useState(new Date());
    const [showDate, setShowDate] = useState(moment(Date.now()).format("DD - MM - YYYY"));
    const [companyInfo, setCompanyInfo] = useState('');
    const [, setCompanyMktCap] = useState('');
    const [newsList, setNewsList] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [bidsList, setBidsList] = useState('');
    const [offersList, setOffersList] = useState('');

    const [buyStockError, setBuyStockError] = useState('');
    const [priceEstimateError, setPriceEstimateError] = useState('');
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);
    const [, setApiResponseHasError] = useState<boolean>(false);
    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');
    const [portfolioList, setPortfolioList] = useState('');
    const [, setPortfolioIdToAddStock] = useState('');

    const [showValidatePINModal, setShowValidatePINModal] = useState<boolean>(false);
    const [pinValidationType, ] = useState('');

    const [isPinValid, setIsPinValid] = useState('');
    const [, setPinValidatedForBuyStock] = useState<boolean>(false);

    const [pin, setPin] = useState('');

    const [stockInfo, setStockInfo] = useState('');

    const [stockSymbol, ] = useState('');

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
                text: "Price (₦)",
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

    if (!showPageLoader) {
        HelperFunctions.removeOverflowAndPaddingFromModalBody();
    }

    useEffect(() => {
        const _params = new URLSearchParams(window.location.search);

        function getStockQuote() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/quote?stockCode=' + _params.get("symbol"))
            .then(function (response) {

                localStorage.setItem("aislStockInfo", JSON.stringify(response.data.data));

                setStockInfo(JSON.stringify(response.data.data));

                setCompanyMktCap(HelperFunctions.formatCurrencyWithDecimal(response.data.data.marketCap));
                setCompanyInfo(response.data.data.companyInfo);


                setShowPageLoader(false);
            })
            .catch(function (error) {
                setShowPageLoader(false);
            });
        }

        function getTopFiveBids() {
            getAxios(axios).get(utilityServiceBaseUrlUrl.concat('/utils/top-five-bids/' + _params.get("symbol")))
                .then(function (response) {
                    if(response.data.data.length > 0){
                        const bidsItem = response.data.data.map((item: any, index:any) =>
                            <div key={index} className='flex bid-offer justify-between border-bottom-e py-4'>
                                <div>{HelperFunctions.formatCurrencyWithDecimal(item.volume)}</div>
                                <div className='text-green-500'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                            </div>
                        );

                        setBidsList(bidsItem);
                    }
                    
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

        function getTopFiveOffers() {
            getAxios(axios).get(utilityServiceBaseUrlUrl.concat('/utils/top-five-offers/' + _params.get("symbol")))
                .then(function (response) {

                    if(response.data.data.length > 0){
                        const offersItem = response.data.data.map((item: any, index:any) =>
                            <div key={index} className='flex offers justify-between border-bottom-e py-4'>
                                <div>{HelperFunctions.formatCurrencyWithDecimal(item.volume)}</div>
                                <div className='text-green-500'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                            </div>
                        );

                        setOffersList(offersItem);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

        getStockQuote();
        getTopFiveOffers();
        getTopFiveBids();
    },[]);

    useEffect(() => {

        function getNews() {

            getAxios(axios).get(utilityServiceBaseUrlUrl + '/utils/news')
                .then(function (response) {
                    const takeNews = [response.data.data[0], response.data.data[1], response.data.data[2]];

                    const newsItem = takeNews.map((item: any, index:any) =>
                        <div key={index}>
                            <div className='mb-20'><img src={item.imageUrl} alt='' /></div>
                            <div className='w-22rem'>
                                <div className='font-bold mb-10 text-14 w-6/6'>{item.title}</div>
                                <div className='mb-10 text-13 tracking-wider leading-5'>{item.snippet}</div>
                                <div className='font-bold text-13'>&middot; {moment(item.date).format("MMM Do YYYY, hh:ss a")}</div>
                            </div>
                        </div>
                    ) as unknown as string;

                    setNewsList(newsItem);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

        function getWalletBalance() {

            let customer = HelperFunctions.getCustomerInfo();

            getAxios(axios).get(portfolioServiceBaseUrlUrl + '/account/balance?customerId=' + customer.id)
                .then(function (response) {
                    setWalletBalance(response.data.data.balance);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

        function getPortfolioList() {
            let customer = HelperFunctions.getCustomerInfo();
            getAxios(axios).get(portfolioServiceBaseUrlUrl.concat(customer.id))
                .then(function (response) {
                    const listItems = response.data.data.portfolio.map((item: any) => {
                        if (item.name !== "availableToInvest") {
                            return <option value={item.uuid}>{item.name}</option>
                        }

                        return false; 
                    });

                    setPortfolioList(listItems);
                })
                .catch(function (error) {

                    setApiResponseHasError(true);

                    setTimeout(() => {
                        setApiResponseHasError(false);
                    }, 3000);
                });
        }

        getWalletBalance();
        getPortfolioList();
        getNews();
    },[]);

    useEffect(() => {
        const _params = new URLSearchParams(window.location.search);

        function get1DStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode='+_params.get("symbol")+'&endDate='+moment(Date.now()).format("YYYY-MM-DD")+'&startDate='+moment().subtract(1, 'days').format("YYYY-MM-DD"))
            .then(function (response) { 
                if(response.data.length === 0){
                    setGraph1DYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    setGraph1DXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.map((item :any)=>{
                        graph1DYAxis.push(item.price);
                        graph1DXAxis.push(moment(item.date).format("MMM Do, YY"));

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
        const _params = new URLSearchParams(window.location.search);
        function get1WStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode='+_params.get("symbol")+'&endDate='+moment(Date.now()).format("YYYY-MM-DD")+'&startDate='+moment().subtract(1, 'weeks').format("YYYY-MM-DD"))
            .then(function (response) { 
                if(response.data.length === 0){
                    setGraph1WYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    setGraph1WXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.map((item :any)=>{
                        graph1WYAxis.push(item.price);
                        graph1WXAxis.push(moment(item.date).format("MMM Do, YY"));

                        return false;
                    });
                }
            })
            .catch(function (error) {});
        }

        get1WStockGraphData();
    },[graph1WXAxis, graph1WYAxis]);

    useEffect(() => {
        const _params = new URLSearchParams(window.location.search);

        function get1MStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode='+_params.get("symbol")+'&endDate='+moment(Date.now()).format("YYYY-MM-DD")+'&startDate='+moment().subtract(1, 'months').format("YYYY-MM-DD"))
            .then(function (response) { 
                if(response.data.length === 0){
                    setGraph1MYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    setGraph1MXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.map((item :any)=>{
                        graph1MYAxis.push(item.price);
                        graph1MXAxis.push(moment(item.date).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get1MStockGraphData();
    },[graph1MXAxis, graph1MYAxis]);

    useEffect(() => {
        const _params = new URLSearchParams(window.location.search);

        function get3MStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode='+_params.get("symbol")+'&endDate='+moment(Date.now()).format("YYYY-MM-DD")+'&startDate='+moment().subtract(3, 'months').format("YYYY-MM-DD"))
            .then(function (response) { 
                if(response.data.length === 0){
                    setGraph3MYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    setGraph3MXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.map((item :any)=>{
                        graph3MYAxis.push(item.price);
                        graph3MXAxis.push(moment(item.date).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get3MStockGraphData();
    },[graph3MXAxis, graph3MYAxis,]);

    useEffect(() => {
        const _params = new URLSearchParams(window.location.search);
        function get6MStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode='+_params.get("symbol")+'&endDate='+moment(Date.now()).format("YYYY-MM-DD")+'&startDate='+moment().subtract(6, 'months').format("YYYY-MM-DD"))
            .then(function (response) { 
                if(response.data.length === 0){
                    setGraph6MYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    setGraph6MXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.map((item :any)=>{
                        graph6MYAxis.push(item.price);
                        graph6MXAxis.push(moment(item.date).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get6MStockGraphData();
    },[graph6MXAxis, graph6MYAxis]);

    useEffect(() => {
        const _params = new URLSearchParams(window.location.search);
        function get1YStockGraphData() {

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price?stockCode='+_params.get("symbol")+'&endDate='+moment(Date.now()).format("YYYY-MM-DD")+'&startDate='+moment().subtract(1, 'years').format("YYYY-MM-DD"))
            .then(function (response) { 
                if(response.data.length === 0){
                    setGraph1YYAxis(["0","0","0","0","0","0","0","0","0","0","0","0"]);
                    setGraph1YXAxis(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
                }
                else{
                    response.data.map((item :any)=>{
                        graph1YYAxis.push(item.price);
                        graph1YXAxis.push(moment(item.date).format("MMM Do, YY"));

                        return false; 
                    });
                }
            })
            .catch(function (error) {});
        }

        get1YStockGraphData();
    },[graph1YXAxis, graph1YYAxis]);


    function calculateStockOrderEstimate() {
        let customer = HelperFunctions.getCustomerInfo();

        let durationArr = ["End of day", "Fill or Kill", "Immediate or Cancel", "Good till Cancelled"];
        let tradeActionArr = ["0", "4", "3", "1"];
        let durationIndex = durationArr.indexOf(duration);

        let orderTypeArr = ["Market", "Limit", "Stop Loss", "Stop Limit"];
        let orderTypeValue = ["49", "50", "51", "52"];
        let orderTypeIndex = orderTypeArr.indexOf(orderType);

        let requestData = {
            "clientUniqueRef": customer.clientUniqueRef,
            "currency": "NGN",
            "custAid": customer.custAid,
            "customerId": customer.id,
            "orderType": orderTypeValue[orderTypeIndex],
            "stockCode": params.get("symbol"),
            "stockName": params.get("name"),
            "units": stockUnit,
            "dateLimit": moment(Date.now()).format('YYYY-MM-DD'),
            "effectiveDate": moment(Date.now()).format('YYYY-MM-DD'),
            "priceLimit": priceToleranceAndLimit,
            "smsPin": "1234",
            "timeInForce": tradeActionArr[durationIndex],
            "tradeAction": params.get("tradeAction") === 'buy' ? '0' : '1'
        }

        console.log(requestData);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);


        getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/stock/order/estimate',
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);
                setEstimatedCost(parseFloat(response.data.data))

                let sinfo = JSON.parse(localStorage.get("aislStockInfo"));

                let stkunit = parseFloat(stockUnit);
                let price = parseFloat(sinfo.price);

                setActualCost(stkunit * price);

            })
            .catch(function (error) {
                setPriceEstimateError(error.response.data.message)
                setShowSpinner(false);
            });
    }

    function tradeStock() {
        let customer = HelperFunctions.getCustomerInfo();

        let durationArr = ["End of day", "Fill or Kill", "Immediate or Cancel", "Good till Cancelled"];
        let tradeActionArr = ["0", "4", "3", "1"];
        let durationIndex = durationArr.indexOf(duration);

        let orderTypeArr = ["Market", "Limit", "Stop Loss", "Stop Limit"];
        let orderTypeValue = ["49", "50", "51", "52"];
        let orderTypeIndex = orderTypeArr.indexOf(orderType);

        let requestData = {
            "clientUniqueRef": customer.clientUniqueRef,
            "currency": "NGN",
            "custAid": customer.custAid,
            "customerId": customer.id,
            "orderType": orderTypeValue[orderTypeIndex],
            "stockCode": params.get("symbol"),
            "stockName": params.get("name"),
            "units": stockUnit,
            "dateLimit": moment(Date.now()).format('YYYY-MM-DD'),
            "effectiveDate": moment(Date.now()).format('YYYY-MM-DD'),
            "priceLimit": priceToleranceAndLimit,
            "smsPin": "1234",
            "timeInForce": tradeActionArr[durationIndex],
            "tradeAction": params.get("tradeAction") === 'buy' ? '0' : '1'
        }

        console.log(requestData);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        // let headers = {
        //     'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
        //     'x-firebase-token': '12222',
        //     'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        // }

        getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/stock/' + params.get("tradeAction"),
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);

                if (response.data.data === 'null') {
                    setBuyStockError(response.data.message);

                    setTimeout(() => {
                        setBuyStockError('');
                    }, 5000);
                }
                else {
                    setApiResponseSuccessMsg(response.data.message)
                    setShowSuccessModal(true);
                    setShowAddToWatchListModal(false);
                    setShowTradeStockModal(false);
                    setShowOrderSummaryModal(false);
                }

                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
                setShowSpinner(false);
            });

        //Add Stock to Portfolio
        // let _requestData = {
        //     "portfolioId": portfolioIdToAddStock,
        //     "stocks": [
        //         "12353dc4-ff12-4493-9042-05fcb5a452d2"
        //     ]
        // }

        // let stockToPortfolioCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(_requestData));
        // localStorage.setItem('stockToPortfolioCypher', stockToPortfolioCypher);

        // let _headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

        //getAxios(axios).post(stockTradingServiceBaseUrlUrl+'/portfolio/add',
        // {
        //     "text": localStorage.getItem('stockToPortfolioCypher')
        // }, 
        // { headers })
        // .then(function (response) {  
        //     console.log(response.data)
        // })
        // .catch(function (error) {
        //     console.log(error)
        //     setShowSpinner(false);
        // });
    }

    function displayStockOrderSummaryModal() {
        setShowOrderSummaryModal(true);
        setShowModalBG(true);
        setShowTradeStockModal(false);
        setShowAddToWatchListModal(false);
        setShowSetPriceAlertModal(false);
    }

    function displaySummary() {
        setShowSummary(true);
        setShowAbout(false);
        setShowNews(false);
    }

    function displayAbout() {
        setShowSummary(false);
        setShowAbout(true);
        setShowNews(false);
    }

    function displayNews() {
        setShowSummary(false);
        setShowAbout(false);
        setShowNews(true);
    }

    function displayAddToWatchListModal() {
        setShowModalBG(true);
        setShowAddToWatchListModal(true);
        setShowSuccessModal(false);
        setShowTradeStockModal(false);
        setShowSetPriceAlertModal(false);

        HelperFunctions.addOverflowAndPaddingToModalBody()
    }

    function displayBuyStockModal() {
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowTradeStockModal(true);
        setShowSuccessModal(false);
        setShowSetPriceAlertModal(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function displaySetPriceAlertModal() {
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowTradeStockModal(false);
        setShowSetPriceAlertModal(true);
        setShowSuccessModal(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function displaySuccessModal() {
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowSuccessModal(true);
        setShowTradeStockModal(false);
        setShowSetPriceAlertModal(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function toggleEnablePriceAlert() {
        if (enablePriceAlert) {
            setEnablePriceAlert(false);
        }
        else {
            setEnablePriceAlert(true);
            displaySetPriceAlertModal();
        }
    }

    function closeModal() {
        setShowModalBG(false);
        setShowAddToWatchListModal(false);
        setShowTradeStockModal(false);
        setShowSetPriceAlertModal(false);
        setShowSuccessModal(false);
        setShowOrderSummaryModal(false);

        setStockUnit('');
        setActualCost(0);
        setEstimatedCost(0);

        setEnablePriceAlert(false);


        HelperFunctions.removeOverflowAndPaddingFromModalBody();
    }

    function displayHighLow() {
        setShowHighLow(true);
    }

    function selectOrderType(event: any) {
        const elem = event.target;
        setOrderType(elem.getAttribute("data-value"));

        const orderTypeList = document.getElementsByClassName("order-type-list");

        [].forEach.call(orderTypeList, function (el: any) {
            el.classList.remove("bg-gray-100");
        });

        elem.parentElement.classList.add("bg-gray-100");


        setShowOrderTypeDropdown(false);

        if (elem.getAttribute("data-value") === 'Market') {
            setLimitOrderType(false);
            setStopLossOrderType(false);
            setStopLimitOrderType(false);
        }
        else if (elem.getAttribute("data-value") === 'Limit') {
            setLimitOrderType(true);
            setStopLossOrderType(false);
            setStopLimitOrderType(false);
        }
        else if (elem.getAttribute("data-value") === 'Stop Loss') {
            setLimitOrderType(false);
            setStopLossOrderType(true);
            setStopLimitOrderType(false);
        }
        else {
            setLimitOrderType(false);
            setStopLossOrderType(false);
            setStopLimitOrderType(true);
        }
    }

    function displayOrderTypeDropdown() {
        setShowOrderTypeDropdown(true);
    }

    function selectDuration(event: any) {
        const elem = event.target;
        setDuration(elem.getAttribute("data-value"));

        const durationList = document.getElementsByClassName("duration-list");

        [].forEach.call(durationList, function (el: any) {
            el.classList.remove("bg-gray-100");
        });

        elem.parentElement.classList.add("bg-gray-100");


        setShowLimitDurationDropdown(false);
        setShowStopLossDurationDropdown(false);
        setShowStopLimitDurationDropdown(false);

        if (elem.getAttribute("data-value") === 'End of day') {
            setEndOfDayDuration(true);
            setFillOrKillDuration(false);
            setImmediateOrCancelDuration(false);
            setGoodTillCancelledDuration(false);
        }
        else if (elem.getAttribute("data-value") === 'Fill or Kill') {
            setEndOfDayDuration(false);
            setFillOrKillDuration(true);
            setImmediateOrCancelDuration(false);
            setGoodTillCancelledDuration(false);
        }
        else if (elem.getAttribute("data-value") === 'Immediate or Cancel') {
            setEndOfDayDuration(false);
            setFillOrKillDuration(false);
            setImmediateOrCancelDuration(true);
            setGoodTillCancelledDuration(false);
        }
        else {
            setEndOfDayDuration(false);
            setFillOrKillDuration(false);
            setImmediateOrCancelDuration(false);
            setGoodTillCancelledDuration(true);
        }
    }

    function displayLimitDuration() {
        setShowLimitDurationDropdown(true);
    }

    function displayStopLossDuration() {
        setShowStopLossDurationDropdown(true);
    }

    function displayStopLimitDuration() {
        setShowStopLimitDurationDropdown(true);
    }

    const changeDate = (e: any) => {
        setDateState(e);
        setShowDate(moment(e).format("DD - MM - YYYY"));
        setShowCalendar(false);
    }

    function displayCalendar() {
        if (showCalendar) {
            setShowCalendar(false);
        }
        else {
            setShowCalendar(true);
        }
    }

    const closeAlert = () => {
        setPriceEstimateError("");
    }

    function addStockToWatchlist() {
        let watchlist = JSON.parse(localStorage.getItem("aislUserWatchlist") as string);

        const requestData = {
            "stockSymbols": [stockSymbol],
            "watchlistId": watchlist.data.watchlistId
        }

        console.log(requestData);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        setShowSpinner(true);

        if (localStorage.getItem('genericCypher')) {

            getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/watchlist/add-stock',
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    setShowSpinner(false);
                    setApiResponseSuccessMsg(response.data.message);
                    displaySuccessModal();
                })
                .catch(function (error) {
                });
        }
    }

    function getPortfolioIdToAddStock(event: any) {
        setPortfolioIdToAddStock(event.target.value);
    }

    function validatePin() {
        setShowSpinner(true);

        let PINData = {
            "pin": pin
        }

        let validatePinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(PINData));
        localStorage.setItem('validatePinCypher', validatePinCypher);

        let customer = HelperFunctions.getCustomerInfo()


        getAxios(axios).post(authOnboardingServiceBaseUrl + '/customer/pin/validate?customerId=' + customer.id,
            {
                "text": localStorage.getItem('validatePinCypher')
        })
        .then(function (response) {
            setIsPinValid('true');
            setApiResponseSuccessMsg(response.data.message);

            if (pinValidationType === "buy-stock") {
                setPinValidatedForBuyStock(true);
            }


            setShowSpinner(false);

            setTimeout(() => {
                setShowValidatePINModal(false);
                setShowModalBG(true);
                setShowOrderSummaryModal(true);
            }, 1000)
        })
        .catch(function (error) {
            setIsPinValid('false');
            setApiResponseSuccessMsg(error.response.data.message);
            setShowSpinner(false);
        });
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
            <div className='hidden'>{endOfDayDuration}</div>
            <div className='hidden'>{fillOrKillDuration}</div>
            <div className='hidden'>{immediateOrCancelDuration}</div>
            <div className='hidden'>{goodTillCancelledDuration}</div>

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10 mb-30">
                        <div className="mb-10 pb-5">
                            <div className="flex justify-between items-center">
                                <div className="text-28 font-bold text-color-1 font-gotham-black-regular">Stock Details</div>
                                <div className="font-bold">
                                    <Link to="/trade" className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="border-bottom-1d mb-30"></div>

                        {/* Company Name section */}
                        <div className='mb-30'>
                            <div className="flex justify-between mb-20">
                                
                                    <div>
                                        <img src={AtlasIcon} alt="" className="align-middle" />
                                        <span className="font-bold font-gotham-black-regular mx-3 text-xl">{params.get('symbol')}</span> |
                                        <span className="font-bold mx-3">{params.get('name')}</span> |
                                        <span className="bg-yellow-500 py-2 px-3 rounded-2xl mx-3 text-14">{stockInfo === '' ? '' : JSON.parse(stockInfo).sector}</span>
                                    </div>
                                

                                <div>
                                    <button onClick={displayAddToWatchListModal} className="cursor-pointer focus:shadow-outline rounded-lg bg-gray-300 py-3 px-5 border-0 font-bold" type='button'>
                                        <img src={StarIcon} alt="" className="align-bottom mr-2" width="20" />
                                        Add to watchlist
                                    </button>

                                    <button onClick={displayBuyStockModal} className={params.get("tradeAction") === 'buy' ? "cursor-pointer focus:shadow-outline text-white rounded-lg bg-green-800 pb-3 pt-4 px-7 border-0 font-bold ml-3" : "cursor-pointer focus:shadow-outline text-white rounded-lg bg-red-500 pb-3 pt-4 px-7 border-0 font-bold ml-3"} type='button'>
                                        {params.get("tradeAction") === 'buy' ? 'Buy' : 'Sell'}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <div className="w-3/6">
                                        <div className='mb-6 leading-5 text-sm'>{companyInfo.length > 250 ? companyInfo.substring(0, 250) + "..." : companyInfo}</div>

                                        <div className="font-bold flex ">
                                            <div className='mr-3'>Enable price alerts</div>

                                            <div onClick={toggleEnablePriceAlert} className={enablePriceAlert ? 'flex rounded-3xl p-1 bgcolor-1 ease-in-out transition delay-75 duration-75' : 'flex knob-container rounded-3xl p-1 hover:bg-gray-200 ease-in-out transition delay-75 duration-75'}>
                                                <button className={enablePriceAlert ? "rounded-3xl knob border-0 cursor-pointer opacity-0" : "rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75"} type="button"></button>

                                                <button className={enablePriceAlert ? "ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer ease-in-out transition delay-75 duration-75" : "ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75"} type="button"></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={params.get('tradeAction') === 'buy' ? "card-stock flex justify-between space-x-2 w-96 h-24 text-14 hidden" : "card-stock flex justify-between space-x-2 w-96 h-24 text-14"}>
                                        <div className=''>
                                            <div className="mb-5">Units Owned: </div>
                                            <div className="font-gotham-black-regular">{params.get('units')} </div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        
                                            <div className="w-44" >
                                                <div className="mb-5">Total Value</div>
                                                <div className="font-bold font-gotham-black-regular mb-5">₦ {(stockInfo === ''? '':JSON.parse(stockInfo).price) * parseInt(params.get("units") as string)}</div>

                                                <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-14" : "font-bold text-red-500 text-14"}>{stockInfo === '' ? '' : JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === '' ? '' : JSON.parse(stockInfo).percentageChange.replace('-','')}%  </div>
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* Summary, About, News Tab section */}
                        <div className='flex border-bottom-1 space-x-5 mb-30'>
                            <div onClick={displaySummary} className={showSummary ? 'pr-5 py-3 font-bold border-bottom-2 cursor-pointer' : 'pr-5 py-3 font-bold cursor-pointer'}>Summary</div>
                            <div onClick={displayAbout} className={showAbout ? 'pr-5 py-3 font-bold border-bottom-2 cursor-pointer' : 'pr-5 py-3 font-bold cursor-pointer'}>About</div>
                            <div onClick={displayNews} className={showNews ? 'pr-5 py-3 font-bold border-bottom-2 cursor-pointer' : 'pr-5 py-3 font-bold cursor-pointer'}>News</div>
                        </div>
                        {/* End */}

                        {/* Summary Section */}
                        <div className={showSummary ? 'mb-30 about-section' : 'mb-30 summary-section hidden'}>
                            <div className="flex justify-between">
                                <div className='w-4/6'>
                                    <div className='mb-30'>
                                        <div className='card'>
                                            <div className='mb-30'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='font-bold text-color-1 text-xl'>Current Price</div>
                                                    <div className='w-1/2 flex bg-gray-300 p-1 rounded justify-between'>
                                                        <button onClick={filterGraph} className='py-3 px-5 rounded border-0 cursor-pointer font-bold filter-btn active hover:bg-green-900 hover:text-white' type='button' data-filter="1D">1D</button>

                                                        <button onClick={filterGraph} className='py-3 px-5 rounded border-0  cursor-pointer font-bold filter-btn inactive' type='button' data-filter="1W">1W</button>

                                                        <button onClick={filterGraph} className='py-3 px-5 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="1M">1M</button>

                                                        <button onClick={filterGraph} className='py-3 px-5 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="3M">3M</button>

                                                        <button onClick={filterGraph} className='py-3 px-5 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="6M">6M</button>

                                                        <button onClick={filterGraph} className='py-3 px-5 rounded border-0 cursor-pointer font-bold filter-btn inactive' type='button' data-filter="1Y">1Y</button>
                                                    </div>
                                                </div>

                                                
                                                    <div>
                                                        <div className='font-gotham-black-regular font-bold text-color-1 text-xl mb-10'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>

                                                        <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-14" : "font-bold text-red-500 text-14"}>
                                                            {stockInfo === '' ? '' : JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === '' ? '' : JSON.parse(stockInfo).percentageChange.replace('-','')}%
                                                         </div>
                                                    </div>
                                            </div>

                                            <div>
                                                {/* <Line options={options} data={data} id='canvas'/> */}
                                                <Chart options={options} series={series} type="area" height='489' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between space-x-5'>
                                        <div className='card-unpadded'>
                                            <div className='flex justify-between px-6 py-4 border-bottom-e'>
                                                <div className='font-bold'>Bids</div>
                                                <div className='text-color-1 font-bold'>View all</div>
                                            </div>

                                            <div className={bidsList === '' ? 'text-sm':'hidden'}>
                                                <div className='py-5 text-gray-500 px-6'>Nothing to display</div>
                                            </div>

                                            <div className='px-6 bid-offer text-13'>
                                                {bidsList }
                                            </div>
                                        </div>

                                        <div className='card-unpadded'>
                                            <div className='flex justify-between px-6 py-4 border-bottom-e'>
                                                <div className='font-bold'>Offers</div>
                                                <div className='text-color-1 font-bold'>View all</div>
                                            </div>

                                            <div className={offersList === '' ? 'text-sm':'hidden'}>
                                                <div className='py-5 text-gray-500 px-6'>Nothing to display</div>
                                            </div>

                                            <div className='px-6 offers text-13'>
                                                <div>{offersList}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='card-stock w-stock'>
                                        <div className='font-bold font-gotham-black-regular mb-20 pt-5'>Statistics Overview</div>

                                        <div >
                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Earnings per share</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).earningsPerShare)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Mkt Cap</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).marketCap)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>High</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).high)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Low</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).low)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>52 Week High</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).weekHigh52)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>52 Week Low</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).weekLow52)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Volume</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).volume}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Average Volume</div>
                                                        <div>{HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).avgDailyVolume)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Sector</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).sector}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Risk Factor</div>
                                                        <div>{HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).riskFactor)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Dividend Yield</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).dividendYield)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Previous Close</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).lclose)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Nominal Value</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).norminalValue}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Trades</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).trades}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <div className='flex space-x-10 text-14 pb-6'>
                                                    <div>
                                                        <div className='text-sm font-bold mb-20 font-gotham-black-regular'>Value of Trades</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).valueOfTrades)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* About Section */}
                        <div className={showAbout ? 'mb-30 about-section' : 'mb-30 about-section hidden'}>
                            <div className='mb-10'>
                                <div className='flex'>
                                    <div className='w-full'>
                                        <p className='font-bold mb-20 font-gotham-black-regular'>About</p>
                                        <div className='tracking-widest text-14 leading-8 pr-10 mb-30'>{companyInfo}</div>
                                    </div>

                                    <div className='px-10 h-44 border-left-1 hidden'>
                                        <div className='mb-30'>
                                            <p className='font-gotham-black-regular mb-10'>Group Managing Director</p>
                                            <p className='text-14'></p>
                                        </div>

                                        <div>
                                            <p className='font-gotham-black-regular mb-10'>Founded</p>
                                            <p className='text-14'></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-bottom-1 mb-30"></div>

                            <div className='mt-10'>
                                <div className='card-stock'>
                                    <div className='font-gotham-black-regular mb-30 mt-5'>Statistics Overview</div>
                                    
                                    <div className='flex justify-between mb-20'>
                                        <div>
                                            <div className='font-gotham-black-regular text-14 mb-10'>Shares Outstanding</div>
                                            <div className='text-13'>{HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).sharesOutstanding)}</div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        <div>
                                            <div className='font-gotham-black-regular text-14 mb-10'>Registrar</div>
                                            <div className='text-13'>{stockInfo === ''?'':JSON.parse(stockInfo).registrar}</div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        <div className='w-72'>
                                            <div className='font-gotham-black-regular text-14 mb-10'>Institutional Owership</div>
                                            <div className='text-13'>{stockInfo === ''?'':JSON.parse(stockInfo).institutionalOwnerShip}</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* News Section */}
                        <div className={showNews ? 'mb-30 news-section' : 'mb-30 news-section hidden'}>
                            <div className='mb-30'><p className='font-bold font-gotham-black-regular'>News and Insights</p></div>

                            <div className='flex justify-between mb-12'>
                                {newsList}
                            </div>
                        </div>
                        {/* End */}

                        {/* Page Loader Section */}
                        <div className={showPageLoader ? "page-loader-backdrop opacity-90" : "hidden"}>
                            <div className='ml-custom w-96 my-custom relative'>
                                <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                                <div className='text-center'><img src={AnchoriaSpinner} alt="" /></div>
                            </div>
                        </div>
                        {/* End */}
                    </div>
                </div>
            </div>

            <div className={showSetPriceAlertModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-28 text-color-1 font-gotham-black-regular">Set Price Alerts</div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div>
                        <div className='mb-10'>
                            <img src={AtlasIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                            <span className="font-bold font-gotham-black-regular mx-3 text-xl">{params.get('symbol')}</span> |
                            <span className="font-bold mx-3">{params.get('name')}</span>
                        </div>

                        <div className="mb-20 w-32 bg-yellow-400 py-2 px-3 rounded-2xl text-14">Manufacturing</div>

                        <div className="leading-6 text-14 mb-20">{companyInfo.length > 250 ? companyInfo.substring(0, 250) + "..." : companyInfo}</div>

                        <div className='mb-20'>
                            <div className='mb-10 font-bold'>Current Price</div>
                            <div className='font-gotham-black-regular text-color-1 text-28'>₦ {HelperFunctions.formatCurrencyWithDecimal(parseFloat(params.get('close') as string))}</div>
                        </div>

                        <div className='mb-20'>
                            <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-14" : "font-bold text-red-500 text-14"}>{HelperFunctions.formatCurrencyWithDecimal(parseFloat(params.get('change') as string))} | {HelperFunctions.formatCurrencyWithDecimal(parseFloat(params.get('change') as string))}%  </div>
                        </div>

                        <div className='mb-30 flex space-x-5'>
                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>High</div>
                                <input type="number" className="input border-1-d6 p-2 outline-white" />
                            </div>

                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>Low</div>
                                <input type="number" className="input border-1-d6 p-2 outline-white" />
                            </div>
                        </div>

                        <div className="flex space-x-5 mb-10">
                            <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                            <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">
                                <span className={showSpinner ? "hidden" : ""}>Add</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className={showAddToWatchListModal ? "add-to-watchlist-modal rounded-lg" : "add-to-watchlist-modal rounded-lg hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-28 text-color-1 font-gotham-black-regular">Add To Watchlist</div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div>
                        
                            <div >
                                <div className='mb-10'>
                                    <img src={AtlasIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                                    <span className="font-bold font-gotham-black-regular mx-3 text-xl">{params.get('symbol')}</span> |
                                    <span className="font-bold mx-3">{stockInfo === ''?'':JSON.parse(stockInfo).name}</span>
                                </div>

                                <div className="mb-20 py-1">
                                    <span className='bg-yellow-400 py-2 px-3 rounded-2xl text-14'>{stockInfo === ''?'':JSON.parse(stockInfo).sector}</span>
                                </div>

                                <div className="leading-6 text-14 mb-20">{companyInfo.length > 250 ? companyInfo.substring(0, 250) + "..." : companyInfo}</div>



                                <div className='mb-20' >
                                    <div className='mb-10 font-bold'>Current Price</div>
                                    <div className='font-gotham-black-regular text-color-1 text-28'>₦ {stockInfo === ''?'':JSON.parse(stockInfo).price}</div>
                                </div>


                                <div className='mb-20'>
                                    <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-14" : "font-bold text-red-500 text-14"}>{stockInfo === ''?'':JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === ''?'':JSON.parse(stockInfo).percentageChange.replace('-','')}%  </div>
                                </div>
                            </div>
                        

                        <div className='mb-30 font-bold flex'>
                            <Form.Check onChange={displayHighLow} type='radio' className='portfoliolist-checkbox' />
                            <span className='mt-1 ml-2'>Set Price Alert?</span>
                        </div>

                        <div className={showHighLow ? 'mb-30 flex space-x-5' : 'mb-30 flex space-x-5 hidden'}>
                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>High</div>
                                <input type="number" className="input border-1-d6 p-2" />
                            </div>

                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>Low</div>
                                <input type="number" className="input border-1-d6 p-2" />
                            </div>
                        </div>

                        <div className="flex space-x-5 mb-10">
                            <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                            <button onClick={addStockToWatchlist} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">
                                <span className={showSpinner ? "hidden" : ""}>Add</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showTradeStockModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="buy-stocks-modal rounded-lg">

                        {/* Get Price Estimate Error */}
                        <div className={priceEstimateError === '' ? "hidden" : "error-alert mb-20"}>
                            <div className="flex justify-between space-x-1 pt-3">
                                <div className="flex">
                                    <div>
                                        <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                        </svg>
                                    </div>

                                    <div className="pt-1 text-14">{priceEstimateError}</div>
                                </div>

                                <div className="cursor-pointer" onClick={closeAlert}>
                                    <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-20 flex justify-between">
                            <div>
                                <div className="font-bold text-28 text-color-1 mb-10 font-gotham-black-regular">{params.get("tradeAction") === 'buy' ? 'Buy Stock' : 'Sell Stock'}</div>
                                <div className='font-bold text-color-1'>Provide the details below</div>
                            </div>

                            <div onClick={closeModal} className='cursor-pointer'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='mb-20'>
                            <div className="stock-balance-card">
                                <div className="italic text-green-500 mb-5">Available Balance</div>
                                <div className="font-bold text-28 font-gotham-black-regular text-white">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                    </svg>
                                    <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(walletBalance)}</span>
                                </div>
                            </div>
                        </div>

                        <div className='mb-30'>
                            <div className='mb-10'>
                                <img src={AtlasIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                                <span className="font-bold font-gotham-black-regular mx-3 text-xl">{params.get('symbol')}</span> |
                                <span className="font-bold mx-3">{params.get('name')}</span>
                            </div>
                        </div>

                        
                            <div className='mb-20' >
                                <div className='mb-10 font-bold'>Current Price /Per Share</div>
                                <div className='font-gotham-black-regular text-28 font-bold text-color-1'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>
                            </div>
                        

                        <div className='border-bottom-1d mb-20'></div>

                        <div className='mb-20'>
                            <div className='relative'>
                                <div className='flex justify-between space-x-5 mb-30'>

                                    <div className='w-1/2 relative cursor-pointer' onClick={displayOrderTypeDropdown}>
                                        <div className="mb-10">Order Type</div>

                                        <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                            <div>{orderType}</div>
                                            <div><img src={ChevronDownIcon} alt='' /></div>
                                        </div>
                                    </div>

                                    <div className='w-1/2'>
                                        <div className="mb-10">Unit</div>

                                        <div>
                                            <input onChange={e => setStockUnit(e.target.value)} type='number' className='font-bold input border-1-d6 p-2 outline-white' value={stockUnit} />
                                        </div>
                                    </div>

                                </div>

                                <div className={showOrderTypeDropdown ? 'generic-dropdown-card left-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className='font-gotham-black-regular text-lg text-color-1 mb-10'>Order Type</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='order-type-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'>
                                            <div className='font-gotham-black-regular mb-5'>Market</div>
                                            <div className='text-xs'>Instantly Sell uints of shares</div>
                                            <div onClick={selectOrderType} className='element-cover' data-value="Market"></div>
                                        </li>

                                        <li className='order-type-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Limit</div>
                                            <div className='text-xs'>Place orders based on preferred maximum amount to sell shares</div>
                                            <div onClick={selectOrderType} className='element-cover' data-value="Limit"></div>
                                        </li>

                                        <li className='order-type-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Stop Loss</div>
                                            <div className='text-xs'>Place order based on price tolerance to sell shares</div>
                                            <div onClick={selectOrderType} className='element-cover' data-value="Stop Loss"></div>
                                        </li>

                                        <li className='order-type-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Stop Limit</div>
                                            <div className='text-xs'>Place order based on maximum limit to sell shares</div>
                                            <div onClick={selectOrderType} className='element-cover' data-value="Stop Limit"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Limit - Order Type */}
                            <div className={limitOrderType ? 'relative flex justify-between space-x-5 mb-30' : 'hidden'}>
                                <div className='w-1/2'>
                                    <div className="mb-10">Maximum Limit</div>

                                    <div>
                                        <input onChange={e => setPriceToleranceAndLimit(e.target.value)} type='number' className='font-bold input border-1-d6 p-2 outline-white' placeholder='Maximum price per share' value={priceToleranceAndLimit} />
                                    </div>
                                </div>

                                <div className='w-1/2 relative cursor-pointer' onClick={displayLimitDuration}>
                                    <div className="mb-10">Duration</div>

                                    <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                        <div>{duration}</div>
                                        <div><img src={ChevronDownIcon} alt='' /></div>
                                    </div>
                                </div>

                                {/*Duration Dropdown */}
                                <div className={showLimitDurationDropdown ? 'generic-dropdown-card right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className='font-gotham-black-regular text-lg text-color-1 mb-10'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'>
                                            <div className='font-gotham-black-regular mb-5'>End of day</div>
                                            <div className='text-xs'>Order should be executed before end of  day, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Fill or Kill</div>
                                            <div className='text-xs'>Order should be filled immediately, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Immediate or Cancel</div>
                                            <div className='text-xs'>If number of units can not be filled immediately then cancel order</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Good till Cancelled</div>
                                            <div className='text-xs'>Order should remain open in the market till set date</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Cancelled"></div>
                                        </li>
                                    </ul>
                                </div>
                                {/*End */}

                            </div>
                            {/* End */}

                            {/* Stop Loss - Order Type */}
                            <div className='relative'>
                                <div className={stopLossOrderType ? 'flex justify-between space-x-5 mb-30' : 'hidden'}>
                                    <div className='w-1/2'>
                                        <div className="mb-10">Price Tolerance</div>

                                        <div>
                                            <input type='number' onChange={e => setPriceToleranceAndLimit(e.target.value)} className='font-bold input border-1-d6 p-2 outline-white' value={priceToleranceAndLimit} />
                                        </div>
                                    </div>

                                    <div className='w-1/2 relative cursor-pointer' onClick={displayStopLossDuration}>
                                        <div className="mb-10">Duration</div>

                                        <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                            <div>{duration}</div>
                                            <div><img src={ChevronDownIcon} alt='' /></div>
                                        </div>
                                    </div>

                                </div>

                                <div className={showStopLossDurationDropdown ? 'generic-dropdown-card right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className='font-gotham-black-regular text-lg text-color-1 mb-10'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'>
                                            <div className='font-gotham-black-regular mb-5'>End of day</div>
                                            <div className='text-xs'>Order should be executed before end of  day, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Fill or Kill</div>
                                            <div className='text-xs'>Order should be filled immediately, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Immediate or Cancel</div>
                                            <div className='text-xs'>If number of units can not be filled immediately then cancel order</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Good till Cancelled</div>
                                            <div className='text-xs'>Order should remain open in the market till set date</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Cancelled"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End */}

                            {/* Stop Limit - Order Type */}
                            <div className='relative'>
                                <div className={stopLimitOrderType ? '' : 'hidden'}>
                                    <div className='flex justify-between space-x-5 mb-20'>
                                        <div className='w-1/2'>
                                            <div className="mb-10">Price Tolerance and Limit</div>

                                            <div>
                                                <input onChange={e => setPriceToleranceAndLimit(e.target.value)} value={priceToleranceAndLimit} type='number' className='font-bold input border-1-d6 p-2 outline-white' />
                                            </div>
                                        </div>

                                        <div className='w-1/2 relative cursor-pointer' onClick={displayStopLimitDuration}>
                                            <div className="mb-10">Duration</div>

                                            <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                                <div>{duration}</div>
                                                <div><img src={ChevronDownIcon} alt='' /></div>
                                            </div>
                                        </div>

                                        <div className={showStopLimitDurationDropdown ? 'generic-dropdown-card right-0 rounded-lg w-1/2' : 'hidden'}>
                                            <div className='font-gotham-black-regular text-lg text-color-1 mb-10'>Duration</div>

                                            <ul className='list-none m-0 p-0'>
                                                <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'>
                                                    <div className='font-gotham-black-regular mb-5'>End of day</div>
                                                    <div className='text-xs'>Order should be executed before end of  day, else, cancelled</div>
                                                    <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1'>
                                                    <div className='font-gotham-black-regular mb-5'>Fill or Kill</div>
                                                    <div className='text-xs'>Order should be filled immediately, else, cancelled</div>
                                                    <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                                    <div className='font-gotham-black-regular mb-5'>Immediate or Cancel</div>
                                                    <div className='text-xs'>If number of units can not be filled immediately then cancel order</div>
                                                    <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                                    <div className='font-gotham-black-regular mb-5'>Good till Cancelled</div>
                                                    <div className='text-xs'>Order should remain open in the market till set date</div>
                                                    <div onClick={selectDuration} className='element-cover' data-value="Good till Cancelled"></div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-10">Enter Date</div>
                                            <div className='flex justify-between items-center border-1-d6 rounded-lg'>
                                                <div className='w-full'>
                                                    <input type="text" className="font-bold outline-white border-0 p-3 input text-14" placeholder="Enter end date for your order" defaultValue={showDate} />
                                                </div>
                                                <div className='p-3 cursor-pointer' onClick={e => displayCalendar()}>
                                                    <img src={CalendarIcon} alt="" width="20" />
                                                </div>
                                            </div>

                                            <Calendar onChange={changeDate} value={dateState} className={showCalendar ? "absolute z-10" : "hidden"} />
                                        </div>
                                    </div>
                                </div>

                                <div className={showStopLossDurationDropdown ? 'generic-dropdown-card right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className='font-gotham-black-regular text-lg text-color-1 mb-10'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'>
                                            <div className='font-gotham-black-regular mb-5'>End of day</div>
                                            <div className='text-xs'>Order should be executed before end of  day, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Fill or Kill</div>
                                            <div className='text-xs'>Order should be filled immediately, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Immediate or Cancel</div>
                                            <div className='text-xs'>If number of units can not be filled immediately then cancel order</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className='font-gotham-black-regular mb-5'>Good till Cancelled</div>
                                            <div className='text-xs'>Order should remain open in the market till set date</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Cancelled"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End */}

                        </div>

                        <div className='border-bottom-1d mb-20'></div>

                        <div className='mb-20'>
                            <div className='mb-10'>Estimated cost</div>
                            <div className='font-gotham-black-regular font-bold text-color-1 text-28'>{HelperFunctions.formatCurrencyWithDecimal(estimatedCost)}</div>
                        </div>

                        <div>
                            <button onClick={calculateStockOrderEstimate} className={estimatedCost === 0 ? 'w-full bgcolor-1 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer' : 'hidden'}>
                                <span className={showSpinner ? "hidden" : ""}>Get Estimated Cost</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>

                            <button onClick={displayStockOrderSummaryModal} className={estimatedCost !== 0 ? 'w-full bgcolor-1 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer' : 'hidden'}>
                                <span className={showSpinner ? "hidden" : ""}>Continue</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>


            <div className={showOrderSummaryModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="buy-stocks-modal rounded-lg">
                        {/* Buy Stock Error */}
                        <div className={buyStockError === '' ? "hidden" : "error-alert mb-20"}>
                            <div className="flex justify-between space-x-1 pt-3">
                                <div className="flex">
                                    <div>
                                        <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                        </svg>
                                    </div>

                                    <div className="pt-1 text-14">{buyStockError}</div>
                                </div>

                                <div className="cursor-pointer">
                                    <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-20 flex justify-between">
                            <div>
                                <div className="font-bold text-28 text-color-1 mb-10 font-gotham-black-regular">Order Summary</div>
                                <div className='font-bold text-color-1'>Preview your investment</div>
                            </div>

                            <div onClick={closeModal} className='cursor-pointer'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='mb-30'>
                            <div className='mb-10'>
                                <img src={AtlasIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                                <span className="font-bold font-gotham-black-regular mx-3 text-xl">{params.get('symbol')}</span> |
                                <span className="font-bold mx-3">{params.get('name')}</span>
                            </div>
                        </div>

                        
                            <div className='mb-20' >
                                <div className='mb-10 font-bold'>Current Price /Per Share</div>
                                <div className='font-gotham-black-regular text-28 font-bold text-color-1'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>
                            </div>
                        

                        <div className={params.get("tradeAction") === 'buy' ? '' : 'hidden'} >
                            <div className='mb-10'>Add this stocks to a portfolio <span className='text-yellow-700'>(Optional)</span></div>

                            <div>
                                <select className='text-lg outline-white mb-30 w-full font-bold p-5 rounded-lg border border-gray-500' onChange={getPortfolioIdToAddStock}>
                                    {portfolioList}
                                </select>
                            </div>
                        </div>

                        <div className='border-bottom-1d'></div>

                        <div className='py-3'>
                            <div className='flex justify-between text-lg'>
                                <div>Order Type</div>
                                <div className='font-bold'>{orderType}</div>
                            </div>
                        </div>

                        <div className='border-bottom-1d '></div>

                        <div className='py-3'>
                            <div className='flex justify-between text-lg'>
                                <div>Number of Shares</div>
                                <div className='font-bold'>{stockUnit}</div>
                            </div>
                        </div>

                        <div className='border-bottom-1d '></div>

                        <div className={orderType !== 'Market' ? 'py-3' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Maximum Limit</div>
                                <div className='font-bold'>₦ {priceToleranceAndLimit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border-bottom-1d' : 'hidden'}></div>

                        <div className={orderType !== 'Market' ? 'py-3' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Price Tolerance</div>
                                <div className='font-bold'>₦ {priceToleranceAndLimit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border-bottom-1d' : 'hidden'}></div>

                        <div className={orderType !== 'Market' ? 'py-3' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Date</div>
                                <div className='font-bold'>₦ {priceToleranceAndLimit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border-bottom-1d' : 'hidden'}></div>

                        <div className={orderType !== 'Market' ? 'py-3' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Duration</div>
                                <div className='font-bold'>{duration}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border-bottom-1d' : 'hidden'}></div>

                        
                            <div className='py-3' >
                                <div className='flex justify-between text-lg'>
                                    <div>Cost</div>
                                    <div className='font-bold'>₦ {(stockInfo === '' ? '' : JSON.parse(stockInfo).price) * parseInt(stockUnit)}</div>
                                </div>
                            </div>
                        

                        <div className='border-bottom-1d'></div>

                        
                            <div className='py-3' >
                                <div className='flex justify-between text-lg'>
                                    <div>Fees</div>
                                    <div className='font-bold'>₦ {HelperFunctions.formatCurrencyWithDecimal(estimatedCost - (parseFloat(stockInfo === ''?'':JSON.parse(stockInfo).price) * parseInt(stockUnit)))}</div>
                                </div>
                            </div>
                        

                        <div className='border-bottom-1d'></div>

                        <div className='py-3'>
                            <div className='font-bold flex justify-between text-lg'>
                                <div>Total Cost</div>
                                <div>₦ {HelperFunctions.formatCurrencyWithDecimal(estimatedCost)}</div>
                            </div>
                        </div>

                        <div className='border-bottom-1d mb-20'></div>


                        <div className='flex space-x-5 mb-10'>
                            <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                            <button onClick={tradeStock} className='w-full bgcolor-1 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer'>
                                <span className={showSpinner ? "hidden" : ""}>Confirm Order</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className={showSuccessModal ? "stock-success-modal w-32rem" : "hidden"}>
                <div className="ml-8 mr-auto w-full h-64 relative">
                    <img src={SuccessIcon} alt="success icon" className="w-96" />
                    <div className="bg-white p-3 w-96 -bottom-10 absolute"></div>
                </div>

                <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-10">Successful</div>

                <div className="text-color-4 text-16 text-center mb-14 leading-5">{apiResponseSuccessMsg}</div>

                <div className="mb-10">

                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Close</button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40" : "hidden"}>
            </div>

            <div className={showValidatePINModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="validate-pin-modal">
                        <div className="p-5 flex justify-between pb-5" style={{ borderBottom: '1px solid #dee2e6' }}>
                            <div className="font-bold text-xl text-color-1">Validate PIN</div>

                            <div onClick={closeModal} className='hidden'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>


                        <div className='p-5'>
                            {/* Pin Success */}
                            <div className={isPinValid === 'true' ? "otp-alert mb-20" : "hidden"}>
                                <div className="flex otp-validated justify-between space-x-1 pt-3">
                                    <div className="flex">
                                        <div>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                            </svg>
                                        </div>

                                        <div className="pt-1 text-14 text-color-1">{apiResponseSuccessMsg}</div>
                                    </div>

                                    <div className="cursor-pointer" onClick={closeModal}>
                                        <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            {/* Pin Error */}
                            <div className={isPinValid !== 'false' ? "hidden" : "error-alert mb-20"}>
                                <div className="flex justify-between space-x-1 pt-3">
                                    <div className="flex">
                                        <div>
                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                            </svg>
                                        </div>

                                        <div className="pt-1 text-14">{apiResponseSuccessMsg}</div>
                                    </div>

                                    <div className="cursor-pointer">
                                        <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            <div className='font-bold mb-10'>Enter PIN</div>

                            <div className='mb-30'><input maxLength={4} type="password" className="w-full rounded-lg p-5 border border-gray-100 outline-white" onChange={e => setPin(e.target.value)} /> </div>

                            <div><button type='button' className='px-16 py-3 bgcolor-1 text-white rounded-lg font-bold border-0 w-full cursor-pointer' onClick={validatePin}>
                                <span className={showSpinner ? "hidden" : ""}>Validate</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                            </button></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Stock;