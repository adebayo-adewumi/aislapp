import React, {useState} from 'react';
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

const TradeConfirmations = () => {
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showRemoveStockModal, setShowRemoveStockModal] = useState<boolean>(false);

    const [switchToAll, setSwitchToAll] = useState<boolean>(true);
    const [switchToPurchase, setSwitchToPurchase] = useState<boolean>(false);
    const [switchToSell, setSwitchToSell] = useState<boolean>(false);

    function performSwitchToAll(){
        setSwitchToAll(true);
        setSwitchToPurchase(false);
        setSwitchToSell(false);
    }

    function performSwitchToPurchase(){
        setSwitchToAll(false);
        setSwitchToPurchase(true);
        setSwitchToSell(false);
    }

    function performSwitchToSell(){
        setSwitchToAll(false);
        setSwitchToPurchase(false);
        setSwitchToSell(true);
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

                        {/*Quick Search*/}
                        <div className="mb-20">
                            <div className="flex justify-between">
                                <div>
                                    <div className="border_1 flex rounded-lg p-02rem">
                                        <div>
                                            <button onClick={performSwitchToAll} type='button' className={switchToAll ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>All</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToPurchase} type='button' className={switchToPurchase ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Purchase</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToSell} type='button' className={switchToSell ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Sell Orders</button>
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
                            <div className="card mb-20 text-14">
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-color-2 opacity-0">Blank</div>
                                    <div className="font-bold text-color-2">Stock Name</div>
                                    <div className="font-bold text-color-2">Side</div>
                                    <div className="font-bold text-color-2">Qty</div>
                                    <div className="font-bold text-color-2">Amount Name</div>
                                    <div className="font-bold text-color-2">Status</div>
                                    <div className="font-bold text-color-2">Date/Time</div>
                                    <div className="font-bold text-color-2 opacity-0">Blank</div>
                                </div>
                            </div>

                            {/*All Section*/}
                            <div className={switchToAll ? '':'hidden'}>
                                <div className="card-15px mb-20 text-14">
                                    <div className="flex justify-between items-center">
                                        <div> <img src={AtlasIcon} alt="" /></div>

                                        <div className="font-bold text-color-2">Atlas</div>

                                        <div className="font-bold">Buy</div>
                                        <div className="font-bold">1000</div>
                                        <div className="font-bold">₦60,000.00</div>
                                        <div className="font-bold text-green-400">Successful</div>
                                        <div className="font-bold">05 Dec, 2021 | 2:00pm </div>

                                        <div className='flex justify-between space-x-2'>
                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">More</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-15px mb-20 text-14">
                                    <div className="flex justify-between items-center">
                                        <div> <img src={AppleIcon} alt="" /></div>

                                        <div className="font-bold text-color-2">APPL</div>

                                        <div className="font-bold">Sell</div>
                                        <div className="font-bold">1000</div>
                                        <div className="font-bold">₦60,000.00</div>
                                        <div className="font-bold text-red-400">Failed</div>
                                        <div className="font-bold">05 Dec, 2021 | 2:00pm </div>

                                        <div className='flex justify-between space-x-2'>
                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Purchase Section*/}
                            <div className={switchToPurchase ? '':'hidden'}>
                                <div className="card-15px mb-20 text-14">
                                    <div className="flex justify-between items-center">
                                        <div> <img src={AtlasIcon} alt="" /></div>

                                        <div className="font-bold text-color-2">Atlas</div>

                                        <div className="font-bold">Buy</div>
                                        <div className="font-bold">1000</div>
                                        <div className="font-bold">₦60,000.00</div>
                                        <div className="font-bold text-green-400">Successful</div>
                                        <div className="font-bold">05 Dec, 2021 | 2:00pm </div>

                                        <div className='flex justify-between space-x-2'>
                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">More</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-15px mb-20 text-14">
                                    <div className="flex justify-between items-center">
                                        <div> <img src={AppleIcon} alt="" /></div>

                                        <div className="font-bold text-color-2">APPL</div>

                                        <div className="font-bold">Buy</div>
                                        <div className="font-bold">1000</div>
                                        <div className="font-bold">₦60,000.00</div>
                                        <div className="font-bold text-red-400">Failed</div>
                                        <div className="font-bold">05 Dec, 2021 | 2:00pm </div>

                                        <div className='flex justify-between space-x-2'>
                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Sell Section*/}
                            <div className={switchToSell ? '':'hidden'}>
                                <div className="card-15px mb-20 text-14">
                                    <div className="flex justify-between items-center">
                                        <div> <img src={AtlasIcon} alt="" /></div>

                                        <div className="font-bold text-color-2">Atlas</div>

                                        <div className="font-bold">Sell</div>
                                        <div className="font-bold">1000</div>
                                        <div className="font-bold">₦60,000.00</div>
                                        <div className="font-bold text-green-400">Successful</div>
                                        <div className="font-bold">05 Dec, 2021 | 2:00pm </div>

                                        <div className='flex justify-between space-x-2'>
                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">More</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-15px mb-20 text-14">
                                    <div className="flex justify-between items-center">
                                        <div> <img src={AppleIcon} alt="" /></div>

                                        <div className="font-bold text-color-2">APPL</div>

                                        <div className="font-bold">Sell</div>
                                        <div className="font-bold">1000</div>
                                        <div className="font-bold">₦60,000.00</div>
                                        <div className="font-bold text-red-400">Failed</div>
                                        <div className="font-bold">05 Dec, 2021 | 2:00pm </div>

                                        <div className='flex justify-between space-x-2'>
                                            <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}
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

export default TradeConfirmations;