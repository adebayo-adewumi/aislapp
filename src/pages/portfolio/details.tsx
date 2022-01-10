import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import '../portfolio/index.scss';
import logo from '../../assets/images/anchoria.svg';
import notification from '../../assets/images/notification.svg';
import chevronDown from '../../assets/images/chevron-down.svg';
import SuccessIcon from '../../assets/images/success.gif';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import DangoteIcon from '../../assets/images/dangote.svg';
import CloseIcon from '../../assets/images/close.svg';
import BriefcaseIcon from '../../assets/images/briefcase.svg';
import SaveTagIcon from '../../assets/images/save-tag.svg';
import ChartIcon from '../../assets/images/chart.svg';
import Accordion  from 'react-bootstrap/Accordion';
import Form  from 'react-bootstrap/Form';
import SpinnerHolderIcon  from '../../assets/images/spinner-holder.svg';
import SpinnerIcon  from '../../assets/images/spinner.gif';
import Chart from "react-apexcharts";
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const PortfolioDetails = () => {

    const [showAddNewStockModal, setShowAddNewStockModal] = useState<boolean>(false);
    const [showPortfolioListModal, setShowPortfolioListModal] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [showloader, setShowLoader] = useState<boolean>(false);
    const [apiResponseHasError, setApiResponseHasError] = useState<boolean>(false);

    let options = {
        chart: {
          toolbar:{
              show: false
          }
        },
        xaxis: {
            categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            tooltip:{
                enabled: false
            }
        },
        markers:{
            colors: ['#A41856'],
            strokeColors: '#00C48C',
            strokeWidth: 4
        },
        fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
              //colorStops: ['#A0F2DB', 'rgba(187, 230, 217, 0)']
              colorStops: [
                [
                    {
                      offset: 0,
                      color: '#A0F2DB',
                      opacity: 1
                    },
                    {
                      offset: 100,
                      color: 'rgba(187, 230, 217, 0)',
                      opacity: 1
                    }
                  ],
              ]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            colors: ['#3BC359']
        },
        grid:{
            show: true,
            borderColor: '#F3F4F6 '
        },
        tooltip:{
            followCursor: false
        }

    };
    
    let series = [
        {
          name: "series-1",
          data: [45, 52, 38, 45, 19, 23, 2, 45, 52, 38, 45, 19]
        }
    ];

    let params = useParams();

    useEffect(() => {

        function getPortfolioDetails(){
            

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}
    
            axios.get('http://34.252.87.56:7933/portfolio/details?customerId='+localStorage.getItem('aislUserCustomerId')+'&portfolioId='+params.portfolioId, { headers })
            .then(function (response) {
                console.log(response.data.data);
            })
            .catch(function (error) {
    
                console.log(apiResponseHasError);
    
                setApiResponseHasError(true);
    
                setTimeout(()=>{
                    setApiResponseHasError(false);
                },3000);
            });
        }

        getPortfolioDetails();
    });

    function displayAddNewStockModal(){
        setShowModalBG(true);
        setShowAddNewStockModal(true);
        setShowPortfolioListModal(false);
        setShowSuccessModal(false);
        setShowLoader(false);
        setShowSuccessModal(false);
    }

    function displayPortfolioListModal(){
        setShowModalBG(true);
        setShowAddNewStockModal(false);
        setShowPortfolioListModal(true);
        setShowSuccessModal(false);
        setShowLoader(false);
        setShowSuccessModal(false);
    }

    function closeModal(){
        setShowModalBG(false);
        setShowAddNewStockModal(false);
        setShowPortfolioListModal(false);
        setShowLoader(false);
        setShowSuccessModal(false);
    }

    function displaySuccessModal(){
        setShowModalBG(true);
        setShowAddNewStockModal(false);
        setShowPortfolioListModal(true);
        setShowLoader(true);

        setTimeout(()=> {
            setShowLoader(false);
            setShowPortfolioListModal(false);
            setShowSuccessModal(true);
        },2000);        
    }
    

    return (
        <div className="relative">
            <div className="topbar py-3 pl-4 pr-20 z-10">
                <div className="flex justify-between">
                    <div>
                        <div className="logo-container">
                            <img className="user-area-logo" src={logo} alt="Anchoria Logo" width="120" />
                        </div>
                    </div>

                    <div>
                        <div className="flex space-x-8">
                            <div className="pt-2"><img src={notification} alt="bell" /></div>
                            <div>
                                <div className="flex space-x-4">
                                    <div className="pt-1">
                                        <img src="https://ui-avatars.com/api/?name=Adebayo+Adewunmi&amp;color=FFFFFF&amp;background=144A22" className="rounded-full h-10 w-10" alt=''/>
                                    </div>

                                    <div className="font-bold text-color-1 pt-4">Adebayo Adewunmi</div>

                                    <div className="pt-4">
                                        <img src={chevronDown} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-20">
                            <span className="font-bold text-color-1">Portfolio Details</span>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-12">
                            Overview of portfolio performance
                        </div>
                        
                        <div className='mb-12'>
                            <div className='flex space-x-10'>
                                <div>
                                    <div className='mb-10'>Portfolio Name</div>
                                    <div className='font-bold'>Equity Investments</div>
                                </div>

                                <div>
                                    <div className='mb-10'>Date Created</div>
                                    <div className='font-bold'>03/12/2021</div>
                                </div>
                            </div>
                        </div>

                        <div className='mb-12'>
                            <div className='card-black w-1/2 flex justify-between'>
                                <div className='text-white'>
                                    <div className='mb-10'>Total Portfolio Value</div>
                                    <div className='font-bold text-28'>₦ 5,000,000.00</div>
                                </div>

                                <div className='text-white'>
                                    <div className='mb-10'>Portfolio Returns</div>
                                    <div className='font-bold text-28 mb-10'>
                                        <img src={ArrowUpIcon} alt="" width="30" className="align-middle mr-3" /> 
                                        <span>₦ 40,000.00</span>
                                    </div>
                                    <div>
                                        <span className='text-green-500'>5.55%</span>  <span className='text-white'>7days</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mb-30'>
                            <div className='card'>
                                <div className='mb-30'>
                                    <div className='flex justify-between items-center'>
                                        <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>Portfolio Performance</div>
                                        <div className='w-1/2 flex bg-gray-300 p-1 rounded justify-between'>
                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1D</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1W</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1M</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>3M</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>6M</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1Y</button>
                                        </div>
                                    </div>
                                    
                                    <div className='text-lg '>Portfolio Value</div>
                                    <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>₦ 5,000,000.00</div>
                                </div>

                                <div>
                                    {/* <Line options={options} data={data} id='canvas'/> */}
                                    <Chart options={options} series={series} type="area" height='400'/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-30">
                            <div className="flex justify-between items-center">
                                <div className="text-lg font-gotham-black-regular">My Assest</div>
                                <div className='flex space-x-3'>
                                    <button className="cursor-pointer bg-gray-300 rounded-lg border-0 py-3 px-5 font-bold focus:shadow-outline" type='button'>
                                    Move stocks
                                    </button>

                                    <button onClick={displayAddNewStockModal} className="cursor-pointer bgcolor-1 rounded-lg text-white border-0 py-3 px-3 font-bold focus:shadow-outline" type='button'>
                                    Add New Stocks
                                    </button>

                                    <select className='rounded-lg border-gray-300 font-bold p-3'>
                                        <option>Filter by: 30 Days</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="card mb-30">
                                <div className="flex justify-between items-center">
                                    <div> <img src={DangoteIcon} alt="" /></div>

                                    <div className="text-color-2">
                                        <div className='font-bold mb-10'>Dangote</div>
                                        <div>Dangote PLC</div>
                                    </div>
                                                                        
                                    <div className="text-color-2">
                                        <div className='mb-10'>Entry Price</div>
                                        <div className='font-bold '>₦ 23.5</div>
                                    </div> 

                                    <div className="text-color-2">
                                        <div className='mb-10'>Current Price</div>
                                        <div className='font-bold '>₦ 23.5</div>
                                    </div> 

                                    <div className="text-color-2">
                                        <div className='mb-10'>Units</div>
                                        <div className='font-bold '>4000</div>
                                    </div>  

                                    <div className="text-color-2">
                                        <div className='mb-10'>Returns</div>
                                        <div className='font-bold '>
                                            <span className='mr-3'>₦ ₦200,000.00</span> 
                                            <span className='text-green-500 '>(10.55%) 30 days</span>
                                        </div>
                                    </div> 

                                    <div>
                                        <Link to="/stock">
                                        <button className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-30">
                                <div className="flex justify-between items-center">
                                    <div> <img src={DangoteIcon} alt="" /></div>

                                    <div className="text-color-2">
                                        <div className='font-bold mb-10'>Dangote</div>
                                        <div>Dangote PLC</div>
                                    </div>
                                                                        
                                    <div className="text-color-2">
                                        <div className='mb-10'>Entry Price</div>
                                        <div className='font-bold '>₦ 23.5</div>
                                    </div> 

                                    <div className="text-color-2">
                                        <div className='mb-10'>Current Price</div>
                                        <div className='font-bold '>₦ 23.5</div>
                                    </div> 

                                    <div className="text-color-2">
                                        <div className='mb-10'>Units</div>
                                        <div className='font-bold '>4000</div>
                                    </div>  

                                    <div className="text-color-2">
                                        <div className='mb-10'>Returns</div>
                                        <div className='font-bold '>
                                            <span className='mr-3'>₦ ₦200,000.00</span> 
                                            <span className='text-green-500 '>(10.55%) 30 days</span>
                                        </div>
                                    </div> 

                                    <div>
                                        <Link to="/stock">
                                        <button className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-30">
                                <div className="flex justify-between items-center">
                                    <div> <img src={DangoteIcon} alt="" /></div>

                                    <div className="text-color-2">
                                        <div className='font-bold mb-10'>Dangote</div>
                                        <div>Dangote PLC</div>
                                    </div>
                                                                        
                                    <div className="text-color-2">
                                        <div className='mb-10'>Entry Price</div>
                                        <div className='font-bold '>₦ 23.5</div>
                                    </div> 

                                    <div className="text-color-2">
                                        <div className='mb-10'>Current Price</div>
                                        <div className='font-bold '>₦ 23.5</div>
                                    </div> 

                                    <div className="text-color-2">
                                        <div className='mb-10'>Units</div>
                                        <div className='font-bold '>4000</div>
                                    </div>  

                                    <div className="text-color-2">
                                        <div className='mb-10'>Returns</div>
                                        <div className='font-bold '>
                                            <span className='mr-3'>₦ ₦200,000.00</span> 
                                            <span className='text-green-500 '>(10.55%) 30 days</span>
                                        </div>
                                    </div> 

                                    <div>
                                        <Link to="/stock">
                                        <button className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={showAddNewStockModal ? "add-stock-modal":"add-stock-modal hidden"}>
                            <div className="mb-20 flex justify-between">
                                <div className="font-bold text-25 opacity-0">Top Losers</div>

                                <div onClick={closeModal}>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                                </div>
                            </div>

                            <div>
                                <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Add new stocks</div>
                                <div className="font-bold mb-30">Choose where you want to add stocks from</div>

                                <div>
                                    <div onClick={displayPortfolioListModal} className='flex space-x-10 selectbox-border p-5 rounded-lg border-1 hover:bg-gray-100 cursor-pointer mb-30'>
                                        <div>
                                            <img src={BriefcaseIcon} alt="" width='50'/>
                                        </div>
                                        <div>
                                            <div className='font-bold mb-10'>Other Portfolio</div>
                                            <div className='text-14'>Move stocks from your list of created portfolio</div>
                                        </div>
                                    </div>

                                    <div className='flex space-x-10 selectbox-border p-5 rounded-lg border-1 hover:bg-gray-100 cursor-pointer mb-30'>                                        
                                        <div>
                                            <Link to='/watchlist' className='no-underline text-gray-900'>
                                                <img src={SaveTagIcon} alt="" width='50'/>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to='/watchlist' className='no-underline text-gray-900'>
                                                <div className='font-bold mb-10'>My Watchlist</div>
                                                <div className='text-14'>Select from your added watchlist</div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='flex space-x-10 selectbox-border p-5 rounded-lg border-1 hover:bg-gray-100 cursor-pointer'>
                                        <div>
                                            <Link to='/watchlist' className='no-underline text-gray-900'>
                                                <img src={ChartIcon} alt="" width='50'/>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to='/watchlist' className='no-underline text-gray-900'>
                                                <div className='font-bold mb-10'>Marketplace</div>
                                                <div className='text-14'>Explore market place and buy a new stocks </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={showPortfolioListModal ? "portfoliolist-modal":"portfoliolist-modal hidden"}>

                            <div className={showloader ? 'absolute w-full z-10 top-1/3':'absolute w-full z-10 top-1/3 hidden'}>
                                <div className='relative text-center w-90pc'>
                                    <img src={SpinnerHolderIcon} alt="" width='120' />
                                    <img src={SpinnerIcon} alt="" width='50' className='absolute left-47pc top-1/4'/>
                                </div>
                            </div>

                            <div>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">
                                            Portfolio List
                                        </div>
                                        <div className="font-bold mb-30">Select the stocks you want to move to a new porfolio</div>
                                    </div>

                                    <div>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer" />
                                    </div>
                                </div>

                                <div>
                                    <Accordion defaultActiveKey="0" className='mb-30'>
                                        <Accordion.Item eventKey="0" className='portfoliolist-accordion'>
                                            <Accordion.Header className='font-gotham-black-regular m-0 portfoliolist-accordion-header font-bold'>Equity Investment</Accordion.Header>
                                            <Accordion.Body>
                                            <div className="portfoliolist-card card mb-30 cursor-pointer">
                                                <div className="flex justify-between items-center text-14">
                                                    <div> <img src={DangoteIcon} alt="" /></div>

                                                    <div className="text-color-2">
                                                        <div className='font-bold mb-10'>Dangote</div>
                                                        <div>Dangote PLC</div>
                                                    </div>

                                                    <div className="text-color-2">
                                                        <div className='mb-10'>Current Price</div>
                                                        <div className='font-bold '>₦ 23.5</div>
                                                    </div> 

                                                    <div className="text-color-2">
                                                        <div className='mb-10'>Units Owned</div>
                                                        <div className='font-bold '>4000</div>
                                                    </div>

                                                    <div>
                                                        <Form.Check type="checkbox" className='portfoliolist-checkbox' />
                                                    </div>
                                                </div>
                                            </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>

                                <div>
                                    <Accordion defaultActiveKey="1" className='mb-30'>
                                        <Accordion.Item eventKey="0" className='portfoliolist-accordion'>
                                            <Accordion.Header className='m-0 portfoliolist-accordion-header font-bold'>Family Investment</Accordion.Header>
                                            <Accordion.Body>
                                            <div className="portfoliolist-card card mb-30 cursor-pointer">
                                                <div className="flex justify-between items-center text-14">
                                                    <div> <img src={DangoteIcon} alt="" /></div>

                                                    <div className="text-color-2">
                                                        <div className='font-bold mb-10'>Dangote</div>
                                                        <div>Dangote PLC</div>
                                                    </div>

                                                    <div className="text-color-2">
                                                        <div className='mb-10'>Current Price</div>
                                                        <div className='font-bold '>₦ 23.5</div>
                                                    </div> 

                                                    <div className="text-color-2">
                                                        <div className='mb-10'>Units Owned</div>
                                                        <div className='font-bold '>4000</div>
                                                    </div>

                                                    <div>
                                                        <Form.Check type="checkbox" className='portfoliolist-checkbox' />
                                                    </div>
                                                </div>
                                            </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>

                                <div className="flex justify-end space-x-5">
                                    <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Cancel</button>

                                    <button onClick={displaySuccessModal} type="button" className="py-4 px-24 font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Add</button>
                                </div>

                            </div>
                        </div>

                        <div className={showSuccess ? "portfolio-success-modal" : "portfolio-success-modal hidden"}>
                            <div className="ml-8 mr-auto w-80 h-64 relative">
                                <img src={SuccessIcon} alt="success icon" className="w-96"/>
                                <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                            </div>

                            <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>

                            <div className="text-color-4 text-16 text-center mb-14">Your portfolio has been successfully created</div>

                            <div className="flex space-x-5 mb-30">
                                <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                                <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
                            </div>
                        </div>

                        <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
                        </div>

                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetails;