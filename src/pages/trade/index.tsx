import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../portfolio/index.scss';
import StarIcon from '../../assets/images/star.svg';
import AtlasIcon from '../../assets/images/atlas.svg';
import GreenQuestionmarkIcon from '../../assets/images/green-questionmark.svg';
import SearchIcon from '../../assets/images/search.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { formatCurrencyWithDecimal } from '../../lib/helper';
import SuccessIcon from '../../assets/images/success.gif';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import * as HelperFunctions from '../../lib/helper';
import { getAxios } from '../../network/httpClientWrapper';
import { getStocksEndpoint, stockTradingServiceBaseUrlUrl } from '../../apiUrls';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';


const Trade = () => {

    document.title = "Trade - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [stocksListStore, setStocksListStore] = useState<{ [key: string]: [] }>({});
    const [stocksList, setStocksList] = useState([]);
    const [stockKeys, setStockKeys] = useState([]);
    const [stockFilter, setStockFilter] = useState([]);

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showAddToWatchlistModal, setShowAddToWatchlistModal] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);
    const [showFilteredStocks, setShowFilteredStocks] = useState<boolean>(false);

    const [apiResponseMessage, setApiResponseMessage] = useState('');

    const [stockSymbol, setStockSymbol] = useState('');

    useEffect(() => {

        function getStocks() {

            getAxios(axios).get(getStocksEndpoint)
                .then(function (response) {

                    setStocksListStore(response.data.data);
                    setStockKeys(Object.keys(response.data.data) as []);
                    setStocksList(Object.values(response.data.data) as []);

                    setShowPageLoader(false);
                    HelperFunctions.removeOverflowAndPaddingFromModalBody();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getWatchlist() {
            let customer = HelperFunctions.getCustomerInfo();
            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/watchlist?customerId=' + customer.id)
                .then(function (response) {
                    localStorage.setItem('aislUserWatchlist', JSON.stringify(response.data));
                })
                .catch(function (error) {

                    console.log(error);

                    setShowSpinner(false);
                });
        }

        getStocks();
        getWatchlist();
    }, []);

    function filterStocksByCategory(event: any) {

        if (event === "All") {
            setShowFilteredStocks(false);
        }
        else {
            setStockFilter(stocksListStore[event]);
            setShowFilteredStocks(true);
        }
    }


    function closeModal() {
        setShowModalBG(false);
        setShowSuccessModal(false);
        setShowAddToWatchlistModal(false);
    }

    function displayAddToWatchlistModal(event: any) {
        setShowModalBG(true);
        setShowAddToWatchlistModal(true);
        setShowSuccessModal(false);
        setStockSymbol(event.target.getAttribute("data-symbol"))
    }

    function displaySuccessModal() {
        setShowModalBG(true);
        setShowSuccessModal(true);
        setShowAddToWatchlistModal(false);
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
                    setApiResponseMessage(response.data.message);
                    displaySuccessModal();
                })
                .catch(function (error) {
                });
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
                            <div className="text-3xl mb-10">
                                <span className="font-bold text-green-900">Trade</span>
                            </div>

                            <div className="text-sm font-bold text-color-2 mb-30">Buy stocks on the go</div>

                            {/*Quick Search*/}
                            <div className="mb-20">
                                <div className="flex justify-between">
                                    <div className=''>
                                        <button className="hidden py-3 px-6 border-0 bg-transparent font-bold">Filter:</button>
                                        <select className='outline-white cursor-pointer p-3 rounded-lg border border-gray-300 font-bold' onChange={e => filterStocksByCategory(e.target.value)}>
                                            <option value="All">All</option>
                                            {stockKeys.map((item: any) => <option value={item}>{item}</option>)}
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute hidden w-80 right-0 flex border_1 rounded-lg pr-3 bg-white mb-20">
                                            <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                            <div className='w-full'>
                                                <input type="text" className="outline-white p-2 input border-0" placeholder="Search for stocks" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Stocks List section*/}
                            <div>
                                <div className={showFilteredStocks ? 'hidden' : ''}>
                                    {stocksList.map((elm: any) =>
                                        elm.map((el: any) =>
                                            <div className="card-15px mb-20">
                                                <div className="flex justify-between items-center">
                                                    <div> <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt=""/></div>

                                                    <div className="font-bold text-color-2">{el.symbol}</div>

                                                    <div className="text-ellipsis overflow-hidden ...">{el.name}</div>

                                                    <div className="font-bold text-color-2 text-right">₦ {formatCurrencyWithDecimal(el.close).replace("-","")}</div>

                                                    <div className={el.sign === "+" ? "text-green-500 font-bold" : "text-red-500 font-bold"}> {formatCurrencyWithDecimal(el.change).replace("-","")}%  </div>

                                                    <div className='flex justify-between space-x-2'>
                                                        <button onClick={displayAddToWatchlistModal} type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer" data-symbol={el.symbol} >
                                                            <img src={StarIcon} width='20' alt='' data-symbol={el.symbol} />
                                                        </button>

                                                        <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.symbol + "&sign=" + (el.sign === '+' ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose + "&tradeAction=buy"}>
                                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className={showFilteredStocks ? '' : 'hidden'}>
                                    {stockFilter.map((el: any) =>
                                        <div className="card-15px mb-20">
                                            <div className="flex justify-between items-center">
                                                <div> <img src={AtlasIcon} alt="" /></div>

                                                <div className="font-bold text-color-2">{el.symbol}</div>

                                                <div className="text-ellipsis overflow-hidden ...">{el.name}</div>

                                                <div className="font-bold text-color-2 text-right">₦ {formatCurrencyWithDecimal(el.close)}</div>

                                                <div className={el.sign === "+" ? "text-green-500 font-bold" : "text-red-500 font-bold"}> {formatCurrencyWithDecimal(el.change)}%  </div>

                                                <div className='flex justify-between space-x-2'>
                                                    <button onClick={displayAddToWatchlistModal} type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer" data-symbol={el.symbol} >
                                                        <img src={StarIcon} width='20' alt='' />
                                                    </button>

                                                    <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.symbol + "&sign=" + (el.sign === '+' ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose}>
                                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*End*/}

                            {/*Pagination section*/}
                            <div className='hidden'>
                                <div>
                                    <ul className='pagination list-none font-bold flex space-x-2 justify-end cursor-pointer text-sm'>
                                        <li className='font-bold text-green-900 rounded-lg'>Previous</li>
                                        <li className='text-color-9 rounded-lg'>1</li>
                                        <li className='text-color-9 rounded-lg'>2</li>
                                        <li className='text-color-9 rounded-lg active'>3</li>
                                        <li className='text-color-9 rounded-lg'>4</li>
                                        <li className='text-color-9 rounded-lg'>5</li>
                                        <li className='font-bold text-green-900 rounded-lg'>Next</li>
                                    </ul>
                                </div>
                            </div>
                            {/*End*/}

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

            <div className={showAddToWatchlistModal ? "success-modal" : "hidden"}>
                <div className="mx-auto w-2/5 mb-30">
                    <img src={GreenQuestionmarkIcon} alt="qm icon" className="w-32" />
                </div>

                <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Add stocks to watchlist</div>

                <div className="text-sm text-center mb-14">Are you sure you want to add this stocks from your watchlist?</div>

                <div className="flex space-x-5 mb-30">
                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                    <button onClick={addStockToWatchlist} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">
                        <span className={showSpinner ? "hidden" : ""}>Confirm</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                    </button>
                </div>
            </div>

            <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
                <div className="mx-auto h-64 relative">
                    <img src={SuccessIcon} alt="success icon" className="w-96" />
                    <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                </div>

                <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                <div className="text-color-4 text-sm text-center mb-14">{apiResponseMessage}</div>

                <div className="flex space-x-5 mb-30">
                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
            </div>

        </div>
    );
};

export default Trade;
