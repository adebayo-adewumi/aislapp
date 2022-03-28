import React, {useState, useEffect} from 'react';
import GenericHeader from '../../../components/Headers/GenericHeader';
import {Link} from "react-router-dom";
import SpinnerIcon from "../../../assets/images/spinner.gif";
import SuccessIcon from "../../../assets/images/success.gif";
import '../reset-pin/index.scss';
import { encryptData } from '../../../lib/encryptionHelper';
import {generalEncKey} from '../../../common/constants/globals';
import axios from 'axios';
import { authOnboardingServiceBaseUrl } from '../../../apiUrls';
import { getAxios } from '../../../network/httpClientWrapper';

const ResetPin = () => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinOrConfirmPinIsNullOrEmpty, setPinOrConfirmPinIsNullOrEmpty] = useState<boolean>(true);
    const [, setIsInvalidPin] = useState<boolean>(false);
    const [isPinMatch, setIsPinMatch] = useState<boolean>(true);
    const [isShowPin, setIsShowPin] = useState<boolean>(false);
    const [isShowConfirmPin, setIsShowConfirmPin] = useState<boolean>(false);
    const [showResetPinCard, setShowResetPinCard] = useState<boolean>(true);
    const [showSuccessCard, setShowSuccessCard] = useState<boolean>(false);

    const [hasMinAndMaxCharacter, setHasMinAndMaxCharacter] = useState<boolean>(false);
    const [hasLowerCaseCharacter, setHasLowerCaseCharacter] = useState<boolean>(false);
    const [hasUpperCaseCharacter, setHasUppererCaseCharacter] = useState<boolean>(false);
    const [hasNumericCharacter, setHasNumericCharacter] = useState<boolean>(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    document.title = "Reset Pin - Anchoria";

    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        async function checkIfPinIsNullOrEmpty(){
            validatePin();
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

        checkIfPinIsNullOrEmpty();
        checkIfConfirmPinIsNullOrEmpty();
    });    

    function checkIfPinOrConfirmPinIsNullOrEmpty(){
        if(pin === '' || confirmPin === '' || pin !== confirmPin){
            setPinOrConfirmPinIsNullOrEmpty(true);
        }
        else if(!hasMinAndMaxCharacter || !hasLowerCaseCharacter || !hasUpperCaseCharacter || !hasNumericCharacter || !hasSpecialCharacter){
            setPinOrConfirmPinIsNullOrEmpty(true);
        }
        else{
            setIsPinMatch(true);
            setPinOrConfirmPinIsNullOrEmpty(false);
        }
    }

    function validatePin(){
        //const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/i);

        const minCharacters = 8;
        const maxCharacters = 32;
        const lowerCase = /[a-z]+/g;
        const upperCase = /[A-Z]+/g;
        const numericCharacter = /\d+/g;
        const specialCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+/g;

        if(pin.length >= minCharacters && pin.length <= maxCharacters){
            setHasMinAndMaxCharacter(true);
        }
        else {
            setHasMinAndMaxCharacter(false);
        }
        
        if(lowerCase.test(pin)){
            setHasLowerCaseCharacter(true);
        }
        else{
            setHasLowerCaseCharacter(false);
        }

        if(upperCase.test(pin)){
            setHasUppererCaseCharacter(true);
        }
        else{
            setHasUppererCaseCharacter(false);
        }

        if(numericCharacter.test(pin)){
            setHasNumericCharacter(true);
        }
        else{
            setHasNumericCharacter(false);
        }

        if(specialCharacter.test(pin)){
            setHasSpecialCharacter(true);
        }
        else{
            setHasSpecialCharacter(false);
        }
    }

    function resetPin(){
        let requestData = {
            "email": localStorage.getItem("forgotPinEmail"),
            "pin": pin,
            "token": params.get("token")
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

            setShowResetPinCard(false);
            setShowSuccessCard(true);
            setIsInvalidPin(false);
        })
        .catch(function (error) {
            
            setShowSpinner(false);
        });
    }

    return (
        <div>
            <GenericHeader />

            <div className={showResetPinCard ? "mx-auto reset-container mt-32":"mx-auto reset-container mt-32 hidden"}>

                <div className="mb-10 text-3xl font-gotham-black-regular text-green-900">Reset your pin</div>
                
                <div className="mb-30 text-sm text-green-900 font-bold">Please type a new pin</div>

                <form className="form">

                    {/* Pin section */}
                    <div className="mb-20">
                        <div className="relative">
                            <div className="mb-10 text-sm">Create a new pin</div>
                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                <div className='w-full'>
                                    <input value={pin} onChange={e => setPin(e.target.value)} type={isShowPin ? 'text' : 'password'} className="outline-white input border-0 text-sm p-3" placeholder="Enter pin" name="pin" maxLength={4}/>
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
                    <div className="mb-20">
                        <div className="relative">
                            <div className="mb-10 text-sm">Confirm Pin</div>
                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                <div className='w-full'>
                                    <input value={confirmPin} onChange={e => setConfirmPin(e.target.value)} className="outline-white input border-0 text-sm p-3" placeholder="Type your pin again" name="pin" type={isShowConfirmPin ? 'text' : 'password'} maxLength={4}/>
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

                            <div className={isPinMatch ? "text-red-500 text-sm mt-2 hidden":"text-red-500 text-sm mt-2 "}>Pin and Confirm Pin did not match</div>
                        </div>
                    </div> 
                    {/* End */}    

                    {/* Proceed Button section */}
                    <div className="mb-20">
                        <div>
                            <button onClick={resetPin} className={pinOrConfirmPinIsNullOrEmpty ? "w-full rounded-lg bg-green-900 border-0 text-white opacity-50 px-20 py-3 font-bold text-sm":"w-full rounded-lg bg-green-900 border-0 text-white px-20 py-3 font-bold text-sm cursor-pointer"} type='button' disabled={pinOrConfirmPinIsNullOrEmpty}>
                                <span className={ showSpinner ? "hidden" : ""}>Reset</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                            </button>
                        </div>
                    </div>
                    {/* End */}

                    <div className="text-right">
                        <Link to="/" className="no-underline text-green-900">Take me back to <span className="font-bold">Login </span></Link>
                    </div>
                </form>
            </div>

            <div className={showSuccessCard ? "mx-auto reset-success-container mt-32":"mx-auto reset-success-container mt-32 hidden"}>
                <div className="ml-8 mr-auto w-80 h-64 relative">
                    <img src={SuccessIcon} alt="success icon" className="w-96"/>
                    <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                </div>

                <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                <div className="text-color-4 text-sm text-center mb-14">Your pin has been successfully updated</div>

                <div className="mb-30">
                    <Link to="/">
                        <button className="button p-5 font-bold no-underline">Proceed to Login</button>                        
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default ResetPin;