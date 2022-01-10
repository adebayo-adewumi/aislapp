import React, {useState, useEffect} from 'react';
import GenericHeader from '../../../components/Headers/GenericHeader';
import {Link} from "react-router-dom";
import SendingEmails from "../../../assets/images/sending-emails.svg"
import '../forgot/index.scss';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isEmailNullOrEmpty, setIsEmailNullOrEmpty] = useState<boolean>(true);
    const [showForgotPasswordCard, setShowForgotPasswordCard] = useState<boolean>(true);
    const [showResetPasswordLinkSentConfirmationCard, setShowResetPasswordLinkSentConfirmationCard] = useState<boolean>(false);
    
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

    function sendResetPasswordLink(){
        setShowForgotPasswordCard(false);
        setShowResetPasswordLinkSentConfirmationCard(true);
    }
    

    return (
        <div>
            <GenericHeader />

            <div className={showForgotPasswordCard ? "mx-auto forgot-password-form-container mt-32" : "mx-auto forgot-password-form-container mt-32 hidden"}>
                <form>
                    <div className="font-bold mb-20 forgot-text text-28 font-gotham-black-regular">Forgot Password</div>
                    <p className="mb-30 forgot-text text-16 line-height-28 font-bold">Type the email you used to sign up on Achoria and we'll send you a password reset email.</p>

                    <div className="mb-30">
                        <div className="mb-2 text-14 line-height-24">Email</div>
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="input border-1-d6 px-3 py-3 text-24 outline-white"/>
                        <div className={isInvalidEmail ? 'text-red-500 text-sm mt-2' : 'text-red-500 text-sm mt-2 hidden'}>Please enter a valid email address</div>
                    </div>

                    <div className="mb-30 w-full">
                        <button onClick={sendResetPasswordLink} className={ isEmailNullOrEmpty ? "w-full text-14 rounded-lg bgcolor-1 opacity-50 border-0 py-4 text-white font-bold text-24" : "w-full text-14 rounded-lg bgcolor-1 cursor-pointer focus:shadow-outline border-0 py-4 text-white font-bold text-24"} type='button' disabled={isEmailNullOrEmpty}>Proceed</button>
                    </div>

                    <div className="text-right font-bold forgot-text text-14">
                        <Link to="/" className="no-underline text-color-1">Back to Login</Link>
                    </div>
                </form>
            </div>

            <div className={showResetPasswordLinkSentConfirmationCard ? "mx-auto reset-password-link-confirmation-container mt-32" : "mx-auto reset-password-link-confirmation-container mt-32 hidden"}>
                <div className="sending-emails-img mx-auto w-56 mb-30">
                    <img src={SendingEmails} alt="" />
                </div>

                <div className="text-center text-28 font-gotham-black-regular text-color-1 mb-30">Password reset confirmation</div>
                <div className="text-center text-16 mb-10">We’ve sent a password rest link to </div>
                <div className="text-center font-bold text-blue-600 mb-30">{email}</div>
                <div className="text-center mb-20 text-14">Didn’t recieve an email? Check your spam folder, or <a href="/resend" className="no-underline text-blue-600 font-bold">resend</a></div>
            </div>
        </div>
    );
};

export default Forgot;