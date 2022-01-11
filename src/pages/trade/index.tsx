import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import '../portfolio/index.scss';
import StarIcon from '../../assets/images/star.svg';
import DangoteIcon from '../../assets/images/dangote.svg';
import AtlasIcon from '../../assets/images/atlas.svg';
import AppleIcon from '../../assets/images/apple.svg';
import SearchIcon from '../../assets/images/search.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Trade = () => {

    useEffect(() => {

        async function getStocks(){

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}
    
            axios.get('http://34.252.87.56:7932/stock', { headers })
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {    
                console.log(error);
            });
        }

        getStocks();
    },[]);  

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-10">
                            <span className="font-bold text-color-1">Trade</span>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">Buy stocks on the go</div>

                        {/*Quick Search*/}
                        <div className="mb-20">
                            <div className="flex justify-between">
                                <div>
                                    <button className="rounded-lg bg-green-800 py-3 px-6 border-0 text-white">All</button>
                                    <button className="rounded-lg bg-gray-300 py-3 px-6 border-0 ml-3">FCMG</button>
                                    <button className="rounded-lg bg-gray-300 py-3 px-6 border-0 ml-3">Healthcare</button>
                                    <button className="rounded-lg bg-gray-300 py-3 px-6 border-0 ml-3">Oil & Gas</button>
                                    <button className="rounded-lg bg-gray-300 py-3 px-6 border-0 ml-3">Technology</button>
                                    <button className="rounded-lg bg-gray-300 py-3 px-6 border-0 ml-3">Energy</button>
                                </div>

                                <div className="relative">
                                    <div className="absolute w-80 right-0 flex border_1 rounded-lg pr-3 bg-white mb-20">
                                        <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                        <div className='w-full'>
                                            <input type="text" className="p-2 input border-0" placeholder="Quick search"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End*/}

                        {/*Card section*/}
                        <div>
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

                        {/*Pagination section*/}
                        <div>
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
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default Trade;