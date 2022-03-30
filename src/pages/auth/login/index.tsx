import React, { useState, useEffect } from 'react';
import GenericHeader from '../../../components/Headers/GenericHeader';
import SpinnerIcon from "../../../assets/images/spinner.gif";
import { Link } from "react-router-dom";
import '../login/index.scss';
import axios from 'axios';
import { encryptData } from '../../../lib/encryptionHelper';
import { generalEncKey } from '../../../common/constants/globals';
import { loginEndpoint } from '../../../apiUrls';

const Login = () => {

    document.title = "Login - Anchoria";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailOrPasswordIsNullOrEmpty, setEmailOrPasswordIsNullOrEmpty] = useState<boolean>(true);
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [loginHasError, setLoginHasError] = useState<boolean>(false);

    useEffect(() => {

        async function checkIfEmailIsNullOrEmpty() {

            checkIfEmailOrPasswordIsNullOrEmpty();

            if (email.length > 0) {
                validateEmail();
            }
        }

        async function checkIfPasswordIsNullOrEmpty() {
            checkIfEmailOrPasswordIsNullOrEmpty();
        }

        checkIfEmailIsNullOrEmpty();
        checkIfPasswordIsNullOrEmpty();
    });

    function loginUser() {

        let requestData = {
            "email": email,
            "password": password,
            "isForce": true,
            "deviceId": "2e1a65c3-abe8-49cc-99cc-afb2afba085c"
        }

        setShowSpinner(true);

        let loginUserCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('loginUserCypher', loginUserCypher);

        //Login User
        if (localStorage.getItem('loginUserCypher')) {
            setShowSpinner(true);

            axios.post(loginEndpoint,
                {
                    "text": localStorage.getItem('loginUserCypher')
                })
                .then(function (response) {
                    setShowSpinner(false);
                    window.location.href = "/dashboard";
                    localStorage.setItem('aislCustomerInfo', JSON.stringify(response.data.data));
                    localStorage.setItem('aislUserToken', response.data.data.token);
                    localStorage.setItem('aislUserRefreshToken', response.data.data.refreshToken);
                    localStorage.setItem('aislUserIsAuthenticated', "true");
                })
                .catch(function (error) {
                    setShowSpinner(false);
                    setLoginHasError(true);

                    

                    setTimeout(() => {
                        setLoginHasError(false);
                    }, 3000);
                });
        }
    }

    function checkIfEmailOrPasswordIsNullOrEmpty() {
        if (email === '' || password === '' || isInvalidEmail) {
            setEmailOrPasswordIsNullOrEmpty(true);
        }
        else {
            setEmailOrPasswordIsNullOrEmpty(false);
        }
    }

    function validateEmail() {
        const regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!email || regex.test(email) === false) {
            setIsInvalidEmail(true);

            return;
        }
        else {
            setIsInvalidEmail(false);
        }
    }

    function closeLoginHasError() {
        setLoginHasError(false);
    }

    return (
        <div className='h-screen'>
            <GenericHeader />

            <div className='min-w-0'>
                <div className='overflow-y-auto h-screen relative'>
                    <div className="candle-stick-container">
                        <div className="candle-stick-box md:bg-green-900">
                            <div className="smiling-lady hidden md:block"></div>
                            <div className="candle-stick hidden md:block"></div>

                            <div className="login-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute">

                                {/* Login Error */}
                                <div className={loginHasError ? "error-alert mb-20" : "hidden"}>
                                    <div className="flex justify-between space-x-1 pt-3">
                                        <div className="flex">
                                            <div>
                                                <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                </svg>
                                            </div>

                                            <div className="pt-1 text-sm">Invalid login details</div>
                                        </div>

                                        <div className="cursor-pointer" onClick={closeLoginHasError}>
                                            <svg className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                <div className="mb-20 signup-text text-sm">
                                    <span>Don’t have an account?</span>
                                    <Link to="/register" className="text-green-900">
                                        <span><strong>Sign Up</strong> </span>
                                    </Link>
                                </div>

                                <div className="mb-2 font-gotham-black-regular text-2xl text-green-900"><strong>Login</strong></div>

                                <div className="mb-3 text-sm text-color-4">Provide the details below to login</div>

                                <form className="form">
                                    <div className="mb-4">
                                        <div className="mb-2 text-sm">Email</div>

                                        <input onChange={e => setEmail(e.target.value)} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white border-gray-400 focus:ring-indigo-500" placeholder="Enter your email" type="email" />

                                        <div className={isInvalidEmail ? 'text-red-500 text-sm mt-2' : 'text-red-500 text-sm mt-2 hidden'}>Please enter a valid email address</div>
                                    </div>

                                    <div className="mb-3 relative">
                                        <div className="mb-2 text-sm">Password</div>

                                        <div className='flex w-full items-center justify-between border rounded '>
                                            <div className='w-full'>
                                                <input onChange={e => setPassword(e.target.value)} className="bg- text border-0 w-full focus:outline-white px-3 py-3 rounded text-gray-900 focus:bg-white" placeholder="Enter password" type={isShowPassword ? 'text' : 'password'} name="password"/>
                                            </div>

                                            <div className='px-2 pt-1'>
                                                <svg onClick={e => setIsShowPassword(true)} className={isShowPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50" />
                                                </svg>

                                                <svg onClick={e => setIsShowPassword(false)} className={isShowPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-2 text-right signup-text">
                                        <Link to="/forgot" className=""><strong className="text-sm font-bold text-green-900 mr-2">Forgot Password</strong></Link>
                                    </div>

                                    <div className="mb-2">
                                        <button onClick={loginUser} className={emailOrPasswordIsNullOrEmpty ? "w-full rounded-lg bg-green-900 text-white border-0 py-4 px-4 font-bold text-sm opacity-50 cursor-pointer" : "w-full hover:bg-green-700 rounded-lg bg-green-900 text-white border-0 py-4 px-4 font-bold text-sm cursor-pointer focus:shadow-outline"} disabled={emailOrPasswordIsNullOrEmpty} type='button'>
                                            <span className={showSpinner ? "hidden" : ""}>Login</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="30" />
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <div className="mb-1 text-sm">By creating an account, you agree to Anchoria </div>
                                        <div className="text-sm">
                                            <a href="https://anchoriaonline.com/terms-and-conditions-of-use/" target="_blank" rel='noreferrer'><button type="button" className="no-underline border-0 bg-transparent text-green-900 cursor-pointer"><strong>Terms & Conditions</strong></button></a> and

                                            <a href="https://anchoriaonline.com/anchoria-privacy-policy/" target="_blank" rel='noreferrer'><button type="button" className="no-underline border-0 bg-transparent text-green-900 cursor-pointer"><strong> Privacy Policy</strong></button></a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="top-4 relative  md:pl-28 md:pt-7 md:top-full z-0">
                            <div className="font-gotham-black-regular font-bold text-2xl md:text-3xl">
                                <strong>Investing is for everyone</strong>
                            </div>

                            <div className='md:h-44 h-5'>
                                <div>
                                    <div style={{paddingTop: '1rem'}} className="text-lg">&middot; Build wealth plans
                                    </div>

                                    <div className="text-lg">&middot; Transparent historical returns
                                    </div>

                                    <div className="text-lg">&middot; Portfolio dashboard view</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

