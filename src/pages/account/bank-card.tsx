import React, { useEffect, useState } from 'react';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import SuccessCheckIcon from '../../assets/images/success-check.svg';
import MaskGroupImg from '../../assets/images/mask-group.svg';
import LockIcon from '../../assets/images/lock.svg';
import DeleteCardIcon from '../../assets/images/delete-card.svg';
import Sidebar from '../../components/Sidebar';
import CloseIcon from '../../assets/images/close.svg';
import { encryptData } from '../../lib/encryptionHelper';
import { generalEncKey } from '../../common/constants/globals';
import axios from 'axios';
import SpinnerIcon from '../../assets/images/spinner.gif';
import moment from 'moment';
import * as HelperFunctions from '../../lib/helper';
import { getAxios } from '../../network/httpClientWrapper';
import { getUtilitiesEndpoint, walletAndAccountServiceBaseUrl } from '../../apiUrls';
import { Link } from 'react-router-dom';

const BankCard = () => {
    document.title = "Cards & Banks - Anchoria";

    const [showDebitCards, setShowDebitCards] = useState<boolean>(true);
    const [showBank, setShowBank] = useState<boolean>(false);

    const [showAddCard, setShowAddCard] = useState<boolean>(false);
    const [showAddBank, setShowAddBank] = useState<boolean>(false);

    const [showAddCardHeader, setShowAddCardHeader] = useState<boolean>(false);

    const [showOTPSection, setShowOTPSection] = useState<boolean>(false);
    const [showVerifyCardSection, setShowVerifyCardSection] = useState<boolean>(false);

    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const [showManageCard, setShowManageCard] = useState<boolean>(false);
    const [showManageBank, setShowManageBank] = useState<boolean>(false);

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [switchToDebit, setSwitchToDebit] = useState<boolean>(true);
    const [switchToBank, setSwitchToBank] = useState<boolean>(false);

    const [showBankHeader, setShowBankHeader] = useState<boolean>(false);
    const [showAddBankHeader, setShowAddBankHeader] = useState<boolean>(false);


    const [showBankSuccessMsg, ] = useState<boolean>(false);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankCode, setBankCode] = useState('');

    const [bankDetailsList, setBankDetailsList] = useState([]);
    const [selectedBankId, setSelectedBankId] = useState('');
    const [selectedBankDetails, setSelectedBankDetails] = useState([{}]);

    const [bankList, setBankList] = useState([]);

    const [bankDetailsError, setBankDetailsError] = useState('');

    const [deleteType, setDeleteType] = useState('');
    const [isDeleteSuccess, setIsDeleteSuccess] = useState('');
    const [isAddBankSuccess, setIsAddBankSuccess] = useState('');

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');

    const [cardsList, setCardsList] = useState([{}]);
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [cardPIN, setCardPIN] = useState('');
    const [cardOTP, setCardOTP] = useState('');
    const [defaultNewCardDebitMsg, setDefaultNewCardDebitMsg] = useState('');
    const [isBankDetailsFilled, setIsBankDetailsFilled] = useState<boolean>(false);    

    const [cardFundingDetails, setCardFundingDetails] = useState('');

    const [addCardError, setAddCardError] = useState('');
    const [verifyCardError, setVerifyCardError] = useState('');

    const [transactionPin, setTransactionPIN] = useState('');

    const [bankTransactionPin, setBankTransactionPIN] = useState('');
    const [isBankTransactionPinFilled, setIsBankTransactionPinFilled] = useState<boolean>(false);

    useEffect(() => {
        function getBankList() {
            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/wallet-api/get-banks')
                .then(function (response) {
                    setBankList(response.data.data.bank);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

        function getBankDetailsList() {

            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/wallet-api/bank-details')
                .then(function (response) {
                    setBankDetailsList(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getCardsList() {

            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/wallet-api/card')
                .then(function (response) {
                    setCardsList(response.data.data);
                })
                .catch(function (error) { });
        }

        function getDefaultNewCardDebit() {
            getAxios(axios).get(getUtilitiesEndpoint + '/default-new-card-debit')
                .then(function (response) {
                    setDefaultNewCardDebitMsg(response.data.message);
                })
                .catch(function (error) { });
        }

        getBankList();
        getBankDetailsList();
        getCardsList();
        getDefaultNewCardDebit();
    }, []);

    useEffect(()=>{
        function checkNameEnquiryOnBankDetails() {
            if (accountNumber === '' || bankCode === '') {
                setBankDetailsError('All fields are required.');
                setIsBankDetailsFilled(false);
            }
            else if(transactionPin === '') {
                setBankDetailsError('All fields are required.');
                setIsBankDetailsFilled(false);
            }
            else {    
    
                getAxios(axios).get(walletAndAccountServiceBaseUrl + '/wallet-api/name-enquiry?accountNo=' + accountNumber + '&bankCode=' + bankCode)
                .then(function (response) {

                    if(response.data.statusCode !== 200){
                        setBankDetailsError(response.data.message);
                        setAccountName('');
                        setIsBankDetailsFilled(false);
                    }
                    else{
                        setAccountName(response.data.data.name);
                        setBankDetailsError('');
                        setIsBankDetailsFilled(true);
                    }
                    
                })
                .catch(function (error) {
                    setBankDetailsError(error.response.data.message);
                    setAccountName('');
                    setIsBankDetailsFilled(false);
                });
            }
        }

        checkNameEnquiryOnBankDetails();
    },[accountNumber, bankCode, transactionPin]);

    useEffect(()=>{
        function checkBankTransactionPIN() {
            if(bankTransactionPin === '') {
                setIsBankTransactionPinFilled(false);
            }
            else{
                setIsBankTransactionPinFilled(true);
            }
        }

        checkBankTransactionPIN();
    },[bankTransactionPin]);

    

    function performSwitchToDebit() {
        setSwitchToDebit(true);
        setSwitchToBank(false);

        
        setShowBank(false);
        setShowBankHeader(false);        
        setShowAddBankHeader(false);
        setShowAddBank(false);

        setShowAddCardHeader(false);
        setShowAddCard(false);
        setShowVerifyCardSection(false);
        setShowDebitCards(true);

        setShowOTPSection(false);
        setShowSpinner(false);

        setShowManageCard(false);
        
    }

    function performSwitchToBank() {
        setSwitchToDebit(false);
        setSwitchToBank(true);

        setShowDebitCards(false);
        setShowManageBank(false);
        setShowBank(true);
        setShowBankHeader(true);
    }

    function displayAddCard() {
        setShowDebitCards(false);
        setShowAddCard(true);
        setShowAddCardHeader(true);
        setShowSuccess(false);
        setShowManageCard(false);
    }

    function displayManageCard() {
        setShowDebitCards(false);
        setShowAddCard(false);
        setShowSuccess(false);
        setShowManageCard(true);
        setShowBank(false);
    }

    function displayAddBank() {
        setShowDebitCards(false);
        setShowBank(false);
        setShowAddCard(false);
        setShowAddBank(true);
        setShowSuccess(false);
        setShowManageCard(false);
        setShowAddBankHeader(true);
        setShowBankHeader(false);
    }

    function closeModal() {
        setShowModalBG(false);
        setShowDeleteModal(false);
    }

    function addBankDetails() {

        let requestData = {
            "accountName": accountName,
            "accountNumber": accountNumber,
            "bankCode": bankCode,
            "bankName": 'VFD MICROFINANCE BANK',
        }

        console.log(requestData)

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), transactionPin);

        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/bank-details/add?nameEnquirySessionId=12233333',
            {
                "text": localStorage.getItem('genericCypher')
            },
            { headers })
            .then(function (response) {
                setShowSpinner(false);

                if(response.data.statusCode !== 200){
                    setBankDetailsError(response.data.message)
                }
                else{
                    setApiResponseSuccessMsg(response.data.description);
                    setIsAddBankSuccess('true');
                }
            })
            .catch(function (error) {
                setShowSpinner(false);
                setBankDetailsError(error.response.data.message);
            });
    }

    function selectBankDetails(event: any) {
        let id = event.target.getAttribute("data-bank");
        let bArr = [];
        let bDetails: any = bankDetailsList.find((el: any) => el.id === id);

        console.log(id);

        bArr.push(bDetails);

        setSelectedBankId(id);
        setSelectedBankDetails(bArr);

        setShowDebitCards(false);
        setShowAddCard(false);
        setShowSuccess(false);
        setShowManageCard(false);
        setShowBankHeader(false);
        setShowManageBank(true);
        setShowBank(false);
    }

    function deleteCardDetails() {


        setShowSpinner(true);

        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), bankTransactionPin);

        let apipath :any = "";

        apipath = cardsList.map((item :any)=>{
            return 'card/delete/'+(item.maskedPan);
        })

        let _headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        getAxios(axios).delete(walletAndAccountServiceBaseUrl + '/wallet-api/'+apipath,
            {
                headers: _headers
            },
        )
            .then(function (response) {
                setIsDeleteSuccess('true');
                setApiResponseSuccessMsg(response.data.description);
                setShowSpinner(false);

                window.location.reload();
            })
            .catch(function (error) {
                setShowSpinner(false);
                alert("Unable to delete. Please try again later");
            });
    }

    function deleteBankDetails() {

        setShowSpinner(true);

        let pinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), bankTransactionPin);

        let _headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12222',
            'x-transaction-pin': JSON.stringify({ text : pinCypher})
        }

        getAxios(axios).delete(walletAndAccountServiceBaseUrl + '/wallet-api/bank-details/delete/'+selectedBankId,
            {
                headers: _headers
            })
            .then(function (response) {
                setIsDeleteSuccess('true');
                setApiResponseSuccessMsg(response.data.description);
                setShowSpinner(false);

                window.location.reload();
            })
            .catch(function (error) {
                setShowSpinner(false);
                alert("Unable to delete. Please try again later");
            });
    }

    function displayDeleteModal(event: any) {
        let dtype = event.target.getAttribute("data-type");

        setDeleteType(dtype);
        setShowModalBG(true);
        setShowDeleteModal(true);
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

    function addCard() {
        let customer = JSON.parse(localStorage.getItem("aislCustomerInfo") as string);

        let requestData = {
            "cardNumber": cardNumber.replaceAll(" ", ""),
            "cvv": cardCVV,
            "expiryMonth": cardExpiry.split("/")[0],
            "expiryYear": cardExpiry.split("/")[1],
            "currency": "NGN",
            "email": customer.email,
            "fullname": customer.firstName + " " + customer.lastName,
            "phoneNumber": customer.phoneNumber,
            "saveCard": true,
            "pin": cardPIN,
            "amount": 1089
        }

        console.log(requestData)

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('aislUserToken'),
            'x-firebase-token': '12345',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/card',
            {
                "text": localStorage.getItem('genericCypher')
            },
        { headers })
        .then(function (response) {

            if(response.data.statusCode !== 200){
                setAddCardError(response.data.message)
            }
            else{
                setShowOTPSection(true);
                setShowAddCard(false);
                setShowSpinner(false);
                setShowAddCardHeader(true);

                setShowVerifyCardSection(false);

                setCardFundingDetails(JSON.stringify(response.data.data));
            }
        })
        .catch(function (error) {
            console.log(error)
            setShowSpinner(false);
            setAddCardError(error.response.data.message)
        });
    }

    function validateFundWithCardOTP() {
        let paymentRef = JSON.parse(cardFundingDetails);

        let requestData = {
            "paymentReference": paymentRef.flwRef,
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

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/fw/pay/card/validate-otp',
            {
                "text": localStorage.getItem('genericCypher')
            }, {headers})
            .then(function (response) {
                setShowSpinner(false);
                setShowOTPSection(false);
                setShowVerifyCardSection(true);
                setCardFundingDetails(JSON.stringify(response.data.data));
            })
            .catch(function (error) {
                console.log(error)
                setShowSpinner(false);
            });
    }

    function verifyCardFunding() {
        let paymentRes = JSON.parse(cardFundingDetails);

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

        getAxios(axios).post(walletAndAccountServiceBaseUrl + '/wallet-api/fw/transaction/verify',
        {
            "text": localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setShowSpinner(false);
            

            if(response.data.statusCode !== 200){
                setVerifyCardError(response.data.message);  
            }
            else{
                setShowOTPSection(false);
                setCardFundingDetails(JSON.stringify(response.data.data));
                setApiResponseSuccessMsg('');
                setVerifyCardError('');
            }
        })
        .catch(function (error) {     
            setVerifyCardError(error.response.data.message);           
            setShowSpinner(false);
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
                            <div className='m-auto w-1/2 pt-12'>

                                {/*Card Header */}
                                <div className={showDebitCards ? "flex justify-between" : 'hidden'} style={{ width: '35rem' }}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-30">Bank and Cards</div>                                        
                                    </div>

                                    <div className='font-bold'>
                                        <Link to='/account' className='no-underline text-green-900'>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        </Link>                                        
                                    </div>
                                </div>
                                {/*End*/}

                                {/*Bank Header */}
                                <div className={showBankHeader ? "flex justify-between" : 'hidden'} style={{ width: '35rem' }}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-30">Bank and Cards</div>
                                        <div className="font-bold mb-30 hidden">Request for investment statements</div>
                                    </div>

                                    <div className='font-bold' onClick={performSwitchToDebit}>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        
                                    </div>
                                </div>
                                {/*End*/}

                                {/*Add Card Header */}
                                <div className={showAddCardHeader ? "flex justify-between mb-30" : "hidden"} style={{ width: '35rem' }}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-10">Add New Card</div>
                                    </div>

                                    <div className='font-bold' onClick={performSwitchToDebit}>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back                                        
                                    </div>
                                </div>
                                {/*End*/}

                                {/*Add Bank Header */}
                                <div className={showAddBankHeader ? "flex justify-between mb-30" : "hidden"}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-10">Add New Bank</div>
                                    </div>

                                    <div className='font-bold' onClick={performSwitchToDebit}>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        
                                    </div>
                                </div>
                                {/*End*/}

                                {/*Manage Card Header */}
                                <div className={showManageCard ? "flex justify-between mb-30" : "hidden"}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-10">Manage Card</div>
                                    </div>

                                    <div className='font-bold' onClick={performSwitchToDebit}>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        
                                    </div>
                                </div>
                                {/*End*/}

                                {/*Manage Bank Header */}
                                <div style={{ width: '35rem' }} className={showManageBank ? "flex justify-between mb-30" : "hidden"}>
                                    <div>
                                        <div className="text-3xl text-green-900 font-gotham-black-regular font-bold mb-10">Manage Bank</div>
                                    </div>

                                    <div className='font-bold' onClick={performSwitchToBank}>
                                        <div className='no-underline text-green-900'>
                                            <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                        </div>
                                    </div>
                                </div>
                                {/*End*/}

                                <div className='mb-30 rounded-lg border-1-d6 bg-white p-10' style={{ width: '35rem' }}>
                                    {/* Cards Section */}
                                    <div className={showDebitCards ? 'amount-section' : 'hidden'}>
                                        <div>
                                            {/* Switch */}
                                            <div className='mb-30'>
                                                <div className="border_1 flex justify-between rounded-lg p-02rem w-22-4rem">
                                                    <div className='w-1/2'>
                                                        <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Debit Cards</button>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <button onClick={performSwitchToBank} type='button' className={switchToBank ? "w-full rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "w-full cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Bank</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End */}

                                            <div className={cardsList.length === 0 ? 'pb-16 text-gray-500':'hidden'}>No card added</div>

                                            {cardsList.map((item: any, index: any) =>
                                                <div className='mb-30' onClick={displayManageCard} key={index}>
                                                    <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer'>
                                                        <img src={MaskGroupImg} alt='' className="w-full" />
                                                        <div className='absolute bottom-0 px-7 py-6'>
                                                            <div className='text-white font-bold mb-2'>{item.cardBrand}</div>
                                                            <div className='text-white font-bold mb-2'>{item.maskedPan}</div>
                                                            <div className='text-white mb-2'>
                                                                <span className='text-sm'>Expires: </span> 
                                                                <span className='font-bold'>
                                                                    {item.expiryMonth} / {item.expiryYear}
                                                                </span>
                                                            </div>

                                                            <div className='text-white text-xs'>
                                                                (Click to view)
                                                            </div>
                                                        </div>

                                                        <div className='absolute top-1 p-6 right-1 w-32' style={{backgroundColor: '#ffaf34'}}></div>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <button onClick={displayAddCard} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Add New Card</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Bank Section */}
                                    <div className={showBank ? 'amount-section' : 'hidden'}>
                                        <div>
                                            <div className='mb-30'>
                                                <div className="border_1 flex justify-between rounded-lg p-02rem w-22-4rem">
                                                    <div className='w-1/2'>
                                                        <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Debit Cards</button>
                                                    </div>

                                                    <div className='w-1/2'>
                                                        <button onClick={performSwitchToBank} type='button' className={switchToBank ? "w-full rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "w-full cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Bank</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={bankDetailsList.length === 0 ? 'pb-16 text-gray-500':'hidden'}>No bank details added</div>

                                            {
                                                bankDetailsList.map((item: any, index: any) =>
                                                    <div className='mb-30' onClick={selectBankDetails} key={index} data-bank={item.id}>
                                                        <div className='rounded-xl relative cursor-pointer' data-bank={item.id}>
                                                            <img src={MaskGroupImg} alt='' className="w-full hidden" data-bank={item.id} />
                                                            <div className='bg-gray-100 px-4 py-3 rounded hover:bg-gray-200' data-bank={item.id}>
                                                                <div className='text-sm mb-10' data-bank={item.id}>{item.accountName}</div>
                                                                <div className='font-bold' data-bank={item.id}>{item.bankName} ({item.accountNumber})</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            <div>
                                                <button onClick={displayAddBank} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Add New Bank</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Add Card Section */}
                                    <div className={showAddCard ? 'card-section' : 'hidden'}>
                                        <div>
                                            {/* Add Card Error */}
                                            <div className={addCardError !== '' ? "error-alert mb-20" : "hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm">{addCardError}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Default message */}
                                            <div className="otp-alert mb-20">
                                                <div className='py-2'>
                                                    <div className="text-sm text-green-600 font-bold">{defaultNewCardDebitMsg}</div>
                                                </div>
                                            </div>
                                            {/* End */}


                                            <div className='mb-20 text-green-900 text-xl font-bold'>Enter your card details below</div>

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

                                            <div className='mb-20'>
                                                <div className='text-center mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                                <div className='px-5 pb-5 mt-1 mx-2 text-gray-900 text-center'>Your card details are secured and protected by our PCI-DSS compliant payment partners</div>
                                            </div>

                                            <div className='mb-3'>
                                                <button onClick={addCard} type='button' className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                    <span className={showSpinner ? "hidden" : ""}>Save Card</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>

                                            {/* Add Card Error */}
                                            <div className={addCardError !== '' ? "error-alert" : "hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm">{addCardError}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Verify OTP Section */}
                                    <div className={showOTPSection ? 'otp-section': 'hidden'}>
                                        <div className='otp-section'>
                                            <div>

                                                <div className='mt-6 mb-10 text-green-900 text-xl font-bold'>Enter OTP</div>

                                                <div className='mb-20'>
                                                    <div>
                                                        <input onChange={e => setCardOTP(e.target.value)} placeholder='Enter OTP sent to your phone' type='password' className='input p-4 text-lg font-bold border-1-d6 outline-white' max={6} />
                                                    </div>
                                                </div>

                                                <div>

                                                    <button type='button' onClick={validateFundWithCardOTP} className='w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* VERIFY Card Section */}
                                    <div className={showVerifyCardSection ? 'pin-section' : 'hidden'}>
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

                                            {/* verify Error */}
                                            <div className={verifyCardError !== '' ? "error-alert mb-20":"hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="text-sm">{verifyCardError}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            <div className='text-lg font-bold'>Verify Card Details</div>

                                            <div className='mb-30 font-gotham-black-regular text-green-900 text-2xl'>₦ {cardFundingDetails === '' ? '' : HelperFunctions.formatCurrencyWithDecimal(JSON.parse(cardFundingDetails).amount)}</div>

                                            
                                            <div className=''>
                                                <div className='flex justify-between mb-30'>
                                                    <div className='text-sm font-bold'>Card</div>
                                                    <div>{cardFundingDetails === '' ? '' : JSON.parse(cardFundingDetails).cardNumber}</div>
                                                </div>

                                                <div className='flex justify-between mb-30'>
                                                    <div className='text-sm font-bold'>Beneficiary Account Number</div>
                                                    <div className='font-bold text-green-900 font-bold'>{cardFundingDetails === '' ? '' : JSON.parse(cardFundingDetails).beneficiaryAccountNumber}</div>
                                                </div>

                                                <div className='flex justify-between mb-30'>
                                                    <div className='text-sm font-bold'>Currency</div>
                                                    <div className='font-bold text-gray-500'>{cardFundingDetails === '' ? '' : JSON.parse(cardFundingDetails).currency}</div>
                                                </div>
                                            </div>
                                            

                                            <div>
                                                <button onClick={verifyCardFunding} type='button' className= 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Add Bank Section */}
                                    <div className={showAddBank ? 'card-section' : 'hidden'}>
                                        <div>
                                            {/* Bank Details Error */}
                                            <div className={bankDetailsError ? "error-alert mb-20" : "hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="pt-1 text-sm">{bankDetailsError}</div>
                                                    </div>

                                                
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Add Bank Success */}
                                            <div className={isAddBankSuccess === 'true' ? "otp-alert mb-20" : "hidden"}>
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


                                            <div className='mb-5 text-green-900 text-xl font-bold'>Enter your bank details below</div>
                                            <div className='mb-30 text-green-900 text-md'>We pay your withdrawal into your bank account </div>                                        

                                            <div className='mb-30'>
                                                <div className='text-sm mb-10 font-bold'>Select Bank</div>

                                                <div>
                                                    <select onChange={e => setBankCode(e.target.value)} className='input px-5 py-3 border-1-d6 outline-white font-bold text-lg' id='bankList' >
                                                        <option value="">...</option>
                                                        {
                                                            bankList.map((item: any) =>
                                                                <option value={item.code}>{item.name}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='mb-30'>
                                                <div className='text-sm mb-10 font-bold'>Account Number</div>

                                                <div>
                                                    <input id="accountNumber" type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' onChange={e => setAccountNumber(e.target.value)} maxLength={10} />
                                                </div>
                                            </div>

                                            <div className='mb-30'>
                                                <div className='text-sm mb-10 font-bold'>Account Name</div>

                                                <div>
                                                    <input readOnly type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' value={accountName} />
                                                </div>
                                            </div>

                                            <div className='mb-30'>
                                                <div className='text-sm mb-10 font-bold'>PIN</div>

                                                <div>
                                                    <input type='password' className='input p-3 border-1-d6 outline-white font-bold text-lg' onChange={e => setTransactionPIN(e.target.value)} maxLength={4}/>
                                                </div>
                                            </div>

                                            <div className='mb-20'>
                                                <button onClick={addBankDetails} type='button' className={isBankDetailsFilled ? 'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer':'w-full font-bold text-lg border-0 bg-green-900 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer opacity-50'} disabled={!isBankDetailsFilled}>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>

                                            {/* Bank Details Error */}
                                            <div className={bankDetailsError ? "error-alert mb-20" : "hidden"}>
                                                <div className="flex justify-between space-x-1 pt-3">
                                                    <div className="flex">
                                                        <div>
                                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                            </svg>
                                                        </div>

                                                        <div className="pt-1 text-sm">{bankDetailsError}</div>
                                                    </div>

                                                
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Add Bank Success */}
                                            <div className={isAddBankSuccess === 'true' ? "otp-alert mb-20" : "hidden"}>
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
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Manage Card Section */}
                                    <div className={showManageCard ? 'pin-section ' : 'hidden'}>
                                        <div>
                                            <div className='mb-30'>
                                                <div className='p-5 bg-gray-100 rounded'>  
                                                    {cardsList.map((item :any, index :any) =>
                                                    <div key={index}>
                                                        <div className='font-bold mb-2'>{item.cardBrand}</div>

                                                        <div className='font-bold mb-2'>{item.maskedPan}</div>

                                                        <div className='mb-2'>
                                                            <span className='text-sm'>Expires: </span> 
                                                            <span className='font-bold'>{item.expiryMonth}/{item.expiryYear}</span>
                                                        </div>

                                                        <div>
                                                            <span className='text-sm'>Created on: </span> 
                                                            <span className='font-bold text-sm'>{moment(item.createdOn).format("Do MMM, YYYY hh:mm A")}</span>
                                                        </div>

                                                    </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='mb-20 hidden'>
                                                <div className='mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                                <div className='mt-1 text-gray-900'>Make this card your default debit card for your payments and transactions</div>
                                            </div>

                                            <div className="font-bold flex mb-30 hidden">
                                                <div className='mr-3'>Default debit card</div>

                                                <div className='flex rounded-3xl p-1 bg-green-900 ease-in-out transition delay-75 duration-75'>
                                                    <button className="rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75" type="button"></button>

                                                    <button className="ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75" type="button"></button>
                                                </div>
                                            </div>

                                            <div>
                                                <button onClick={displayDeleteModal} type='button' className='w-full font-bold text-lg border-0 bg-red-500 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' data-type='Card'>Delete Card</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Manage Bank Section */}
                                    <div className={showManageBank ? 'pin-section' : 'hidden'}>
                                        <div>
                                            {selectedBankDetails.map((item: any, index: any) =>
                                                <div className='mb-30'>
                                                    <div className='rounded-xl p-0'>
                                                        <img src={MaskGroupImg} alt='' className="w-full hidden" />

                                                        <div className='px-4 py-6 bg-gray-100 rounded'>
                                                            <div className='text-sm mb-10'>{item.accountName}</div>
                                                            <div className='font-bold mb-10'>{item.bankName} ({item.accountNumber})</div>

                                                            <div className='flex justify-between'>
                                                                <div className='text-sm'>{moment(item.updatedOn).format("MMMM Do, YYYY")}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className='mb-20 hidden'>
                                                <div className='mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                                <div className='mt-1 text-gray-900'>Make this card your default debit card for your payments and transactions</div>
                                            </div>

                                            <div className="font-bold flex mb-30 hidden">
                                                <div className='mr-3'>Default bank account </div>

                                                <div className='flex rounded-3xl p-1 bg-green-900 ease-in-out transition delay-75 duration-75'>
                                                    <button className="rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75" type="button"></button>

                                                    <button className="ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75" type="button"></button>
                                                </div>
                                            </div>

                                            {selectedBankDetails.map((item: any, index: any) =>
                                                <div>
                                                    <div className='flex justify-between py-5 hidden'>
                                                        <div>Bank</div>
                                                        <div className='font-bold'>{item.bankName}</div>
                                                    </div>

                                                    <div className='hidden mb-30 flex justify-between py-5 border-top-1'>
                                                        <div>Date Added</div>
                                                        <div className='font-bold text-green-900 font-bold'>{moment(item.updatedOn).format("MMMM Do, YYYY")}</div>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <button onClick={displayDeleteModal} type='button' className='w-full font-bold text-lg border-0 bg-red-500 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' data-type='Bank'>Delete bank</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Success Section */}
                                    <div className={showSuccess ? 'amount-section' : 'hidden'}>
                                        <div className="mx-auto w-1/2 relative mb-6">
                                            <img src={SuccessCheckIcon} alt="success icon" className="w-full" />
                                        </div>

                                        <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                                        <div className={showBankSuccessMsg ? 'hidden' : "px-20 pb-14 text-color-4 text-sm text-center"}>Your card details with card number ending with <strong>****3990</strong> has been successfully saved</div>

                                        <div className={showBankSuccessMsg ? "px-20 pb-14 text-color-4 text-sm text-center" : 'hidden'}>Your <strong>VFD Microfinance bank</strong> details with has been successfully saved</div>

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

            <div className={showDeleteModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-3xl text-green-900 font-gotham-black-regular"></div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div>
                    {/* Delete Success */}
                    <div className={isDeleteSuccess === 'true' ? "otp-alert mb-20" : "hidden"}>
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

                    <div className='text-center mb-20'>
                        <img src={DeleteCardIcon} alt='' />
                    </div>

                    <div className='text-red-500 font-bold text-3xl text-center mb-30'>Delete {deleteType}</div>           
                    
                    <div className='mb-30'>
                        <div className='text-sm mb-10 font-bold'>PIN</div>

                        <div>
                            <input type='password' className='input p-3 border-1-d6 outline-white font-bold text-lg' onChange={e => setBankTransactionPIN(e.target.value)} maxLength={4} value={bankTransactionPin}/>
                        </div>
                    </div>

                </div>

                <div className="flex space-x-5 mb-10">
                    <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                    <button onClick={deleteCardDetails} type="button" className={deleteType === 'Card' ? "py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer":"hidden"}>
                        <span className={showSpinner ? "hidden" : ""}>Delete</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                    </button>

                    <button onClick={deleteBankDetails} type="button" className={deleteType === 'Bank' ? "py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer":"hidden"} disabled={!isBankTransactionPinFilled}>
                        <span className={showSpinner ? "hidden" : ""}>Delete</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                    </button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
            </div>

        </div>
    );
};

export default BankCard;
