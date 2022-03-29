import React, { useEffect, useState} from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';
import axios from 'axios';
import { getAxios } from '../../network/httpClientWrapper';
import moment from 'moment';

const AdminLearnResources = () => {

    document.title = "Admin Learn Resources - Anchoria";

    const[learnResource, setLearnResource] = useState<any[]>([]);
    
    useEffect(()=>{

        function getCustomerKYCStatus() {

            getAxios(axios).get(utilityServiceBaseUrlUrl + '/learn/retrieve-all')
            .then(function (response) {
                setLearnResource(response.data.data);
            })
            .catch(function (error) { });
        }

        getCustomerKYCStatus();

    },[]);

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


    return (
        <div className="relative">

            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <AdminSidebar/>

                     {/* Main Content section */}
                     <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className='pt-5'>

                                <div className='mb-30 rounded-lg border bg-white px-10 pt-5'>                                   
                                    <div className='font-bold text-green-900 text-lg mb-6'>
                                        Learn Resources
                                    </div>

                                    <div className={learnResource.length === 0 ? 'mb-30':'hidden'}>
                                        No learning resource created.
                                    </div>
                                    
                                    <div className={learnResource.length > 0 ? '':'hidden'}>
                                        {learnResource.sort(compareNotificationLogsDate).map((item :any, index :any) =>
                                            <div key={index} className="w-full">
                                                <div className='flex space-x-5 w-full' style={{borderBottom :'1px solid #e5e5e5'}}>
                                                    <div className='py-5' >
                                                        <div className='font-bold mb-3'>{item.title}</div>
                                                        <div className='text-xs mb-3 text-gray-500'>{item.description}</div>
                                                        <div className='text-xs mb-3 text-gray-500'>{item.content.substring(0,150)}...</div>
                                                        <div className='text-xs'>{moment(item.createdOn).format("Do MMM, YYYY hh:mm A")}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>
            
        </div>
    );
};

export default AdminLearnResources;