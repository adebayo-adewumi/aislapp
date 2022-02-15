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

    const [showStatement, setShowStatement] = useState<boolean>(true);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

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
                    console.log(error)
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

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/statement',
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
                                <div className={showStatement ? 'amount-section rounded-lg border-1-d6 bg-white p-10' : 'hidden'}>
                                    <div>
                                        <div className="wallet-balance-card mb-30">
                                            <div className="italic text-green-500 mb-5">Available Balance</div>
                                            <div className="font-bold text-28 text-white mb-5">
                                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white" />
                                                </svg>
                                                <span className="ml-2">₦ {HelperFunctions.formatCurrencyWithDecimal(walletBalance)}</span>
                                            </div>
                                            <div className="text-gray-300 text-13 leading-5">Cash available in your wallet for trading or immediate withdrawal</div>
                                        </div>

                                        {/* Statement Error */}
                                        <div className={statementError !== '' ? "error-alert mb-20" : "hidden"}>
                                            <div className="flex justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-14">{statementError}</div>
                                                </div>

                                                <div className="cursor-pointer">
                                                    <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        {/* Stock add  Success */}
                                        <div className={statementSuccess ? "otp-alert mb-20" : "hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-14 text-color-1">{statementSuccess}</div>
                                                </div>

                                                <div className="cursor-pointer">
                                                    <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='mb-30'>
                                            <div className="mb-10 text-lg">Investment Type</div>
                                            <div className='flex border-1-d6 rounded-lg p-2'>
                                                <select className='py-2 px-3 font-bold text-lg w-full border-0 font-gotham outline-white'>
                                                    <option value="Stock">Stock</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='flex justify-between space-x-10 mb-30'>
                                            <div className='w-1/2'>
                                                <div className="mb-10 text-lg">Start date</div>
                                                <div className='flex justify-between items-center border-1-d6 rounded-lg'>
                                                    <div className='w-full'>
                                                        <input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} className="font-bold outline-white border-0 p-3 input text-14" placeholder="DD - MM - YYYY" />
                                                    </div>
                                                    <div className='p-3 cursor-pointer' onClick={e => displayStartDateCalendar()}>
                                                        <img src={ChevronDownIcon} alt="" width="20" />
                                                    </div>
                                                </div>
                                                <Calendar onChange={changeStartDate} value={startDateState} className={showStartDateCalendar ? "absolute z-10" : "hidden"} />
                                            </div>

                                            <div className='w-1/2'>
                                                <div className="mb-10 text-lg">End date</div>
                                                <div className='flex justify-between items-center border-1-d6 rounded-lg'>
                                                    <div className='w-full'>
                                                        <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} className="font-bold outline-white border-0 p-3 input text-14" placeholder="DD - MM - YYYY" />
                                                    </div>

                                                    <div className='p-3 cursor-pointer' onClick={e => displayEndDateCalendar()}>
                                                        <img src={ChevronDownIcon} alt="" width="20" />
                                                    </div>
                                                </div>
                                                <Calendar onChange={changeEndDate} value={endDateState} className={showEndDateCalendar ? "absolute z-10" : "hidden"} />
                                            </div>
                                        </div>

                                        <div>
                                            <button type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' onClick={addAccountStatement}>
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