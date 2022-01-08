import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../stock/index.scss';
import DangoteIcon from '../../assets/images/dangote.svg';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import StarIcon from '../../assets/images/star.svg';
import CementFactory from '../../assets/images/cement-factory.jpg';
import Refinery from '../../assets/images/refinery.jpg';
import Dangote from '../../assets/images/dangote.jpg';
import CloseIcon from '../../assets/images/close.svg';
import SuccessIcon from '../../assets/images/success.gif';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Form  from 'react-bootstrap/Form';
import Sidebar from '../../components/Sidebar';
import Chart from "react-apexcharts";

const Stock = () => {
    const [showSummary, setShowSummary] = useState<boolean>(true);
    const [showAbout, setShowAbout] = useState<boolean>(false);
    const [showNews, setShowNews] = useState<boolean>(false);
    const [showAddToWatchListModal, setShowAddToWatchListModal] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showHighLow, setShowHighLow] = useState<boolean>(false);
    const [showBuyStockModal, setShowBuyStockModal] = useState<boolean>(false);
    const [showSetPriceAlertModal, setShowSetPriceAlertModal] = useState<boolean>(false);
    const [enablePriceAlert, setEnablePriceAlert] = useState<boolean>(false);

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

    function displaySummary(){
        setShowSummary(true);
        setShowAbout(false);
        setShowNews(false);
    }

    function displayAbout(){
        setShowSummary(false);
        setShowAbout(true);
        setShowNews(false);
    }

    function displayNews(){
        setShowSummary(false);
        setShowAbout(false);
        setShowNews(true);
    }

    function displayAddToWatchListModal(){
        setShowModalBG(true);
        setShowAddToWatchListModal(true);
        setShowSuccessModal(false);
        setShowBuyStockModal(false);
        setShowSetPriceAlertModal(false);
    }

    function displayBuyStockModal(){
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowBuyStockModal(true);
        setShowSuccessModal(false);
        setShowSetPriceAlertModal(false);

    }

    function displaySetPriceAlertModal(){
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowBuyStockModal(false);
        setShowSetPriceAlertModal(true);
        setShowSuccessModal(false);
    }

    function displaySuccessModal(){
        setShowModalBG(true);
        setShowAddToWatchListModal(false);
        setShowSuccessModal(true);
        setShowBuyStockModal(false);
        setShowSetPriceAlertModal(false);
    }

    function toggleEnablePriceAlert(){
        if(enablePriceAlert){
            setEnablePriceAlert(false);
        }
        else{
            setEnablePriceAlert(true);
            displaySetPriceAlertModal();
        }
    }

    function closeModal(){
        setShowModalBG(false);
        setShowAddToWatchListModal(false);
        setShowBuyStockModal(false);
        setShowSetPriceAlertModal(false);
        setShowSuccessModal(false);
    }

    function displayHighLow(){
        setShowHighLow(true);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10 mb-30">
                        <div className="mb-10 pb-5">
                            <div className="flex justify-between items-center">
                                <div className="text-28 font-bold text-color-1 font-gotham-black-regular">Stock Details</div>
                                <div className="font-bold">
                                    <Link to="/trade" className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="border-bottom-1d mb-30"></div> 

                        {/* Company Name section */}
                        <div className='mb-30'>
                            <div className="flex justify-between mb-20">
                                <div>
                                    <img src={DangoteIcon} alt="" className="align-middle" />
                                    <span className="font-bold font-gotham-black-regular mx-3 text-xl">DangCem</span> | 
                                    <span className="font-bold mx-3">Dangote PLC</span> | 
                                    <span className="bg-yellow-500 py-2 px-3 rounded-2xl mx-3 text-14">Manufacturing</span>                                    
                                </div>

                                <div>
                                    <button onClick={displayAddToWatchListModal} className="cursor-pointer focus:shadow-outline rounded-lg bg-gray-300 py-3 px-5 border-0 font-bold" type='button'>
                                        <img src={StarIcon} alt="" className="align-bottom mr-2" width="20"/> 
                                        Add to watchlist
                                    </button>

                                    <button onClick={displayBuyStockModal} className="cursor-pointer focus:shadow-outline text-white rounded-lg bg-green-800 pb-3 pt-4 px-7 border-0 font-bold ml-3" type='button'>
                                        Buy
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <div className="w-3/6">
                                        <div className='mb-6 leading-5'>Dangote Industries Limited is a diversified and fully integrated conglomerate. The Group's interests span a range of sectors in Nigeria and across Africa.</div>

                                        <div className="font-bold flex ">
                                            <div className='mr-3'>Enable price alerts</div>
                                            
                                            <div onClick={toggleEnablePriceAlert} className={enablePriceAlert ? 'flex rounded-3xl p-1 bgcolor-1 ease-in-out transition delay-75 duration-75' : 'flex knob-container rounded-3xl p-1 hover:bg-gray-200 ease-in-out transition delay-75 duration-75'}>
                                                <button className={enablePriceAlert ? "rounded-3xl knob border-0 cursor-pointer opacity-0" : "rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75"} type="button"></button>

                                                <button className={enablePriceAlert ? "ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer ease-in-out transition delay-75 duration-75" : "ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75"} type="button"></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-stock flex justify-between space-x-2 w-96 text-14">
                                        <div className=''>
                                            <div className="mb-5">Units Owned: </div>
                                            <div className="font-gotham-black-regular">2000 </div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        <div className="w-44">
                                            <div className="mb-5">Total Value</div>
                                            <div className="font-bold font-gotham-black-regular mb-5">N 56,000,000.00</div>
                                            <div className="font-bold text-green-500 text-14">-500 | 5.55%  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        {/* End */}

                        {/* Summary, About, News Tab section */}
                        <div className='flex border-bottom-1 space-x-5 mb-30'>
                            <div onClick={displaySummary} className={showSummary ? 'pr-5 py-3 font-bold border-bottom-2 cursor-pointer':'pr-5 py-3 font-bold cursor-pointer'}>Summary</div>
                            <div onClick={displayAbout} className={showAbout ? 'pr-5 py-3 font-bold border-bottom-2 cursor-pointer':'pr-5 py-3 font-bold cursor-pointer'}>About</div>
                            <div onClick={displayNews} className={showNews ? 'pr-5 py-3 font-bold border-bottom-2 cursor-pointer':'pr-5 py-3 font-bold cursor-pointer'}>News</div>
                        </div>
                        {/* End */}

                        {/* Summary Section */}
                        <div className={showSummary ? 'mb-30 about-section':'mb-30 summary-section hidden'}>
                            <div className="flex justify-between">
                                <div className='mb-96 w-4/6'>
                                    <div className='mb-30'>
                                        <div className='card'>
                                            <div className='mb-30'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='font-bold text-color-1 text-xl'>Current Price</div>
                                                    <div className='w-1/2 flex bg-gray-300 p-1 rounded justify-between'>
                                                        <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1D</button>

                                                        <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1W</button>

                                                        <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1M</button>

                                                        <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>3M</button>

                                                        <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>6M</button>

                                                        <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1Y</button>
                                                    </div>
                                                </div>
                                                
                                                <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>₦ 5,000,000.00</div>
                                                <div className='text-lg text-red-500'>-500 | 5.55%  </div>
                                            </div>

                                            <div>
                                                {/* <Line options={options} data={data} id='canvas'/> */}
                                                <Chart options={options} series={series} type="area" height='489'/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between space-x-5'>
                                        <div className='card-unpadded'>
                                            <div className='flex justify-between px-6 py-4 border-bottom-e'>
                                                <div className='font-bold'>Bids</div>
                                                <div className='text-color-1 font-bold'>View all</div>
                                            </div>

                                            <div className='px-6 text-13'>
                                                <div className='flex justify-between border-bottom-e py-4'>
                                                    <div>11,000</div>
                                                    <div className='text-green-500'>₦ 840.80</div>
                                                </div>

                                                <div className='flex justify-between border-bottom-e py-4'>
                                                    <div>11,000</div>
                                                    <div className='text-green-500'>₦ 840.80</div>
                                                </div>

                                                <div className='flex justify-between py-4'>
                                                    <div>11,000</div>
                                                    <div className='text-green-500'>₦ 840.80</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card-unpadded'>
                                            <div className='flex justify-between px-6 py-4 border-bottom-e'>
                                                <div className='font-bold'>Offers</div>
                                                <div className='text-color-1 font-bold'>View all</div>
                                            </div>

                                            <div className='px-6 text-14'>
                                                <div className='flex justify-between border-bottom-e py-4'>
                                                    <div>11,000</div>
                                                    <div className='text-red-500'>₦ 840.80</div>
                                                </div>

                                                <div className='flex justify-between border-bottom-e py-4'>
                                                    <div>11,000</div>
                                                    <div className='text-red-500'>₦ 840.80</div>
                                                </div>

                                                <div className='flex justify-between py-4'>
                                                    <div>11,000</div>
                                                    <div className='text-red-500'>₦ 840.80</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='card-stock w-stock'>
                                        <div className='font-bold font-gotham-black-regular mb-20 pt-5'>Statistics Overview</div>
                                        
                                        <div className='py-3'>
                                            <div className='flex space-x-24 text-14 border-bottom-e pb-6'>
                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Open</div>
                                                    <div>₦ 940.80</div>
                                                </div>

                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Mkt Cap</div>
                                                    <div>40M</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='py-3'>
                                            <div className='flex space-x-24 text-14 border-bottom-e pb-6'>
                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>High</div>
                                                    <div>₦ 940.80</div>
                                                </div>

                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Low</div>
                                                    <div>40M</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='py-3'>
                                            <div className='flex space-x-24 text-14 border-bottom-e pb-6'>
                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>52 Week High</div>
                                                    <div>₦ 940.80</div>
                                                </div>

                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>52 Week Low</div>
                                                    <div>40M</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='py-3'>
                                            <div className='flex space-x-24 text-14 border-bottom-e pb-6'>
                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Volume</div>
                                                    <div>₦ 940.80</div>
                                                </div>

                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Average Volume</div>
                                                    <div>40M</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='py-3'>
                                            <div className='flex space-x-24 text-14 border-bottom-e pb-6'>
                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Sector</div>
                                                    <div>₦ 940.80</div>
                                                </div>

                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Market Segment</div>
                                                    <div>40M</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='py-3'>
                                            <div className='flex space-x-24 text-14 pb-6'>
                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>% Spread</div>
                                                    <div>₦ 940.80</div>
                                                </div>

                                                <div>
                                                    <div className='font-bold mb-20 font-gotham-black-regular'>Previous Close</div>
                                                    <div>40M</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* About Section */}
                        <div className={showAbout ? 'mb-30 about-section': 'mb-30 about-section hidden'}>
                            <div className='mb-10'>
                                <div className='flex'>
                                    <div className='w-56rem'>
                                        <p className='font-bold mb-20 font-gotham-black-regular'>About</p>
                                        <div className='tracking-widest text-14 leading-8 pr-10 mb-30'>Dangote Group continues to grow its vision of becoming the leading provider of essential needs in Food and Shelter in Sub-Saharan Africa. We continue to sustain and improve on our market leadership in Cement Manufacturing, Sugar Milling, Sugar Refining, Port Operations, Packaging Material Production and Salt Refining. In line with our philosophy, we will continue to provide the basic needs of Nigerians.
                                        Africa’s largest cement producer, Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months ended 30th September 2020. Analysis of the company’s unaudited results for the period indicated that Nigerian operations accounted for 11.92 million tonnes, an increase of 10.2 percent compared to 10.82 million tonnes in the corresponding period in 2019. Pan-Africa operations accounted for the balance of 7.47 million tonnes, an increase of 3.7 percent over the same period in 2019.</div>

                                        <div className='tracking-widest text-14 leading-8 pr-10 mb-30'>The Group has diversified into other sectors of the Nigerian economy including agriculture and is currently constructing the largest petroleum refinery, petrochemical plant and fertilizer complex in Africa.</div>
                                    </div>

                                    <div className='px-10 h-44 border-left-1'>
                                        <div className='mb-30'>
                                            <p className='font-gotham-black-regular mb-10'>Group Managing Director</p>
                                            <p className='text-14'>Aliko Dangote, GCON</p>
                                        </div>

                                        <div>
                                            <p className='font-gotham-black-regular mb-10'>Founded</p>
                                            <p className='text-14'>1996</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-bottom-1 mb-30"></div>

                            <div className='mt-10'>
                                <div className='card-stock'>
                                    <div className='font-gotham-black-regular mb-30 mt-5'>Statistics Overview</div>
                                    <div className='flex justify-between mb-20'>
                                        <div>
                                            <div className='font-gotham-black-regular text-14 mb-10'>Shares Outstanding</div>
                                            <div className='text-13'>44300.00</div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        <div>
                                            <div className='font-gotham-black-regular text-14 mb-10'>Registrar</div>
                                            <div className='text-13'>Anchoria Investment Services Limited</div>
                                        </div>

                                        <div className='border-left-1'></div>

                                        <div className='w-72'>
                                            <div className='font-gotham-black-regular text-14 mb-10'>Institutional Owership</div>
                                            <div className='text-13'>44300.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* News Section */}
                        <div className={showNews ? 'mb-30 news-section': 'mb-30 news-section hidden'}>
                            <div className='mb-30'><p className='font-bold font-gotham-black-regular'>News and Insights</p></div>
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

                                <div>
                                    <div className='mb-20'><img src={Dangote} alt=''/></div>
                                    <div className='w-22rem'>
                                        <div className='font-bold mb-10 text-14 w-6/6'>Dangote Cement posts nine months’ impressive sales volume</div>
                                        <div className='mb-10 text-13 tracking-wider leading-5'>Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months.</div>
                                        <div className='font-bold text-13'>&middot; 27 Aug, 2020</div>
                                    </div>
                                </div>
                            </div>

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

                                <div>
                                    <div className='mb-20'><img src={Dangote} alt=''/></div>
                                    <div className='w-22rem'>
                                        <div className='font-bold mb-10 text-14 w-6/6'>Dangote Cement posts nine months’ impressive sales volume</div>
                                        <div className='mb-10 text-13 tracking-wider leading-5'>Dangote Cement has announced a 6.6 percent increase in Group sales volume which rose from 18.02 million tonnes in 2019 to 19.21 million tonnes in the nine months.</div>
                                        <div className='font-bold text-13'>&middot; 27 Aug, 2020</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End */}
                    </div>                  
                </div>
            </div>

            <div className={showSetPriceAlertModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-28 text-color-1 font-gotham-black-regular">Set Price Alerts</div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div>
                        <div className='mb-10'>
                            <img src={DangoteIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                            <span className="font-bold font-gotham-black-regular mx-3 text-xl">DangCem</span> | 
                            <span className="font-bold mx-3">Dangote PLC</span>                                
                        </div>

                        <div className="mb-20 w-32 bg-yellow-400 py-2 px-3 rounded-2xl text-14">Manufacturing</div>

                        <div className="leading-6 text-14 mb-20">Dangote Industries Limited is a diversified and fully integrated conglomerate. The Group's interests span a range of sectors in Nigeria and across Africa.</div>

                        <div className='mb-20'>
                            <div className='mb-10 font-bold'>Current Price</div>
                            <div className='font-gotham-black-regular text-color-1 text-28'>₦ 100,000.00</div>
                        </div>
                        
                        <div className='mb-20'>
                            <span className="text-red-500 font-bold">-500 | 5.55%</span>
                        </div>

                        <div className='mb-30 flex space-x-5'>
                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>High</div>
                                <input type="text"  className="input border-1-d6 p-2 outline-white"/>
                            </div>

                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>Low</div>
                                <input type="text"  className="input border-1-d6 p-2 outline-white"/>
                            </div>
                        </div>

                        <div className="flex space-x-5 mb-10">
                            <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                            <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showAddToWatchListModal ? "add-to-watchlist-modal rounded-lg" : "add-to-watchlist-modal rounded-lg hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-28 text-color-1 font-gotham-black-regular">Add To Watchlist</div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div>
                        <div className='mb-10'>
                            <img src={DangoteIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                            <span className="font-bold font-gotham-black-regular mx-3 text-xl">DangCem</span> | 
                            <span className="font-bold mx-3">Dangote PLC</span>                                
                        </div>

                        <div className="mb-20 w-32 bg-yellow-400 py-2 px-3 rounded-2xl text-14">Manufacturing</div>

                        <div className="leading-6 text-14 mb-20">Dangote Industries Limited is a diversified and fully integrated conglomerate. The Group's interests span a range of sectors in Nigeria and across Africa.</div>

                        <div className='mb-20'>
                            <div className='mb-10 font-bold'>Current Price</div>
                            <div className='font-gotham-black-regular text-color-1 text-28'>₦ 100,000.00</div>
                        </div>
                        
                        <div className='mb-20'>
                            <span className="text-red-500 font-bold">-500 | 5.55%</span>
                        </div>

                        <div className='mb-30 font-bold flex'>
                            <Form.Check onChange={displayHighLow} type='radio' className='portfoliolist-checkbox'/>
                            <span className='mt-1 ml-2'>Set Price Alert?</span>
                        </div>

                        <div className={showHighLow ? 'mb-30 flex space-x-5': 'mb-30 flex space-x-5 hidden'}>
                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>High</div>
                                <input type="text"  className="input border-1-d6 p-2"/>
                            </div>

                            <div className='w-1/2'>
                                <div className='font-bold mb-10'>Low</div>
                                <input type="text"  className="input border-1-d6 p-2"/>
                            </div>
                        </div>

                        <div className="flex space-x-5 mb-10">
                            <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                            <button onClick={displaySuccessModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showBuyStockModal ? "buy-stocks-modal rounded-lg" : "buy-stocks-modal rounded-lg hidden"}>
                <div className="mb-20 flex justify-between">
                    <div>
                        <div className="font-bold text-28 text-color-1 mb-10 font-gotham-black-regular">Buy Stocks</div>
                        <div className='font-bold text-color-1'>Provide the details below</div>
                    </div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className='mb-20'>
                    <div className="stock-balance-card">
                        <div className="italic text-green-500 mb-5">Available Balance</div>
                        <div className="font-bold text-28 font-gotham-black-regular text-white">
                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                            </svg> 
                            <span className="ml-2">₦5,000,000.00</span>
                        </div>
                    </div>
                </div>

                <div className='mb-30'>
                    <div className='mb-10'>
                        <img src={DangoteIcon} alt="" className="align-middle border-1-d6 rounded-lg" />
                        <span className="font-bold font-gotham-black-regular mx-3 text-xl">DangCem</span> | 
                        <span className="font-bold mx-3">Dangote PLC</span>                                
                    </div>
                </div>

                <div className='mb-20'>
                    <div className='mb-10 font-bold'>Current Price /Per Share</div>
                    <div className='font-gotham-black-regular text-28 font-bold text-color-1'>₦900.00</div>
                </div>

                <div className='border-bottom-1d mb-20'></div>

                <div className='mb-20'>
                    <div className='flex justify-between'>
                        <div className='w-1/2'>
                            <div className="mb-10">Order Type</div>

                            <div>
                                <select className='font-bold w-full border-1-d6 rounded-lg p-3 font-gotham outline-white'>
                                    <option  value="234">Market</option>                                        
                                    <option  value="234">Limit</option>                                        
                                    <option  value="234">Stop Loss</option>                                        
                                    <option  value="234">Stop Limit</option>                                    
                                </select>
                            </div>                                   
                        </div>

                        <div>
                            <div className="mb-10">Unit</div>

                            <div>
                                <input type='text' className='input border-1-d6 p-2 outline-white' />
                            </div>                                   
                        </div>
                    </div>
                </div>

                <div className='border-bottom-1d mb-20'></div>

                <div className='mb-20'>
                    <div className='mb-10'>Estimated cost</div>
                    <div className='font-gotham-black-regular font-bold text-color-1 text-28'>0</div>
                </div>

                <div>
                    <button className='w-full bgcolor-1 rounded-lg text-white p-4 font-bold text-lg border-0 focus:shadow-outline cursor-pointer'>Continue</button>
                </div>

            </div>

            <div className={showSuccessModal ? "stock-success-modal w-32rem": "stock-success-modal w-32rem hidden"}>
                <div className="ml-8 mr-auto w-full h-64 relative">
                    <img src={SuccessIcon} alt="success icon" className="w-96"/>
                    <div className="bg-white p-3 w-96 -bottom-10 absolute"></div>
                </div>

                <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-10">Successful</div>

                <div className="text-color-4 text-16 text-center mb-14 leading-5">Your stocks has been successfully added to your watchlist</div>

                <div className="mb-10">

                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Close</button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40": "modal-backdrop opacity-40 hidden"}>
            </div>
        </div>
    );
};

export default Stock;