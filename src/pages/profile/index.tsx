import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import BrowseFile from '../../assets/images/browse-file.svg';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import * as HelperFunctions from "../../lib/helper";
import axios from 'axios';
import { encryptData } from '../../lib/encryptionHelper';
import {generalEncKey} from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import FileIcon from "../../assets/images/file-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import CloseIcon from '../../assets/images/close.svg';
import BellIcon from '../../assets/images/bell.svg';
import moment from 'moment';
import DeleteCardIcon from '../../assets/images/delete-card.svg';
import { authOnboardingServiceBaseUrl, utilityServiceBaseUrlUrl, walletAndAccountServiceBaseUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';

const Profile = () => {   
    
    document.title = "Profile - Anchoria";
    let customer = HelperFunctions.getCustomerInfo();
    HelperFunctions.removeOverflowAndPaddingFromModalBody();

    const [showPageLoader, setShowPageLoader] = useState<boolean>(false);

    const [isShowOldPassword, setIsShowOldPassword] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
    const [passwordOrConfirmPasswordIsNullOrEmpty, setPasswordOrConfirmPasswordIsNullOrEmpty] = useState<boolean>(true);
    const [isPasswordChangeSuccessful, setIsPasswordChangeSuccessful] = useState('');

    const [isShowPin, setIsShowPin] = useState<boolean>(false);
    const [isShowConfirmPin, setIsShowConfirmPin] = useState<boolean>(false);
    const [isShowOldPin, setIsShowOldPin] = useState<boolean>(false);

    const [oldPin, setOldPin] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isPinMatch, setIsPinMatch] = useState<boolean>(true);
    const [pinOrConfirmPinIsNullOrEmpty, setPinOrConfirmPinIsNullOrEmpty] = useState<boolean>(true);

    const [isPinChangeSuccessful, setIsPinChangeSuccessful] = useState<boolean>(false);
    const [isPinChangeError, setIsPinChangeError] = useState<boolean>(false);
    
    const [isEmployeeDetailsSuccessful, setIsEmployeeDetailsSuccessful] = useState<boolean>(false);
    const [isNokSuccessful, setIsNokSuccessful] = useState<boolean>(false);
    const [isPersonalDetailsSuccessful, setIsPersonalDetailsSuccessful] = useState<boolean>(false);
    const [isBankDetailsSuccessful, setIsBankDetailsSuccessful] = useState<boolean>(false);

    const [hasMinAndMaxCharacter, setHasMinAndMaxCharacter] = useState<boolean>(false);
    const [hasLowerCaseCharacter, setHasLowerCaseCharacter] = useState<boolean>(false);
    const [hasUpperCaseCharacter, setHasUppererCaseCharacter] = useState<boolean>(false);
    const [hasNumericCharacter, setHasNumericCharacter] = useState<boolean>(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false);
    
    const [apiResponseMessage, setApiResponseMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [switchToKYC, setSwitchToKYC] = useState<boolean>(true);
    const [switchToSecurity, setSwitchToSecurity] = useState<boolean>(false);
    const [switchToNotification, setSwitchToNotification] = useState<boolean>(false);

    const [address, setAddress] = useState(customer.permanentAddress);
    const [country, setCountry] = useState(customer.nationality);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const [employer, setEmployer] = useState('');
    const [profession, setProfession] = useState('');
    const [salary, setSalary] = useState('');
    const [political, setPolitical] = useState('');

    const [nokFirstname, setNokFirstname] = useState('');
    const [nokLastname, setNokLastname] = useState('');
    const [nokPhone, setNokPhone] = useState('');
    const [nokPhoneCode, setNokPhoneCode] = useState('');
    const [nokEmail, setNokEmail] = useState('');
    const [nokAddress, setNokAddress] = useState('');
    const [nokRelationship, setNokRelationship] = useState('');
    const [nokRelationshipOtherValue, setNokRelationshipOtherValue] = useState('');

    const [idFile, setIdFile] = useState('');
    const [idBase64Img, setIdBase64Img] = useState('');
    const [idType, setIdType] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const [utilityBillFile, setUtilityBillFile] = useState('');
    const [utilityBillBase64Img, setUtilityBillBase64Img] = useState('');

    const [signatureFile, setSignatureFile] = useState('');
    const [signatureBase64Img, setSignatureBase64Img] = useState('');

    const [showPersonalSpinner, setShowPersonalSpinner] = useState<boolean>(false);
    const [showEmploymentSpinner, setShowEmploymentSpinner] = useState<boolean>(false);
    const [showNokSpinner, setShowNokSpinner] = useState<boolean>(false);
    const [showPasswordSpinner, setShowPasswordSpinner] = useState<boolean>(false);
    const [showPinSpinner, setShowPinSpinner] = useState<boolean>(false);

    const [showModalBG, setShowModalBG] = useState<boolean>(false);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [notificationLogs, setNotificationLogs] = useState('');

    const [showNotificationDetailModal, setShowNotificationDetailModal] = useState<boolean>(false);

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');

    const [isDeleteSuccess, setIsDeleteSuccess] = useState('');

    const [selectedBankId, setSelectedBankId] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [isPersonalDetailsFilled, setIsPersonalDetailsFilled] = useState<boolean>(false);
    const [isEmploymentDetailsFilled, setIsEmploymentDetailsFilled] = useState<boolean>(false);
    const [isNOKDetailsFilled, setIsNOKDetailsFilled] = useState<boolean>(false);

    const [employmentDetails, setEmploymentDetails] = useState('');
    const [nokDetails, setNOKDetails] = useState('');

    const [bankDetails, setBankDetails] = useState<any[]>([]);
    const [primaryBankDetails, setPrimaryBankDetails] = useState<any[]>([]);

    //const [showSelectPrimaryBankDetails, setShowSelectPrimaryBankDetails] = useState<boolean>(false);

    const [showEnterPasswordCard, setShowEnterPasswordCard] = useState<boolean>(false);
    const [showGeneratePasswordOTPCard, setShowGeneratePasswordOTPCard] = useState<boolean>(true);
    const [showGeneratePinOTPCard, setShowGeneratePinOTPCard] = useState<boolean>(true);

    const [showEnterPinCard, setShowEnterPinCard] = useState<boolean>(false);
    const [countries, setCountries] = useState<any[]>([]);


    useEffect(() => {
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

        function checkIfPasswordIsNullOrEmpty(){
            validatePassword();
            checkIfPasswordOrConfirmPasswordIsNullOrEmpty();
            setShowPageLoader(false);
            setState('Lagos')
        } 

        function checkIfConfirmPasswordIsNullOrEmpty(){    
            if(password !== confirmPassword){
                setIsPasswordMatch(false);
            }
            else{
                setIsPasswordMatch(true);
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

        checkIfPasswordOrConfirmPasswordIsNullOrEmpty();
        checkIfPasswordIsNullOrEmpty();
        checkIfConfirmPasswordIsNullOrEmpty();

    },[password, confirmPassword, hasMinAndMaxCharacter, hasLowerCaseCharacter, hasUpperCaseCharacter, hasNumericCharacter, hasSpecialCharacter]);

    useEffect(() => {
    
        function checkIfPinOrConfirmPinIsNullOrEmpty(){
            if(pin === '' || confirmPin === '' || pin !== confirmPin){
                setPinOrConfirmPinIsNullOrEmpty(true);
            }
            else{
                setIsPinMatch(true);
                setPinOrConfirmPinIsNullOrEmpty(false);
            }
        }
        

        function checkIfPinIsNullOrEmpty(){
            checkIfPinOrConfirmPinIsNullOrEmpty();
        } 

        function checkIfConfirmPinIsNullOrEmpty(){     
            if(pin !== confirmPin){
                setIsPinMatch(false);
            }
            else{
                setIsPinMatch(true);
            }
        } 

        checkIfPinOrConfirmPinIsNullOrEmpty();
        checkIfPinIsNullOrEmpty();
        checkIfConfirmPinIsNullOrEmpty();


    },[pin, confirmPin]);


    useEffect(() => {
        function checkUrlParamsForActiveProfileSection(){
            let queryParams = new URLSearchParams(window.location.search);

            if(queryParams.has("type")){
                if(queryParams.get("type") === 'kyc'){
                    setSwitchToKYC(true);
                    setSwitchToSecurity(false);
                    setSwitchToNotification(false);
                }
                else if(queryParams.get("type") === 'security'){
                    setSwitchToKYC(false);
                    setSwitchToSecurity(true);
                    setSwitchToNotification(false);
                }
                else if(queryParams.get("type") === 'notification'){
                    setSwitchToKYC(false);
                    setSwitchToSecurity(false);
                    setSwitchToNotification(true);
                }
            }
        }

        function getNotificationLogs(){
            let customer = HelperFunctions.getCustomerInfo(); 

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}
    
            axios.get(authOnboardingServiceBaseUrl+'/customer/notification/logs?customerId='+customer.id, 
            { headers })
            .then(function (response) {
                let logs = response.data.data.sort(compareNotificationLogsDate).map((item :any, index :any) =>
                <div className={item.readFlag ? 'p-5 md:space-x-20  md:justify-between md:items-center md:flex border-bottom-1d cursor-pointer':'p-5 cursor-pointer md:space-x-20  md:justify-between md:flex border-bottom-1d bg-gray-100 md:items-center'} key={index} data-id={item.id}>
                    <div className='rounded-full bg-B9F1B4 px-3 shadow-sm py-3 md:mb-0 mb-3 md:w-fit w-12' data-id={item.id}>
                        <img src={BellIcon}  alt="" data-id={item.id}/>
                    </div>

                    <div className='relative flex-1 text-sm md:mb-0 mb-3' data-id={item.id}>
                        <div className={item.readFlag ? '':'font-bold'} data-id={item.id}>{item.content}</div>
                    </div>

                    <div className='relative flex-1 md:mb-0 mb-3' data-id={item.id}>
                        <div data-id={item.id}>
                            <button className='rounded-lg border-0 py-2 px-3 text-sm' style={{backgroundColor: '#B9F1B4'}} data-id={item.id}>
                            {item.subject}</button> 
                        </div>
                    </div>
                    
                    <div className={item.readFlag ? '':'font-bold text-sm'} data-id={item.id}>{moment(item.createdOn).format("MMM Do, YYYY hh:mm A")}</div>

                    <div data-id={item.id}>
                        <button onClick={displayNotificationDetailModal} type="button" className='cursor-pointer px-5 py-3 text-green-700 font-bold rounded-lg hover:bg-gray-300 border-0 hidden' data-id={item.id}>View</button>
                    </div>
                </div>
                );

                setNotificationLogs(logs);
            })
            .catch(function (error) {});
        }

        checkUrlParamsForActiveProfileSection();
        getNotificationLogs();
    },[]);

    useEffect(()=>{

        function getEmploymentDetails() {

            getAxios(axios).get(authOnboardingServiceBaseUrl + '/customer/kyc/employment-details')
            .then(function (response) { 
                setEmploymentDetails(response.data.hasOwnProperty("data") ? JSON.stringify(response.data.data) : '');

                setEmployer(employmentDetails === '' ? '': response.data.data.employer );                 
                setSalary(employmentDetails === '' ? '': response.data.data.salary );                 
                setProfession(employmentDetails === '' ? '': response.data.data.profession );                 
            })
            .catch(function (error) {});
        }
        

        getEmploymentDetails();

    },[employmentDetails]);

    useEffect(()=>{

        function getNOKDetails() {

            getAxios(axios).get(authOnboardingServiceBaseUrl + '/customer/kyc/nok-details')
                .then(function (response) { 
                    if(response.data.hasOwnProperty('data')){
                        setNOKDetails(JSON.stringify(response.data.data));
                        setNokFirstname(nokDetails === '' ? '': response.data.data.firstName);                 
                        setNokLastname(nokDetails === '' ? '': response.data.data.lastName); 
                        setNokEmail(nokDetails === '' ? '': response.data.data.email);                
                        setNokPhone(nokDetails === '' ? '': response.data.data.phoneNumber );                
                        setNokRelationship(nokDetails === '' ? '': response.data.data.relationship );                
                        setNokAddress(nokDetails === '' ? '': response.data.data.address ); 
                    }
                                   
                })
                .catch(function (error) {});
        }        

        getNOKDetails();

    },[nokDetails])

    useEffect(() => {
        function checkIfPersonalDetailsFieldsAreFilled(){
            if(address === '' || city === '' || state === '' || country === '' || idBase64Img === '' || utilityBillBase64Img === '' || signatureBase64Img === '' || idType === '' || idNumber === ''){
                setIsPersonalDetailsFilled(false);
            }
            else{
                setIsPersonalDetailsFilled(true);
            }
        }

        checkIfPersonalDetailsFieldsAreFilled();
    },[address,city,state,country,idBase64Img,utilityBillBase64Img,signatureBase64Img,idType,idNumber]);

    useEffect(() => {
        function checkIfEmploymentDetailsFieldsAreFilled(){
            if(employer === '' || salary === '' || profession === '' || political === '' ){

                setIsEmploymentDetailsFilled(false);
            }
            else{
                setIsEmploymentDetailsFilled(true);
            }
        }

        checkIfEmploymentDetailsFieldsAreFilled();
    },[employer, salary, profession, political]);

    useEffect(() => {
        function checkIfNOKDetailsFieldsAreFilled(){
            if(nokFirstname === '' || nokLastname === '' || nokPhone === '' || nokEmail === '' || nokAddress === '' || nokRelationship === '' ){

                setIsNOKDetailsFilled(false);
            }
            else{
                setIsNOKDetailsFilled(true);
            }
        }

        checkIfNOKDetailsFieldsAreFilled();
    },[nokFirstname, nokLastname, nokPhone, nokRelationship, nokAddress, nokEmail]);

    useEffect(() => {
        function checkIfNOKRelationshipOtherFieldsIsFilled(){
            if((nokRelationship === 'OTHERS' && nokRelationshipOtherValue === '') || nokFirstname === '' || nokLastname === '' || nokEmail === '' || nokAddress === '' || nokPhone === '' ){

                setIsNOKDetailsFilled(false);
            }
            else{
                setIsNOKDetailsFilled(true);
            }

        }

        checkIfNOKRelationshipOtherFieldsIsFilled();
    },[nokRelationship, nokRelationshipOtherValue,nokFirstname, nokLastname, nokPhone, nokAddress, nokEmail]);

    useEffect(() => {
        function getBankDetails() {

            getAxios(axios).get(walletAndAccountServiceBaseUrl + '/bank-details')
                .then(function (response) {
                    setBankDetails(response.data.data)

                    if(response.data.data.length > 0){
                        let _primaryBankDetails = response.data.data.filter((elem: { primaryBank: boolean; }) => elem.primaryBank === true);

                        setPrimaryBankDetails(_primaryBankDetails);
                    }
                })
                .catch(function (error) { });
        }

        function getCountries() {

            getAxios(axios).get(utilityServiceBaseUrlUrl + '/lov/country')
                .then(function (response) { 
                    setCountries(response.data.data)
                })
                .catch(function (error) { });
        }



        getBankDetails();
        getCountries();
    },[]);

    function compareNotificationLogsDate(a :any, b :any) {
        const dateA = a.createdOn.toUpperCase();
        const dateB = b.createdOn.toUpperCase();
        
        let comparison = 0;

        if (dateA < dateB) {
            comparison = 1;
        } else if (dateA > dateB) {
            comparison = -1;
        }

        return comparison;
    }

    function changePassword(){
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "oldPassword": oldPassword,
            "password": password,
            "token": otp,
            "email": customer.email
        }

        console.log(requestData);

        setShowPasswordSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(authOnboardingServiceBaseUrl+'/customer/change-password', 
        {
            "text" : localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setShowPasswordSpinner(false);
            
            if(response.data.statusCode !== 200){
                setIsPasswordChangeSuccessful('false');
            }
            else{
                setIsPasswordChangeSuccessful('true');
            }

            setApiResponseMessage("Password changed successfully. ");

            setTimeout(()=>{
                window.location.reload();
            },3000);
        })
        .catch(function (error) {
            setApiResponseMessage(error.response.data.message)
            setShowPasswordSpinner(false);
            setIsPasswordChangeSuccessful('false');
        });
    }

    function changePin(){
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "newPin": pin,
            "oldPin":oldPin,
            "email":customer.email,
            "token":otp
        }

        setShowPinSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(authOnboardingServiceBaseUrl+'/customer/change-pin', 
        {
            "text" : localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setShowPinSpinner(false);
            setIsPinChangeSuccessful(true);
            setIsPinChangeError(false);
            setApiResponseMessage('Pin changed successfully');

            setTimeout(()=>{
                window.location.reload();
            },3000);
        })
        .catch(function (error) {
            console.log(error);
            setShowPinSpinner(false);
            setIsPinChangeError(true);
            setIsPinChangeSuccessful(false);
            setApiResponseMessage(error.response.data.message);
        });
    }

    function performSwitchToKYC(){
        setSwitchToKYC(true);
        setSwitchToSecurity(false);
        setSwitchToNotification(false);
    }

    function performSwitchToSecurity(){
        setSwitchToKYC(false);
        setSwitchToSecurity(true);
        setSwitchToNotification(false);
    }

    function performSwitchToNotification(){
        setSwitchToKYC(false);
        setSwitchToSecurity(false);
        setSwitchToNotification(true);
    }

    function sendPersonalDetails(){

        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "contactAddress": address,
            "country": country,
            "signature": signatureBase64Img,
            "signatureName": signatureFile,
            "state":state,
            "street":city,
            "utilityBill": utilityBillBase64Img,
            "utilityBillName": utilityBillFile,
            "utilityBillType": utilityBillFile,
            "idFile":idFile,
            "idName":idBase64Img,
            "idDetails": {
                "idNumber": idNumber,
                "idType": idType,
                "idCountry": country,
                "dob":customer.dob
            }
        }

        console.log(requestData);

        setShowPersonalSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(authOnboardingServiceBaseUrl+'/customer/kyc/personal-details', 
        {
            "text" : localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setIsPersonalDetailsSuccessful(true);
            setApiResponseMessage("Personal details saved successfully.");
            setShowPersonalSpinner(false);
        })
        .catch(function (error) {
            setErrorMsg(error.response.data.message);
            setShowPersonalSpinner(false);
            console.log(errorMsg)
        });
    }

    function sendEmployeeDetails(){
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "employer": employer,
            "profession": profession,
            "salary": salary,
            "customerId": customer.id,
            "isPoliticallyExposed": political === 'Yes' ? true : false,
            "politicalAffiliation": political
        }

        console.log(requestData);

        setShowEmploymentSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(authOnboardingServiceBaseUrl+'/customer/kyc/employment-details', 
        {
            "text" : localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setShowEmploymentSpinner(false);
            setApiResponseMessage("Employment details updated successfully.");
            setIsEmployeeDetailsSuccessful(true);
        })
        .catch(function (error) {
            console.log(error);
            setShowEmploymentSpinner(false);

        });
    }

    function sendNextOfKin(){
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "address": nokAddress,
            "customerId": customer.id,
            "email": nokEmail,
            "firstName": nokFirstname,
            "lastName": nokLastname,
            "phoneNumber": nokPhoneCode.concat(nokPhone),
            "relationship": nokRelationship === 'OTHERS' ? nokRelationshipOtherValue : nokRelationship
        }

        setShowNokSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(authOnboardingServiceBaseUrl+'/customer/kyc/nok-details', 
        {
            "text" : localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setShowNokSpinner(false);
            setApiResponseMessage('Next of Kin details updated successfully.');
            setIsNokSuccessful(true);
        })
        .catch(function (error) {
            console.log(error);
            setShowNokSpinner(false);
        });
    }

    function triggerIdUpload(){
        document.getElementById("id_file")?.click();
    }

    function triggerUtilityBillUpload(){
        document.getElementById("utilitybill_file")?.click();
    }

    function triggerSignatureUpload(){
        document.getElementById("signature_file")?.click();
    }

    function changeId(event :any){
        setIdFile(event.target.files[0].name);

        let fileExtArr = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp"];

        let base64String = '';

        let file = event.target.files[0];

        let fileExt = file.name.split(".")[1];

        if(fileExtArr.includes(fileExt.toLowerCase())){
            let reader = new FileReader();
          
            reader.onload = function () {
                let result = reader.result as string;

                base64String = result.replace("data:", "").replace(/^.+,/, "");

                setIdBase64Img(base64String);
            }

            reader.readAsDataURL(file);
        }
        else{
            setErrorMsg("Uploaded file is not a valid image. Only JPEG, JPG, PNG and GIF files are allowed.");
        }
    }

    function changeUtlityBill(event :any){
        setUtilityBillFile(event.target.files[0].name);

        let fileExtArr = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp"];

        let base64String = '';

        let file = event.target.files[0];

        let fileExt = file.name.split(".")[1];

        if(fileExtArr.includes(fileExt.toLowerCase())){
            let reader = new FileReader();
          
            reader.onload = function () {
                let result = reader.result as string;

                base64String = result.replace("data:", "").replace(/^.+,/, "");

                setUtilityBillBase64Img(base64String);
            }

            reader.readAsDataURL(file);
        }
        else{
            setErrorMsg("Uploaded file is not a valid image. Only JPEG, JPG, PNG and GIF files are allowed.");
        }
        
    }

    function changeSignature(event :any){
        setSignatureFile(event.target.files[0].name);

        let fileExtArr = ["jpg", "jpeg", "png", "jfif", "pjpeg", "pjp", "gif", "webp"];

        let base64String = '';

        let file = event.target.files[0];

        let fileExt = file.name.split(".")[1];

        if(fileExtArr.includes(fileExt.toLowerCase())){
            let reader = new FileReader();
          
            reader.onload = function () {
                let result = reader.result as string;

                base64String = result.replace("data:", "").replace(/^.+,/, "");

                setSignatureBase64Img(base64String);
            }

            reader.readAsDataURL(file);
        }
        else{
            setErrorMsg("Uploaded file is not a valid image. Only JPEG, JPG, PNG and GIF files are allowed.");
        }
    }

    function deleteIdFile(){
        setIdFile('');
        setIdBase64Img('');
    }

    function deleteUtilityBillFile(){
        setUtilityBillFile('');
        setUtilityBillBase64Img('');
    }

    function deleteSignatureFile(){
        setSignatureFile('');
        setSignatureBase64Img('');
    }

    function displayNotificationDetailModal(event :any){
        setShowNotificationDetailModal(true);
        setShowModalBG(true);

        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "notificationIds": [event.target.getAttribute("data-id")],
            "customerId": customer.id
        }

        console.log(requestData);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

        axios.get(authOnboardingServiceBaseUrl+'/customer/notification/logs/'+customer.id, 
        {headers})
        .then(function (response) {
            setApiResponseMessage(response.data.message);
        })
        .catch(function (error) {});
    }

    function selectBankDetails(event :any){
        setSelectedBankId(event.target.value);
    }

    function deleteBankDetails(){
        
        let requestData = {
            "bankDetailsId": selectedBankId
        }

        console.log(selectedBankId);

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let _headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.delete(process.env.REACT_APP_WALLET_SERVICE_URL+'/bank-details/delete',
        {
           data:{
                "text": localStorage.getItem('genericCypher'),
           },
           headers: _headers
        }, 
        )
        .then(function (response) {  
            setIsDeleteSuccess('true');
            setApiResponseSuccessMsg(response.data.description);
            setShowSpinner(false);

            window.location.reload();
        })
        .catch(function (error) {
            setShowSpinner(false);
            alert("Unable to delete. Please try again later");
        });
    }

    function closeModal(){
        setIsPasswordChangeSuccessful('false');
        setIsPinChangeSuccessful(false);
        setIsEmployeeDetailsSuccessful(false);
        setIsPersonalDetailsSuccessful(false);
        setIsNokSuccessful(false);
        setShowModalBG(false);
        setShowDeleteModal(false);
        setShowNotificationDetailModal(false);
    }

    // function changePrimaryBankDetails(){
    //     setShowSelectPrimaryBankDetails(true);
    // }

    function updateBankDetails(){
        setShowSpinner(true);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(walletAndAccountServiceBaseUrl+'/bank-details/primary-bank/'+selectedBankId, 
        {headers})
        .then(function (response) {
            setIsBankDetailsSuccessful(true);
            setApiResponseMessage("Bank details updated successfully.");
            setShowSpinner(false);

            setTimeout(()=>{
                window.location.reload();
            },1500)
        })
        .catch(function (error) {
            setErrorMsg(error.response.data.message);
            setIsBankDetailsSuccessful(false);
            setShowSpinner(false);
        });
    }

    function sendChangePasswordOTP(){

        let customer = HelperFunctions.getCustomerInfo();

        setShowPasswordSpinner(true);
        
        let requestData = {
            //"phoneNumber": customer.phoneNumber,
            "email": customer.email
        }  

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

    
        //getAxios(axios).get(authOnboardingServiceBaseUrl+'/customer/forgot-password/initiate?email='+customer.email)
        getAxios(axios).post(utilityServiceBaseUrlUrl + '/otp/generate', 
        {
            "text": localStorage.getItem('genericCypher')
        },{ headers })
        .then(function (response) {           

            setShowPasswordSpinner(false);

            setShowEnterPasswordCard(true);
            setShowEnterPinCard(false);
            setShowGeneratePasswordOTPCard(false);
        })
        .catch(function (error) {
            setShowPasswordSpinner(false); 

            setShowEnterPasswordCard(false);
            setShowGeneratePasswordOTPCard(true);
        });        
    }    

    function sendChangePinOTP(){

        let customer = HelperFunctions.getCustomerInfo();

        setShowPinSpinner(true);
        
        let requestData = {
            //"phoneNumber": customer.phoneNumber,
            "email": customer.email
        }  

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));

        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

    
        //getAxios(axios).get(authOnboardingServiceBaseUrl+'/customer/forgot-password/initiate?email='+customer.email)
        getAxios(axios).post(utilityServiceBaseUrlUrl + '/otp/generate', 
        {
            "text": localStorage.getItem('genericCypher')
        },{ headers })
        .then(function (response) {           

            setShowPinSpinner(false);

            setShowEnterPinCard(true);
            setShowEnterPasswordCard(false);
            setShowGeneratePinOTPCard(false);
        })
        .catch(function (error) {
            setShowPinSpinner(false); 

            setShowEnterPinCard(false);
            setShowGeneratePinOTPCard(true);
        });          
    }


    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className="text-xl mb-10">
                                <span className="text-lg sm:text-4xl md:text-2xl leading-snug font-semibold tracking-tight text-green-900 py-4">Profile</span>
                            </div>

                            <div className="text-sm font-bold text-green-900 mb-30">Manage your information</div>

                            {/*Switch */}
                            <div>
                                <div className='mb-30 md:flex md:justify-between md:items-center'>
                                    <div className="border border-gray-500 md:flex rounded-lg p-1 md:w-1/2 w-full md:mb-0 mb-6">
                                        <div className='w-full'>
                                            <button onClick={performSwitchToKYC} type='button' className={switchToKYC ? "rounded-lg bg-green-900 text-white border-0 px-5 py-3 font-bold cursor-pointer lg:text-xs w-full":"cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bg-transparent lg:text-xs w-full"}>KYC Details</button>
                                        </div>

                                        <div className='w-full'>
                                            <button onClick={performSwitchToSecurity} type='button' className={switchToSecurity ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer lg:text-xs w-full":"cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bg-transparent lg:text-xs w-full"}>Security</button>
                                        </div>

                                        <div className='w-full'>
                                            <button onClick={performSwitchToNotification}  type='button' className={switchToNotification ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 font-bold cursor-pointer w-full":"cursor-pointer rounded-lg py-3 px-5 font-bold border-0 bg-transparent lg:text-xs w-full"}>Notification</button>
                                        </div>
                                    </div>

                                    <div className='md:text-right'>
                                        <div>
                                            <button type='button' className={switchToKYC ? "rounded-lg bg-green-900 text-white border-0 py-3 px-5 cursor-pointer lg:text-xs w-full":"hidden"}>KYC Category: {customer.kycStatus}</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            {/*End */}

                            {/*KYC section */}
                            <div className={switchToKYC ? '':'hidden'}>

                                {/*Personal details card */}
                                <div className='mb-11'>
                                    <div className='card p-10'>

                                        {/* Personal Deatils Success */}
                                        <div className={isPersonalDetailsSuccessful ? "otp-alert mb-20":"hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-sm text-green-900">{apiResponseMessage}</div>
                                                </div>
                                                
                                                <div className="cursor-pointer" onClick={closeModal}>
                                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='font-gotham-black-regular text-green-900 text-xl mb-30'>Personal Details</div>

                                        <div className='mb-11'>
                                            <div className='md:flex md:justify-between'>
                                                <div className='md:mb-0 mb-11'>
                                                    <div className='font-bold  text-gray-700 mb-3 text-sm'>Firstname</div>
                                                    <div>{customer.firstName}</div>
                                                </div>

                                                <div className='md:mb-0 mb-11'>
                                                    <div className='font-bold text-gray-700 mb-3 text-sm'>Surname</div>
                                                    <div>{customer.lastName}</div>
                                                </div>

                                                <div className='md:mb-0'>
                                                    <div className='font-bold text-gray-700 mb-3 text-sm'>Email address</div>
                                                    <div>{customer.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-11'>
                                            <div className='md:flex md:justify-between md:space-x-20'>
                                                <div className='md:w-1/2 w-full md:mb-0 mb-11'>
                                                    <div className='font-bold text-gray-700 mb-3 text-sm'>Address</div>
                                                    <div><input defaultValue={customer.permanentAddress} onChange={e => setAddress(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                                </div>

                                                <div className='md:w-1/2 w-full'>
                                                    <div className='font-bold text-gray-700 mb-3 text-sm'>City</div>
                                                    <div><input type='text' value={city} onChange={e => setCity(e.target.value)} className='border border-gray-300 px-3 py-2 text-lg outline-white rounded-lg w-full'/></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-11'>
                                            <div className='md:flex md:space-x-20'>
                                                <div className='md:w-1/2 w-full md:mb-0 mb-11'>
                                                    <div className='font-bold  text-gray-700 mb-3 text-sm'>State</div>
                                                    <div>
                                                        <select onChange={e => setState(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                            <option value="">Select a state</option>
                                                            <option value="Abuja">Abuja</option>
                                                            <option value="Abia">Abia</option>
                                                            <option value="Adamawa">Adamawa</option>
                                                            <option value="Akwa Ibom">Akwa Ibom</option>
                                                            <option value="Anambra">Anambra</option>
                                                            <option value="Bauchi">Bauchi</option>
                                                            <option value="Bayelsa">Bayelsa</option>
                                                            <option value="Benue">Benue</option>
                                                            <option value="Borno">Borno</option>
                                                            <option value="Cross River">Cross River</option>
                                                            <option value="Delta">Delta</option>
                                                            <option value="Ebonyi">Ebonyi</option>
                                                            <option value="Edo">Edo</option>
                                                            <option value="Ekiti">Ekiti</option>
                                                            <option value="Enugu">Enugu</option>
                                                            <option value="Gombe">Gombe</option>
                                                            <option value="Imo">Imo</option>
                                                            <option value="Jigawa">Jigawa</option>
                                                            <option value="Kaduna">Kaduna</option>
                                                            <option value="Kano">Kano</option>
                                                            <option value="Katsina">Katsina</option>
                                                            <option value="Kebbi">Kebbi</option>
                                                            <option value="Kogi">Kogi</option>
                                                            <option value="Kwara">Kwara</option>
                                                            <option value="Lagos">Lagos</option>
                                                            <option value="Niger">Niger</option>
                                                            <option value="Ogun">Ogun</option>
                                                            <option value="Ondo">Ondo</option>
                                                            <option value="Osun">Osun</option>
                                                            <option value="Oyo">Oyo</option>
                                                            <option value="Plateau">Plateau</option>
                                                            <option value="Rivers">Rivers</option>
                                                            <option value="Sokoto">Sokoto</option>
                                                            <option value="Taraba">Taraba</option>
                                                            <option value="Yobe">Yobe</option>
                                                            <option value="Zamfara">Zamfara</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='md:w-1/2 w-full'>
                                                    <div className='font-bold  text-gray-700 mb-3 text-sm'>Country</div>
                                                    <div>
                                                        <select onChange={e => setCountry(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                            <option value={customer.nationality}>{customer.nationality}</option>

                                                            <option value=''>...</option>
                                                            
                                                            {countries.map((item :any, index :any)=>
                                                                <option value={item.name} key={index}>{item.name}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='border mb-11 opacity-40'></div>

                                        <div className=' text-green-900 mb-6 text-xl font-gotham-black-regular'>Uploads</div>
                                        <div className='font-bold mb-3'>Valid identification</div>

                                        <div className='md:flex md:justify-between mb-11 text-sm'>
                                            <div className='flex  space-x-1 items-end w-full md:mb-0 mb-3'>                                                
                                                <Form.Check type="radio" name="idtype" value="Drivers License" className='portfoliolist-checkbox' checked={idType === 'Drivers License'} onChange={e => setIdType(e.target.value)} /> 
                                                <div className='text-gray-900'>Drivers License</div>
                                            </div>

                                            <div className='flex hidden space-x-1 items-end w-full md:mb-0 mb-3'>                                                
                                                <Form.Check type="radio" name="idtype" value="International Passport" className='portfoliolist-checkbox' checked={idType === "International Passport"} onChange={e => setIdType(e.target.value)}/> 
                                                <div className='text-gray-900'>Int'l Passport</div>
                                            </div>

                                            <div className='flex space-x-1 items-end w-full md:mb-0 mb-3'>                                                
                                                <Form.Check type="radio" name="idtype" value="NIN" className='portfoliolist-checkbox' checked={idType === "NIN"} onChange={e => setIdType(e.target.value)}/> 
                                                <div className='text-gray-900'>NIN</div>
                                            </div>

                                            <div className='flex items-end space-x-1 w-full md:mb-0 mb-3'>                                                
                                                <Form.Check type="radio"  name="idtype" value="Voters Card" className='portfoliolist-checkbox' checked={idType === "Voters Card"} onChange={e => setIdType(e.target.value)}/> 
                                                <div className='text-gray-900'>Voters Card</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='font-bold mb-3 text-sm'>Upload a selected ID type </div>

                                            <div className='md:flex md:justify-between md:items-end md:space-x-10 mb-11'>
                                                <div className='md:w-1/2 md:flex md:items-center md:mb-0 mb-11'>
                                                    <img className={idFile === '' ? 'cursor-pointer w-full':'hidden'} src={BrowseFile} alt="" onClick={triggerIdUpload}/>

                                                    <div className={idFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg w-full'}>
                                                        <div><img src={FileIcon} alt=""/></div>
                                                        <div className='font-bold flex-1'>{idFile}</div>
                                                        <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteIdFile} alt=""/></div>
                                                    </div>
                                                </div>

                                                <div className='md:w-1/2 pb-0.5'>
                                                    <div className='text-gray-900 mb-3 text-sm font-bold'>ID Number</div>
                                                    <input type='number' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full' value={idNumber} onChange={e => setIdNumber(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='md:flex md:justify-between md:space-x-5 md:items-end mb-6'>
                                            <div className='md:w-1/2 w-full md:mb-0 mb-11'>
                                                <div className='font-bold mb-3 text-sm'>Upload a Valid Utility Bill (3 months old)</div>

                                                <img className={utilityBillFile === '' ? 'cursor-pointer w-full':'hidden'} src={BrowseFile} alt="" onClick={triggerUtilityBillUpload} />

                                                <div className={utilityBillFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg w-full'}>
                                                    <div><img src={FileIcon} alt=""/></div>
                                                    <div className='font-bold flex-1'>{utilityBillFile}</div>
                                                    <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteUtilityBillFile} alt=""/></div>
                                                </div>
                                            </div>
                                            
                                            <div className='md:w-1/2 w-full md:mb-0'>
                                                <div className='font-bold mb-3 text-sm'>Upload Signature </div>
                                                <img className={signatureFile === '' ? 'cursor-pointer w-full':'hidden'} src={BrowseFile} alt="" onClick={triggerSignatureUpload} />

                                                <div className={signatureFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg w-full'}>
                                                    <div><img src={FileIcon} alt=""/></div>
                                                    <div className='font-bold flex-1'>{signatureFile}</div>
                                                    <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteSignatureFile} alt=""/></div>
                                                </div>
                                            </div>

                                            <div className='md:w-1/2 w-full pb-1'>

                                                <button onClick={sendPersonalDetails} type='button' className={isPersonalDetailsFilled ? "mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full":"mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer opacity-50  w-full"} disabled={!isPersonalDetailsFilled}>
                                                    <span className={ showPersonalSpinner ? "hidden" : ""}>Update</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={ showPersonalSpinner ? "" : "hidden"} width="15"/>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Personal Deatils Success */}
                                        <div className={isPersonalDetailsSuccessful ? "otp-alert mb-20":"hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-sm text-green-900">{apiResponseMessage}</div>
                                                </div>
                                                
                                                <div className="cursor-pointer" onClick={closeModal}>
                                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}
                                    </div>
                                    
                                </div>
                                {/*End */}

                                {/*Employment details card */}
                                <div className='mb-11'>
                                    <div className='card p-10'>
                                        {/* Employee Deatils Success */}
                                        <div className={isEmployeeDetailsSuccessful ? "otp-alert mb-20":"hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-sm text-green-900">{apiResponseMessage}</div>
                                                </div>
                                                
                                                <div className="cursor-pointer" onClick={closeModal}>
                                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='font-gotham-black-regular text-green-900 text-xl mb-30'>Employment Details</div>


                                        <div className='mb-11'>
                                            <div className='md:flex md:justify-between md:space-x-10'>
                                                <div className='md:w-1/2 w-full md:mb-0 mb-11'>
                                                    <div className='text-gray-700 font-bold mb-3 text-sm'>Name of employer</div>
                                                    <div><input defaultValue={employmentDetails === '' ? '' : JSON.parse(employmentDetails).employer} onChange={e => setEmployer(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                                </div>

                                                <div className='md:w-1/2 w-full'>
                                                    <div className='text-gray-700 font-bold  mb-3 text-sm'>Profession</div>
                                                    <div><input defaultValue={employmentDetails === '' ? '' : JSON.parse(employmentDetails).profession} onChange={e => setProfession(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg outline-white rounded-lg w-full'/></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='md:flex md:justify-between md:space-x-10'>
                                                <div className='md:w-1/3 w-full md:mb-0 mb-11'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Annual Salary Range</div>
                                                    <div>
                                                        <select onChange={e => setSalary(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                            <option value={employmentDetails === '' ? '...' : JSON.parse(employmentDetails).salary}>{employmentDetails === '' ? '' : JSON.parse(employmentDetails).salary}</option>

                                                            <option value=''>...</option>

                                                            

                                                            <option value='Less than 250,000'>Less than 250,000</option>
                                                            <option value='250,000 - 1m'>250,000 - 1m</option>
                                                            <option value='1m - 5m'>1m - 5m</option>
                                                            <option value='Above 5m'>Above 5m</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='md:w-1/3 w-full'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Are you a politically exposed person?</div>
                                                    <div>
                                                        <select onChange={e => setPolitical(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>

                                                            <option value={employmentDetails === '' ? '...' : JSON.parse(employmentDetails).politicalAffiliation}>{employmentDetails === '' ? '' : JSON.parse(employmentDetails).politicalAffiliation}</option>

                                                            <option value=''>...</option>

                                                            <option value={employmentDetails === '' ? '...' : JSON.parse(employmentDetails).politicalAffiliation}>{employmentDetails === '' ? '' : JSON.parse(employmentDetails).politicalAffiliation}</option>

                                                            <option value='Yes'>Yes</option>
                                                            <option value='No'>No</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='md:w-1/3 w-full'>
                                                    <button onClick={sendEmployeeDetails} type='button' className={isEmploymentDetailsFilled ? "mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full":"mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer opacity-50 w-full"} disabled={!isEmploymentDetailsFilled}>
                                                        <span className={ showEmploymentSpinner ? "hidden" : ""}>Update</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={ showEmploymentSpinner ? "" : "hidden"} width="15"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                {/*End */}

                                {/*Next of Kin card */}
                                <div className='mb-11'>
                                    <div className='card p-10'>
                                        {/* NOK Success */}
                                        <div className={isNokSuccessful ? "otp-alert mb-20":"hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                        </svg>
                                                    </div>

                                                    <div className="pt-1 text-sm text-green-900">{apiResponseMessage}</div>
                                                </div>
                                                
                                                <div className="cursor-pointer" onClick={closeModal}>
                                                    <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='font-gotham-black-regular text-green-900 text-xl mb-30'>Next of KIN Details</div>


                                        <div className='mb-11'>
                                            <div className='md:flex md:justify-between md:space-x-10'>
                                                <div className='md:w-1/2 w-full md:mb-0 mb-11'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Firstname</div>
                                                    <div><input value={nokFirstname} onChange={e => setNokFirstname(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                                </div>

                                                <div className='md:w-1/2 w-full'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Lastname</div>
                                                    <div><input value={nokLastname} onChange={e => setNokLastname(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                                </div>                                            
                                            </div>
                                        </div>

                                        <div className='mb-11'>
                                            <div className='md:flex md:justify-between md:space-x-10'>
                                                <div className='md:w-1/3 w-full md:mb-0 mb-11'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Email Address</div>
                                                    <div><input value={nokEmail} onChange={e => setNokEmail(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                                </div>

                                                <div className='md:w-1/3 w-full md:mb-0 mb-11'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Phone number</div>

                                                    <div className='flex border-1-d6 rounded-lg p-2'>
                                                        <select onChange={e => setNokPhoneCode(e.target.value)} className='border-0 font-gotham outline-white text-sm'>
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
                                                            
                                                        </select>

                                                        <input value={nokPhone} onChange={e => setNokPhone(e.target.value)} className="px-2 py-1 border-0 input text-lg outline-white" placeholder="ex: 813 000 1111 OR 0813 000 1111" type="text" />
                                                    </div>                                                
                                                </div>

                                                <div className='md:w-1/3 w-full'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Relationship</div>
                                                    <div>
                                                        <select onChange={e => setNokRelationship(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                            <option value={nokDetails === '' ? '...' : JSON.parse(nokDetails).relationship}>{nokDetails === '' ? '' : JSON.parse(nokDetails).relationship}</option>

                                                            <option value="">...</option>

                                                            <option value={nokDetails === '' ? '...' : JSON.parse(nokDetails).relationship}>{nokDetails === '' ? '' : JSON.parse(nokDetails).relationship}</option>

                                                            <option value="SISTER">SISTER</option>
                                                            <option value="BROTHER">BROTHER</option>
                                                            <option value="SPOUSE">SPOUSE</option>
                                                            <option value="DAUGHTER">DAUGHTER</option>
                                                            <option value="OTHERS">OTHERS</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={nokRelationship === 'OTHERS' ? 'w-full mb-11':'hidden'}>
                                            <div>
                                                <div className='text-gray-700 mb-3 text-sm font-bold'>Other relationship type</div>
                                                
                                                <div>
                                                    <input value={nokRelationshipOtherValue} onChange={e => setNokRelationshipOtherValue(e.target.value)}  type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='md:flex md:justify-between md:space-x-10'>
                                                <div className='md:w-1/2 w-full md:mb-0 md-11'>
                                                    <div className='text-gray-700 mb-3 text-sm font-bold'>Next of Kin Address</div>
                                                    <div><input value={nokAddress} onChange={e => setNokAddress(e.target.value)}  type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                                </div>

                                                <div className='md:w-1/2 w-full'>
                                                    <button onClick={sendNextOfKin} type='button' className={isNOKDetailsFilled ? "mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full":"mt-9 rounded-lg bg text-white border-0 py-3 px-12 font-bold bg-green-900 cursor-pointer opacity-50 w-full"} disabled={!isNOKDetailsFilled}>
                                                        <span className={ showNokSpinner ? "hidden" : ""}>Update</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={ showNokSpinner ? "" : "hidden"} width="15"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>                                
                                </div>
                                {/*End */}

                                {/*Bank Details */}
                                <div>
                                    <div className='card p-10'>
                                        {/* Bank Details Success */}
                                        <div className={isBankDetailsSuccessful ? "otp-alert mb-20":"hidden"}>
                                            <div className="flex otp-validated justify-between space-x-1 pt-3">
                                                <div className="flex">
                                                    <div>
                                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                            <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                        </svg>
                                                    </div>

                                                    <div className="text-sm text-green-900">{apiResponseMessage}</div>
                                                </div>                                               
                                                
                                            </div>
                                        </div>
                                        {/* End */}

                                        <div className='text-xl font-gotham-black-regular text-green-900 mb-3'>Bank Details</div>
                                        <div className='font-bold text-green-900 mb-6 text-sm'>Proceeds from your stock sales would be deposited into this account</div>

                                        <div>
                                            <div>
                                                <div className='text-gray-700 mb-3 text-sm font-bold'>Primary Bank Details</div>

                                                <div className={bankDetails.length === 0 ? 'mb-20 text-gray-500 text-sm':'hidden'}>
                                                    <div>No bank details added</div>
                                                </div>

                                                <div className={primaryBankDetails.length > 0 ? 'mb-20':'hidden'}>
                                                {primaryBankDetails.map((item :any, index: any) =>
                                                    <input className={item.primaryBank ? 'font-bold input px-5 py-3 border-1-d6 outline-white font-bold text-lg':'hidden'} id='bankList' type="text" readOnly value={item.accountName+ " | " +item.bankName +" | "+ item.accountNumber} key={index}/>
                                                )}
                                                </div>

                                                <div className={primaryBankDetails.length === 0 && bankDetails.length > 0 ? 'mb-20':'hidden'}>
                                                    <select className='font-bold input px-5 py-3 border-1-d6 outline-white font-bold text-sm'id='bankList' onChange={selectBankDetails}>
                                                        <option value="">Select your primary bank details
                                                        </option>

                                                        {
                                                            bankDetails.map((item :any, index: any) =>
                                                            <option value={item.id} key={index}>{item.accountName} | {item.bankName} | {item.accountNumber}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>                                         
                                        </div>

                                        <div>
                                            <div>

                                                <button onClick={updateBankDetails} type='button' className={primaryBankDetails.length === 0 && bankDetails.length > 0 ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer":"hidden"}>
                                                    <span className={ showSpinner ? "hidden" : ""}>Update</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                                                </button>
                                            </div>
                                        </div>

                                    </div>                                
                                </div>
                                {/*End */}
                            </div>
                            {/*End */}

                            {/*Security section */}
                            <div className={switchToSecurity ? 'mb-30':'hidden'}>

                                {/*Change Password */}
                                <div className='card p-10 mb-11'>
                                    {/* Change Password Success */}
                                    <div className={isPasswordChangeSuccessful === 'true' ? "otp-alert mb-20":"hidden"}>
                                        <div className="flex otp-validated justify-between space-x-1 pt-3">
                                            <div className="flex">
                                                <div>
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                        <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                    </svg>
                                                </div>

                                                <div className="pt-1 text-sm text-green-900">{apiResponseMessage}</div>
                                            </div>
                                            
                                            <div className="cursor-pointer" onClick={closeModal}>
                                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Change Password Error */}
                                    <div className={isPasswordChangeSuccessful === 'false' ? "error-alert mb-20":"hidden" }>
                                        <div className="flex justify-between space-x-1">
                                            <div className="flex items-center">
                                                <div className='pt-2'>
                                                    <svg width="20" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                    </svg>
                                                </div>

                                                <div className="text-sm">{apiResponseMessage}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className='font-gotham-black-regular text-green-900 text-xl mb-2'>Change Password</div>

                                    {/* Generate OTP Section */}
                                    <div className={showGeneratePasswordOTPCard ? '':'hidden'}>
                                        <div className='font-bold text-sm mb-7'>Click the button below to send OTP to your registered email.</div>

                                        <div className='mb-3 text-sm font-bold hidden'>Email: </div>
                                        <div className='w-full mb-6 hidden'>
                                            <input value={email} onChange={e => setEmail(e.target.value)} className="outline-white p-3 input border border-gray-500  text-sm"  type='text' />
                                        </div>

                                        <button onClick={sendChangePasswordOTP} type='button' className="rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-56">
                                            <span className={ showPasswordSpinner ? "hidden" : ""}>Send OTP</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={ showPasswordSpinner ? "" : "hidden"} width="15"/>
                                        </button>

                                    </div>
                                    {/* End */}

                                    {/* Enter Password Section */}
                                    <div className={showEnterPasswordCard ? '':'hidden'}>
                                        <div className="w-full mb-11">
                                            <div className="mb-3 text-sm font-bold mt-6">Enter OTP</div>
                                            
                                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                <div className='w-full'>
                                                    <input value={otp} onChange={e => setOTP(e.target.value)} className="outline-white p-3 input border-0 text-sm"  type='text' name="password"/>
                                                </div>
                                            </div>                                
                                        </div>

                                        <div className='mb-11'>
                                            <div>
                                                <div className='text-gray-700 mb-3 text-sm font-bold'>Old Password</div>
                                                
                                                <div className='flex w-full items-center justify-between border-1-d7 rounded-lg'>
                                                    <div className='w-full'>
                                                        <input onChange={e => setOldPassword(e.target.value)}  className='border-0 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full' type={isShowOldPassword ? 'text' : 'password'}/>
                                                    </div>

                                                    <div className='px-2 pt-1'>
                                                        <svg onClick={e => setIsShowOldPassword(true)} className={isShowOldPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                        </svg>

                                                        <svg onClick={e => setIsShowOldPassword(false)} className={isShowOldPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                       

                                        <div className='mb-11'>
                                            <div className='md:flex md:justify-between md:space-x-10'>
                                                <div className="md:w-1/2 w-full md:mb-0 mb-11 relative">
                                                    <div className="mb-3 text-sm font-bold">New Password</div>
                                                    
                                                    <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                        <div className='w-full'>
                                                            <input value={password} onChange={e => setPassword(e.target.value)} className="outline-white p-3 input border-0 text-sm"  type={isShowPassword ? 'text' : 'password'} name="password"/>
                                                        </div>

                                                        <div className='px-2 pt-1'>
                                                            <svg onClick={e => setIsShowPassword(true)} className={isShowPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                            </svg>

                                                            <svg onClick={e => setIsShowPassword(false)} className={isShowPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                            </svg>
                                                        </div>
                                                    </div>                                
                                                </div>

                                                <div className="md:w-1/2 w-full md:mb-0 mb-11 relative">
                                                    <div className="mb-10 text-sm font-bold">Confirm New Password</div>
                                                    
                                                    <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                        <div className='w-full'>
                                                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="outline-white p-3 input border-0 text-sm"  type={isShowConfirmPassword ? 'text' : 'password'} name="password"/>
                                                        </div>

                                                        <div className='px-2 pt-1'>
                                                            <svg onClick={e => setIsShowConfirmPassword(true)} className={isShowConfirmPassword ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                            </svg>

                                                            <svg onClick={e => setIsShowConfirmPassword(false)} className={isShowConfirmPassword ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                            </svg>
                                                        </div>                                                
                                                    </div> 

                                                    <div className={isPasswordMatch ? "text-red-500 text-sm mt-2 hidden":"text-red-500 text-sm mt-2 "}>Passwords did not match</div>                               
                                                </div> 

                                                <div className='md:w-1/2 w-full'>
                                                    <button onClick={changePassword} type='button' className={passwordOrConfirmPasswordIsNullOrEmpty ? "mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer opacity-50 w-full":"mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full"} disabled={passwordOrConfirmPasswordIsNullOrEmpty}>
                                                        <span className={ showPasswordSpinner ? "hidden" : ""}>Update</span>
                                                        <img src={SpinnerIcon} alt="spinner icon" className={ showPasswordSpinner ? "" : "hidden"} width="15"/>
                                                    </button>
                                                </div>                                       
                                            </div>                                        
                                        </div>

                                        {/* Password Policy section */}
                                        <div>
                                            <div className="md:flex md:space-x-5 md:mb-5 mb-1">
                                                <div className="flex text-sm space-x-1 text-gray-600">
                                                    <div>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                                        </svg>
                                                    </div>

                                                    <div className={hasMinAndMaxCharacter ? "pt-20 text-color-2a font-bold": "pt-20"}>At least 8 characters strong</div>
                                                </div>

                                                <div className="flex text-sm space-x-1 text-gray-600">
                                                    <div>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                        </svg>
                                                    </div>

                                                    <div className={hasLowerCaseCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more lower case character</div>
                                                </div>
                                            </div>

                                            <div className="md:flex md:space-x-5 md:mb-5 mb-1">
                                                <div className="flex text-sm space-x-1 text-gray-600">
                                                    <div>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                        </svg>
                                                    </div>

                                                    <div className={hasUpperCaseCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more upper case character</div>
                                                </div>

                                                <div className="flex text-sm space-x-1 text-gray-600">
                                                    <div>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                                        </svg>
                                                    </div>

                                                    <div className={hasNumericCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more numeric character</div>
                                                </div>
                                            </div>
                                            
                                            <div className="md:flex md:space-x-5">
                                                <div className="flex text-sm space-x-1 text-gray-600">
                                                    <div>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                                        </svg>
                                                    </div>

                                                    <div className={hasSpecialCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>A symbol or special character</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End */}
                                    </div>
                                    {/* End */}
                                </div>
                                {/*End */}

                                {/*Change Pin */}
                                <div className='card p-10'>
                                    {/* Change Pin Success */}
                                    <div className={isPinChangeSuccessful ? "otp-alert mb-20":"hidden"}>
                                        <div className="flex otp-validated justify-between space-x-1 pt-3">
                                            <div className="flex">
                                                <div>
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                        <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                                    </svg>
                                                </div>

                                                <div className="pt-1 text-sm text-green-900">{apiResponseMessage}</div>
                                            </div>
                                            
                                            <div className="cursor-pointer" onClick={closeModal}>
                                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    {/* Change pin Error */}
                                    <div className={isPinChangeError ? "error-alert mb-20":"hidden" }>
                                        <div className="flex justify-between space-x-1">
                                            <div className="flex items-center">
                                                <div className='pt-2'>
                                                    <svg width="20" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949" />
                                                    </svg>
                                                </div>

                                                <div className="text-sm">{apiResponseMessage}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className='font-gotham-black-regular text-green-900 mb-30'>Change Pin</div>

                                    {/* Generate OTP Section */}
                                    <div className={showGeneratePinOTPCard ? '':'hidden'}>
                                        <div className='font-bold text-sm mb-7'>Click the button below to send OTP to your registered email.</div>

                                        <div className='mb-3 text-sm font-bold hidden'>Email: </div>
                                        <div className='w-full mb-6 hidden'>
                                            <input value={email} onChange={e => setEmail(e.target.value)} className="outline-white p-3 input border border-gray-500  text-sm"  type='text' />
                                        </div>

                                        <button onClick={sendChangePinOTP} type='button' className="rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-56">
                                            <span className={ showPinSpinner ? "hidden" : ""}>Send OTP</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={ showPinSpinner ? "" : "hidden"} width="15"/>
                                        </button>

                                    </div>
                                    {/* End */}
                                    
                                    {/* Enter Pin Section */}
                                    <div className={showEnterPinCard ? '':'hidden'}>
                                        <div className="w-full mb-11">
                                            <div className="mb-3 text-sm font-bold mt-6">Enter OTP</div>
                                            
                                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                <div className='w-full'>
                                                    <input value={otp} onChange={e => setOTP(e.target.value)} className="outline-white p-3 input border-0 text-sm"  type='text' name="password"/>
                                                </div>
                                            </div>                                
                                        </div>

                                        <div className='mb-11'>
                                            <div>
                                                <div className='text-gray-700 mb-3 font-bold text-sm'>Old Pin</div>

                                                <div className='flex w-full items-center justify-between border-1-d7 rounded-lg'>
                                                    <div className='w-full'>
                                                        <input value={oldPin} onChange={e => setOldPin(e.target.value)} className='border-0 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full' maxLength={4} type={isShowOldPin ? 'text' : 'password'}/>
                                                    </div>

                                                    <div className='px-2 pt-1'>
                                                        <svg onClick={e => setIsShowOldPin(true)} className={isShowOldPin ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                        </svg>

                                                        <svg onClick={e => setIsShowOldPin(false)} className={isShowOldPin ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='md:flex md:justify-between md:space-x-10'>
                                            <div className="md:w-1/3 w-full  md:mb-0 mb-11 relative">
                                                <div className="mb-3 text-sm font-bold">New Pin</div>
                                                
                                                <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                    <div className='w-full'>
                                                        <input value={pin} onChange={e => setPin(e.target.value)} className="outline-white p-3 input border-0 text-sm" type={isShowPin ? 'text' : 'password'} name="password" maxLength={4}/>
                                                    </div>

                                                    <div className='px-2 pt-1'>
                                                        <svg onClick={e => setIsShowPin(true)} className={isShowPin ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                        </svg>

                                                        <svg onClick={e => setIsShowPin(false)} className={isShowPin ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                        </svg>
                                                    </div> 
                                                </div>                                
                                            </div>

                                            <div className="md:w-1/3 w-full relative">
                                                <div className="mb-3 text-sm font-bold">Confirm New Pin</div>
                                                
                                                <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                    <div className='w-full'>
                                                        <input value={confirmPin} onChange={e => setConfirmPin(e.target.value)} className="outline-white p-3 input border-0 text-sm"  type={isShowConfirmPin ? 'text' : 'password'} name="password" maxLength={4}/>
                                                    </div>

                                                    <div className='px-2 pt-1'>
                                                        <svg onClick={e => setIsShowConfirmPin(true)} className={isShowConfirmPin ? 'bg-white cursor-pointer hidden' : 'bg-white cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.63604 5.56529L10.6072 10.5356C10.9673 10.1877 11.4585 9.97347 12 9.97347C13.1046 9.97347 14 10.8649 14 11.9646C14 12.5071 13.7821 12.9989 13.4287 13.3581L18.364 18.2932C18.7545 18.6837 18.7545 19.3169 18.364 19.7074C17.9734 20.0979 17.3403 20.0979 16.9497 19.7074L16.0498 18.8084C14.7649 19.5525 13.4151 19.9292 12 19.9292C8.41439 19.9292 5.2486 17.5106 2.49391 12.8261L2.28282 12.4613L2 11.9646L2.28282 11.4679C3.12423 9.99032 4.00457 8.72699 4.92408 7.68241L4.22183 6.9795C3.8313 6.58897 3.8313 5.95581 4.22183 5.56529C4.61235 5.17476 5.24551 5.17476 5.63604 5.56529ZM4.54572 11.569L4.30532 11.9646L4.51336 12.3079C6.87517 16.1384 9.37415 17.9381 12 17.9381C12.8728 17.9381 13.7313 17.7396 14.575 17.3343L10.7964 13.555C10.6453 13.4414 10.5108 13.307 10.3974 13.1561L6.33749 9.09402C5.73183 9.79538 5.13452 10.6192 4.54572 11.569ZM12 4C15.5856 4 18.7514 6.41863 21.5061 11.1031L21.7172 11.4679L22 11.9646L21.5113 12.8173C20.7425 14.1258 19.9416 15.2576 19.1086 16.2096L17.6965 14.7975C18.3734 14.0081 19.0396 13.0654 19.6948 11.9648C17.2718 7.89826 14.7031 5.99116 12 5.99116C11.1437 5.99116 10.3009 6.18253 9.47198 6.5733L7.99438 5.09542C9.26603 4.36816 10.6011 4 12 4Z" fill="#353F50"/>
                                                        </svg>

                                                        <svg onClick={e => setIsShowConfirmPin(false)} className={isShowConfirmPin ? 'bg-white cursor-pointer' : 'bg-white cursor-pointer hidden'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C15.5878 4 18.7554 6.43241 21.5113 11.1435L21.7172 11.5011L22 12L21.5113 12.8565C18.7554 17.5676 15.5878 20 12 20C8.41215 20 5.24464 17.5676 2.48874 12.8565L2.28282 12.4989L2 12L2.28282 11.5011C5.08652 6.55556 8.32245 4 12 4ZM12 6C9.29692 6 6.72829 7.91554 4.30532 12C6.72829 16.0845 9.29692 18 12 18C14.6297 18 17.1289 16.1901 19.487 12.3447L19.6948 12.0001L19.4867 11.6553C17.1249 7.80768 14.6259 6 12 6ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="#353F50"/>
                                                        </svg>
                                                    </div>
                                                </div> 

                                                <div className={isPinMatch ? "text-red-500 text-sm mt-2 hidden":"text-red-500 text-sm mt-2 "}>Pins did not match</div>                                
                                            </div>

                                            <div className='md:w-1/3 w-full'>
                                                <button onClick={changePin} type='button' className={pinOrConfirmPinIsNullOrEmpty ? "mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer opacity-50 w-full":"mt-9 rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full"} disabled={pinOrConfirmPinIsNullOrEmpty}>
                                                    <span className={ showPinSpinner ? "hidden" : ""}>Update</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={ showPinSpinner ? "" : "hidden"} width="15"/>
                                                </button>
                                            </div>                                    
                                        </div>
                                    </div>
                                    {/* End */}
                                </div>
                                {/*End */}

                                {/*2FA Auth */}
                                <div className='card' style={{display: 'none'}}>
                                    <div className='font-gotham-black-regular text-green-900 mb-20'>2 Factor Authentication</div>


                                    <div className='flex justify-between'>                                
                                        <div>
                                            <button type='button' className="rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer">Enable 2FA</button>
                                        </div>
                                    </div>
                                </div>
                                {/*End */}
                            </div>
                            {/*End */}

                            {/*Notification section */}
                            <div className={switchToNotification ? '':'hidden'}>
                                <div className='flex justify-between bg-white font-bold border border-gray-500 rounded-t-lg p-5 text-green-900'>
                                    <div>
                                        <div className='text-xl mb-3'>My Notifications</div>
                                        <div className='text-sm'>Manage your notifications</div>
                                    </div>

                                    <div>
                                        <button type="button" className='cursor-pointer px-5 py-3 bg-red-500 text-white font-bold rounded-lg border border-red-800 hidden'>Mark all read</button>
                                    </div>
                                </div>

                                <div className='bg-white border border-gray-500 rounded-b-lg mb-30'>
                                    {notificationLogs}
                                </div>
                            </div>
                            {/*End */}
                        </div>
                    </div>                    
                </div>
            </div>

            <div className={showPageLoader ? "page-loader-backdrop opacity-90":"hidden"}>
                <div className='mx-auto w-96 my-56 relative'>
                    <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                    <div className='text-center'><img src={AnchoriaSpinner} alt=""/></div>
                </div>
            </div>

            <div className={showNotificationDetailModal ? 'generic-modal':'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="validate-pin-modal">
                        <div className="px-5 py-3 flex justify-between items-center" style={{borderBottom: '1px solid #ddd'}}>
                            <div className="font-bold text-lg text-green-900">Notification</div>

                            <div onClick={closeModal} className=''>
                                <img src={CloseIcon} alt="" className="cursor-pointer" width='20'/>
                            </div>                            
                        </div>

                        <div className='p-5'>
                            {apiResponseMessage}
                        </div>
                    </div>
                </div>
            </div>

            <div className={ showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden" }>
            </div>

            <div className={showDeleteModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-3xl text-green-900 font-gotham-black-regular"></div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div>
                    {/* Delete Success */}
                    <div className={isDeleteSuccess === 'true'? "otp-alert mb-20":"hidden"}>
                        <div className="flex otp-validated justify-between space-x-1 pt-3">
                            <div className="flex">
                                <div>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                        <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                    </svg>
                                </div>

                                <div className="pt-1 text-sm text-green-900">{apiResponseSuccessMsg}</div>
                            </div>
                            
                            <div className="cursor-pointer">
                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* End */}

                    <div className='text-center mb-20'>
                        <img src={DeleteCardIcon} alt='' />
                    </div>
                    <div className='text-red-500 font-bold text-3xl text-center mb-30'>Delete Bank</div>
                    <div className='text-center my-8 hidden'>Enter your transaction to PIN confirm</div>
                    <div className='font-bold text-center my-5 hidden'>Enter PIN</div>
                    <div className='flex space-x-3 my-10 hidden'>
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />                        
                    </div>
                </div>

                <div className="flex space-x-5 mb-10">
                    <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                    <button onClick={deleteBankDetails} type="button" className="py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer">
                        <span className={ showSpinner ? "hidden" : ""}>Delete</span>
                        <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                    </button>
                </div>
            </div>

            <input type="file" id="id_file" className='opacity-0' onChange={changeId}/>

            <input type="file" id="utilitybill_file" className='opacity-0' onChange={changeUtlityBill}/>

            <input type="file" id="signature_file" className='opacity-0' onChange={changeSignature}/>
            <input type="hidden" value={state} />
        </div>
    );
};

export default Profile;