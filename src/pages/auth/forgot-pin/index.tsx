import React, {useState, useEffect} from 'react';
import GenericHeader from '../../../components/Headers/GenericHeader';
import {Link} from "react-router-dom";
import '../forgot-pin/index.scss';
import axios from 'axios';
import SpinnerIcon from "../../../assets/images/spinner.gif";
import { authOnboardingServiceBaseUrl, utilityServiceBaseUrlUrl } from '../../../apiUrls';
import { getAxios } from '../../../network/httpClientWrapper';
import { encryptData } from '../../../lib/encryptionHelper';
import { generalEncKey } from '../../../common/constants/globals';

const ForgotPin = () => {
    const [email, setEmail] = useState('');
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isEmailNullOrEmpty, setIsEmailNullOrEmpty] = useState<boolean>(true);
    const [showForgotPinCard, setShowForgotPinCard] = useState<boolean>(true);
    const [forgotPinHasError, setForgotPinHasError] = useState<boolean>(false);
    const [forgotPinErrorMsg, setForgotPinErrorMsg] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [showVerifyOTPCard, setShowVerifyOTPCard] = useState<boolean>(false);

    const [otpHasError, setOTPHasError] = useState<boolean>(false);
    const [otpErrorMsg, setOTPErrorMsg] = useState('');

    const [otp, setOTP] = useState('');

    const [showResetPinCard, setShowResetPinCard] = useState<boolean>(false);

    const [resetHasError, setResetHasError] = useState<boolean>(false);
    const [resetErrorMsg, setResetErrorMsg] = useState('');
    
    const [resetHasSuccess, setResetHasSuccess] = useState<boolean>(false);
    const [resetSuccessMsg, setResetSuccessMsg] = useState('');

    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const [isPinMatch, setIsPinMatch] = useState<boolean>(true);
    const [isShowPin, setIsShowPin] = useState<boolean>(false);
    const [isShowConfirmPin, setIsShowConfirmPin] = useState<boolean>(false);

    const [pinOrConfirmPinIsNullOrEmpty, setPinOrConfirmPinIsNullOrEmpty] = useState<boolean>(true);

    document.title = "Forgot Pin - Anchoria";

    useEffect(() => {
        async function checkIfEmailIsValid(){    
            if(email.length > 0){
                validateEmail();
            }
        } 

        checkIfEmailIsValid();
    });  

    useEffect(() => {
        async function checkIfPinIsNullOrEmpty(){
            checkIfPinOrConfirmPinIsNullOrEmpty();
        } 

        async function checkIfConfirmPinIsNullOrEmpty(){    
            if(pin !== confirmPin){
                setIsPinMatch(false);
            }
            else{
                setIsPinMatch(true);
            }
        } 

        function checkIfPinOrConfirmPinIsNullOrEmpty(){
            if(pin === '' || confirmPin === '' || pin !== confirmPin){
                setPinOrConfirmPinIsNullOrEmpty(true);
            }
            else{
                setIsPinMatch(true);
                setPinOrConfirmPinIsNullOrEmpty(false);
            }
        }

        checkIfPinIsNullOrEmpty();
        checkIfConfirmPinIsNullOrEmpty();
    },[pin, confirmPin]); 

    

    function validateEmail(){
        const regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(!email || regex.test(email) === false){
            setIsInvalidEmail(true);
            setIsEmailNullOrEmpty(true);
        }
        else{
            setIsInvalidEmail(false);
            setIsEmailNullOrEmpty(false);
        }
    }

    function sendResetPinLink(){
        setShowSpinner(true);  
    
        getAxios(axios).get(authOnboardingServiceBaseUrl+'/customer/forgot-pin/initiate?email='+email)
        .then(function (response) {

            setShowForgotPinCard(false);
            setShowVerifyOTPCard(false);
            setShowResetPinCard(true);

            setForgotPinHasError(false);

            setShowSpinner(false);
        })
        .catch(function (error) {
            setShowSpinner(false);  
            setForgotPinHasError(true);
            setForgotPinErrorMsg(error.response.data.message)
        });        
    }

    function validateOTP(){

        let requestData = {
            "email":email,
            "otp":otp
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        axios.post(utilityServiceBaseUrlUrl.concat('/otp/validate'),
        {
            "text": localStorage.getItem('genericCypher')
        })
        .then(function (response:any) {
            setShowSpinner(false);
            setShowVerifyOTPCard(true);
            setShowForgotPinCard(false);
        })
        .catch(function (error:any) {
            setOTPHasError(true);
            setOTPErrorMsg(error.response.data.message);
            setShowSpinner(false);
        });
    } 

    function resetPin(){
        let requestData = {
            "email": email,
            "pin": pin,
            "token": otp
        }

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        setShowSpinner(true);

        getAxios(axios).post(authOnboardingServiceBaseUrl+'/customer/forgot-pin-with-token',
        {
            "text": localStorage.getItem('genericCypher')
        })
        .then(function (response) {  
            setShowSpinner(false);

            setResetHasSuccess(true);
            setResetSuccessMsg('Pin changed successfully. You will be redirected to login shortly.');

            setResetHasError(false);
            setResetErrorMsg('');

            setTimeout(()=>{
                window.location.href = "/";
            },3000)
        })
        .catch(function (error) {
            setResetHasError(true);
            setResetErrorMsg(error.response.data.message);

            setResetHasSuccess(false);
            setResetSuccessMsg('');

            setShowSpinner(false);
        });
    }


    return (
        <div className='relative bg-gray-100'>
            <GenericHeader />

            <div className='h-screen m-0'>
                <div className='min-w-0 h-full'>

                    <div className='relative h-full'>
                        {/* Forgot Pin Card */}
                        <div className={showForgotPinCard ? 'relative':'hidden'}>
                            <div className={showForgotPinCard ? "mx-auto forgot-pin-form-container top-32" : "hidden"}>
                                <form>
                                    <div className="font-bold mb-3 forgot-text text-2xl ">Forgot Pin</div>
                                    <p className="mb-5 text-sm">Type the email you used to sign up on Achoria and we'll send you a pin reset email.</p>

                                    {/* Forgot Pin Error */}
                                    <div className={forgotPinHasError ? "error-alert mb-3":"hidden"}>
                                        <div className="flex justify-between space-x-1 p-3">
                                            <div className="flex">
                                                <div className="text-sm">{forgotPinErrorMsg}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className="mb-8">
                                        <div className="mb-3 text-sm font-bold">Email</div>
                                        
                                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500"/>
                                        
                                        <div className={isInvalidEmail ? 'text-red-500 text-sm mt-2' : 'text-red-500 text-sm mt-2 hidden'}>Please enter a valid email address</div>
                                    </div>

                                    <div className="mb-3 w-full">
                                        <button onClick={sendResetPinLink} className={ isEmailNullOrEmpty ? "w-full text-sm rounded-lg bg-green-900 opacity-50 border-0 py-4 text-white font-bold" : "w-full text-sm rounded-lg bg-green-900 cursor-pointer focus:shadow-outline border-0 py-4 text-white font-bold"} type='button' disabled={isEmailNullOrEmpty}>
                                            <span className={ showSpinner ? "hidden" : ""}>Send Pin Reset Link</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                        </button>
                                    </div>

                                    <div className="text-right text-sm">
                                        <Link to="/" className="no-underline text-green-900">Back to Login</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* End */}

                        {/* VERIFY OTP Section */}
                        <div className={showVerifyOTPCard ? 'relative':'hidden'}>
                            <div className="mx-auto reset-pin-link-confirmation-container top-32">

                                {/* otp Error */}
                                <div className={otpHasError ? "error-alert mb-3":"hidden"}>
                                    <div className="flex justify-between space-x-1 p-3">
                                        <div className="flex">

                                            <div className="text-sm">{otpErrorMsg}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                <div className="text-center text-xl text-green-900 mb-3">Verify OTP</div>

                                <div className="text-center text-sm mb-8">We’ve sent a one-time pin to your email</div>

                                <div className="mb-8">
                                    <div className="mb-3 text-sm font-bold">Enter OTP</div>

                                    <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="Enter One-Time Pin" className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500"/>
                                </div>

                                <div className="text-center text-sm">
                                    <button type='button' className="bg-green-900 text-white font-bold cursor-pointer text-sm p-4 rounded-lg border-0 w-full" onClick={validateOTP}>
                                        <span className={showSpinner ? "hidden" : ""}>Validate OTP</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        {/* RESET PASSWORD Section */}
                        <div className={showResetPinCard ? 'relative':'hidden'}>
                            <div className= "mx-auto reset-pin-link-confirmation-container top-32">

                                {/* reset Error */}
                                <div className={resetHasError ? "error-alert mb-3":"hidden"}>
                                    <div className="flex justify-between space-x-1 p-3">
                                        <div className="flex">

                                            <div className="text-sm">{resetErrorMsg}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* reset success */}
                                <div className={resetHasSuccess ? "otp-alert mb-3" : "hidden"}>
                                    <div className="flex otp-validated justify-between space-x-1 p-3">
                                        <div className="flex">

                                            <div className="text-sm text-green-900">{resetSuccessMsg}</div>
                                        </div>


                                    </div>
                                </div>
                                {/* End */}

                                <div className='text-xl font-bold mb-5'>Reset Pin</div>

                                <div className="mb-5">
                                    <div className="mb-3 text-sm font-bold">Enter OTP</div>

                                    <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="Enter One-Time Pin" className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500"/>
                                </div>

                                {/* Pin section */}
                                <div className="mb-5">
                                    <div className="relative">
                                        <div className="mb-3 text-sm font-bold">New pin</div>
                                        <div className='p-1 flex w-full items-center justify-between border rounded-lg '>
                                            <div className='w-full'>
                                                <input value={pin} onChange={e => setPin(e.target.value)} type={isShowPin ? 'text' : 'password'} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500" placeholder="Enter pin" name="pin" maxLength={4}/>
                                            </div>

                                            <div className='px-2 pt-1'>
                                                <svg onClick={e => setIsShowPin(true)} className={isShowPin ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                </svg>

                                                <svg onClick={e => setIsShowPin(false)} className={isShowPin ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Confirm Pin section */}
                                <div className="mb-8">
                                    <div className="relative">
                                        <div className="mb-3 text-sm font-bold">Confirm Pin</div>
                                        <div className='p-1 flex w-full items-center justify-between border rounded-lg '>
                                            <div className='w-full'>
                                                <input value={confirmPin} onChange={e => setConfirmPin(e.target.value)} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500" placeholder="Type your pin again" name="pin" type={isShowConfirmPin ? 'text' : 'password'} maxLength={4}/>
                                            </div>

                                            <div className='px-2 pt-1'>
                                                <svg onClick={e => setIsShowConfirmPin(true)} className={isShowConfirmPin ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                </svg>

                                                <svg onClick={e => setIsShowConfirmPin(false)} className={isShowConfirmPin ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className={isPinMatch ? "text-red-500 text-sm mt-2 hidden":"text-red-500 text-sm mt-2 "}>Pins did not match</div>
                                    </div>
                                </div> 
                                {/* End */}    

                                {/* Proceed Button section */}
                                <div>
                                    <div>
                                        <button onClick={resetPin} className={pinOrConfirmPinIsNullOrEmpty ? "w-full rounded-lg bg-green-900 border-0 text-white opacity-50 px-20 py-3 font-bold text-sm":"w-full rounded-lg bg-green-900 border-0 text-white px-20 py-3 font-bold text-sm cursor-pointer"} type='button' disabled={pinOrConfirmPinIsNullOrEmpty}>
                                            <span className={ showSpinner ? "hidden" : ""}>Reset</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                        </button>
                                    </div>
                                </div>
                                {/* End */}
                            </div>
                        </div>
                        {/* End */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPin;