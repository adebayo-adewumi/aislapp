import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import '../../components/Sidebar/index.scss'

const Sidebar = (props :any) => {    

    const [, setURLPath] = useState('/dashboard');
    const [, setShowSidebar] = useState('hide');

    let routePath = useLocation().pathname;

    //const regex = new RegExp('/account/*');

    useEffect(()=>{

        async function getURLPath(){           

            setURLPath(routePath);
        }

        getURLPath();
    });

    useEffect(()=>{

        function toggleSidebar(){ 
            setInterval(()=>{
                setShowSidebar(localStorage.getItem("aislToggleSidebar") as string);
            },100);
        }

        toggleSidebar();
    });


    return (

        <div className="fixed z-30 inset-y-0 left-0 w-64 px-8 py-4 bg-gray-100 border-r overflow-y-auto lg:inset-auto lg:static lg:translate-x-0 -translate-x-full ease-in transition-medium"> 
            <nav>  
                <div className="mt-12">
                    <a href="https://merchant.payflexi.co/" className="-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-indigo-100 menu-link">
                        <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 transition-all ease-out transition-medium">
                                <path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5h3a1 1 0 00.83-.45L10 8.8l5.17 7.75a1 1 0 001.66 0l1.7-2.55H21z" className="ic-sec"></path> 

                                <path d="M21 12h-3a1 1 0 00-.83.45L16 14.2l-5.17-7.75a1 1 0 00-1.66 0L5.47 12H3V5c0-1.1.9-2 2-2h14a2 2 0 012 2v7z" className="ic-pri"></path> 
                            </svg> 
                            
                            <span className="ml-2 text-gray-700">Dashboard</span>
                        </span>
                    </a>
                    
                    <a  href="https://merchant.payflexi.co/orders" className="-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-indigo-100 menu-link">
                        <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 transition-all ease-out transition-medium">
                                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm11 4a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z" className="ic-pri"></path> 
                                
                                <path d="M8 11a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm4-2a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" className="ic-sec"></path> 
                            </svg> 
                            
                            <span className="ml-2 text-gray-700">Orders</span>
                        </span>
                    </a>

                    <a  href="https://merchant.payflexi.co/customers" className="-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-indigo-100 menu-link">
                        <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 transition-all ease-out transition-medium">
                                <path d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3zM7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" className="ic-pri"></path> 
                                
                                <path d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z" className="ic-sec"></path>
                            </svg> 
                            
                            <span className="ml-2 text-gray-700">Customers</span>
                        </span>
                    </a>
                    
                    <a  href="https://merchant.payflexi.co/transactions" className="-mx-3 px-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-indigo-100 menu-link">
                        <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 transition-all ease-out transition-medium">
                                <path d="M2.6 6.09l9-4a1 1 0 0 1 .8 0l9 4a1 1 0 0 1 0 1.82l-9 4a1 1 0 0 1-.8 0l-9-4a1 1 0 0 1 0-1.82z" className="ic-pri"></path> 
                                
                                <path d="M3.91 10.5l7.68 3.41a1 1 0 0 0 .82 0l7.68-3.41 1.32.59a1 1 0 0 1 0 1.82l-9 4a1 1 0 0 1-.82 0l-9-4a1 1 0 0 1 0-1.82l1.32-.59zm0 5l7.68 3.41a1 1 0 0 0 .82 0l7.68-3.41 1.32.59a1 1 0 0 1 0 1.82l-9 4a1 1 0 0 1-.82 0l-9-4a1 1 0 0 1 0-1.82l1.32-.59z" className="ic-sec"></path> 
                            </svg> 
                            
                            <span className="ml-2 text-gray-700">Transactions</span>
                        </span>
                    </a>
                </div>   
            </nav>  
        </div>
    );
};

export default Sidebar;