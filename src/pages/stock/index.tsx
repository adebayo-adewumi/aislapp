import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../stock/index.scss';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import StarIcon from '../../assets/images/star.svg';
import CloseIcon from '../../assets/images/close.svg';
import SuccessCheckIcon from '../../assets/images/success-check.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
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
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';

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

    const [showHighLow, ] = useState<boolean>(false);
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
    const [priceAlertError, setPriceAlertError] = useState('');
    const [priceEstimateError, setPriceEstimateError] = useState('');
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);
    const [, setApiResponseHasError] = useState<boolean>(false);
    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');
    const [portfolioList, setPortfolioList] = useState('');
    const [portfolioIdToAddStock, setPortfolioIdToAddStock] = useState('');

    const [showValidatePINModal, setShowValidatePINModal] = useState<boolean>(false);
    const [pinValidationType, ] = useState('');

    const [isPinValid, setIsPinValid] = useState('');
    const [, setPinValidatedForBuyStock] = useState<boolean>(false);

    const [pin, setPin] = useState('');

    const [stockInfo, setStockInfo] = useState('');

    const [stockSymbol, setStockSymbol] = useState('');

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

    const [showSellStockModal, setShowSellStockModal] = useState<boolean>(false);

    const [portfolioWithCurrentStock, setPortfolioWithCurrentStock] = useState<any[]>([]);
    const [totalUnitToSell, setTotalUnitToSell] = useState(0);

    const [unitToSell, setUnitToSell] = useState('0');
    const [unitToSellError, setUnitToSellError] = useState('');
    const [isValidateUnitToSell, setIsValidateUnitToSell] = useState<boolean>(false);

    const [portfolioIdArray, setPortfolioIdArray] = useState<string[]>([]);
    const [portfolioStockUnitArray, setPortfolioStockUnitArray] = useState<string[]>([]);

    const [priceAlert, setPriceAlert] = useState('0.00');
    const [priceCondition, setPriceCondition] = useState('');

    const [transactionPin, setTransactionPin] = useState('');


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
                            <div key={index} className='flex bid-offer justify-between py-4' style={{borderBottom: '1px solid #eee'}}>
                                <div>{HelperFunctions.formatCurrencyWithDecimal(item.volume)}</div>
                                <div className='text-green-500'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                            </div>
                        );

                        setBidsList(bidsItem);
                    }
                    
                })
                .catch(function (error) {
                    
                });
        }

        function getTopFiveOffers() {
            getAxios(axios).get(utilityServiceBaseUrlUrl.concat('/utils/top-five-offers/' + _params.get("symbol")))
                .then(function (response) {

                    if(response.data.data.length > 0){
                        const offersItem = response.data.data.map((item: any, index:any) =>
                            <div key={index} className='flex offers justify-between py-4' style={{borderBottom: '1px solid #eee'}}>
                                <div>{HelperFunctions.formatCurrencyWithDecimal(item.volume)}</div>
                                <div className='text-green-500'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.price)}</div>
                            </div>
                        );

                        setOffersList(offersItem);
                    }
                })
                .catch(function (error) {
                    
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
                            <div>
                                <div className='mb-3'><img src={item.imageUrl} alt='' /></div>

                                <div>
                                    <div className='font-bold mb-3 text-sm w-6/6'>{item.title}</div>
                                    <div className='mb-3 text-sm tracking-wider leading-5'>{item.snippet}</div>
                                    <div className='font-bold text-sm'>&middot; {moment(item.date).format("MMM Do YYYY, hh:ss a")}</div>
                                </div>
                            </div>
                        </div>
                    ) as unknown as string;

                    setNewsList(newsItem);
                })
                .catch(function (error) {
                    
                });
        }

        function getWalletBalance() {

            let customer = HelperFunctions.getCustomerInfo();

            getAxios(axios).get(portfolioServiceBaseUrlUrl + '/account/balance?customerId=' + customer.id)
                .then(function (response) {
                    setWalletBalance(response.data.data.balance);
                })
                .catch(function (error) {
                    
                });
        }

        getWalletBalance();
        
        getNews();
    },[]);

    useEffect(()=>{
        function getPortfolioList() {
            const _params = new URLSearchParams(window.location.search);

            getAxios(axios).get(portfolioServiceBaseUrlUrl.concat('/portfolio'))
                .then(function (response) {

                    let portfolioItems :any = [];
                    let portfolioIdItems :string[] = [];
                    let portfolioUnitItems :string[] = [];

                    const listItems = response.data.data.portfolio.map((item: any) => 
                        
                        <option value={item.uuid} className={item.name === "Cash Balance" ? 'hidden':'ddsf'}>{item.name}</option>
                        
                    );

                    let hasListOfStocks = response.data.data.portfolio.filter((item :any) => item.hasOwnProperty("listOfStocks"));

                    if(hasListOfStocks.length > 0){
                        hasListOfStocks.map((item :any, index: any)=>{                            
                            let stockNameExist = item.listOfStocks.filter((el :any) => el.symbol === _params.get("symbol"));

                            if(stockNameExist.length > 0){
                                portfolioItems.push({
                                    name: item.name,
                                    uuid: item.uuid,
                                    units: stockNameExist.map((item :any) => item.units).reduce((prev :any, next :any) => prev + next, 0)
                                });

                                portfolioIdItems.push(item.uuid);
                                portfolioUnitItems.push(stockNameExist.map((item :any) => item.units).reduce((prev :any, next :any) => prev + next, 0));
                            }

                            return false;
                        });
                    }

                    setPortfolioList(listItems);
                    setPortfolioWithCurrentStock(portfolioItems);
                    setPortfolioIdArray(portfolioIdItems);
                    setPortfolioStockUnitArray(portfolioUnitItems);

                })
                .catch(function (error) {

                    setApiResponseHasError(true);

                    setTimeout(() => {
                        setApiResponseHasError(false);
                    }, 3000);
                });
        }

        getPortfolioList();
    },[])

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


    function calculateBuyStockOrderEstimate() {
        let customer = HelperFunctions.getCustomerInfo();

        let durationArr = ["End of day", "Fill or Kill", "Immediate or Cancel", "Good till Date"];
        let tradeActionArr = ["0", "4", "3", "1"];
        let durationIndex = durationArr.indexOf(duration);

        let orderTypeArr = ["Market", "Limit", "Stop Loss", "Stop Limit"];
        let orderTypeValue = ["49", "50", "51", "52"];
        let orderTypeIndex = orderTypeArr.indexOf(orderType);

        let requestData = {
            "clientUniqueRef": customer.clientUniqueRef,
            "currency": "NGN",
            "custAid": customer.customerAid,
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
            "tradeAction": '0' 
        }


        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);


        getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/stock/buy-order/estimate',
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

    function calculateSellStockOrderEstimate() {
        let customer = HelperFunctions.getCustomerInfo();

        let durationArr = ["End of day", "Fill or Kill", "Immediate or Cancel", "Good till Date"];
        let tradeActionArr = ["0", "4", "3", "1"];
        let durationIndex = durationArr.indexOf(duration);

        let orderTypeArr = ["Market", "Limit", "Stop Loss", "Stop Limit"];
        let orderTypeValue = ["49", "50", "51", "52"];
        let orderTypeIndex = orderTypeArr.indexOf(orderType);

        let requestData = {
            "clientUniqueRef": customer.clientUniqueRef,
            "currency": "NGN",
            "custAid": customer.customerAid,
            "customerId": customer.id,
            "orderType": orderTypeValue[orderTypeIndex],
            "stockCode": params.get("symbol"),
            "stockName": params.get("name"),
            "units": totalUnitToSell.toString(),
            "dateLimit": moment(Date.now()).format('YYYY-MM-DD'),
            "effectiveDate": moment(Date.now()).format('YYYY-MM-DD'),
            "priceLimit": priceToleranceAndLimit,
            "smsPin": "1234",
            "timeInForce": tradeActionArr[durationIndex],
            "tradeAction": '0'
        }

        ;

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

        let durationArr = ["End of day", "Fill or Kill", "Immediate or Cancel", "Good till Date"];
        let tradeActionArr = ["0", "4", "3", "1"];
        let durationIndex = durationArr.indexOf(duration);

        let orderTypeArr = ["Market", "Limit", "Stop Loss", "Stop Limit"];
        let orderTypeValue = ["49", "50", "51", "52"];
        let orderTypeIndex = orderTypeArr.indexOf(orderType);

        let requestData = {
            "clientUniqueRef": customer.clientUniqueRef,
            "currency": "NGN",
            "custAid": customer.customerAid,
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
            "tradeAction": '0'
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), transactionPin);
        

        let headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/stock/' + params.get("tradeAction"),
            {
                "text": genericCypher
        },{headers})
        .then(function (response) {
            setShowSpinner(false);

            if (response.data.statusCode !== 200) {
                setBuyStockError(response.data.message);

                setTimeout(() => {
                    setBuyStockError('');
                }, 5000);
            }
            else {
                setApiResponseSuccessMsg("Order placed successfully.")
                setShowSuccessModal(true);
                setShowAddToWatchListModal(false);
                setShowTradeStockModal(false);
                setShowOrderSummaryModal(false);
            }
        })
        .catch(function (error) {
            setShowSpinner(false);
            setBuyStockError(error.response.data.message);
        });

        
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

    function displayAddToWatchListModal(event :any) {
        setShowModalBG(true);
        setShowAddToWatchListModal(true);
        setShowSuccessModal(false);
        setShowTradeStockModal(false);
        setShowSetPriceAlertModal(false);

        setStockSymbol(event.target.getAttribute("data-symbol"))

        HelperFunctions.addOverflowAndPaddingToModalBody()
    }

    function displayBuyStockModal() {
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowTradeStockModal(true);
        setShowSuccessModal(false);
        setShowSetPriceAlertModal(false);
        setShowSellStockModal(false);

        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function displaySellStockModal() {
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowTradeStockModal(false);
        setShowSuccessModal(false);
        setShowSetPriceAlertModal(false);
        setShowSellStockModal(true);

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
        setShowSellStockModal(false);

        setStockUnit('');
        setActualCost(0);
        setEstimatedCost(0);

        setEnablePriceAlert(false);


        HelperFunctions.removeOverflowAndPaddingFromModalBody();
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
        setShowLimitDurationDropdown(false);
        setShowStopLimitDurationDropdown(false);
        setShowStopLossDurationDropdown(false);
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

        setShowOrderTypeDropdown(false);
        setShowStopLimitDurationDropdown(false);
        setShowStopLossDurationDropdown(false);
    }

    function displayStopLossDuration() {
        setShowStopLossDurationDropdown(true);

        setShowOrderTypeDropdown(false);
        setShowLimitDurationDropdown(false);
        setShowStopLimitDurationDropdown(false);
    }

    function displayStopLimitDuration() {
        setShowStopLimitDurationDropdown(true);

        setShowOrderTypeDropdown(false);
        setShowLimitDurationDropdown(false);
        setShowStopLossDurationDropdown(false);
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


    function addStockToWatchlist() {
        let watchlist = JSON.parse(localStorage.getItem("aislUserWatchlist") as string);

        const requestData = {
            "stockSymbols": [stockSymbol],
            "watchlistId": watchlist.data.watchlistId
        }

        ;

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

    function delineatePriceAlert(event :any) {
        let newValue = event.target.value.replace(/[^\d.]/gi, '');

        setPriceAlert(newValue);
    }

    function delineateStockUnit(event :any) {
        let newValue = event.target.value.replace(/[^\d]/gi, '');

        setStockUnit(newValue);
    }

    function delineatePriceToleranceAndLimit(event :any) {
        let newValue = event.target.value.replace(/[^\d]/gi, '');

        setPriceToleranceAndLimit(newValue);
    }

    function getPortfolioIdToSellStock(event: any) {
        let splitValue = event.target.value.split("&");

        setPortfolioIdToAddStock(splitValue[0]);

        let idIndex = portfolioIdArray.indexOf(splitValue[0]);

        setUnitToSell(portfolioStockUnitArray[idIndex]);
    }

    function calculateTotalUnitToSell(){
        setTotalUnitToSell(parseInt(localStorage.getItem("aislDesiredUnitToSell") as string) + totalUnitToSell);

        setStockUnit((parseInt(localStorage.getItem("aislDesiredUnitToSell") as string) + totalUnitToSell).toString());

        let dUnitToSell = document.getElementById("desiredUnitToSell") as HTMLInputElement;

        let idIndex = portfolioIdArray.indexOf(portfolioIdToAddStock);
        portfolioStockUnitArray.splice(idIndex, 1, unitToSell);

        dUnitToSell.value = '0';

        localStorage.setItem("aislDesiredUnitToSell", '0');

    }

    function calculateDesiredUnitToSell(event :any){
    
        if(event.target.value !== '' && parseInt(unitToSell) > 0 && (parseInt(event.target.value) <= parseInt(unitToSell)) ){
            let unitBalance :any  = parseInt(unitToSell) - parseInt(event.target.value);

            localStorage.setItem("aislDesiredUnitToSell", event.target.value);

            setUnitToSell(String(unitBalance));

            setUnitToSellError("");

            setIsValidateUnitToSell(false);

        }
        else if(event.target.value === ''){
            let idIndex = portfolioIdArray.indexOf(portfolioIdToAddStock);

            setUnitToSell(portfolioStockUnitArray[idIndex]);

            setUnitToSellError("");
            setIsValidateUnitToSell(false);
        }
        else if(parseInt(event.target.value) > parseInt(unitToSell)){
            
            setUnitToSellError("Number of units to sell cannot be greater than available units");
            setIsValidateUnitToSell(false);
            
        }
    }

    function createPriceAlert(){
        const _params = new URLSearchParams(window.location.search);

        let requestData = {
            "symbol": _params.get("symbol"),
            "note":"Testing",
            "condition": priceCondition,
            "value": priceAlert
        }

        ;

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), transactionPin);
            

        let headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/stock/price-triggers',
        {
            "text": genericCypher
        },{ headers })
        .then(function (response) {
            setShowSpinner(false);
            setApiResponseSuccessMsg("Price alert created successfully.")
            setShowSuccessModal(true);
            setShowSetPriceAlertModal(false);
        })
        .catch(function (error) {
            setShowSpinner(false);
            setPriceAlertError(error.response.data.message);
        });
    }   


    return (
        <div className="relative">
            <UserAreaHeader />
            <div className='hidden'>{endOfDayDuration}</div>
            <div className='hidden'>{fillOrKillDuration}</div>
            <div className='hidden'>{immediateOrCancelDuration}</div>
            <div className='hidden'>{goodTillCancelledDuration}</div>

            
            <div className="h-screen flex">
                <Sidebar />

                <div className="flex-1 min-w-0 flex flex-col">
                    <div className='px-10 py-24 flex-1 bg-gray-100 overflow-y-auto'>

                        <div className="mb-3 pb-5">
                            <div className="flex justify-between items-center">
                                <div className="text-2xl font-bold text-green-900 ">Stock Details</div>

                                <div className="">
                                    <Link to="/trade" className='hover:text-green-900 no-underline text-green-900 textlg'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" width={20}/> Back
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3" style={{borderBottom: '1px solid #eee'}}></div>

                        {/* Company Name section */}
                        <div className='mb-3'>
                            <div className="md:flex md:justify-between mb-3">
                                
                                <div className='md:flex md:items-center mb-3'>
                                    <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" className='align-middle'/>

                                    <span className="font-bold mx-3 text-xl lg:text-sm">{params.get('symbol')}</span>

                                    <span>|</span>

                                    <span className="font-bold mx-3 lg:text-xs">{params.get('name')}</span>

                                    <span>|</span>

                                    <span className="bg-yellow-500 py-2 px-3 rounded-2xl mx-3 text-sm lg:text-xs">{stockInfo === '' ? '' : JSON.parse(stockInfo).sector}</span>
                                </div>                                

                                <div>
                                    <button onClick={displayAddToWatchListModal} className={params.get('tradeAction') === 'buy'? "cursor-pointer focus:shadow-outline rounded-lg bg-gray-300 py-3 px-5 border-0 font-bold lg:text-sm":"hidden"} type='button' data-symbol={params.get('symbol')}>
                                        <img src={StarIcon} alt="" className="align-bottom mr-2" width="20" data-symbol={params.get('symbol')}/>
                                        Add to watchlist
                                    </button>

                                    <button onClick={displayBuyStockModal} className="cursor-pointer focus:shadow-outline text-white rounded-lg bg-green-800 pb-3 pt-4 px-7 lg:pt-3 lg:px-5 border-0 font-bold ml-3 lg:text-sm" type='button'>
                                        Buy
                                    </button>

                                    <button onClick={displaySellStockModal} className={params.get("tradeAction") !== 'buy' ? "cursor-pointer focus:shadow-outline text-white rounded-lg bg-red-500 pb-3 pt-4 px-7 lg:pt-3 lg:px-5 border-0 font-bold ml-3 lg:text-sm":"hidden"} type='button'>
                                        Sell
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <div className="w-3/6">
                                        <div className='mb-6 leading-5 text-sm'>{companyInfo.length > 250 ? companyInfo.substring(0, 250) + "..." : companyInfo}</div>

                                        <div className="font-bold flex ">
                                            <div className='mr-3'>Enable price alerts</div>

                                            <div onClick={toggleEnablePriceAlert} className={enablePriceAlert ? 'flex rounded-3xl p-1 bg-green-900 ease-in-out transition delay-75 duration-75' : 'flex knob-container rounded-3xl p-1 hover:bg-gray-200 ease-in-out transition delay-75 duration-75'}>
                                                <button className={enablePriceAlert ? "rounded-3xl knob border-0 cursor-pointer opacity-0" : "rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75"} type="button"></button>

                                                <button className={enablePriceAlert ? "ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer ease-in-out transition delay-75 duration-75" : "ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75"} type="button"></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={params.get('tradeAction') === 'buy' ? "card-stock flex justify-between space-x-2 w-96 h-24 text-sm hidden" : "card-stock flex justify-between space-x-2 w-96 h-24 text-sm"}>
                                        <div className=''>
                                            <div className="mb-5">Units Owned: </div>
                                            <div className="">{params.get('units')} </div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        
                                            <div className="w-44" >
                                                <div className="mb-5">Total Value</div>
                                                <div className="font-bold  mb-5">₦ {(stockInfo === ''? '':JSON.parse(stockInfo).price) * parseInt(params.get("units") as string)}</div>

                                                <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-sm" : "font-bold text-red-500 text-sm"}>{stockInfo === '' ? '' : JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === '' ? '' : HelperFunctions.formatCurrencyWithDecimal(JSON.parse(stockInfo).percentageChange.replace('-',''))}%  </div>
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* Summary, About, News Tab section */}
                        <div className='flex space-x-5 mb-3' style={{borderBottom: '1px solid #eee'}}>
                            <div onClick={displaySummary} className={showSummary ? 'pr-5 py-3 font-bold border-b-black cursor-pointer' : 'pr-5 py-3 font-bold cursor-pointer'}>Summary</div>

                            <div onClick={displayAbout} className={showAbout ? 'pr-5 py-3 font-bold border-b-black cursor-pointer' : 'pr-5 py-3 font-bold cursor-pointer'}>About</div>

                            <div onClick={displayNews} className={showNews ? 'pr-5 py-3 font-bold border-b-black cursor-pointer' : 'pr-5 py-3 font-bold cursor-pointer'}>News</div>
                        </div>
                        {/* End */}

                        {/* Summary Section */}
                        <div className={showSummary ? 'mb-3 about-section' : 'mb-3 summary-section hidden'}>
                            <div className="flex justify-between lg:space-x-5">
                                <div className='w-4/6'>
                                    <div className='mb-3'>
                                        <div className='bg-white rounded-lg shadow p-5'>
                                            <div className='mb-3'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='w-1/3'>
                                                        <div className='text-lg font-bold'>Current Price</div>
                                                        <div>
                                                            <div className=' font-bold text-green-900 text-xl'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>

                                                            <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-sm" : "font-bold text-red-500 text-sm"}>
                                                                {stockInfo === '' ? '' : JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === '' ? '' : HelperFunctions.formatCurrencyWithDecimal(JSON.parse(stockInfo).percentageChange.replace('-',''))}%
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className='w-2/3 flex bg-gray-300 p-1 rounded justify-between'>
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
                                                <Chart options={options} series={series} type="area" height='489' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between space-x-5'>
                                        <div className='card-unpadded'>
                                            <div className='flex justify-between px-6 py-4' style={{borderBottom: '1px solid #eee'}}>
                                                <div className='font-bold'>Bids</div>
                                                <div className='text-green-900 font-bold hidden'>View all</div>
                                            </div>

                                            <div className={bidsList === '' ? 'text-sm':'hidden'}>
                                                <div className='py-5 text-gray-500 px-6'>Nothing to display</div>
                                            </div>

                                            <div className='px-6 bid-offer text-sm'>
                                                {bidsList }
                                            </div>
                                        </div>

                                        <div className='card-unpadded'>
                                            <div className='flex justify-between px-6 py-4' style={{borderBottom: '1px solid #eee'}}>
                                                <div className='font-bold'>Offers</div>
                                                <div className='text-green-900 font-bold hidden'>View all</div>
                                            </div>

                                            <div className={offersList === '' ? 'text-sm':'hidden'}>
                                                <div className='py-5 text-gray-500 px-6'>Nothing to display</div>
                                            </div>

                                            <div className='px-6 offers text-sm'>
                                                <div>{offersList}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white rounded-lg shadow p-5'>
                                        <div className='text-2xl text-green-900 mb-3'>Statistics Overview</div>

                                        <div >
                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Earnings per share</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).earningsPerShare)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Mkt Cap</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).marketCap)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>High</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).high)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Low</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).low)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>52 Week High</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).weekHigh52)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>52 Week Low</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).weekLow52)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Volume</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).volume}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Average Volume</div>
                                                        <div>{HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).avgDailyVolume)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Sector</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).sector}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Risk Factor</div>
                                                        <div>{HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).riskFactor)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Dividend Yield</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).dividendYield)}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Previous Close</div>
                                                        <div>₦ {HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).lclose)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Nominal Value</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).norminalValue}</div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm font-bold mb-3 '>Trades</div>
                                                        <div>{stockInfo === ''?'':JSON.parse(stockInfo).trades}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-2'>
                                                <div className='flex space-x-10 text-sm pb-6'>
                                                    <div>
                                                        <div className='text-sm font-bold mb-3 '>Value of Trades</div>
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
                        <div className={showAbout ? 'mb-3 about-section' : 'mb-3 about-section hidden'}>
                            <div className='mb-3'>
                                <div className='flex'>
                                    <div className='w-full'>
                                        <p className='font-bold mb-3 '>About</p>
                                        <div className='tracking-widest text-sm leading-8 pr-10 mb-3'>{companyInfo}</div>
                                    </div>

                                    <div className='px-10 h-44 border-left-1 hidden'>
                                        <div className='mb-3'>
                                            <p className=' mb-3'>Group Managing Director</p>
                                            <p className='text-sm'></p>
                                        </div>

                                        <div>
                                            <p className=' mb-3'>Founded</p>
                                            <p className='text-sm'></p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className='bg-white rounded-lg shadow p-5'>
                                    <div className='text-2xl text-green-900 mb-3'>Statistics Overview</div>
                                    
                                    <div className='flex justify-between mb-3'>
                                        <div>
                                            <div className='text-sm mb-3 font-bold'>Shares Outstanding</div>
                                            <div className='text-sm'>{HelperFunctions.formatCurrencyWithDecimal(stockInfo === ''?'':JSON.parse(stockInfo).sharesOutstanding)}</div>
                                        </div>

                                        <div className='' style={{borderLeft: '1px solid #eee'}}></div>

                                        <div>
                                            <div className='text-sm mb-3 font-bold'>Registrar</div>
                                            <div className='text-sm'>{stockInfo === ''?'':JSON.parse(stockInfo).registrar}</div>
                                        </div>

                                        <div style={{borderLeft: '1px solid #eee'}}></div>

                                        <div className='w-72'>
                                            <div className='text-sm mb-3 font-bold'>Institutional Owership</div>
                                            <div className='text-sm'>{stockInfo === ''?'':JSON.parse(stockInfo).institutionalOwnerShip}</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* News Section */}
                        <div className={showNews ? 'mb-3 news-section' : 'mb-3 news-section hidden'}>
                            <div className='mb-3'><p className='font-bold '>News and Insights</p></div>

                            <div className='grid grid-cols-3 gap-4 mb-12'>
                                {newsList}
                            </div>
                        </div>
                        {/* End */}

                        {/* Page Loader Section */}
                        <div className={showPageLoader ? "page-loader-backdrop opacity-90" : "hidden"}>
                            <div className='relative'>
                                <div className='ml-96 w-1/3 text-center relative'>
                                    <img src={AnchoriaSpinner} alt="" />

                                    <div className='absolute' style={{left : '15.2rem', top: '5.4rem'}}>
                                        <img src={AnchoriaIcon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}
                    </div>
                </div>
            </div>
            

            {/* Set Price Alert Modal */}
            <div className={showSetPriceAlertModal ?  'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="set-price-alert-modal rounded-lg">
                        {/* price Alert Error */}
                        <div className={priceAlertError === '' ? "hidden" : "error-alert mb-3"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className="text-sm">{priceAlertError}</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-3 flex justify-between">
                            <div className="text-2xl text-green-900">Set Price Alerts</div>

                            <div onClick={closeModal}>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <div>
                                <div className='mb-5'>
                                    <img src={AtlasIcon} alt="" className="align-middle border rounded-lg" />
                                    <span className="font-bold mx-3 text-sm">{params.get('symbol')}</span> |
                                    <span className=" mx-3 text-sm">{String(params.get('name')).substring(0, 16)}...</span>
                                </div>

                                <div className="mb-5 w-32 bg-yellow-400 py-2 px-3 rounded-2xl text-sm">Manufacturing</div>

                                <div className="leading-6 text-sm mb-3">{companyInfo.length > 250 ? companyInfo.substring(0, 250) + "..." : companyInfo}</div>

                                <div className='mb-5'>
                                    <div className='mb-3 font-bold'>Current Price</div>
                                    <div className=' text-green-900 text-2xl'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>
                                </div>

                                <div className='mb-5'>
                                    <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-sm" : "font-bold text-red-500 text-sm"}>
                                        {stockInfo === '' ? '' : JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === '' ? '' : HelperFunctions.formatCurrencyWithDecimal(JSON.parse(stockInfo).percentageChange.replace('-',''))}%
                                    </div>
                                </div>

                                <div className='mb-5 flex space-x-5'>
                                    <div className='w-full'>
                                        <div className='font-bold mb-3 text-sm'>Enter Price</div>
                                        <input type="number" value={priceAlert} onChange={delineatePriceAlert} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" />
                                    </div>
                                </div>
                                
                                <div className='mb-5'>
                                    <div className='w-full font-bold mb-3 text-sm'>Price Condition</div>

                                    <div className=''>
                                        <select className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' onChange={e => setPriceCondition(e.target.value)}>
                                            <option value="">Select a Condition</option>
                                            <option value="GREATER_THAN">High</option>
                                            <option value="LESS_THAN">Low</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='mb-8'>
                                    <div className='mb-3 font-bold text-sm'>Transaction Pin</div>

                                    <div>
                                        <input type="password" className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' value={transactionPin} onChange={e => setTransactionPin(e.target.value)} maxLength={4} autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="flex space-x-5">
                                    <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                                    <button onClick={createPriceAlert} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">
                                        <span className={showSpinner ? "hidden" : ""}>Add</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* price Alert Error */}
                        <div className={priceAlertError === '' ? "hidden" : "error-alert"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className="text-sm">{priceAlertError}</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}
                    </div>
                </div>
            </div>
            {/* End */}

            {/* Add To Watchlist Modal */}
            <div className={showAddToWatchListModal ? "add-to-watchlist-modal rounded-lg" : "add-to-watchlist-modal rounded-lg hidden"}>
                <div className="mb-3 flex justify-between">
                    <div className="text-2xl text-green-900">Add To Watchlist</div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-3"></div>

                <div>
                    <div>
                        
                        <div >
                            <div className='mb-3'>
                                <img src={AtlasIcon} alt="" className="align-middle border rounded-lg" />
                                <span className="font-bold mx-3 text-xl">{params.get('symbol')}</span> 
                                <span className=" mx-3 text-xl">|</span>
                                <span className=" mx-3">{stockInfo === ''?'':JSON.parse(stockInfo).name}</span>
                            </div>

                            <div className="mb-3 py-1">
                                <span className='bg-yellow-400 py-2 px-3 rounded-2xl text-sm'>{stockInfo === ''?'':JSON.parse(stockInfo).sector}</span>
                            </div>

                            <div className="leading-6 text-sm mb-3">{companyInfo.length > 250 ? companyInfo.substring(0, 250) + "..." : companyInfo}</div>

                            <div className='mb-3' >
                                <div className='mb-3 font-bold'>Current Price</div>
                                <div className='text-green-900 text-2xl'>₦ {stockInfo === ''?'':JSON.parse(stockInfo).price}</div>
                            </div>


                            <div className='mb-8'>
                                <div className={params.get('sign') === 'positive' ? "font-bold text-green-500 text-sm" : "font-bold text-red-500 text-sm"}>{stockInfo === ''?'':JSON.parse(stockInfo).change.replace('-','')} | {stockInfo === ''?'':JSON.parse(stockInfo).percentageChange.replace('-','')}%  </div>
                            </div>
                        </div>

                        <div className={showHighLow ? 'mb-3 flex space-x-5' : 'mb-3 flex space-x-5 hidden'}>
                            <div className='w-1/2'>
                                <div className='font-bold mb-3'>High</div>
                                <input type="number" className="input border p-2" />
                            </div>

                            <div className='w-1/2'>
                                <div className='font-bold mb-3'>Low</div>
                                <input type="number" className="input border p-2" />
                            </div>
                        </div>

                        <div className="flex space-x-5">

                            <button onClick={addStockToWatchlist} type="button" className="w-full bg-green-900 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer">
                                <span className={showSpinner ? "hidden" : ""}>Add</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* End */}

            {/* Buy Stock Modal */}
            <div className={showTradeStockModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="buy-stocks-modal rounded-lg">

                        {/* Get Price Estimate Error */}
                        <div className={priceEstimateError === '' ? "hidden" : "error-alert mb-3"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className="text-sm">{priceEstimateError}</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-5 flex justify-between">
                            <div>
                                <div className=" text-2xl text-green-900 mb-3">Buy Stock</div>
                                <div className=' text-green-900'>Provide the details below</div>
                            </div>

                            <div onClick={closeModal} className='cursor-pointer'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <div className="stock-balance-card">
                                <div className="italic text-green-500 mb-3">Available Balance</div>
                                <div className="font-bold text-2xl  text-white">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                    </svg>
                                    <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(walletBalance)}</span>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <div className='mb-3'>
                                <img src={AtlasIcon} alt="" className="align-middle rounded-lg" />
                                <span className="font-bold  mx-3 text-lg">{params.get('symbol')}</span> |
                                <span className=" mx-3 text-sm">{params.get('name')?.substring(0, 10)}...</span>
                            </div>
                        </div>

                        
                        <div className='mb-8' >
                            <div className='mb-3'>Current Price /Per Share</div>
                            <div className=' text-2xl font-bold text-green-900'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>
                        </div>

                        <div className='mb-8'>
                            <div className='relative'>
                                <div className='flex justify-between space-x-5 mb-3'>

                                    <div className='w-1/2 relative cursor-pointer' onClick={displayOrderTypeDropdown}>
                                        <div className="mb-3">Order Type</div>

                                        <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                            <div>{orderType}</div>
                                            <div><img src={ChevronDownIcon} alt='' /></div>
                                        </div>
                                    </div>

                                    <div className='w-1/2'>
                                        <div className="mb-3">Unit</div>

                                        <div>
                                            <input onChange={delineateStockUnit} type='text' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' value={stockUnit} />
                                        </div>
                                    </div>

                                </div>

                                {/* Order Type Description */}
                                <div className={showOrderTypeDropdown ? 'absolute  bg-white p-3 left-0 rounded-lg w-1/2 border shadow top-0 z-10' : 'hidden'}>
                                    <div className=' text-sm text-green-900 mb-3 font-bold'>Order Type</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='order-type-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-2 font-bold' onClick={selectOrderType} data-value="Market">Market</div>
                                            
                                            <div className='text-xs' onClick={selectOrderType} data-value="Market">Instantly buy units of shares.</div>
                                            
                                            <div onClick={selectOrderType} className='element-cover' data-value="Market"></div>
                                        </li>

                                        <li className='order-type-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-2 font-bold' onClick={selectOrderType} data-value="Limit">Limit</div>
                                            
                                            <div className='text-xs' onClick={selectOrderType} data-value="Limit">Place order based on preferred maximum amount to buy shares.</div>
                                            
                                            <div onClick={selectOrderType} className='element-cover' data-value="Limit"></div>
                                        </li>

                                        <li className='order-type-list hidden relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-2 font-bold' onClick={selectOrderType} data-value="Stop Loss">Stop Loss</div>
                                            
                                            <div className='text-xs' onClick={selectOrderType} data-value="Stop Loss">Place order based on price tolerance for a buy. </div>
                                            
                                            <div onClick={selectOrderType} className='element-cover' data-value="Stop Loss"></div>
                                        </li>

                                        <li className='order-type-list hidden relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' >
                                            <div className=' mb-2 font-bold' onClick={selectOrderType} data-value="Stop Limit">Stop Limit</div>
                                            
                                            <div className='text-xs' onClick={selectOrderType} data-value="Stop Limit">Place order based on maximum limit for buy.</div>
                                            
                                            <div onClick={selectOrderType} className='element-cover' data-value="Stop Limit"></div>
                                        </li>
                                    </ul>
                                </div>
                                {/* End */}
                            </div>

                            {/* Limit - Order Type */}
                            <div className={limitOrderType ? 'relative flex justify-between space-x-5 mb-5' : 'hidden'}>
                                <div className='w-1/2'>
                                    <div className="mb-3">Maximum Limit</div>

                                    <div>
                                        <input onChange={delineatePriceToleranceAndLimit} type='text' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' placeholder='Maximum price per share' value={priceToleranceAndLimit} />
                                    </div>
                                </div>

                                <div className='w-1/2 relative cursor-pointer' onClick={displayLimitDuration}>
                                    <div className="mb-3">Duration</div>

                                    <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                        <div>{duration}</div>
                                        <div><img src={ChevronDownIcon} alt='' /></div>
                                    </div>
                                </div>

                                {/*Duration Dropdown */}
                                <div className={showLimitDurationDropdown ? 'bg-white shadow -top-48 p-3 absolute border right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'  style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold' onClick={selectDuration} data-value="End of day">End of day</div>

                                            <div className='text-xs' onClick={selectDuration} data-value="End of day">Order should be executed before end of  day, else, cancelled</div>

                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list hidden relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold' onClick={selectDuration} data-value="Fill or Kill">Fill or Kill</div>

                                            <div className='text-xs' onClick={selectDuration} data-value="Fill or Kill">Order should be filled immediately, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list hidden relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold' onClick={selectDuration}  data-value="Immediate or Cancel">Immediate or Cancel</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Immediate or Cancel">If number of units can not be filled immediately then cancel order</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className=' mb-3 font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>

                                            <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                        </li>
                                    </ul>
                                </div>
                                {/*End */}

                            </div>
                            {/* End */}

                            {/* Stop Loss - Order Type */}
                            <div className='relative'>
                                <div className={stopLossOrderType ? 'flex justify-between space-x-5 mb-3' : 'hidden'}>
                                    <div className='w-1/2'>
                                        <div className="mb-3">Price Tolerance</div>

                                        <div>
                                            <input type='text' onChange={delineatePriceToleranceAndLimit} className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' value={priceToleranceAndLimit} />
                                        </div>
                                    </div>

                                    <div className='w-1/2 relative cursor-pointer' onClick={displayStopLossDuration}>
                                        <div className="mb-3">Duration</div>

                                        <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                            <div>{duration}</div>
                                            <div><img src={ChevronDownIcon} alt='' /></div>
                                        </div>
                                    </div>

                                </div>

                                <div className={showStopLossDurationDropdown ? 'bg-white shadow -top-96 p-3 absolute border right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'  style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold' onClick={selectDuration} data-value="End of day">End of day</div>

                                            <div className='text-xs' onClick={selectDuration} data-value="End of day">Order should be executed before end of  day, else, cancelled</div>

                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold' onClick={selectDuration} data-value="Fill or Kill">Fill or Kill</div>

                                            <div className='text-xs' onClick={selectDuration} data-value="Fill or Kill">Order should be filled immediately, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold' onClick={selectDuration}  data-value="Immediate or Cancel">Immediate or Cancel</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Immediate or Cancel">If number of units can not be filled immediately then cancel order</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className=' mb-3 font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>

                                            <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End */}

                            {/* Stop Limit - Order Type */}
                            <div className='relative'>
                                <div className={stopLimitOrderType ? '' : 'hidden'}>
                                    <div className='flex justify-between space-x-5 mb-3'>
                                        <div className='w-1/2'>
                                            <div className="mb-3">Price Tolerance and Limit</div>

                                            <div>
                                                <input onChange={delineatePriceToleranceAndLimit} value={priceToleranceAndLimit} type='text' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' />
                                            </div>
                                        </div>

                                        <div className='w-1/2 relative cursor-pointer' onClick={displayStopLimitDuration}>
                                            <div className="mb-3">Duration</div>

                                            <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                                <div>{duration}</div>
                                                <div><img src={ChevronDownIcon} alt='' /></div>
                                            </div>
                                        </div>

                                        <div className={showStopLimitDurationDropdown ? 'bg-white shadow -top-96 p-3 absolute border right-0 rounded-lg w-1/2' : 'hidden'}>
                                            <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                            <ul className='list-none m-0 p-0'>
                                                <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative'  style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                                    <div className=' mb-3 font-bold' onClick={selectDuration} data-value="End of day">End of day</div>

                                                    <div className='text-xs' onClick={selectDuration} data-value="End of day">Order should be executed before end of  day, else, cancelled</div>

                                                    <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                                    <div className=' mb-3 font-bold' onClick={selectDuration} data-value="Fill or Kill">Fill or Kill</div>

                                                    <div className='text-xs' onClick={selectDuration} data-value="Fill or Kill">Order should be filled immediately, else, cancelled</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom: '1px solid rgba(243, 244, 246, 1)'}}>
                                                    <div className=' mb-3 font-bold' onClick={selectDuration}  data-value="Immediate or Cancel">Immediate or Cancel</div>
                                                    
                                                    <div className='text-xs' onClick={selectDuration} data-value="Immediate or Cancel">If number of units can not be filled immediately then cancel order</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                                    <div className=' mb-3 font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>

                                                    <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-3">Enter Date</div>
                                            <div className='relative flex justify-between items-center border rounded-lg'>
                                                <div className='w-full'>
                                                    <input type="text" className="font-bold outline-white border-0 p-3 input text-sm" placeholder="Enter end date for your order" defaultValue={showDate} />
                                                </div>
                                                <div className='p-3 cursor-pointer' onClick={e => displayCalendar()}>
                                                    <img src={CalendarIcon} alt="" width="20" />
                                                </div>

                                                <Calendar onChange={changeDate} value={dateState} className={showCalendar ? "absolute z-10" : "hidden"} />
                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>

                                <div className={showStopLossDurationDropdown ? 'bg-white shadow -top-96 p-3 absolute border right-0 rounded-lg w-1/2 hidden' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold'>End of day</div>
                                            <div className='text-xs'>Order should be executed before end of  day, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold'>Fill or Kill</div>
                                            <div className='text-xs'>Order should be filled immediately, else, cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold'>Immediate or Cancel</div>
                                            <div className='text-xs'>Order can be partly filled immediately, units not filled immediately should be cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className=' mb-5 text-sm font-bold'>Good till Date</div>
                                            <div className='text-xs'>Order should remain open in the market till set date</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End */}

                        </div>

                        <div className='mb-8'>
                            <div className='mb-3'>Estimated cost</div>
                            <div className=' font-bold text-green-900 text-3xl'>{HelperFunctions.formatCurrencyWithDecimal(estimatedCost)}</div>
                        </div>

                        <div>
                            <button onClick={calculateBuyStockOrderEstimate} className={estimatedCost === 0 ? 'w-full bg-green-900 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer' : 'hidden'}>
                                <span className={showSpinner ? "hidden" : ""}>Get Estimated Cost</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>

                            <button onClick={displayStockOrderSummaryModal} className={estimatedCost !== 0 ? 'w-full bg-green-900 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer' : 'hidden'}>
                                <span className={showSpinner ? "hidden" : ""}>Continue</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {/* End */}

            {/* Sell Stock Modal */}
            <div className={showSellStockModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="buy-stocks-modal rounded-lg">

                        {/* Get Price Estimate Error */}
                        <div className={priceEstimateError === '' ? "hidden" : "error-alert mb-3"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className="text-sm">{priceEstimateError}</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-8 flex justify-between">
                            <div>
                                <div className=" text-2xl text-green-900 mb-3 ">Sell Stock</div>
                                <div className='text-green-900'>Provide the details below</div>
                            </div>

                            <div onClick={closeModal} className='cursor-pointer'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='mb-5'>
                            <div className="stock-balance-card">
                                <div className="italic text-green-500 mb-3">Available Balance</div>
                                <div className="font-bold text-3xl  text-white">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                    </svg>
                                    <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(walletBalance)}</span>
                                </div>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <div className='mb-3'>
                                <img src={AtlasIcon} alt="" className="align-middle border rounded-lg" />
                                <span className="font-bold  mx-3 text-lg">{params.get('symbol')}</span> |
                                <span className=" mx-3">{params.get('name')?.substring(0,10)}...</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className='flex justify-between space-x-10 mb-3'>
                                <div className='w-2/3'>
                                    <div className='mb-3 text-sm font-bold'>Portfolios</div>

                                    <div>
                                        <select className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' onChange={getPortfolioIdToSellStock}>
                                            <option value="null&0">Select portfolio</option>
                                            {portfolioWithCurrentStock.map((item :any) =>
                                                <option value={item.uuid+"&"+item.units}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className='w-1/3'>
                                    <div className='text-sm font-bold mb-3'>Available Units</div>

                                    <div>   
                                        <div className=''>
                                            <div className='text-3xl w-full font-bold pl-3'>{unitToSell}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>

                        <div className="mb-8">
                            <div className='flex justify-between space-x-3 items-end  mb-3'>
                                <div className='w-2/3'>
                                    <div className='mb-3 text-sm font-bold'>Number of units to sell</div>

                                    <div>
                                        <input id="desiredUnitToSell" type="text" className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' onChange={calculateDesiredUnitToSell} placeholder="0"/>
                                           
                                    </div>
                                </div>

                                <div className='w-1/3'>
                                    <div>   
                                        <button onClick={calculateTotalUnitToSell} className="cursor-pointer focus:shadow-outline text-white rounded-lg bg-green-800 border-0 font-bold lg:text-sm py-3  w-full" type='button'>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='text-red-500 text-xs mb-3'>{unitToSellError}</div>
                        </div>

                        <div className="mb-3 hidden">
                            <div className='text-sm font-bold mb-3'>Available Units</div>

                            <div className='md:flex md:justify-between items-center mb-2'>
                                <div className='w-2/3'>   
                                    <div className='font-bold text-xl'>
                                        <input type="number" className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' value={unitToSell} onChange={e => setUnitToSell(e.target.value)}  />
                                    </div>
                                </div>

                                <div className='w-1/3'>
                                    <button onClick={calculateTotalUnitToSell} className={isValidateUnitToSell ? "cursor-pointer focus:shadow-outline text-white rounded-lg bg-green-800 border-0 font-bold ml-3 lg:text-sm w-full py-4 px-7":"cursor-pointer focus:shadow-outline text-white rounded-lg bg-green-800 border-0 font-bold ml-3 lg:text-sm w-full py-4 px-7 opacity-50"} type='button' disabled={!isValidateUnitToSell}>
                                        Add
                                    </button>
                                </div>
                            </div>                           
                            
                        </div>
                        
                        <div className='mb-5' >
                            <div className='mb-3 font-bold'>Current Price /Per Share</div>
                            <div className=' text-2xl font-bold text-green-900'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>
                        </div>       

                        <div className='mb-5'>
                            <div className='relative'>
                                <div className='flex justify-between space-x-5 mb-3'>

                                    <div className='w-1/2 relative cursor-pointer' onClick={displayOrderTypeDropdown}>
                                        <div className="mb-3 font-bold text-sm">Order Type</div>

                                        <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                            <div>{orderType}</div>
                                            <div><img src={ChevronDownIcon} alt='' /></div>
                                        </div>
                                    </div>

                                    <div className='w-1/2'>
                                        <div className="mb-3 font-bold text-sm">Unit</div>

                                        <div>
                                            <input type='number' className='font-bold bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' value={totalUnitToSell} readOnly/>
                                        </div>
                                    </div>

                                </div>

                                {/* Order Types Description */}
                                <div className={showOrderTypeDropdown ? 'bg-white shadow -top-48 p-3 absolute border left-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Order Type</div>

                                    <ul className='list-none m-0 p-0 rounded-lg'>
                                        <li className='order-type-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 font-bold text-sm' onClick={selectOrderType} data-value="Market">Market</div>
                                            
                                            <div className='text-xs' onClick={selectOrderType} data-value="Market">Instantly sell units of shares. </div>
                                            
                                            <div onClick={selectOrderType} className='element-cover' data-value="Market"></div>
                                        </li>

                                        <li className='order-type-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 text-sm font-bold' data-value="Limit" onClick={selectOrderType}>Limit</div>
                                            
                                            <div className='text-xs' onClick={selectOrderType} data-value="Limit">- Place order based on preferred maximum amount to receive share.</div>

                                            <div onClick={selectOrderType} className='element-cover' data-value="Limit"></div>
                                        </li>

                                        <li className='order-type-list hidden relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold'>Stop Loss</div>
                                            <div className='text-xs'>Place order based on price tolerance for a sell.</div>
                                            <div onClick={selectOrderType} className='element-cover' data-value="Stop Loss"></div>
                                        </li>

                                        <li className='order-type-list hidden relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' >
                                            <div className=' mb-3 text-sm font-bold'>Stop Limit</div>
                                            <div className='text-xs'>Place order based on minimum limit for sell.</div>
                                            <div onClick={selectOrderType} className='element-cover' data-value="Stop Limit"></div>
                                        </li>
                                    </ul>
                                </div>
                                {/* End */}
                            </div>

                            {/* Limit - Order Type */}
                            <div className={limitOrderType ? 'relative flex justify-between space-x-5 mb-3' : 'hidden'}>
                                <div className='w-1/2'>
                                    <div className="mb-3 text-sm font-bold">Maximum Limit</div>

                                    <div>
                                        <input onChange={delineatePriceToleranceAndLimit} type='text' className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" placeholder='Maximum price per share' value={priceToleranceAndLimit} />
                                    </div>
                                </div>

                                <div className='w-1/2 relative cursor-pointer' onClick={displayLimitDuration}>
                                    <div className="mb-3 text-sm font-bold">Duration</div>

                                    <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                        <div>{duration}</div>
                                        <div><img src={ChevronDownIcon} alt='' /></div>
                                    </div>
                                </div>

                                {/*Duration Dropdown */}
                                <div className={showLimitDurationDropdown ? 'bg-white shadow -top-56 p-3 absolute border right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold' onClick={selectDuration} data-value="End of day">End of day</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="End of day">Order should be executed before end of  day, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative  hidden cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold'>Fill or Kill</div>
                                            
                                            <div className='text-xs'>Order should be filled immediately, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative hidden cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold'>Immediate or Cancel</div>
                                            <div className='text-xs'>Order can be partly filled immediately, units not filled immediately should be cancelled</div>
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className=' mb-5 text-sm font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                        </li>
                                    </ul>
                                </div>
                                {/*End */}

                            </div>
                            {/* End */}

                            {/* Stop Loss - Order Type */}
                            <div className='relative'>
                                <div className={stopLossOrderType ? 'flex justify-between space-x-5 mb-3' : 'hidden'}>
                                    <div className='w-1/2'>
                                        <div className="mb-3 text-sm font-bold">Price Tolerance</div>

                                        <div>
                                            <input type='text' onChange={delineatePriceToleranceAndLimit} className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white  focus:ring-indigo-500' value={priceToleranceAndLimit} />
                                        </div>
                                    </div>

                                    <div className='w-1/2 relative cursor-pointer' onClick={displayStopLossDuration}>
                                        <div className="mb-3 text-sm font-bold">Duration</div>

                                        <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                            <div>{duration}</div>
                                            <div><img src={ChevronDownIcon} alt='' /></div>
                                        </div>
                                    </div>

                                </div>

                                <div className={showStopLossDurationDropdown ? 'bg-white shadow -top-96 p-3 absolute border right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 text-sm font-bold' onClick={selectDuration} data-value="End of day">End of day</div>
                                            
                                            <div className='text-xs' data-value="End of day">Order should be executed before end of  day, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold' data-value="Fill or Kill" onClick={selectDuration}>Fill or Kill</div>

                                            <div className='text-xs' data-value="Fill or Kill" onClick={selectDuration}>Order should be filled immediately, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 text-sm font-bold' data-value="Immediate or Cancel" onClick={selectDuration}  >Immediate or Cancel</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Immediate or Cancel">Order can be partly filled immediately, units not filled immediately should be cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className=' mb-3 text-sm font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End */}

                            {/* Stop Limit - Order Type */}
                            <div className='relative'>
                                <div className={stopLimitOrderType ? '' : 'hidden'}>
                                    <div className='flex justify-between space-x-5 mb-3'>
                                        <div className='w-1/2'>
                                            <div className="mb-3 text-sm font-bold">Price Tolerance and Limit</div>

                                            <div>
                                                <input onChange={delineatePriceToleranceAndLimit} value={priceToleranceAndLimit} type='text' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white  focus:ring-indigo-500' />
                                            </div>
                                        </div>

                                        <div className='w-1/2 relative cursor-pointer' onClick={displayStopLimitDuration}>
                                            <div className="mb-3 text-sm font-bold">Duration</div>

                                            <div className='flex justify-between font-bold items-center border p-3 rounded-lg'>
                                                <div>{duration}</div>
                                                <div><img src={ChevronDownIcon} alt='' /></div>
                                            </div>
                                        </div>

                                        <div className={showStopLimitDurationDropdown ? 'right-0 rounded-lg w-1/2 bg-white shadow -top-96 p-3 absolute border' : 'hidden'}>
                                            <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                            <ul className='list-none m-0 p-0'>
                                                <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                                    <div className=' mb-3 text-sm font-bold' onClick={selectDuration} data-value="End of day">End of day</div>
                                                    
                                                    <div className='text-xs' data-value="End of day">Order should be executed before end of  day, else, cancelled</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                                    <div className=' mb-5 text-sm font-bold' data-value="Fill or Kill" onClick={selectDuration}>Fill or Kill</div>

                                                    <div className='text-xs' data-value="Fill or Kill" onClick={selectDuration}>Order should be filled immediately, else, cancelled</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                                    <div className=' mb-3 text-sm font-bold' data-value="Immediate or Cancel" onClick={selectDuration}  >Immediate or Cancel</div>
                                                    
                                                    <div className='text-xs' onClick={selectDuration} data-value="Immediate or Cancel">Order can be partly filled immediately, units not filled immediately should be cancelled</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                                </li>

                                                <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                                    <div className=' mb-3 text-sm font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>
                                                    
                                                    <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                                    
                                                    <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-3 text-sm font-bold">Enter Date</div>
                                            <div className='flex justify-between items-center border rounded-lg'>
                                                <div className='w-full'>
                                                    <input type="text" className="font-bold outline-white border-0 p-3 input text-sm" placeholder="Enter end date for your order" defaultValue={showDate} />
                                                </div>
                                                <div className='p-3 cursor-pointer' onClick={e => displayCalendar()}>
                                                    <img src={CalendarIcon} alt="" width="20" />
                                                </div>
                                            </div>

                                            <Calendar onChange={changeDate} value={dateState} className={showCalendar ? "absolute z-10" : "hidden"} />
                                        </div>
                                    </div>
                                </div>

                                <div className={showStopLossDurationDropdown ? 'bg-white shadow top-10 p-3 absolute border right-0 rounded-lg w-1/2' : 'hidden'}>
                                    <div className=' text-lg text-green-900 mb-3'>Duration</div>

                                    <ul className='list-none m-0 p-0'>
                                        <li className='duration-list cursor-pointer py-2 bg-gray-100 hover:bg-gray-100 rounded-lg pl-2 my-1 relative' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 text-sm font-bold' onClick={selectDuration} data-value="End of day">End of day</div>
                                            
                                            <div className='text-xs' data-value="End of day">Order should be executed before end of  day, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="End of day"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 relative rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-5 text-sm font-bold' data-value="Fill or Kill" onClick={selectDuration}>Fill or Kill</div>

                                            <div className='text-xs' data-value="Fill or Kill" onClick={selectDuration}>Order should be filled immediately, else, cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Fill or Kill"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1' style={{borderBottom:'1px solid rgba(243, 244, 246, 1)'}}>
                                            <div className=' mb-3 text-sm font-bold' data-value="Immediate or Cancel" onClick={selectDuration}  >Immediate or Cancel</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Immediate or Cancel">Order can be partly filled immediately, units not filled immediately should be cancelled</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Immediate or Cancel"></div>
                                        </li>

                                        <li className='duration-list relative cursor-pointer py-2 hover:bg-gray-100 rounded-lg pl-2 my-1'>
                                            <div className=' mb-3 text-sm font-bold' onClick={selectDuration} data-value="Good till Date">Good till Date</div>
                                            
                                            <div className='text-xs' onClick={selectDuration} data-value="Good till Date">Order should remain open in the market till set date</div>
                                            
                                            <div onClick={selectDuration} className='element-cover' data-value="Good till Date"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End */}

                        </div>

                        <div className='mb-8'>
                            <div className='mb-3 text-sm font-bold'>Estimated cost</div>
                            <div className=' font-bold text-green-900 text-2xl'>{HelperFunctions.formatCurrencyWithDecimal(estimatedCost)}</div>
                        </div>

                        <div className='mb-3'>
                            <button onClick={calculateSellStockOrderEstimate} className={estimatedCost === 0 ? 'w-full bg-green-900 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer' : 'hidden'}>
                                <span className={showSpinner ? "hidden" : ""}>Get Estimated Cost</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>

                            <button onClick={displayStockOrderSummaryModal} className={estimatedCost !== 0 ? 'w-full bg-green-900 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer' : 'hidden'}>
                                <span className={showSpinner ? "hidden" : ""}>Continue</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>

                        {/* Get Price Estimate Error */}
                        <div className={priceEstimateError === '' ? "hidden" : "error-alert"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className=" text-sm">{priceEstimateError}</div>
                                </div>

                            </div>
                        </div>
                        {/* End */}

                    </div>
                </div>
            </div>
            {/* End */}

            {/* Order Summary Modal */}
            <div className={showOrderSummaryModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="buy-stocks-modal rounded-lg">

                        {/* Buy Stock Error */}
                        <div className={buyStockError === '' ? "hidden" : "error-alert mb-3"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className="text-sm">{buyStockError}</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-3 flex justify-between">
                            <div>
                                <div className="text-2xl text-green-900 mb-3">Order Summary</div>
                                <div className='text-green-900'>Preview your investment</div>
                            </div>

                            <div onClick={closeModal} className='cursor-pointer'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <div className='mb-3'>
                                <img src={AtlasIcon} alt="" className="align-middle border rounded-lg" />
                                <span className="font-bold mx-3 text-xl">{params.get('symbol')}</span> |
                                <span className=" mx-3">{params.get('name')}</span>
                            </div>
                        </div>

                        
                        <div className='mb-3' >
                            <div className='mb-3 font-bold'>Current Price /Per Share</div>
                            <div className=' text-3xl font-bold text-green-900'>₦ {stockInfo === '' ? '' : JSON.parse(stockInfo).price}</div>
                        </div>
                        

                        <div className={params.get("tradeAction") === 'buy' ? 'mb-5' : 'hidden'} >
                            <div className='mb-3'>Add this stocks to a portfolio <span className='text-yellow-700'>(Optional)</span></div>

                            <div>
                                <select className='block w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white bg-white focus:ring-indigo-500' onChange={getPortfolioIdToAddStock}>
                                    <option value="qazsw">Select portfolio</option>
                                    {portfolioList}
                                </select>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <div className='mb-3'>Transaction Pin</div>

                            <div>
                                <input type="password" className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' value={transactionPin} onChange={e => setTransactionPin(e.target.value)} maxLength={4}/>
                            </div>
                        </div>

                        <div className='py-3 mb-5'>
                            <div className='flex justify-between text-lg'>
                                <div>Order Type</div>
                                <div className='font-bold'>{orderType}</div>
                            </div>
                        </div>

                        <div className='py-3 mb-5'>
                            <div className='flex justify-between text-lg'>
                                <div>Number of Shares</div>
                                <div className='font-bold'>{stockUnit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'py-3 mb-5' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Maximum Limit</div>
                                <div className='font-bold'>₦ {priceToleranceAndLimit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border' : 'hidden'}></div>

                        <div className={orderType !== 'Market' ? 'py-3 mb-5' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Price Tolerance</div>
                                <div className='font-bold'>₦ {priceToleranceAndLimit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border' : 'hidden'}></div>

                        <div className={orderType !== 'Market' ? 'py-3 mb-6' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Date</div>
                                <div className='font-bold'>₦ {priceToleranceAndLimit}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border' : 'hidden'}></div>

                        <div className={orderType !== 'Market' ? 'py-3 mb-5' : 'hidden'}>
                            <div className='flex justify-between text-lg'>
                                <div>Duration</div>
                                <div className='font-bold'>{duration}</div>
                            </div>
                        </div>

                        <div className={orderType !== 'Market' ? 'border' : 'hidden'}></div>

                        
                        <div className='py-3 mb-5' >
                            <div className='flex justify-between text-lg'>
                                <div>Cost</div>
                                <div className='font-bold'>₦ {(stockInfo === '' ? '' : JSON.parse(stockInfo).price) * parseInt(stockUnit)}</div>
                            </div>
                        </div>
                        

                        
                        <div className='py-3 mb-5' >
                            <div className='flex justify-between text-lg'>
                                <div>Fees</div>
                                <div className='font-bold'>₦ {HelperFunctions.formatCurrencyWithDecimal(estimatedCost - (parseFloat(stockInfo === ''?'':JSON.parse(stockInfo).price) * parseInt(stockUnit))).replace('-','')}</div>
                            </div>
                        </div>

                        <div className='py-3 mb-5'>
                            <div className='font-bold flex justify-between text-lg'>
                                <div>Total Cost</div>
                                <div>₦ {HelperFunctions.formatCurrencyWithDecimal(estimatedCost)}</div>
                            </div>
                        </div>


                        <div className='flex space-x-5 mb-5'>
                            <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                            <button onClick={tradeStock} className='w-full bg-green-900 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer'>
                                <span className={showSpinner ? "hidden" : ""}>Confirm Order</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                            </button>
                        </div>

                        {/* Buy Stock Error */}
                        <div className={buyStockError === '' ? "hidden" : "error-alert mb-3"}>
                            <div className="flex justify-between space-x-1 p-3">
                                <div className="flex">

                                    <div className="text-sm">{buyStockError}</div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                    </div>
                </div>
            </div>
            {/* End */}

            {/* Success Modal */}
            <div className={showSuccessModal ? "stock-success-modal w-96" : "hidden"}>
                <div className="mx-auto w-1/2 mb-3">
                    <img src={SuccessCheckIcon} alt="success icon" className="w-full" />
                </div>

                <div className="relative z-10 text-green-900 text-3xl text-center mb-3">Successful</div>

                <div className="text-sm text-center mb-8 leading-5">{apiResponseSuccessMsg}</div>

                <div className="">

                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Close</button>
                </div>
            </div>
            {/* End */}

            <div className={showModalBG ? "modal-backdrop opacity-40" : "hidden"}>
            </div>

            <div className={showValidatePINModal ? 'generic-modal' : 'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="validate-pin-modal">
                        <div className="p-5 flex justify-between pb-5" style={{ borderBottom: '1px solid #dee2e6' }}>
                            <div className="font-bold text-xl text-green-900">Validate PIN</div>

                            <div onClick={closeModal} className='hidden'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>


                        <div className='p-5'>
                            {/* Pin Success */}
                            <div className={isPinValid === 'true' ? "otp-alert mb-3" : "hidden"}>
                                <div className="flex otp-validated justify-between space-x-1 p-3">
                                    <div className="flex">

                                        <div className=" text-sm text-green-900">{apiResponseSuccessMsg}</div>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            {/* Pin Error */}
                            <div className={isPinValid !== 'false' ? "hidden" : "error-alert mb-3"}>
                                <div className="flex justify-between space-x-1 p-3">
                                    <div className="flex">

                                        <div className=" text-sm">{apiResponseSuccessMsg}</div>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            <div className='font-bold mb-3'>Enter PIN</div>

                            <div className='mb-3'><input maxLength={4} type="password" className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" onChange={e => setPin(e.target.value)} /> </div>

                            <div><button type='button' className='px-16 py-3 bg-green-900 text-white rounded-lg font-bold border-0 w-full cursor-pointer' onClick={validatePin}>
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