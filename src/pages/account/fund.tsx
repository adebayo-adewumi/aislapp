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

    const [fundingType, setFundingType] = useState('NEW_CARD_PAYMENT');

    const [transactionPin, setTransactionPIN] = useState('');

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
        setFundingType("NEW_CARD_PAYMENT");

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

            setApiResponseErrorMsg(error.response.data.message);
        });
    }

    function validateFundWithCardOTP() {
        let paymentRes = JSON.parse(localStorage.getItem("aislPayWithCardResponse") as string);

        let requestData = {
            "paymentReference": paymentRes.flwRef,
            "otp": cardOTP
        }

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

                setApiResponseErrorMsg(error.response.data.message);
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

        let headers = {
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        let _fundingType = fundingType === 'NEW_CARD_PAYMENT' ? '/fw/transaction/verify':'/fw/transaction/tokenized/verify';

       
        getAxios(axios).post(walletAndAccountServiceBaseUrl + ''+_fundingType,
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

            
        } 
        else{
            setIsSelectSavedCard(false);
            setSelectedSavedCard({});
        }
        
    }

    function processTokenizedPayment(){
        setFundingType("SAVED_CARD_PAYMENT");

        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), transactionPin);

        let _headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        let requestData = {
            "maskedPan": selectedSavedCard.maskedPan,
            "token": selectedSavedCard.token,
            "amount": parseFloat(showAmount.replaceAll(',','')),
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        axios.post(walletAndAccountServiceBaseUrl + '/fw/pay/tokenized',
        {
            "text": localStorage.getItem('genericCypher')
        },
        {
            headers: _headers
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

            <div className="h-screen flex">
                <Sidebar />

                {/* Main Content section */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className='px-10 py-24 flex-1 bg-gray-100 overflow-y-auto'>
                        <div className='m-auto w-1/2 pt-5'>
                            <div className="flex justify-between mb-3" style={{ width: '35rem' }}>
                                <div>
                                    <div className="text-2xl text-green-900 font-gotham-black-regular font-bold mb-3">Fund Account</div>
                                    <div className="hidden font-bold mb-30">Provide the details below</div>
                                    <span className='hidden'>{showAmount}</span>
                                </div>

                                <div className=''>                                    
                                    <Link to='/account' className='text-lg no-underline text-green-900'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>

                            <div className='mb-30 rounded-lg border bg-white p-10' style={{ width: '35rem' }}>
                                {/*Switch Section */}
                                <div className='mb-5'>
                                    <div className='mb-3 font-bold text-green-900 text-xl hidden'>How much would like to fund</div>

                                    <div className='mb-3'>
                                        <div className="border flex space-x-3 rounded-lg p-1">
                                            <div className='w-full'>
                                                <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 w-full bg-transparent"}>Debit Card</button>
                                            </div>

                                            <div className='w-full'>
                                                <button onClick={performSwitchToBank} type='button' className={switchToBank ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 w-full bg-transparent"}>Bank Transfer</button>
                                            </div>

                                            <div className='w-full'>
                                                <button onClick={performSwitchToFundingHistory} type='button' className={switchToFundingHistory ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-5 font-bold border-0 w-full bg-transparent"}>Funding History</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*End */}

                                {/* Enter Amount Section */}
                                <div className={showAmountSection ? 'amount-section' : 'hidden'}>
                                    <div>

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

                                        <div className='mb-8 font-gotham-black-regular text-green-900 text-4xl'>₦ {showAmount}</div>

                                        <div className='border-bottom-1d mb-3'></div>

                                        {/* Saved Card Section */}
                                        <div className={showAddCard ? 'hidden':'bg-gray-200 px-5 py-5 rounded-lg'}>

                                            {/* verify Error */}
                                            <div className={apiResponseErrorMsg !== '' ? "error-alert mb-5":"hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">                                                
                                                        <div className="text-sm">{apiResponseErrorMsg}</div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* End */}

                                            <div className='flex justify-between items-center mb-3 pb-5' style={{borderBottom:' 1px solid #ddd'}}>
                                                <div className='text-sm font-bold'>
                                                    Pay with card
                                                </div>

                                                <div>
                                                    <button onClick={displayAddCard} className='cursor-pointer border-0 bg-green-900 font-bold text-sm text-white px-3 py-2 rounded-lg'>Add New Card</button>
                                                </div>
                                            </div>

                                            <div className='mb-3 text-sm font-bold'>Saved cards</div>

                                            <div className='mb-5'>
                                                <div className={savedCards.length > 0 ? 'hidden':'text-gray-500'}>No saved cards</div>

                                                <select className={savedCards.length > 0 ? 'block w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white bg-white focus:ring-indigo-500':'hidden'} onChange={selectSavedCard}>
                                                    
                                                    <option value="">Select a card</option>

                                                    {savedCards.map((item :any, index :any)=>
                                                        <option value={item.maskedPan}>
                                                            {item.cardBrand} ({item.maskedPan})
                                                        </option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className='mb-6'>
                                                <div className='mb-3 text-sm font-bold'>Transaction Pin</div>

                                                <div>
                                                    <input type='password' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' onChange={e => setTransactionPIN(e.target.value)} maxLength={4} value={transactionPin}/>
                                                </div>
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

                                            {/* verify Error */}
                                            <div className={apiResponseErrorMsg !== '' ? "error-alert mb-5":"hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">
                                                        <div className="text-sm">{apiResponseErrorMsg}</div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* End */} 

                                            <div className='flex justify-between items-center mb-5'>
                                                <div className='text-green-900 text-xl font-bold'>Enter your card details</div>

                                                <div className='font-bold cursor-pointer' onClick={displaySavedCard}>
                                                    <strong className='text-lg'>&larr;</strong> Back
                                                </div>
                                            </div>

                                            <div className='mb-8'>
                                                <div className='text-sm mb-3 font-bold'>Card Number</div>

                                                <div className='relative'>
                                                    <input value={cardNumber} onKeyDown={handleCreditCardNumberInputSelection} onChange={maskCreditCardNumberInput} placeholder='Enter your 16 digits card number' type='text' className='cc-number-input bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500 font-bold' maxLength={19} />

                                                    <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--amex hidden" alt="" />
                                                    <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--visa hidden" alt="" />
                                                    <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--mastercard hidden" alt="" />
                                                    <img style={{ width: '10%', right: '20px' }} className="cc-types__img cc-types__img--disc hidden" alt="" />
                                                    <img style={{ width: '13%', right: '10px' }} className="cc-types__img cc-types__img--generic hidden" alt="" />

                                                </div>
                                            </div>

                                            <div className='mb-8'>
                                                <div className='flex justify-between space-x-5'>
                                                    <div className='w-1/2'>
                                                        <div className='text-sm mb-3 text-sm font-bold'>Validity</div>

                                                        <div>
                                                            <input value={cardExpiry} onChange={maskCreditCardExpiryInput} onKeyDown={handleCreditCardExpiryInputSelection} placeholder='MM / YY' type='text' className='cc-expiry-input bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500 font-bold' maxLength={5} />
                                                        </div>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <div className='text-sm  mb-3 text-sm font-bold'>CVV</div>

                                                        <div>
                                                            <input value={cardCVV} onChange={maskCreditCardCVVInput} onKeyDown={handleCreditCardCVVInputSelection} type='text' className='cc-cvv-input bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500 font-bold' maxLength={3} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='mb-8'>
                                                <div className='text-sm mb-3 text-sm font-bold'>PIN</div>

                                                <div className='mb-3'>
                                                    <input value={cardPIN} onChange={e => setCardPIN(e.target.value)} type='password' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' maxLength={4} />
                                                </div>
                                            </div>

                                            <div className='mb-3 flex hidden'>
                                                <Form.Check type="checkbox" className='portfoliolist-checkbox' />
                                                <div className='mt-1 font-bold mx-2 text-gray-900'>Save card details</div>
                                            </div>

                                            <div className='mb-5'>
                                                <button type='button' className={isCardDetailsFilled ? 'hidden' : 'w-full font-bold text-lg border-0 bg-green-900 text-white hidden rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50'}>Proceed</button>

                                                <button onClick={fundAccountWithCard} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>

                                            {/* verify Error */}
                                            <div className={apiResponseErrorMsg !== '' ? "error-alert":"hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">
                                                        <div className="text-sm">{apiResponseErrorMsg}</div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* End */} 
                                        </div>
                                        {/* End */}
                                    </div>
                                </div>
                                {/* End */}

                                {/* Enter OTP Section */}
                                <div className={showOTPSection ? 'otp-section' : 'hidden'}>
                                    {/* verify Error */}
                                    <div className={apiResponseErrorMsg !== '' ? "error-alert mb-5":"hidden"}>
                                        <div className="flex justify-between space-x-1 p-3">
                                            <div className="flex">                                                
                                                <div className="text-sm">{apiResponseErrorMsg}</div>
                                            </div>                                                    
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div>
                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-3 text-green-900 text-4xl'>₦ {HelperFunctions.formatCurrencyWithDecimal(parseFloat(showAmount.replace(',','')))}</div>

                                        <div className='border-bottom-1d mb-3'></div>

                                        <div className='mt-6 mb-3 text-green-900 text-xl font-bold'>Enter OTP</div>

                                        <div className='mb-8'>
                                            <div className='mb-2'>
                                                <input onChange={e => setCardOTP(e.target.value)} placeholder='Enter OTP sent to your phone' type='password' className='bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500' max={6} />
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
                                        <div className={apiResponseErrorMsg !== '' ? "error-alert mb-5":"hidden"}>
                                            <div className="flex justify-between space-x-1 p-3">
                                                <div className="flex">                                                
                                                    <div className="text-sm">{apiResponseErrorMsg}</div>
                                                </div>                                                    
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-5 font-gotham-black-regular text-green-900 text-3xl'>₦ {showAmount}</div>

                                        {/* Payment Summary */}
                                        {cardFundingDetails.map((item :any, index :any) =>
                                        <div className='' key={index}>
                                            <div className='flex justify-between mb-8 pb-3' style={{borderBottom: '1px solid #ccc'}}>
                                                <div className='text-lg'>Card</div>
                                                <div className='text-lg font-bold'>{item.cardNumber}</div>
                                            </div>

                                            <div className='flex justify-between mb-8 pb-3' style={{borderBottom: '1px solid #ccc'}}>
                                                <div className='text-lg'>Beneficiary Account Number</div>
                                                <div className='font-bold text-green-900 text-lg'>{item.beneficiaryAccountNumber}</div>
                                            </div>

                                            <div className='flex justify-between mb-8 pb-3' style={{borderBottom: '1px solid #ccc'}}>
                                                <div className='text-lg'>Currency</div>
                                                <div className='font-bold text-lg'>{item.currency}</div>
                                            </div>
                                        </div>
                                        )}
                                         {/* End */}

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
                                        <div className="mx-auto w-56 h-64 relative mt-12">
                                            <img src={SuccessCheckIcon} alt="success icon" className="w-56" />
                                        </div>

                                        <div className='text-xl text-green-900 text-center mb-8'>Transaction Successful</div>

                                        {cardFundingDetails.map((item :any, index :any) =>
                                        <div className='mb-8' key={index}>
                                            <div className='flex justify-between py-5 text-sm' style={{borderBottom: '1px solid #eee'}}>
                                                <div>Card</div>
                                                <div className='font-bold'>{item.cardNumber}</div>
                                            </div>

                                            <div className='flex justify-between py-5 text-sm' style={{borderBottom: '1px solid #eee'}}>
                                                <div>Amount Funded</div>
                                                <div className='font-bold'>₦ {HelperFunctions.formatCurrencyWithDecimal(item.amount)}</div>
                                            </div>

                                            <div className='flex justify-between py-5 text-sm' style={{borderBottom: '1px solid #eee'}}>
                                                <div>Date</div>
                                                <div className='font-bold text-green-900 font-bold'>{moment(item.updatedOn).format("DD MMMM YYYY | hh:mm A")}</div>
                                            </div>

                                            <div className='flex justify-between py-5 text-sm' style={{borderBottom: '1px solid #eee'}}>
                                                <div>Beneficiary Account Number</div>
                                                <div className='font-bold text-green-900 font-bold'>{item.beneficiaryAccountNumber}</div>
                                            </div>

                                            <div className='flex justify-between py-5 text-sm'>
                                                <div>Reference</div>
                                                <div className='font-bold text-green-900 font-bold'>{item.flwRef}</div>
                                            </div>
                                            
                                        </div>
                                        )}

                                        <div className='flex space-x-3'>
                                            
                                            <button onClick={performSwitchToDebit} type='button' className='w-full font-bold border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Close</button>
                                            
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Bank transfer Section */}
                                <div className={showBankTransferSection ? 'banktransfer-section' : 'hidden'}>
                                    <div>
                                        <div className="wallet-id-card mb-3">
                                            <div className="font-bold text-green-500 mb-3">Wallet ID</div>
                                            <div className="font-bold text-white mb-3 text-sm">{customer.firstName + " " + customer.lastName + " " + customer.otherNames}</div>

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

                                        <div className='border border-gray-300 p-5 rounded mb-3'>
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
    );
};

export default FundAccount;