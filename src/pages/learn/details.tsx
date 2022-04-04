import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import '../stock/index.scss';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import moment from 'moment';
import { getAxios } from '../../network/httpClientWrapper';
import axios from 'axios';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';

const LearnDetails = () => {
    document.title = "Learn Resource Details - Anchoria";

    const { learnId } = useParams<string>();

    const [learnDetails, setLearnDetails] = useState<any[]>([]);

    let queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {

        function getLearnDetails() {            

            getAxios(axios).get(utilityServiceBaseUrlUrl+"/learn/resource/"+learnId)
            .then(function (response) {
                let lDetails :any[] = [];

                lDetails.push(response.data.data);

                setLearnDetails(lDetails);
            })
            .catch(function (error) {

            });
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
                                <div className="text-2xl font-bold text-green-900 font-gotham-black-regular">Learn Resource Details</div>
                                <div className="">
                                    <Link to="/learn" className='text-xl no-underline text-green-900 hover:text-green-900'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" width={20} /> Back
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='mt-12'>
                            <div className={learnDetails.length === 0 ? 'text-lg':'hidden'}>Nothing to display</div>

                            <div className={learnDetails.length > 0 ? '':'hidden'}> 
                                {learnDetails.map((item :any, index :any)=>
                                   <div key={index}>
                                       <div className='mb-3 w-full font-bold text-xl'>{item.title}</div>

                                        <div className='w-full mb-3'>
                                            {item.description}
                                        </div>

                                        <div className='mb-3text-sm'>{item.content}</div>
                                        <div className='mb-3 text-sm'>{item.link}</div>
                                        <div className='mb-3 font-bold text-sm text-gray-500'>{moment(item.createdOn).format("Do MMM, YYYY hh:mm A")}</div>

                                        <div className='leading-8 py-6 break-words' style={{width: "730px"}}>
                                            <p>{queryParams.get("snippet")}</p>                                    
                                        </div>

                                   </div>
                                )}
                            </div>
                        </div>
                    </div>                        
                </div>                  
            </div>

            
        </div>
    );
};

export default LearnDetails;