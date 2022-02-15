import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import Form from 'react-bootstrap/Form';
import SuccessIcon from '../../assets/images/success.gif';
import InfoIcon from '../../assets/images/info.svg';
import Sidebar from '../../components/Sidebar';
import * as HelperFunctions from '../../lib/helper';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import axios from 'axios';
import SpinnerIcon from '../../assets/images/spinner.gif';
import CopyIcon from '../../assets/images/copy.svg';
import "../../index.scss";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import { authOnboardingServiceBaseUrl, walletAndAccountServiceBaseUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';


const FundAccount = () => {
    document.title = "Fund Account - Anchoria";

    const [switchToDebit, setSwitchToDebit] = useState<boolean>(true);
    const [switchToBank, setSwitchToBank] = useState<boolean>(false);
    const [switchToFundingHistory, setSwitchToFundingHistory] = useState<boolean>(false);

    const [showAmountSection, setShowAmountSection] = useState<boolean>(true);
    const [showCardSection, setShowCardSection] = useState<boolean>(false);
    const [showOTPSection, setShowOTPSection] = useState<boolean>(false);
    const [showPinSection, setShowPinSection] = useState<boolean>(false);
    const [showTransactionSection, setShowTransactionSection] = useState<boolean>(false);
    const [showBankTransferSection, setShowBankTransferSection] = useState<boolean>(false);

    const [showAmount, setShowAmount] = useState('');
    const [sliderBackgroundSize, setSliderBackgroundSize] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [cardPIN, setCardPIN] = useState('');
    const [cardOTP, setCardOTP] = useState('');


    const [isCardDetailsFilled, setIsCardDetailsFilled] = useState<boolean>(false);
    const [isCardOTPFilled, setIsCardOTPFilled] = useState<boolean>(false);
    const [isPinValid, setIsPinValid] = useState('');

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');
    const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem("aislCustomerInfo") as string));
    const [poptiptext, setPopTipText] = useState("Click to Copy");

    const [fundingHistory, setFundingHistory] = useState([{}]);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("aislCustomerInfo") as string));

        function checkIfCardDetailsAreFilled() {
            if (cardNumber === '' || cardExpiry === '' || cardCVV === '' || cardPIN === '') {
                setIsCardDetailsFilled(false);
            }
            else {
                setIsCardDetailsFilled(true);
            }
        }

        function checkIfCardOTPFilled() {
            if (cardOTP === '') {
                setIsCardOTPFilled(false);
            }
            else {
                setIsCardOTPFilled(true);
            }
        }

        function getFundingHistory() {
            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/wallet-api/funding-history')
                .then(function (response) {
                    setFundingHistory(response.data.data);
                })
                .catch(function (error) { });
        }



        checkIfCardDetailsAreFilled();
        checkIfCardOTPFilled();
        getFundingHistory();

    }, []);

    function performSwitchToDebit() {
        setSwitchToDebit(true);
        setSwitchToBank(false);
        setSwitchToFundingHistory(false);

        setShowAmountSection(true);
        setShowCardSection(false);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(false);
    }

    function performSwitchToBank() {
        setSwitchToDebit(false);
        setSwitchToBank(true);
        setSwitchToFundingHistory(false);

        setShowAmountSection(false);
        setShowCardSection(false);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(true);
    }

    function performSwitchToFundingHistory() {
        setSwitchToDebit(false);
        setSwitchToBank(false);
        setSwitchToFundingHistory(true);

        setShowAmountSection(false);
        setShowCardSection(false);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(false);
    }

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

    function displayCardSection() {
        setShowAmountSection(false);
        setShowCardSection(true);
        setShowOTPSection(false);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(false);
    }

    

    function slideToAmount(event: any) {
        let amount = parseFloat(event.target.value) * 5000;
        let formatAmount = HelperFunctions.formatCurrencyWithDecimal(amount);

        let backgroundSize = (parseFloat(event.target.value) - 0) * 100 / (100 - 0) + '% 100%';

        setSliderBackgroundSize(backgroundSize);

        setShowAmount(formatAmount);
    }

    function fundAccountWithCard() {
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "cardNumber": "5531886652142950",
            "cvv": "564",
            "expiryMonth": "09",
            "expiryYear": "32",
            "currency": "NGN",
            "amount": "1000",
            "email": "ayomide.oyediran@vfdtech.ng",
            "fullname": "Ayomide Oyediran",
            "phoneNumber": "08165131008",
            "txtRef": HelperFunctions.generateRandomString(10),
            "authorization": {
                "mode": "pin",
                "pin": "1234"
            }
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/fw/pay/card/' + customer.id,
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);

                setShowAmountSection(false);
                setShowCardSection(false);
                setShowOTPSection(true);
                setShowPinSection(false);

                localStorage.setItem("aislPayWithCardResponse", JSON.stringify(response.data.data));
            })
            .catch(function (error) {
                console.log(error)
                setShowSpinner(false);
            });
    }

    function validateFundWithCardOTP() {
        let paymentRes = JSON.parse(localStorage.getItem("aislPayWithCardResponse") as string);

        let requestData = {
            "paymentReference": paymentRes.flwRef,
            "otp": 12345
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/fw/pay/card/validate-otp',
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);

                setShowAmountSection(false);
                setShowCardSection(false);
                setShowOTPSection(false);
                setShowPinSection(true);
            })
            .catch(function (error) {
                console.log(error)
                setShowSpinner(false);
            });
    }

    function handleCreditCardNumberInputSelection(event: any) {
        return HelperFunctions.ccNumberInputHandler(event);
    }

    function maskCreditCardNumberInput(event: any) {
        setCardNumber(event.target.value);

        return HelperFunctions.ccNumberInputHandler(event);
    }

    function handleCreditCardExpiryInputSelection(event: any) {
        return HelperFunctions.ccExpiryInputKeyDownHandler(event);
    }

    function maskCreditCardExpiryInput(event: any) {

        let exv = HelperFunctions.ccExpiryInputHandler(event);

        setCardExpiry(exv);
    }

    function handleCreditCardCVVInputSelection(event: any) {
        return HelperFunctions.ccCVVInputKeyDownHandler(event);
    }

    function maskCreditCardCVVInput(event: any) {

        let cvv = HelperFunctions.ccCVVInputHandler(event);

        setCardCVV(cvv);
    }

    function validatePin() {
        setShowSpinner(true);

        let txnPin = document.getElementsByClassName("txn-pin");
        let pin = '';

        [].forEach.call(txnPin, (el: any) => {
            pin += el.value
        });

        let PINData = {
            "pin": pin
        }

        let validatePinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(PINData));
        localStorage.setItem('validatePinCypher', validatePinCypher);

        let customer = HelperFunctions.getCustomerInfo();
        getAxios(axios).post(authOnboardingServiceBaseUrl + '/customer/pin/validate?customerId=' + customer.id,
            {
                "text": localStorage.getItem('validatePinCypher')
            })
            .then(function (response) {
                setIsPinValid('true');
                setApiResponseSuccessMsg(response.data.message);

                setShowSpinner(false);
            })
            .catch(function (error) {
                setIsPinValid('false');
                setApiResponseSuccessMsg(error.response.data.message);
                setShowSpinner(false);
            });
    }

    function verifyCardFunding() {
        let paymentRes = JSON.parse(localStorage.getItem("aislPayWithCardResponse") as string);

        let requestData = {
            "transactionId": paymentRes.transactionId,
            "firebaseToken": HelperFunctions.generateRandomString(10)
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/fw/transaction/verify',
            {
                "text": localStorage.getItem('genericCypher')
            })
            .then(function (response) {
                setShowSpinner(false);

                setShowAmountSection(false);
                setShowCardSection(false);
                setShowOTPSection(false);
                setShowPinSection(false);
                setShowTransactionSection(true);
            })
            .catch(function (error) {
                console.log(error)
                setShowSpinner(false);
            });
    }

    function changePopTipTextToCopied() {
        setPopTipText("Copied!");
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="main-content w-full p-10">
                        <div className='m-auto w-1/2 pt-5'>
                            <div className="flex justify-between" style={{ width: '35rem' }}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-30">Fund Account</div>
                                    <div className="hidden font-bold mb-30">Provide the details below</div>
                                    <span className='hidden'>{showAmount}</span>
                                </div>

                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>

                            <div className='hidden border-bottom-1d mb-30 '></div>

                            <div className='mb-30 rounded-lg border-1-d6 bg-white p-10' style={{ width: '35rem' }}>
                                {/*Switch Section */}
                                <div>
                                    <div className='mb-10 font-bold text-color-1 text-xl hidden'>How much would like to fund</div>

                                    <div className='mb-30'>
                                        <div className="border_1 flex rounded-lg p-02rem" style={{ width: '390px' }}>
                                            <div>
                                                <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-5 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bgcolor-f"}>Debit Card</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToBank} type='button' className={switchToBank ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-5 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bgcolor-f"}>Bank Transfer</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToFundingHistory} type='button' className={switchToFundingHistory ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-5 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bgcolor-f"}>Funding History</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*End */}

                                {/* Enter Amount Section */}
                                <div className={showAmountSection ? 'amount-section' : 'hidden'}>
                                    <div>


                                        <div className='text-lg mb-10'>Amount</div>

                                        <div className='mb-30 flex'>
                                            <div>
                                                <input type='text' readOnly className='input-custom w-20 font-gotham-black-regular font-black text-4xl text-center rounded-l-lg py-5 pl-5 border-left-gray border-top-gray border-bottom-gray border-r-0' placeholder='₦' />
                                            </div>

                                            <div className='w-full'>
                                                <input type='text' onChange={e => setShowAmount(e.target.value)} className='input-custom w-full font-gotham-black-regular border-r-0 font-black text-4xl py-5 pr-5 border-l-0 outline-white border-top-gray rounded-r-lg border-bottom-gray border-right-gray' placeholder='0.00' value={showAmount} />
                                            </div>
                                        </div>

                                        <div className='mb-30'>
                                            <input type='range' style={{ backgroundSize: sliderBackgroundSize }} onChange={slideToAmount} defaultValue={0} />
                                        </div>

                                        <div className='mb-30 flex space-x-3'>
                                            <button onClick={selectAmount} type='button' className='border border-gray-300 bg-gray-100 rounded-full amount-btn text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="5000">₦ 5,000</button>

                                            <button onClick={selectAmount} type='button' className='border border-gray-300 bg-gray-100 amount-btn rounded-full text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="8000">₦ 8,000</button>

                                            <button onClick={selectAmount} type='button' className='border border-gray-300 bg-gray-100 amount-btn rounded-full text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="10000">₦ 10,000</button>

                                            <button onClick={selectAmount} type='button' className='border border-gray-300 bg-gray-100 amount-btn rounded-full  text-lg px-5 py-3 cursor-pointer text-gray-400' data-value="15000">₦ 15,000</button>
                                        </div>

                                        <div>
                                            <button onClick={displayCardSection} type='button' className={showAmount !== '' ? 'w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' : 'w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 opacity-50'} disabled={!showAmount}>Continue</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Enter Card Details Section */}
                                <div className={showCardSection ? 'card-section' : 'hidden'}>
                                    <div>
                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-20 font-gotham-black-regular text-color-1 text-4xl'>₦ {showAmount}</div>

                                        <div className='border-bottom-1d mb-10'></div>

                                        <div className='my-6 text-color-1 text-xl font-bold'>Enter your card details</div>

                                        <div className='mb-20'>
                                            <div className='text-14 mb-5 font-bold'>Card Number</div>

                                            <div className='relative'>
                                                <input value={cardNumber} onKeyDown={handleCreditCardNumberInputSelection} onChange={maskCreditCardNumberInput} placeholder='Enter your 16 digits card number' type='text' className='cc-number-input input p-5 border-1-d6 outline-white font-bold text-lg text-gray-600' maxLength={19} />

                                                <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--amex hidden" alt="" />
                                                <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--visa hidden" alt="" />
                                                <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--mastercard hidden" alt="" />
                                                <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--disc hidden" alt="" />
                                                <img style={{ width: '13%', right: '10px' }} className="cc-types__img cc-types__img--generic hidden" alt="" />

                                            </div>
                                        </div>

                                        <div className='mb-20'>
                                            <div className='flex justify-between space-x-5'>
                                                <div className='w-1/2'>
                                                    <div className='text-lg mb-5 text-14 font-bold'>Validity</div>

                                                    <div>
                                                        <input value={cardExpiry} onChange={maskCreditCardExpiryInput} onKeyDown={handleCreditCardExpiryInputSelection} placeholder='MM / YY' type='text' className='input p-5 cc-expiry-input border-1-d6 outline-white font-bold text-lg text-gray-600' maxLength={5} />
                                                    </div>
                                                </div>

                                                <div className='w-1/2'>
                                                    <div className='text-lg mb-5 text-14 font-bold'>CVV</div>

                                                    <div>
                                                        <input value={cardCVV} onChange={maskCreditCardCVVInput} onKeyDown={handleCreditCardCVVInputSelection} placeholder='CVV' type='text' className='input p-5 cc-cvv-input border-1-d6 outline-white font-bold text-lg text-gray-600' maxLength={3} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-20'>
                                            <div className='text-lg mb-5 text-14 font-bold'>PIN</div>

                                            <div className='mb-30'>
                                                <input value={cardPIN} onChange={e => setCardPIN(e.target.value)} type='password' className='input p-4 border-1-d6 text-2xl outline-white' maxLength={4} />
                                            </div>
                                        </div>

                                        <div className='mb-20 flex hidden'>
                                            <Form.Check type="checkbox" className='portfoliolist-checkbox' />
                                            <div className='mt-1 font-bold mx-2 text-gray-900'>Save card details</div>
                                        </div>

                                        <div>
                                            <button type='button' className={isCardDetailsFilled ? 'hidden' : 'w-full font-bold text-lg border-0 bgcolor-1 text-white hidden rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50'}>Proceed</button>

                                            <button onClick={fundAccountWithCard} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Enter OTP Section */}
                                <div className={showOTPSection ? 'otp-section' : 'hidden'}>
                                    <div>
                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-20 font-gotham-black-regular text-color-1 text-4xl'>₦ {showAmount}</div>

                                        <div className='border-bottom-1d mb-10'></div>

                                        <div className='mt-6 mb-10 text-color-1 text-xl font-bold'>Enter OTP</div>

                                        <div className='mb-20'>
                                            <div>
                                                <input onChange={e => setCardOTP(e.target.value)} placeholder='Enter OTP sent to your phone' type='password' className='input p-4 text-lg font-bold border-1-d6 outline-white' max={6} />
                                            </div>
                                        </div>

                                        <div>
                                            <button type='button' className={isCardOTPFilled ? 'hidden' : 'w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50 hidden'}>Proceed</button>

                                            <button onClick={validateFundWithCardOTP} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Enter PIN Section */}
                                <div className={showPinSection ? 'pin-section' : 'hidden'}>
                                    <div>
                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-30 font-gotham-black-regular text-color-1 text-3xl'>₦ {showAmount}</div>

                                        <div>
                                            <div className='flex justify-between mb-30'>
                                                <div>Fees</div>
                                                <div>₦306.00</div>
                                            </div>

                                            <div className='flex justify-between mb-30'>
                                                <div>Total Cost</div>
                                                <div className='font-bold text-color-1 font-bold'>₦ 24,206.00</div>
                                            </div>

                                            <div className='flex justify-between mb-30'>
                                                <div>Card</div>
                                                <div className='font-bold text-gray-500'> (*** 3456)</div>
                                            </div>
                                        </div>

                                        <div className='border-bottom-1d mb-20'></div>

                                        {/* Pin Success */}
                                        <div className={isPinValid === 'true' ? "otp-alert mb-20" : "hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-14 text-color-1">{apiResponseSuccessMsg}</div>
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
                                        <div className={isPinValid !== 'false' ? "hidden" : "error-alert mb-20"}>
                                            <div className="flex justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-14">{apiResponseSuccessMsg}</div>
                                                </div>

                                                <div className="cursor-pointer">
                                                    <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='mb-20 text-color-1 text-xl font-bold'>Confirm Transaction PIN</div>

                                        <div className='mb-20'>


                                            <div className='text-13 font-bold mb-10'>Enter PIN</div>

                                            <div className='flex space-x-3'>
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white txn-pin' maxLength={1} />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white txn-pin' maxLength={1} />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white txn-pin' maxLength={1} />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white txn-pin' maxLength={1} />

                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white opacity-0' />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white opacity-0' />

                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={validatePin} type='button' className={isPinValid === 'false' || isPinValid === '' ? 'w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' : 'hidden'} >
                                                <span className={showSpinner ? "hidden" : ""}>Validate</span>
                                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                            </button>

                                            <button onClick={verifyCardFunding} type='button' className={isPinValid === 'true' ? 'w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' : 'hidden'} >
                                                <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Transaction success Section */}
                                <div className={showTransactionSection ? 'transaction-section' : 'hidden'}>
                                    <div>
                                        <div className="mx-auto w-65p h-64 relative">
                                            <img src={SuccessIcon} alt="success icon" className="w-22rem" />
                                            <div className="bg-white p-2 w-full -bottom-5 absolute"></div>
                                        </div>

                                        <div className='text-xl font-bold text-color-1 text-center mb-20'>Transaction Successful</div>

                                        <div className='border-bottom-1d'></div>

                                        <div className='mb-30'>
                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Card</div>
                                                <div className='font-bold text-gray-500'> (*** 3456)</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Fees</div>
                                                <div className='font-bold'>₦306.00</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Amount Funded</div>
                                                <div className='font-bold'>₦306.00</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Total Amount</div>
                                                <div className='font-bold text-color-1 font-bold'>₦ 24,206.00</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Date</div>
                                                <div className='font-bold text-color-1 font-bold'>29 August 2021 | 4:56 PM</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Reference</div>
                                                <div className='font-bold text-color-1 font-bold'>JU79273399334892HKS</div>
                                            </div>
                                        </div>

                                        <div className='flex space-x-3'>
                                            <button type='button' className='w-2/5 font-bold border-0 rounded-lg focus:shadow-outline px-5 py-2 bg-gray-200 cursor-pointer'>Share</button>

                                            <button type='button' className='w-3/5 font-bold border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Close</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Bank transfer Section */}
                                <div className={showBankTransferSection ? 'banktransfer-section' : 'hidden'}>
                                    <div>
                                        <div className="wallet-id-card mb-30">
                                            <div className="font-bold text-green-500 mb-10">Wallet ID</div>
                                            <div className="font-bold text-white mb-10 text-14">{customer.firstName + " " + customer.lastName + " " + customer.otherNames}</div>

                                            <div className="font-bold flex space-x-5 items-middle cursor-pointer  mb-5">
                                                <span className='text-28 text-white'>{customer.walletAccountNumber}</span>
                                                <CopyToClipboard text={customer.walletAccountNumber}>
                                                    <div className='poptip' style={{ marginTop: '8px' }}>
                                                        <img src={CopyIcon} onClick={changePopTipTextToCopied} alt="" />
                                                        <span className='poptiptext text-sm'>{poptiptext}</span>
                                                    </div>
                                                </CopyToClipboard>
                                            </div>
                                        </div>

                                        <div className='border border-gray-300 p-5 rounded mb-20'>
                                            <div className='font-bold'>
                                                <img src={InfoIcon} alt="" className='align-middle mr-3' /> Transfer Tips
                                            </div>
                                            <div className='pl-3'>
                                                <ul>
                                                    <li className='p-1'>Copy your wallect ID</li>
                                                    <li className='p-1'>Open Vbank app and click on funds transfer</li>
                                                    <li className='p-1'>Select (VFD Microfinance bank) beneficiary bank,</li>
                                                    <li className='p-1'>Enter your wallet ID as account number</li>
                                                    <li className='p-1'>Input amount and transfer</li>
                                                    <li className='p-1'>Your anchoria wallet will be credited with the amount</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='flex space-x-3'>
                                            <button type='button' className='w-full font-bold border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-4 cursor-pointer' >Close</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Funding History Section */}
                                <div className={switchToFundingHistory ? 'banktransfer-section' : 'hidden'}>
                                    <div>
                                        <table className="border-collapse table-fixed w-full text-sm">
                                            <thead>
                                                <tr>
                                                    <th className='text-left  p-2'>Source</th>
                                                    <th className='text-left  p-2'>Amount</th>
                                                    <th className='text-left   p-2'>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fundingHistory.map((item: any, index: any) =>
                                                    <tr key={index}>
                                                        <td className='text-left p-2' style={{ fontSize: '.80rem' }}>{item.fundingSources}</td>
                                                        <td className='text-left text-xs p-2' style={{ fontSize: '.80rem' }}>₦ {HelperFunctions.formatCurrencyWithDecimal(item.amount)}</td>
                                                        <td className='text-left text-xs  p-2' style={{ fontSize: '.80rem' }}>{moment(item.dateTime).format("MMM Do, YYYY hh:mm A")}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

export default FundAccount;