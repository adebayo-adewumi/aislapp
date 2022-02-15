import React from 'react';
import {Link} from "react-router-dom";
import '../stock/index.scss';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import CementFactory from '../../assets/images/cement-factory.jpg';
import Refinery from '../../assets/images/refinery.jpg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import moment from 'moment';

const NewsDetails = () => {
    document.title = "Stock News Details - Anchoria";

    let queryParams = new URLSearchParams(window.location.search);
    
    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                   <Sidebar />

                    <div className="main-content w-full p-10 mb-30">
                        <div className="mb-10 pb-5">
                            <div className="flex justify-between items-center">
                                <div className="text-28 font-bold text-color-1 font-gotham-black-regular">News Details</div>
                                <div className="font-bold">
                                    <Link to="/news" className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" /> Go to News
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="border-bottom-1d mb-30"></div>

                        <div className='mt-12'>
                            <div className='mx-auto w-2/3'>
                                <div className='mb-30 w-full font-bold font-gotham-black-regular text-xl'>{queryParams.get("title")}</div>

                                <div className='w-full mb-10'>
                                    <img src={queryParams.get("imageUrl") as string} alt="" />
                                </div>

                                <div className='font-bold text-sm'>Author: {queryParams.get("author")}</div>
                                <div className='font-bold text-sm text-gray-500'>{moment(queryParams.get("date")).format("Do MMM YYYY hh:mm A")}</div>

                                <div className='leading-8 py-6 break-words' style={{width: "730px"}}>
                                    <p>{queryParams.get("snippet")}</p>                                    
                                </div>

                                <div className='mt-5 hidden'>
                                    <div className='font-gotham-black-regular font-bold text-xl mb-20'>More News</div>

                                    <div className='flex justify-between mb-12'>
                                        <div>
                                            <div className='mb-20'><img src={CementFactory} alt=''/></div>
                                            <div className='w-22rem'>
                                                <div className='font-bold mb-10 text-14 w-6/6'>Dangote Cement posts nine months’ impressive sales volume</div>
                                                <div className='mb-10 text-13 tracking-wider leading-5'>Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months.</div>
                                                <div className='font-bold text-13'>&middot; 27 Aug, 2020</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='mb-20'><img src={Refinery} alt=''/></div>
                                            <div className='w-22rem'>
                                                <div className='font-bold mb-10 text-14 w-6/6'>Dangote Cement posts nine months’ impressive sales volume</div>
                                                <div className='mb-10 text-13 tracking-wider leading-5'>Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months.</div>
                                                <div className='font-bold text-13'>&middot; 27 Aug, 2020</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>                  
                </div>
            </div>

            
        </div>
    );
};

export default NewsDetails;