import React, { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import '../portfolio/index.scss';
import StarIcon from '../../assets/images/star.svg';
import GreenQuestionmarkIcon from '../../assets/images/green-questionmark.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { formatCurrencyWithDecimal } from '../../lib/helper';
import SuccessIcon from '../../assets/images/success-check.svg';
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
import Pagination from '../../components/Pagination';

let PageSize = 10;

const Trade = () => {

    document.title = "Trade - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [stocksListStore, setStocksListStore] = useState<{ [key: string]: [] }>({});
    const [stocksList, setStocksList] = useState<any[]>([]);
    const [stockKeys, setStockKeys] = useState<any[]>([]);
    const [stockFilter, setStockFilter] = useState<any[]>([]);

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showAddToWatchlistModal, setShowAddToWatchlistModal] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);
    const [showFilteredStocks, setShowFilteredStocks] = useState<boolean>(false);

    const [apiResponseMessage, setApiResponseMessage] = useState('');

    const [stockSymbol, setStockSymbol] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [stocksSearchList, setStocksSearchList] = useState<any[]>([]);
    const [showSearchedStocks, setShowSearchedStocks] = useState<boolean>(false);
    const [stocksDataList, setStocksDataList] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    

    useEffect(() => {

        function getStocks() {

            getAxios(axios).get(getStocksEndpoint)
            .then(function (response) {
                let _sDataList: any[] = [];

                setStocksListStore(response.data.data);
                setStockKeys(Object.keys(response.data.data) as []);
                setStocksList(Object.values(response.data.data) as []);

                stocksList.map((item :any)=>{
                    item.map((elem :any) => {
                        _sDataList.push(elem);

                        return 0;
                    });

                    return 0;
                });

                setStocksDataList(_sDataList);

                setShowPageLoader(false);
            })
            .catch(function (error) {
                ;
            });
        }

        getStocks();
    }, [stocksList]);

    useEffect(()=>{
        function checkIfSearchQueryIsEmpty(){
            if(searchQuery === ""){
                setShowFilteredStocks(false);
                setShowSearchedStocks(false);
            }
        }

        checkIfSearchQueryIsEmpty();
    },[searchQuery])

    const tradeData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return stocksDataList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, stocksDataList]);

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
                    setApiResponseMessage(response.data.message);
                    displaySuccessModal();
                })
                .catch(function (error) {
                });
        }
    }

    function searchForStocks(){
        setShowSearchedStocks(true);
        setShowFilteredStocks(false);

        let _stockslist :any[] = [];

        let txt = searchQuery.toUpperCase();
        let txtLength  = txt.length;

        stocksList.map((item :any) => {
            let obj = item.filter((elem :any) => elem.symbol.substring(0, txtLength) === txt);

            if(obj.length > 0){
                _stockslist.push(obj);
            }            

            return false;
        });

        setStocksSearchList(_stockslist);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar /> 

                    <div className="flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className="text-3xl mb-3">
                                <span className="font-bold text-green-900">Trade</span>
                            </div>

                            <div className="text-sm font-bold mb-11">Buy stocks on the go</div>

                            {/*Quick Search*/}
                            <div className="mb-11">
                                <div className="flex justify-between">
                                    <div className='w-72'>  
                                        <div className="relative">
                                            <select id="bank_code" name="bank_code" data-vv-as="bank" className="block appearance-none w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white bg-white border-gray-400 focus:ring-indigo-500" onChange={e => filterStocksByCategory(e.target.value)}>
                                                <option value="All">All</option>
                                                {stockKeys.map((item: any) => <option value={item}>{item}</option>)}
                                            </select> 
                                            
                                            <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center px-2 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-current h-4 w-4">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>                                    

                                    <div className='w-80'> 
                                        <div className="relative ml-3 w-full lg:ml-0">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-gray-600">
                                                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                </svg>
                                            </span> 
                                            
                                            <input placeholder="Search" className="block rounded-md border border-gray-400 w-full text-gray-900 text-sm placeholder-gray-600 pl-10 pr-4 py-3" />
                                        </div>

                                        <div className="hidden flex items-center border rounded-lg pr-2 bg-white">
                                            <div className='w-full'>
                                                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" className="outline-white p-2 input border-0" placeholder="Search stocks by name" />
                                            </div>

                                            <div>
                                                <button onClick={searchForStocks} className='border-0 rounded-lg bg-green-900 text-white cursor-pointer font-bold px-3 py-2 w-full'>Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Stocks List section*/}
                            <div className='shadow-sm sm:rounded-lg mb-5'>
                                <table className={!showFilteredStocks && !showSearchedStocks ? "table-fixed w-full border-0 text-sm text-left text-gray-500":"hidden"} cellSpacing={0}>
                                    <thead className='text-sm text-gray-700 uppercase'>
                                        <tr className='bg-gray-100'>
                                            <th className='p-3 font-bold'></th>
                                            <th className='p-3 font-bold'>Code</th>
                                            <th   className='p-3 font-bold'>Name</th>
                                            <th className='p-3 font-bold'>Price</th>
                                            <th className='p-3 font-bold'>Returns (%)</th>
                                            <th  className='p-3 font-bold'></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {tradeData.map((el: any, index :any) => 
                                       
                                        <tr key={index} className="bg-white">
                                            <td className='px-3 py-4 table-border-bottom'>
                                                <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt=""/>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className="font-bold">{el.symbol}</div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className="">{el.name.substring(0,15)}...</div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className="font-bold">₦ {formatCurrencyWithDecimal(el.close).replace("-","")}</div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className={el.sign === "+" ? "text-green-500 font-bold md:mb-0 mb-3" : "text-red-500 font-bold md:mb-0 mb-3"}> {formatCurrencyWithDecimal(el.change).replace("-","")}%  </div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className='flex justify-end space-x-5'>
                                                    <button onClick={displayAddToWatchlistModal} type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer" data-symbol={el.symbol} >
                                                        <img src={StarIcon} width='20' alt='' data-symbol={el.symbol} />
                                                    </button>

                                                    <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.symbol + "&sign=" + (el.sign === '+' ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose + "&tradeAction=buy"}>
                                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                
                                <table className={!showFilteredStocks && showSearchedStocks ? "table-fixed w-full border-0 text-sm text-left text-gray-500 mb-11":"hidden"} cellSpacing={0}>
                                    <thead className='text-sm text-gray-700 uppercase'>
                                        <tr className='bg-gray-100'>
                                            <th className='p-3 font-bold'></th>
                                            <th className='p-3 font-bold'>Code</th>
                                            <th   className='p-3 font-bold'>Name</th>
                                            <th className='p-3 font-bold'>Price</th>
                                            <th className='p-3 font-bold'>Returns (%)</th>
                                            <th  className='p-3 font-bold'></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {stocksSearchList.map((elm: any) => 
                                        elm.map((el: any, index :any) =>
                                       
                                            <tr key={index} className="bg-white">
                                                <td className='px-3 py-4 table-border-bottom'>
                                                    <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt=""/>
                                                </td>

                                                <td className='px-3 py-4 table-border-bottom'>
                                                    <div className="font-bold">{el.symbol}</div>
                                                </td>

                                                <td className='px-3 py-4 table-border-bottom'>
                                                    <div className="">{el.name.substring(0,15)}...</div>
                                                </td>

                                                <td className='px-3 py-4 table-border-bottom'>
                                                    <div className="font-bold">₦ {formatCurrencyWithDecimal(el.close).replace("-","")}</div>
                                                </td>

                                                <td className='px-3 py-4 table-border-bottom'>
                                                    <div className={el.sign === "+" ? "text-green-500 font-bold md:mb-0 mb-3" : "text-red-500 font-bold md:mb-0 mb-3"}> {formatCurrencyWithDecimal(el.change).replace("-","")}%  </div>
                                                </td>

                                                <td className='px-3 py-4 table-border-bottom'>
                                                    <div className='flex justify-end space-x-5'>
                                                        <button onClick={displayAddToWatchlistModal} type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer" data-symbol={el.symbol} >
                                                            <img src={StarIcon} width='20' alt='' data-symbol={el.symbol} />
                                                        </button>

                                                        <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.symbol + "&sign=" + (el.sign === '+' ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose + "&tradeAction=buy"}>
                                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    </tbody>
                                </table>                                

                                <table className={showFilteredStocks && !showSearchedStocks ? "table-fixed w-full border-0 text-sm text-left text-gray-500 mb-11":"hidden"} cellSpacing={0}>
                                    <thead className='text-sm text-gray-700 uppercase'>
                                        <tr className='bg-gray-100'>
                                            <th className='p-3 font-bold'></th>
                                            <th className='p-3 font-bold'>Code</th>
                                            <th   className='p-3 font-bold'>Name</th>
                                            <th className='p-3 font-bold'>Price</th>
                                            <th className='p-3 font-bold'>Returns (%)</th>
                                            <th  className='p-3 font-bold'></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {stockFilter.map((el: any, index :any) => 
                                       
                                        <tr key={index} className="bg-white">
                                            <td className='px-3 py-4 table-border-bottom'>
                                                <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt=""/>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className="font-bold">{el.symbol}</div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className="">{el.name.substring(0,15)}...</div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className="font-bold">₦ {formatCurrencyWithDecimal(el.close).replace("-","")}</div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className={el.sign === "+" ? "text-green-500 font-bold md:mb-0 mb-3" : "text-red-500 font-bold md:mb-0 mb-3"}> {formatCurrencyWithDecimal(el.change).replace("-","")}%  </div>
                                            </td>

                                            <td className='px-3 py-4 table-border-bottom'>
                                                <div className='flex justify-end space-x-5'>
                                                    <button onClick={displayAddToWatchlistModal} type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer" data-symbol={el.symbol} >
                                                        <img src={StarIcon} width='20' alt='' data-symbol={el.symbol} />
                                                    </button>

                                                    <Link to={"/stock?name=" + el.name + "&sector=" + el.sector + "&symbol=" + el.symbol + "&sign=" + (el.sign === '+' ? 'positive' : 'negative') + "&change=" + el.change + "&close=" + el.close + "&open=" + el.open + "&high=" + el.high + "&low=" + el.low + "&wkhigh=" + el.weekHigh52 + "&wklow=" + el.weekLow52 + "&volume=" + el.volume + "&mktsegment=" + el.mktSegment + "&pclose=" + el.pclose + "&tradeAction=buy"}>
                                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            {/*End*/}

                            {/*Pagination section*/}
                            <div className='mb-30'>
                            <Pagination                                
                                currentPage={currentPage}
                                totalCount={stocksDataList.length}
                                pageSize={PageSize}
                                onPageChange={(page: number) => setCurrentPage(page)}
                            />
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
                <div className="mx-auto w-2/5">
                    <img src={GreenQuestionmarkIcon} alt="qm icon" className="w-32" />
                </div>

                <div className="relative mb-3 z-10 text-green-900 font-gotham-black-regular text-3xl text-center">Add stocks to watchlist</div>

                <div className="text-sm text-center mb-5">Are you sure you want to add this stocks from your watchlist?</div>

                <div className="flex space-x-5">
                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                    <button onClick={addStockToWatchlist} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">
                        <span className={showSpinner ? "hidden" : ""}>Confirm</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                    </button>
                </div>
            </div>

            <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
                <div className="mx-auto w-56 mb-3">
                    <img src={SuccessIcon} alt="success icon" className="w-full" />
                </div>

                <div className="relative mb-3 z-10 text-green-900 font-gotham-black-regular text-3xl text-center ">Successful</div>

                <div className="text-sm text-center mb-8">{apiResponseMessage}</div>

                <div className="flex space-x-5">
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
