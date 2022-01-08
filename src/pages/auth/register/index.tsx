import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenericHeader from '../../../components/Headers/GenericHeader';
import './index.scss';
import BulbIcon from '../../../assets/images/bulb.svg';
import PictureIcon from '../../../assets/images/picture-icon.svg';
import SuccessIcon from '../../../assets/images/success.gif';
import ComputerIcon from '../../../assets/images/computer.svg';
//import Selfie from '../../../assets/images/funke.jpeg';
import Selfie from '../../../assets/images/gbemi.jpeg';
//import Selfie from '../../../assets/images/kenny.jpeg';
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
    const [fieldsAreNullOrEmpty, setFieldsAreNullOrEmpty] = useState<boolean>(false);
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
    const [isPINMatch, setIsPINMatch] = useState<boolean>(true);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);
    const [showOTPValidated, setShowOTPValidated] = useState<boolean>(true);
    const [showPasswordValidated, setShowPasswordValidated] = useState<boolean>(true);
    const [bvnAndDobCypher, setBvnAndDobCypher] = useState('');
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
                if(bvn.length == num && digits.test(bvn)){
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
            if(otpbox1 == '' || otpbox2 == '' || otpbox3 == '' || otpbox4 == '' || otpbox5 == '' || otpbox6 == ''){
                setIsInvalidOTP(true);
            }
            else{
                setIsInvalidOTP(false);
            }
        }

        async function checkIfOBIsNullOrEmpty(){
            if(ob1 == '' || ob2 == '' || ob3 == '' || ob4 == ''){
                setIsInvalidPIN(true);
            }
            else if(cob1 == '' || cob2 == '' || cob3 == '' || cob4 == ''){
                setIsInvalidPIN(true);
            }
            else{
                let _ob = ob1 +''+ ob2 +''+ ob3 +''+ ob4;
                let _cob = cob1 +''+ cob2 +''+ cob3 +''+ cob4;

                if(_ob == _cob){
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
            if(password != confirmPassword){
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

        // axios.post('https://cors-anywhere.herokuapp.com/http://34.252.87.56:7934/test/encrypt', requestData)
        // .then(function (response) {
        //     localStorage.setItem('bvnAndDobCypher', response.data.text);
        //     setShowSpinner(false);
        // })
        // .catch(function (error) {
        //     setShowSpinner(false);
        //     console.log(error);
        // });
        
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
            "base64Image": "data:image/jpeg;base64,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B8IgYwtNdpBR95hR99U84wAAQAQgAAAAAAAAA888888V19B5IMUIM8gMc8t999N99BBMM8gAAgAAAAAAAAAAAAAA88884AVBBDhdAR9s8AQ888xxF999BR888cAwIAAAAAAAAEIAAAA88A08E99djVdFFgIoBBwwhBRV99tJB888oAEIAAE8A8IAA0MIAE84AA0o53Pf5p15A5YQscN9NBBR99JU4c8oE8AAMM4E8888888804g8oQ8t7wlfBhlNsIR0pUxx9JBB9tAE88888EMMcs8888888888gE88IF74u44RF84JR9tdNJBB1VJRxhAgAM88888888888woAQAwA84kZ0OWqiYTRtA9NBxU9F9tZ19ABdIcA8888w0888888wAAABAE4tT74Z7H2oR5ZwJ1pBBF951NBBxp8w4gwwAAAE8w884wAAEMc95oEzrUNR6OQhl3dxhR/NDhFJVJBBIsMAAAgMAAAAAQwAAAE848obbbHnIdoq6sF1P5INNz3/PFpJ1NV9wRkcosYAAMsMMNIAIdxxAAx7jHvE+yCgpplX5o19vb3zvhV99plBwM08EMc8wxgww0osspIMJN+PRtOehYVD5nZ19gA8BBDdhhd99hBdBdchcAgABd889BggCcBd9iDdhjfDj+jDj9B/8QAAv/aAAwDAQACAAMAAAAQDDx/MwQhhHORyyyiM+izX++C6oK20pTUZLAvfCCRtNgcNZ4dbxxa8EJ9c6AZAH+++6yiClMafvs5LfvciqyXEo2PRxZ95xsF5IRVpND+QgogOBBf8wEIGGcsNU4snn8kcJ/DnPHXbHn5ghVx19tdxsDT110sxgQiM404IOeV/wDTZtLmCMveU++vp8pK2t4b/fbTeaIcedVcTZXNNDETKJHLOPvlBrkluAVJmwlOvEZiwkgK1qeDlfYNHYREB6/RTYxvADeELAMIEDHOoy4uY77AUEBI/s5rQUw5Ui+BnDScURXZbcKKD/IOHANJNbDzPEtNtHQxl5NJFUOByRYRStbbmmk8cQOE7ffQRMLuEPEHBPHoOHPKPgyyv+IG3k0aMZxXhHbRsJwi+ZRRbGSHeQZCFN1f1TbeYDHPMIEJqJ5A4PUXS/RHjIiaR+nz2y84CwVIDyxKeQPQ3YZTuCbHIIBBDaootgcpRCCTsoA6HgdEzJ5Ez0YlsQXKGGDsCLFY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"
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
            "permanentAddress": "No 9 Lagos house Marina, Lagos"
        }

        setShowSpinner(true);

        let createUserCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('createUserCypher', createUserCypher);

        // axios.post('https://cors-anywhere.herokuapp.com/http://34.252.87.56:7934/test/encrypt', requestData)
        // .then(function (response) {
        //     localStorage.setItem('createUserCypher', response.data.text);
        //     setShowSpinner(false);
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     setShowSpinner(false);
        // });
        
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
        if(email == '' || password == '' || confirmPassword == '' || password != confirmPassword){
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
        const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/g;

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
        if(bvn == '' || phone == '' || dob == ''){
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
    }

    function checkIfEmailIsNullOrEmpty(e :any){
        setEmail(e.target.value);
        checkIfFieldsAreNull()

        validateEmail();
    }

    function checkIfPhoneIsNullOrEmpty(e :any){

        setPhone(e.target.value);
        
        checkIfFieldsAreNull();

        if(phone.length < 11){
            setIsInvalidPhone(true);
        }
        else{
            setIsInvalidPhone(false);
        }
    } 

    function checkIfDOBIsNullOrEmpty(e :any){

        setDOB(e.target.value);
        checkIfFieldsAreNull();
    }

    function checkIfFieldsAreNull(){
        if(bvn === ''){
            setFieldsAreNullOrEmpty(true);
        }
        else if(phone === ''){
            setFieldsAreNullOrEmpty(true);
        }
        else if(dob === ''){
            setFieldsAreNullOrEmpty(true);
        }
        else{
            setFieldsAreNullOrEmpty(false);
        }
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
                                    <a href="#" className="no-underline text-black">Cancel</a>
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
                                    <a href="#" className="no-underline"><strong>Terms & Conditions</strong></a> and 
                                    <a href="#" className="no-underline"><strong> Privacy Policy</strong></a>
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
                                <a href="#" className="no-underline text-black">Cancel</a>
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
                                    <a href="#" className="no-underline text-black">Cancel</a>
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
                                    <a href="#" className="no-underline text-black">Cancel</a>
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
                                    <a href="#" className="no-underline text-black">Cancel</a>
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
                                    <a href="#" className="no-underline text-black">Cancel</a>
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