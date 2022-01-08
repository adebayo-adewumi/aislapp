import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../watchlist/index.scss';
import DangoteIcon from '../../assets/images/dangote.svg';
import AtlasIcon from '../../assets/images/atlas.svg';
import AppleIcon from '../../assets/images/apple.svg';
import SearchIcon from '../../assets/images/search.svg';
import SlidersIcon from '../../assets/images/sliders.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import RemoveStockIcon from '../../assets/images/remove-stock.svg';
import Sidebar from '../../components/Sidebar';

const Watchlist = () => {
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showRemoveStockModal, setShowRemoveStockModal] = useState<boolean>(false);

    function closeModal(){
        setShowModalBG(false);
        setShowRemoveStockModal(false);
    }

    function displayRemoveStockModal(){
        setShowModalBG(true);
        setShowRemoveStockModal(true);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-10">
                            <span className="font-bold text-color-1">My Watchlist</span>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">Overview of your favourite stocks</div>

                        {/*Quick Search*/}
                        <div className="mb-20">
                            <div className="flex justify-between">
                                <div>
                                    <div className="border_1 flex rounded-lg p-02rem">
                                        <div>
                                            <button type='button' className="rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">All</button>
                                        </div>

                                        <div>
                                            <button type='button' className="cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f">Alerts</button>
                                        </div>
                                    </div>
                                </div>

                                <div>
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
                            <div className="card-15px mb-20 text-14">
                                <div className="flex justify-between items-center">
                                    <div> <img src={DangoteIcon} alt="" /></div>

                                    <div className="font-bold text-color-2">Dangote</div>

                                    <div className="">Dangote PLC</div>

                                    <div className="text-red-500 font-bold"> (10.55%) 24hr  </div>

                                    <div className="font-bold text-color-2 text-right">Added 200 days ago</div>

                                    <div className='flex justify-between space-x-2'>
                                        <button type='button' className="rounded-lg bg-white py-3 px-5 border-0 font-bold text-red-500 cursor-pointer" onClick={displayRemoveStockModal}>Remove</button>

                                        <Link to="/stock">
                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-15px mb-20 text-14">
                                <div className="flex justify-between items-center">
                                    <div> <img src={AtlasIcon} alt="" /></div>

                                    <div className="font-bold text-color-2">Atlas</div>

                                    <div className="">Atlas Limited</div>

                                    <div className="text-red-500 font-bold"> (10.55%) 24hr  </div>

                                    <div className="font-bold text-color-2 text-right">Added 200 days ago</div>

                                    <div className='flex justify-between space-x-2'>
                                        <button type='button' className="rounded-lg bg-white py-3 px-5 border-0 font-bold text-red-500 cursor-pointer" onClick={displayRemoveStockModal}>Remove</button>

                                        <Link to="/stock">
                                        <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-15px mb-20 text-14">
                                <div className="flex justify-between items-center">
                                    <div> <img src={AppleIcon} alt="" /></div>

                                    <div className="font-bold text-color-2">Apple</div>

                                    <div className="">Apple Inc</div>

                                    <div className="text-green-500 font-bold"> (10.55%) 24hr  </div>

                                    <div className="font-bold text-color-2 text-right">Added 200 days ago</div>                     

                                    <div className='flex justify-between space-x-2'>
                                        <button type='button' className="rounded-lg bg-white py-3 px-5 border-0 font-bold text-red-500 cursor-pointer" onClick={displayRemoveStockModal}>Remove</button>

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

export default Watchlist;