import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../../components/Sidebar/index.scss'

const AdminSidebar = (props :any) => {    

    const [urlPath, setURLPath] = useState('/dashboard');
    const [showSidebar, setShowSidebar] = useState('hide');

    let routePath = useLocation().pathname;

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
        <div className={showSidebar === 'show' ? "sidebar fixed block md:block h-full lg:inset-auto lg:static lg:translate-x-0 translate-x-0 ease-out transition-medium":"sidebar fixed h-full hidden md:block lg:inset-auto lg:static lg:translate-x-0 -translate-x-full ease-in transition-medium"}>
            <ul>
                <li className="space-x-5">
                    <Link to='/admin/learn/create' className={ urlPath === '/admin/learn/create' ? "items-center active w-full no-underline text-green-900" : "w-full no-underline text-gray-700 items-center"}>                         
                        <div className="w-full">Create a Resource</div>
                    </Link>
                </li>

                <li className="space-x-5">
                    <Link to="/admin/learn/resources" className={ urlPath === '/admin/learn/resources' ? "items-center active w-full no-underline text-green-900" : "w-full no-underline text-gray-700 items-center"}>
                        
                        <div className=" w-full">Learn Resources</div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;