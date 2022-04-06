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

    function displayForgotPinCard(){
        setShowForgotPinCard(true);
        setShowResetPinLinkSentConfirmationCard(false);
        setForgotPinHasError(false);
    }


    return (
        <div className='relative bg-gray-100'>
            <GenericHeader />

            <div className='h-screen m-0'>
                <div className='min-w-0 h-full'>

                    <div className='relative h-full'>
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
                                        <div className="mb-3 text-sm">Email</div>
                                        
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

                        <div className={showResetPinLinkSentConfirmationCard ? 'relative':'hidden'}>
                            <div className={showResetPinLinkSentConfirmationCard ? "mx-auto reset-pin-link-confirmation-container top-32" : "hidden"}>
                                <div className="sending-emails-img mx-auto w-56 mb-3">
                                    <img src={SendingEmails} alt="" />
                                </div>

                                <div className="text-center text-3xl  text-green-900 mb-3">Pin reset confirmation</div>
                                
                                <div className="text-center text-sm mb-10">We’ve sent a pin rest link to </div>
                                
                                <div className="text-center font-bold text-blue-600 mb-3">{email}</div>
                                
                                <div className="text-center mb-3 text-sm">Didn’t recieve an email? Check your spam folder, or <button type='button' className="no-underline border-0 bg-transparent text-blue-600 font-bold cursor-pointer text-lg" onClick={displayForgotPinCard}>resend</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPin;