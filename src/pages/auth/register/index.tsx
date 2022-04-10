import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenericHeader from '../../../components/Headers/GenericHeader';
import './index.scss';
import BulbIcon from '../../../assets/images/bulb.svg';
import PictureIcon from '../../../assets/images/picture-icon.svg';
import SuccessCheckIcon from '../../../assets/images/success-check.svg';
import ComputerIcon from '../../../assets/images/computer.svg';
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from '../../../assets/images/calendar.svg';
import SpinnerIcon from '../../../assets/images/spinner.gif';
import moment from 'moment';
import ArrowBackIcon from '../../../assets/images/arrow-back.svg';
import { encryptData } from '../../../lib/encryptionHelper';
import { generalEncKey } from '../../../common/constants/globals';
import { authOnboardingServiceBaseUrl, utilityServiceBaseUrlUrl } from '../../../apiUrls';
import { getAxios } from '../../../network/httpClientWrapper';
import CloseIcon from '../../../assets/images/close.svg';
import CircleCheckGreenIcon from '../../../assets/images/circle-check-green.svg';
import CircleInfoRedIcon from '../../../assets/images/circle-info-red.svg';
import * as HelperFunctions from '../../../lib/helper';
import 'antd/dist/antd.css';

const Register = () => {
    const [showSignup, setShowSignup] = useState<boolean>(true);
    const [showSelfie, setShowSelfie] = useState<boolean>(false);
    const [showBVN, setShowBVN] = useState<boolean>(false);
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [showUser, setShowUser] = useState<boolean>(false);
    const [showPin, setShowPin] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [bVNPhoneDobIsNullOrEmpty, setBVNPhoneDobIsNullOrEmpty] = useState<boolean>(false);

    const [showImgAvatar, ] = useState<boolean>(true);
    const [showSelfieAvatar, setShowSelfieAvatar] = useState<boolean>(false);

    const [bvn, setBVN] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDOB] = useState('');
    const [phoneCode, setPhoneCode] = useState('234');

    const [isInvalidBVN, setIsInvalidBVN] = useState<boolean>(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
    const [isInvalidPhone, setIsInvalidPhone] = useState<boolean>(false);
    const [isInvalidDOB, setIsInvalidDOB] = useState<boolean>(false);

    const [dateState, setDateState] = useState(new Date());

    const [isInValidPIN, setIsInvalidPIN] = useState<boolean>(false);
    const [isInValidOTP, setIsInvalidOTP] = useState<boolean>(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [openBVNModal, setOpenBVNModal] = useState<boolean>(false);
    const [openModalBackdrop, setOpenModalBackdrop] = useState<boolean>(false);

    const [otpbox1, setOTPBox1] = useState('');
    const [otpbox2, setOTPBox2] = useState('');
    const [otpbox3, setOTPBox3] = useState('');
    const [otpbox4, setOTPBox4] = useState('');
    const [otpbox5, setOTPBox5] = useState('');
    const [otpbox6, setOTPBox6] = useState('');

    const [ob1, setOB1] = useState('');
    const [ob2, setOB2] = useState('');
    const [ob3, setOB3] = useState('');
    const [ob4, setOB4] = useState('');

    const [cob1, setCOB1] = useState('');
    const [cob2, setCOB2] = useState('');
    const [cob3, setCOB3] = useState('');
    const [cob4, setCOB4] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailPasswordConfirmPasswordIsNullOrEmpty, setEmailPasswordConfirmPasswordIsNullOrEmpty] = useState<boolean>(true);

    const [hasMinAndMaxCharacter, setHasMinAndMaxCharacter] = useState<boolean>(false);
    const [hasLowerCaseCharacter, setHasLowerCaseCharacter] = useState<boolean>(false);
    const [hasUpperCaseCharacter, setHasUppererCaseCharacter] = useState<boolean>(false);
    const [hasNumericCharacter, setHasNumericCharacter] = useState<boolean>(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false);

    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

    const [showOTPValidated, setShowOTPValidated] = useState<boolean>(true);
    const [showPasswordValidated, setShowPasswordValidated] = useState<boolean>(true);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [othername, setOtherName] = useState('');

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [bvnHasError, setBVNHasError] = useState<boolean>(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [hashedSelfieImg, setHashedSelfieImg] = useState('');

    const [showModalBG, setShowModalBG] = useState<boolean>(true);
    const [showValidateUserIdModal, setShowValidateUserIdModal] = useState<boolean>(true);

    const [hasUserId, setHasUserId] = useState('');
    const [customerAid, setCustomerAid] = useState('');
    const [isUserIdValid, setIsUserIdValid] = useState('');
    const [customerAidResponse, setCustomerAidResponse]  = useState<any>({});

    document.title = "Register - Anchoria";

    useEffect(() => {

        function checkIfBVNIsNullOrEmpty() {
            let num = 11;
            let digits = /[0-9]+/g;

            if (bvn.length > 0) {
                if (bvn.length === num && digits.test(bvn)) {
                    setIsInvalidBVN(false);
                }
                else {
                    setIsInvalidBVN(true);
                    setBVNPhoneDobIsNullOrEmpty(true);
                }
            }

            checkIfBVNPhoneDobIsNullOrEmpty();
        }

        function checkIfPhoneIsNullOrEmpty() {
            let digits = /[0-9]+/g;

            if (phone.length > 0) {
                if (phone.length >= 10 && phone.length <= 11 && digits.test(phone)) {
                    setIsInvalidPhone(false);
                }
                else {
                    setIsInvalidPhone(true);
                    setBVNPhoneDobIsNullOrEmpty(true);
                }
            }

            checkIfBVNPhoneDobIsNullOrEmpty();
        }

        function checkIfDateIsNullOrEmpty() {
            let dateFormat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

            if (dob.length > 0) {
                if (dateFormat.test(dob)) {
                    setIsInvalidDOB(false);
                }
                else {
                    setIsInvalidDOB(true);
                    setBVNPhoneDobIsNullOrEmpty(true);
                }
            }

            

            checkIfBVNPhoneDobIsNullOrEmpty();
        }

        function checkIfOTPBoxIsNullOrEmpty() {
            if (otpbox1 === '' || otpbox2 === '' || otpbox3 === '' || otpbox4 === '' || otpbox5 === '' || otpbox6 === '') {
                setIsInvalidOTP(true);
            }
            else {
                setIsInvalidOTP(false);
            }
        }

        function checkIfOBIsNullOrEmpty() {
            if (ob1 === '' || ob2 === '' || ob3 === '' || ob4 === '') {
                setIsInvalidPIN(true);
            }
            else if (cob1 === '' || cob2 === '' || cob3 === '' || cob4 === '') {
                setIsInvalidPIN(true);
            }
            else {
                let _ob = ob1 + '' + ob2 + '' + ob3 + '' + ob4;
                let _cob = cob1 + '' + cob2 + '' + cob3 + '' + cob4;

                if (_ob === _cob) {
                    setIsInvalidPIN(false);
                }
                else {
                    setIsInvalidPIN(true);
                }

            }
        }

        function checkIfEmailIsNullOrEmpty() {

            checkIfEmailPasswordConfirmPasswordIsNullOrEmpty();

            if (email.length > 0) {
                validateEmail();
            }
        }

        function checkIfPasswordIsNullOrEmpty() {
            validatePassword();
            checkIfEmailPasswordConfirmPasswordIsNullOrEmpty();
        }

        function checkIfConfirmPasswordIsNullOrEmpty() {
            if (password !== confirmPassword) {
                setIsPasswordMatch(false);
            }
            else {
                setIsPasswordMatch(true);
            }
        }

        function getUserIpAddress(){
            getAxios(axios).get("https://myexternalip.com/raw")
                .then(function (response) {
                    localStorage.setItem("aislUserIPAddress", response.data)
                })
                .catch(function (error) {
                    ;
                });
        }

        HelperFunctions.progressToNextTextBox("pinBox");
        HelperFunctions.progressToNextTextBox("cpinBox");
        HelperFunctions.progressToNextTextBox("otpBox");

        checkIfBVNIsNullOrEmpty();
        checkIfPhoneIsNullOrEmpty();
        checkIfDateIsNullOrEmpty();
        checkIfOTPBoxIsNullOrEmpty();
        checkIfEmailIsNullOrEmpty();
        checkIfPasswordIsNullOrEmpty();
        checkIfConfirmPasswordIsNullOrEmpty();
        checkIfOBIsNullOrEmpty();
        getUserIpAddress();
    });

    function verifyBVNAndDOB() {
        let requestData = {
            "bvn": bvn,
            "dateOfBirth": dob
        }


        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        //VERIFY BVN AND DOB
        if (localStorage.getItem('genericCypher')) {
            setShowSpinner(true);
            axios.post(utilityServiceBaseUrlUrl.concat('/bvn/verify'),
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    localStorage.setItem('aislUserWorkflowReference', response.data.data.value);
                    setShowSpinner(false);
                    displaySelfie();
                })
                .catch(function (error) {
                    
                    setShowSpinner(false);
                    setBVNHasError(true);

                    setTimeout(() => {
                        setBVNHasError(false);
                    }, 3000);
                });
        }
    }

    function verifyBVNImageAndSelfie() {

        let requestData = {
            "bvn": bvn,
            "base64Image": hashedSelfieImg
        }

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);


        //VERIFY BVN AND Selfie
        if (localStorage.getItem('genericCypher')) {
            setShowSpinner(true);
            axios.post(utilityServiceBaseUrlUrl.concat('/bvn/details-by-selfie?workflowReferenceValue=') + localStorage.getItem('aislUserWorkflowReference'),
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    if(response.data.statusCode !== 200){
                        setErrorMsg(response.data.message);
                        
                    }
                    
                    localStorage.setItem('aislUserWorkflowReference', response.data.data.workflowDetails.value);
                    localStorage.setItem('aislBVNDetails', JSON.stringify(response.data.data.bvnDetails));                    

                    setShowSpinner(false);
                    confirmBVN();

                    setFirstName(response.data.data.bvnDetails.firstName);
                    setLastName(response.data.data.bvnDetails.lastName);
                    setOtherName(response.data.data.bvnDetails.middleName);                    
                })
                .catch(function (error) {
                    setShowSpinner(false);
                });
        }
    }

    function registerUser() {
        let bvnDetails =  JSON.parse(localStorage.getItem("aislBVNDetails") as string);

        let requestData = {
            "birthDate": bvnDetails.dateOfBirth,
            "bvn": bvn,
            "email": email,
            "firstName": firstname,
            "lastName": lastname,
            "nationality": bvnDetails.nationality,
            "otherNames": othername,
            "password": password,
            "phoneNumber": phoneCode.concat(phone),
            "pin": ob1 + '' + ob2 + '' + ob3 + '' + ob4,
            "selfieImage": "data:image/jpeg;base64,"+hashedSelfieImg,
            "selfieName": "developer@live.com",
            "sex": bvnDetails.gender.toUpperCase(),
            "termsFlag": "Y",
            "title": bvnDetails.title,
            "deviceId": localStorage.getItem("aislUserIPAddress"),
            "osType": "Android",
            "permanentAddress": bvnDetails.residentialAddress,
            'shA': showImgAvatar,
            "custAid":customerAid,
            "cscsNumber":customerAidResponse.cscsacct,
        }

        

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        //REGISTER USER
        if (genericCypher) {
            setShowSpinner(true);
            getAxios(axios).post(authOnboardingServiceBaseUrl.concat('/customer/add?workflowReferenceValue=') + localStorage.getItem('aislUserWorkflowReference'),
            {
                "text": genericCypher
            })
            .then(function (response:any) {
                setShowSpinner(false);
                confirmSuccess();

                if(response.data.statusCode !== 200){
                    setErrorMsg(response.data.message);

                    setTimeout(()=>{
                        setErrorMsg('');
                    }, 3000);

                }
            })
            .catch(function (error:any) {
                setErrorMsg(error.response.data.message);
                setShowSpinner(false);

                setTimeout(()=>{
                    setErrorMsg('');
                }, 3000);
            });
        }
    }

    function generateOTPForPhone() {
        let requestData = {
            "phoneNumber": phoneCode.concat(phone),
            "workflowReferenceValue": localStorage.getItem('aislUserWorkflowReference')
        }

        ;

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);


        //GENERATE OTP FOR PHONE
        if (localStorage.getItem('genericCypher')) {
            setShowSpinner(true);
            getAxios(axios).post(utilityServiceBaseUrlUrl.concat('/otp/generate'),
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    setShowSpinner(false);
                    confirmOTP();
                })
                .catch(function (error) {
                    setShowSpinner(false);
                    confirmOTP();
                });
        }
    }

    function validateOTPForPhone() {
        let requestData = {
            "workflowReferenceValue": localStorage.getItem('aislUserWorkflowReference'),
            "otp": otpbox1 + '' + otpbox2 + '' + otpbox3 + '' + otpbox4 + '' + otpbox5 + '' + otpbox6
        }

        

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);


        //VALIDATE OTP FOR PHONE
        if (localStorage.getItem('genericCypher')) {
            setShowSpinner(true);

            getAxios(axios).post(utilityServiceBaseUrlUrl.concat('/otp/validate?workflowReferenceValue=') + localStorage.getItem('aislUserWorkflowReference'),
                {
                    "text": localStorage.getItem('genericCypher')
                })
                .then(function (response) {
                    localStorage.setItem('aislUserWorkflowReference', response.data.data.value);
                    setShowSpinner(false);

                    setShowOTPValidated(true);

                    if(response.data.statusCode !== 200){
                        setErrorMsg("Invalid OTP");
                    }

                    setTimeout(()=>{
                        setShowOTPValidated(false);
                    },5000);

                    createUser();


                })
                .catch(function (error) {
                    setErrorMsg(error.response.data.message);
                    setShowSpinner(false);
                });
        }
    }

    function checkIfEmailPasswordConfirmPasswordIsNullOrEmpty() {
        if (email === '' || password === '' || confirmPassword === '' || password !== confirmPassword) {
            setEmailPasswordConfirmPasswordIsNullOrEmpty(true);
        }
        else if (!hasMinAndMaxCharacter || !hasLowerCaseCharacter || !hasUpperCaseCharacter || !hasNumericCharacter || !hasSpecialCharacter) {
            setEmailPasswordConfirmPasswordIsNullOrEmpty(true);
        }
        else {
            setIsPasswordMatch(true);
            setEmailPasswordConfirmPasswordIsNullOrEmpty(false);
        }
    }

    function validatePassword() {

        const minCharacters = 8;
        const maxCharacters = 32;
        const lowerCase = /[a-z]+/g;
        const upperCase = /[A-Z]+/g;
        const numericCharacter = /\d+/g;
        const specialCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+/g;

        if (password.length >= minCharacters && password.length <= maxCharacters) {
            setHasMinAndMaxCharacter(true);
        }
        else {
            setHasMinAndMaxCharacter(false);
        }

        if (lowerCase.test(password)) {
            setHasLowerCaseCharacter(true);
        }
        else {
            setHasLowerCaseCharacter(false);
        }

        if (upperCase.test(password)) {
            setHasUppererCaseCharacter(true);
        }
        else {
            setHasUppererCaseCharacter(false);
        }

        if (numericCharacter.test(password)) {
            setHasNumericCharacter(true);
        }
        else {
            setHasNumericCharacter(false);
        }

        if (specialCharacter.test(password)) {
            setHasSpecialCharacter(true);
        }
        else {
            setHasSpecialCharacter(false);
        }
    }

    function checkIfBVNPhoneDobIsNullOrEmpty() {
        if (bvn === '' || phone === '' || dob === '') {
            setBVNPhoneDobIsNullOrEmpty(true);
        }
        else if (isInvalidBVN || isInvalidPhone || isInvalidDOB) {
            setBVNPhoneDobIsNullOrEmpty(true);
        }
        else {
            setBVNPhoneDobIsNullOrEmpty(false);
        }
    }

    const changeDate = (e: any) => {
        setDateState(e);
        setDOB(moment(e).format("DD/MM/YYYY"));
        setShowCalendar(false);
        setIsInvalidPassword(true);
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

    function displaySignup() {
        setShowSignup(true);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function displaySelfie() {
        setShowSignup(false);
        setShowSelfie(true);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function confirmBVN() {
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(true);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function confirmOTP() {
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(true);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function createUser() {
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(true);
        setShowPin(false);
        setShowSuccess(false);
    }

    function confirmPin() {
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(true);
        setShowSuccess(false);

        setTimeout(()=>{
            setShowPasswordValidated(false);
        }, 2000);
    }

    function confirmSuccess() {
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(true);
    }

    function triggerSelfieUpload() {
        document.getElementById("selfie")?.click();
    }

    function changeImgAvatar(event :any) {
        let fileExtArr = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp"];

        setShowSelfieAvatar(true);

        let base64String = '';

        let file = event.target.files[0];

        let fileExt = file.name.split(".")[1];
      
        if(fileExtArr.includes(fileExt.toLowerCase())){
            let reader = new FileReader();
          
            reader.onload = function () {
                let result = reader.result as string;

                base64String = result.replace("data:", "").replace(/^.+,/, "");
                setHashedSelfieImg(base64String);
            }

            reader.readAsDataURL(file);

            setErrorMsg('');
        }
        else{
            setErrorMsg("Uploaded file is not a valid image. Only JPEG, JPG, PNG and GIF files are allowed.");
        }
    }

    function displayCalendar() {
        if (showCalendar) {
            setShowCalendar(false);
        }
        else {
            setShowCalendar(true);
        }
    }

    function displayBVNModal() {
        setOpenBVNModal(true);
        setOpenModalBackdrop(true);
    }

    function closeModal() {
        setOpenBVNModal(false);
        setOpenModalBackdrop(false);

        setShowModalBG(false);
        setShowValidateUserIdModal(false);
    }

    function validateUserId(){
        setShowSpinner(true);

        if(hasUserId === 'Yes'){
            if(customerAid !== ''){
                axios.get(authOnboardingServiceBaseUrl + '/customer/reg-number/'+customerAid)
                .then(function (response) { 
                    setShowSpinner(false);
                   
                    if(response.data.hasOwnProperty("data")){

                        if(response.data.data){
                            setCustomerAidResponse(response.data.data);

                            setIsUserIdValid('true');

                            setTimeout(()=>{
                                closeModal();
                            },2000);
                        }  
                        else{
                            setIsUserIdValid('false');
                        }                        
                    }
                    else{                        
                        setIsUserIdValid('false');
                    }

                    
                })
                .catch(function (error) { 
                    setShowSpinner(false);
                    setIsUserIdValid('true');
                });
            }
            else{
                setShowSpinner(false);
                setIsUserIdValid('false');
            }
        }
        else{
            setShowSpinner(false);
            closeModal();
        }
        
    }


    return (
        <div className='relative'>
            <GenericHeader />

            <div className='h-screen m-0'>
                <div className='h-full min-w-0'>
                    <div className='relative h-full'>
                        <div className="candle-stick-container h-full overflow-y-auto">
                            <div className='h-64 relative'>
                                <div className="candle-stick-box md:bg-green-900">
                                    <div className="smiling-lady hidden md:block"></div>
                                    <div className="candle-stick hidden md:block"></div>

                                    {/* BVN-DOB Section */}
                                    <div className={showSignup ? "signup-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>

                                        {/* BVN Validated Error */}
                                        <div className={bvnHasError ? "error-alert mb-3 p-3" : "hidden"}>
                                            <div className="text-sm">BVN and Date of Birth does not match</div>
                                        </div>
                                        {/* End */}

                                        <div className="mb-3 flex justify-between text-sm">
                                            <div className='font-bold cursor-pointer opacity-0'>
                                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                            </div>

                                            <div className='signup-text'>
                                                <span>Already have an account?</span>
                                                <Link to="/" className="no-underline text-green-900"><span><strong> Login</strong> </span></Link>
                                            </div>
                                        </div>

                                        <div className="mb-3 text-xl text-green-900 font-gotham-black-regular"><strong>Signup</strong></div>

                                        <div className="mb-5 text-sm">Provide the details below to get started</div>

                                        <form className="form">
                                            {/* BVN Section*/}
                                            <div className="mb-5">
                                                <div className="flex md:justify-between md:space-x-0 space-x-5 mb-3">
                                                    <div className="text-xs md:text-sm">BVN (Bank Verification Number) </div>

                                                    <div onClick={displayBVNModal} className="flex md:justify-between justify-end text-xs md:text-sm cursor-pointer items-center">
                                                        <div className="mr-2">Why we need this</div>

                                                        <div className='h-3'>
                                                            <svg width="22" height="21" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16ZM12 6C14.2091 6 16 7.79086 16 10C16 11.7948 14.8179 13.3135 13.1898 13.8201L13 13.874V14C13 14.5523 12.5523 15 12 15C11.4872 15 11.0645 14.614 11.0067 14.1166L11 14V13C11 12.4872 11.386 12.0645 11.8834 12.0067L12.1493 11.9945C13.1841 11.9182 14 11.0544 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10C8 7.79086 9.79086 6 12 6Z" fill="#353F50" />
                                                            </svg>
                                                        </div> 
                                                    </div>
                                                </div>

                                                <input value={bvn} onChange={e => setBVN(e.target.value)} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" placeholder="Enter your BVN" type='text' />

                                                <div className={isInvalidBVN ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>BVN can only consist of 11 digits</div>
                                            </div>
                                            {/*End*/}

                                            {/* Phone Section*/}
                                            <div className="mb-5">
                                                <div>
                                                    <div className="mb-3 text-xs md:text-sm">Phone number</div>

                                                    <div className='flex border rounded-lg p-1'>
                                                        <select onChange={e => setPhoneCode(e.target.value)} className='bg-white text w-24 focus:outline-none px-2 py-2 rounded text-gray-900 border-0 focus:bg-white focus:ring-indigo-500'>
                                                            <option value="234">+234</option>
                                                            <option value="1">+1</option>
                                                            <option value="44">+44</option>
                                                            <option value="213">+213</option>
                                                            <option value="376">+376</option>
                                                            <option value="244">+244</option>
                                                            <option value="1264">+1264</option>
                                                            <option value="1268">+1268</option>
                                                            <option value="54">+54</option>
                                                            <option value="374">+374</option>
                                                            <option value="297">+297</option>
                                                            <option value="61">+61</option>
                                                            <option value="43">+43</option>
                                                            <option value="994">+994</option>
                                                            <option value="1242">+1242</option>
                                                            <option value="973">+973</option>
                                                            <option value="880">+880</option>
                                                            <option value="1246">+1246</option>
                                                            <option value="375">+375</option>
                                                            <option value="32">+32</option>
                                                            <option value="501">+501</option>
                                                            <option value="229">+229</option>
                                                            <option value="1441">+1441</option>
                                                            <option value="975">+975</option>
                                                            <option value="591">+591</option>
                                                            <option  value="387">+387</option>
                                                            <option  value="267">+267</option>
                                                            <option  value="55">+55</option>
                                                            <option  value="673">+673</option>
                                                            <option  value="359">+359</option>
                                                            <option  value="226">+226</option>
                                                            <option  value="257">+257</option>
                                                            <option  value="855">+855</option>
                                                            <option  value="237">+237</option>
                                                            <option  value="1">+1</option>
                                                            <option  value="238">+238</option>
                                                            <option  value="1345">+1345</option>
                                                            <option  value="236">+236</option>
                                                            <option  value="56">+56</option>
                                                            <option  value="86">+86</option>
                                                            <option  value="57">+57</option>
                                                            <option  value="269">+269</option>
                                                            <option  value="242">+242</option>
                                                            <option  value="682">+682</option>
                                                            <option  value="506">+506</option>
                                                            <option  value="385">+385</option>
                                                            <option  value="53">+53</option>
                                                            <option  value="599">+599</option>
                                                            <option  value="90392">+90392</option>
                                                            <option  value="357">+357</option>
                                                            <option  value="420">+420</option>
                                                            <option  value="45">+45</option>
                                                            <option  value="253">+253</option>
                                                            <option  value="1809">+1809</option>
                                                            <option  value="1809">+1809</option>
                                                            {/* <option  value="593">Ecuador (+593)</option><option  value="20">Egypt (+20)</option><option  value="503">El Salvador (+503)</option><option  value="240">Equatorial Guinea (+240)</option><option  value="291">Eritrea (+291)</option><option  value="372">Estonia (+372)</option><option  value="251">Ethiopia (+251)</option><option  value="500">Falkland Islands (+500)</option><option  value="298">Faroe Islands (+298)</option><option  value="679">Fiji (+679)</option><option  value="358">Finland (+358)</option><option  value="33">France (+33)</option><option  value="594">French Guiana (+594)</option><option  value="689">French Polynesia (+689)</option><option  value="241">Gabon (+241)</option><option  value="220">Gambia (+220)</option><option  value="7880">Georgia (+7880)</option><option  value="49">Germany (+49)</option><option  value="233">Ghana (+233)</option><option  value="350">Gibraltar (+350)</option><option  value="30">Greece (+30)</option><option  value="299">Greenland (+299)</option><option  value="1473">Grenada (+1473)</option><option  value="590">Guadeloupe (+590)</option><option  value="671">Guam (+671)</option><option  value="502">Guatemala (+502)</option><option  value="224">Guinea (+224)</option><option  value="245">Guinea - Bissau (+245)</option><option  value="592">Guyana (+592)</option><option  value="509">Haiti (+509)</option><option  value="504">Honduras (+504)</option><option  value="852">Hong Kong (+852)</option><option  value="36">Hungary (+36)</option><option  value="354">Iceland (+354)</option><option  value="91">India (+91)</option><option  value="62">Indonesia (+62)</option><option  value="98">Iran (+98)</option><option  value="964">Iraq (+964)</option><option  value="353">Ireland (+353)</option><option  value="972">Israel (+972)</option><option  value="39">Italy (+39)</option><option  value="1876">Jamaica (+1876)</option><option  value="81">Japan (+81)</option><option  value="962">Jordan (+962)</option><option  value="7">Kazakhstan (+7)</option><option  value="254">Kenya (+254)</option><option  value="686">Kiribati (+686)</option><option  value="850">Korea North (+850)</option><option  value="82">Korea South (+82)</option><option  value="965">Kuwait (+965)</option><option  value="996">Kyrgyzstan (+996)</option><option  value="856">Laos (+856)</option><option  value="371">Latvia (+371)</option><option  value="961">Lebanon (+961)</option><option  value="266">Lesotho (+266)</option><option  value="231">Liberia (+231)</option><option  value="218">Libya (+218)</option><option  value="417">Liechtenstein (+417)</option><option  value="370">Lithuania (+370)</option><option  value="352">Luxembourg (+352)</option><option  value="853">Macao (+853)</option><option  value="389">Macedonia (+389)</option><option  value="261">Madagascar (+261)</option><option  value="265">Malawi (+265)</option><option  value="60">Malaysia (+60)</option><option  value="960">Maldives (+960)</option><option  value="223">Mali (+223)</option><option  value="356">Malta (+356)</option><option  value="692">Marshall Islands (+692)</option><option  value="596">Martinique (+596)</option><option  value="222">Mauritania (+222)</option><option  value="269">Mayotte (+269)</option><option  value="52">Mexico (+52)</option><option  value="691">Micronesia (+691)</option><option  value="373">Moldova (+373)</option><option  value="377">Monaco (+377)</option><option  value="976">Mongolia (+976)</option><option  value="1664">Montserrat (+1664)</option><option  value="212">Morocco (+212)</option><option  value="258">Mozambique (+258)</option><option  value="95">Myanmar (+95)</option><option  value="264">Namibia (+264)</option><option  value="674">Nauru (+674)</option><option  value="977">Nepal (+977)</option><option  value="31">Netherlands (+31)</option><option  value="687">New Caledonia (+687)</option><option  value="64">New Zealand (+64)</option><option  value="505">Nicaragua (+505)</option><option  value="227">Niger (+227)</option><option  value="234">Nigeria (+234)</option><option  value="683">Niue (+683)</option><option  value="672">Norfolk Islands (+672)</option><option  value="670">Northern Marianas (+670)</option><option  value="47">Norway (+47)</option><option  value="968">Oman (+968)</option><option  value="680">Palau (+680)</option><option  value="507">Panama (+507)</option><option  value="675">Papua New Guinea (+675)</option><option  value="595">Paraguay (+595)</option><option  value="51">Peru (+51)</option><option  value="63">Philippines (+63)</option><option  value="48">Poland (+48)</option><option  value="351">Portugal (+351)</option><option  value="1787">Puerto Rico (+1787)</option><option  value="974">Qatar (+974)</option><option  value="262">Reunion (+262)</option><option  value="40">Romania (+40)</option><option  value="7">Russia (+7)</option><option  value="250">Rwanda (+250)</option><option  value="378">San Marino (+378)</option><option  value="239">Sao Tome &amp; Principe (+239)</option><option  value="966">Saudi Arabia (+966)</option><option  value="221">Senegal (+221)</option><option  value="381">Serbia (+381)</option><option  value="248">Seychelles (+248)</option><option  value="232">Sierra Leone (+232)</option><option  value="65">Singapore (+65)</option><option  value="1">Sint Maarten (+1)</option><option  value="421">Slovak Republic (+421)</option><option  value="386">Slovenia (+386)</option><option  value="677">Solomon Islands (+677)</option><option  value="252">Somalia (+252)</option><option  value="27">South Africa (+27)</option><option  value="34">Spain (+34)</option><option  value="94">Sri Lanka (+94)</option><option  value="290">St. Helena (+290)</option><option  value="1869">St. Kitts (+1869)</option><option  value="1758">St. Lucia (+1758)</option><option  value="249">Sudan (+249)</option><option  value="597">Suriname (+597)</option><option  value="268">Swaziland (+268)</option><option  value="46">Sweden (+46)</option><option  value="41">Switzerland (+41)</option><option  value="963">Syria (+963)</option><option  value="886">Taiwan (+886)</option><option  value="7">Tajikstan (+7)</option><option  value="66">Thailand (+66)</option><option  value="228">Togo (+228)</option><option  value="676">Tonga (+676)</option><option  value="1868">Trinidad &amp; Tobago (+1868)</option><option  value="216">Tunisia (+216)</option><option  value="90">Turkey (+90)</option><option  value="7">Turkmenistan (+7)</option><option  value="993">Turkmenistan (+993)</option><option  value="1649">Turks &amp; Caicos Islands (+1649)</option><option  value="688">Tuvalu (+688)</option><option  value="256">Uganda (+256)</option><option  value="380">Ukraine (+380)</option><option  value="971">United Arab Emirates (+971)</option><option  value="598">Uruguay (+598)</option><option  value="7">Uzbekistan (+7)</option><option  value="678">Vanuatu (+678)</option><option  value="379">Vatican City (+379)</option><option  value="58">Venezuela (+58)</option><option  value="84">Vietnam (+84)</option><option  value="84">Virgin Islands - British (+1284)</option><option  value="84">Virgin Islands - US (+1340)</option><option  value="681">Wallis and Futuna (+681)</option><option  value="969">Yemen (North) (+969)</option><option  value="967">Yemen (South) (+967)</option><option  value="260">Zambia (+260)</option><option  value="263">Zimbabwe (+263)</option> */}
                                                        </select>

                                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 focus:bg-white focus:ring-indigo-500" placeholder="ex: 813 000 1111 OR 0813 000 1111" type="text" />
                                                    </div>

                                                    <div className={isInvalidPhone ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>Kindly enter a valid phone number</div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* DOB Section*/}
                                            <div className="mb-3">
                                                <div>
                                                    <div className="mb-3 text-xs md:text-sm">Date of birth (DD / MM / YYYY)</div>

                                                    <div className='flex justify-between items-center border rounded-lg relative'>
                                                        <div className='w-full'>
                                                            <input readOnly value={dob} onChange={e => setDOB(e.target.value)} className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900  focus:bg-white focus:ring-indigo-500" placeholder="DD / MM / YYYY" />
                                                        </div>

                                                        <div className='p-3 cursor-pointer' onClick={e => displayCalendar()}>
                                                            <img src={CalendarIcon} alt="" width="20" />
                                                        </div>

                                                        <Calendar onChange={changeDate} value={dateState} className={showCalendar ? "absolute z-10" : "hidden"} maxDate={new Date(2003, 12, 1)} />
                                                    </div>

                                                    

                                                    <div className={isInvalidDOB ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"} >Date of Birth must be in the right format (ex. DD/MM/YYYY)</div>
                                                </div>
                                            </div>
                                            {/* End Section*/}

                                            <div className="flex mb-3">
                                                <div className="text-sm font-bold opacity-0 w-full text-right">
                                                    <button type="button" className="no-underline text-black border-0 bg-gray-100 rounded-lg px-5 py-3 cursor-pointer font-bold">Cancel</button>
                                                </div>

                                                <div className='w-full text-right'>
                                                    <button onClick={verifyBVNAndDOB} className={bVNPhoneDobIsNullOrEmpty ? "bg-green-900 px-5 py-2 font-bold text-white rounded-lg border-0 focus:shadow-outline opacity-50" : "bg-green-900 px-5 py-2 font-bold text-white rounded-lg border-0 focus:shadow-outline cursor-pointer"} type='button' disabled={bVNPhoneDobIsNullOrEmpty}>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <div className="mb-2 text-sm">By creating an account, you agree to Anchoria </div>

                                                <div className="text-sm">
                                                    <a href="https://anchoriaonline.com/terms-and-conditions-of-use/" target="_blank" rel='noreferrer'><button type="button" className="no-underline border-0 bg-transparent text-green-900 cursor-pointer"><strong>Terms & Conditions</strong></button></a> and

                                                    <a href="https://anchoriaonline.com/anchoria-privacy-policy/" target="_blank" rel='noreferrer'><button type="button" className="no-underline border-0 bg-transparent text-green-900 cursor-pointer"><strong> Privacy Policy</strong></button></a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* End */}

                                    {/* Selfie Section */}
                                    <div className={showSelfie ? "selfie-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>
                                        <div className="mb-5 flex justify-between text-sm">
                                            <div className=' cursor-pointer' onClick={displaySignup}>
                                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle text-lg" /> Back
                                            </div>
                                        </div>

                                        {/* Selfie Error */}
                                        <div className={errorMsg !== '' ? "error-alert mb-3":"hidden"}>
                                            <div className="flex justify-between space-x-1 items-center p-3">
                                                <div className="flex items-center"> 
                                                    <div className="text-sm">{errorMsg}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className="text-lg font-bold mb-5 text-color">Upload a Passport Photograph</div>

                                        <div className="flex space-x-2 tips-border items-center p-3 mb-3">
                                            <div>
                                                <img src={BulbIcon} alt="bulb icon" />
                                            </div>

                                            <div className="text-red-500 text-sm pt-2"><strong>Tips:</strong> Browse and upload a clear headshot from your device</div>
                                        </div>

                                        <div onClick={triggerSelfieUpload} className="relative selfie-placeholder p-16 mb-5 cursor-pointer">
                                            <div className="mx-auto w-24 mb-5">
                                                <img src={PictureIcon} alt="bulb icon" width="70" />
                                            </div>

                                            <div className={showSelfieAvatar ? "absolute md:top-0 top-3  md:left-28 left-11" : "hidden"}>
                                                <img src={"data:image/png;base64,"+hashedSelfieImg} alt="" width="230" height='220' />
                                            </div>

                                            <div className="text-sm text-center">File format: JPEG, JPG, PNG, GIF</div>
                                        </div>

                                        <div className="mb-5 font-bold text-sm text-red-500 hidden">Remove</div>

                                        <div className="flex md:justify-end justify-between md:space-x-5 items-center">
                                            <div className="text-sm font-bold">
                                                <button onClick={displaySignup} type="button" className="font-bold cursor-pointer no-underline text-black border-0 px-5 py-3 bg-gray-100 rounded-lg">Cancel</button>
                                            </div>

                                            <div>
                                                <button onClick={verifyBVNImageAndSelfie} className=" bg-green-900 rounded-lg text-white border-0 px-20 py-3 font-bold cursor-pointer" type='button'>
                                                    <span className={showSpinner ? "hidden" : ""}>Continue</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End */}

                                    {/* User Details From BVN Section */}
                                    <div className={showBVN ? "confirm-bvn-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>
                                        <div className="mb-3 flex justify-between text-sm" onClick={displaySelfie}>
                                            <div className=' cursor-pointer'>
                                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle text-lg" /> Back
                                            </div>
                                        </div>

                                        <div className="mb-3 text-xl text-color"><strong>Confirm your details</strong></div>
                                        <div className="mb-5 text-sm">Confirm your BVN data</div>

                                        <form className="form">

                                            <div className="flex justify-between mb-5 space-x-3">
                                                <div className=" w-1/2">
                                                    <div className="mb-3 text-sm">First Name</div>
                                                    <input className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" type="text" readOnly value={firstname} />
                                                </div>

                                                <div className=" w-1/2">
                                                    <div className="mb-3 text-sm">Last Name</div>
                                                    <div><input className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" type="text" readOnly value={lastname} /></div>
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <div className="relative">
                                                    <div className="mb-3 text-sm">Other Names</div>
                                                    <input className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" type="text" readOnly value={othername} />

                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                    <div className="mb-3 text-sm ">Date of Birth</div>
                                                    <input className="bg-white text w-full focus:outline-none px-3 py-3 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" readOnly type="text" value={dob} />                                                
                                            </div>

                                            <div className="flex md:justify-end justify-between md:space-x-5 items-center">
                                                <div className="text-sm font-bold ">
                                                    <button onClick={displaySelfie} type="button" className="no-underline bg-gray-100 font-bold px-5 py-3 rounded-lg text-black border-0 cursor-pointer">Cancel</button>
                                                </div>

                                                <div>
                                                    <button onClick={generateOTPForPhone} className="border-0 rounded-lg bg-green-900 text-white px-20 py-3 font-bold cursor-pointer" type='button'>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/*End */}

                                    {/*OTP Section */}
                                    <div className={showOTP ? "confirm-otp-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>
                                        <div className="mb-3 flex justify-between text-sm" onClick={confirmBVN}>
                                            <div className=' cursor-pointer'>
                                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle text-lg" /> Back
                                            </div>
                                        </div>

                                        <div className="mb-3 mt-7">
                                            <img src={ComputerIcon} alt="computer icon" />
                                        </div>

                                        <div className="text-xl text-green-900 mb-3">Confirm your account</div>

                                        <div className="text-sm mb-3">Enter the 6 digits OTP sent to your phone number</div>

                                        <form>
                                            <div>
                                                <div className="font-bold mb-3">Enter OTP</div>
                                                <div className="flex space-x-2 mb-3">
                                                    <input value={otpbox1} onChange={e => setOTPBox1(e.target.value)} type="password" className="short-input text-center otpBox w-12" maxLength={1} />

                                                    <input value={otpbox2} onChange={e => setOTPBox2(e.target.value)} id='otpBox2' type="password" className="short-input text-center otpBox w-12" maxLength={1} />

                                                    <input value={otpbox3} onChange={e => setOTPBox3(e.target.value)} id='otpBox3' type="password" className="short-input text-center otpBox w-12" maxLength={1} />

                                                    <input value={otpbox4} onChange={e => setOTPBox4(e.target.value)} id='otpBox4' type="password" className="short-input text-center otpBox w-12" maxLength={1} />

                                                    <input value={otpbox5} onChange={e => setOTPBox5(e.target.value)} id='otpBox5' type="password" className="short-input text-center otpBox w-12" maxLength={1} />

                                                    <input value={otpbox6} onChange={e => setOTPBox6(e.target.value)} id='otpBox6' type="password" className="short-input text-center otpBox w-12" maxLength={1} />
                                                </div>
                                            </div>

                                            <div>
                                                <button onClick={generateOTPForPhone} className='bg-white border-0 mb-3 font-bold cursor-pointer text-green-800 resend-otp' type='button'>
                                                    Resend OTP
                                                </button>
                                            </div>

                                            <div className="flex md:justify-end justify-between md:space-x-5 mb-3 items-center">
                                                <div className="text-sm ">
                                                    <button onClick={confirmBVN} type="button" className="no-underline bg-gray-100 font-bold px-5 py-3 rounded-lg text-black border-0 cursor-pointer">Cancel</button>
                                                </div>

                                                <div>
                                                    <button onClick={validateOTPForPhone} className={isInValidOTP ? "bg-green-900 rounded-lg text-white border-0 cursor-pointer px-20 py-3 font-bold opacity-50" : "bg-green-900 rounded-lg text-white border-0 cursor-pointer px-20 py-3 font-bold"} type='button' disabled={isInValidOTP}>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/*End */}

                                    {/*User Email & Password Section*/}
                                    <div className={showUser ? "create-user-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>
                                        {/* OTP Validated */}
                                        <div className={showOTPValidated ? "otp-alert mb-5" : "hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 p-3">
                                                <div className="flex">
                                                    <div className="text-sm text-green-900">OTP successfully validated</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className="mb-3 flex justify-between text-sm" onClick={confirmOTP}>
                                            <div className=' cursor-pointer'>
                                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle text-lg" /> Back
                                            </div>
                                        </div>

                                        <div className=" text-xl font-gotham-black-regular text-green-900">Create user details</div>

                                        <div className="mb-3 text-sm">Create a new username and password</div>

                                        <form className="form">

                                            <div className="mb-3">
                                                <div className="relative">
                                                    <div className="mb-3 text-sm">Email</div>
                                                    <input value={email} onChange={e => setEmail(e.target.value)} className="bg-white text w-full focus:outline-none px-2 py-2 rounded text-gray-900 border focus:bg-white focus:ring-indigo-500" placeholder="Enter email address" type="text" />

                                                    <div className="hidden flex space-x-2 absolute right-0 text-sm top-55">
                                                        <div>Available</div>
                                                        <div>
                                                            <svg width="33" height="33" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062" />
                                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className={isInvalidEmail ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>Please enter a valid email address</div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="relative">
                                                    <div className="mb-3 text-sm">Password</div>

                                                    <div className='flex w-full items-center justify-between border rounded-lg p-1'>
                                                        <div className='w-full'>
                                                            <input value={password} onChange={e => setPassword(e.target.value)} type={isShowPassword ? 'text' : 'password'} className="bg-white text w-full focus:outline-none px-2 py-2 rounded text-gray-900  focus:bg-white focus:ring-indigo-500" placeholder="Enter password" name="password" />
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

                                                    <div className={isInvalidPassword ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>Password must adhere to the policy listed below </div>
                                                </div>
                                            </div>

                                            {/* Password Policy section */}
                                            <div className='mb-3'>
                                                <div className="flex space-x-5">
                                                    <div className="flex text-xs space-x-1">
                                                        <div>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'} />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'} />
                                                            </svg>
                                                        </div>

                                                        <div className={hasMinAndMaxCharacter ? "text-green-400 font-bold" : ""}>At least 8 characters strong</div>
                                                    </div>

                                                    <div className="flex text-xs space-x-1">
                                                        <div>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasLowerCaseCharacter ? "#2AD062" : "#999CA0"} />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasLowerCaseCharacter ? "#2AD062" : "#999CA0"} />
                                                            </svg>
                                                        </div>

                                                        <div className={hasLowerCaseCharacter ? "font-bold text-green-400" : ""}>One or more lower case character</div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-3">
                                                    <div className="flex text-xs space-x-1">
                                                        <div>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasUpperCaseCharacter ? "#2AD062" : "#999CA0"} />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasUpperCaseCharacter ? "#2AD062" : "#999CA0"} />
                                                            </svg>
                                                        </div>

                                                        <div className={hasUpperCaseCharacter ? "font-bold text-green-400" : ""}>One or more upper case character</div>
                                                    </div>

                                                    <div className="flex text-xs space-x-1">
                                                        <div>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasNumericCharacter ? "#2AD062" : "#999CA0"} />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasNumericCharacter ? "#2AD062" : "#999CA0"} />
                                                            </svg>
                                                        </div>

                                                        <div className={hasNumericCharacter ? "font-bold text-green-400" : ""}>One or more numeric character</div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-3">

                                                    <div className="flex text-xs space-x-1">
                                                        <div>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasSpecialCharacter ? "#2AD062" : "#999CA0"} />
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasSpecialCharacter ? "#2AD062" : "#999CA0"} />
                                                            </svg>
                                                        </div>

                                                        <div className={hasSpecialCharacter ? "font-bold text-green-400" : ""}>A symbol or special character</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Confirm Password section */}
                                            <div className="mb-3">
                                                <div className="relative">
                                                    <div className="mb-3 text-sm">Confirm Password</div>
                                                    <div className='flex w-full items-center justify-between border rounded-lg p-1'>
                                                        <div className='w-full'>
                                                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-white text w-full focus:outline-none px-2 py-2 rounded text-gray-900 focus:bg-white  focus:ring-indigo-500" placeholder="Type your password again" name="password" type={isShowConfirmPassword ? 'text' : 'password'} />
                                                        </div>

                                                        <div className='px-2 pt-1'>
                                                            <svg onClick={e => setIsShowConfirmPassword(true)} className={isShowConfirmPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50" />
                                                            </svg>

                                                            <svg onClick={e => setIsShowConfirmPassword(false)} className={isShowConfirmPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className={isPasswordMatch ? "text-red-500 text-sm mt-2 hidden" : "text-red-500 text-sm mt-2 "}>Passwords did not match</div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Proceed Button section */}
                                            <div className="flex md:justify-end justify-between md:space-x-5 items-center">
                                                <div className="text-sm">
                                                    <button type="button" className="no-underline bg-gray-100 font-bold px-5 py-3 rounded-lg text-black border-0 cursor-pointer">Cancel</button>
                                                </div>

                                                <div>
                                                    <button onClick={confirmPin} className={emailPasswordConfirmPasswordIsNullOrEmpty ? "w-full rounded-lg bg-green-900 border-0 text-white opacity-50 px-20 py-3 font-bold text-sm" : "w-full rounded-lg bg-green-900 border-0 text-white px-20 py-3 font-bold text-sm cursor-pointer"} type='button' disabled={emailPasswordConfirmPasswordIsNullOrEmpty}>
                                                        Proceed
                                                        <img src={SpinnerIcon} alt="spinner icon" className="hidden" width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* End */}
                                        </form>
                                    </div>
                                    {/*End */}

                                    {/*PIN Section */}
                                    <div className={showPin ? "create-pin-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>
                                        {/* Password Validated */}
                                        <div className={showPasswordValidated ? "otp-alert mb-3" : "hidden"}>
                                            <div className="flex justify-between space-x-1 p-3">
                                                <div className="flex">
                                                    <div className="text-sm text-green-900">Password successfully updated</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        {/* Register Error */}
                                        <div className={errorMsg !== '' ? "error-alert mb-3" : "hidden"}>
                                            <div className="flex justify-between space-x-1 p-3">
                                                <div className="flex">

                                                    <div className="text-sm">{errorMsg}</div>
                                                </div>                                        
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className="mb-3 flex justify-between text-sm" onClick={createUser}>
                                            <div className=' cursor-pointer'>
                                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle text-lg" /> Back
                                            </div>
                                        </div>

                                        <div className="mb-3 flex justify-end space-x-2 text-sm">
                                            <span>Already have an account?</span>
                                            <Link to="/" className="no-underline text-green-900"><span><strong> Login</strong> </span></Link>
                                        </div>

                                        <div className="mb-3">
                                            <img src={ComputerIcon} alt="computer icon" />
                                        </div>

                                        <div className="text-xl text-green-900">Protect your account</div>

                                        <div className="text-sm mb-3">Enter a 4 Digits transaction PIN</div>

                                        <form>
                                            <div className="mb-5">
                                                <div className="font-bold">PIN</div>
                                                <div className="flex space-x-2">
                                                    <input value={ob1} onChange={e => setOB1(e.target.value)} type="password" className="short-input text-center pinBox w-12" maxLength={1} />

                                                    <input value={ob2} onChange={e => setOB2(e.target.value)} type="password" className="short-input text-center pinBox w-12" maxLength={1} />

                                                    <input value={ob3} onChange={e => setOB3(e.target.value)} type="password" className="short-input text-center pinBox w-12" maxLength={1} />

                                                    <input value={ob4} onChange={e => setOB4(e.target.value)} type="password" className="short-input text-center pinBox w-12" maxLength={1} />
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <div className="font-bold">Confirm PIN</div>
                                                <div className="flex space-x-2">
                                                    <input value={cob1} onChange={e => setCOB1(e.target.value)} type="password" className="short-input text-center cpinBox w-12" maxLength={1} />

                                                    <input value={cob2} onChange={e => setCOB2(e.target.value)} type="password" className="short-input text-center cpinBox w-12" maxLength={1} />

                                                    <input value={cob3} onChange={e => setCOB3(e.target.value)} type="password" className="short-input text-center cpinBox w-12" maxLength={1} />

                                                    <input value={cob4} onChange={e => setCOB4(e.target.value)} type="password" className="short-input text-center cpinBox w-12" maxLength={1} />
                                                </div>
                                            </div>

                                            <div className={isInValidPIN ? "text-red-500 mb-3 text-sm" : "text-red-500 text-sm mb-3 hidden"} >PIN does not match</div>

                                            <div className="flex md:justify-end justify-between md:space-x-5 items-center">
                                                <div className="text-sm">
                                                    <button type="button" className="no-underline bg-gray-100 font-bold px-5 py-3 rounded-lg text-black border-0 cursor-pointer">Cancel</button>
                                                </div>

                                                <div>
                                                    <button onClick={registerUser} className={isInValidPIN ? "bg-green-900 rounded-lg text-white cursor-pointer px-20 py-3 font-bold border-0 opacity-50" : "bg-green-900 rounded-lg text-white cursor-pointer px-20 py-3 font-bold border-0"} type='button' disabled={isInValidPIN}>
                                                        <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/*End */}

                                    {/*Success Section */}
                                    <div className={showSuccess ? "success-container md:rounded-lg mx-auto md:mx-0 w-full md:w-4/12 md:absolute" : "hidden"}>

                                        <div className="mx-auto md:w-1/2 w-56 mb-3 mt-12 md:mt-0">
                                            <img src={SuccessCheckIcon} alt="success icon" className="w-52" />
                                        </div>

                                        <div className="text-green-900 mx-auto w-1/2 text-2xl text-center mb-3">Successful</div>

                                        <div className="text-gray-600 text-sm text-center mb-8">Your registration was successful</div>

                                        <div className="text-center">
                                            <Link to="/"> 
                                                <button className="bg-green-900 md:w-96 w-56 rounded-lg border-0 cursor-pointer text-white p-5 font-bold">Proceed to Login</button>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* End */}
                                </div>
                            </div>

                            <div className="pl-28 pt-7 mt-72">
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

                            <input type="file" id="selfie" className='opacity-0' onChange={changeImgAvatar} value=""/>

                            {/*Why we need your bvn section */}
                            <div className={openBVNModal ? "bvninfo-modal" : "hidden"}>  
                                <div className='flex justify-between'>
                                    <div className='font-bold text-blue-800 text-lg  mb-3'>Why we need your BVN</div>

                                    <div onClick={closeModal}><img src={CloseIcon} alt="" className="cursor-pointer" /></div>
                                </div>                  

                                <div className='mb-3 text-sm leading-5'>
                                    To make sure you are the right person signing up, we only access your:
                                </div>

                                <div>
                                    <div className='flex items-center space-x-3 mb-3'>
                                        <div><img src={CircleCheckGreenIcon} alt=""/></div>
                                        <div>Full Name</div>
                                    </div>

                                    <div className='flex items-center space-x-3 mb-3'>
                                        <div><img src={CircleCheckGreenIcon} alt=""/></div>
                                        <div>Phone Number</div>
                                    </div>

                                    <div className='flex items-center space-x-3 mb-3'>
                                        <div><img src={CircleCheckGreenIcon} alt=""/></div>
                                        <div>Date of Birth</div>
                                    </div>

                                    <div className='flex space-x-3 mb-3'>
                                        <div><img src={CircleInfoRedIcon} alt=""/></div>
                                        <div className='text-sm'>Your BVN doesn't give us access to your bank account, transactions or any other private information,</div>
                                    </div>

                                    <div className='font-bold mb-3'>
                                        <div>To get your BVN, dial *565*0#</div>
                                    </div>
                                </div>
                            </div>
                            {/*End */}

                            <div className={openModalBackdrop ? "modal-backdrop opacity-40" : "hidden"}>
                            </div>

                            {/* Validate User Id */}
                            <div className={showValidateUserIdModal ? "generic-modal":"hidden"}>
                                <div className='generic-modal-dialog'>
                                    <div className="top-losers-modal">
                                        <div className="mb-5 flex justify-between hidden">
                                            <div className="font-bold text-xl text-green-900">Validate User ID</div>                                        
                                        </div>

                                        <div className=''>
                                            {/* Validate User Id Error */}
                                            <div className={isUserIdValid === 'false' ? "error-alert mb-3":"hidden"}>
                                                <div className="flex justify-between space-x-1 p-3">
                                                    <div className="flex">
                                                        <div className="text-sm">Invalid User ID</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            {/* Validate User ID Success */}
                                            <div className={isUserIdValid === 'true' ? "otp-alert mb-20" : "hidden"}>
                                                <div className="flex otp-validated justify-between space-x-1 p-3">
                                                    <div className="flex">

                                                        <div className="text-sm text-green-900">User ID validated successfully</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End */}

                                            <div className='font-bold text-lg mb-2'>Do you have a User ID?</div>
                                            <div className='text-xs mb-4'>
                                                <div className="flex">
                                                    <div>
                                                        <svg width="20" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#3482F6" />
                                                        </svg>
                                                    </div>

                                                    <div className="text-xs">Your user ID is needed to retrieve and display your existing securities.</div>
                                                </div>                                            
                                            </div>

                                            <div className='flex space-x-10 mb-4'>
                                                <div className='flex space-x-1 items-center '>
                                                    <input onChange={e => setHasUserId('Yes')} type='radio' name='hasUserId'/>
                                                    <div>Yes</div>
                                                </div>

                                                <div className='flex space-x-1 items-center '>
                                                    <input onChange={e => setHasUserId('No')} type='radio' name='hasUserId'/>
                                                    <div>No</div>
                                                </div>
                                            </div>

                                            <div className={hasUserId === 'Yes'? 'mb-5':'hidden'}>
                                                <div className='font-bold text-sm mb-2'>Enter User ID</div>
                                                <div><input  value={customerAid} onChange={e => setCustomerAid(e.target.value)} type="number"  className="border p-3 rounded-lg  w-full outline-white text-lg"/></div>
                                            </div>

                                            <div>
                                                <button className='bg-gray-300 border-0 cursor-pointer font-bold text-black px-5 py-2 rounded-lg mr-5' onClick={closeModal}>
                                                    Close
                                                </button>

                                                <button className={hasUserId === ''? 'bg-green-900 border-0 cursor-pointer text-white font-bold px-5 py-2 rounded-lg opacity-50':'bg-green-900 border-0 cursor-pointer text-white font-bold px-5 py-2 rounded-lg'} disabled={hasUserId === ''} onClick={validateUserId}>
                                                    <span className={showSpinner ? "hidden" : ""}>Proceed</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={showSpinner ? "" : "hidden"} width="15" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            <div className={showModalBG ? "modal-backdrop opacity-40" : "hidden"}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;