import React from 'react';
import {Link} from "react-router-dom";
import '../dashboard/index.scss';
import DangoteIcon from '../../assets/images/dangote.svg';
import AtlasIcon from '../../assets/images/atlas.svg';
import AppleIcon from '../../assets/images/apple.svg';
import CadburyIcon from '../../assets/images/cadbury.svg';
import SearchIcon from '../../assets/images/search.svg';
import Sidebar from '../../components/Sidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import StarIcon from '../../assets/images/star.svg';

const QuickSearch = () => {
    return (
        <div className="relative">
           <UserAreaHeader / >
               
            <div>
                <div className="flex">
                    <Sidebar />   

                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-20">
                            <span className="font-bold text-color-1">Quick search</span>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">
                        Find a stock
                        </div>

                        <div>
                            <div className="items-center flex border_1 rounded-lg pr-3 bg-white mb-20">
                                <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                <div className="w-full">
                                    <input type="text" className="input p-2 w-full border-0" placeholder="Quick search"/>
                                </div>
                            </div>
                        </div>

                        <div className='mb-12'>
                            <div className="flex space-x-2 text-12 h-1/3">
                                <div className="quick-search">FCMG</div>
                                <div className="quick-search">Healthcare</div>
                                <div className="quick-search">Oil & Gas</div>
                                <div className="quick-search">Technology</div>
                                <div className="quick-search">Energy</div>
                            </div>
                        </div>

                        {/* Recent Search */}
                        <div>
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

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-xsm">
                                        <Link to='/trade' className='no-underline'>
                                            <div className="mb-10">
                                                <img src={CadburyIcon} alt="" />
                                            </div>

                                            <div className="flex w-full justify-between space-x-5 mb-10 text-14">
                                                <div className="font-bold text-gray-900">Cadbury</div>
                                                <div className="font-bold">₦23.5 </div>
                                            </div>

                                            <div>
                                                <div className="text-green-500 text-13">(10.55%) 1 day</div>
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

                            <div className="card-15px mb-20">
                                <div className="flex justify-between items-center">
                                    <div> <img src={AtlasIcon} alt='atlas icon' /></div>

                                    <div className="font-bold text-color-2">Atlas</div>

                                    <div className="">Atlas Limited</div>

                                    <div className="font-bold text-color-2 text-right">₦ 23.5</div>

                                    <div className="text-green-500 font-bold"> (10.55%) 24hr  </div>

                                    <div className='flex justify-between space-x-2'>
                                        <Link to="/stock">
                                            <button type='button' className="rounded-lg bg-gray-200 py-2 px-5 border-0 font-bold cursor-pointer">
                                                <img src={StarIcon} width='20' alt='' />
                                            </button>
                                        </Link>

                                        <Link to="/stock">
                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-15px mb-20">
                                <div className="flex justify-between items-center">
                                    <div> <img src={AppleIcon} alt="" /></div>

                                    <div className="font-bold text-color-2">Apple</div>

                                    <div className="">Apple Inc</div>

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