import React, { useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import '../watchlist/index.scss';
import SearchIcon from '../../assets/images/search.svg';
import SlidersIcon from '../../assets/images/sliders.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import RemoveStockIcon from '../../assets/images/remove-stock.svg';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import * as HelperFunctions from '../../lib/helper';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import CloseIcon from '../../assets/images/close.svg';
import SpinnerIcon from "../../assets/images/spinner.gif";
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SuccessIcon from '../../assets/images/success.gif';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import { getAxios } from '../../network/httpClientWrapper';
import { stockTradingServiceBaseUrlUrl } from '../../apiUrls';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import DeleteCardIcon from '../../assets/images/delete-card.svg';

let PageSize = 10;

const Watchlist = () => {
    document.title = "Watchlist - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showRemoveStockModal, setShowRemoveStockModal] = useState<boolean>(false);
    const [showCreateWatchlistModal, setShowCreateWatchlistModal] = useState<boolean>(false);

    const [watchList, setWatchList] = useState('');
    const [watchListStocks, setWatchListStocks] = useState([]);

    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [watchlistIsNullOrEmpty, setWatchlistIsNullOrEmpty] = useState<boolean>(true);

    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);

    const [apiSuccessMsg, setApiSuccessMsg] = useState('');

    const [switchToAll, setSwitchToAll] = useState<boolean>(true);
    const [switchToAlert, setSwitchToAlert] = useState<boolean>(false);

    const [stockSymbol, setStockSymbol] = useState('');

    const [priceAlerts, setPriceAlerts] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1); 

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');

    const [apiResponseHasError, setApiResponseHasError] = useState<boolean>(false);

    const [apiResponseErrorMsg, setApiResponseErrorMsg] = useState('');

    const [priceAlertId, setPriceAlertId] = useState('');

    useEffect(() => {

        function getWatchlist() {
            let customer = HelperFunctions.getCustomerInfo();            

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/watchlist?customerId=' + customer.id)
                .then(function (response) {
                    setWatchListStocks(response.data.data.stocks);
                    setShowPageLoader(false);
                    HelperFunctions.removeOverflowAndPaddingFromModalBody();
                })
                .catch(function (error) {

                    ;

                    setShowSpinner(false);
                });
        }

        getWatchlist();
    },[]);

    useEffect(() => {

        function getPriceAlerts() {          

            getAxios(axios).get(stockTradingServiceBaseUrlUrl + '/stock/price-triggers')
                .then(function (response) {
                    setPriceAlerts(response.data.data);
                })
                .catch(function (error) {});
        }

        getPriceAlerts();
    },[]);

    useEffect(() => {
        function checkIfWatchlistIsNullOrEmpty() {

            if (watchList === '') {
                setWatchlistIsNullOrEmpty(true);
            }
            else {
                setWatchlistIsNullOrEmpty(false);
            }
        }

        checkIfWatchlistIsNullOrEmpty();
    },[watchList]);

    const watchlistData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return watchListStocks.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, watchListStocks]);

    function closeModal() {
        setShowModalBG(false);
        setShowRemoveStockModal(false);
        setShowPageLoader(false)
        setShowCreateWatchlistModal(false);
        setShowSuccessModal(false);
        setShowDeleteModal(false);

        window.location.reload();
    }

    function displayCreateWatchlistModal() {
        setShowModalBG(true);
        setShowRemoveStockModal(false);
        setShowCreateWatchlistModal(true);
        HelperFunctions.addOverflowAndPaddingToModalBody();
    }

    function createWatchlist() {

        let requestData = {
            "name": watchList
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        if (localStorage.getItem('genericCypher')) {

            setShowSpinner(true);

            

            getAxios(axios).post(stockTradingServiceBaseUrlUrl + '/watchlist',
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    setShowSpinner(false);

                    setShowCreateWatchlistModal(false);
                    setShowModalBG(true);
                    setShowSuccessModal(true);
                    setApiSuccessMsg(response.data.message);
                })
                .catch(function (error) {

                    ;

                    alert("You already have a watchlist. Proceed to adding stocks to it.");

                    setShowSpinner(false);
                });
        }
    }

    function performSwitchToAll() {
        setSwitchToAll(true);
        setSwitchToAlert(false);
    }

    function performSwitchToAlert() {
        setSwitchToAll(false);
        setSwitchToAlert(true);
    }

    function removeStockFromWatchlist() {
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
            

            getAxios(axios).put(stockTradingServiceBaseUrlUrl + '/watchlist/delete-stock',
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    setShowSpinner(false);
                    displaySuccessModal();
                    setApiSuccessMsg(response.data.message);
                })
                .catch(function (error) {
                });
        }
    }

    function displaySuccessModal() {
        setShowModalBG(true);
        setShowSuccessModal(true);
        setShowCreateWatchlistModal(false);
        setShowRemoveStockModal(false);
    }

    function displayRemoveStockModal(event: any) {
        setShowModalBG(true);
        setShowRemoveStockModal(true);
        setShowSuccessModal(false);
        setShowCreateWatchlistModal(false);
        setStockSymbol(event.target.getAttribute("data-symbol"))
    }

    function compareNotificationLogsDate(a :any, b :any) {
        const dateA = a.createdOn.toUpperCase();
        const dateB = b.createdOn.toUpperCase();
        
        let comparison = 0;

        if (dateA < dateB) {
            comparison = 1;
        } else if (dateA > dateB) {
            comparison = -1;
        }

        return comparison;
    }

    function displayDeleteModal(event: any) {

        let deleteId =  event.target.getAttribute("data-value");

        setPriceAlertId(deleteId);

        setShowModalBG(true);

        setShowDeleteModal(true);
    }

    const deletePriceAlert = () => {
        setShowSpinner(true);

        getAxios(axios).delete(stockTradingServiceBaseUrlUrl + '/stock/price-triggers/'+priceAlertId)
        .then((response) => {
            setShowModalBG(true);
            setShowSuccessModal(false);
            setApiResponseSuccessMsg("Price alert deleted successfully.")
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

   

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <div className="text-3xl mb-3">
                                        <span className="font-bold text-green-900">My Watchlist</span>
                                    </div>

                                    <div className="text-sm font-bold text-color-2 mb-8">Overview of your favourite stocks</div>
                                </div>

                                <div>
                                    <button type='button' onClick={displayCreateWatchlistModal} className='hidden focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer rounded bg-green-900 text-white font-bold px-10 py-3 border-0'>Create Watchlist</button>
                                </div>
                            </div>

                            {/*Quick Search*/}
                            <div className="mb-11">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="border_1 flex rounded-lg p-02rem">
                                            <div className=''>
                                                <button onClick={performSwitchToAll} type='button' className={switchToAll ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>All</button>
                                            </div>

                                            <div className=''>
                                                <button onClick={performSwitchToAlert} type='button' className={switchToAlert ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Alerts</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='hidden'>
                                        <div className="flex space-x-3">
                                            <div>
                                                <Link to="/trade" className='no-underline text-green-900'>
                                                    <button type="button" className="border-0 rounded-lg py-2 px-3 button-filter  cursor-pointer">
                                                        <img src={SlidersIcon} alt="" />
                                                    </button>
                                                </Link>
                                            </div>

                                            <div className="w-80 right-0 flex border_1 rounded-lg pr-3 bg-white">
                                                <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                                <div className='w-full'>
                                                    <input type="text" className="outline-white p-2 input border-0" placeholder="Quick search" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}

                            {/*watchlist section*/}
                            <div className={switchToAll ? '':'hidden'}>
                                <div className='shadow-sm sm:rounded-lg'>
                                    <table className="table-fixed w-full border-0 text-sm text-left text-gray-500 mb-11" cellSpacing={0}>
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
                                            {watchlistData.length === 0 ? 'No stocks in your watchlist.' : watchlistData.map((item: any, index: number) =>
                                                <tr key={index} className="bg-white">
                                                    
                                                    <td className='px-3 py-4 table-border-bottom'>
                                                        <img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" width={30}/>
                                                    </td>

                                                    <td className='px-3 py-4 table-border-bottom font-bold text-black'>{item.symbol}</td>

                                                    <td className='px-3 py-4 table-border-bottom font-bold text-black'>{item.name}</td>

                                                    <td className='px-3 py-4 table-border-bottom font-bold text-black'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.currentPrice)}</td>

                                                    <td className={item.percentageChangeSinceAdded >= 0 ? 'px-3 py-4 table-border-bottom font-bold text-green-500':"px-3 py-4 table-border-bottom font-bold text-red-500"}> {HelperFunctions.formatCurrencyWithDecimal(item.percentageChangeSinceAdded)}%  </td>

                                                    <td className='px-3 py-4 table-border-bottom'>

                                                        <button onClick={displayRemoveStockModal} type='button' className="py-3 px-5 border-0 font-bold text-red-500 cursor-pointer bg-transparent mr-5" data-symbol={item.name}>Remove</button>

                                                        <Link to={"/stock?name=" + item.name + "&symbol=" + item.name + "&sign=" + (item.percentageChangeSinceAdded >= 0 ? 'positive' : 'negative') + "&currentPrice=" + item.currentPrice + "&tradeAction=buy"}>
                                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Alert section*/}
                            <div className={switchToAlert ? '':'hidden'}>
                                {priceAlerts.length === 0 ? 'No price alerts added.' : priceAlerts.sort(compareNotificationLogsDate).map((item: any, index: number) =>
                                    <div className="card-15px mb-3" key={index}>
                                        <div className="flex justify-between items-center">
                                            <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" /></div>

                                            <div className="font-bold text-sm">{item.symbol}</div>

                                            <div className="text-sm font-bold text-right">₦ {HelperFunctions.formatCurrencyWithDecimal(item.value)}</div> 

                                            <div className="text-sm text-right">{moment(item.createdOn).format("Do MMM, YYYY hh:mm")}</div> 

                                            <div className="">
                                                <button data-value={item.triggerId} onClick={displayDeleteModal} className='bg-red-500 text-white border-0 cursor-pointer font-bold px-5 py-3 rounded-lg'>Delete</button>
                                            </div>                                            
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/*End*/}

                            {/*Pagination section*/}
                            <div className={switchToAll ? '':'hidden'}>
                            <Pagination                                
                                currentPage={currentPage}
                                totalCount={watchListStocks.length}
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

            {/*Create Watchlist Modal*/}
            <div className={showCreateWatchlistModal ? "create-portfolio-modal" : "create-portfolio-modal hidden"}>
                <div className="mb-20 flex justify-between">
                    <div className="font-bold text-25 opacity-0">Top Losers</div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div>
                    <div className="text-3xl font-bold mb-30">Create New Watchlist</div>

                    <form>
                        <div>
                            <div className="mb-10">Name</div>
                            <div className="mb-30">
                                <input value={watchList} onChange={e => setWatchList(e.target.value)} type="text" className="text-xl outline-white input-xsm p-3" />
                            </div>

                            <div className="flex space-x-5">
                                <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Cancel</button>

                                <button onClick={createWatchlist} className={watchlistIsNullOrEmpty ? "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer" : "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer"} type='button' >
                                    <span className={showSpinner ? "hidden" : ""}>Create</span>
                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/*End */}

            <div className={showRemoveStockModal ? "removeStock-modal" : "removeStock-modal hidden"}>
                <div className='text-center mb-10'><img src={RemoveStockIcon} alt="" /></div>
                <div className='text-center text-3xl font-gotham-black-regular mb-10'>Remove Stocks</div>
                <div className='text-center mb-30 text-sm leading-5'>
                    Are you sure you want to remove this stocks from your watchlist?
                </div>

                <div className='flex space-x-3'>
                    <button onClick={closeModal} type='button' className='cursor-pointer w-40 rounded-lg border-0 bg-gray-300 text-24 p-3 font-bold'>Cancel</button>

                    <button onClick={removeStockFromWatchlist} type='button' className='cursor-pointer rounded-lg border-0 bg-green-900 text-white text-24 p-3 font-bold w-96'>
                        <span className={showSpinner ? "hidden" : ""}>Confirm</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                    </button>
                </div>
            </div>

            {/* Delete Modal */}
            <div className={showDeleteModal ? "success-modal rounded-lg" : "hidden"}>
                <div className="mb-3 flex justify-between">
                    <div className="font-bold text-3xl text-green-900 font-gotham-black-regular"></div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div>
                    {/* Delete Success */}
                    <div className={isDeleteSuccess ? "otp-alert mb-5" : "hidden"}>
                        <div className="otp-validated p-3">
                            <div className="text-sm text-green-900">{apiResponseSuccessMsg}</div>
                        </div>
                    </div>
                    {/* End */}

                    {/* Delete Error */}
                    <div className={apiResponseHasError ? "error-alert mb-5" : "hidden"}>
                        <div className="p-3">
                                <div className="text-sm">{apiResponseErrorMsg}</div>
                        </div>
                    </div>
                    {/* End */}

                    <div className='text-center mb-3'>
                        <img src={DeleteCardIcon} alt='' />
                    </div>

                    <div className='text-red-500 font-bold text-3xl text-center mb-11'>Delete this price alert</div>           
                    

                </div>

                <div className="flex space-x-5">
                    <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                    <button onClick={deletePriceAlert} type="button" className="py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer">
                        <span className={showSpinner ? "hidden" : ""}>Delete</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                    </button>
                </div>
            </div>
            {/* End */}

            <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
                <div className="mx-auto h-64 relative">
                    <img src={SuccessIcon} alt="success icon" className="w-96" />
                    <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                </div>

                <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                <div className="text-color-4 text-sm text-center mb-14">{apiSuccessMsg}</div>

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

export default Watchlist;