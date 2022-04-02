import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import SuccessCheckIcon from '../../assets/images/success-check.svg';
import Form from 'react-bootstrap/Form';
import Sidebar from '../../components/Sidebar';
import * as HelperFunctions from '../../lib/helper';
import axios from 'axios';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import { getAxios } from '../../network/httpClientWrapper';
import { portfolioServiceBaseUrlUrl, walletAndAccountServiceBaseUrl } from '../../apiUrls';

const WithdrawFund = () => {
    document.title = "Withdraw Funds - Anchoria";

    const [showAmount, setShowAmount] = useState('');
    const [showWithdraw, setShowWithdraw] = useState<boolean>(true);
    const [showWithdrawSummary, setShowWithdrawSummary] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const [walletBalance, setWalletBalance] = useState(0);
    const [bankDetailsList, setBankDetailsList] = useState<any[]>([]);

    const [selectedBankId, setSelectedBankId] = useState('');
    const [selectedBankDetails, setSelectedBankDetails] = useState('');

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [apiResponseSuccessMsg, ] = useState('');

    const [isWithdrawDetailsFilled, setIsWithdrawDetailsFilled] = useState<boolean>(false);

    const [transactionPin, setTransactionPIN] = useState('');

    const [hasWithdrawError, setHasWithdrawError] = useState<boolean>(false);
    const [withdrawErrorMsg, setWithdrawErrorMsg] = useState('');
    const [sliderBackgroundSize, setSliderBackgroundSize] = useState('');



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

        function getBankDetailsList() {
            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/bank-details')
                .then(function (response) {
                    setBankDetailsList(response.data.data);
                })
                .catch(function (error) {
                    ;
                });
        }

        getWalletBalance();
        getBankDetailsList();
    }, []);

    useEffect(()=>{
        function checkIfAmountAndSelectedBankAccountAreFilled(){
            if(showAmount === '' || selectedBankId === '' || transactionPin === ''){
                setIsWithdrawDetailsFilled(false);
            }
            else{
                setIsWithdrawDetailsFilled(true);
            }
        }

        checkIfAmountAndSelectedBankAccountAreFilled();
    },[showAmount, selectedBankId, transactionPin]);


    function selectAmount(event: any) {
        const amountBtns = document.getElementsByClassName("amount-btn");

        const amount = event.target.getAttribute("data-value");
        const formatAmount = HelperFunctions.formatCurrencyWithDecimal(amount);
        setShowAmount(formatAmount);

        [].forEach.call(amountBtns, function (el: any) {
            el.classList.add("border");
            el.classList.add("border-gray-300");
            el.classList.add("text-gray-400");

            el.classList.remove("border-green-144A22");
            el.classList.remove("text-green-144A22");
            el.classList.remove("font-bold");
        });

        event.target.classList.remove("border");
        event.target.classList.remove("border-gray-300");
        event.target.classList.remove("text-gray-400");

        event.target.classList.add("border-green-144A22");
        event.target.classList.add("text-green-144A22");
        event.target.classList.add("font-bold");
    }

    function selectBankDetails(event: any) {

        if(event.target.value !== ''){
            let id = event.target.value;
            
            let bDetails: any = bankDetailsList.find((el: any) => el.id === id);

            setSelectedBankId(id);
            setSelectedBankDetails(JSON.stringify(bDetails));
        }
        else{
            setSelectedBankId('');
            setSelectedBankDetails('');
        }
    }

    function withdrawFundFromWallet() {
        let bDetails: any = bankDetailsList.find((el: any) => el.id === selectedBankId);

        let requestData = {
            "amount": parseFloat(showAmount.replaceAll(',','')),
            "bankCode": bDetails.bankCode,
            "bankName": bDetails.bankName,
            "accountNumber": bDetails.accountNumber,
            "accountName": bDetails.accountName
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), transactionPin);

        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/withdraw',
            {
                "text": localStorage.getItem('genericCypher')
            },{headers})
            .then(function (response) {
                setShowSuccess(true);
                setShowSpinner(false);
                setShowWithdrawSummary(false);
                setShowWithdraw(false);

                setTimeout(()=>{
                    window.location.reload();
                },1500)

            })
            .catch(function (error) {
                setShowSuccess(false);
                setShowSpinner(false);
                setShowWithdrawSummary(false);
                setHasWithdrawError(true);
                setWithdrawErrorMsg(error.response.data.message);
            });
    }

    function closeSuccess() {
        window.location.reload();
    }

    function formatNumber(n :any) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function delineateAmount(event :any) {
        formatNumber(event.target.value);
        
        formatCurrency(event);
    }

    function formatCurrency(event :any) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.
        
        // get input value
        var input_val = event.target.value;
        
        // don't validate empty input
        if (input_val === "") { return; }
          
        // check for decimal
        if (input_val.indexOf(".") >= 0) {
      
          // get position of first decimal
          // this prevents multiple decimals from
          // being entered
          var decimal_pos = input_val.indexOf(".");
      
          // split number by decimal point
          var left_side = input_val.substring(0, decimal_pos);
          var right_side = input_val.substring(decimal_pos);
      
          // add commas to left side of number
          left_side = formatNumber(left_side);
      
          // validate right side
          right_side = formatNumber(right_side);

          
          // Limit decimal to only 2 digits
          right_side = right_side.substring(0, 2);
      
          // join number by .
          input_val = left_side + "." + right_side;
      
        } 
        else {
          // no decimal entered
          // add commas to number
          // remove all non-digits
          input_val = formatNumber(input_val);
          
        }
        
      
        // put caret back in the right position
        // var updated_len = input_val.length;

        // caret_pos = updated_len - original_len + caret_pos;

        // event.target.setSelectionRange(caret_pos, caret_pos);

        // send updated string to input
        setShowAmount(input_val);
    }

    function slideToAmount(event: any) {
        let amount = parseFloat(event.target.value) * 5000;
        let formatAmount = HelperFunctions.formatCurrencyWithDecimal(amount);

        let backgroundSize = (parseFloat(event.target.value) - 0) * 100 / (100 - 0) + '% 100%';

        setSliderBackgroundSize(backgroundSize);

        setShowAmount(formatAmount);
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
                            <div className='m-auto w-1/2 pt-12'>

                                {/*Withdraw Funds Header */}
                                <div className={showWithdraw ? "flex justify-between mb-5" : 'hidden'} style={{ width: '35rem' }}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-bold mb-3">Withdraw Funds</div>
                                        <div className="mb-3">Confirm bank and amount below</div>
                                    </div>

                                    <div className='font-bold'>
                                        <Link to='/account' className='hover:text-green-900 no-underline text-green-900 text-lg'>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        </Link>
                                    </div>
                                </div>
                                {/*End*/}

                                {/*Withdraw Summary Header */}
                                <div className={showWithdrawSummary ? "flex justify-between mb-30" : "hidden"} style={{ width: '35rem' }}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-10">Withdrawal Summary</div>
                                    </div>

                                    <div className='font-bold'>
                                        <Link to='/account' className='no-underline text-green-900'>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        </Link>
                                    </div>
                                </div>
                                {/*End*/}

                                

                                <div className='mb-3 rounded-lg border bg-white p-10' style={{ width: '35rem' }}>
                                    {/* Withdraw Section */}
                                    <div className={showWithdraw ? 'amount-section' : 'hidden'}>
                                        <div>
                                            {/* Withdraw Error */}
                                            <div className={hasWithdrawError ? "error-alert mb-3" : "hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">
                                                        <div className="text-sm">{withdrawErrorMsg}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

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

                                            <div className='text-lg mb-3 font-bold'>Amount</div>

                                            <div className='mb-3 flex'>
                                                <div>
                                                    <input type='text' readOnly className='input-custom w-20 font-gotham-black-regular font-black text-4xl text-center rounded-l-lg py-5 pl-5 border' placeholder='₦' />
                                                </div>

                                                <div className='w-full'>
                                                    <input type='text' onChange={delineateAmount} className='w-full border font-black text-4xl py-5 px-5 outline-white rounded-r-lg ' data-type="currency" placeholder='0.00' value={showAmount} pattern="^\d{1,3}(,\d{3})*(\.\d+)?$"/>
                                                </div>
                                            </div>

                                            <div className='my-8'>
                                                <input type='range' style={{ backgroundSize: sliderBackgroundSize }} onChange={slideToAmount} defaultValue={0} />
                                            </div>

                                            <div className='mb-8 flex space-x-3'>
                                                <button type='button' onClick={selectAmount} className='border border-gray-300 bg-gray-100 rounded-full amount-btn  text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="5000">₦ 5,000</button>

                                                <button type='button' onClick={selectAmount} className='border border-gray-300 bg-gray-100 rounded-full amount-btn  text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="8000">₦ 8,000</button>

                                                <button onClick={selectAmount} type='button' className='border border-gray-300 bg-gray-100 rounded-full amount-btn  text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="10000">₦ 10,000</button>

                                                <button data-value="15000" type='button' className='border border-gray-300 bg-gray-100 rounded-full amount-btn  text-lg px-5 py-3 cursor-pointer text-gray-400' onClick={selectAmount}>₦ 15,000</button>
                                            </div>

                                            <div className='mb-8'>

                                                <select id='banksDetailsId' onChange={selectBankDetails} className='block w-full focus:outline-none px-3 py-3 rounded text-gray-900 font-bold border focus:bg-white bg-white focus:ring-indigo-500'>
                                                    <option value="">Select Bank Account</option>
                                                    {bankDetailsList.map((item: any, index: number) =>
                                                        <option key={index} className='font-bold' value={item.id}>{item.accountName} | {item.bankName} | {item.accountNumber}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className='mb-8'>
                                                <div className='text-sm mb-3 font-bold'>Enter Transaction PIN</div>

                                                <div>
                                                    <input type='password' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' onChange={e => setTransactionPIN(e.target.value)} maxLength={4}/>
                                                </div>
                                            </div>

                                            <div className='mb-3'>
                                                <button onClick={withdrawFundFromWallet} type='button' className={isWithdrawDetailsFilled ? 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer':'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50'} disabled={!isWithdrawDetailsFilled}>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>

                                            {/* Withdraw Error */}
                                            <div className={hasWithdrawError ? "error-alert mb-3" : "hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">
                                                        <div className="text-sm">{withdrawErrorMsg}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Withdraw  Summary Section */}
                                    <div className={showWithdrawSummary ? 'amount-section' : 'hidden'}>
                                        <div>

                                            <div className='text-lg mb-5 font-bold'>Amount</div>

                                            <div className='mb-30 font-gotham-black-regular font-bold text-4xl text-green-900'>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(showAmount.replace(',','')))}</div>

                                            <div className='hidden'>
                                                <div className='mb-20 flex justify-between'>
                                                    <div>Fees</div>
                                                    <div className='font-bold'>₦ 306.00</div>
                                                </div>

                                                <div className='mb-30 flex justify-between'>
                                                    <div>Total Amount</div>
                                                    <div className='font-bold'>{showAmount} </div>
                                                </div>
                                            </div>

                                            
                                                <div className='mb-30 bg-gray-100 p-3 rounded border-gray-500 border'>
                                                    <div className='mb-10 flex justify-between'>
                                                        <div>Bank Account</div>
                                                    </div>

                                                    <div className='font-bold text-green-900'>{selectedBankDetails === '' ? '': JSON.parse(selectedBankDetails).accountName} | {selectedBankDetails === '' ? '': JSON.parse(selectedBankDetails).bankName} | {selectedBankDetails === '' ? '': JSON.parse(selectedBankDetails).accountNumber}</div>
                                                </div>
                                            

                                            <div className="border-bottom-1d mb-20 hidden"></div>

                                            {/* Pin Success */}
                                            <div className="otp-alert mb-20 hidden">
                                                <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                                            </svg>
                                                        </div>

                                                        <div className="pt-1 text-sm text-green-900">{apiResponseSuccessMsg}</div>
                                                    </div>

                                                    <div className="cursor-pointer">
                                                        <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Pin Error */}
                                            <div className="error-alert mb-20 hidden">
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="pt-1 text-sm">{apiResponseSuccessMsg}</div>
                                                    </div>

                                                    <div className="cursor-pointer">
                                                        <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}


                                            <div className='font-bold text-green-900 text-lg mb-30 hidden'>Confirm Transaction PIN</div>

                                            <form className='hidden'>
                                                <div className="mb-20">
                                                    <div className="font-bold mb-10 text-sm">Enter PIN</div>
                                                    <div className="flex space-x-2">
                                                        <input type="password" className="txn-pin short-input text-center" maxLength={1} />

                                                        <input type="password" className="txn-pin short-input text-center" maxLength={1} />

                                                        <input type="password" className="txn-pin short-input text-center" maxLength={1} />

                                                        <input type="password" className="txn-pin short-input text-center" maxLength={1} />
                                                    </div>
                                                </div>
                                            </form>

                                            <div>
                                                {/* <button onClick={validatePin} type='button' className={isPinValid === 'false' || isPinValid === '' ? 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' : 'hidden'} >
                                                    <span className={showSpinner ? "hidden" : ""}>Validate</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button> */}

                                                <button onClick={withdrawFundFromWallet} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Success Section */}
                                    <div className={showSuccess ? 'amount-section' : 'hidden'}>
                                        <div className="mx-auto w-1/2 h-64 relative">
                                            <img src={SuccessCheckIcon} alt="success icon" style={{ width: '14rem' }} />
                                            <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                        </div>

                                        <div className="relative z-10 text-green-900 text-3xl text-center mb-3">Successful</div>

                                        <div className="text-sm text-center mb-8">Your withdralwal of <strong>₦ {showAmount}</strong> was successfully recieved and will be processed shortly</div>

                                        <div className="mb-3 text-center">
                                            <button type='button' onClick={closeSuccess} className="bg-green-900 w-96 rounded-lg border-0 cursor-pointer text-white p-5 font-bold">Close</button>
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

export default WithdrawFund;