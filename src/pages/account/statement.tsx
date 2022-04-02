import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import SuccessIcon from '../../assets/images/success.gif';
import Sidebar from '../../components/Sidebar';
import Calendar from 'react-calendar';
import moment from 'moment';
import ChevronDownIcon from '../../assets/images/chevron-down.svg';
import * as HelperFunctions from '../../lib/helper';
import axios from 'axios';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SpinnerIcon from '../../assets/images/spinner.gif';
import { getAxios } from '../../network/httpClientWrapper';
import { portfolioServiceBaseUrlUrl, walletAndAccountServiceBaseUrl } from '../../apiUrls';

const AccountStatement = () => {
    document.title = 'Account Statement - Anchoria';

    const [showStartDateCalendar, setShowStartDateCalendar] = useState<boolean>(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState<boolean>(false);

    const [startDateState, setStartDateState] = useState(new Date());
    const [endDateState, setEndDateState] = useState(new Date());

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [showStatement, ] = useState<boolean>(true);
    const [showSuccess, ] = useState<boolean>(false);

    const [walletBalance, setWalletBalance] = useState(0);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [statementError, setStatementError] = useState('');
    const [statementSuccess, setStatementSuccess] = useState('');


    useEffect(() => {
        function getWalletBalance() {

            let customer = HelperFunctions.getCustomerInfo();

            getAxios(axios).get(portfolioServiceBaseUrlUrl + '/account/balance?customerId=' + customer.id)
                .then(function (response) {
                    HelperFunctions.removeOverflowAndPaddingFromModalBody();

                    setWalletBalance(response.data.data.balance);
                })
                .catch(function (error) {
                    HelperFunctions.removeOverflowAndPaddingFromModalBody();
                    
                });
        }

        getWalletBalance();
    });

    const changeStartDate = (e: any) => {
        setStartDateState(e);
        setStartDate(moment(e).format("DD - MM - YYYY"));
        setShowStartDateCalendar(false);
        setShowEndDateCalendar(false);
    }


    const changeEndDate = (e: any) => {
        setEndDateState(e);
        setEndDate(moment(e).format("DD - MM - YYYY"));
        setShowStartDateCalendar(false);
        setShowEndDateCalendar(false);
    }

    function displayStartDateCalendar() {

        setShowEndDateCalendar(false);

        if (showStartDateCalendar) {
            setShowStartDateCalendar(false);
        }
        else {
            setShowStartDateCalendar(true);
        }
    }

    function displayEndDateCalendar() {

        setShowStartDateCalendar(false);

        if (showEndDateCalendar) {
            setShowEndDateCalendar(false);
        }
        else {
            setShowEndDateCalendar(true);
        }
    }

    function addAccountStatement() {
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "startDate": moment(startDateState).format("YYYY-MM-DD"),
            "endDate": moment(endDateState).format("YYYY-MM-DD"),
            "customerId": customer.id
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/account-statement',
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);

                setStatementSuccess(response.data.message);
                setStatementError('');
            })
            .catch(function (error) {
                setShowSpinner(false);

                setStatementSuccess('');
                setStatementError(error.response.data.message);
            });
    }


    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="flex-1 min-w-0 flex flex-col">
                        <div className='px-10 py-24 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className='m-auto pt-12' style={{ width: '35rem' }}>

                                {/*Statement Header */}
                                <div className="flex justify-between">
                                    <div className='mb-8'>
                                        <div className="text-3xl text-green-900 font-bold mb-3">Investment Statements</div>

                                        <div className=" mb-3">Request your investment statements</div>
                                    </div>

                                    <div className=''>
                                        <Link to='/account' className='no-underline text-green-900 text-lg hover:text-green-lg'>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        </Link>
                                    </div>
                                </div>
                                {/*End*/}



                                <div>
                                    {/* Statement Section */}
                                    <div className={showStatement ? 'amount-section rounded-lg bg-white p-10' : 'hidden'}>
                                        <div>
                                            <div className="wallet-balance-card mb-5">
                                                <div className="italic text-green-500 mb-3">Available Balance</div>

                                                <div className="font-bold text-3xl text-white mb-3">
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                                    </svg>
                                                    <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(walletBalance)}</span>
                                                </div>

                                                <div className="text-gray-300 text-sm leading-5">Cash available in your wallet for trading or immediate withdrawal</div>
                                            </div>

                                            {/* Statement Error */}
                                            <div className={statementError !== '' ? "error-alert mb-5" : "hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">

                                                        <div className="text-sm">{statementError}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Stock add  Success */}
                                            <div className={statementSuccess ? "otp-alert mb-5" : "hidden"} style={{padding:'0.5rem'}}>
                                                <div className="flex otp-validated justify-between space-x-1">
                                                    <div className="flex">
                                                        <div className="text-sm text-green-900 p-3">{statementSuccess}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            <div className='mb-8'>
                                                <div className="mb-3 text-lg">Investment Type</div>

                                                <div className='flex border rounded-lg p-2'>
                                                    <select className='py-2 px-3 font-bold text-lg w-full border-0 font-gotham outline-white cursor-pointer'>
                                                        <option value="Stock">Stock</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='flex justify-between space-x-3 mb-8'>
                                                <div className='w-1/2 relative'>
                                                    <div className="mb-3 text-lg">Start date</div>

                                                    <Calendar onChange={changeStartDate} value={startDateState} className={showStartDateCalendar ? "absolute top-0 z-10" : "hidden"} />

                                                    <div className='flex justify-between items-center border rounded-lg p-1'>
                                                        <div className=''>
                                                            <input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} className="font-bold outline-white border-0 pr-3 py-2 input text-sm" placeholder="DD - MM - YYYY" readOnly />
                                                        </div>

                                                        <div className='cursor-pointer pr-2' onClick={e => displayStartDateCalendar()}>
                                                            <img src={ChevronDownIcon} alt="" width="12" />
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <div className='w-1/2 relative'>
                                                    <div className="mb-3 text-lg">End date</div>

                                                    <Calendar onChange={changeEndDate} value={endDateState} className={showEndDateCalendar ? "absolute top-0 z-10" : "hidden"} />
                                                    
                                                    <div className='flex justify-between items-center border rounded-lg p-1'>
                                                        <div className=''>
                                                            <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} className="font-bold outline-white border-0 pr-3 py-2 input text-sm" placeholder="DD - MM - YYYY" readOnly/>
                                                        </div>

                                                        <div className='cursor-pointer pr-2' onClick={e => displayEndDateCalendar()}>
                                                            <img src={ChevronDownIcon} alt="" width="12" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <button type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' onClick={addAccountStatement}>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Success Section */}
                                    <div className={showSuccess ? 'amount-section rounded-lg border-1-d6 bg-white p-10' : 'hidden'}>
                                        <div className="mx-auto w-2/3 h-64 relative">
                                            <img src={SuccessIcon} alt="success icon" className="w-96" />
                                            <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                        </div>

                                        <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>
                                        <div className="text-color-4 text-sm text-center mb-14">Your Investment statement has been successfully sent to your registered email address</div>
                                        <div className="mb-30 text-center">
                                            <button className="bg-green-900 w-96 rounded-lg border-0 cursor-pointer text-white p-5 font-bold">Close</button>
                                        </div>
                                    </div>
                                    {/* End */}
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

export default AccountStatement;