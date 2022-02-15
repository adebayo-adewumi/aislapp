import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import '../watchlist/index.scss';
import AtlasIcon from '../../assets/images/atlas.svg';
import AppleIcon from '../../assets/images/apple.svg';
import SearchIcon from '../../assets/images/search.svg';
import SlidersIcon from '../../assets/images/sliders.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import RemoveStockIcon from '../../assets/images/remove-stock.svg';
import Sidebar from '../../components/Sidebar';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import axios from 'axios';
import * as HelperFunctions from '../../lib/helper';
import { Form } from 'react-bootstrap';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import moment from 'moment';
import { stockTradingServiceBaseUrlUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';


const TradeConfirmations = () => {
    document.title = "Trade Confirmations - Anchoria";

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showRemoveStockModal, setShowRemoveStockModal] = useState<boolean>(false);

    const [switchToAll, setSwitchToAll] = useState<boolean>(true);
    const [switchToOpen, setSwitchToOpen] = useState<boolean>(false);
    const [switchToExecuted, setSwitchToExecuted] = useState<boolean>(false);
    const [switchToRejected, setSwitchToRejected] = useState<boolean>(false);
    const [switchToCancelled, setSwitchToCancelled] = useState<boolean>(false);
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    const [orderAll, setOrderAll] = useState('');
    const [orderOpen, setOrderOpen] = useState('');
    const [orderExecuted, setOrderExecuted] = useState('');
    const [orderRejected, setOrderRejected] = useState('');
    const [orderCancelled, setOrderCancelled] = useState('');

    useEffect(()=>{
        function getAllOrders(){

            setShowPageLoader(true);
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/all')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                const allOrders = response.data.data.map((item :any, index :any)=>
                <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                    <div className="flex justify-between items-center text-14">
                        <div className='flex-child'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.stockCode}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.name}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{parseInt(item.qty)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                        </div> 

                        <div className="text-color-2 flex-child">
                            <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                        </div> 
                        
                    </div>
                </div>
                );

                setOrderAll(allOrders);

                setShowPageLoader(false);
            })
            .catch(function (error) {
                setShowPageLoader(false);
               
            });
        }

        function getOpenOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/open')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                const openOrders = response.data.data.map((item :any, index :any)=>
                <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                    <div className="flex justify-between items-center text-14">
                        <div className='flex-child'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.stockCode}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.name}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{parseInt(item.qty)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                        </div> 

                        <div className="text-color-2 flex-child">
                            <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                        </div> 
                        
                    </div>
                </div>
                );

                setOrderOpen(openOrders);
            })
            .catch(function (error) {
    
               
            });
        }

        function getExecutedOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/executed')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                const executedOrders = response.data.data.map((item :any, index :any)=>
                <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                    <div className="flex justify-between items-center text-14">
                        <div className='flex-child'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.stockCode}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.name}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{parseInt(item.qty)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                        </div> 

                        <div className="text-color-2 flex-child">
                            <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                        </div> 
                        
                    </div>
                </div>
                );

                setOrderExecuted(executedOrders);
            })
            .catch(function (error) {
    
               
            });
        }

        function getRejectedOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/rejected')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                const rejectedOrders = response.data.data.map((item :any, index :any)=>
                <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                    <div className="flex justify-between items-center text-14">
                        <div className='flex-child'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.stockCode}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.name}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{parseInt(item.qty)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                        </div> 

                        <div className="text-color-2 flex-child">
                            <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                        </div> 
                        
                    </div>
                </div>
                );

                setOrderRejected(rejectedOrders);
            })
            .catch(function (error) {
    
               
            });
        }

        function getCancelledOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/cancelled')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                const cancelledOrders = response.data.data.map((item :any, index :any)=>
                <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                    <div className="flex justify-between items-center text-14">
                        <div className='flex-child'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.stockCode}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold mb-10'>{item.name}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{parseInt(item.qty)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                        </div>

                        <div className="text-color-2 flex-child">
                            <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                        </div> 

                        <div className="text-color-2 flex-child">
                            <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                        </div> 
                        
                    </div>
                </div>
                );

                setOrderCancelled(cancelledOrders);
            })
            .catch(function (error) {
    
               
            });
        }

        getAllOrders();
        getOpenOrders();
        getExecutedOrders();
        getRejectedOrders();
        getCancelledOrders();

    },[])

    function performSwitchToAll(){
        setSwitchToAll(true);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
    }

    function performSwitchToOpen(){
        setSwitchToAll(false);
        setSwitchToOpen(true);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
    }

    function performSwitchToExecuted(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(true);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
    }

    function performSwitchToRejected(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(true);
        setSwitchToCancelled(false);
    }

    function performSwitchToCancelled(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(true);
    }

    function closeModal(){
        setShowModalBG(false);
        setShowRemoveStockModal(false);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10">
                        <div className="flex justify-between mb-10">
                            <div className="font-bold text-color-1 text-28">Trade Confirmations</div>
                            <div className="font-bold">
                                <Link to="/account" className='no-underline text-color-1'>
                                    <img src={ArrowBackIcon} alt="" className="align-middle" /> Back
                                </Link>
                            </div>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">Summary of all your trades</div>

                        {/*Switch Search*/}
                        <div className="mb-20">
                            <div className="flex justify-between">
                                <div>
                                    <div className="border_1 flex rounded-lg p-02rem">
                                        <div>
                                            <button onClick={performSwitchToAll} type='button' className={switchToAll ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>All</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToOpen} type='button' className={switchToOpen ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Open</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToExecuted} type='button' className={switchToExecuted ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Executed</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToRejected} type='button' className={switchToRejected ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Rejected</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToCancelled} type='button' className={switchToCancelled ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Cancelled</button>
                                        </div>
                                    </div>
                                </div>

                                <div className='hidden'>
                                    <div className="flex space-x-3">
                                        <div>
                                            <Link to="/trade" className='no-underline text-color-1'>
                                                <button type="button" className="border-0 rounded-lg py-2 px-3 button-filter  cursor-pointer">
                                                    <img src={SlidersIcon} alt="" />
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="w-80 right-0 flex border_1 rounded-lg pr-3 bg-white">
                                            <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                            <div className='w-full'>
                                                <input type="text" className="outline-white p-2 input border-0" placeholder="Quick search"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End*/}

                        {/*Card section*/}
                        <div>
                            <div className="card mb-20 text-14">
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-color-2 flex-child opacity-0">Blank</div>
                                    <div className="font-bold text-color-2 flex-child">Code</div>
                                    <div className="font-bold text-color-2 flex-child">Name</div>
                                    <div className="font-bold text-color-2 flex-child">Qty</div>
                                    <div className="font-bold text-color-2 flex-child">Amount</div>
                                    <div className="font-bold text-color-2 flex-child">Status</div>
                                    <div className="font-bold text-color-2 flex-child">Date</div>
                                    <div className="font-bold text-color-2 flex-child opacity-0">Blank</div>
                                </div>
                            </div>

                            {/*All Section*/}
                            <div className={switchToAll ? '':'hidden'}>
                                {orderAll}
                            </div>
                            {/*End*/}

                            {/*Open Section*/}
                            <div className={switchToOpen ? '':'hidden'}>
                                {orderOpen}
                            </div>
                            {/*End*/}

                            {/*Executed Section*/}
                            <div className={switchToExecuted ? '':'hidden'}>
                                {orderExecuted}
                            </div>
                            {/*End*/}

                            {/*Rejected Section*/}
                            <div className={switchToRejected ? '':'hidden'}>
                                {orderRejected}
                            </div>
                            {/*End*/}

                            {/*Cancelled Section*/}
                            <div className={switchToCancelled ? '':'hidden'}>
                                {orderCancelled}
                            </div>
                            {/*End*/}
                        </div>
                        {/*End*/}

                        {/*Pagination section*/}
                        <div className='hidden'>
                            <div>
                                <ul className='pagination list-none font-bold flex space-x-2 justify-end cursor-pointer text-13'>
                                    <li className='font-bold text-color-1 rounded-lg'>Previous</li>
                                    <li className='text-color-9 rounded-lg'>1</li>
                                    <li className='text-color-9 rounded-lg'>2</li>
                                    <li className='text-color-9 rounded-lg active'>3</li>
                                    <li className='text-color-9 rounded-lg'>4</li>
                                    <li className='text-color-9 rounded-lg'>5</li>
                                    <li className='font-bold text-color-1 rounded-lg'>Next</li>
                                </ul>
                            </div>
                        </div>
                        {/*End*/}

                        {/* Page Loader Section */}
                        <div className={showPageLoader ? "page-loader-backdrop opacity-90":"hidden"}>
                            <div className='ml-custom w-96 my-custom relative'>
                                <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                                <div className='text-center'><img src={AnchoriaSpinner} alt=""/></div>
                            </div>
                        </div>
                        {/* End */}
                    </div>                    
                </div>
            </div>

            <div className={showRemoveStockModal ? "removeStock-modal" : "removeStock-modal hidden"}>
                <div className='text-center mb-10'><img src={RemoveStockIcon} alt="" /></div>
                <div className='text-center text-28 font-gotham-black-regular mb-10'>Remove Stocks</div>
                <div className='text-center mb-30 text-14 leading-5'>
                Are you sure you want to remove this stocks from your watchlist?
                </div>

                <div className='flex space-x-3'>
                    <button onClick={closeModal} type='button' className='cursor-pointer w-40 rounded-lg border-0 bg-gray-300 text-24 p-3 font-bold'>Cancel</button>

                    <button onClick={closeModal} type='button' className='cursor-pointer rounded-lg border-0 bgcolor-1 text-white text-24 p-3 font-bold w-96'>Confirm</button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40":"modal-backdrop opacity-40 hidden"}>
            </div>
        </div>
    );
};

export default TradeConfirmations;