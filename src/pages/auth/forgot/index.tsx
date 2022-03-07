import React, {useState, useEffect} from 'react';
import GenericHeader from '../../../components/Headers/GenericHeader';
import {Link} from "react-router-dom";
import '../forgot/index.scss';
import axios from 'axios';
import SpinnerIcon from "../../../assets/images/spinner.gif";
import { authOnboardingServiceBaseUrl, utilityServiceBaseUrlUrl } from '../../../apiUrls';
import { getAxios } from '../../../network/httpClientWrapper';
import { encryptData } from '../../../lib/encryptionHelper';
import { generalEncKey } from '../../../common/constants/globals';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');

    const [password, setPassword] = useState('');

    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isEmailNullOrEmpty, setIsEmailNullOrEmpty] = useState<boolean>(true);

    const [showForgotPasswordCard, setShowForgotPasswordCard] = useState<boolean>(true);
    const [showVerifyOTPCard, setShowVerifyOTPCard] = useState<boolean>(false);
    const [showResetPasswordCard, setShowResetPasswordCard] = useState<boolean>(false);
    
    const [forgotPasswordHasError, setForgotPasswordHasError] = useState<boolean>(false);
    const [forgotPasswordErrorMsg, setForgotPasswordErrorMsg] = useState('');

    const [otpHasError, setOTPHasError] = useState<boolean>(false);
    const [otpErrorMsg, setOTPErrorMsg] = useState('');

    const [resetHasError, setResetHasError] = useState<boolean>(false);
    const [resetErrorMsg, setResetErrorMsg] = useState('');
    
    const [resetHasSuccess, setResetHasSuccess] = useState<boolean>(false);
    const [resetSuccessMsg, setResetSuccessMsg] = useState('');

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordOrConfirmPasswordIsNullOrEmpty, setPasswordOrConfirmPasswordIsNullOrEmpty] = useState<boolean>(true);

    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

    const [hasMinAndMaxCharacter, setHasMinAndMaxCharacter] = useState<boolean>(false);
    const [hasLowerCaseCharacter, setHasLowerCaseCharacter] = useState<boolean>(false);
    const [hasUpperCaseCharacter, setHasUppererCaseCharacter] = useState<boolean>(false);
    const [hasNumericCharacter, setHasNumericCharacter] = useState<boolean>(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false);

    document.title = "Forgot Password - Anchoria";

    useEffect(() => {
        async function checkIfEmailIsValid(){    
            if(email.length > 0){
                validateEmail();
            }
        } 

        checkIfEmailIsValid();
    });  

    useEffect(() => {
        async function checkIfPasswordIsNullOrEmpty(){
            validatePassword();
            checkIfPasswordOrConfirmPasswordIsNullOrEmpty();
        } 

        async function checkIfConfirmPasswordIsNullOrEmpty(){    
            if(password !== confirmPassword){
                setIsPasswordMatch(false);
            }
            else{
                setIsPasswordMatch(true);
            }
        } 

        checkIfPasswordIsNullOrEmpty();
        checkIfConfirmPasswordIsNullOrEmpty();
    });    

    function checkIfPasswordOrConfirmPasswordIsNullOrEmpty(){
        if(password === '' || confirmPassword === '' || password !== confirmPassword){
            setPasswordOrConfirmPasswordIsNullOrEmpty(true);
        }
        else if(!hasMinAndMaxCharacter || !hasLowerCaseCharacter || !hasUpperCaseCharacter || !hasNumericCharacter || !hasSpecialCharacter){
            setPasswordOrConfirmPasswordIsNullOrEmpty(true);
        }
        else{
            setIsPasswordMatch(true);
            setPasswordOrConfirmPasswordIsNullOrEmpty(false);
        }
    }

    function validatePassword(){
        //const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/i);

        const minCharacters = 8;
        const maxCharacters = 32;
        const lowerCase = /[a-z]+/g;
        const upperCase = /[A-Z]+/g;
        const numericCharacter = /\d+/g;
        const specialCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+/g;

        if(password.length >= minCharacters && password.length <= maxCharacters){
            setHasMinAndMaxCharacter(true);
        }
        else {
            setHasMinAndMaxCharacter(false);
        }
        
        if(lowerCase.test(password)){
            setHasLowerCaseCharacter(true);
        }
        else{
            setHasLowerCaseCharacter(false);
        }

        if(upperCase.test(password)){
            setHasUppererCaseCharacter(true);
        }
        else{
            setHasUppererCaseCharacter(false);
        }

        if(numericCharacter.test(password)){
            setHasNumericCharacter(true);
        }
        else{
            setHasNumericCharacter(false);
        }

        if(specialCharacter.test(password)){
            setHasSpecialCharacter(true);
        }
        else{
            setHasSpecialCharacter(false);
        }
    }

    function resetPassword(){
        let requestData = {
            "email": email,
            "password": password,
            "token": otp
        }

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        setShowSpinner(true);

        getAxios(axios).post(authOnboardingServiceBaseUrl+'/customer/forgot-password-with-token',
        {
            "text": localStorage.getItem('genericCypher')
        })
        .then(function (response) {  
            setShowSpinner(false);

            setResetHasSuccess(true);
            setResetSuccessMsg('Password changed successfully. You will be redirected to login shortly.');

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

    function sendResetPasswordLink(){
        setShowSpinner(true);  
    
        getAxios(axios).get(authOnboardingServiceBaseUrl+'/customer/forgot-password/initiate?email='+email)
        .then(function (response) {

            setShowForgotPasswordCard(false);
            setShowVerifyOTPCard(false);
            setShowResetPasswordCard(true);

            setForgotPasswordHasError(false);

            setShowSpinner(false);
        })
        .catch(function (error) {
            setShowSpinner(false);  
            setForgotPasswordHasError(true);
            setForgotPasswordErrorMsg(error.response.data.message)
        });        
    }

    function closeForgotPasswordHasError(){
        setForgotPasswordHasError(false);
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
            setShowResetPasswordCard(true);
            setShowVerifyOTPCard(false);
            setShowForgotPasswordCard(false);
        })
        .catch(function (error:any) {
            setOTPHasError(true);
            setOTPErrorMsg(error.response.data.message);
            setShowSpinner(false);
        });
    }    


    return (
        <div>
            <GenericHeader />

            {/* Forgot Password Section */}
            <div className={showForgotPasswordCard ? "mx-auto forgot-password-form-container mt-32" : "hidden"}>
                <form>
                    <div className="font-bold mb-20 forgot-text text-xl font-gotham-black-regular">Forgot Password</div>
                    <p className="mb-30 forgot-text text-sm line-height-28 font-bold">Type the email you used to sign up on Anchoria and we'll send you a password reset email.</p>

                    {/* Forgot Password Error */}
                    <div className={forgotPasswordHasError ? "error-alert mb-20":"hidden"}>
                        <div className="flex justify-between space-x-1 pt-3">
                            <div className="flex">
                                <div>
                                    <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                    </svg>
                                </div>

                                <div className="pt-1 text-sm">{forgotPasswordErrorMsg}</div>
                            </div>
                            
                            <div className="cursor-pointer" onClick={closeForgotPasswordHasError}>
                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* End */}

                    <div className="mb-30">
                        <div className="mb-2 text-sm font-bold">Email</div>
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="input border-1-d6 px-3 py-3 text-24 outline-white"/>
                        <div className={isInvalidEmail ? 'text-red-500 text-sm mt-2' : 'text-red-500 text-sm mt-2 hidden'}>Please enter a valid email address</div>
                    </div>

                    <div className="mb-30 w-full">
                        <button onClick={sendResetPasswordLink} className={ isEmailNullOrEmpty ? "w-full text-sm rounded-lg bg-green-900 opacity-50 border-0 py-4 text-white font-bold text-24" : "w-full text-sm rounded-lg bg-green-900 cursor-pointer focus:shadow-outline border-0 py-4 text-white font-bold text-24"} type='button' disabled={isEmailNullOrEmpty}>
                            <span className={ showSpinner ? "hidden" : ""}>Send Password Reset Link</span>
                            <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                        </button>
                    </div>

                    <div className="text-right font-bold forgot-text text-sm">
                        <Link to="/" className="no-underline text-green-900">Back to Login</Link>
                    </div>
                </form>
            </div>
            {/* End */}

            {/* VERIFY OTP Section */}
            <div className={showVerifyOTPCard ? "mx-auto reset-password-link-confirmation-container mt-32" : "hidden"}>

                {/* otp Error */}
                <div className={otpHasError ? "error-alert mb-20":"hidden"}>
                    <div className="flex justify-between space-x-1 pt-3">
                        <div className="flex">
                            <div>
                                <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                </svg>
                            </div>

                            <div className="pt-1 text-sm">{otpErrorMsg}</div>
                        </div>
                    </div>
                </div>
                {/* End */}

                <div className="text-center text-xl font-gotham-black-regular text-green-900 mb-3">Verify OTP</div>

                <div className="text-center text-sm mb-6 font-bold">We’ve sent a one-time password to your email</div>

                <div className="mb-30">
                    <div className="mb-2 text-sm font-bold">Enter OTP</div>

                    <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="Enter One-Time Password" className="input border-1-d6 px-3 py-3 text-24 outline-white"/>
                </div>

                <div className="text-center text-sm">
                    <button type='button' className="bg-green-900 text-white font-bold cursor-pointer text-sm p-4 rounded-lg border-0 w-full" onClick={validateOTP}>
                        <span className={showSpinner ? "hidden" : ""}>Validate OTP</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                    </button>
                </div>
            </div>
            {/* End */}


            {/* RESET PASSWORD Section */}
            <div className={showResetPasswordCard ? "mx-auto reset-password-link-confirmation-container mt-32" : "hidden"}>

                {/* reset Error */}
                <div className={resetHasError ? "error-alert mb-20":"hidden"}>
                    <div className="flex justify-between space-x-1 pt-3">
                        <div className="flex">
                            <div>
                                <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                </svg>
                            </div>

                            <div className="pt-1 text-sm">{resetErrorMsg}</div>
                        </div>
                    </div>
                </div>
                {/* End */}

                {/* reset success */}
                <div className={resetHasSuccess ? "otp-alert mb-20" : "hidden"}>
                    <div className="flex otp-validated justify-between space-x-1 pt-3">
                        <div className="flex">
                            <div>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                    <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                </svg>
                            </div>

                            <div className="pt-1 text-sm text-green-900">{resetSuccessMsg}</div>
                        </div>


                    </div>
                </div>
                {/* End */}

                <div className='text-xl font-bold mb-6'>Reset Password</div>

                <div className="mb-30">
                    <div className="mb-2 text-sm font-bold">Enter OTP</div>

                    <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="Enter One-Time Password" className="input border-1-d6 px-3 py-3 text-24 outline-white"/>
                </div>

                {/* Password section */}
                <div className="mb-20">
                    <div className="relative">
                        <div className="mb-10 text-sm font-bold">New password</div>
                        <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                            <div className='w-full'>
                                <input value={password} onChange={e => setPassword(e.target.value)} type={isShowPassword ? 'text' : 'password'} className="outline-white input border-0 text-sm p-3" placeholder="Enter password" name="password"/>
                            </div>

                            <div className='px-2 pt-1'>
                                <svg onClick={e => setIsShowPassword(true)} className={isShowPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                </svg>

                                <svg onClick={e => setIsShowPassword(false)} className={isShowPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End */}

                {/* Password Policy section */}
                <div>
                    <div className="flex space-x-5 mb-10">
                        <div className="flex text-sm space-x-1 text-color-3">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                </svg>
                            </div>

                            <div className={hasMinAndMaxCharacter ? "pt-20 text-color-2a font-bold text-sm": "pt-20 text-sm"}>At least 8 characters strong</div>
                        </div>

                        <div className="flex text-sm space-x-1 text-color-3">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                </svg>
                            </div>

                            <div className={hasLowerCaseCharacter ? "pt-20 font-bold text-color-2a text-sm":"pt-20 text-sm"}>One or more lower case character</div>
                        </div>
                    </div>

                    <div className="flex space-x-3 mb-10">
                        <div className="flex text-sm space-x-1 text-color-3">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                </svg>
                            </div>

                            <div className={hasUpperCaseCharacter ? "pt-20 font-bold text-color-2a text-sm":"pt-20 text-sm"}>One or more upper case character</div>
                        </div>

                        <div className="flex text-sm space-x-1 text-color-3">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                </svg>
                            </div>

                            <div className={hasNumericCharacter ? "pt-20 font-bold text-color-2a text-sm":"pt-20 text-sm"}>One or more numeric character</div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3 mb-30">

                        <div className="flex text-sm space-x-1 text-color-3">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                </svg>
                            </div>

                            <div className={hasSpecialCharacter ? "pt-20 font-bold text-color-2a text-sm":"pt-20 text-sm"}>A symbol or special character</div>
                        </div>
                    </div>
                </div>
                {/* End */}

                {/* Confirm Password section */}
                <div className="mb-20">
                    <div className="relative">
                        <div className="mb-10 text-sm font-bold">Confirm Password</div>
                        <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                            <div className='w-full'>
                                <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="outline-white input border-0 text-sm p-3" placeholder="Type your password again" name="password" type={isShowConfirmPassword ? 'text' : 'password'}/>
                            </div>

                            <div className='px-2 pt-1'>
                                <svg onClick={e => setIsShowConfirmPassword(true)} className={isShowConfirmPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                </svg>

                                <svg onClick={e => setIsShowConfirmPassword(false)} className={isShowConfirmPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                </svg>
                            </div>
                        </div>

                        <div className={isPasswordMatch ? "text-red-500 text-sm mt-2 hidden":"text-red-500 text-sm mt-2 "}>Passwords did not match</div>
                    </div>
                </div> 
                {/* End */}    

                {/* Proceed Button section */}
                <div>
                    <div>
                        <button onClick={resetPassword} className={passwordOrConfirmPasswordIsNullOrEmpty ? "w-full rounded-lg bg-green-900 border-0 text-white opacity-50 px-20 py-3 font-bold text-sm":"w-full rounded-lg bg-green-900 border-0 text-white px-20 py-3 font-bold text-sm cursor-pointer"} type='button' disabled={passwordOrConfirmPasswordIsNullOrEmpty}>
                            <span className={ showSpinner ? "hidden" : ""}>Reset</span>
                            <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                        </button>
                    </div>
                </div>
                {/* End */}
            </div>
            {/* End */}
        </div>
    );
};

export default Forgot;