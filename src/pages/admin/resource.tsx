import React, { useEffect, useState} from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';
import axios from 'axios';
import { getAxios } from '../../network/httpClientWrapper';

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

    },[])


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

                                <div className='mb-30 rounded-lg border bg-white px-10 py-5'>                                   
                                    <div className='font-bold text-green-900 text-lg mb-6'>
                                        Learn Resources
                                    </div>

                                    <div className={learnResource.length === 0 ? '':'hidden'}>
                                        No learning resource created.
                                    </div>
                                    
                                    <div className={learnResource.length > 0 ? '':'hidden'}>
                                        {learnResource.map((item :any, index :any) =>
                                            <div key={index}></div>
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