import React, {useState, useEffect} from 'react';
import GenericHeader from '../../../components/Headers/GenericHeader';
import {Link} from "react-router-dom";
import SendingEmails from "../../../assets/images/sending-emails.svg"
import '../forgot-pin/index.scss';
import axios from 'axios';
import SpinnerIcon from "../../../assets/images/spinner.gif";
import { authOnboardingServiceBaseUrl } from '../../../apiUrls';
import { getAxios } from '../../../network/httpClientWrapper';

const ForgotPin = () => {
    const [email, setEmail] = useState('');
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isEmailNullOrEmpty, setIsEmailNullOrEmpty] = useState<boolean>(true);
    const [showForgotPinCard, setShowForgotPinCard] = useState<boolean>(true);
    const [showResetPinLinkSentConfirmationCard, setShowResetPinLinkSentConfirmationCard] = useState<boolean>(false);
    const [forgotPinHasError, setForgotPinHasError] = useState<boolean>(false);
    const [forgotPinErrorMsg, setForgotPinErrorMsg] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    document.title = "Forgot Pin - Anchoria";

    useEffect(() => {
        async function checkIfEmailIsValid(){    
            if(email.length > 0){
                validateEmail();
            }
        } 

        checkIfEmailIsValid();
    });  

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
            setShowResetPinLinkSentConfirmationCard(true);
            setForgotPinHasError(false);

            setShowSpinner(false);  

            localStorage.setItem("forgotPinEmail", email);
        })
        .catch(function (error) {
            setShowSpinner(false);  
            setForgotPinHasError(true);
            setForgotPinErrorMsg(error.response.data.message)
        });        
    }

    function closeForgotPinHasError(){
        setForgotPinHasError(false);
    }

    function displayForgotPinCard(){
        setShowForgotPinCard(true);
        setShowResetPinLinkSentConfirmationCard(false);
        setForgotPinHasError(false);
    }


    return (
        <div>
            <GenericHeader />

            <div className={showForgotPinCard ? "mx-auto forgot-pin-form-container mt-32" : "mx-auto forgot-pin-form-container mt-32 hidden"}>
                <form>
                    <div className="font-bold mb-20 forgot-text text-3xl font-gotham-black-regular">Forgot Pin</div>
                    <p className="mb-30 forgot-text text-sm line-height-28 font-bold">Type the email you used to sign up on Achoria and we'll send you a pin reset email.</p>

                    {/* Forgot Pin Error */}
                    <div className={forgotPinHasError ? "error-alert mb-20":"hidden"}>
                        <div className="flex justify-between space-x-1 pt-3">
                            <div className="flex">
                                <div>
                                    <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                    </svg>
                                </div>

                                <div className="pt-1 text-sm">{forgotPinErrorMsg}</div>
                            </div>
                            
                            <div className="cursor-pointer" onClick={closeForgotPinHasError}>
                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* End */}

                    <div className="mb-30">
                        <div className="mb-2 text-sm line-height-24">Email</div>
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="input border-1-d6 px-3 py-3 text-24 outline-white"/>
                        <div className={isInvalidEmail ? 'text-red-500 text-sm mt-2' : 'text-red-500 text-sm mt-2 hidden'}>Please enter a valid email address</div>
                    </div>

                    <div className="mb-30 w-full">
                        <button onClick={sendResetPinLink} className={ isEmailNullOrEmpty ? "w-full text-sm rounded-lg bg-green-900 opacity-50 border-0 py-4 text-white font-bold text-24" : "w-full text-sm rounded-lg bg-green-900 cursor-pointer focus:shadow-outline border-0 py-4 text-white font-bold text-24"} type='button' disabled={isEmailNullOrEmpty}>
                            <span className={ showSpinner ? "hidden" : ""}>Send Pin Reset Link</span>
                            <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                        </button>
                    </div>

                    <div className="text-right font-bold forgot-text text-sm signup-text">
                        <Link to="/" className="no-underline text-green-900">Back to Login</Link>
                    </div>
                </form>
            </div>

            <div className={showResetPinLinkSentConfirmationCard ? "mx-auto reset-pin-link-confirmation-container mt-32" : "mx-auto reset-pin-link-confirmation-container mt-32 hidden"}>
                <div className="sending-emails-img mx-auto w-56 mb-30">
                    <img src={SendingEmails} alt="" />
                </div>

                <div className="text-center text-3xl font-gotham-black-regular text-green-900 mb-30">Pin reset confirmation</div>
                <div className="text-center text-sm mb-10">We’ve sent a pin rest link to </div>
                <div className="text-center font-bold text-blue-600 mb-30">{email}</div>
                <div className="text-center mb-20 text-sm">Didn’t recieve an email? Check your spam folder, or <button type='button' className="no-underline border-0 bg-transparent text-blue-600 font-bold cursor-pointer text-lg" onClick={displayForgotPinCard}>resend</button></div>
            </div>
        </div>
    );
};

export default ForgotPin;