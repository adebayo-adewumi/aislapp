import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import SuccessIcon from '../../assets/images/success.gif';
import Sidebar from '../../components/Sidebar';
import Calendar from 'react-calendar';
import moment from 'moment';
import ChevronDownIcon from '../../assets/images/chevron-down.svg';

const AccountStatement = () => {
    const [showStartDateCalendar, setShowStartDateCalendar] = useState<boolean>(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState<boolean>(false);
    const [startDateState, setStartDateState] = useState(new Date());
    const [endDateState, setEndDateState] = useState(new Date());
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showStatement, setShowStatement] = useState<boolean>(true);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const changeStartDate = (e :any) => {
        setStartDateState(e);
        setStartDate(moment(e).format("DD/MM/YYYY"));
        setShowStartDateCalendar(false);
        setShowEndDateCalendar(false);
    }

    const changeEndDate = (e :any) => {
        setEndDateState(e);
        setEndDate(moment(e).format("DD/MM/YYYY"));
        setShowStartDateCalendar(false);
        setShowEndDateCalendar(false);
    }

    function displayStartDateCalendar(){
        
        setShowEndDateCalendar(false);

        if(showStartDateCalendar){
            setShowStartDateCalendar(false);
        }
        else{
            setShowStartDateCalendar(true);
        }
    }

    function displayEndDateCalendar(){
        
        setShowStartDateCalendar(false);

        if(showEndDateCalendar){
            setShowEndDateCalendar(false);
        }
        else{
            setShowEndDateCalendar(true);
        }
    }

    function displayStatement(){
        setShowStatement(true);
        setShowSuccess(false);
    }

    function displaySuccess(){
        setShowStatement(false);
        setShowSuccess(true);
    }


    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="main-content w-full p-10">
                        <div className='m-auto w-42rem pt-12'>
                            {/*Statement Header */}
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Investment Statements</div>
                                    <div className="font-bold mb-30">Request your investment statements</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}    

                             

                            <div>     
                                {/* Statement Section */}                                                            
                                <div className={ showStatement ? 'amount-section rounded-lg border-1-d6 bg-white p-10' : 'hidden'}>
                                    <div>
                                        <div className="wallet-balance-card mb-30">
                                            <div className="italic text-green-500 mb-5">Available Balance</div>
                                            <div className="font-bold text-28 text-white mb-5">
                                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                                                </svg> 
                                                <span className="ml-2">₦ 5,000,000.00</span>
                                            </div>
                                            <div className="text-gray-300 text-13 leading-5">Cash available in your wallet for trading or immediate withdrawal</div>
                                        </div>

                                        <div className='mb-30'>
                                            <div className="mb-10 text-lg">Investment Type</div>
                                            <div className='flex border-1-d6 rounded-lg p-2'>
                                                <select className='py-2 px-3 font-bold text-lg w-full border-0 font-gotham outline-white'>
                                                    <option  value="Market">Investment</option>
                                                </select>
                                            </div>                                 
                                        </div>

                                        <div className='flex justify-between space-x-10 mb-30'>
                                            <div className='w-1/2'>
                                                <div className="mb-10 text-lg">Start date</div>
                                                <div className='flex justify-between items-center border-1-d6 rounded-lg'>
                                                    <div className='w-full'>
                                                        <input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} className="font-bold outline-white border-0 p-3 input text-14" placeholder="DD / MM / YYYY"/>
                                                    </div>
                                                    <div className='p-3 cursor-pointer' onClick={e => displayStartDateCalendar()}>
                                                        <img src={ChevronDownIcon} alt="" width="20"/>
                                                    </div>                                                    
                                                </div>
                                                <Calendar onChange={changeStartDate} value={startDateState} className={showStartDateCalendar ? "absolute z-10":"hidden"} />
                                            </div>

                                            <div className='w-1/2'>
                                                <div className="mb-10 text-lg">End date</div>
                                                <div className='flex justify-between items-center border-1-d6 rounded-lg'>
                                                    <div className='w-full'>
                                                        <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} className="font-bold outline-white border-0 p-3 input text-14" placeholder="DD / MM / YYYY"/>
                                                    </div>
                                                    <div className='p-3 cursor-pointer' onClick={e => displayEndDateCalendar()}>
                                                        <img src={ChevronDownIcon} alt="" width="20"/>
                                                    </div>
                                                </div>
                                                <Calendar onChange={changeEndDate} value={endDateState} className={showEndDateCalendar ? "absolute z-10":"hidden"} />
                                            </div>                                 
                                        </div>

                                        <div>
                                            <button type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' onClick={displaySuccess}>Proceed</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Success Section */}
                                <div className={ showSuccess ? 'amount-section rounded-lg border-1-d6 bg-white p-10' : 'hidden'}>
                                    <div className="mx-auto w-2/3 h-64 relative">
                                        <img src={SuccessIcon} alt="success icon" className="w-96"/>
                                        <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                    </div>

                                    <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>
                                    <div className="text-color-4 text-16 text-center mb-14">Your Investment statement has been successfully sent to your registered email address</div>
                                    <div className="mb-30 text-center">
                                        <button className="bgcolor-1 w-96 rounded-lg border-0 cursor-pointer text-white p-5 font-bold">Close</button>
                                    </div>
                                </div>
                                {/* End */}
                            </div>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>
        </div>
    );
};

export default AccountStatement;