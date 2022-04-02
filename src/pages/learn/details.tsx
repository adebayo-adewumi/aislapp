import React, { useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import '../stock/index.scss';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import CementFactory from '../../assets/images/cement-factory.jpg';
import Refinery from '../../assets/images/refinery.jpg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import moment from 'moment';
import { getAxios } from '../../network/httpClientWrapper';
import axios from 'axios';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';

const LearnDetails = () => {
    document.title = "Learn Resource Details - Anchoria";

    const { learnId } = useParams<string>();

    let queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {

        function getLearnDetails() {            

            getAxios(axios).get(utilityServiceBaseUrlUrl+"/learn/resource/"+learnId)
            .then(function (response) {
            })
            .catch(function (error) {});
        }  
        
        getLearnDetails();

    },[learnId]);
    
    return (
        <div className="relative">
            <UserAreaHeader />

            <div className="h-screen flex">
                <Sidebar />

                <div className="flex-1 min-w-0 flex flex-col">
                    <div className='px-10 py-24  flex-1 bg-gray-100 overflow-y-auto'>
                        <div className="mb-3 pb-5">
                            <div className="flex justify-between items-center">
                                <div className="text-3xl font-bold text-green-900 font-gotham-black-regular">Learn Resource Details</div>
                                <div className="">
                                    <Link to="/learn" className='text-xl no-underline text-green-900 hover:text-green-900'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                        </div>

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
                                                <div className='font-bold mb-10 text-sm w-6/6'>Dangote Cement posts nine months’ impressive sales volume</div>
                                                <div className='mb-10 text-sm tracking-wider leading-5'>Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months.</div>
                                                <div className='font-bold text-sm'>&middot; 27 Aug, 2020</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='mb-20'><img src={Refinery} alt=''/></div>
                                            <div className='w-22rem'>
                                                <div className='font-bold mb-10 text-sm w-6/6'>Dangote Cement posts nine months’ impressive sales volume</div>
                                                <div className='mb-10 text-sm tracking-wider leading-5'>Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months.</div>
                                                <div className='font-bold text-sm'>&middot; 27 Aug, 2020</div>
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

export default LearnDetails;