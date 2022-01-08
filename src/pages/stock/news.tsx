import React from 'react';
import {Link} from "react-router-dom";
import '../stock/index.scss';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import CementFactory from '../../assets/images/cement-factory.jpg';
import Refinery from '../../assets/images/refinery.jpg';
import StockNewsImg from '../../assets/images/bgstory3.png';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';

const StockNews = () => {
    
    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                   <Sidebar />

                    <div className="main-content w-full p-10 mb-30">
                        <div className="mb-10 pb-5">
                            <div className="flex justify-between items-center">
                                <div className="text-28 font-bold text-color-1 font-gotham-black-regular">Stock News</div>
                                <div className="font-bold">
                                    <Link to="/stock" className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="border-bottom-1d mb-30"></div>

                        <div className='mt-12'>
                            <div className='mx-auto w-2/3'>
                                <div className='mb-30 w-full font-bold font-gotham-black-regular text-xl'>Dangote Cement maintains strong performance in Q3 2021</div>

                                <div className='w-full'>
                                    <img src={StockNewsImg} alt="" />
                                </div>

                                <div className='leading-8 py-6 break-words' style={{width: "730px"}}>
                                    <p>Africa’s largest cement producer, Dangote Cement Plc has announced improvements in performance measurement indices for the nine months ended 30th September 2021.</p>

                                    <p>This is as even the Group sales hit 22.2 million tonnes. Sales volume in Nigeria remained strong and accounted for 14.1 million tonnes despite heavy rains in the third quarter. Pan-African operations accounted for the balance of 8.2 million tonnes.</p>

                                    <p>A look into the results, released yesterday, indicated that the cement group posted revenues of ₦1,022.2 billion, while profit before tax was ₦405.5 billion while   Profit after tax was ₦278.3billion. The company recorded a tax charge of N127.24 billion for the period under review.</p>

                                    <p>Group Chief Executive Officer, Dangote Cement Plc, Michel Puchercos, in his comments, said “We are pleased to report a solid set of the results for the first nine months of the year. Group volumes for the nine months were up 15.4 per cent compared to the first nine months of 2020. Given the strong rebound in Q3 2020 following the impact of COVID-19 in the first half of the year, volumes in Q3 2021 were slightly lower than Q3 2020, as anticipated though worsened by heavier rains.” </p>

                                    <p>“However, the overall growth trend continues, supported by our ability to meet the strong market demand across all our countries of operation. The economic performance and efficiency initiatives across the Group enabled the offsetting of inflationary pressures on some of our cost lines.</p>

                                    <p>“Our Nigerian business recorded volume growth of 18.7% in 9M 2021 at 14.1Mt and despite operating in a complex, challenging, and fast-moving environment, Dangote Cement is consistently delivering superior profitability and returns to the shareholders.</p>
                                </div>

                                <div className='mt-5'>
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

export default StockNews;