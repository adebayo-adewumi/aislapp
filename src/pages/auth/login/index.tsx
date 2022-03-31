import React, { useState, useEffect } from 'react';
import SpinnerIcon from "../../../assets/images/spinner.gif";
import { Link } from "react-router-dom";
import '../login/index.scss';
import axios from 'axios';
import { encryptData } from '../../../lib/encryptionHelper';
import { generalEncKey } from '../../../common/constants/globals';
import { loginEndpoint } from '../../../apiUrls';
import { Layout } from 'antd';
import GenericHeader from '../../../components/Headers/GenericHeader';
import { Input } from 'antd';

const Login = () => {

    document.title = "Login - Anchoria";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailOrPasswordIsNullOrEmpty, setEmailOrPasswordIsNullOrEmpty] = useState<boolean>(true);
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
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

    return (
        <Layout>
            
            <GenericHeader />            

            <div className='h-screen'>               

                <div className='min-w-0'>
                    <div className='overflow-y-auto h-screen relative'>
                        <div className="candle-stick-container">
                            <div className="candle-stick-box md:bg-green-900">
                                <div className="smiling-lady hidden md:block"></div>
                                <div className="candle-stick hidden md:block"></div>

                                <div className="login-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute">

                                    {/* Login Error */}
                                    <div className={loginHasError ? "error-alert mb-20" : "hidden"}>
                                        <div className="p-3">
                                            <div className="text-sm">Invalid login details</div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className="mb-3 text-sm text-right">
                                        <span>Don’t have an account?</span>
                                        <Link to="/register" className="text-green-900">
                                            <span><strong> Sign Up</strong> </span>
                                        </Link>
                                    </div>

                                    <div className="mb-2 font-gotham-black-regular text-2xl text-green-900"><strong>Login</strong></div>

                                    <div className="mb-3 text-sm text-color-4">Provide the details below to login</div>

                                    <form className="form">
                                        <div className="mb-4">
                                            <div className="mb-2 text-sm">Email</div>

                                            <Input size="large" onChange={e => setEmail(e.target.value)}/>                                            

                                            <div className={isInvalidEmail ? 'text-red-500 text-sm mt-2' : 'text-red-500 text-sm mt-2 hidden'}>Please enter a valid email address</div>
                                        </div>

                                        <div className="mb-3 relative">
                                            <div className="mb-2 text-sm">Password</div>

                                            <Input.Password size="large" onChange={e => setPassword(e.target.value)}/>
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
                                                <a href="https://anchoriaonline.com/terms-and-conditions-of-use/" target="_blank" rel='noreferrer'><button type="button" className="border-0 bg-transparent text-green-900 cursor-pointer"><strong>Terms & Conditions</strong></button></a> and

                                                <a href="https://anchoriaonline.com/anchoria-privacy-policy/" target="_blank" rel='noreferrer'>
                                                    <button type="button" className="border-0 bg-transparent text-green-900 cursor-pointer"><strong> Privacy Policy</strong>
                                                    </button>
                                                </a>
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

        </Layout>
    );
};

export default Login;

