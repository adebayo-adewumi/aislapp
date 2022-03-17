import React, { useEffect, useState } from 'react';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import Form from 'react-bootstrap/Form';
import SuccessCheckIcon from '../../assets/images/success-check.svg';
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
import { walletAndAccountServiceBaseUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';
import { Link } from 'react-router-dom';


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

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');
    const [apiResponseErrorMsg, setApiResponseErrorMsg] = useState('');

    const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem("aislCustomerInfo") as string));
    const [poptiptext, setPopTipText] = useState("Click to Copy");

    const [fundingHistory, setFundingHistory] = useState([]);
    const [cardFundingDetails, setCardFundingDetails] = useState([]);

    const [savedCards, setSavedCards] = useState<any[]>([]);
    const [showAddCard, setShowAddCard] = useState<boolean>(false);
    const [isSelectSavedCard, setIsSelectSavedCard] = useState<boolean>(false);
    const [selectedSavedCard, setSelectedSavedCard] = useState<any>({});

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

        checkIfCardDetailsAreFilled();
    },[cardNumber, cardExpiry, cardCVV, cardPIN]);

    useEffect(() =>{
        function checkIfCardOTPFilled() {
            if (cardOTP === '') {
                setIsCardOTPFilled(false);
            }
            else {
                setIsCardOTPFilled(true);
            }
        }

        checkIfCardOTPFilled();
    },[cardOTP]);

    useEffect(() =>{
        setCustomer(JSON.parse(localStorage.getItem("aislCustomerInfo") as string));

        function getFundingHistory() {
            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/funding-history')
                .then(function (response) {
                    setFundingHistory(response.data.data);
                })
                .catch(function (error) { });
        }
    
        getFundingHistory();

    },[]);

    useEffect(() =>{
        function getSavedCards() {
            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/card')
                .then(function (response) {
                    setSavedCards(response.data.data)
                })
                .catch(function (error) { });
        }
    
        getSavedCards();

    },[]);
    

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
            "cardNumber": cardNumber.replaceAll(" ",""),
            "cvv": cardCVV,
            "expiryMonth": cardExpiry.split("/")[0],
            "expiryYear": cardExpiry.split("/")[1],
            "currency": "NGN",
            "amount": parseFloat(showAmount.replaceAll(',','')),
            "email": customer.email,
            "fullname": customer.firstName+" "+customer.lastName,
            "phoneNumber": customer.phoneNumber,
            "saveCard": true,
            "pin": parseInt(cardPIN)
        }

        console.log(requestData);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/fw/pay/card',
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

            setCardFundingDetails([response.data.data] as any);
        })
        .catch(function (error) {
            setShowSpinner(false);
        });
    }

    function validateFundWithCardOTP() {
        let paymentRes = JSON.parse(localStorage.getItem("aislPayWithCardResponse") as string);

        let requestData = {
            "paymentReference": paymentRes.flwRef,
            "otp": cardOTP
        }

        console.log(requestData);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/fw/pay/card/validate-otp',
            {
                "text": localStorage.getItem('genericCypher')
            }, {headers})
            .then(function (response) {
                setShowSpinner(false);

                setShowAmountSection(false);
                setShowCardSection(false);
                setShowOTPSection(false);
                setShowPinSection(true);

                setCardFundingDetails([response.data.data] as any);
            })
            .catch(function (error) {
                setShowSpinner(false);
            });
    }

    function verifyCardFunding() {
        let paymentRes = JSON.parse(localStorage.getItem("aislPayWithCardResponse") as string);

        let requestData = {
            "transactionId": paymentRes.transactionId,
            "firebaseToken": HelperFunctions.generateRandomString(10)
        }

        console.log(requestData)

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/fw/transaction/verify',
            {
                "text": localStorage.getItem('genericCypher')
            },{headers})
            .then(function (response) {
                setShowSpinner(false);

                setShowAmountSection(false);
                setShowCardSection(false);
                setShowOTPSection(false);
                setShowPinSection(false);
                setShowTransactionSection(true);

                setCardFundingDetails([response.data.data] as any);

                setApiResponseSuccessMsg('');
            })
            .catch(function (error) {
                
                setShowSpinner(false);

                setApiResponseErrorMsg(error.response.data.message);
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

    function changePopTipTextToCopied() {
        setPopTipText("Copied!");
    }

    function delineateAmount(event :any) {
        let newValue = event.target.value.replace(/[^\d]/gi, '');

        setShowAmount(newValue);
    }

    function displayAddCard(){
        setShowAddCard(true);
    }

    function displaySavedCard(){
        setShowAddCard(false);
    }

    function selectSavedCard(event :any){
        if(event.target.value !== ''){
            let cardInfo = savedCards.find(elem => elem.maskedPan === event.target.value);
            setIsSelectSavedCard(true);
            setSelectedSavedCard(cardInfo);

            console.log(cardInfo);
        } 
        else{
            setIsSelectSavedCard(false);
            setSelectedSavedCard({});
        }
        
    }

    function processTokenizedPayment(){

        let requestData = {
            "maskedPan": selectedSavedCard.maskedPan,
            "token": selectedSavedCard.token,
            "amount": parseFloat(showAmount.replaceAll(',','')),
        }

        console.log(requestData);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/fw/pay/tokenized',
            {
                "text": localStorage.getItem('genericCypher')
        })
        .then(function (response) {
            setShowSpinner(false);

            setShowAmountSection(false);
            setShowCardSection(false);
            setShowOTPSection(false);
            setShowPinSection(true);

            localStorage.setItem("aislPayWithCardResponse", JSON.stringify(response.data.data));

            setCardFundingDetails([response.data.data] as any);
        })
        .catch(function (error) {
            setShowSpinner(false);

            setApiResponseErrorMsg(error.response.data.message);
        });
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className='m-auto w-1/2 pt-5'>
                                <div className="flex justify-between" style={{ width: '35rem' }}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-30">Fund Account</div>
                                        <div className="hidden font-bold mb-30">Provide the details below</div>
                                        <span className='hidden'>{showAmount}</span>
                                    </div>

                                    <div className='font-bold'>                                    
                                        <Link to='/account' className='no-underline text-green-900'>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        </Link>
                                    </div>
                                </div>

                                <div className='hidden border-bottom-1d mb-30 '></div>

                                <div className='mb-30 rounded-lg border-1-d6 bg-white p-10' style={{ width: '35rem' }}>
                                    {/*Switch Section */}
                                    <div>
                                        <div className='mb-10 font-bold text-green-900 text-xl hidden'>How much would like to fund</div>

                                        <div className='mb-30'>
                                            <div className="border_1 flex rounded-lg p-02rem" style={{ width: '390px' }}>
                                                <div>
                                                    <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bgcolor-f"}>Debit Card</button>
                                                </div>

                                                <div>
                                                    <button onClick={performSwitchToBank} type='button' className={switchToBank ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bgcolor-f"}>Bank Transfer</button>
                                                </div>

                                                <div>
                                                    <button onClick={performSwitchToFundingHistory} type='button' className={switchToFundingHistory ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bgcolor-f"}>Funding History</button>
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
                                                    <input type='text' onChange={delineateAmount} className='input-custom w-full font-gotham-black-regular border-r-0 font-black text-4xl py-5 pr-5 border-l-0 outline-white border-top-gray rounded-r-lg border-bottom-gray border-right-gray' placeholder='0.00' value={showAmount} />
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
                                                <button onClick={displayCardSection} type='button' className={showAmount !== '' ? 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' : 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 opacity-50'} disabled={!showAmount}>Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Enter Card Details Section */}
                                    <div className={showCardSection ? 'card-section' : 'hidden'}>                                        
                                        <div>
                                            <div className='text-lg font-bold'>Amount</div>

                                            <div className='mb-20 font-gotham-black-regular text-green-900 text-4xl'>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(showAmount.replace(',','')))}</div>

                                            <div className='border-bottom-1d mb-10'></div>

                                            {/* Saved Card Section */}
                                            <div className={showAddCard ? 'hidden':'bg-gray-200 px-5 py-5 rounded-lg'}>

                                                {/* verify Error */}
                                                <div className={apiResponseErrorMsg !== '' ? "error-alert mb-20":"hidden"}>
                                                    <div className="flex justify-between space-x-1 pt-3">
                                                        <div className="flex">
                                                            <div>
                                                                <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                                </svg>
                                                            </div>

                                                            <div className="text-sm">{apiResponseErrorMsg}</div>
                                                        </div>                                                    
                                                    </div>
                                                </div>
                                                {/* End */} 

                                                <div className='flex justify-between items-center mb-6 pb-5' style={{borderBottom:' 1px solid #ddd'}}>
                                                    <div className='text-sm font-bold'>
                                                        Pay with card
                                                    </div>

                                                    <div>
                                                        <button onClick={displayAddCard} className='cursor-pointer border-0 bg-green-900 font-bold text-sm text-white px-3 py-2 rounded-lg'>Add New Card</button>
                                                    </div>
                                                </div>

                                                <div className='mb-10 text-sm font-bold'>Saved cards</div>

                                                <div className='mb-3'>
                                                    <div className={savedCards.length > 0 ? 'hidden':'text-gray-500'}>No saved cards</div>

                                                    <select className={savedCards.length > 0 ? 'px-3 border text-sm outline-white py-3 w-full rounded-lg':'hidden'} onChange={selectSavedCard}>
                                                        
                                                        <option value="">Select a Card</option>

                                                        {savedCards.map((item :any, index :any)=>
                                                            <option value={item.maskedPan}>
                                                                {item.cardBrand} ({item.maskedPan})
                                                            </option>
                                                        )}
                                                    </select>
                                                </div>

                                                <div>
                                                    <button onClick={processTokenizedPayment} className={isSelectSavedCard ? 'cursor-pointer border-0 bg-green-900 font-bold text-sm text-white px-5 py-2 rounded-lg':'cursor-pointer border-0 bg-green-900 font-bold text-sm text-white px-5 py-2 rounded-lg opacity-50'} disabled={!isSelectSavedCard}>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Enter Card Section */}
                                            <div className={showAddCard ? '':'hidden'}>
                                                <div className='flex justify-between items-center'>
                                                    <div className='my-6 text-green-900 text-xl font-bold'>Enter your card details</div>

                                                    <div className='font-bold cursor-pointer' onClick={displaySavedCard}>
                                                        <strong className='text-lg'>&larr;</strong> Back
                                                    </div>
                                                </div>

                                                <div className='mb-20'>
                                                    <div className='text-sm mb-5 font-bold'>Card Number</div>

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
                                                            <div className='text-lg mb-5 text-sm font-bold'>Validity</div>

                                                            <div>
                                                                <input value={cardExpiry} onChange={maskCreditCardExpiryInput} onKeyDown={handleCreditCardExpiryInputSelection} placeholder='MM / YY' type='text' className='input p-5 cc-expiry-input border-1-d6 outline-white font-bold text-lg text-gray-600' maxLength={5} />
                                                            </div>
                                                        </div>

                                                        <div className='w-1/2'>
                                                            <div className='text-lg mb-5 text-sm font-bold'>CVV</div>

                                                            <div>
                                                                <input value={cardCVV} onChange={maskCreditCardCVVInput} onKeyDown={handleCreditCardCVVInputSelection} placeholder='CVV' type='text' className='input p-5 cc-cvv-input border-1-d6 outline-white font-bold text-lg text-gray-600' maxLength={3} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mb-20'>
                                                    <div className='text-lg mb-5 text-sm font-bold'>PIN</div>

                                                    <div className='mb-30'>
                                                        <input value={cardPIN} onChange={e => setCardPIN(e.target.value)} type='password' className='input p-4 border-1-d6 text-2xl outline-white' maxLength={4} />
                                                    </div>
                                                </div>

                                                <div className='mb-20 flex hidden'>
                                                    <Form.Check type="checkbox" className='portfoliolist-checkbox' />
                                                    <div className='mt-1 font-bold mx-2 text-gray-900'>Save card details</div>
                                                </div>

                                                <div>
                                                    <button type='button' className={isCardDetailsFilled ? 'hidden' : 'w-full font-bold text-lg border-0 bg-green-900 text-white hidden rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50'}>Proceed</button>

                                                    <button onClick={fundAccountWithCard} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* End */}
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Enter OTP Section */}
                                    <div className={showOTPSection ? 'otp-section' : 'hidden'}>
                                        <div>
                                            <div className='text-lg font-bold'>Amount</div>

                                            <div className='mb-20 font-gotham-black-regular text-green-900 text-4xl'>₦ {HelperFunctions.formatCurrencyWithDecimal(parseFloat(showAmount.replace(',','')))}</div>

                                            <div className='border-bottom-1d mb-10'></div>

                                            <div className='mt-6 mb-10 text-green-900 text-xl font-bold'>Enter OTP</div>

                                            <div className='mb-20'>
                                                <div className='mb-2'>
                                                    <input onChange={e => setCardOTP(e.target.value)} placeholder='Enter OTP sent to your phone' type='password' className='input p-4 text-lg font-bold border-1-d6 outline-white' max={6} />
                                                </div>

                                                <div className='font-bold text-green-900 text-sm cursor-pointer hover:underline' onClick={fundAccountWithCard}>Resend OTP</div>
                                            </div>

                                            <div>
                                                <button type='button' className={isCardOTPFilled ? 'hidden' : 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50 hidden'}>Proceed</button>

                                                <button onClick={validateFundWithCardOTP} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Enter VERIFY Card Section */}
                                    <div className={showPinSection ? 'pin-section' : 'hidden'}>
                                        <div>
                                            {/* verify Success */}
                                            <div className={apiResponseSuccessMsg !== '' ? "otp-alert mb-20":"hidden"}>
                                                <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm text-green-900">{apiResponseSuccessMsg}</div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* verify Error */}
                                            <div className={apiResponseErrorMsg !== '' ? "error-alert mb-20":"hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm">{apiResponseErrorMsg}</div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* End */}

                                            <div className='text-lg font-bold'>Amount</div>

                                            <div className='mb-30 font-gotham-black-regular text-green-900 text-3xl'>₦ {showAmount}</div>

                                            {cardFundingDetails.map((item :any, index :any) =>
                                            <div className='' key={index}>
                                                <div className='flex justify-between mb-30'>
                                                    <div>Card</div>
                                                    <div>{item.cardNumber}</div>
                                                </div>

                                                <div className='flex justify-between mb-30'>
                                                    <div>Beneficiary Account Number</div>
                                                    <div className='font-bold text-green-900 font-bold'>{item.beneficiaryAccountNumber}</div>
                                                </div>

                                                <div className='flex justify-between mb-30'>
                                                    <div>Currency</div>
                                                    <div className='font-bold text-gray-500'>{item.currency}</div>
                                                </div>
                                            </div>
                                            )}

                                            <div>
                                                <button onClick={verifyCardFunding} type='button' className= 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >
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
                                            <div className="mx-auto w-56 h-64 relative">
                                                <img src={SuccessCheckIcon} alt="success icon" className="w-56" />
                                            </div>

                                            <div className='text-xl font-bold text-green-900 text-center mb-20'>Transaction Successful</div>

                                            <div className='border-bottom-1d'></div>

                                            {cardFundingDetails.map((item :any, index :any) =>
                                            <div className='mb-30' key={index}>
                                                <div className='flex justify-between py-5 border-bottom-1d text-sm'>
                                                    <div>Card</div>
                                                    <div className='font-bold'>{item.cardNumber}</div>
                                                </div>

                                                <div className='flex justify-between py-5 border-bottom-1d text-sm'>
                                                    <div>Amount Funded</div>
                                                    <div className='font-bold'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.amount)}</div>
                                                </div>

                                                <div className='flex justify-between py-5 border-bottom-1d text-sm'>
                                                    <div>Date</div>
                                                    <div className='font-bold text-green-900 font-bold'>{moment(item.updatedOn).format("DD MMMM YYYY | hh:mm A")}</div>
                                                </div>

                                                <div className='flex justify-between py-5 border-bottom-1d text-sm'>
                                                    <div>Beneficiary Account Number</div>
                                                    <div className='font-bold text-green-900 font-bold'>{item.beneficiaryAccountNumber}</div>
                                                </div>

                                                <div className='flex justify-between py-5 border-bottom-1d text-sm'>
                                                    <div>Reference</div>
                                                    <div className='font-bold text-green-900 font-bold'>{item.flwRef}</div>
                                                </div>

                                                
                                            </div>
                                            )}

                                            <div className='flex space-x-3'>
                                                <button type='button' className='w-2/5 font-bold border-0 opacity-0 rounded-lg focus:shadow-outline px-5 py-2 bg-gray-200 cursor-pointer'>Share</button>

                                                
                                                <button onClick={performSwitchToDebit} type='button' className='w-3/5 font-bold border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Close</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Bank transfer Section */}
                                    <div className={showBankTransferSection ? 'banktransfer-section' : 'hidden'}>
                                        <div>
                                            <div className="wallet-id-card mb-30">
                                                <div className="font-bold text-green-500 mb-10">Wallet ID</div>
                                                <div className="font-bold text-white mb-10 text-sm">{customer.firstName + " " + customer.lastName + " " + customer.otherNames}</div>

                                                <div className="font-bold flex space-x-5 items-middle cursor-pointer  mb-5">
                                                    <span className='text-3xl text-white'>{customer.walletAccountNumber}</span>
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
                                                        <li className='p-1'>Open your bank app and click on funds transfer</li>
                                                        <li className='p-1'>Select (VFD Microfinance bank) beneficiary bank,</li>
                                                        <li className='p-1'>Enter your wallet ID as account number</li>
                                                        <li className='p-1'>Input amount and transfer</li>
                                                        <li className='p-1'>Your anchoria wallet will be credited with the amount</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='flex space-x-3 hidden'>
                                                <button type='button' className='w-full font-bold border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-4 cursor-pointer' >Close</button>
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

                                                <tbody className={fundingHistory.length > 0 ? '':'hidden'}>
                                                    {fundingHistory.map((item: any, index: any) =>
                                                        <tr key={index}>
                                                            <td className='text-left p-2' style={{ fontSize: '.80rem' }}>{item.fundingSources}</td>
                                                            <td className='text-left text-xs p-2' style={{ fontSize: '.80rem' }}>₦ {HelperFunctions.formatCurrencyWithDecimal(item.amount)}</td>
                                                            <td className='text-left text-xs  p-2' style={{ fontSize: '.80rem' }}>{moment(item.createdOn).format("MMM Do, YYYY hh:mm A")}</td>
                                                        </tr>
                                                    )}
                                                </tbody>

                                                <tbody className={fundingHistory.length <= 0 ? '':'hidden'}>
                                                    <tr>No records found</tr>
                                                </tbody>
                                            </table>
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

export default FundAccount;