import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenericHeader from '../../../components/Headers/GenericHeader';
import './index.scss';
import BulbIcon from '../../../assets/images/bulb.svg';
import PictureIcon from '../../../assets/images/picture-icon.svg';
import SuccessIcon from '../../../assets/images/success.gif';
import ComputerIcon from '../../../assets/images/computer.svg';
import Selfie from '../../../assets/images/funke.jpeg';
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from '../../../assets/images/calendar.svg';
import GreenLearnIcon from '../../../assets/images/green-learn.svg';
import SpinnerIcon from '../../../assets/images/spinner.gif';
import moment from 'moment';
import ArrowBackIcon from '../../../assets/images/arrow-back.svg';
import { encryptData } from '../../../lib/encryptionHelper';
import {generalEncKey} from '../../../common/constants/globals';

const Register = () => {
    const [showSignup, setShowSignup] = useState<boolean>(true);
    const [showSelfie, setShowSelfie] = useState<boolean>(false);
    const [showBVN, setShowBVN] = useState<boolean>(false);
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [showUser, setShowUser] = useState<boolean>(false);
    const [showPin, setShowPin] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [bVNPhoneDobIsNullOrEmpty, setBVNPhoneDobIsNullOrEmpty] = useState<boolean>(false);

    const [showImgAvatar, setShowImgAvatar] = useState<boolean>(true);
    const [showSelfieAvatar, setShowSelfieAvatar] = useState<boolean>(false);

    const [bvn, setBVN] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDOB] = useState('');
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
    const [firstname, setFirstName] = useState('Idowu');
    const [lastname, setLastName] = useState('Olasuyi');
    const [othername, setOtherName] = useState('Deborah');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [bvnHasError, setBVNHasError] = useState<boolean>(false);

    useEffect(() => {
        async function checkIfBVNIsNullOrEmpty(){
            let num = 11;
            let digits = /[0-9]+/g;

            if(bvn.length > 0){
                if(bvn.length === num && digits.test(bvn)){
                    setIsInvalidBVN(false);
                }
                else{
                    setIsInvalidBVN(true);
                    setBVNPhoneDobIsNullOrEmpty(true);
                }
            }

            checkIfBVNPhoneDobIsNullOrEmpty();
        }

        async function checkIfPhoneIsNullOrEmpty(){
            let digits = /[0-9]+/g;

            if(phone.length > 0){
                if(phone.length >= 10 && phone.length <= 11 && digits.test(phone)){
                    setIsInvalidPhone(false);
                }
                else{
                    setIsInvalidPhone(true);
                    setBVNPhoneDobIsNullOrEmpty(true);
                }
            }

            checkIfBVNPhoneDobIsNullOrEmpty();
        }

        async function checkIfDateIsNullOrEmpty(){
            let dateFormat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

            if(dob.length > 0){
                if(dateFormat.test(dob)){
                    setIsInvalidDOB(false);
                }
                else{
                    setIsInvalidDOB(true);
                    setBVNPhoneDobIsNullOrEmpty(true);
                }
            }

            console.log();

            checkIfBVNPhoneDobIsNullOrEmpty();
        }

        async function checkIfOTPBoxIsNullOrEmpty(){
            if(otpbox1 === '' || otpbox2 === '' || otpbox3 === '' || otpbox4 === '' || otpbox5 === '' || otpbox6 === ''){
                setIsInvalidOTP(true);
            }
            else{
                setIsInvalidOTP(false);
            }
        }

        async function checkIfOBIsNullOrEmpty(){
            if(ob1 === '' || ob2 === '' || ob3 === '' || ob4 === ''){
                setIsInvalidPIN(true);
            }
            else if(cob1 === '' || cob2 === '' || cob3 === '' || cob4 === ''){
                setIsInvalidPIN(true);
            }
            else{
                let _ob = ob1 +''+ ob2 +''+ ob3 +''+ ob4;
                let _cob = cob1 +''+ cob2 +''+ cob3 +''+ cob4;

                if(_ob === _cob){
                    setIsInvalidPIN(false);
                }
                else{
                    setIsInvalidPIN(true);
                }
                
            }
        }

        async function checkIfEmailIsNullOrEmpty(){
    
            checkIfEmailPasswordConfirmPasswordIsNullOrEmpty();
    
            if(email.length > 0){
                validateEmail();
            }
        }

        async function checkIfPasswordIsNullOrEmpty(){
            validatePassword();
            checkIfEmailPasswordConfirmPasswordIsNullOrEmpty();
        } 

        async function checkIfConfirmPasswordIsNullOrEmpty(){    
            if(password !== confirmPassword){
                setIsPasswordMatch(false);
            }
            else{
                setIsPasswordMatch(true);
            }
        } 

        checkIfBVNIsNullOrEmpty();
        checkIfPhoneIsNullOrEmpty();
        checkIfDateIsNullOrEmpty();
        checkIfOTPBoxIsNullOrEmpty();
        checkIfEmailIsNullOrEmpty();
        checkIfPasswordIsNullOrEmpty();
        checkIfConfirmPasswordIsNullOrEmpty();
        checkIfOBIsNullOrEmpty();
    });

    function verifyBVNAndDOB(){
        let requestData = {
            "bvn": bvn,
            "dateOfBirth": dob
        }

        setShowSpinner(true);

        let bvnAndDobCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('bvnAndDobCypher', bvnAndDobCypher);
        
        //VERIFY BVN AND DOB
        if(localStorage.getItem('bvnAndDobCypher')){
            setShowSpinner(true);
            axios.post('http://34.252.87.56:7934/bvn/verify', 
            {
                "text" : localStorage.getItem('bvnAndDobCypher')
            })
            .then(function (response) {
                localStorage.setItem('workflowReference', response.data.data.workflowReference);
                setShowSpinner(false);
                displaySelfie();

                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
                setShowSpinner(false);
                setBVNHasError(true);

                setTimeout(()=>{
                    setBVNHasError(false);
                },3000);
            });
        }
    }

    function verifyBVNImageAndSelfie(){
        
        let requestData = {
            "bvn": bvn,//gbemi image
            "base64Image": "data:image/jpeg;base64,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"
        }

        setShowSpinner(true);

        let bvnAndSelfieCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('bvnAndSelfieCypher', bvnAndSelfieCypher);

        // axios.post('https://cors-anywhere.herokuapp.com/http://34.252.87.56:7934/test/encrypt', requestData)
        // .then(function (response) {
        //     localStorage.setItem('bvnAndSelfieCypher', response.data.text);
        //     setShowSpinner(false);
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     setShowSpinner(false);
        // });
        
        //VERIFY BVN AND Selfie
        if(localStorage.getItem('bvnAndSelfieCypher')){
            setShowSpinner(true);
            axios.post('http://34.252.87.56:7934/bvn/details-by-selfie?workflowReference='+localStorage.getItem('workflowReference'), 
            {
                "text" : localStorage.getItem('bvnAndSelfieCypher')
            })
            .then(function (response) {
                localStorage.setItem('workflowReference', response.data.data.workflowDetails.workflowReference);
                setShowSpinner(false);
                confirmBVN();

                setFirstName(response.data.data.bvnDetails.firstName);
                setLastName(response.data.data.bvnDetails.lastName);
                setOtherName(response.data.data.bvnDetails.middleName);
                
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
                setShowSpinner(false);
            });
        }
    }

    function generateOTPForPhone(){
        let requestData = {
            "phoneNumber": phone,
            "workflowReference": localStorage.getItem('workflowReference')
        }

        setShowSpinner(true);

        let phoneOTPCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('phoneOTPCypher', phoneOTPCypher);

        // axios.post('https://cors-anywhere.herokuapp.com/http://34.252.87.56:7934/test/encrypt', requestData)
        // .then(function (response) {
        //     localStorage.setItem('phoneOTPCypher', response.data.text);
        //     setShowSpinner(false);
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     setShowSpinner(false);
        // });
        
        //GENERATE OTP FOR PHONE
        if(localStorage.getItem('phoneOTPCypher')){
            setShowSpinner(true);
            axios.post('http://34.252.87.56:7934/otp/generate', 
            {
                "text" : localStorage.getItem('phoneOTPCypher')
            })
            .then(function (response) {
                setShowSpinner(false);
                confirmOTP();
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
                setShowSpinner(false);
            });
        }
    }

    function validateOTPForPhone(){
        let requestData = {
            "phoneNumber" : phone ,
            "otp" : otpbox1+''+otpbox2+''+otpbox3+''+otpbox4+''+otpbox5+''+otpbox6
        }

        setShowSpinner(true);

        let validatePhoneOTPCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('validatePhoneOTPCypher', validatePhoneOTPCypher);

        // axios.post('https://cors-anywhere.herokuapp.com/http://34.252.87.56:7934/test/encrypt', requestData)
        // .then(function (response) {
        //     localStorage.setItem('validatePhoneOTPCypher', response.data.text);
        //     setShowSpinner(false);
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     setShowSpinner(false);
        // });
        
        //VALIDATE OTP FOR PHONE
        if(localStorage.getItem('validatePhoneOTPCypher')){
            setShowSpinner(true);

            axios.post('http://34.252.87.56:7934/otp/validate?workflowReference='+localStorage.getItem('workflowReference'), 
            {
                "text" : localStorage.getItem('validatePhoneOTPCypher')
            })
            .then(function (response) {
                localStorage.setItem('workflowReference', response.data.data.verificationRef);
                setShowSpinner(false);

                createUser();
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
                setShowSpinner(false);
            });
        }
    }

    function registerUser(){        
        let requestData = {
            "birthDate": "07-Feb-1991",
            "bvn": bvn,
            "email": email,
            "firstName": firstname,
            "lastName": lastname,
            "nationality": "Nigeria",
            "otherNames": othername,
            "password": password,
            "phoneNumber": phone,
            "pin": ob1+''+ob2+''+ob3+''+ob4,
            "selfieImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUN",
            "selfieName": "developer@live.com",
            "sex": "MALE",
            "termsFlag": "Y",
            "title": "Mr",
            "deviceId": "2e1a65c3-abe8-49cc-99cc-afb2afba085c",
            "osType": "Android",
            "permanentAddress": "No 9 Lagos house Marina, Lagos",
            'shA': showImgAvatar
        }

        setShowSpinner(true);

        let createUserCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('createUserCypher', createUserCypher);

        
        //REGISTER USER
        if(localStorage.getItem('createUserCypher')){
            setShowSpinner(true);
            axios.post('http://34.252.87.56:7930/customer/add?workflowReference='+localStorage.getItem('workflowReference'), 
            {
                "text" : localStorage.getItem('createUserCypher')
            })
            .then(function (response) {
                setShowSpinner(false);
                confirmSuccess();
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
                setShowSpinner(false);
            });
        }
    }

    function checkIfEmailPasswordConfirmPasswordIsNullOrEmpty(){
        if(email === '' || password === '' || confirmPassword === '' || password !== confirmPassword){
            setEmailPasswordConfirmPasswordIsNullOrEmpty(true);
        }
        else if(!hasMinAndMaxCharacter || !hasLowerCaseCharacter || !hasUpperCaseCharacter || !hasNumericCharacter || !hasSpecialCharacter){
            setEmailPasswordConfirmPasswordIsNullOrEmpty(true);
        }
        else{
            setIsPasswordMatch(true);
            setEmailPasswordConfirmPasswordIsNullOrEmpty(false);
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

    function checkIfBVNPhoneDobIsNullOrEmpty(){
        if(bvn === '' || phone === '' || dob === ''){
            setBVNPhoneDobIsNullOrEmpty(true);
        }
        else if(isInvalidBVN || isInvalidPhone || isInvalidDOB){
            setBVNPhoneDobIsNullOrEmpty(true);
        }
        else{
            setBVNPhoneDobIsNullOrEmpty(false);
        }
    }

    const changeDate = (e :any) => {
        setDateState(e);
        setDOB(moment(e).format("DD/MM/YYYY"));
        setShowCalendar(false);
        setIsInvalidPassword(true);
    }

    function validateEmail(){
        const regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(!email || regex.test(email) === false){
            setIsInvalidEmail(true);
            return;
        }
        else{
            setIsInvalidEmail(false);
        }
    }

    function displaySignup(){
        setShowSignup(true);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function displaySelfie(){
        setShowSignup(false);
        setShowSelfie(true);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function confirmBVN(){
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(true);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function confirmOTP(){
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(true);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(false);
    }

    function createUser(){
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(true);
        setShowPin(false);
        setShowSuccess(false);
    }

    function confirmPin(){
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(true);
        setShowSuccess(false);
    }

    function confirmSuccess(){
        setShowSignup(false);
        setShowSelfie(false);
        setShowBVN(false);
        setShowOTP(false);
        setShowUser(false);
        setShowPin(false);
        setShowSuccess(true);
    }

    function closeOTPValidated(){
        setShowOTPValidated(false);
    }

    function closeBVNHasError(){
        setBVNHasError(false);
    }

    function closePasswordValidated(){
        setShowPasswordValidated(false);
    }

    function triggerSelfieUpload(){
        document.getElementById("selfie")?.click();
    }

    function changeImgAvatar(){
        setShowImgAvatar(false);
        setShowSelfieAvatar(true);
    }

    function displayCalendar(){
        if(showCalendar){
            setShowCalendar(false);
        }
        else{
            setShowCalendar(true);
        }
    }

    function displayBVNModal(){
        setOpenBVNModal(true);
        setOpenModalBackdrop(true);
    }

    function closeModal(){
        setOpenBVNModal(false);
        setOpenModalBackdrop(false)
    }

    return (
        <div>
            <GenericHeader />

            <div className="candle-stick-container signup-h">
                <div className="candle-stick-box">
                    <div className="smiling-lady"></div>

                    <div className="candle-stick"></div>

                    <div className={showSignup ? "signup-container " : "signup-container hidden"}>

                        {/* BVN Validated Error */}
                        <div className={bvnHasError ? "error-alert mb-20":"hidden"}>
                            <div className="flex justify-between space-x-1 pt-3">
                                <div className="flex">
                                    <div>
                                        <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                        </svg>
                                    </div>

                                    <div className="pt-1 text-14">BVN and Date of Birth does not match</div>
                                </div>
                                
                                <div className="cursor-pointer" onClick={closeBVNHasError}>
                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-30 flex justify-between text-14">
                            <div className='font-bold cursor-pointer opacity-0'>
                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                            </div>

                            <div>
                                <span>Already have an account?</span>
                                <Link to="/" className="no-underline text-color-1"><span><strong> Login</strong> </span></Link>
                            </div>
                        </div>

                        <div className="mb-10 text-28 text-color-1 font-gotham-black-regular"><strong>Signup</strong></div>
                        <div className="mb-30 text-16">Provide the details below to get started</div>

                        <form className="form">
                            {/* BVN Section*/}
                            <div className="mb-20">
                                <div className="flex justify-between mb-10">
                                    <span className="text-13">BVN (Bank Verification Number) </span>
                                    <span onClick={displayBVNModal} className="text-13 flex justify-between cursor-pointer">
                                        <span className="mr-2">Why we need this</span>
                                        <svg width="22" height="21" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16ZM12 6C14.2091 6 16 7.79086 16 10C16 11.7948 14.8179 13.3135 13.1898 13.8201L13 13.874V14C13 14.5523 12.5523 15 12 15C11.4872 15 11.0645 14.614 11.0067 14.1166L11 14V13C11 12.4872 11.386 12.0645 11.8834 12.0067L12.1493 11.9945C13.1841 11.9182 14 11.0544 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10C8 7.79086 9.79086 6 12 6Z" fill="#353F50"/>
                                        </svg>
                                    </span>
                                </div>

                                <input value={bvn} onChange={e => setBVN(e.target.value)} className="border-1-d6 p-3 input text-14 outline-white" placeholder="Enter your BVN" type='text'/> 

                                <div className={isInvalidBVN ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>BVN can only consist of 11 digits</div>
                            </div>
                            {/*End*/}

                            {/* Phone Section*/}
                            <div className="mb-20">
                                <div>
                                    <div className="mb-10 text-13">Phone number</div>
                                    <div className='flex border-1-d6 rounded-lg p-2'>
                                        <select className='border-0 font-gotham outline-white'>
                                            <option  value="234">+234</option>
                                            <option  value="1">+1</option>
                                            <option  value="44">+44</option>
                                            <option  value="213">+213</option>
                                            <option  value="376">+376</option>
                                            <option  value="244">+244</option>
                                            <option  value="1264">+1264</option>
                                            <option  value="1268">+1268</option>
                                            <option  value="54">+54</option>
                                            <option  value="374">+374</option>
                                            <option  value="297">+297</option>
                                            <option  value="61">+61</option>
                                            <option  value="43">+43</option>
                                            <option  value="994">+994</option>
                                            <option  value="1242">+1242</option>
                                            <option  value="973">+973</option>
                                            <option  value="880">+880</option>
                                            <option  value="1246">+1246</option>
                                            <option  value="375">+375</option>
                                            <option  value="32">+32</option>
                                            <option  value="501">+501</option>
                                            <option  value="229">+229</option>
                                            <option  value="1441">+1441</option>
                                            <option  value="975">+975</option>
                                            <option  value="591">+591</option>
                                            {/* <option  value="387">Bosnia Herzegovina (+387)</option><option  value="267">Botswana (+267)</option><option  value="55">Brazil (+55)</option><option  value="673">Brunei (+673)</option><option  value="359">Bulgaria (+359)</option><option  value="226">Burkina Faso (+226)</option><option  value="257">Burundi (+257)</option><option  value="855">Cambodia (+855)</option><option  value="237">Cameroon (+237)</option><option  value="1">Canada (+1)</option><option  value="238">Cape Verde Islands (+238)</option><option  value="1345">Cayman Islands (+1345)</option><option  value="236">Central African Republic (+236)</option><option  value="56">Chile (+56)</option><option  value="86">China (+86)</option><option  value="57">Colombia (+57)</option><option  value="269">Comoros (+269)</option><option  value="242">Congo (+242)</option><option  value="682">Cook Islands (+682)</option><option  value="506">Costa Rica (+506)</option><option  value="385">Croatia (+385)</option><option  value="53">Cuba (+53)</option><option  value="599">Curacao (+599)</option><option  value="90392">Cyprus North (+90392)</option><option  value="357">Cyprus South (+357)</option><option  value="420">Czech Republic (+420)</option><option  value="45">Denmark (+45)</option><option  value="253">Djibouti (+253)</option><option  value="1809">Dominica (+1809)</option><option  value="1809">Dominican Republic (+1809)</option><option  value="593">Ecuador (+593)</option><option  value="20">Egypt (+20)</option><option  value="503">El Salvador (+503)</option><option  value="240">Equatorial Guinea (+240)</option><option  value="291">Eritrea (+291)</option><option  value="372">Estonia (+372)</option><option  value="251">Ethiopia (+251)</option><option  value="500">Falkland Islands (+500)</option><option  value="298">Faroe Islands (+298)</option><option  value="679">Fiji (+679)</option><option  value="358">Finland (+358)</option><option  value="33">France (+33)</option><option  value="594">French Guiana (+594)</option><option  value="689">French Polynesia (+689)</option><option  value="241">Gabon (+241)</option><option  value="220">Gambia (+220)</option><option  value="7880">Georgia (+7880)</option><option  value="49">Germany (+49)</option><option  value="233">Ghana (+233)</option><option  value="350">Gibraltar (+350)</option><option  value="30">Greece (+30)</option><option  value="299">Greenland (+299)</option><option  value="1473">Grenada (+1473)</option><option  value="590">Guadeloupe (+590)</option><option  value="671">Guam (+671)</option><option  value="502">Guatemala (+502)</option><option  value="224">Guinea (+224)</option><option  value="245">Guinea - Bissau (+245)</option><option  value="592">Guyana (+592)</option><option  value="509">Haiti (+509)</option><option  value="504">Honduras (+504)</option><option  value="852">Hong Kong (+852)</option><option  value="36">Hungary (+36)</option><option  value="354">Iceland (+354)</option><option  value="91">India (+91)</option><option  value="62">Indonesia (+62)</option><option  value="98">Iran (+98)</option><option  value="964">Iraq (+964)</option><option  value="353">Ireland (+353)</option><option  value="972">Israel (+972)</option><option  value="39">Italy (+39)</option><option  value="1876">Jamaica (+1876)</option><option  value="81">Japan (+81)</option><option  value="962">Jordan (+962)</option><option  value="7">Kazakhstan (+7)</option><option  value="254">Kenya (+254)</option><option  value="686">Kiribati (+686)</option><option  value="850">Korea North (+850)</option><option  value="82">Korea South (+82)</option><option  value="965">Kuwait (+965)</option><option  value="996">Kyrgyzstan (+996)</option><option  value="856">Laos (+856)</option><option  value="371">Latvia (+371)</option><option  value="961">Lebanon (+961)</option><option  value="266">Lesotho (+266)</option><option  value="231">Liberia (+231)</option><option  value="218">Libya (+218)</option><option  value="417">Liechtenstein (+417)</option><option  value="370">Lithuania (+370)</option><option  value="352">Luxembourg (+352)</option><option  value="853">Macao (+853)</option><option  value="389">Macedonia (+389)</option><option  value="261">Madagascar (+261)</option><option  value="265">Malawi (+265)</option><option  value="60">Malaysia (+60)</option><option  value="960">Maldives (+960)</option><option  value="223">Mali (+223)</option><option  value="356">Malta (+356)</option><option  value="692">Marshall Islands (+692)</option><option  value="596">Martinique (+596)</option><option  value="222">Mauritania (+222)</option><option  value="269">Mayotte (+269)</option><option  value="52">Mexico (+52)</option><option  value="691">Micronesia (+691)</option><option  value="373">Moldova (+373)</option><option  value="377">Monaco (+377)</option><option  value="976">Mongolia (+976)</option><option  value="1664">Montserrat (+1664)</option><option  value="212">Morocco (+212)</option><option  value="258">Mozambique (+258)</option><option  value="95">Myanmar (+95)</option><option  value="264">Namibia (+264)</option><option  value="674">Nauru (+674)</option><option  value="977">Nepal (+977)</option><option  value="31">Netherlands (+31)</option><option  value="687">New Caledonia (+687)</option><option  value="64">New Zealand (+64)</option><option  value="505">Nicaragua (+505)</option><option  value="227">Niger (+227)</option><option  value="234">Nigeria (+234)</option><option  value="683">Niue (+683)</option><option  value="672">Norfolk Islands (+672)</option><option  value="670">Northern Marianas (+670)</option><option  value="47">Norway (+47)</option><option  value="968">Oman (+968)</option><option  value="680">Palau (+680)</option><option  value="507">Panama (+507)</option><option  value="675">Papua New Guinea (+675)</option><option  value="595">Paraguay (+595)</option><option  value="51">Peru (+51)</option><option  value="63">Philippines (+63)</option><option  value="48">Poland (+48)</option><option  value="351">Portugal (+351)</option><option  value="1787">Puerto Rico (+1787)</option><option  value="974">Qatar (+974)</option><option  value="262">Reunion (+262)</option><option  value="40">Romania (+40)</option><option  value="7">Russia (+7)</option><option  value="250">Rwanda (+250)</option><option  value="378">San Marino (+378)</option><option  value="239">Sao Tome &amp; Principe (+239)</option><option  value="966">Saudi Arabia (+966)</option><option  value="221">Senegal (+221)</option><option  value="381">Serbia (+381)</option><option  value="248">Seychelles (+248)</option><option  value="232">Sierra Leone (+232)</option><option  value="65">Singapore (+65)</option><option  value="1">Sint Maarten (+1)</option><option  value="421">Slovak Republic (+421)</option><option  value="386">Slovenia (+386)</option><option  value="677">Solomon Islands (+677)</option><option  value="252">Somalia (+252)</option><option  value="27">South Africa (+27)</option><option  value="34">Spain (+34)</option><option  value="94">Sri Lanka (+94)</option><option  value="290">St. Helena (+290)</option><option  value="1869">St. Kitts (+1869)</option><option  value="1758">St. Lucia (+1758)</option><option  value="249">Sudan (+249)</option><option  value="597">Suriname (+597)</option><option  value="268">Swaziland (+268)</option><option  value="46">Sweden (+46)</option><option  value="41">Switzerland (+41)</option><option  value="963">Syria (+963)</option><option  value="886">Taiwan (+886)</option><option  value="7">Tajikstan (+7)</option><option  value="66">Thailand (+66)</option><option  value="228">Togo (+228)</option><option  value="676">Tonga (+676)</option><option  value="1868">Trinidad &amp; Tobago (+1868)</option><option  value="216">Tunisia (+216)</option><option  value="90">Turkey (+90)</option><option  value="7">Turkmenistan (+7)</option><option  value="993">Turkmenistan (+993)</option><option  value="1649">Turks &amp; Caicos Islands (+1649)</option><option  value="688">Tuvalu (+688)</option><option  value="256">Uganda (+256)</option><option  value="380">Ukraine (+380)</option><option  value="971">United Arab Emirates (+971)</option><option  value="598">Uruguay (+598)</option><option  value="7">Uzbekistan (+7)</option><option  value="678">Vanuatu (+678)</option><option  value="379">Vatican City (+379)</option><option  value="58">Venezuela (+58)</option><option  value="84">Vietnam (+84)</option><option  value="84">Virgin Islands - British (+1284)</option><option  value="84">Virgin Islands - US (+1340)</option><option  value="681">Wallis and Futuna (+681)</option><option  value="969">Yemen (North) (+969)</option><option  value="967">Yemen (South) (+967)</option><option  value="260">Zambia (+260)</option><option  value="263">Zimbabwe (+263)</option> */}
                                        </select>

                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="px-2 py-1 border-0 input text-14 outline-white" placeholder="ex: 813 000 1111 OR 0813 000 1111" type="text"/>
                                    </div>
                                    <div className={isInvalidPhone ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>Kindly enter a valid phone number</div>                                    
                                </div>
                            </div>
                            {/* End */}

                            {/* DOB Section*/}
                            <div className="mb-20">
                                <div>
                                    <div className="mb-10 text-13">Date of birth (DD / MM / YYYY)</div>
                                    <div className='flex justify-between items-center border-1-d6 rounded-lg'>
                                        <div className='w-full'>
                                            <input type="text" value={dob} onChange={e => setDOB(e.target.value)} className="outline-white border-0 p-3 input text-14" placeholder="DD / MM / YYYY"/>
                                        </div>
                                        <div className='p-3 cursor-pointer' onClick={e => displayCalendar()}>
                                            <img src={CalendarIcon} alt="" width="20"/>
                                        </div>
                                    </div>

                                    <Calendar onChange={changeDate} value={dateState} className={showCalendar ? "absolute z-10":"hidden"} maxDate={new Date(2003, 12, 1)} />

                                    <div className={isInvalidDOB ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"} >Date of Birth must be in the right format (ex. DD/MM/YYYY)</div>
                                </div>
                            </div>
                            {/* End Section*/}

                            <div className="border-1 mb-20"></div>

                            <div className="flex space-x-10 mb-20">
                                <div className="text-13 font-bold pt-4 w-full text-right">
                                    <button type="button" className="no-underline text-black">Cancel</button>
                                </div>

                                <div className='w-full'>
                                    <button onClick={verifyBVNAndDOB} className={bVNPhoneDobIsNullOrEmpty ? "bgcolor-1 px-20 py-3 font-bold text-white rounded-lg border-0 focus:shadow-outline opacity-50":"bgcolor-1 px-20 py-3 font-bold text-white rounded-lg border-0 focus:shadow-outline cursor-pointer"} type='button' disabled={bVNPhoneDobIsNullOrEmpty}>
                                        <span className={ showSpinner ? "hidden" : ""}>Proceed</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                    </button>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="mb-5 text-13">By creating an account, you agree to Anchoria </div>
                                <div className="text-13">
                                    <button type="button" className="no-underline"><strong>Terms & Conditions</strong></button> and 
                                    <button type="button" className="no-underline"><strong> Privacy Policy</strong></button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={showSelfie ? "selfie-container " : "selfie-container hidden"}>
                        <div className="mb-30 flex justify-between text-14">
                            <div className='font-bold cursor-pointer' onClick={displaySignup}>
                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                            </div>
                        </div>

                        <div className="text-lg font-bold mb-30 text-color">Upload a Passport Photograph</div>

                        <div className="flex space-x-2 tips-border p-3 mb-20">
                            <div>
                                <img src={BulbIcon} alt="bulb icon" />
                            </div>

                            <div className="text-red-500 text-13 pt-2"><strong>Tips:</strong> Browse and upload a clear headshot from your device</div>
                        </div>

                        <div onClick={triggerSelfieUpload} className="relative selfie-placeholder p-16 mb-30 cursor-pointer">
                            <div className="mx-auto w-24 mb-10">
                                <img src={PictureIcon} alt="bulb icon" width="70"/>
                            </div>

                            <div className={showSelfieAvatar ? "absolute top-0 left-28" : "absolute top-0 left-28 hidden"}>
                                <img src={Selfie} alt="" width="230" height='220'/>
                            </div>

                            <div className="text-13 text-center">File format: JPG, PNG, GIF, PDF</div>
                        </div>

                        <div className="mb-20 font-bold text-13 text-red-500 hidden">Remove</div>

                        <div className="border-1 mb-20"></div>

                        <div className="flex justify-end space-x-10 mb-20">
                            <div className="text-13 font-bold pt-4">
                                <button type="button" className="no-underline text-black">Cancel</button>
                            </div>

                            {/* <div><button onClick={confirmBVN} className=" bgcolor-1 rounded-lg text-white border-0 px-20 py-3 font-bold cursor-pointer" type='button'>Continue</button></div> */}

                            <div>
                                <button onClick={verifyBVNImageAndSelfie} className=" bgcolor-1 rounded-lg text-white border-0 px-20 py-3 font-bold cursor-pointer" type='button'>
                                    <span className={ showSpinner ? "hidden" : ""}>Continue</span>
                                    <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={showBVN ? "confirm-bvn-container " : "confirm-bvn-container hidden"}>
                        <div className="mb-30 flex justify-between text-14" onClick={displaySelfie}>
                            <div className='font-bold cursor-pointer'>
                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                            </div>
                        </div>

                        <div className="mb-20 text-28 text-color"><strong>Confirm your details</strong></div>
                        <div className="mb-30 text-16">Confirm your BVN data</div>

                        <form className="form">

                            <div className="flex justify-between mb-30 space-x-3">
                                <div className="relative">
                                    <div className="mb-5 text-16">First Name</div>
                                    <input className="border-1-d6 input text-14 bg-gray-200 p-3" type="text" readOnly value={firstname}/>
                                </div>

                                <div className="relative">
                                    <div className="mb-5 text-16">Last Name</div>
                                    <div><input className="border-1-d6 p-3 input text-14 bg-gray-200" type="text" readOnly value={lastname}/></div>
                                </div>
                            </div>

                            <div className="mb-30">
                                <div className="relative">
                                    <div className="mb-5 text-16">Other Names</div>
                                    <input className="border-1-d6 p-3 input text-14 bg-gray-200" type="text" readOnly value={othername}/>
                                    
                                </div>
                            </div>

                            <div className="mb-20">
                                <div className="relative">
                                    <div className="mb-5 text-16">Date of Birth</div>
                                    <input className="border-1-d6 p-3 input text-14 bg-gray-200"type="text" value={dob}/>
                                </div>
                            </div>

                            <div className="border-1 mb-30"></div>

                            <div className="flex justify-end space-x-10 mb-30">
                                <div className="text-13 font-bold pt-4">
                                    <button type="button" className="no-underline text-black">Cancel</button>
                                </div>

                                <div>
                                    <button onClick={generateOTPForPhone} className="border-0 rounded-lg bgcolor-1 text-white px-20 py-3 font-bold cursor-pointer" type='button'>
                                        <span className={ showSpinner ? "hidden" : ""}>Proceed</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={showOTP ? "confirm-otp-container " : "confirm-otp-container hidden"}>
                        <div className="mb-30 flex justify-between text-14" onClick={confirmBVN}>
                            <div className='font-bold cursor-pointer'>
                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                            </div>
                        </div>

                       <div className="mb-20 mt-7">
                           <img src={ComputerIcon} alt="computer icon" />
                       </div>

                       <div className="font-gotham-black-regular text-28 text-color-1 mb-20">Confirm your account</div>

                       <div className="text-16 text-color-4 mb-20">Enter the 6 digits OTP sent to your phone number</div>

                       <form>
                           <div className="mb-30">
                               <div className="font-bold mb-5">Enter OTP</div>
                               <div className="flex space-x-2 mb-10">
                                   <input value={otpbox1} onChange={e => setOTPBox1(e.target.value)} type="password" className="short-input text-center otpBox" maxLength={1}/>

                                   <input value={otpbox2} onChange={e => setOTPBox2(e.target.value)} id='otpBox2' type="password" className="short-input text-center otpBox" maxLength={1}/>

                                   <input value={otpbox3} onChange={e => setOTPBox3(e.target.value)} id='otpBox3' type="password" className="short-input text-center otpBox" maxLength={1}/>

                                   <input value={otpbox4} onChange={e => setOTPBox4(e.target.value)} id='otpBox4' type="password" className="short-input text-center otpBox" maxLength={1}/>

                                   <input value={otpbox5} onChange={e => setOTPBox5(e.target.value)} id='otpBox5' type="password" className="short-input text-center otpBox" maxLength={1}/>

                                   <input value={otpbox6} onChange={e => setOTPBox6(e.target.value)} id='otpBox6' type="password" className="short-input text-center otpBox" maxLength={1}/>
                               </div>
                           </div>

                           <div className="border-1 mb-20"></div>

                            <div className="flex justify-end space-x-10">
                                <div className="text-13 font-bold pt-4">
                                    <button type="button" className="no-underline text-black">Cancel</button>
                                </div>

                                <div>
                                    <button onClick={validateOTPForPhone} className={ isInValidOTP ? "bgcolor-1 rounded-lg text-white border-0 cursor-pointer px-20 py-3 font-bold opacity-50":"bgcolor-1 rounded-lg text-white border-0 cursor-pointer px-20 py-3 font-bold"} type='button' disabled={isInValidOTP}>
                                        <span className={ showSpinner ? "hidden" : ""}>Proceed</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                    </button>
                                </div>
                            </div>
                       </form>
                    </div>

                    <div className={showUser ? "create-user-container relative " : "create-user-container relative hidden"}>
                        {/* OTP Validated */}
                        <div className={showOTPValidated ? "otp-alert mb-20":"hidden"}>
                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                <div className="flex">
                                    <div>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                        </svg>
                                    </div>

                                    <div className="pt-1 text-14 text-color-1">OTP successfully validated</div>
                                </div>
                                
                                <div className="cursor-pointer" onClick={closeOTPValidated}>
                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* End */}

                        <div className="mb-30 flex justify-between text-14" onClick={confirmOTP}>
                            <div className='font-bold cursor-pointer'>
                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                            </div>
                        </div>

                        <div className={showOTPValidated ? "otp-alert hidden":"hidden"}>
                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                <div className="flex">
                                    <div>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                        </svg>
                                    </div>

                                    <div className="pt-1 text-14 text-color-1">OTP successfully validated</div>
                                </div>
                                
                                <div className="cursor-pointer" onClick={closeOTPValidated}>
                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-20 text-28 font-gotham-black-regular text-color-1">Create user details</div>
                        
                        <div className="mb-20 text-16 text-color-4">Create a new username and password</div>

                        <form className="form">

                            <div className="mb-30">
                                <div className="relative">
                                    <div className="mb-10 text-16">Email</div>
                                    <input  value={email} onChange={e => setEmail(e.target.value)} className="outline-white border-1-d6 p-3 input text-14" placeholder="Enter email address" type="text"/>

                                    <div className="hidden flex space-x-2 absolute right-0 text-13 top-55">
                                        <div>Available</div>
                                        <div>
                                            <svg width="33" height="33" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className={isInvalidEmail ? "text-red-500 text-sm mt-2": "text-red-500 text-sm mt-2 hidden"}>Please enter a valid email address</div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="relative">
                                    <div className="mb-10 text-16">Password</div>

                                    <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                        <div className='w-full'>
                                            <input value={password} onChange={e => setPassword(e.target.value)} type={isShowPassword ? 'text' : 'password'} className="outline-white input border-0 text-14 p-3" placeholder="Enter password" name="password"/>
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

                                    <div className={isInvalidPassword ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"}>Password must adhere to the policy listed below </div>
                                </div>
                            </div>

                            {/* Password Policy section */}
                            <div>
                                <div className="flex space-x-5 mb-10">
                                    <div className="flex text-13 space-x-1 text-color-3">
                                        <div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                            </svg>
                                        </div>

                                        <div className={hasMinAndMaxCharacter ? "pt-20 text-color-2a font-bold": "pt-20"}>At least 8 characters strong</div>
                                    </div>

                                    <div className="flex text-13 space-x-1 text-color-3">
                                        <div>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                            </svg>
                                        </div>

                                        <div className={hasLowerCaseCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more lower case character</div>
                                    </div>
                                </div>

                                <div className="flex space-x-3 mb-10">
                                    <div className="flex text-13 space-x-1 text-color-3">
                                        <div>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                            </svg>
                                        </div>

                                        <div className={hasUpperCaseCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more upper case character</div>
                                    </div>

                                    <div className="flex text-13 space-x-1 text-color-3">
                                        <div>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                            </svg>
                                        </div>

                                        <div className={hasNumericCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more numeric character</div>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-3 mb-30">

                                    <div className="flex text-13 space-x-1 text-color-3">
                                        <div>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                            </svg>
                                        </div>

                                        <div className={hasSpecialCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>A symbol or special character</div>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            {/* Confirm Password section */}
                            <div className="mb-20">
                                <div className="relative">
                                    <div className="mb-10 text-16">Confirm Password</div>
                                    <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                        <div className='w-full'>
                                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="outline-white input border-0 text-14 p-3" placeholder="Type your password again" name="password" type={isShowConfirmPassword ? 'text' : 'password'}/>
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
                            

                            {/* <div className="border-1 mb-20"></div>

                            <div className="flex justify-end space-x-10">
                                <div className="text-13 font-bold pt-4">
                                    <a href="#" className="no-underline text-black">Cancel</a>
                                </div>

                                <div><button onClick={confirmPin} className="bgcolor-1 rounded-lg text-white border-0 px-20 py-3 font-bold cursor-pointer opacity-50" type='button' disabled>Proceed</button></div>
                            </div> */}

                            {/* Proceed Button section */}
                            <div className="flex justify-end space-x-10 mb-20">
                                <div className="text-13 font-bold pt-4">
                                    <button type="button" className="no-underline text-black">Cancel</button>
                                </div>

                                <div>
                                    <button onClick={confirmPin} className={emailPasswordConfirmPasswordIsNullOrEmpty ? "w-full rounded-lg bgcolor-1 border-0 text-white opacity-50 px-20 py-3 font-bold text-16":"w-full rounded-lg bgcolor-1 border-0 text-white px-20 py-3 font-bold text-16 cursor-pointer"} type='button' disabled={emailPasswordConfirmPasswordIsNullOrEmpty}>
                                        Proceed                                
                                        <img src={SpinnerIcon} alt="spinner icon" className="hidden" width="30"/>
                                    </button>
                                </div>
                            </div>
                            {/* End */}
                        </form>
                    </div>

                    <div className={showPin ? "create-pin-container" : "create-pin-container hidden"}>
                        <div className={showPasswordValidated ? "otp-alert mb-20":"hidden"}>
                            <div className="flex justify-between space-x-1 pt-3">
                                <div className="flex">
                                    <div>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                        </svg>
                                    </div>

                                    <div className="pt-1 text-14 text-color-1">Password successfully updated</div>
                                </div>
                                
                                <div className="cursor-pointer" onClick={closePasswordValidated}>
                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-30 flex justify-between text-14" onClick={createUser}>
                            <div className='font-bold cursor-pointer'>
                                <img width="20" src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                            </div>
                        </div>                        

                        <div className="mb-20 text-color-2 flex justify-end space-x-2 text-16">
                            <div>Already have an account?</div>
                            <div><strong>Login</strong> </div>
                        </div>

                       <div className="mb-20">
                           <img src={ComputerIcon} alt="computer icon" />
                       </div>

                       <div className="font-gotham-black-regular text-28 text-color-1 mb-20">Protect your account</div>

                       <div className="text-16 text-color-4 mb-20">Enter a 4 Digits transaction PIN</div>

                       <form>
                           <div className="mb-20">
                               <div className="font-bold mb-5">PIN</div>
                               <div className="flex space-x-2">
                                   <input value={ob1} onChange={e => setOB1(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>

                                   <input value={ob2} onChange={e => setOB2(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>

                                   <input value={ob3} onChange={e => setOB3(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>

                                   <input value={ob4} onChange={e => setOB4(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>
                               </div>
                           </div>

                           <div className="mb-20">
                               <div className="font-bold mb-5">Confirm PIN</div>
                               <div className="flex space-x-2">
                                   <input value={cob1} onChange={e => setCOB1(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>

                                   <input value={cob2} onChange={e => setCOB2(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>

                                   <input value={cob3} onChange={e => setCOB3(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>

                                   <input value={cob4} onChange={e => setCOB4(e.target.value)} type="password" className="short-input text-center" maxLength={1}/>
                               </div>
                           </div>

                           <div className={isInValidPIN ? "text-red-500 text-sm mt-2" : "text-red-500 text-sm mt-2 hidden"} >PIN does not match</div>

                           <div className="border-1 mb-20"></div>

                            <div className="flex justify-end space-x-10">
                                <div className="text-13 font-bold pt-4">
                                    <button type="button" className="no-underline text-black">Cancel</button>
                                </div>

                                <div>
                                    <button onClick={registerUser} className={isInValidPIN ? "bgcolor-1 rounded-lg text-white cursor-pointer px-20 py-3 font-bold border-0 opacity-50":"bgcolor-1 rounded-lg text-white cursor-pointer px-20 py-3 font-bold border-0"} type='button' disabled={isInValidPIN}>
                                        <span className={ showSpinner ? "hidden" : ""}>Proceed</span>
                                        <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                    </button>
                                </div>
                            </div>
                       </form>
                    </div>

                    <div className={showSuccess ? "success-container" : "success-container hidden"}>
                        <div className="ml-8 mr-auto w-80 h-64 relative">
                            <img src={SuccessIcon} alt="success icon" className="w-96"/>
                            <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                        </div>

                        <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>
                        <div className="text-color-4 text-16 text-center mb-14">Your registration was successful</div>
                        <div className="mb-30 text-center">
                            <Link to="/"> <button className="bgcolor-1 w-96 rounded-lg border-0 cursor-pointer text-white p-5 font-bold">Proceed to Login</button></Link>
                        </div>
                    </div>
                </div>

                <div className="invest-text pl-11">
                    <div className="text-37">
                        <strong>Investing is for everyone</strong>
                    </div>
                    <div>
                        <ul>
                            <li>Build wealth plans</li>
                            <li>Transparent historical returns</li>
                            <li>Portfolio dashboard view</li>
                        </ul>
                    </div>
                </div>

                <input type="file" id="selfie" className='opacity-0' onChange={changeImgAvatar}/>

                <div className={openBVNModal ? "bvninfo-modal":"bvninfo-modal hidden"}>
                    <div className='text-center mb-10'><img src={GreenLearnIcon} alt="" /></div>
                    <div className='text-center text-28 font-gotham-black-regular mb-10'>Why we need your BVN</div>
                    <div className='text-center mb-30 text-14 leading-5'>
                    We do not store nor have access to your bank information via your BVN,
we only need your BVN as part of the SEC regulatory requirements.
                    </div>
                    <div><button onClick={closeModal} type='button' className='cursor-pointer w-full rounded-lg border-0 bgcolor-1 text-white text-24 p-3 font-bold'>Close</button></div>
                </div>

                <div className={openModalBackdrop ? "modal-backdrop opacity-40":"modal-backdrop opacity-40 hidden"}>
                </div>
            </div>
        </div>
    );
};

export default Register;