import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import '../dashboard/index.scss';
import DangoteIcon from '../../assets/images/dangote.svg';
import CadburyIcon from '../../assets/images/cadbury.svg';
import SearchIcon from '../../assets/images/search.svg';
import Sidebar from '../../components/Sidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import StarIcon from '../../assets/images/star.svg';
import * as HelperFunctions from '../../lib/helper';
import axios from 'axios';
import { stockTradingServiceBaseUrlUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';

const QuickSearch = () => {
    document.title = "Qucik Search - Anchoria";

    let queryParams = new URLSearchParams(window.location.search);

    const [stocksListStore, setStocksListStore] = useState<{[key: string] : []}>({});
    const [, setStocksList] = useState([]);
    const [stockKeys, setStockKeys] = useState([]);
    const [, setStockFilter] = useState([]);

    const [, setShowPageLoader] = useState<boolean>(true);
    const [, setShowFilteredStocks] = useState<boolean>(false);

    useEffect(() => {
        HelperFunctions.addOverflowAndPaddingToModalBody();


        async function getStocks(){
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/stock')
            .then(function (response) {              

                setStocksListStore(response.data.data);
                setStockKeys(Object.keys(response.data.data) as []);
                setStocksList(Object.values(response.data.data) as []);

                localStorage.setItem("aislStocksList", JSON.stringify(response.data.data));

                setShowPageLoader(false);
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
            })
            .catch(function (error) {    
                //;
            });            
        }

        getStocks();
    },[]);  

    function filterStocksByCategory(event :any){

        if(event === "All"){
            setShowFilteredStocks(false);
        }
        else{
            setStockFilter(stocksListStore[event]);
            setShowFilteredStocks(true);
        }
    }


    return (
        <div className="relative">
           <UserAreaHeader / >
               
            <div>
                <div className="flex">
                    <Sidebar />   

                    <div className="main-content w-full p-10">
                        <div className="text-3xl mb-20">
                            <span className="font-bold text-green-900">Quick search</span>
                        </div>

                        <div className="text-sm font-bold text-color-2 mb-30">
                        Find a stock
                        </div>

                        <div>
                            <div className="items-center flex border_1 rounded-lg pr-3 bg-white mb-20">
                                <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                <div className="w-full">
                                    <input type="text" className="input p-2 w-full border-0" placeholder="Quick search" value={queryParams.get("search") as string}/>
                                </div>
                            </div>
                        </div>

                        {/*Categories*/}
                        <div className="mb-12">
                            <div className="flex justify-between">
                                <div className=''>
                                    <button className="hidden py-3 px-6 border-0 bg-transparent font-bold">Filter:</button>
                                    <select className='outline-white cursor-pointer p-3 rounded-lg border border-gray-300 font-bold' onChange={e => filterStocksByCategory(e.target.value)}>
                                        <option value="All">All</option>
                                        {stockKeys.map((item :any)=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>

                                <div className="relative">
                                    <div className="absolute hidden w-80 right-0 flex border_1 rounded-lg pr-3 bg-white mb-20">
                                        <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                        <div className='w-full'>
                                            <input type="text" className="outline-white p-2 input border-0" placeholder="Search for stocks"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End*/}

                        {/* Recent Search */}
                        <div className='hidden'>
                            <div className="mb-20">
                                <div className="text-color-2 font-bold mb-20">Recent searches</div>
                            </div>

                            <div className="w-full mb-14">
                                <div className="flex justify-between space-x-5 overflow-x-scroll pr-12">
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-sm">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-sm">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-sm">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-sm">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-sm">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-sm">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-sm">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-sm">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-sm">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-sm">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-sm">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-sm">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/*Card section*/}
                        <div>
                            <div className="mb-20">
                                <div className="text-color-2 font-bold mb-20">Search result</div>
                            </div>

                            <div className="card-15px mb-20">
                                <div className="flex justify-between items-center">
                                    <div> <img src={DangoteIcon} alt="" /></div>

                                    <div className="font-bold text-color-2">Dangote</div>

                                    <div className="">Dangote PLC</div>

                                    <div className="font-bold text-color-2 text-right">₦ 23.5</div>

                                    <div className="text-green-500 font-bold"> (10.55%) 24hr  </div>

                                    <div className='flex justify-between space-x-2'>
                                        <Link to="/stock">
                                            <button type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer">
                                                <img src={StarIcon} width='20' alt=''/>
                                            </button>
                                        </Link>

                                        <Link to="/stock">
                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End*/}

                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default QuickSearch;