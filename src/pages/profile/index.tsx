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
import MaskGroupImg from '../../assets/images/mask-group.svg';
import LockIcon from '../../assets/images/lock.svg';
import moment from 'moment';
import DeleteCardIcon from '../../assets/images/delete-card.svg';
import { authOnboardingServiceBaseUrl } from '../../apiUrls';

const Profile = () => {   
    
    document.title = "Profile - Anchoria";
    let customer = HelperFunctions.getCustomerInfo();
    HelperFunctions.removeOverflowAndPaddingFromModalBody();

    const [showPageLoader, setShowPageLoader] = useState<boolean>(false);

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
    const [passwordOrConfirmPasswordIsNullOrEmpty, setPasswordOrConfirmPasswordIsNullOrEmpty] = useState<boolean>(true);
    const [isPasswordChangeSuccessful, setIsPasswordChangeSuccessful] = useState('');

    const [isShowPin, setIsShowPin] = useState<boolean>(false);
    const [isShowConfirmPin, setIsShowConfirmPin] = useState<boolean>(false);
    const [oldPin, setOldPin] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isPinMatch, setIsPinMatch] = useState<boolean>(true);
    const [pinOrConfirmPinIsNullOrEmpty, setPinOrConfirmPinIsNullOrEmpty] = useState<boolean>(true);
    const [isPinChangeSuccessful, setIsPinChangeSuccessful] = useState<boolean>(false);
    const [isPinValid, setIsPinValid] = useState('');
    
    const [isEmployeeDetailsSuccessful, setIsEmployeeDetailsSuccessful] = useState<boolean>(false);
    const [isNokSuccessful, setIsNokSuccessful] = useState<boolean>(false);
    const [isPersonalDetailsSuccessful, setIsPersonalDetailsSuccessful] = useState<boolean>(false);

    const [hasMinAndMaxCharacter, setHasMinAndMaxCharacter] = useState<boolean>(false);
    const [hasLowerCaseCharacter, setHasLowerCaseCharacter] = useState<boolean>(false);
    const [hasUpperCaseCharacter, setHasUppererCaseCharacter] = useState<boolean>(false);
    const [hasNumericCharacter, setHasNumericCharacter] = useState<boolean>(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false);
    
    const [apiResponseMessage, setApiResponseMessage] = useState('');

    const [switchToKYC, setSwitchToKYC] = useState<boolean>(true);
    const [switchToSecurity, setSwitchToSecurity] = useState<boolean>(false);
    const [switchToNotification, setSwitchToNotification] = useState<boolean>(false);
    const [switchToBankDetails, setSwitchToBankDetails] = useState<boolean>(false);

    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [street, setStreet] = useState('');

    const [employer, setEmployer] = useState('');
    const [profession, setProfession] = useState('');
    const [salary, setSalary] = useState('');

    const [nokFirstname, setNokFirstname] = useState('');
    const [nokLastname, setNokLastname] = useState('');
    const [nokPhone, setNokPhone] = useState('');
    const [nokEmail, setNokEmail] = useState('');
    const [nokAddress, setNokAddress] = useState('');
    const [nokRelationship, setNokRelationship] = useState('');

    const [idFile, setIdFile] = useState('');
    const [utilityBillFile, setUtilityBillFile] = useState('');
    const [signatureFile, setSignatureFile] = useState('');

    const [showPersonalSpinner, setShowPersonalSpinner] = useState<boolean>(false);
    const [showEmploymentSpinner, setShowEmploymentSpinner] = useState<boolean>(false);
    const [showNokSpinner, setShowNokSpinner] = useState<boolean>(false);
    const [showPasswordSpinner, setShowPasswordSpinner] = useState<boolean>(false);
    const [showPinSpinner, setShowPinSpinner] = useState<boolean>(false);

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showValidatePINModal, setShowValidatePINModal] = useState<boolean>(false);

    const [, setPinValidatedForPersonalDetails] = useState<boolean>(false);
    const [, setPinValidatedForEmployment] = useState<boolean>(false);
    const [, setPinValidatedForNok] = useState<boolean>(false);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [pinValidationType, ] = useState('');

    const [notificationLogs, setNotificationLogs] = useState('');

    const [showNotificationDetailModal, setShowNotificationDetailModal] = useState<boolean>(false);

    const [bankDetailsList, setBankDetailsList] = useState([]);

    const [showAddBankModal, setShowAddBankModal] = useState<boolean>(false);
    const [showManageBankModal, setShowManageBankModal] = useState<boolean>(false);

    const [bankDetailsError, setBankDetailsError] = useState('');

    const [isAddBankSuccess, setIsAddBankSuccess] = useState('');

    const [nameEnquiryId, setNameEnquiryId] = useState('');

    const [bankList, setBankList] = useState([]);

    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankCode, setBankCode] = useState('');

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState('');

    const [isDeleteSuccess, setIsDeleteSuccess] = useState('');

    const [selectedBankId, setSelectedBankId] = useState('');
    const [selectedBankDetails, setSelectedBankDetails] = useState([{}]);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);


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
                let logs = response.data.data.map((item :any, index :any) =>
                <div className={item.readFlag ? 'p-5 space-x-20  justify-between items-center flex border-bottom-1d cursor-pointer':'p-5 cursor-pointer space-x-20  justify-between flex border-bottom-1d bg-gray-100 items-center'} key={index} data-id={item.id}>
                    <div className='rounded-full bg-B9F1B4 px-3 shadow-sm py-3' data-id={item.id}>
                        <img src={BellIcon}  alt="" data-id={item.id}/>
                    </div>

                    <div className='relative flex-1' data-id={item.id}>
                        <div className={item.readFlag ? '':'font-bold'} data-id={item.id}>{item.content}</div>
                    </div>

                    <div className='relative flex-1' data-id={item.id}>
                        <div data-id={item.id}>
                            <button className='rounded-lg border-0 py-2 px-3' style={{backgroundColor: '#B9F1B4'}} data-id={item.id}>
                            {item.subject}</button> 
                        </div>
                    </div>
                    
                    <div className={item.readFlag ? '':'font-bold'} data-id={item.id}>{moment(item.createdOn).format("MMM Do, YYYY hh:mm A")}</div>

                    <div data-id={item.id}>
                        <button onClick={displayNotificationDetailModal} type="button" className='cursor-pointer px-5 py-3 text-green-700 font-bold rounded-lg hover:bg-gray-300 border-0 hidden' data-id={item.id}>View</button>
                    </div>
                </div>
                );

                setNotificationLogs(logs);
            })
            .catch(function (error) {});
        }

        function getBankDetailsList(){
            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}
    
            axios.get(process.env.REACT_APP_WALLET_SERVICE_URL+'/wallet-api/bank-details', 
            { headers })
            .then(function (response) {
                setBankDetailsList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        function getBankList(){

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

            axios.get(process.env.REACT_APP_WALLET_SERVICE_URL+'/wallet-api/get-banks', 
            { headers })
            .then(function (response) {
                setBankList(response.data.data.bank);
            })
            .catch(function (error) {
                console.log(error)
            });
        }

        checkUrlParamsForActiveProfileSection();
        getNotificationLogs();
        getBankDetailsList();
        getBankList();
    },[]);

    function changePassword(){
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "customerId": customer.id,
            "oldPassword": oldPassword,
            "password": password
        }

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

            setApiResponseMessage(response.data.message)
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
            "pin": pin
        }

        setShowPinSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.put(authOnboardingServiceBaseUrl+'/customer/pin/change?customerId='+customer.id, 
        {
            "text" : localStorage.getItem('genericCypher')
        },{headers})
        .then(function (response) {
            setShowPinSpinner(false);
            setIsPinChangeSuccessful(true);
            setApiResponseMessage(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
            setShowPinSpinner(false);
            setIsPinChangeSuccessful(false);
        });
    }

    function performSwitchToKYC(){
        setSwitchToKYC(true);
        setSwitchToSecurity(false);
        setSwitchToNotification(false);
        setSwitchToBankDetails(false);
    }

    function performSwitchToSecurity(){
        setSwitchToKYC(false);
        setSwitchToSecurity(true);
        setSwitchToNotification(false);
        setSwitchToBankDetails(false);
    }

    function performSwitchToNotification(){
        setSwitchToKYC(false);
        setSwitchToSecurity(false);
        setSwitchToNotification(true);
        setSwitchToBankDetails(false);
    }

    function performSwitchToBankDetails(){
        setSwitchToKYC(false);
        setSwitchToSecurity(false);
        setSwitchToNotification(false);
        setSwitchToBankDetails(true);
    }

    function sendPersonalDetails(){

        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "address": address,
            "country": country,
            "signature": "/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////2wCEAAIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVwBAgMDAwQDBAUFBAYGBgYGCAgHBwgIDQkKCQoJDRMMDgwMDgwTERQRDxEUER4YFRUYHiMdHB0jKiUlKjUyNUVFXP/CABEIApsD6AMBIgACEQEDEQH/xAAeAAABBQEBAQEBAAAAAAAAAAACAAEDBAUGBwgJCv/aAAgBAQAAAAD4EQswxV4XzOP4/k+eiRO7MMlvS09fUvWrNiazNasG5SMRpAMYV4YogAY0ooRjrxADzSzyKKKGKGCGIBijiiCKKMWAYxEI4xZJIAFCySZhTJfcSFwCCvHJn8hx/I83AjdJgktX9LW1tC3ZszTz2LRojaSRJhiCCCKKIRiTRwNHBGAvLJNIMMUEEEUEYAAQxxxBEzCAMIxxiydIAFkDpmZmZL7gJmGOCADq8hxvJczVcnSQvZv6OpraVyzZnlms2ZHc0UpELQhBDHAEYRsEcDDXBheQ5CCOCCCCGGJgjCOMI4o2YQEUIxsKJMIximZ2FCmZfb7oRhiiEqvKcdyfMUXJJIXsXdDU19G9YsTzzT2ZXM2eSV2aEIII4giEGJCMFGEWczco4oYK8MUMTBGEcYhCAphAULAKd0wMMYpJhZkwr7ZkQDCDAMPMcfynL5iJJ2TTXdDU1dG/YsTzzT2ZiJ08pm7gbkZTWrUs9iaGrQxsHKo1o4yQwRRV4Y4I2CIAAY44xZmBMzCLu6GMWAGSQikwt9nzEAxIAaLnuQ5Xl8hJ0mSkt6Glqady1PYsWbV6zPctTz27tuxZsW7U5qe5cljirUKlWnQq08zKwMDLoVQjghiijEIgjBgiABSBnZRpIkMYMwCyTCKTB9kWHYY0IRhiclynM4gp3TOVnR0tfb3tfT09PSv39G9b0L92zYtT2J5rVl5Tkt3JgrVaVeOvEFWjk4PM8xynK4OPm1oQhEIgjBgCIGTCklGmJ2EImZmF2ERTKP7DskDAzBC2TynK5D6mjZvX7tvS2NnS09fT1L1+9cv3Ltq1dtWbE1iaaUpiIzknsSko60MUQNDVzcfA5rkeG86875HIhjijCIYxAQiEWTOkwM7pmjiFMLJCApkH15bcRZmCBZ/KB6Z6bpSqJpbN29d1tHX0b9vRt3bdmxZtWbNmeaSWczlKIReV5CCKGKKCvBSzcXn+c5XiuA8z895XKAIRGFgAACMRZk6TCydMIRgzMyQCLJB9cWCZJhaMKPP+r+3+pa1URhiku372rpamhduWJ7dmxNLLYmkM3IyM5hq1Y4wjjq5+fl5GLi4mJhYeRkYPNcbwPG4leV4xjAQGMYwAWSdIRZJCwALMKSCNkkH1lYMnTM0YUc36H9+9t6fPqxwio5bt/SvXLU9mZ5ZZ5JJTOSWZPIzQ0MvIyc3PoZ2ZkYmDzvL83zXM81g42VQzsrJzWt35I2hFgEIwAQFOkhAU6EQFhZJNEKSYPq2xOZEyYWiy/oX6X9t6vLoUqQzvCr1y7buXNG6SktWbZNE1avRoUKNPPycbBx8vMzMjEw8LC5zl+b53AxcmhBGACrejoyRjEwi0YRiACydII2Z0wgzCkyGNkhFfVNi5JIV3uO50pSzPWPefTdXnsXOpxS2rARW79u9paM5Vq8NevSzsyhnUMrNy8nJysnFys2nSpVKdShnZGPkZORlZtGCMAjK3o6EoRxoBYBjEBAE7II2SSaMUzMKYGZCh+prly3JL6J7l63t21U7H1Tsn5jmcHFoy3LxRvI8VYq2dk5Odm5ufkY+Vm5eZn0qtauzySEwjDDXp52Ri4uNj5OfWgijA7ujfkEImEGAQEAAWdNGAsndgBIGBIRZJh+o71+5Jo+7/AER7Zt27VzX7Heh5vmuU53nMuxPx3CV4qlGhmUMvLyMnPpV4YWRySSSySyyyzIRjhgrU83EwcTExcuqAxxAVq7dQjGwCAxiIxiCdAACk6YBTDGyQMyTD9QXdC/Lo/T3057jqynb2uj0Ro89yvG8rgZuD4l858xBFFEMYupZ5p5pJpJZJDOWSQyUNerWpVKOfl5OPj5OZVOxYUESlsTRoI0McYxiLRgLOmjAUk4gyARZKNhSTfTF7RvTWfpf6W9o0BKxr9X1G2Odh8jxHLY3NfNnydxlyzZtTSucks880ksksiUYRRhHHBTo59GpUqVKOdnUKNQr+ppzwQRCUcbNGwRhGAM0YJkkEbJIVGzCDMhERSTfSly/fmP6J+mvbdPOjl0N7qOo3rWdjcrxvJ8v87/JHBW7E0spHJJLNNK6YI4ooYoo4hjr0qGfSpU6lGjQp14Y7Oxu7NyvXhrQQQihYACEBERYU6UcaSQtGLCIphYRSQ/RtrRtWA9/+pPc+goVq7ae1u9H0upFic3xvCfPHyX5fbnOUzOR3d0wojI0IhHGEVWjQz87PzczNzqdaILOxvbNqCKCvWrQQiyEYo4xZhZnTsEaSTNGLAgYRQikg+hrNy3LF7v8AV3vPX51cYYpNTa3uh37HOcPxvz58n+NWJTciIkck088sk80ss0iSRNHUo5mNh4ODhYuTSrBNr7mzaijggrwV68UYCAxxszIU6SEWSTKJmBAwMwsko/fprEsgez/VvvfpZUogCOOzra23sUuWxvCfkzwaaWQ5pp557Fm3ZnsT2bVqzYkTJIYqubk4XP8ALcvzXO4mXUjl0tjXuMEcEMFetWgiBhjFMmSJ0hBJOzCwMwiCYWSEfpknYKvoH0x7t6j2NyCEATxz6t2HBxfDfmHyia1Zs2rVq1btWbNqaU5p55TYAFmCOrnZGDzvLcpzHO4WXSgO7p6NpCMcUFetXgijZmZJJInSYUkkmFhEWZAyZC32IzBWo2/a/bPUPQuz2FWhGSRmt4Xn3mfmHjmZcu3blyxYnlkMzlcjlsyEgEGjhq083Kw8DmeZ53BxczPqhNYtyJhEI4oa8MYsknSSd06ZkkkhZhZkhFmZMvu5o461Chq+ner+n+hdv0MtaB5p5n4T57+fMKS9btzzTGRERnNLKcstmRBFDXhq1aefn5uTj4eFjY2Rl51CpGiSFCICMUbMknSSSTumZJJJCzJmFMLJJfoqUcNapQz37j03030bt+mvgD2bdnhfmT52C7ZmlMzNzKSSexPYkkJRwVa9WrWq1KlKlTo52Zm5mZl5mVl51SCMRZMzJAzAnSSSTukkyZ0mZmZMkgZJJv0/KOOGtSz82ps+gemei9z122aktW+O+afnavZnNMUkskyOe1ZkIYoa9erWrVq1arXrVateKvTpUc/My8nJyqNWERSSSUaBkkkkkk7uzJJkmFkkmFkkkH6vk0cYw0s7PzX670P0H0DtejsyWJ+U+cfnOlKTuRnJIZmZoQigrwVKlavDBDDBFFDHGmUValSo1KNOvBXrQQxQwVoK0EIpJJJJO7ukkkwswskhFJJCP6wGTmaip0KNcL3Yegeg931eiVzk/nj5zy5CdMjN2FmcI4YIYK8EMQBHHHHGpb+jq6mjckYUYxxwV6NOnUo51DOyee5fkcCFJJJJO5JJJJCKZmZMwpIR/WE5JJDeOpUpxOI7vd+g992WrJzvz/8AO2OgCNMFCtLOSGOOOMQZhGOOIIn0ug6fpek6Db0LhsLyMwhBUrV6dSrFSzcLlfPfJ/KeZFJJJJOTpJ0zAkzMyTCyQfrCUssqeOpVgUx16tztu+9B7XZ5rw7545ytBCFehl4609S0iNzdMyaOCGCG51Pe+gdp0+1rXrk0kEJEAwhDHVr1a7SyVs/E5HzfxTwDy2qkkkkkndOmZkhZkkhZk36tmbp1HBA81mSOhSPr/Qe97Wh4N898jSgaKhm5GZZ2+kvSySkZO4sNepWi2O59O9N7rqdzRlIiKrXEgiqshhirQK1M0MNDlfNPEfm/wjFSSSZmSTpJJMySSQsmX6lHdtVasQCprMpBWrVw670v0bp/PPAPOcilEAUcfLm19qZOkZtFBUp0q8vT+jes+pd/0uve0DFpZK9CEmrwCUFeGtDCgCKS0OF534x82/NvHCkmYUkkkkzMkmdJkyb9POt9A6kMjKx6MDujOSxobXS+n+udVz3nfHZFDPo52bhY/L89l0YRjr5+bSoZ9GoOl2nq3sfq/fdPraWpfaGFKOpWrxVogCvDWgCCtWhhWlotR5Dxv50+YfLaqQikkkkmFkkkkzMyX69+o+md1Zq5+dAgkksT3NPb3+m6rsdyly3N4ubgcl6pvcP3WLyvJc/xnNcRynCeeef8PzlA9n0H133L2L0bqOh2b9qVUq0cIQ1adalXarGUFRR1atWCGzp6ckGD5X8/fKnhmODMySSSYWSSSTCySX7rel9z22/aJOF21YtXL+jq6undnhy8XEyM7n9D7R67JjKGpUo8vzGJzvNU/lD8ruGxp/dfbfbPVO+6nX0JSeKKlWgatlwV6NexVoTxRNDBRrJqz39iaGnwvgXyr838hXZkmZJJmZMkkLMkl/Qt0nV91uXb2jNPq6ly1NNNZnCKtRzsbDo1aPlnzj6v9IdGWNQobuhdCpR9Z/Oz5E67mfqrvpN/T1LZR2NHQOlBk1Xp4+cqNSeOtC8yghrqOGlAtDYnhr4Pj/yz8nec5gskkmZmZmZJkwJJv6I9vtO+1repfpwampbsGVqwoo6gVMahRgg8l/OjmPR/RdLMr2duLfua+v8ANf5ocZ9A/ox+mvf7epdAc/D57x3lc/z6XE3bV2bCABss4S2YZIq8lKtA9SOa7aggh4H5h+P/ACDDoC6SZmYRTJgTCzIf6Kt7vu40L+tczqjLRtTHNZBPAnzaOfkjgfM/w94T1Hq/oclHd77tvnHgt3zv5Yxg9d9+093rt65r3ugi8v64+jIPVPRfxzD679y6LQzghmp6sUp0r9HNM8yGqPQ7FetJi+AfGPgfLYgOSEQZkLMLMmEBb+jTp/Req0NDSs4lavHoW7Slc3OSSrl5mbmZ1Xzz4o+a6NrqYr36cez/ABB4Vzfy/wCx+iT1uc7atj0M2rm8xn52nYvdBp6299W/EH58ya/den+j+n+pes+jRtfOOOlYqXKOPQswb3SVomHyj47+XvP8AEmAGdMICKQCwt/R/wBV6V0OjoXg5+rHPftI0TlNNXywp1DwM6h478reMebcxhR/Tlrzq71tk/PuXpyfROzRgk09WzFTx8fKz68HYfFXm2OjTr6nw+A9S+jfpj13M3IYbMSGnnBPma/TBA7cr8l/IHlfMwpmEUkEYCmFmYf6SOt9I39C5dq8a0lrUkKWmlOcGYclGrbrZ8tGvj8lxXmnjXkXC5eH7z9L+hcV89+J+o/ev0Rd5Hzvy3yHz3Gv9R1nQbE9ubifyk4ydq1Sh9P+JaYQU+m+hvrr60keLPeOi75NPXmdQQQfPPxF4fx1VJxQsIBGhFCy/pP7X0PYuXbmdyFyMpytXsx7LxZlbosfFMuiYIoc3NkwaPIcX8pfNON7/wDRfV+YfPPZfod9X9BUePP5LlfOfMfEfnfjNnpOt8Q+OectW7ulZ+qPu7zTkeF5/luep+g/qhTyLu7zGaMmZkX9fTuVRhXnfw/8yed55kwihAYxFmFN/Sr3/fX712xlcpdpTzlYacSajkX9HOaxRjpU7UuA2rjLnLWT5f8AKXzZ2n1B6J40P3d9abOJDTqctxHzV4P4n5py2Fy2Vm8dUFkyu+kQ+yet+q+sdb6BoaHM6j8Z0UHH9FiVqT0fS7EFZizfkT4v8lxXdkwNEIMmZh/ph9E7W5dtS52S3O681Xez612hHZv2sWnWmy4oKFmvz3R6FfNxo1S47xn5T5z6/wBnh/qv7G7fnsbH+cvjf5o4I9Bu973p9SpWz3n3M+kfJYXGc/13f+m+k6XY9Hi18+9byDgfj5lT6nsKtZpYfEPg7wbkI0mYYmFkmBf00+l9PfszLnM+7g6Tk2do6MDnQqnTrUy0A5zYhoXsTm9Op1HKc9Tys35Y5D6X5X1H7f8AY8rzP4g/Pvjtj0b6U+mPRu8fiuRrVlgYnRWuUr9/Zscduc3wuPz+TH1nRdN1eNTO9nngwUq2v1Eb0wXH/FHyt5lSJIASZPGC/pu9W1r08sHClq0rEEp6E0eTV3OeDay7HLbVSfBg27WNl2q2jyYw87lHxvlXNbtv7h+lcr81/wA9ZPdPuz6G6ung1rFvjeQ7XL8R7TY5Lt8+nZ5LqziOOrl63IczuLnNSlVvY74vQ5dmn31iFV4qPzJ8U+L4iQokkESP+nD1u5ZOSpxFc4eroXK/QUcypoZVSVrWVtc9XuZ/Q8tdSuUK3K2syDna3LDyPlFP6++wPln8q4Pvf9Cegq2cirNxmGsWzj9Xw1TtqHG3NaeK3xe0XO9BjWMyHp+aPGt51SbNuZVrl6/pSr1VWfx74o+eOIhIhIoo1K39P/pk8spYHCdAWgNHF0blDosGPXza27glu4Gf1XNcnudTzvMUtoqnVeXXeKv81idT4x8//Qn1N+dfiP6Cfozr4GNPn2szC1uP7nz3teE24bPJTte5LS0Oj5+F69aZW6gUqG1y8IzY25yMFbR04KwVYm5z5O+TvKcoXOONSEP9TfVyzSrDQ4mtzU+hVzo+mioZ/Qw2eJ9NweCu896ZU4+n182pz1yhRPFwNDieG7Gr8Yweo/Hv1n+onadrxmtwoNztLpsIsG4WfG+dpT9BmasxxxQwwCMFaKrC0MUFUa1epXiqVKQQMwrw35K+dOEEY1KSH+q3WKSVMPnRVqHS547AyrmtraxeM9B47Z6HzrsDi2tuomqNm49qpVz+V4Wj0PifwxLT/Zj6o1K2JhttchHzdiTLn0qVHrM6yzgiZogiihFU2rwxBWiCrWq1q9OKrDBTgUBTz8l87/JXzvmIydL+rG2lKzVPOp8vpzpj1nmvdBnUdVQZFu1o9Nbr0g496ubS3cLf5vn8LrMvVw4Mf88fmj6u/Zn2vkoqnT+b2tSLHzL3Prc6GvFFE6hQszQxiAhFFFDHBFBFWr1q1arDSq1akcAjXkKp88fMfzpwzoEv6rrLi6fKzrfGXLc+Du3eeudHyd+bZ0r1mlh4eZz2xLYj5rX390wz8ilx2bkhP4d+Vv39+p/t2bw3RWsjSy8Kne1qunFVAGjZwZ2gq0sujm5uZnZuXm0cykAg8KVYauPn0svncbmeP5vmeV5SX6B5H56qil/VSZvXlXP5diXGuVWo6vQ8bZ2u9iY+EqsobvKdL0tRair8xBrcdpMFbkOPv6f5OfRX6X/Qe3zVPi+xu8dpwbE1aMI0zgq2Vz/I8jxXH8dxnM8/iZNCnm1KlKpHEAQPHDDXo161GtTggF3COz7X6J8ycWl/VBIniCx5uNubYx9nku3wOh5jountcjj9FlZO/DLsR18qtYvOPOQzZFjlasg38iv8qeAfqF9S99zuDoVM+e7rBDRjBFHn8vwHlXkPk/nvKYdKFhiZmcIooq4wDBFXghqwQ1q9etBACd0wroPc+J8Kj/qQsRnDZi8r6XUyIlkddg9sOrl0GLK0utp6WAhxpY9etraBwR12q1MqjxOLtW+c/Jf9KvtH2I+G3nxu0pVa0EYqjyXlPh3hfkvE5YDFGjOOEhEBijjiCOGCKrWggrVatarWiF3TESaOv6X6n8/f0oWHlrji4A3cjr69HqtCnymtjaPQ0rmtnZstaTWbRlTzRhAEDw1KtaDF5bef8pPc/v8A+hOs42lu9JUpVIYgxvMPA/m/wzh4jN44BkIHAYoAAAgirxsEUNWCpXqVK1aGASTJmFnZ1Z9X/f0p3c+Hxe/4zQLsqfN9pxTb8W5Yq1o7il27LxGxKRQQOLBBTq1oKdav8l/G/wCm/wBW+l5ub2gZ9OEcXyH5u+UvEcxkZHIMMMbxQQi8VaOCKOOOOGMIa9SpXrwVoYxNidySJ2YY4v6YE8Uc/CYXQ9Nrc+eJptYLpbONmS6fS2boJ0xFIJyRQwQhBDEwV61WDlvxg/R77F9s3ZbVepWp+ZfL/wAY+C55OToInTxyGgjAYa0DtCAQ16SirUaVavDWiZiN0k7s7sSH+kZ1Sls85u59K7Q2M7V0paeTe2JdC/bNJG5Tm1LNw+ZwMDDy6UVroOp6jorMUP5O9b+hH0N3FmV4MP51+IPj/nUUkELHInGCFNIJtFFXiaGKOMK9OuEVepWqwAydOTSuzp3F2f8Ao5ZmkixqcO1DNqaM/O2qujr6VuyU0qKSVU8Xl+T4ng/O/NeL5zBzq4z7nZ+q+7+0ejavyx+Z/wCpH1N61fKTlfk386/nk3JwplYeMGQRCJk6iCpG0YwwRQVq1WCCvWgFOTukiJOmY0Mf9GdgOPxgu2unDQlq5PQZ+1q2E1i1NYOUczmuH4TzXyvzHzzkstnInZII10vvv1v9G3fw5+9vtP3Do1znx3+aPjkhkQsIAnSdhB0AjDGMccAxQw1a9WnSghjB05kkiNE7vG4xt/RaNPnIsrrL1i/iNZ0dO5NKLzz27I4vK8J535j4r5RxOacshp3SckgAQ777i+zvzq4f9Ivo/vsr49/LzyEGczcGSYQIgBmEGijhhiCuCGGnSq16tOMURERpmNJk7C7Av6JXw4NuDPsUOhDT1rCkNwn0JqPM8D5r5J4n5FyFeRzkM3dOkUhkgaOn0X6Fepfl/wDqf9del/Of5QfOTMmMxIhZ3CGKuKFgCIIQiCrUhGOGnBWiiiRkbuid2ZMSTpnD+hmcQXNxdDNs2pzKYysKLE4vzfyvxDxThK8kiMjM5CROiMzNgaKCp3X6IfAn3B+hG/8AmH+fwk6YUcpMbQ1q7MARxtGoxCGKCrVjrx161aJI0pHdzTMkSZiZMv6GHYc0NPYkmOSQ7JwY3HcH5r434j5ljySkRPJKTnKToimlNxjQA1Sn75V7z9XvLfyT4pKR4QOSZxjCKCIWiEGYAaOKKGvXrwVoII4RTzqNzciSdMQsmZo6v9FMVaeSwUlieaWeLN5DzvzjyrxnyzlhlNykMjMzTOUksk80hPEIChrVJPScv9Svlb41J1JXhllleOOOKCJO6CNMEMcdaIYKkEMFeuIs5knYpQYndIgCGrXgiH+jeSvYlIrM01ipy/C+c+VeJ+R8fBKTyE5SSORG7I5p57FiR1FGmCKIHp6uP9heF+fkMkdWSeUYmaGIIIooSjrxwkMLHDDCFetHELpSkClToI4hhCOOIWSSX9GUkU1maS0eLy/n/kvi/jXnOa7kbnI5SEREZERSTTSzTTE8McMbjXIq0Od1tOs4EzSmoRqxiAZ+XlZ9OtGIinIjYnGFmFEnQp2BhZJJJJJJL+jOUJL9mPB4vyryHx7xjk4jNPIRERSmZETsilknsSG6ZyNq8boCCnWhvSMwlOZwRVYYs+rm8/Xms2DTUYbIx04IIxZJJJJJJJJJJJJJJJf0eTGFbm+B8x8b8I8wyXRmTlIRFKUkhOmZHNLJPMTuICJySxRkyAa9Sc2Guc8zQxBUyKjz3LFXNysyjBCySQsySSSSSSSSSSSSSSSS/pLgyOH888q8X8X4KoSSOZzcyM5nJJkznMbzWE4tEAlLPJYlrxgE9WiEMkdexLLEQ1cHmKzwQgkmFkkmYUkkkkkkkkkkkkkkkkl/RL5v5f4x4n5Rz4m6FylmdEUkpIUZIY2lmM5p00EFdPPbtTqyqNepUyMitWiStSWZ5yzcCqIpJJCKSSYWSSSSSSSSSSSSSSSSSX67/P3iHC0XdMicikc5JCJIXlIQiCaad05AMUEdiSXSnJoRxObxqcSTMKSSKVQJJjEGYWSSQikkkkkkkkkkkkkkkkkl7TzEJOwoicyYjkncUiMyYBBpiJRMFOqFcb+nfskOdzuLSFJJmSZykSQOwomCNmFkkmFkkkkkkkkkkkkkkkkkku7Qp05ESZSSGROzuchJhQObtn5lGvBGRGT6exWysuBGykJA5xi5SOImokUcIgmFkkmFkkkkkkkkkkkkkkkkkku1FyRkTpnOQkjJ3IzTJMIQZ+bRiaa3qLIpgyNhSUlhiTvHGjJMEs4Rpo4YRZkKZMhZkkkkkkkkkkkkkkkkkkuydIyN0jd06MkbnIzOoqObTrA9zZ3NLm8GjAySSSSTzWpJHrxnM9aN7JxC9eEY2eMUyFkDJJJJJJJJJJJJJJJJJJLsHTnITpJncjdEbkwvFnZtUZdTo+q06PEc5lsmSSSSSSYrl2YAGUykaOKOOtCyQjEDIWTCySSSSSSSSSSSSSSSSSS7BIzInEGMikSd0nCpSqQ2dvpul0KPL8jiwJJMkkkkkmFnmu3DiVnUuJgrUqdSJNDBCyEUzCkkkkkkkkkkkkndk6Zk7PJ1SKR0hJnRFKzO4NDTqy7HT9CeLz3PZcKSSZJJJJJIWZJKW1asXb01u7KFaCvWir1KUAhDHGzCKdknM5DhjdMLoReQylYHJowcRmn3pGdmTohRyEhZQxyavSb4YvLc3SFJJJMkkkkkkwskkkju7F+zbum6NC0devBDXhrwiEDJABWpjMaccggLQwqaZTIEihZo4JrD6qZMRIXRyJMIle6DoZsLnuXzwSTOkkySSSSSTMKSSSSexrbOpYMiMgYiZomCIRrwi0cD3LVcFUpGQJQ0gtSEnTizAAVmvoLSd3SZnRkk8mvuamTzODmiyZOkkkmSSSSSTMKSSSSQI9DZ2NC3I0YibunkJ0AIwrNeu1M2sNICjEgpQT2XZxRxRuMVSC3ZFMnJxZnEZZQfU3NHE5XHjSSZJ0mdJMkkkkkmYUkkkkIpKbV3djQsRRRkJtK8rmymJobeo+LlxV4lEET16hXCiMWMYRKvDTbRF3//xAAcAQADAQEBAQEBAAAAAAAAAAAAAQIDBAUGBwj/2gAIAQIQAAAA+DDW+36P3mh8fmeZz454pEF1ppdPStLiXWul1eul1VXpSpuhgfk49L6fovomh8/m+Xy5ZZQEKr00u3d1cp6a3d3prbdvQHTHQz8oVvTf3vo9QePneZyY5ZZypgdUitdNtLq72u9NL0tllCq6YDr8tlu9/a93RROHFwcmGGWcZ5wiqSrR1Wu/Z3del6aXpbB0KtHQwPzOG617+Gum1nz8uGWWeecRE5u2abba9HR09vpdBd3elsCwq2FMPzWEVrt81yd3VosMMspjOFLda9Guu/V3d3d2bab48F3daWwdhdDVgfm+E582l/Ncnf29LWecVpV6aXet1Vaa9PV19vTrXHwVdvSqoqmNugA/OeWMfJyx8zn6vQ7e73KHVCJmFMu9dens7OqXeGD0q7t6BbAtg0fnvLnn5Ty83z8+n0PW+wcTMTmFaXemu2mnR1dGHl8+t6VVa3VWiwdWAB8Fzxj49Xnw+dy9Hr/Y6pDbt0Nutdtujq35/JwrTbW60ttgxVTsAPg4ePjct0Y8Edv1/UCUxMRKCtuvt6u7qz8/nL16N7ptEjQyqAD8lrffk4sqZHV7PeomJUKYRTvfq6+jq6ts5bvXVgISBDAAPwa9evpzwbeXpfQKUKZziXV3prrpttp09fTQ22AAS1I0AB/OI66+wroqO/6FsSUS3el3dE5q6q9NL216uuwAzAAAA/m+JN9jXq7r7PoN6rQxgY3dzw8HJimx1eje/qfSeowFKAAipf8AO0U6nHTfq7/Q+k7atzzQDemmPj+VzZNXVUXZMr0vrPo9ABKQEpD8D5dajLNKVt6/d16Y69WvR3d+5yeD5HFz53d661VaOzHHp+m+t7ACEAEyfgXM4nDKR66bdG/0fGuLi4l1/c78Pl+flMabPq1qmXbeeD9v7D1rSABJB+B85nosxOq0229/0/EjHP1vrfU+Kww5uPXaon2PPlkDurOddf1nu9cpsGmP8G4kum85BPTXXs+m1w/JPrfe7cfQNnrrcwfbZcfh+X5fGqK0XLFfRfT9jYqoB/hXAPtM5pOqcGnZ6PX6eXl+74vxPV3d/R2a8/t/cpfEZ978n53Rau8JXpfXesJuqA/CuMfVcw21ZrVRXRp9B3eHzfCb9f0v0Xp0unql8/P5/kcOd6la1zZLT6z6HRN0B+E8x0a0iKKrXPaL1nfo6unm+D7f01fNePz9PT0MiHfRo+fQerjmJ9z6/rQhr8OxfbpnUFsc3cU7rp3v0PlvrvP+Mu9N29o3gKbV1o3qsXPZ9d7Iqh/h6NOu0STUm/LWSrTbft19zk/Ojeuhay5jOVVO9Hel3V24Pe+s7Jk/Ex326ZIzvOIW11vyx06aP7L5H4zuT1RjLBPS7100urd3ppptp6XoezZ+KuteiU89OC66ImTHa9Ku/Ty/P+3UzzGq6/T9Ps6ttaq6Y27vakc/H7nT+Oj6RnOAYFKIyTeu/Tl9Z+bYbYlnd7vtd+lUwbAG611uUiuLT8+T78Jl3yhhnilKYVWl/X/KfNUX3/V+/uNAMYxl6ba1MSpHf52zVrOA5ccolX09nf1ark8rzfU9f8+wv6b7brqlKYDAKqttnMzCQV8Ht0ZYBhlEYzr3ev6fXsIHPifE/cfnXlfX/dbNUA2kxorTo0U5zKSdX8NoqyxxmZfb7Pq9VQglId+T5nyvD+pdJI7KBAndXrqRnCQhOvix5ZxD6vV9buqZUAQpbd+Z853/AEDQ6GMQnV3tZnMwKS9ttvztTMX6fr+jqoFKBTEgDrk01hqm6330oUDupmUnd1dAfmajq9f1+wmTMFKUqRDktS1FPXfo2dXStoIQAAAH5p6HtensKJklIcxKdGUBfRvU5Zv1txgBMhCAAAAPJ72JEKZIbIT00fLg+zu66EKZZNMFKCEAAAAEJEilKZANuzaXcYdNxMjUKB62EoCZAAAAAUpCSISN+q8sH16gAZ8ud5iK2ZTAJkAAAAAJkBQD21ywfT1XKAAFz4YcGK6Oi9t3Q1KmaYMiamwy3BCSZMX19FBKAAAFyeZwYid3dvRXhE7p7a4wnV7Yz6yAIWNdnTTQKQAAAUT53lczAUKKiN6bOnnA0fTWJ//EABwBAAMBAQEBAQEAAAAAAAAAAAABAgMEBQYHCP/aAAgBAxAAAAD+gQjLyfgfh00/V+j97s6ejfSquozwyzzjHHDO9lhhzYxljjjGWWeOdxlCCUv6YCI8/wCD+CytL0Povf7+nffS3tU5YZZZxhljFaxz8/Nlnnjhgs85zlzlECDP+lWiOL4n4Dlojt9/3vS6Ojp2u99Cc8wjHHmwyzwy5ufLLGMMIULMrPKIJSn+j6Tz5vj/AIrn31rs9X2PQ6N9tL111pY4xMZoCePyfM5ssscssIlEDzxzCFM/0TYRh4XRjlVl606bd1emlyRnEqJjk8Lz3nnlljjEVMozzyCER/QO1uMPO9DHHN604xlhV3V72LHn4PN8vzeTDk7vXnGc8MckLIM85DMUfv3XdZ4celmWBvRlDdNChCnLDi8/zPM4sc/W9hZZxljlm4yTmIRCS/eu/Tl84T11uMfOlqZKdaXdUoxw4vM8vi1WXb2RGWWMY5Ock1msyEH7n6GnJ581da62vlVpd3pdEZ5xlzc3Pz8nBx9f0fdz5YxOeGEZwGQTioIQftPbZx5qtL06NfnMm2SpkSUxhzcfB53L3/R9ueHPz554YykyELKYWbR+zXHU81C027387yjp1daXQNY8nleX5Pn7+32Ec3Hx5RA3ThtREqUH9HRy8vRnyZoevHw3pVVTqqqUow5PO8/g8/DfRTjz80g26abEkkB/WUYcXIY+XzIXm3bHV3YpjLPHLPm5ubh83kySSzgtjpgNAAV/YhMcnHHF4fnzXnIKbsURnnEJVoZ555545YcvB5eNMNCmEggd/wBhsMsDDzvA8o8zKZznahqZnO+3t0tIAEjLyfi/n0DqqYlQgP68cirSebg8DyPD44jO+ynSnHLp9XpmUIAG6rTn+M+KxAHTGFMP6m5eXXfe5y5fI8vHOePZSTyedyr1fe1kAAEDC7fz3wHmAOwAqg/ozh8+XRMZZoH8v0rp6OzoufF7OpgAIAAaq74Phvnc2MQxgf0JxcOcpCBMuvI9vSL875TxftML16dtdHHB3jGIA0uPmPleCnMhII/eeLmzkAAG9/J5r+0jxsL4TOefJU/J+I6PQ973+/paBPSr8j4/zCBxmkj9y48MwAAB0llHN1d3l9uucKnz6fP/AAFv7Xt4V6PuMAur5/jfAbUZ5pn7VzYwAAAwGBw4+1nUXz8HHzc3HwM6vS9X1dpQNGmlP5b5PInOQP2bmyQAAAwBil7XHhR19bUodWS1VSyHe9a+V8F5zKIf69hmkwAaaGmNUZd/iHckqqhjBMaGhVrWmHxPzJeV1+sZQkAAgLKBol+dHqRN2wdDYDAGMZV14nwXl62fq2cpIaB02wG2h/Ke/wBWGrbdMGxtpoBpyox5/P8AI+axP1yIUgUWwY2wbR5992Y3bB3nz4Y45TnGaUzGWOEUdfq/I8X67E5sdNjY23TYCfhe9miqKw4uPGEEpSKZjLHCXTceth9jCzpjG26oHYNtrwfcUOnx+VzoYJKCVM58+OMaXV01H3kEg2VTpg6nDGH09t+fl6Ek+HwKKoSdTIpjLPnwV1erdOPts5KY6obZx8HHzJtzfve9897sR8zgNJCBypDLDlyemlVdVKn7SZKoqgXF5fBFVbbqoj1/S9NfK8pSCJliEsZy58y9L0ZTYvsJGymuXyvLwu6sp6XRM4+17PJ4A05JkAULHPCJ1qtadEc/PzfpYA8fK8fjqqt03WmttCie/PnuamZz5OXLNu0ZTV02sozzgD9ZRPD4nlRdU7pt1prQwozWiLU8/Hy88ZwiIAtgAAAfrXP43i8A9Kq6KFd61EPfa5x4+XOujVeDyyiqAAtgAAAH1vi4NuquqpuXdLHI6+xeZ5nBAy6pVURYAFsAAAAOobod1VWwnn8/moy06+PLbTRSaVolhkqAHTAAAAA3dUN06ulzcOXT1x53MUAdHo647zTy5Es5AdgAAAAD0qmN6AufDp6lxcOclMAK7ezr9TpOLky4+acwbNLgTl7aTeSOriCg0aWu+Pn8chLbAAHff7vr7CWeOGayI6tK46McurWpnPm6K+dbFVvpXm8U0gSpgADsNPa+h7M4a01esb6cGWavk6Kuuc4s+k//xAAoEAABAwQBBAIDAQEBAAAAAAABAgMEAAUREhMGEBQgMEAHFVAWYBf/2gAIAQEAAQIB9T2Pdynacpyj8QpNJpNCh2HqPnPxH0PuO59j/Wcp2nKcpXxChQpNJodhQ7DsPnPzH3H99dOU5TlK+IUKTSaTQoUPUfOex+yf7KqdpynKX8QoUKTSaFCh6j5z8GunHxcRbI+M+h/oH2VTtOU5S/iFChSaTQoew+PGunFweN4vi+IIfheF4YieKYxjqjrjKimMWOPHof6WfhNOU5TlLo/CKFCk0mh2HYUKwEhviDAjCL4YhiIIgieIInhiGIfieJ4ghiGIfieL4pjGOY5jGKYnhqgmCqCuEqKpog/0h8blOU5S6PvjUNpZEdMZMRMFMBNvFvTbxBEEQhDEMQxCEMQxDEPwxD8PxPFEXxvF8bxfGEYRvG8UxDFMXxfEMPw/DMIwlQVwXIDkByAuCqKpoj+cPjcpylgs+Am0izfpk2f9MLMmzptCbUm3C3pgJgphiEIQhCEIQhCEIYiCIIoi+L4vi+L4vi+L4vjeP4/jeP44jhjg4PH8cxvF8bxvF8YxTFVFVGXGcjOsPNPodC6P84fGunKbYj21q3eD4fh+J4oi+MIoiiKmIIiYgiCIIojCMIwjeMIwjeMI/jiP4/j8HBwcHBwePwcXHx6aaaaaa4rO/IXVOqdW6t1x111519x1a1E/zR8a6xDjR4zEVUPw/E8Mw/DEURRFTETFTFTFEYRhH8YMBjg4Axw8PFx8emmmmmmmnHxFrj1rO/IXS6XlSFSlS1TVTl3BVyVclXNVxXOcmOyXXluqXtR7n+SPjXTVQ0xWYsZUUxvH4OHh4OLUJCQkADAoDGOwGNddddNOPTTFbl1T6n1SFSFSTJMozFTVTVTVzlz13BdwXcF3FdyVclXE3Az1TlTVSubYUP5w+DXjUwmPb2obUdJo0aPoU64TQIIIoUKxrqE6hOtZ35vIMkyjLMwzTNVNVOVOVPVOVOM5U9U9c9U5c5c1c1yauWuQp9TpcK859BQofzh6obZhotgtX6s2022FBjRWmVNLQpKgawKFalGqUhIQEhIFbl7yPK8xU3zlTzPM83A3BVwVcVXFVyVclXNVzVcjcDPMwyjILpWSaVSgoKSoKCgQfcUKH84UKHZIjMxYrUQRfD8EwI0RiOlhTTjS21tqTQIoUV8vN5HlGX5vnm4G4KuBuKriq5G5KuSrmq5quhuirobkbgZplF/fOMYxjGMYKSlSVJUFBQVRo+woUKH80UmhQ7MiC1EZYjCP44jiM3FbZCFIcaW042tK0UlSnHpLlx/ZG5G5m5quZuhuqrsq7KuqrobiZ3l+Ry7VjGMYxjGMYxisUaNEqUtSlKUpSiTWNddcYAH89NCh2jm3VCSwKzsFoWg1hSVtuNOIWlScSFTZMu4ftP2f7HzvK5981jGMYxrjGMYxjHbOdysul0vF4vF4vKdU6pxTillWaA10KNdcAfzRQoUDlo25cNbDhd5eQOodbdQ6CQUrQ6060tBTKRcUTkBITqE4xjGMYxjGMYx2zvycnLy8vMXi+Xy+Xy8Xi8Xi6XS4VlZUCKSAnXUp1x/OFAigcoNuVDVHKqNbBaVodbeQ8HKUFocbdZUiQm4IuCQAMYx6Y7Dvtvvvvttn1NGjRo0aJJKioqKs5pNJpFJ7GsHsf54oEHINuVCMcqo0axlK0rQ8h5DoUQtDjbrUhFwTcEgAe+dtts57Y100004+Pj4+PjLRZLJZLRaLZQUFJHcUikUn0NGjR/m5BCgdtrauCqKTR7YxQWlxLiHUPpdJdU4p+p6bij1z3xjXXTj4+Pj4uLi4eDg8fx/H8fx/HMcx1MKYWyttSFJUFDuKTSKT7n1znOc/w8UKzttbnILsV1KyCO+MBSXEuId51LcStE8XIHtjGuummnGGg1xBriDXCGQyGQ1xcXFx8emmhQUKQpC0LQ4laVhdKo9xSaSUnOc9zROSc5znOc5/g6aaaFJEFcF6M+y+hysemKCkubl5cp2VOfnr1CAjjDYbDQaDYaDQaDfHprjAGPiNKpVLpdOU5S6XSqNHuKSQrbbbbbbJOc5znOc5zms5z9zj4+PQoKGTEfjSWZDL7boOMemMZdL7z02VLeUEBAbDYbDYb1x8I+HOSSpSlKUVlyl0sKCklJGOwIVtttttttnJOfq5+lx8fHxlBbKGXY8qPKZksyG3guj7ayjOkPyisICAkD58emSSorKysuFZWpSiorpYUFJUkpKSCKznO222c5znP8nj49OMtlstqbQWJDEpiSzIbfQ5nuKHaYLgl5IAoemc5z6D2zttuXC4XC4XC4VlwrKyoqJVRohQKVJUlQIPbPbP9Dj049OMtlpTSmtW3mJLElmQ0+h0HuO0urgHgPXPwChWdt+TfkLhcLhcLhc5C4V7le2cmjRo0aVSqVSqVR/r4xrrpxlstKaLSaZeZkMyGX23Uq7ipVTw/wBs59c57Z233335OTk5C4XOTk33222znOe2nD45imIYZgmAYBt5t/6828wPB8Lw/EMUxyzx6/zcYIIKSjTRCmX2ZDMhp5DlZFSqn1I9c5znO2+++++/Jyb7le5VnOc59MBsMJjJiJhiEIPg+B4H6/8AXfrf1n6w2s2s2s2s2s2s2w2s2s2tVsXbXLe5EKf44rHoaNHtjWmnmpDMhp9tzIMkzqkd87bbbFxT3KHN999999s/GAlpEZENEFEFEFMIQxD8PxPE8TxPE8TxPEMQxDEMQxDD8LwTAVb12522P2uTbHomP4orPoaPbATqU4Q6y+y+y+26FSFTVSqKivffcul5T5fDyXUr2zn5CaShqOzDahtw0RExRGDHBw8Ra4+Pj0KNSnQtlvjLXFw8HjmKYq4bsGRb5dsl25bf8LPbOc7bE5oUOxo0aStl9l9qQ29IVOVKcLpd5NysqUpRymkUgfISVFVNtsR2IrMVuOhhLIb00100KNNdNCjTTTXQo01CcYrGimHYkmDMt062PR/4O2wTwlsjO2c5rOcnsaCmHmSy2Y0uBLtS7Wbabd4Hg+EqGqF4gjpbCca4x3zsXC6XS7ummm2I8eKxGbYS2EJSEcemmuCgpxjBGMYxjBGMVnOQRRS4xIhS7dPtcqFj76aZjsxUw1QVQVQVQfB8HwvD8PwfB8AW1NqTaWrTGtzMDwHre9al2o2lVpNoNpNpValWtyzLtaoJilnTXUpVRcLpeLxeL3IimW40eNFYjtNJbS2Gkt66a4xjBSU60e+cmiT3JrOQpKhRCm34ku3z7XNtqkfejxmIzEVETxDCVBMD9f8Arv13639b+tFtFsTbE2xFsRbG7c3EEdcVyGuEqGqI5GcaidGufjf/ABY6cc6eX0+50890w50irot7o57pB7pd6wuW1xCnS8Ft0w3FYixo7DTSGkNBsICddSKwaxShRBrFGh2KaxgpINYwkhQrBS7HlQJ1ruFqdY+7HjsstBsBPHweL4niCGIXhCCIIgiEmGmMGA3RWpSlLUVKLlWhuO4acATqUqSWvCdtTtkXY1WMWI9L9UWKfbDbXY0aorEViM0w000htKAnGMYKSk9sKBNGlUKwe5rFEUqsY1IylSTjCm5MKda7jZ5MQp+20lFNBtIAoACgQRQ7Z2Cttt9ysrK1KUrYlVT5c78nWX8ks9Tf6b/Vq6xV1mnq5HVv+mHUSb5+5/bwrn1T1KzPZTO6NtP4tH42R+Ph0Z/nxb+IOiYJSXgTWqkqTijSqzlVZ2NY7kY1101KSNNU0ntgh2NNtdzs0y3raI+yik0yGwAAkYUQpKtwvffcLC+TfbcqVSuyqFGruzd7TDko6sZ6t/0qr7+4ROTJTLQ/ypStm73O63oT+k77aup4PVLXUab+Lx+w8zyNxCNrXan7ZcYXkTbo51Ki9ft1TStR2Ku2c+p7q7YKT2CwuiKKZdvuVmn2lxhTePropAYSgCkhIIPbIUlYXsCFBWxXnsaNGlK2zJF0i3RsR2osaM1CVDEduLben7haJFy/et9R3Va7Iq0t2+3tN3ZN/R1K11Mnqr/Wf61vrFPVz/VSOqP9U/1ijrRzq7/RJ6gnRJ15t/5ChdeM3UHQq7bcu/IFEhWVK22KlKKtgttyiOz0a42e5WZ2Otsj6yQ0GUgAJAo0s0eyaFZrOc98qUqlUaVRJM5i7W50eWi6M3td8t9y6Xqbdb91VDkXdpK4k0PpRKiRa8cwFW0wPCVGUjC30Sy5zB5t9mmGGovU/W/VHUPZuSx1Ax14x+TGPym51/aL+tsUaQpSsZNYoBaF0KUgKaeye2VpnWu62OREcbKfqpDIZAAoAUsrVuVCkgds5znOclwqpYFKQtGFtz7fOsD3Tb9iNvcQ1KidcSOo9PIWG7Q5YnbWtHkxUsQTBKOUPpeB4fANpVZV2NyyLs67a7GiSbrJkq7Zzmvx901f0awurYX5JgdV52CzQ7KShS1lIBrjVTbwJ9JMO72KZAdZKfqJDKWgAKFCnKXQ7JpJz2JFGh2UrbGVrQtThBaLJYNvXaXbE703J6WldJP9Lrtyn2pMNVvStqRGnR1ptjdris2lXTzvSj/RcnoiR0o7buZF0Rc0S0OJSGvGMMWa+tBnxPBMIxS30lMZked5pcLcS4wvyHZOt0NqQEroN+OW+HRVFGoUFds043dbFcLY9HUj6aKYDYFChQp2lEUaTWQpKsmh3K1LFClqKgA2hJPIFrdLynsrUW3I0qx3LpyVaGZVvvEadmdGkRrW1ZkR0Yzk0tDsN2xP9JSeiJfSs1hN5T1I11Ux1bduq7hK2DwlCamd5P4+ukvp9zo57otXRi+hXuiFdHS7LZhFHGtHG6k0VGmGyF0XDTbtCjWan2m62KTEW39JsRwkChQoU7RTglFGk1jKaIrK6whOq0oAKnVSELcU2pVKKEkca0rAcWzNtNy6deiQbnBnuJmRoCLMY9KCqypRU7IkXyf1nK63ldROTlrUp1PG4hTeMejL0m/tTYcNrpiL0vFsaLM3anFPPhZS5L5WpXH5LTrhUDSXApt00e2RTzF66bm291n6LYjgUKHdahSwabpRSpNLKHMlYVqlOVupUsgqpKHG9hSlLppaJDr63lHVKn6cROtM+yRJVumSWmhZ3ojlOUFSH7l1Hcer5V5NJSqkx4/TrXQivxwx+Onfx9/5p/5s/wDjJr8ZK/G7fQh/HT/4tX+ND+Nz0QelGYCZTFyPUqOo2pL8oShJW+6tctKnZTjq6VIhnmStNx9BRq79Pz7TIikfO1TATQodiXXErUaSoqxstSEFvQqDhdUttBNGkhdFxKVUSQXWo6mNHKRS1KXy5ksXOzQXW3natci3vIU8JUu/9TzbmmktQ+n4P48j9FotBYbiPjmSZLSlvhdJefD8NqoKJC3W3XHW3Ykq3PW1fTD3TrUKHNjXPZoyWeBSmEYkspCUS2KZcV3ye0+33awy4C0fMxTQFDuouFJ2ypKSVITxhZUXNA2QSytdNnLRecU0aWtdKb08iO6txQyipRS04zTomW2O44uE/aZDK50rqXqCRJaatvTlq6SZhcQUVOstPSGXRMD6k06DUZTbYbbpdufUh9tzfWsPTGmp6eJMeLDmlCIjr7mfEAehqqRLeW7GiS2XzWSNqcRdunp9reY+WNSBQrOXC4QrkQTQBVyijSpDay87QUgLaKG1IWinXC3h5tJTFadKEvsvTkuShRXiQ+UkoM6E4pp6ySmZHUl6uEqNH6f6SiWlsvKjok1EUkhlqQ+0h3jaEhK2WafbWy8zFXzKpmpERweKqUumAqShby0BKgZFKbKUqCo1AZUDIBXSCe6iaCrlY7hZ5MNQ+OKkVkd5C8oaDWqneVxxinHt0toOW1uRkgRCFnC3UtxjOj8qQ9TUeHNkO6KeQ22x4y3XFu1hdYuMMuWWXIuXUFyab6W6faDlBtb7Kng7TShBypMZ0xYqpaHGNpdbpUK4V0lHOyl9nhMYxPBELwWY7kREZ6GmAtpVu/XMwHYi7c4z+rVbRbERaxnNKAMuFdunpdudY9M+sVPYHOXEJYWvlCnFtLQ04WyhaVNLU4pZW2y04p1hthpunlqalFDjktMRLwTHSi3PW821NqYhPw3mHXCgraXIavEe1zJ10fd6TsseI0DGwtt9sOPSUhUieUOKYbU4lDLilMuvIVqiMpCYYaxR9z2NEdj2PY0aIo+hHbPZQuVhuFllW8j4GAaHfOdnnNt+MNqrLzrSajrec45y0U+txvjbemLUtQmREW1EUUCayaC3HBLKy6VGnYT0RhSqvcPlem21rpiCtthDcsrdpKo7ixxIf41O0l5xtTYaW2mOB8xGCDWMEYIIo9iCKPY0ax2wAalW64dPXKwOte6aznbO2zitw4y/tIKacp1LqkPQmg2wd3Ji3JiI4hwham457KUh79pzqrVVKPkxQ++pPAB5qXX4xp1vqSDz9Jx7SlFSy+XGW5rymlvzBBwle4pTLMTHfGMYo/BjGMEYxjBBrBGCCMYKSD3Jrbl8jzXrndZ64k61+2R2JyVAyENRHFMh2o5mpYSqoSrjUdSCguKVIlRW2MamQu4mUtD7cRSkoTIUS2UHXYpKXGdFw5QclIkV1Hb5LfSCbetBmpkTCEPKpp56UoqQ0lbTcb0xjGKxjGCS4qQZhuBuZuyrwb0b2q+m/G/nqH/Rf6L/AEX+h/0J6g/f/v8A9/8AvlX89QHqE9Qr6jX1MrqpzqtzqlXVDnUbl5cmMTYdzuXT60euc1nIqS7tIoNLbdDDy6KnZhkOCA6qD2NArnvuNxA4oJjuspSpHjJj65WtcnyvI87yecuqpyG4228611PA6VdtzrCy20hTikMR5cfyFuoQhk1mj64wVqlOXJy7uXx3qBzqR3qhzqhfU6+pFX9V7N3NzM/zDKMgv8/Pz+R5Hk+V5XlmUZBfLxdK8k+yHLde5EK4W3vt32rCw3SkW9yQ27NnJaLVCTkLcigJVJkaxnH06KUkeKE7mSZBdae5VKKsLbSgxuNxvBoSdn24i+t7d0zKtb8VxFTGUOVsUrhtxuxo+mKXIduT95k3+T1M/wBTu31dxU+Vd89sYxjGMYxjHoexo0ex7H4WJke6zbApNbZzk0KU43QqYoVLi8OzimJiUNwy8uYpTLjjpplS0COVGUl9ZVXEEFCWEsFGuD3wUqZWy5FwyvivESMbLKgutlxvnDb4bQex9MUp565SbzL6kldUP3pcjvms9iMYxjGMY9jRJ7GjRJo0TnPrjGKztb7s83OtYrNYoVOVrJj8zpfKQtbkZDJlGamMheEoDXjoK31PlxDXGlBZSjHwmj2NYcYSzgjrOD03Ntz8ZwU+ylbbepo0fRyTKus2/wA3qeReFL9MEYxWdtts7bbb7bbFWds5zknOxUSVZz3znOds1isYbdi3sLoUVAlyXLWHFqhIWWUodkC4NuuqQUrwljkMjkRWFNJYS3j0x3PbGMYIKSnBBSUgdc2zpebapERxsyktMhJo0e7siXdbh1BP6jdlds9s5znbfbJ74IxjHqaznJUVFRVnOfXGMVjHrjXsSayKkuUy03HyuXlKcUstRgnZTpoIaTxpb98YrGMVnk5ebm5M4KSnXWfH4rNJgvMrNIFGsYUqZcrlfrj1I7IrPbbYq229M5znO2xVtnOc0aPoaNEfWJ2ySO3g0uWXjKQ48oU1RayXi4hSUcSWQPgxjJdVMXcV3RV1XdlXg3o3r92m9Iu6Lm3OS9jVSPyFbum5tuejLHq+/crveOpZU/0J2275yVbbb7Z9D65znJO222xUVE59MVjGMfCaByKyl+YUNJXyMthCY4pSi8K0S2Gk0FZ9sZU+uc5cnLo7d3r0/wBQPdSOdRLvqrsbj53mi4N3hnqGL1FEvMe4Nu69Z2rpuXan4jjR7ypV2vN56gJ9CaxWc57YxjHsfXOck0aNZok/UxQOcqc4Q8mg+yVMIRyl8uJOjaAms0Ow9CtUpy4O3N66yL2/1G/1K7ely84+DFMT7f1Db7vFlTmLtGsUmE4wrtKlXq83i8/Vx6n1NEk0aJ2z8+MVnPcl1TlOJabQ2GA4F8iy2niSgCs57isFS5Tlweuj13k32T1I9e1yflxisVBudmvkST+RbV0rOt7sVSakO3q63m7/AFM5znO22xO222SSSckn4sd85zn1xR7PlKVNpDr6XEJ1CEshPsABSn3Z71zkXWTfJfUb13U79DHoRDmdPXzqFm0uWh6Gdr1cuor38+clWc+x7msGs5ySTnOc/VxWRShS15UlLaWwB74ouuTHrk/dZN4l9QSLyp358Y9zRFtnRJ95b6amW8z5XVl6Ur1z7ZJJ75znbOc5yayTk9yckn2x9TFE5cCG0tj4S6uW7cHrlIusq/Sb87L+3g9rHc+oK6UmW6TfbpdJnyZznOc98YxjsfQ1mj2Jz9nJXk98DsOw9Ctcl6e/c3rvJvknqB65FXyZznPYfIaIbXMesciLcOpbnnvknPfO2c5zntnOc5znOcntk0ex7H62eQu8m2fhHbKnnZr1yfukm8Sr8/dFOfTxQFYxj4MENORlx7pdJPbNE0O+c1nPYnbbbkLvNz+T5Jf5+bl5C5yFzkLm+2c/Fnfk5uXl5N8/EO2MAErkOTpFxk3SVepF5ck/YznOaPfPqaBXTclxffPtnbOdipS1PKkGQXt9ts5zms52222ztttttvvvvvvvtn6WAAKK1yXp8m5SLxKv0i4lf1x65znbPfPc9nB65B7nsTRJXyLfU5qI4h+F4njFkjO/KXi7vtn+DgDWlPOTX7jIuku9S705Kz9HOc9h3FZznOc5znasepCvYnIOc5zSlKXWgbA51TTPVNVJLhV/KwVuSXp79yk3eXfZF2W79HNZ9c5BrNZztttnPYGj3zlVZ233K9grbbbbZS1uLd5C7yZ/ovSn7hIukq8yr07NJ+hnPpnOR6Cs5znO2cihQ7hR7ElwyFyjKMkv83NzCR5IlCRzcqnVL/rTbxLvsi6re+xnOfTOdtttic9hQ7ZrZTy5K5Re2+QKJ/rvTyr6OfkzWc7FZd5ubm5Q6lYIO/It9cku598YrGMYxWMY/wCGz8+VOKeLvJtmsVsHEvh5TynirtjFYxj48dsf8lsXS8XSrsEhlLKkqOe+c+mfXHfGO+Mdsf8AGZ7lRcLpczWEsphohlt1wvFXy5rGKIxjGMVgf8fnNZK1OleaCExm4CIGjj7sxT+foZCgaxjvpx6a64o/8ZkrKyqg2iI3BTFpcty4OSyv6oUF7d00msa6cZbKCgo1xj+Rj3x9HPbJUVUG0RW4SWS4uaueqSVfayFhVChWRQ7EaFst8XFxlso000KdcYxjGMYxWNddNNca664xjHbGNdcYxjGMY7AY+mTQQmM3DEcrXMcmqdz9/KVJUCKFCs+mMalHHx8fHxFvj4+PTj00000DemmhSRrrrrrqRjATjXGMYxjGMdgMfRzWqWURUsla5jk5T+f4gUlaVA/JjXXTTTj4+Pj004w1x64wRjXGMakY1CdddcYxjGMYo0ABj6IQhlLWy5a5qn8/yMpcS6lwK+hjXUpKdEtcZBGDRGuMVg0awE4xisY9ldgPoikhApxa1k/zQUlJSR8A+AeiQAaXRo0fU9zQ+A+qqNCh6f/EAEoQAAIBAgQDBAcGBAQDBgYDAAECAAMRBBIhMUFRYQUQEyIgMDJAQlJxFCNQgZGhYGKxwQYzctEVQ1MkNIKS4fAWRWNzgKKjsvH/2gAIAQEAAz8B/wDyyMaNGjRof4rMPKNGjxofQ6QQcoOUHKDlBB3mPGh/hoxuUflHjx40aH0ek6TpOk6TpOk6d/TvMPKHlDDDynSdJ0nSHlGEcQ/wSYeUflKnKVeUqSpKkeN3jlBynSdO7pOk6d3SdJ07uk6Tp3dPVdJ0nSdJ0nSdJ0nSdJ0nSdJ0h5RhCPx52lUyqZVlTlDyh5TpBygiRPlifLE+WdJ0nTu6TpBBy7hynSDlOno9O/p6XT0x6kQRYkTlFg/Hixl9xF+WW4d/SH0Ond0nTu6d3Tv6en07+nqRBB3D0hFixYsWLBBBBBB+PXaDSaDSdJ0nSdJ0nSdJ0nSdO4eiPQHcIO4QQQQQepEEWLBBBBBzgi84OcHODnBzg5zrOsHOLzi85f8AHvvRBpL2ggggiwRYsEEWCCCCD3ERYsWLBB3CCDn3dZ1nWdZ1nWdZ1nWdZ1h5w84ecPOHnDzhMJ/GTyj8pUPCVRUGkqaRrCMJp7wIoiRYsEEE6zrBzg5zrOs6zrOs6zrOs6w84ecPOdYY0aPHjRoYfxotL8ICNoOU6TpPNtLW0lhOk09WfREWLFiwQc4OcHODnOs6zrOs6zrOsHOdZ1nWdYecaNGjx40bnD/AlzL2m2k8u06TpOk6S3Dv09C3oiJEixYOcHODnBznWDnOs6wc4Pmg+aDnBznWdYecPONzjypHj840P8G+abTaeX0BylvU27tJbjNd51n806z+aDnOs6zrOsPOHnH5x5UlTnH5x+cPuQggg/gH7yCwiaRbRYsWLBB6ogS14VbeNzjypKkqmVOcqc43OH3IQQQQfwT94JoJtDb1A9R5ZvPN7qIPVH+CPOJtNpp6m8Ho2nlm81PuA9Ewww9x9Uf4E8wm029K3pD0dJvN/VDvPuJhhhhh/gXWbTb1B9EGDuEGUzebzX0z6/p/Bhhh9DaaDuBHqz3X7vLBrN5rD7kPSEH8HWmg77+oPoWms8sveXJmvrRBB6A/hXKZa06+gD6u019qXvrMx9MQQfxCVnXu6+sIBhF4+eO38WMp9O/p6Gbzz/xcRCPSv6Whm88/8Sj1bL6V/R0M3nn/AAUwxo0MaNyjcoeUPKHlDyh5Q8o3KNGjRo0ePG5Q/ixHoj0NDN55/VD3cwmGGGHlDyh5Q8p0nSdIOUHKDlByg5QfLB8sHywcoOU6TpOk6Q8oeUPKOIR+KEeo0m88/qB7wTDDy7ukHKdJ0g5TpOk6TpOkHKdJ07uk6Tp3dIOUHKDlByg5Qcp0nSdI6H8Vt6F+/eeb0h7xeE93SdJ09AQQQQQQQQQQQQQekOU6QTpOkB4TfSEX0jKdfxQj0dJvNfVGH147ry/d0nSdIPexAYOU6QG+k30jUz+CMY0cRofWERpUbhKkYiEjaNfaNHlaVpV5Spyjco0eEerEHo3l+7pOn4CDAeEvfSb6R0O34CTLzpOk6TpOk6Q8oY0ePHjxo06TpLcJtpBymm0vwg5Rflg+WfywcovKLylOUybAXlT/AKR/SOP+W36S3wmWh9beX7ttPwQGAjaXvpL30jKTYQj3/pOnf0nSdJ0nSdJ0nSdJ0nSdJ0nSdIOUA4QDhNIIvKDlByg5QcprYLcztHErmqVVoDlbM0ut/wDiD/8AkAmIwnx3BO8xFlGWYkn/ACtpidScP+0bJrhdT0lA2X7PrxbLMGz6Uyq8econMc7KOHWVVTP4p/02uZ2ilhmUlthadrq2UIrNyBnawvbDluduE7TViPs1T9JiFvek4t09C/dt7ufcQ0vwl76QgmwjKdvfukEHcIsWLOneOU6dw5QQcovKLygixRB6ImkpfbM7cNpTyCxgiGLFicpS4gTDk7CYTXyrMGw9kTDG1ukp5xblKfiNpKGSppveYZ6Krk0FtIlPanraEYipalpec0MSnAW7tvwO3pAwMNoDfSb6RkJ0hHvlvUiCCCDuHrnw/mUztHs+/hJnbhm2nbmLpXq+Fw2W0xzAMzA8ukxYb4SeJ4TEC/kFv3la3sDoY+5pD6XmrFqZseuolEplOYHgZhyV1N+KzDZ/8zT+n1lLMw8XX9ojHKKv7wHar+coDAmoag43iNVPmFphWYk21mHxddKNJQWb9usevigqte2+m8peBmK6yw0/S8xa7Of9p2glgG/PhO1KTAZb852irW8K8xatY0TKmoNJtN9JSIJ5SifilI/EInOD157j3GGHuMMMMMPoq4gN9Je+kemTpLe/aejbu17uvuOZDaZ2u217mDCKRsvCZLDNqOHOUSdx5v2iOLX2lEgSgag1+kp1Htm24Rb3DaQ62b84+Te195UZcoOn+8dwPNoP7TyZs+/DhMRhVYJWNuUxeJxLXqGwmKXaoY2H7SZ6r6Gnl/WYVsZmzgzACgouNp2e/wAYnZxHtiYA/GswZb2hMF4lswmADalZgM1jlnZ3n0W5nZrUHWy6zCtSZUqbGFMKlRcR5uQmMw2BTE03vdblJ2wlKnUNLytMdginj0bZtjvKdIjxUKX2vKD2GVrnhaYPbNaUAQC4F4pGhv6A7xBBB3iCDuHoW7hL94YaxXB0gIOkemTpLe96+rtD3H1I9EMsWxNoka7HiYdB+sGYDhKbMTbaUwh01gzABrfzR2uEvlO4A3mKxCM1bMtNTZEAsSf9pUw+V8+omJpVmVFuTMdSBVlYC+8rOoU3lfFLpMRmMxQ4TEqb2tK9J82sxagamYtfiO0xQ+IzF/Px+gmIG7/lsJigb5zp+Uxntl/0lfN7UqnQvYf++MqOtlrbaA3mIzm7ne1+kZ2Av+V5XqVERW8uxXpKrVPCOtL9JSxNQ06gBo5/0A1nY2MqilUpZrOMlTewWdkY7EYdrJSxFNjlb4SonZP/AMP1O3mwxFZgfDT4TrYWHWY5sW1SuWyodbfD0lfD1rMpNOdi4m2Z8pnZlYeTEL+sVtnBhA7jGhAhv3mGG/ee4wwwwg9wPoJUG0BB0jISQIQdu63vGvpaQQcp0mvrrS81hhIgdTPaM8MwC4jK220Zbm35R8pGU69ZUxGOo0yu516ykcG7t7TPlPQcphMFhH4ZTpMHUPh0zwu0WtWqErv/AGiilyJjq8p/FMGw4TAtymE8K4tKGa0w7SiRFjDaODKt5iON5iVN9Ziybm/0mKz+YeUSpoWOltJVW1zbTSPe5OVgNOssHdLKVWxB3N+UQUa1WmuanYKxbgTEoU67LmrUSoQVRoFZucbDpWp+IXvlp02QXRr76zJicJglCCjg8NmKX0LgWEwJ/wAJ4HA0lU16zGtXa2oJPfiKfs1GH5ztej7OKf8AWf4gpf8APvO1F9ukrSj/AM3BfoZ2WmESrUw9VTUF0Xiw5/Sdm9p0Q1Kplb5HNjLcO63cL95M6TX0CTt3Ed1/QVhYxHBsIRcgQqTp3W9/M6wd2s19RpNYT36d9xA4OkZmNpV5GYpTpeY5BtMUnCV6VRWF1ZTcGdq0lOTwgT7Ry7/lO1MYgD1FIG2kqXzE3MqZxbSeLq7E3iuLgRwNBMSkxVPnMRlKkmYhqnGYplExw4GYtd0MqDdTBxlKYc8phjwEwzcBMOeEpHhA3WOx14bSsXDHS0xbVc5FhfVeDTHPdACmHL3elsPymPFGng0ztghUz5eIMq1cZjH181S0Zqpvw09Ol2//AIlw+HrtlwtJWrYl9rUk1MwuL7bx1XCC2G8VhQXlTGizEU2ut1+k7ewdguJYj5W1H7waDF4T/wASaTsDF2y4tUb5X8sUi6m45ieaad5MIlopgtBNbdwBglx6NOsp0m5CxkJBEIlvd9PR07uk6Tr6Nj6ZMt3a915r3X4Sm3wygeEonhKR+GUz8MX5ZUTYTE0eBjroYfE3ga14lhEPCIRtAL6QBtpTLjSU2UaSgw9kTDP8AmGb4ZROwlQezO0qfs3natH4DMdT9qmY49oGUjxlFuMpHiJTJ0lPMRvKZ4Zj/SUDo/7Tsf7VSvQUhgeHGU07YxagWAqGUj8UU/HG4MJX5SuPgMcfCZi8FgP8Q1qWHz3wPgs//T8VrXlZQfLH4oZSO6zCtKJ2edq4Jr4bGOn0adtUbDE0Kdcc/Yb9p2R2hVWn4Vei5NvMt0uf5hEMoruZSHESlzEpHiIg4ynzlMHcSnfcSlzlPnKd94q8Yp9FKi2YRXUlRHpsQVhEt7tp6RvBzg7z3m/pazSW4xjGjGWESLAeEtBNZpOkS2olF/hlN0OkNzYStSN7StRM21iuN4HEuJZp94Jos8voCUj8Mwr/AACYF/gE7Oc+yJg+DWiUvZqzGYUnz3mKXjK4OpjLxtKOu31MxaOhpW8jaGPicXUrNu5uYecccZUEflF4giUz8f6yjR7VxOHcKVxdAprtddROy8W4atgaROW2vkM/w7fXCFfpV/8AWf4WVcz1Wpj/AO4Z/hhz5Mf/APyr/cTsgg5cfU//AEb+kwdP/wCbW+qf7Rh7Pa1D8xaY+hgKWF+3JUSriGqWRS3nRbcONp/jLB1FODZ3S+qZHZD/AOYSvicJSfE0PCqlfMl72MqKxGXSMW9kwgr5TPJH+WNfaNY6RnUx7kR1YGEkTw1uIGHogyjiEOmsq0SfLpGW+kI9109I3mk6+jaX7jb0D3dYOXcs6TN3WmYSxhJhtDeaTpBliPwlKoNpa5AlfDvpHUgEwPbWB0msy1BNFnl9HSU03Mw9JfaEpITZpVPsmY+r8VpiX9pyYYTwj3lXheYgjXaMIYfRqUaqVEYqym4I4TtTEsGqYqoSOs7RqH/vjr9WMauPvO3DT/IzshwC/bpe+mlp/gwNlqY7Flv9VtvpP8CllRKlZ76X8Vt5/hhQfuH01HtG87LoUvHo0SCPlHmlBlIvXy6HjxngotMK76aGUcit9/ztaIKfjL4jW+HjKVRbWqAc8sUOR999bSjSuPvD+UoV2ZgXFhtMI5yh6mhttEpg2Dn8orVyfONNrSm1vblH+f8ASU81rv8ApKatm8+/KKwFvQE0lKshVhMl2QXEZL6Qj3kQXmkN+/WCCHu0jQkxYFWC8zS3GLYy54TNxhpTNyhPGFeccnaMq+zAx1mVuEzDedYQJaCBxtKdW+kq0yWAlSi4BgqJvARMtSbS6iad6UxqZSo380ZicjTGVifMZUbcxbwcNZiWOlJv0namKF0oGdrt7dlmOFvODHNO9XEhNZhAxXx3c9BFzNerlXnOzQVRscczbCYamaeSs7gmzdJhiwL1cq8Z2BQTNVrVLX3/AP8AJ/huoreHQxD2XNxF/peYGpkyYWpT1Nw1QbcxOz83kxmXy6hv6ygpUDtKmS2gA4su9oTh2rJiPEp66oQdpjtPDo4o7i5p8v8AedsIpH2dh5b2Zcv5HrP8R4bRKiADm2n11nbKjz/ZdSAGB48p2vSrU7VwKfxX4W4CdorRbMaQN9Gmcr4mNp09BnGTe/W+kSlSQntVXABuMl2bj9bwVmo/Z8fR2BK39pW2I/tLvSy9qob6aKPMf94uWkf+LUzmuVNh5gJXFVqSdpUzUY2S6eXMN1uOPSYzCp4uIxiCmLXIS/5nkJQqv91jlQ3yEH5uG8FSqgTtGmX3sFGuXQxMM9quN9nzP5dlPPp1mE8Rz9vChrDLfidZVSjTc45QtxqV3vK4xFVPt1G3C4tb/wBRHqNUyY0MR7QK/oYdCe0KVrkbcf8AeZqiv9vS4NiCLfrMNpmrobmwI2/OX7tYIJfS15SxCs9EWb5ecdHYFbERlO0I920lpcxprLQGCWl5pDBAvCC0PCX3hte0AbeMTtDf2pc7Q09orp5jEz6cY1I6QvOsp+GBMzGxlbxTGXhOIEWpSHOE8JrFgzSnUXaallEqYepYwVKd5ZpZhrLqJp3JQUm8ChgGmIxLHWGM2y3naGJYeQiVSwNVtJ2bhwv3eYzs6it3RfpKa0l8EBQYnxPmMxi1zmrKi5vJ1mGzFfCqVrqWXrl/vO26wf7mnhxm8rE5jl+nOLTq01rvWqGo3lyiwuvCYh3qlMFdlKhC+lweP5TtnMhNTD0UyBm819RuP9M7NpoGrYiriBVtoAWBsd1A4C+4mJy+HQwJQAtTBc6Cw0a3Ff3lVuy6n2qr9nPhktUpt7HUGdnDBiviMRUJvTJrC62K6XUa2B4zs7xal8HXzUqv+uwq6XWx9k8QNpSFk/4Z4KrzA5ztIF1RsNTX/ls3TmJjWrAnHKiH4FGuo4HnxBmFSnSqVO2KjAU+B9sD47Lv1M7MxldUe5amL+zYMrjb+ZTxE7Ko0jgfsNSqvh2Ay5gR8uY/3nYWV3PZNUhVRicttNr/AOpePGdmmmifYawpO2RTmut9xz0PODwnyYBh5R5Dku1+GmmnWdq8MKjZHsLvuPmWdv4a+TAKLXy2ZTedqBnGK7NXe4dUH7jmJiHTK2Goe2Rmtb/x258xMW63+xYa+QEAt8Q4XttyMr5XV8MtuGU6G+9xKxoVGwwosbCylBlIX4Sf/dpilqJajSKnUgqFKNz03naDgE4Kkx008TbmL/0lXMwq4SkAB5WXXTkRO0Q2XwKLUwTfgSPpzlYLelhqLnfK2mtucxQDlcHh1cZQAr89+GkxbMofs+mFbV7MDZufWYnP93haDLlG44jg3Trwlc02y9n0bkA2zj8wZj848XDIqkD2WuVP9xL94EAtDMPjEOZQG4NKtFrMn0PAxkJ0hHr9Zp6OkF9rz8oAOc1ml5zM12hN4IBsIYx2EckXMRVEF+cNjsJTIIvDnMpvTbpGzaDlPNrEL78YBlsLx83ACDMgNS97wYcaAveL4eZV1lcj4BafD4wBIveUkd28XNKTsNW80pYajbU3iX+MTxK5UX0lL2QRmlzYzLUsIQCDA14p1WPSOUwETLUEuomkSnTJmXMA0q4ioSTCTtMRi3Fl0mGw6jMl2mGoEeUSrUPJZWJyqtlXcmUFc5FNVzGILYmtlQa5V5SqzjwcP5A2VmbTS24mDxTeFUyuyMGtxUjb6TtOpWApotEU6o3sRVp9ORmHoPROKxVSp95k4BUzm65wP0vMWKyLTw6uhRvvC3sMNrjkecxdJ1aviEW9PVLaFuYJsbdJ2e2PNSn4+Iz1vMFYjwS2lx/KbeadqCmVw2DSiFR1UNsrL7Oi7q37SvTUVMVWVDUy5aZy+U8Rcbzsl3yjNXakantEtrxBPHfjKdPBj7NRUgKMibC3SdslVzLRoDzAgeb/AEkf3ExOI8NqmM8yFSppi2VhvboeIM7NxLZXOc077D9Z2ZSVHTD1Dc+HmN+G178I4yCn2bkW2+g/S07RUXy0Uyv7PArO1GpPfEUQ3AgaTElwBjU3uBbX6SvTrs74w5RqVy6TDViFGKKFSDp8Q/2mFbHq/wBtdqi3+ljsPymENfDl6hSohJQr+4+hnZ/h2+1V7Wb4jcg8J2JnLhq2vmuNNV/vzmA8V/BrVwXXYn9xeYY0Kiv4j5SBpcHN0MwAzOoxCM5zaXGq8dOPPnMDSdsn2jYnzXI/edn4qorZ663ujhQVzD+b+0wV2LDEK+YCwJNrcRbTWYKnRWtau+S5AzE6NuLTsxaZs2ICqu922b+tv2nZuHph6jVyp0LXJ0bn05cp2W7WNTFHNvq246852c1Orh6pdwUNwVPmH5TAr4S+JWGnlKjgOBIEwqeEWNY0zcXz+UX2B/tMPRzJeszPVa4ZSbHlf+kp1aeZSbHpbaWPfvAJSqpkqJcQqGZFzp+4hUnSMp9d5pp6Ok1Os6Q84c+0uolrwCdZcRRuYNgIL84b2Gka81IvFL2vGpMCpjZM5blKysclPTXeGiM1WwvtFz+VWYyuoSyohJ1B5Q+F4hrMQvBeMpWGWi5tbfrGTL4aoPmvCn+ZjV8u8StRf799Tv8ASeCWprhah5k7SsHsuETLY2a8WjTXx/CRicum1zGBJq16WU+zbpKmVicUKSHQabGIlE1Bj1Kaa2vbh/WMajlcYntAW+g1Ed2qDNRdgLiVEqX8C+2oieJ/mZWPAyqcxc25QEwXtPiWFZZxNtYBTvMiN5o+Irkk6R6rhVFzC2Vqiyhh6IygRM9rSln8q5m/pCrNmqXPKe34zhaZ2txhD5KWGtSA0bnMFWxJOjVFXcTGC5xeLVVNR1AGmdT7P0YcpRpBfseBqVjojMQUNqZtZmfiOF94zp/2zHZR4/lFM5QwOioQb6ygKrfZMBnYBlzlctnp6ZXvr9DO0HLeNixSvTKlKe6m+jBuc7K8ehTB8Z8xqI+9iPKTfnMSKiCgECNmzniDwPWMyAYjtA3ICsE8oLXvpynZzsD9mcsaouWXZlmJz02ohN/OCNxMYy+fFBN75ZhWRlbF1CSADY8uMpYYZaS1GvK5F1woBMxjqutNecqrVzPiQekw9e7lza1iJhaaAKrtwmEo0kqLR1/eZlI8C8Yi64Yaaa8oCdaAUzE+IV8AabGYllH3STGqfKiWnaVtCh/tGyHNlzztA31SVGyhaoVx+8xzVgwrpbbLMdaxdQLbzHKtjUpmdon4qW8qs1RKjrUU/wDu0xiVCoqoRwB0mM8nnp/zTtJQxL0hy02jGjlz085H5GdpXUGpRGutuU7UbK3jUxl4cD9ZdeANppp3jucCU6+ZqYAPLnHVmBX8oV4Qj3LrLwkbdwXh3chOZmu36zzRj0lPwyd9JUZj9ZlbrpPEUs/l+ssPEJvrtKt7gZepmYXapeY++VcqKp48ZSNSmv2jXXQcSIKzGnUonKtiDznlqE4ymlPhl4DaYR3TyVKxcWzH+TnKuU+JRFEAaLeB0rGriSlJwoAGliOX1nZtRfERa1eyrV8tzo+nl/2lb7SuTBqtIswrM1r5VHlYTEmoClSklLLrcXOsr1Kb/wDbmbz6NTsLW0I43EoCpZVxLZqtSkXfUIafXrwmE8F657NrHNVpMwK2ObNlzW5iLn07LHtVPNccdb/Rp2oc2fDUcjLSyoz8T7Sk9OHOdpi4bD0GH3t/hzWP3d/y3ivdnoKGve4H/vWYg1bVcBS8PxGXMuhyDVWtKYw5pvRrUgyt8N8v5j9phDSR/tSFaYbNnGpy6a8tZVNIGrSIynQprpM2osw4kby1SBklgbQq9pZhrMlDfhGq1Ct41RgBuYFyu66xEp5UEvQBz2lfNZdFt7UItTwy3JJu3K0RGZaQzVSSrvvlNr69IlLM9e9eoFVjSXzbaXUSuqtVxVanRoUidBsy6WJJ2IlRXFLCYLw6fi2qObLuM2Zeeu8weJOJw9eu+JdCviH2chBzrts30naNVl8ooU1d1cXuxUbMjCdnUc5qM2Kr+EmcaM1TIdDYaXExTmr4tIIt/JY7r1nZtGszli5esXC3vlc72lM0vJSyanQiOpzVsWcvALpMKtPxkpZ72mJb2aYSHwQS9vpMIdTma4ii+SgJjG5LMR8b2EpKf8wnnMPb2SeGsKoQqaQFblBMSW8u0xdhrMQfilf55UO7w29ua+2Z4XG8R2vcxUa4MpVGvsYitfMYHWxlL5jKQ4mUqT5llKowJ3ieWzHQ3ispDbGYUKRbfjKF+MoC+ram+8VC3mOvdpPNB3GNaUMTSsw15x6asQL9Yw+GOnD1enpZp0mXjPNoICNTaKD5ReDXM0ViTtEW/GMwN9IlzeVSPLBTLa5rSxD6LfnKRzLmZzodJico9mmt7aynVoZ85rcR1mKIuaa0UtxOv5zCvVqJVrVKpDpoo0uwuLW4SmtMZaWQnW1tQTK7VAamLz2OqLospjDr9j7PZvuqvhs4sL5vZa+1zO0c9QP4dCgGtmLWumXfprMBT+z0Gq1cRmalQbz6K1PzBm6ysHoZaIqKX8xPwAD2tZi7I9VqQQBy6p5geWU/1nZteujfaHA8JfLrlqDEez+ek7NSiqU8BWrKgWgdL/5fmXff/VMd4fkwa0zmAyPUH5nT9p2gXF6tNF8PWw1z303+G0xKUitSt4hvuFyaco6pTDYuvUyoVJJ9r+Y9Zhq+DWhVzMoy+Yv57obg356TDhw3nBzl9HO5GU6cukw6WH3jZaXhi9Qny7/r1iUHBV6htTCZWbMDl4/6usxLNmXF1F++WoBuABug6GY1tHp4esDnBvoddv23lPDIPI7bKFUXM8Z1emytSy5l4Nm6zPTD2JsLlTo4vEZdDAykQ0qhMytvPud4alYmGtVV2EWhTAAmcZVlPwstozUwznw6aX06TCVcDYNaky+0DbTneHF06uGorUpjVXq+wykagj5pTotWp4VfExJp+MWckI2bS+bXjwEpIv2bElq1SrTqN4YX2l4qNhMU1Cw/7PhUCsoynOaeX2CNwRE8j4GmlWo4pF+bU/rzlNaa1KlR0VDcheP1iKirhcN1va2h4ysda+I2vovKYdf+70L31vMU489QIJhXNiS/1mIzBU0H7zE6F3tKfhWtef8A09ukxDW0lUEEtMy2MojrKY2WDl7xp3Gay3oqwIOolOoMyCMl7iOhNhCD6my+oPiaLObfkJrYC018xJ6T7m+01Hm3h4DcymqhDv0ieC5y5TwJjYazNdy2lhHF3NMIliTfeYV8XU+6eocqbbeaYwlgoSgumU7neUgcKHpliaoVOhtuZ2i9ICnTXDA0xodSrX5bbTBVGv8AaMTXsDW8OnrdW8mnMdJ4CUFw700HiKr592XkP5pg0OWpjatYv4zZFc6pUNracF4TEBSuGwVlV0GaobXXYkc7RTSI+1GkR5mbS9l334TszNUKUDiG8I0iPazK3ntrpYzE+DmoLTpM4Xyuvs6bG28GJwyU3Zh5kYldLlTf9Jg1tdC1nLjMb5S3KUaYASmi2AUWHAcINr7TpG4ia2lhq+0U7NKYYguBMM9Q01PmHKItgWi2sHBm9rGNMO7glbMDe6+U6/SVgqgjxhm3vlcfnxtM1fRdMu7aMLabd3iUCbRqFUiZl3nj4lR1i06K6S6WESjT10ntu3lpja88XLUrXpqH+7W/tH/1niUKlTFhaWEy/wCW3I75xKmOoP7eHoWGRwy3YKb342WwlB6DLQuq2srW0NxuOcbCPhb0vHZyR41gMr23I6zEswq4qqKYA/ylOgI434xqlRUwgyUhcHTnxEw1M3rOaj2tMTUFkXIkoKbli5jC2RMqyjXI88WkfINf6yu1XNwgYaykvCAcPwmnXU+Xeb+W6/uJVS7AXHMR6bWYeo09OyGBjveWB0taA1xf8oGrajSUWZR4lugjsFyUtOZlPOjPWzZWGi9Y9wyBf5ieUyOGeqa+bIuROvGYyogIprT/ANe9ph/s1Sn4vjAu4bjqd1mPZ6dgKCpVbMo1zJayzCB6DNiHxFQjKH+C9Pc6aAztOscwRMPemdW87qx+mk+yE08tWvUNJqpHGy2Fl68hK1NMtKlSw9JXpgM2mZD7Vhwa+0wdEZ8TWq1LVhWRdyCg2UDeVEZ1p4FFQVfK+3lYZi2vWY5UpDEYwuVXzBdLkG97/wBpgQgQ0c1s9iTc2qe1rKFNbKgX6CAnQT6SmN2G8ptsbxWq1Ep0ySrWMxrWtTtzvMb5c9ULv+8Xy5sSbgEaTDNVVGZ2uJTwtRslM3YXi1PM+H1tKbMXFHIZ5zfDkleP1mEVh9ywJW2kwh84rVEZgBf6GY1TcVVcX46aSqmbxcOwsQLr5t4jGyvrxBiVL30a1gw3H0PdnUiNRrMQIbzPWUwJSXuU1PvCUpp7ROxvM+Hat4ZZKa3p0tixWfaaOfE07hiGoUQbMcnmG9rNH/4e2Jek/ss4pgeew4acY2WriMXiH+zeIj0wNCAwsUccV+sxlSnTSnSSgiuVZFHwjipHCV/tLUKdM6AG52iuWas2ci9hy6SyELamomGVvKMx5zyEONCJQ3Vb3lWrzHWZOMH4SOcXnE5yl80oL8UwmXUiYRUJUr9JgscjZSA/I/2lfDNtceuLplvKacb6ShTp+bS8cnyYfibMYnl8atqBfKvGFnXJh8q29potWmGFYimly2XW8xedhRoKKfks7bnmZTDWq4nOWX2NOGhM3yYXwkGgzCzeXSYb7QvjeMfFyqqgHJmQ5gNOJmNqUHbwhhH89wQHBf5tN1/rKtChUdmescpbTc2Hwido6/Z1p0KRoqyqy7VCbtcacJ9l++dqlZmrZV4ZBUP9BMdUZMtFU8zK2bcL8wt/SUcTRyVASuZTy1U3EpK18ovffjF/OaSghsz6yiMwAJtMU9sqWBldtXrZdJhdjVa5M8Km3hpK5JYKFvxjq+ZqsouwvfQwZrLT+L9I2n3dpWz+YaQd4lM/CIBwjB2anUIu17TD0XFdqd22vGcI1Gz6+ZeNuko1SwVvMu44ju8bDM1toaWIt1gGUzQTSI1HzuBSGtS/KIifaa6v4VNhko5RcZWy+J1WxlZHaviLNWsy06CtdTluRa43YbyrQpmrXqf5ljTo5QCunsabzxKQrYklV1+75359ZUzuWUJSHsyq5HgrvuY+F11Zmj1jmYkC9xKKWCr9ItRReUk4etEXnKfOUhxlISlKXOU+cp84nzRPmifNE+aJ80T54nzyn88T55T+eU/nlP5pT+aU/mlP5pT+aUvmlL5pS+aUvmlL5pT+aJ80HOHnKvOYluJmLf4jMQ+7SpTO8o4hAlYA9TN6mH1HKMjWYWPqNIe7SVlyhKeYkbxmNLPWCk/COMxJqotKmrDITdufCVKn+ZW2K+VdLdJXo1wtCgmXwmOdtbNfaMjUziMV7dYeGqi1zb2ZU+ylMHh8oTRPEuoveUGNZqmNZlPlCLoVKe1bL+8NGhiPseAuafiZcwIu9+F+BlPC1H8fFE+yxQAeRT5eA5zFszhKGUqVH3mikcfZio1Hx8QajNUemEXRT4moDDoOMxb4amKeF8FBSIQHXLlNgDPHSouIqF1fL5R5ctuX5zyiAQwSt4pAp6BrXmN11ABMXIaj+ZrR/gpyoT5ntEK3vfjAagKrK+mkLKBFtvKV9og4QTKpjaQz7u8Oe0uIsQxWHOUtbDKeYjrdqm4taoN9OcN7OApJ8p4NBUpMphoYw6cYMqzyiXWJUUqwupFiDxlejWrVHYNTamgp0F3DLfRT1lOipxtcVBUyG1InYXv7I4849UiviWsWGWmnAngbSrUVHxLXPy8AYr2zPZRwlxkpaAGBaYHtR6mp56GIm3q0HGUl4ymIo4xR8Upj45T+eJ80HON1lbrMSecxcxZ4zF/NMWfjmJ/6kxP/AFJX/wCoZW+cyv8AOZX+cyv85mI+cyv85mI+czEfOZiPnmI+eYj55X+aVvnlX5pU+YxucPqGQ6R6YysfLMD2jTuLK/OYjCVLMnl4HcH0by3dprM23d95WqvjgqBrgX2Vd4iVFWlhWfKy3c8m4i/KYq1I4jEeHuMtP4tzv9JgjkWnTdl8Jai1W2N9BrzlZq6N9p8OkjKcoGr9D0MrtXdUwfiKnhG509s678VEDqofFmit+By5ukwgqHwMIXqeJWBZl9hiczAk8zMZ4zPUqLksQqgbfUzD1MQz0sOXcsiO5+XcHqBD9kcYl0VjmBKaaHYxaZyUsMz5SLk//wBusxFRjnrkA5SoXSxG8sIh2MrXemi620MxBX7ypaJbKNZVZmG0tYF7x0UBBwlVuELHUxaYlMdx5x7d1zDDl7v5YcpFoM3sQZfZnnO4jaeaVV4fpAYrQ5bLtyhOYHUD9foZmpeKBMr5TAQs8ukP7Sp4vj+ID4dM5KZGhqcGvPulxGKpjMQMqZdUuNoF+9qi7kaJw0jDOzE3Oyx8QbFrDaBR5d+cA1Op9SBKS8ZTWKPiiD44g+KMfZmKaYpvjlY7uYTx9Ew/gNak2hlCvSNOsoYHgYWHiYXzD/p8fyhUkEWI9DWWEJh01ir5ibAC5J0tMHQyrSwr1nX4svCs2puf3mLNSk9WotFFeoMvzA6Jrz6Slnw2aiahNSy6Xy3HtdJj6lIZ2XDIadRWA1KnZWB/eClQrV/C+0VrUyAfiZNFPTedpMa6+OEQsAhA1C5bafnznZ61XVw9eoTSV9M1mQeUnlMcXDeSmg1biSLcPoZQSgQjvWzWbXiG0jVMMU/y7ggW4Smo1JY5QDfjaKo1O0Hwi8rs/mawiUCbXN5VL8hAL5jeWbQQuBF0JiqO7XeXjzTeC+0JG0adYsUCDl6K8pTPCC2kYbi8cbTMIM4YaHj1i4jA1F6RsL2myHnLqsBtNJSdLOuYAhrHpLHxqwsdVQDlKWZajm5OwlPOHteO9TNw/p6mmvGIvGKL+aU1v54T7JmKqcZWfdz6gwwwwwwwww9594HcRKtE6mdm9pL5vJU4OP7zFYQ+dbqdnGxgzQd55RZbCv8AdCpey5Ds1zbrpO0z5QKdABGsVOcZjt5SBtKFNfFrF6n3lHKtz7QOhA/OdoVPYTwgfFUlvaFtFYfWYZEcV6zV2GH89PfMF3IHWV3wjeEwRmXy32E+zNWdqxYO9x/L0HSYmpXGSnlAeztzW0VqiNc6KRboZTpiypYAWEpqDxmIqMoC2BgsWLZtJU4LaaAsYhW4EqNEA1lPhGBmszLBADoI1p1gEHr1aOr911Ihwnaa1QNGMuiwWh0l4Ec1i9/5YW81T9J4mp2gA9OmnGKt9ZTW/nm+UzE1eNo7bm/onuHcPUiDuHvJ9F0NwZZSlVQ6ncHXvPOabwTpMVTKJSpZy2a5+SL4AOMxN8+QZdsrcrjmZVqYZmp2D2OTNz6zxqrtUrG7U0UhTa2U3vEDk0aVznIZjwmIrqRVfLmSzKvPnAFA4CJSplr3lU3ypPL5jrMjsFXeMw1MyrYR3MFtYlMW7s+l46mBpfhG4wCD3f7R2bUYDzILj8pawvtCcsFt5pAUBniG/C8Ciw9JEG8Vb6xFv547khDK1U+ZvUiDvMMMMMMMMMMPoHuMMMMMPu14byxg5wEwkmBa2uJyptlG9zKSvkpUy2asPEvzA3mOZU8Spbe/PeLTZmG53ltZdboLyuSQx04SmLg6xj7ItMp1OsL7CNxMprBbSNC00ljtLxR64RecTnKfOU5Tic4vpCph2FuEbs3t2vR2Afy/Q7S6pr3aQEWMC7eiqjWKgOsRAfNHckIZVqm7N6k947hB6sQQQQQQQe867wWhsIDw2jTSYfPUdhcswb9JTTkIgzAa2ldsp2ERDl3gDeVdIrW1mugj3i3uYqDTuJjQEQwS3q1lMcYgi84vODnB80X5ovzRfmifPF+aD5oOcU8Yjd/lMaji6GKUfyN/aB6aeaaCaS/opTEC380C3Aa5lfEMcx09QfUHuPqDD6R97E3ht3C28QmwMq2XIeOsZqRztAfZXWA0rGIR1jnhOcRZ5YYWE1h7gPVKJTEQRecHOL80QfFKQ+OJ80Y7XmIMxR4zFH45ivnMxPzmYofHMSvGVBveIfiiNbzRW4xG7hi+y6621y3H1EanVNM8DLqsvaaegtJd4qBvNHquy0z+cZjcm/vZh9+Pfra3cJW+0ZPhtvHUsWqHeIjEJK5XzGeGgG8W20u94q7TLDGJnkmsIg9Uo4xBAOM6z+aKPiiD44x2vMU/SYh93MJ3PqyJXpHRobgMYr280VxBUoGN2b28/AFrzNTTWbTTvWmsCK3mlXE1Cqny+/H3seoyreVHtaWHm5QNcgRjvEUaxOEuIQ0zd2stB6lRFEA4zrB80Rfjg1sbzEvsbSu+7n3IiVaDDXSLUy+aLVpz2a6jaEoovtL2mncKaQIreaVMVVKg+X3ofhDXjwMNYibQiFkhzTSE9wHqQIqxRxg5wD4oi/FPlmJqcbSo+7e71KFQEGBwovExfZz/AEjYTtJqZ2vMyrNBAq3gRW1jVqrU0PuZh9cfwOyw3lzPJ6sRBFHGAcYOcQfFEF7NeYipsbSo27e9vh6ym8XEYTfcTwcfnHOZ6aay6iBKW8yhlU6mEkk/wAPRJhggt6gRRFHGAcZ1lviir8UqNfLK9Tdvf2Q5CZmbNzlmC3g8G8CU21jYnFMb6fwAIPXARRAOM6wc4i380PwzEVPijHc/gJRwRPGwoM8PEj6y2GXXhCUIB90H4QsXuMPrRFEUcYOc6xRfzTlK9TjHbc/gvkKzJiB9Z91a8NWr7sIsXnFixYIsHuYggggg7jGjc4fcAIogHGDnFHxRBfzSo20qvufwixlql4w4zMfcRB3GNGjQwwwwxo8eND6ZhhhjQwxo0MPu4EUS3GdYFv5pvYytUO8Y8fwvQe5sZUPCVjwlXlH5zrElMSmIkpxIv4SBFEA4wDjBziC/mjtsZUfcw/hunuF+MWU5RHKUBxEoCJwEY8JUMfnG5/hgEUcYBxg5wD4oOBlV+MduP4oIPVEmNH5x+cP4kogHGL80pj4oxvYyq/GE/iAiiDuMaNGjQw9wg7yfxdFJ883sZVc7x24/h4EWDuYw+tP4zVc7xjx/BB6Y9EDuYw/xUIO4w+ge4w9w7jCf4qEHcYe8mNBFEH8XjvMPcY54RzFG8pqIohhP8ZseEcwmIN5SSUxOUc8f4xMMYxj3UxKSxF7naMePvw/hMxjGPciymsUQyoeMJ4/hx9efxUmMYIiymsUQmOeP4cP4FMJ7kWU1EUQmO3GH+Mye5REWKIY54/xsIO5ucbnD+HmH3zSa++f/xAAoEAEBAQACAwACAgICAwEBAAABABEhMRBBUSBhMHGBkUChULHB0eH/2gAIAQEAAT8QD8MlPhngQjDu7/wnmUvMSiIiceC2Flh/Bk8Pknhnw/gZnyZgiPJlMssssrbZZZZZfCzLbLLMv4M/mz5fyf42Z8ZDiEO4dw58n4Pg8XOUvE8hKJR+Ayx+D4Z8mZ8M+NmZZ/AxHheFlll5lllltll8LLMssstvhZfwZn83+B/hPwWWTwFyGMe49x58H5nlUpT8FEQw+A2/iR+D4fB8GfDPhmfDPh8EeDxsssspZZZZZbZZZZ8PjfD+L/G/hnh/gIltlln8OvgYdw58H5Pk/wAI/IMMR4DHnbYYfBbMz4bMz4xsflr6tPVv6m2geoXqfwLYbZlmUssv4Fllltnw/h6/izynlk/ifI2lssptvXjbpDuEIz3H5n4NSnKGGGGJRFvnYYfBvy/U+Fp6hfVpC+EceKGHwjwCx8A+O+OF9X6osD1IepP14G2WUszMz5fDMz+b+D/Az/wDhDLLLb42W26t7xhC7fxrlKcMoZWoT1I9pEG9SJEqPg3wX679N+mP18I8gBB5ofqk+W4/rKPV8PmmT6vn8YuaeGSE2eob0kPsl4ZmZPwT8GZ8Pl/izy/jnjPL+D4UW2zbb4bZYdwhCPP5Y36GPqm9OX732J3q+ZnHTfE3xTwHZ5yCPD/rljeOX55SBP0RAIUPyDAfIPy/pH636L9dj5I+QfPKzT4giNFDgTvnZ4peYXZ658EhMzPhnw/gz/Kfgz+bM/kuIbfG+N8LL4F7TMpwR1RvsXxMBFwPu/EXs4g+hIsHuE+pEA6MP6+J8yP3BnzeAL5Gg+EYwPkfpH6R+kQfpH6RAPkP5f1j9Y/TxH636L9Mfpf1kfJ+UPyR8k/J/WR8k/IPkHy+C+c8L4IWwG8XI4j5geDM+Gfyf+Ez5fxfyZw2y2+dmfBhdKiAxkMg418tfJcw9WnqH7L5l9Y/zYP0m2cHBF7jBwSR/l+nxv0x+l+i/TH6X6Yr9MH5AgfkH5B+WPlj5BkZ1cZ+XiIzHyg/LPyf1mpmkE2yjfbfcX33P5vsudzc7myPMfPN2QQ2zPhnw+Hw+X+Zn+J/FnCWy+Hy+etxyZpIGBuTljGYh8kYwnwH6L4L9EHyD2QfL4oJ6h9kPyPhH6eB9CBHzgvUfG/VHwv0R+liP08Bvq1PgJSMhk5Ob+2++PA+/EHhIaC8bPwD+4railrm23mJXmBuUP8AAPln+F8njfLP8C/kzh8n4p46xEGc0hwsBxfBfBI+p+E+GYBYP1etN9R/D9gj0WPnhy+o5wEDD4nzH624ovkeLPhwtNjAvpvqg+31X0eEM9xEGD4Yb3zujzvpXs/FI7i4meymQ2fi+V8szMz/AAs/mvh/kfAyj8ckflr0rX3gqxzsS5RGEXEWEZ2IbSXDGWykSX1uulzjAfBrR4+CP3J96SkPkhfdfZfRFsDyRDhwvBjD5gQvAc6I8EacnGX7l+2ZO9zfcj3P3n6SszH4d8M+GfL4ZmfyfO22/wAb+L5GUWQWTlxZyq+lAFHJwv28IyOLMJ81jIevADwELDYWzokeFZyCJ2wj3ZxZCTO5CCiPp4E4NKHRolDzlhfndNjr9k72zZHuV7l+5Uf1Bln/ACNIT5ZYfw74fL+T4SfyZ/nfO2+WH8Bnhd3CLFNh4YDEMGcCCBxZHXidnlFi4wWZEHvw5fIL2SXvwybM/CzJ61Kj+EcbneK/GP4C+J9pXtle2T7lpr7Y9jFPw9jH+CRdGMJJ8IyMGPmfD+b+L+T/AAP4P8il4dPGxLWb9IPWPeoPyH5KhLqEziMOrcl5v1yj4exJ1eESc+AYh9UDqFRPB87nVqeOpjvaX7Zf2ysVmnta/bCiE1EIQhR+OLEkxCx9l9RPIR+IvPPgxj4TxTBPl8M+X8WfwZ/4e/iMpeO3Bg9LNy8PhsY8k6yMnVwxu+MzeLt8SzrwpTy8JNFvbKe2V9t9zKzbtW/tf2YhShilIUpTx5iAgLiPBvkQH7B9h++H9/i/bfu/HD5R4CPgMIfjHyz5fD4Z/Fn+Nn+RTl5mfgJA8BQtfYf2w93P3dfMDkyJ8RIwu8Si4X6JRtFHlzXlzxAwfMQhClKQhCZcT95hE/vP7T+8/vP7TzfZvt9k32X7L9k+zT/b91+/+DCk18V8eT5Z8M+H8X8mT+R/B8P5LxPxMxjjvFOBC1bPJuJzdPN++OKiFuCNuziZdeM6VTi84QhMsggiAQWvGlhImrlTTDCxXwVnZNubNkyZPCSeWSXKtZeIgcSQJgk8GW223wszLP8AG/k+H8H8H82Gf4Q/2nj8M2DwECVD8PP3Ie7r5hfciJ8l2TjuCc/kAQR4yCA8GPM1aubGHCtX9Ldu1MVL+S/kt9XzXyXxXyedHn/ChJLPxhZn8QSW2222WWW3xtv8D/A+H+B/Fj8bLouK8E4SPEZmMxGB59z3fuiJJsQMzttsoW5NDlBZGW+AvhlqHChw4UfrH6w/kQh+tr5Cm/lr5f0v6X9b+sn5H8i+Q/L9V+ix9fj+JPm5StlmZmEkky+RjGbbbbbLbb422f4H8X8H8yCIQ/BmZzvaQ8cxrymSSSLR1OTl+2F7jR3ZO7ZubHIewO4grcQcKHFG+vCPyP0v0QvkvyF4Rvih+Qflj5Ys/PF+qzJh+Rwxw/IoeYuYoR8HwpedKxiyyy8D4DGvgY+RsNttttttttttsNvjZ/mXz3EV88roLDkuI5tM5hFwzEk8GTMHU4+LcA7hO0KuYOzwh2pPnhP08H6fAF+m/R4Rh+RB4oMGGIwz8Hy+GUicvH38DDuMYSRP8m7GMfFY1r/AAb+A22223+NfG/x48GPi/qlO95BhOvm1zmB8Ax8hs2SwiNFkPMJeSyQwBiO/h/Xfo8Iw+AUUAeOIjxxDGwggssskkuJifLBFHHL85ksyH+BPtY18Ri2222222222+Ntttt8bLb4bbbbbP8G/mMZ+nxLJgzGTp5i4mmcwIcxJOMJIiIJ8vHMWLdg+IIPkERCRbbbDDDEQQQRAglJSTDDBBD9/5dzw57GPYzfG/wAm222/w7+O/wAg/rP6fkeiQTm6ubr5uE5tzuFsCSyPIELAtxcUIERDEPIHwR4BBBAXFixJ+yT3D4f2fxgIjSj+EwfiMfDW3w223/gbbb+G/httv4bb+T+YPFj+s/p5b9F+i26TZshnN0c3RzA5zE5GLLIGcR2ODwoiLbfEWPB42GPBEGxImNf2/AX9vkHyF8Rq5q/Hx+QHw/8ALyyyz/iMExZkePORfrv1eH9UElE5l45ujmDjmP7CPBErnGxBziPBrFtsMQg2liCWfO/vI+zH9589V9mLlS5UuaxrdbH6lbSW9Mn1M9TPaR7fiTG75xA/KS9T82fmwfTC9QvUnEfUj/xss8Z+T+b+OWR4Bjjgk3F0l7DObp5ujmBzmQQjEUoHHhHjbfIeTlZmvntYxc+KqWXKnwKl8L40vSTPUr1fB+I6UV4eYVbsnxTxfiJBE8peo9bx0m0M0eJ/k/4z+Gfjn4vgHwGIHlhCFniw14kE5mM5urm2zmFO7l4dlCHw2a+Rj7Cv239/Cfv5H9pjFS5W3znhlmWWVb1k71OivqPjwAgg+AYmZmBgfAJnCJ+QwYEH5H4AwfJ/HUUbxuRDa4wlDif8Lf8AhEMom2lssvBI/CBx1MjW6ebp5unmEdwJZDAkQeaMf3mg9x/b91z92nv8A7tfgfhnhJZYLVnXUgcTOcR4QoHEH5EHUfyPlHwv1Xw36o+F+i/VfBfrvjtfVg6vik/IPkn5A3qB8LaEz5ooXMEbx4raMMyB/Nttttv8j+DEGGz4hmo8LT8DESE73dPN0Y3VzC5zGqUnJi++Bb4pNJLaWXgJkCeBjweD8FITwhjVKupVOLqhAQzID1F8h+eODwIxpXnZxTGf0k/JHyCYn5BBsSEiV9R3UwYCMNlyXvDn8O22222222222/zEJ1Zanu9dB9M/B/BEE8rFNiV4lZg2Rkfm3NJVFJ1DXhj9DC9N+pke4+zwb5ZJ6u6LP1ZH5UeMHuSgQX7L93ilTo4tk4uqdEI9RmcWXrw/picY/SD8kwefiz4M+GZExEHi+GSfGNhiSLeIhhCe8VGiyUP/AAtt8b/Dttr4lRpahFTyGeJGifpgfTf3X98ftv7If7K9Mj49EJWJzG0ioY3byvBhYS+9fnxewuWJ8CEaKfY46X9u+Y/xNByz1NbhJJzx/uj+37fAbkonRxbZx4DHOIAOPEnyaKzYmrIqZNyQTHwUnJBPkFLL4F2VPjfskJ4SeSZQoCMV8h9E/wCVv46BOMhOcXF1c4MDw2IjxwUk/BdJU7xrgQwg+kseJHkxCgiYhCOAGqvQEPRf/wCxiBaWh9GC9nhXDdiYScDLHKHQiLqrkF2Oleu+iWyi7uwds2Axy15fqAAxe+swoR6VHiYYS7+M0KTX1vushwDsxP7To4vZo/3AfUNZkp3fst7SJ3LV4XVxZ5xDhxJ8sL9V+mE8MZZyHgG1J4HwHiI74lZcUm+CJrCE3Z4MpiTdCCcIw0hL5KcYifyv/A4iAjPB4/khPVraepHqC3qP2eEDA+eA+bxwIKF9EKD0RPHrCQLZOrKuCAMd479L2yiCczRB50hnBfpLHiMl50OrQqvJksabedQmYG8nzdk2MxX9ZJ3dLn+7ZYzD++JgJBPrtftycNiYyOUdZwekiB/0FycL/F692ygIEIzWR4SYcXCbD+K+5fg5oB6s8UuSU8engFIzxE99+OcQfZIL4tNFojPu5+4WdE0vklmQCewUefwZlllln5ZZ/A/kIMIXMWR4h5ngvt8V39EfpA/UfQg2BYmvifuuK/bMznZW5FzA4+QZHogTXoD7ZnOmlIYnF4+A74sX9mvs/I3MQXk5ctoQ9Ps2AIPWDSC9Jw539Mnsh/l/YyN6ceu4dkKFMeTampN34/Y2rQQOfjPTay46bxxYxyE/xECtW3G8+ANV+id0EYOSegsAjNZOfP8A2DAnCelOR9S7Mc3RsxjgzCcn9Zw23YHaen4kY2Pp9MRJPUzkBixc4ITcZ9uKIX0YM7IG+NJR6nrx7zy7kwjELJLKW42LB8SX6ppRl/JLwHTAM6pJmk04gZEZvK3JIpZZ5yyzxllnnPGfg/kI8l13C/Avp4C71fNH7zQ/axDv3wZPDueMvJgy4kayxYQn+sXcWF/i6JSGnIOxIWR/1hLEYHJvLZSIVbvpnZ6OH7O4yvPLubB6eddSWdD2dCfbEw0ME/YWkhfpuRggz9zmPyBc7zjtGa9W5chxb15cSJrsOb/7jn56i/NC3MVXv0L9sc+AOeG0zDXp44IkjHK/oPpKD6h3eNYz90etO35LAK8n1Prks4hP8ZKrLvW4cPx/dvafBvA2NY0AdH9RcRcEeTH0k7J4qnr+rsgwP62FBf8ApgJQBDhy5zkUvHcM2Wwg0SHJ2EUuZ72aG9BbRkP0zjDzuGFeozLF/RavkGvVkc31APyI+Ry9WY9eC49SH5BnFj9Q/UJ7vqtBx4Gyglg8NbMPJE6SEoebLLLLLLLLLLLLLLPOWT+AtxdFgR8pwRtLJvMI93xeEpO7V1JvfgC+DraLcrECVxBPOzIZHOCOkRw9PR3xJ1Kxh8InNq9vRI04eV9yA4dD7MGNdfqGyZ3GhsDlN2zmXP1tehEi3PTeP6/dlD3IO8fr5LPlJrUlEGcLvc+OBkVDrbqdwxOHA6EROy4Ms3+mDdQ9HrX5dg3ICuJCB06vemfQigV7RMAu5HGPCRdfrehx9uY4j2HS/wBtzSDpX2/FcPSd+H98thFLwHhEb34TgkQf1OE6pfQ6MsmnsMEAXvDJ2o+rsrbLH15KNgcePiID3FPMDv8AtRCJGJ0CelO9y4+5FHe9MXW7M/K/TPQSDmNjOmU+p6yIjzZb6nPXjaBkcL9M6dQvlm6tXV88+BBucloceLphmvDfEn/AbmR4LrxnnPD5z+XqhRdfH4GG4TTA5jqc9OLTyz/V8bD+luJG0wuFsaxhcLf1LSTqTF8N8lyHxEGAa8y84nPcCBIQ4fR3uXXenRnF5nfYkAImN9RckB5vPmcD4MFvHJwJ7oZPfwhjD1+5GZp6TNfg2QLzUjvLC65npl6GcyjMgcjz98Edw1/vmAlF+LZkCTpev9W6jQ2JkDwvVyzIOavbZkIJBwenjdt3JYD7mMAOfT2ixIIWPfQ3m/ZHJyJrMPdkzDVIvDDjXj5eyshws3wKSA/1qJYeJ9ggaJ9lStAC/tvbbh56efkAInCQ50OoOEH0v1TMBbNclZaOS6R/Rtzqydy4nTEuqT5Y/EqhAEJiYE0ZW0mc9i5Qk4oky/Fk8Z4yTw/g+H8LkLgPEfALCx9R9IN5hZwLcHyEX0hH1j06uDG/e2ziMkFNWMi1cp8+wYc3D1a6wn5bRY+BiKlaATFau2dmkAHCJ7I7Quf+x6bB6jgZyF773WBB706gDlQc9ku7vV1gmuNveTagJYx6Nboaft62/wAT3hN7y9TAqsdhrWQ+DNA8DogPN+E3OmJnvPtn3nW/9BAZco/6kTzd9RfuAvPFvLhc99Bj5h426eTYoW4QCxt12Xt4f1hOpZda0IEr9r/1R+L+3/8ARss465f+3iQjp0mj/ktQWoYQYBCOw+8xxN5W1xucYAboYwdx6eGeG44DJRhRnXSZW/wpJPl/O5i4n42eRm92c7XPxPnkQ3eE5g08Qt2ScbejLpxMHeSOPdgG36TJqwenu5ZOsiZGPg6guREPCB6xfBtLjK3JsLSPwi3S7P2heCToF0QnPja0Hxhca4HsFc/6LSw26yAu7R5LTFM/U8Yf+LBBf2WYILOM5L4YfZoZ/bOAC/cKxPqY0676eJ/kmmk79GzmQCMnpRXtQug/5u4jsg/xH+Ba8SWZEwk095kFBD/7i9MD+nLkM4p+ruD/AGPEj7H4/wCzjJsm6l0D03XpMYBIaUEV0dPbFgeMalOJrQTFv63DA3BM6V3wzFxkgGPYy6uPc68TK3zln4Mz+T5PVylkI/gFxKpxzD+7J+BDOVWR0ZBvewc7jL9Tv9SvouLNlDqQg3bBT3urqSTkhyRjuEZ7kvVvOL1UL6rTHMPnbuMYkZpIuBjbk3D4gY7hdZhmMmlxaHFlA0OJzOGZr2EJyG4R/wBEDz/rnWw8Uoa7Cfuw7A+M324uRBcpgffc71b2ljyGR9jLiPEvrB9eBPgR+yyU/uBvT/wgH1phTZTlyNYAPXDOeMvbJ/1Wno4dv9Y3MHHrGf8AQSQT+ub+tRWg+TZ1+6izhb7n/wC1gWKAAIeQolc6av8ATtg/wln6tAfpaLackdNh8guCBvdxM5Q6uPtcIzruWSu6J1EydSqa2BNBtg3IL6l4btG4zgjZASOOmOQw2w2ks/i+H8+S6ZgeA8mskPi2cMvSwGdMszm5Lx/u78PqG4ZW7MYYz2vNrBLS862VcyVm69wDrNfHS5XkAi53AcHpLyX3YPcIgNMnNv8AuNiV1YciAdnGc3c6khnm2VqEJjZMkhhNMc8Qa4hgNMx4ODPgl7XOCE44GBxtkW2kZbb5T7A7uuquUgQpKdb9bfobGxufAQzvYo9l0aM5GR0Tb2iY7m8Cu/520Hw6ar65WK8wL1fXWSFrDzO4Jc8xlF7uac+mRdmGyxYHRHJjPA+el+2uAU7e3Oi5vwP1OmUDhe4djGcaYxy8JorhuHRRloaWo13Kow47N/EafZs1sIm9Tw88chfabMe18Re1ydJdLpnuRWcLXtDjRJhvspKLxOndv5r/AA8103Uh4kPiadJZwb6suiDHuWdY2uTN1MnJIdlvlyyFhqrsdIF7KXqcbKlcbZw3qD6QbDsOdkILHdwWDYXgtUuxjXSySI0Bg4YiU0RzOTsHqXYnu8YLBWbmZN28MeIiQsL+4TvBDuPFtFCatDnGkA6RJkMl12BybXDk+FyLEC/2aXOo4HuL0TbIE+1FtdvHifFrXu/s0qa9yy8HG82lI/Z4fsYNk+FuGu23JkS02OoQTKNLyHQZIcLnINI51+ks8Ne68cOHRt7cXiIPLHHr0eomaDuId/xfD1biXXm4Z6DiD6x7HLwuu5E3zjDodm8/v5Cf9cebxu/bL5OBwHsDWjpnS+oMfbDUDsCcwKrKdsGo8foxmwaheBqCPGOQg4ZyKM2vHeb2TjT4+OVfcP7WFSh48vp/o2122DHY6GOfnpmHA94r/wBvZ2TkOsN36bjqjHdajwWM36ckTTgzZtwf2yaIC9AOXX4evkvb4ZqewPj6emM2COgNHo/SzkhYT/Qfvq3gLd9K9C9WcmUOdkIMXLWCdAQ8e16H9J0KORJVvhu/k/w80uM8Bx5YKXXIEfbs44nezv6mHy4g12xC+UrOVm6GbIws3lhuh/dz7ztuwBKzSmepDhUaeeiXSe/v9WWH2ziEQTu8ss1BsjOVJbA8t/1ASBkjCF75HcD2WwiH7mhihv8A1Of+k1BjjDQwxJJ6lmBGwEtlIxPJYURuobDNdkeYszO/2wtiVA8WFj2C2XfLd3L4EUBX6S9orBaEAZ6EK98KZxK1b/qgLjb6OdZ9ghrbJg1iC+kNGUA1X0dTZC4AIbh07+e7EC4gi3k/XZZ7N14mXZBUe+yYjhhO6L57Hos/gPAUTHe/GLZjk0ycsOh6ifjnieC42Z6p3MOl3Wk57V3dgPEUC1YtxFnWnPejdolb16OanD0p13GuTEuxB1xPQW6rQ8S9UDo9HGeoGxm+XAr1Q+tFA4uE/wAEDtS6wB4N3Dp6dbbG7wnwLmI6hHD3bEPh1B3esa+pgvTKD6Uz/pxgyR1E5abxxvbPjuT1UdOzu7srSHAKeteDXG+/GXip0Dz/AP2MOPZZF+PBR606T32Mqum/U5D6+PStkX8LLwHjvp9+7EbcYLr3jjjt0+yfm+IEh4QcHz0XMjF2b5E6A6R4ey5CBodpwJhN9cwTLMOcaNwgeh7siVbC3fXB++5fKmDs67l9ehr8XCLWFTXpHx99Nn8GjOOx6PgnP0ljXhSfXX+WOgePctcN2aIFHjSMbvX9w6BME5H9/Sb97cef6GyBkq2+Ntl8ZZJZZPjICLM+ChtiqOC1MAKT0Ko9uEvEbAP/AKIgZh3hbVMkFxUYlV6lslTf4LQ0H92/yrfXVwrkC5w1gAMN1/1dwqNbli8MPPE5Y+iTpD7NBzYN0yY7/sjNGxxLmNnqMSLwRei3kA1r3k43hgB6kolipm5lgneTj08QdGf5rKH0KdfIaM4HU4duGAHnYTc5PUHJNgjk0E4jUsZjv41gN93ebczKTqGw5Z1iYJW10PZsnP3E4oPolceHoJZDLguJzsT9PXFzjSfQPuQ6htFbzH3IltJ37BOQ+xztYcqOR9EFy5UOSHqO4Kx5R/QTjX4HYh7wMGk0zB12nO4bKR3Dd8oeJInhzT5GGL5jDkxyZM0M9tsXuJB6M5rMZDcwD/XzVj8TzUP18Z9CCc4+8OHlz9RAjp46ohgj5gYChpDWo1yzg0YsAXEHSdWfATyPe+m+qlsg32L0l75sU6Ax1+nknjpDQAzM3tlM7TgfB+zimaC6+bH9unu7dcFImJ6Q7uG22afvN3x69lisUc0PEoAcjj6lKDXXgPQDNLmu+NIciGc2NIkbTvBwF/hBLLUrdzqH0Pq0OOmlaCM4O1AByYEg56od/emy0GZTpunsOw9erfxahB5851+Pud2QZe7H2F5+nUcM+C4XE1GcO9IHeLv6mk2EbXrkhTeiPx7JMneVS5a+c+vX2XVGKjgnMmYat5jnORykKxEeRh0dWns4+vuxeMzOyE8DX76tTv1OwN6eD9J8ZqHIrm/3knHD0y7SdG238Dyvg8HhZGJXaJlNUf8AEg5z4db1c+Xgm66d62/ktyUiNwI5Z22bCfQ/omnDPraSqtyyAPQn2aqBz9lGEkHYt/bAbX3fp9u9R2iRjWf2b2Xci8HEZcgxyejMZnVDeHFvkoQ8NhjD7Xc/qCzkd6nfUemPdczWzbnuZNb078ZFnjQ9+jPloLDtGug/tk8S4ZEe0oEIj2OnYvdUjjac09TmEKHmjwB/3GQo9XC4Kw++RGunPcjhiOHj3kOFg5HskIMlvpiHC4ttBsLmas+oBkVQ64nFo+Gw0MkfLT7YB5hxTqZde8vRDhsmFcwDyNVzTzwRRMRgpm9b04ypjL4T98g4xuxYR3YaIWpO/wCAybBmAb8H0h6Hllxnd7yhhgT7D1OWZ/Y5e24djuPU5tuDhxnxD1S5fqf1uA609xxKnAOD7fCdMtxI6T4J6P8AEf4VE2/f0gQ2GoOnrJ0uwnL6LKP08/fsKb4dQ7+2Hf2QMDDOn1nlqxHi4frx20WycfE6iDwiaR5PgQOf0nTjvk9yrdMtAHn4dRp5aEnQeODhY5gEgDff1qSJrhROIFHjRBH9xeYwR3BeUpvXHphsRRP3iAijkcU3tHsjTQQ2A9T0BRdffmRUlH4I6WLIOIdp/wDkfl0CP8MkhOZp7/Z/b1KG6OQO828K/ufT8sACGqG8dNhNDdOS9Y5iFXq+qmwie3cs9JfE87LHhbYjxzjPg8F42LH49Wlx7gn6dsQ4vuMaCHDUAerk8y+mdQ/vD92cdT7McCvrCe1h/wC+IAOULM9OAnP7OH329yjBZxqJ0B4D92oE+vq9XNL9BiY+4LQzZTsDcchLuXM9LPUjngqRounblqHIh7Cuhd4+wkAmhU/tOLCbKiZuv24loWEAnj4UHrXsWKMaRsHIxNP7CQro5LIeREA6lRBhIWX9kfY060GoxH4XbtkjhikyGup2v6jJlf0twPV179mckoQgAccRm77LIY9nBwjTAHh4fDNNYAC7mdn+Fmc0CYPiH17PVqV7RIn3QH3MFaAgXJh5x2bLn2ZzRw58kA/rQCekkBnBYYnZIkWyPTYODMJu7EXqXMR2dhoDA1j1EdszQOGLsEH6XbdnI5B4LDH/AEhwnQuFcr08xduOv6Dqz1yQkzQvDwHnnwHCLEzTN2MHLiExhy3TcvTqWvpIswK2Bz+Tb2cyx23ROwQ8j9I9t+QDnB1ssVwGAR9sZL3gjW/bNlbPC9Hf6bukaPzYhWzv6nZs6d/9kEBc/P8Asm/W3+OZx3/KxQORP9uNbvWbrXc6S9ERbNA/1FxYOz0n6lw+OeZDqSSuz/r7jEfbZHP1ZAnHqY5lhbXjpjb32JZfrJGf7JWyJU5yUsi9/u2KB7JfA/V3EloYk6RUZ9FjO7M9wx4N/wCxOByh5fk5mF+yc8p5MJX7zFxHqVykB/j3L6R4On9MAuz9JKvLLfwfAPLcTjwNh5iWJsRzgjKYufKbjHr1YFUdr1ZRr6wmgBkMqgXJrByDiUWlAf333FgYK7KJsuidYPG65ttLcKUNEh2UyHcBuDgz5JOWI7H+lyRHIf6MB2w1jHQv1P3OFzATc5H2j9Lcu8LGeXZ7RJ1aMTbD7aEpEno/Tx1HWzlIX50UNxAdueI+47wh+gmd6LKfYjHHsHtbxjxunFmEdGBzhuMzZ1egC8bsc/Y2BtAN7/kB9DvYY279cDge7OEUXJ6EOpwMYna0oCffXaGufYE456aPjPccT8Doo7eu8drXFEkC0e9+j7TgeqOin/qT0zpxTVcWB9fP0xF7BnEdAdGT5D+iiVE/w+9MjjgI5bOT2R45j17kYRQOLMfS1QessHefBlwW6csof5WQnozkubA6w6jjmTB3+ph3NsqKNc3UGt5Ci4ODkc8BZYOgOZjMZB6+T/cim7vcK+xVgKYi6dcz4HW27QVDh4w+whKYIFl2ogOLvXAL9NqmHOnOv09bYRR6Iwo63kKf/bHeWmc4/Z9ncGw3H57LmLIityGEVm9s+k5gg531FC6xPsWlN8iv38umLLoFweTPjJHwznyMbCTtxGSVybmJOWd2p6ZivKzU9ymENIwYUdDpk2B74gcArh8X5+mZkH5IBMTwssR5fAKXgYjEgsxPR2sLfk8+jJfH6wVtiVPfQ1sxs6D+snguOHuHz9Zv7t4w44LMD1xEUMmDqW0+K4J9lfG1DpFwkJ4HqrnIT9nUK15OdWv6AIZ48w7+Y5Ef4oYL6V8YI5ObJY+gmjy9M2N7GaBs8NXbFpjM8bQk159UDQe5J5Qrjz8fedp0Tgl5CCuu+R0vHqQdRWRPZHq/6JOpq3As/tJyfJh8t9WrVPRygeiPI4jM6v6HoujtHGQc4NgjhOO5yOmyESBfci3BR5zmfEZqLF/TFF9mjxfrJOU6NG0wm0eHUth0d/vsbfaQbB7K9t9xZiAvD0xBx2MuWwQ8mehXKb7hpCVyCEbjGRSLgaRv48EmYbKNGDVYU58xcF9WjhjzDgh/eOi6+ibcp4C076zbotol4avYwR9Nl4EHSaHrHME7KoqdYKccUgdDp2E0cHUCYODAkE8q05059JZ/HmP6Hq1rjp/k7lcqfCcH40PpMkfbfq2BTg2H1/ZJqc26ITq3J4PDz4fCSSWM3J5Anj+QIkWTwtc5aNhudy8c5kukEhMhpDjEzuxOX0Zz/wDsQnwSHzD8R85DdIjevkNkNKuXXriDL2PX+eZzHYfpvyM1z9uBhLgG+ySfBUfXkBtmDm5+rlcrnr47j1gD6F7uGg6cPiHnqUUuFexqf1Z4eo0SwT643ECmlWiGEj39YHwsyDDnHID6gNPs1Sro9l4JWlZDA0DnMzUl2aZj2A6DvJX1AsSMxyVaIf3BJEA5brwXRBgsMA8KaPbGIE8DMNzoY9UCcHjgwC5DlzYvGHNLmg1ZJsSdx2Io4Ojj/RtFrQPR97DOhu6hwySzguxQtS1eXTsbjlmL9CJ6pDHqMCxbTwBanlJ3ZsLarpuHXH0nuNgADsfX+J8dDnAT30zaGPRiXU+Gkcce4FzssEhaYW109wyfCXBbvAfQ+OSltWXmXGv31E3qb/nH/cyTtBGh3CJHJ9sMOX3JcBzs06rYFeMY0SiFJLkPompuWmYYYyu9eyDOiHN3h6x9305cH/skNA+WvtP1ceYcJ0z9XLV8upOfQsyyRMEiRBCBksksksZ8T5lrUfZH2H7AnxXxUmt5vAJM8F9uvIg+xJvWBORHYFpE0hV3V02aS7yNjPX6XytttsRWkHhwQWSY1uySB+hyFZDx47dm71FHTWzO5i2pAfdI1+d2/UyIexv4SLh9LJM7h9Fmz++YBCDX0NY0+J1MYRHZLclR+vsnO2JHjSzDveGEpKcavR6tzggevWlkC1/+rfnUZgHAA4fr3ApCitJ11kfrmEb0+dIm4+JYToTrkP3W/Xq9zgGzYwDcmGmqYdmr6+XAhYEH2XMcApvsIBMjyaSWli9NIDqM5JuWwP8ANjJTRMvGufXTI7uuF+SOOBA6LY29kJfl+/UKw4SeXYuv2TKs+I3LEO73HD/2tu2DmgPTj6gVYDNoZqyHJ+o72CN3uzHo0KmRzBo2PQL+o1kbfbYyT3HBOZfjj1Ps0itWMMAHMC9xYQA9dIBJ6e3H5PPBFz1vsIKNj0euRLK7qF3DOkukKyZPUtng1hMny8O2L2IHr4J76L7InpF9IXrfKiekP1vj/wC43rfKkZ+hOsfkiHxYc6z8c/FfcQDrbet8u+fD9f8AcWlOJ6lW8Vq47qKOeL/MJipAOVpOuPpPnK+cyRodjb+HqMXG3UzwMFNWZpmU0M1wP7k93W3aZJCuQBwJrCFCvo/2FsFwrcJwf692JMHzl7/o8sLDp3OGXhNzNRk2F1OldhXkOHELbIbVyvsVV3bdT51Dc66Y/wCUwnVFpIoU7h/3G7/z2wn58TWATsNCFHo2YuBCoZNEc4jeZMAeMgBc5ZI7wsIiMpfykxk4gf1K2Sz/AGXMBOjfpLMtdSZvHD+5EnXr7PMsOJiOM9/+xBTl+7BuDYWwPRBR99kYGpOVoZZcO4YODs78kt3FJgPjzNFu5G4OiHotD9JBdYJ0Q/6f1D52JIXApD35D22VnyKUliIHhEYZIIHtWzQZw+7MWoVTYBETvIW9/wBN5VV9LgzB8g9kQ/jnH+pIdYa/T0y0BHb3l6YDX6IRBaJmsrJix8cl3AvVLRxLcw2lt1OH+4GwG5/3uVlf0qR0TpIj3/34K3xi+1TvaTGmmNqYkqYMIbH7J+iV7X3b6kv3m90ntz9nwL+CSWkUW3J6Z62Dg/f2WmQut/2PxaCU4LzK5n2cclzgGDHPl4yxMPKcBgf89wbuRwZsqLn6Ig0r1QuA1zwOcuBivKPseePPN9LiEG673oYHMrPLv3QyFwGsH2lUVpA0+n5ImmiYIDaDCBxAK/eLjOdeYASIYGEq+x66WzPikcMgPY5BXmd45mAWIatzByP7Db2qm9to4KSmYQypY9HiHrce2CYcxGeZl9m4IzW6TpZ/os4M9MIwwJKcAmb1YMeGHmGW0xyby6h6mLzdFbxcPR4HkkY8NJwDI9dYRzN16x4YFnHPpkkDG7ns/Xxt9cEF6/8A1Pt8V92WnTlyhG6Xya6z9rEACjbHU7nzJnnhPSEKed592bD7a0emFvXbPRkuF6X6/wD2zTz0xth4xgW5ZTwyYPF9jkBzAOyHZp6LXy7wltfFP83Yo8Kuyb/nyr8tPrwyatS5VuXLly/lqVJJM+DDyLInwySPOFkcOkeXLvBx0M9fbV1x/wDqSkjEeEfAGD2SsKzo52DJlwbyReBZXAOVVtykijabuMH6O8ixKBd4yeh7MRyzXgaavjOFkAkrirq+BDkMH8wLuHIHCNKkKRWE8qSBjvT4lAHj4Ezjbzv2SSO+2HvDphkcHQrwSfqWBr/QMS0ejNaH2y4cALdmkSUhP1BKV87BkyEmnUHCnObJQw1OpDFNyTeCR5RN23wuQ1MbjvmIJ6S3vCMdYoBLgAn0ixkhJInHI8JVhYxHSPZL1em9Pcv/AMnsn/BQ/wDaR5yrLhUrPH0Qj35Zr2wsfcBzzGE+6fZl1o+4vcWn+o6CnoTecsOeTudaLpM5bmfBMLuYW4I/QupJBEZRxF30nXvmyWxKR+lv6jwu/nnxrLKEjI+DvyX9Sy8Cl8FngUvAx8sbGy14YliJdxAB0t7hThm/0PZF+Re7/wDk/pi+Xy+zp8C4TdT/ABcAOee9h6HAffPMRx6TRl7/APd5WHj2a8dSZBK+2A9HOTa2QmmGP1DvJjimvkOJEOEXOfL1OCB/ydTzEBkF/wBmyG8DzyAP7lw+biNLXEv3Od8P1gwC8PQTqdLkbYVmOk5SEJwuNZ3zEZ2PUgUeM+wUvbLgLInBKDVZ+AxlGrzEBwDxavPCCguiYvUz1M2PgQZGEwp4x+yTT+m1hH61LAdQOZ6JCznep4vs8LOi64wQ59WHxO5y3rp/UjROXe9xjBh4rwSRnA5inhDcJGwehVm3GGV14NpCXMp5QFg9eCpf2f2moPcn7Z+37J+0j7P0v2W/sr7LmNfAa+CskmZtxaWCzZ8y7Zqyz4D1mTih4HCfsYMNDXITrtbuzlpAcD3xCc5mQ6cythrpAHC+nW4ATccQ9JDG0wHHx+lyhUMnrCfW05gxjrlefW2eJtH30Ze8gd2cgPkO0QTP6YMHOOrmGFvM6wJ00WOEMu1zmIU04lhHKTeIRrLjMN7yPj4T4JOYmRJCz8G/hQfw4Ys2xo+0RLzgA313KwdM7vpnivHH65j5mDpFQwPF+DJdWRkj6/7T4H9zVV/XjQ8AW4gWfFhr+luYTm55yaYZyMdkZlN/Zv8Af4P1eUFS5VrKwvjPwGFixZZYWztpu1xj18nR5M6bgBXf9EiJsFcwzkgDJgDxskeqzbgzlgQ40ORl5/6sMhvHxrp/1Ps68lslydaxeysnIRmqNQsORjOCMgxdhDjQ3Y5nZ2s3dz9EvBZwyuZ4TifwyzyJClyZD7JKIxo/aftLzTpk+QYxVa2KD2n+3Ndy4nTreebck3hox2DJfBjGCoIJuJm3P7mK3Y8BbSx4BbtIV7mIZENJkWCRPgPhYnwLFf0zy6v6yUQkEhM5LPkuPG222+QbLjxnhOb/ALSoZ4F/v9zvI58NpyOAZC8FULvDRvpGGW7IAusnoUwQ5ef6jK7FiRG7AI6yNvPl30luOMFsdyHEI5urQz+oGLD0hh8bcwWQMThJdp4x1aR/SN4+LeET1vg+F/QkvWbnCfl9OgO7D14bBYPRVP8AuaCt4L3awouKDIZskKvMHSfygJ6UT1sWxraB5WnqBe7LTwb+y7W4jT78GssjI+GXMsWKly5f2WY3KlSeBZXjGyy1Y+BAWPOWTBzc+OJJDbix16s+Xywj6LPQLkQZHCZ/olVG2PSzZ6LcubciUQwF71a+uY+Rak3xQyK9RZzYePAQSIfGQRHuMD3bPMDafaTdmlt2eH+7Q4nwzqYP+5/1vdJqzr3iXN1K06DeAXOhJzYSM+9P96TMow7l+QCaDweEkWnNrF+xy5PtgPGBFhOsUwkT4NfDMTdRtza2sr9nbVzKyxfiX8n9JEEpIkSZTwIl8hJ/Dn4FkbmWo9Fk4lN+y9zEodXCnMfGv/7BTw6yE+3M3hjbtHF+3SdGSOnxFHD8jfW7C37koeGyhfAti7ae9Ippm0QeFo6f923wtA2tzHwLPaHwyyyyyyyTwFIBpnyBgorAjHMT5ukMhw62n6Qpi2FjkDI+TZJSYPuTWa5ftkeN8bZ4d85b4zxxba2MjakZGx+yfuD9w/dj9siM78l4BlnYTGL+B4zxng842N28HBYlyvg6kclo2SzZ9kqxDkyG5WhGwuIPbMqK55fiAeouBNGCCETvW3+begm0+7Anf+1sDxt4E7zLVeWIILi487bDcWeDE8DTS57oYLXKwC7pfQ47+XCcc5UQ0mys+OM2a2B/34fwCfGWeMksYGyUtPlsvlTZszCIEMj7B3uxJ++WKfE5Secsgssg8MsLQseO4Vr4ycubUgEsizgNGWn6g13YphIB+SlzaON6yDdfGb+OeSUuW9sQrCbQH/6j3TA6JZpzJmtZggsjIf4TwHhllkh4FgdyMpDgvImUzphTvYRtCK9EkcQuDDvLb+W2wWecsJZr+EjX74ZnwCTiyxMGWvs1uWTZi7cx2Nth/A2yyzxh5CSyDxz4IWtlA+AjZc8QC2wmIgCxDbEeAi8e29ja8CaXaS7/AN7LaJlGEzrMEHjbY8keA85z5MiyfLDwGBBvMcHXDOPClL+p8JXHxJ2yBJxqurbDb+DYYZfHFiGWbi0mMa+XmfAifBRMll8D4ilnzlqz83z7/ALq5s/fhZyuoWYLxYjY3dljwER4O4LR2wfcbHHJjtPXCOdM+Ku73K8xFvNvkjwBEP4EEEEBZPl8MFqN0PvVkT1FY6MUt9XzMM49Bc8743CW3wQXUpNYxmZqtzI+D4mJZ4LLPcpiyyXwMWfJHhjyH4cecbLLq1tlkYL5TdiJ08KJeAYwuyb2trQTaQbzSoUSzbqBmdRg87D4PB422x5xQtzagY8vhJPO+Y+WIwezJeXkM0ck1uTbbH4EMMWZivBq5gykVmfDifA3cxNyeCtTvgz4/HIPwSLi0t874y4zuU3uS7ZCH0T8pf3K++Bm9xHXgeYCEQF7mFYEaJtJSD/MXI9kHGEpqsR4H+HfxCCIHgDwB4NtpbMssSPEm/pOJXbOP6S7xFswfGrCPJVsiZsvlN/vAPd9c/aaOncfW+u/bfsn6yfsP2/tBI81Nmxb4M8bD44h+pfqax9l++Yf1v1S8vFvf8A3q9+AR5T21721oAaQ7OGam0aSKraseB/Ijwb4PB54hi2GIUuZR8GfDZnwMZhY5D7ABGVWHi22J2wcxEts8J8LcwQ/cP34ftl+5b3P2n637PwF397+6/U+Ar+1j7JsSP4FDP7b91+y/bfsbX7/AMALJU3gAL3Ub2RhmG3mBupsyLnk7ymI8keSIj8DxttsMR4HkbXjuIGZLU8HzyJG0SFMtUJeJeL1PgD46lLJMJ40hJnEl7vXbe0yfiPeJz3cO18N6wg/RBHRPpL0C/RL+SrVv/gTyW0D3FM1IIfEVNGJtVlu/I/iR+ARHjT8QeR+IYkyLPiUmjMxIfG3vwDlJDwWzL4CcsR8TqUsPGZ3n7ZvZehHh3QK3urdJm9mEv3lduV/8Ug8GQ8LWgtoboh6aM+45fVeM8bbEfgQ+AjxvhvhttpDCR5QfDfFrXxDijbA2EMtl8AJIyROPc/tLe76pO+AA2LvYkQlmPMwxg/DKe8t2r/5LZ5tqgHpbvex2U267tlsi238CPwCPGz4Nh8bMfAoYfC8P7TWtVbiLw0eNiSRLjCbB9xjzZuGZkyL99+6PtDubwfRH2kZ3N9mfD/A/wDjeOUXClRuX5Vy9+Nt/EI8bDB+G2+TxvgzUERb4FYxj4IobiUxLfBZZuwvcfpkXhmu5Xt/k1+30Sv45Z4f/IMtc7yvO22/ntr4It8Nt/DZZfCeDwHwbkvqiPcgmqh/ZpUFhYnHuEeZnq99Kdv8GrVnkDZsyHlfDLP/ACfHjbbfwPG+SDxv4j8Nm3yeUoXkD9ZT7tXL4OrKG9znc47iJX4Zq1ZFz5BATZ4CDzlrwxMmZf4n/wAOrb+ey+TxsvnbbYfG222+VJL3A8TpHu1sumGZD7irVxP4REp/EhjZZ4DxfAR4ct8EDNngyzP4hZ/408b4Pxzxpbb4I/AtPDeYthRk8iW9ysJdCrujLAnQi6ae8XfP8opFEyxFTySEaxGIPDBLL5Syyfxf/HHg/DbfJ52It8iwYjwKymxugjZxdsRIgj1iH4S5Xw8p/wCCM8Ytw+DCLNjXgxqpcng+cs/J8v8A4/ZbbfJ+W22ySIlkWK9Zerh40j+ctP1dEkHpknHLsF/w3yh4jV6k8CBGFhuc/htW346kZ/B/5+WPnUn5BHkFl7tttt874IbbfDbbB4WbFesu2IPZD8hCerUxm9eJdsv+WM8GkZGUeHNhBIYIfk/pP6T4a/J+Vv5aklW7cu1atWrVqxj4QocKYvx15NefVjYx4yEfCePc+WlnXgx4Dw2/h7/A8753w8t6ac6vaguiN9XUN0V2qlPv/wAAM8Y+ARl4b5yRLSYWTJn9Zr5P+sx/C2ML+nxJiEPwX+s8vHB4Wb8JTw4nzkTP6+KWbcMTNfO/gT+B+LNhL019rusvWLpWEQZiKdv/AIQcs2P7HHHgiG2WG2LiwmsT45kyPB8SfkwXy/VcJy/h3PYjXzilWrhjn4HDz78z1nwpG1hmA/wb423wMtty+AVsjbFbeM3c8OU9v/h3wMkIvsETCNkk742JfI+Agkk8T8FS/osB54g8BEnhnmMeEeZkzTJJYSZZPGyg8Rxswfk/gxETdr5L5LcIG5N7zkPL/OfzP8j+Lfb7r6JJvHhm9+Nd8JjxvEdSTF28NhsEWdRM/ACAR7vfjsTPd2fECPHqfB0+DHjWTr49o8X2fcdN/8QAIxEAAgICAgMBAQEBAQAAAAAAAQIDEQAEEBIFEyAwFEAVBv/aAAgBAgEBAgDkcQnXI5GHJMkD4cOHD9DBgwcDgYMHB5GDAKwAAcjB8j8xzFkBTD8PkgfDhw4fg8DBgwcDixyeRgwcDBgAyvwvgfJGDmPIDEfh8kDggg4eL7d+3s9nt9nt9vcOHEolD2MGDBgwYPq8vgficHwmQmOY7H9J2/62232HmMplMhk7ly5fv37+z2GT2CUS+32iYTCdZlZeBgwfkPyI5GLnsfZTaGx7/eZ2naYzGUymUye0yewuX9gl79rGABBEIF1110gWMJgwYPxofkebwZLk7pMsok7FmJJJbsSW7XXT1egQCEQiFYF101k10gXXGuIBE4PI+x8D8Th4Y9xJJNPKjo6uHs4QU9IgGuNYa41hrDWGsNcQ9OtDAysrKVIwcPh5HI4rgfI+zjYMcvJ7GdyCjoytCF1v5f5Rrej1daztd2TlBQgjWNURAC4l9jPyMHI+B8j7YMAHBX1tHJEyYjq+s8bFruySbrqIxEIRCIRCIhGIliWIJIHbsGscjB93Y/JgVCyB8GWyPC8RCZrmFryq6dOlVnbv7PaJhMJA6urAyY4qhgwZQAFVXNcD8TJ2GSrLHxZxo2iWKGKBOtZfbv7PYX79u12CrKVKlCMcOvXoFCKoTp161VVXzX17hMs3dsYYDwciij1gS3ayfgm7vgBQoXAVZXsp6/X6xGFAysqq+K/H3iZZ1nErYTgOHNcg/NHmuoUIECBAoAwYMUrg+R/nvuJUmWcyBwcOQFTlVVEEdenQJ0C9QKsye/8ApG0Nsbo3hvDeG6N0bi7Kv/kPAxcvuHWRWyHEzr16CIoVqq+ACz7DbJnMvsEvs7+wSCQS+4bC7cO9Btg/Ffhd3fTr09fU4QuAo6PDJFIGB79ixPwFCdXeWZ5C3bt2DWDdg8deoaHZ1d1H+ar5rl8AqiTl33Mv9CbMe6u8m0u23lF8uPKDyI3I5lURlZGmld2kMnYNYII4AHA5Zcjm1d6Kf5J/FyOCbJvOoQKFVAvr0XbfO7JLJhQLrMd5fMSeUfbaWiOwIwEAYQOLBu8ZcVtbd19wPeXd3eXfLjkAp06deoFDAEaDYk13kG0/kdXdOn45dpJPB/8AIbxx8W3iIvEL47+N4IYX8YUzr1C0QBVFCMi2NbdSa77Xd3d3xJxeAYcqqwAZdwvGraL+Mn/8tD4vTneA6LkTCcbY8iPIDb9rnU8HjRtoTePk8ZJqha4BsgriNq7sU3F3gPzJh4XnrVYFOKpHbssi7Cb39sCT6da0nks/oXcTyq+XG8kZ8e2l4HSK523/AC6ecXyzbT6NdVzqAUK5UG5Bsg/A+ZeKXLPJHXtdABSqIwGUjwbskKtvYcGRQQeGj8YmuZf+hH5UeXPmf+u3kZNh1k1xAAEIXAF4aLCIpdTeR/m+JeY1IOVeUoIs5RAZR2wEZBLNjJsx6OrraexvT+aOxUcneJmf2PIq4si7H9ZYiuoAC4yEYM1t6KeuL4uXKqJDhwIydSgJIC4xAZq6KEZMUkxDd1fH6vkfJElOqgEMCHTCVBHtDh/YZBIZfZ7PYHduCINrW3Q2VRwY2VVrGkdU2BTgUi7BM3cOHLLJG5zWkk1fJbBlUIAVxRgcye0yh74uwQbBBBB+VfW8jDPh5qqALsMZcbCMMplESwCKq7iRZ1ZRmhJ5oxkBOBjMZi2XfbtYAQRCEQDXGsNb0en0iEQDWGmPH/8AJj0Yt0ZWVVRqQTjYysXYRIhzsspBXqilSBGF7eOm8tEwUs64XJy7CJqx+NTxS+NXRGr6fX1A5oDBgAHFyxIYZ8Iqo164D3VVibOxwp1D+32dhyGSTv22xsxxE4zjgZHqweLj0VjwDKqqqqqsoAADmqGSa428rqijAVjZL7dCpf2k5d4DwDYbt4x96IYz8Q62v42OGgtfF8XzYIwYOLv4Dd6AqulXQRmLE/AiXVTQTxo8aPGnxr+Ml02HjNnykEwxRpaEOuOL4rmvkZQAABN3d3dg5SLhY50zsThw4AuvHox+OTRWCuLvCuz4+eKRttVPj9FEAu/iqrmqwABcAJJJu8qqGDgMoOMxc8E2Io9OLQTUC5f3ebup4o+STx2tFEAT83eVXwAAAATwTzfI57H4CJqxaEemEw/NZXwDhh8xr+M1cOUcA4ri7vKwYMGDLJwn4GBRCIPVwcJxYYtOPSWL4OV8k/IwjYhReL4qgBENYao1f5f5f5vR6fT6jGY/UYfR6PQIfWF+CbpNaHRTVCfmear4B+K4UBVb231Efr9XT4J/VY4tOLRWH4PJ+KIw8V1IPwEXXGr/ACHVOsYVhihK19E/4otQL81h+Kw8V0EQhaJgQI01U1gvNlu2Xdj8Sf3r7rD89VgWHqXVqaMa6phJbt2zsTne7HF3fwT/AJa5PFdVhWKzOZxGsX2VYBu1+32Aji7+if8AEfxAWO2n7iFddU/IhoijFsLCVZxsidZfYH7Xd5fb2Bu13d9+/fuG7E98riuK4MnZYVgC/uRJE8bD4DCQS+/+j3+/3Gcyh/Z7PcshlMpk9ncOHDGTt8kYcLrGsAX/ACFZIHjPyeDhYMzqbB7WCGL2D2sFMduP/8QAPBEAAgECBAMFBQYEBgMAAAAAAAECAxEQITFRBBJBIDBAYZEiMlJxgRNCUKGx0QUjgsEUNENicuEzovD/2gAIAQIBAz8A7eX47maGXYy8IvwXM0Mu8QhCEIWHnj5nnihMX4BnhBLORS3KZDYjtg2MfhGMY347M5Yj3wQhdlYLBdwxkhjGSJbEtvwBXPZ1GSHuMeDH22TJkh9nyxQthCIkF0wz8W09cPYM+yx7EibJjw8jyHsPYeCIIgQELuMsM/Fu5InYbGuxdl0sERIECGxHYXaZIkSGPGxbx65hCweDWGaPYXbYyQ8EIQhCxQiwxj8b7WCE8GNDMz2MWPFCEIQhCEIX4CiJEVi41ihPCRLmGoYLFCxYxjGMY+6fi013FxKwksGPwd+5XhvMT7ehku6Y/FoQu8YxjwT7Ohku5eK7MURQhCEI8zzP9w/iPPCDIy0fjU1hmZLF94kJDHuMYxjGMYyRLclvhGSV2J+DQsLYMeDE1qQTKTWpT3Ibkdxb9tjwSwbHgu8aHFrPCMldeByMxCQ8GMe4l1H0JpjGSfUcleLlJLqotojF5Nv5pop9f1KBwr+80cM/9VFCWlSPqRejTwsJLsPwEosatmRmvAZYskSJEhiF2JVIShF2ckfxHhuFkqnDwaSSi1KxerJvhiLX+W/Qm3/lItF1b/CcvmmVOkJo4ldWcW68VFuVr3OJpR9qLSis3c4T7CM3Uvc4WX3/AMig9KiIy0nF/UkyS6d+sJJ5McWk2KSWYmPFC7nLsIv3DsOMk0Tn7Mr2OE5ThKb91nDdLnA04SlUlZKxw/FZ07M4h2acbeRw1ON5uPMcFX4apTco2nGxRSj9nUasjio6VvyRxvxxf9JxV/8ATed/dOIXSPocXZ2q8pxylG7Ts23ddNji+Zc1CLWrtsTilfh5Ld7bEqtVxUHHlWd2m29kcXTSbptolHWLRfBjHi8bYTpsUks/BO3cpMyLPUpTWcihNdGU/s5qMFdp2ZxU+MlOq4qDknbmOHo0Ps6Temcmx0aahLNlKs7qo0VlKLjWdkxQt/MJ9KhURJaxIdaZQf3bHDvqUX99EnG6mnmm/kv7nDxq0Kjbbg4y11cV19cIS1imcHLWjH0OBVZRUWkleTT9ESvenNW2ZxFP3qb7GWKY1hKLumaKQu/zMjLHLG2CHclsVujK8fvFeNsxSspnDvS2Z1SJRZFrMjG7RU5spM4iOkziI6pMpP36RwE9bxKFX3KhW6STOLWiZxlGtUnVm3GUbLO9ncnuVPIn1iU+E46rCtQbU1GUZJ9LWP4ZK38ur9Fc4D46kfnBn8Kqq8pRfm4STOHqwc6NeKV3ZSvbLzZm1zZrUsveG+o9zNq5fsSptJ5ojJJpia7rXHPDLC7GnhYbYxXI6dTLCRN2yE0rkoyyGspFOrFuJKnOzHKDLSZkVKrtFEpW52cPBL2bkIr3Ujhoe9Uin8zgkv8Ayo4SP37fQ4K6XO/RnBXtzN/JHCdeZfNWP4bUlGTs5JZNxOGnfkqxj/Qv7lSSy4t/RqP6FXX7aT+cyvq1fPoxx6fOWaHdX16ZP9i6S30Wef5DWt165fkO97PNa5lzNoknlnjOnK8WRl1z2IyXeXZnikxtm7IjSMr2GkKyvqNtCVtnoOz5WTb0ytsc6yvk8mWklYjclB5Eaq5lqc1NnLUZOvJK2RTowVkrnD0dXd7Fd+5aCOIm/aqSfyZLldpfN/8AYmrOydv+KGuVpRSaemWnmy7eSaS1s3+p7PRvZyv+SORq3MryvpyildOSX9TkNxVoZ/8AFf3HvZ52zS/QlF++/O0mVlblzWrd2yd1FxTTV9GU5X/lv6JiclFL8mSUXZX/AKTK3Lb6P9y+av6CeaT+dn+5JpJx/Jl1eK9EO9msGndZMaaUiM13GeOREu1ZDbM7ISWYmxaMSfvHyZruy0VZHMk8/S401ZpPXp/YvzNWbWupGzutddCyV3H1RFt+SWxd3ae2Di0xTjkOVVIjRpJ2zHF8lP6slO7lIfIezbf9fJHK3eWVl05ml/YXN5+XtS9dBOTVs0tfeZzVNXl0lmXXVfXlG4rT0LxaenmyLeVv1HzXi7P0LytzNb56kF1XqU73bTKafQi30tukQuv2I5aehT8vQjzPb5EctPQpK/7EGl+wsZ02k3dEZJZ3QpK67V3i7WLIS6l27MskrXE3ksy83l0FzRWTOZtXT/O3pkKayb+Q1K270/dIcbZcv/qU+TPXPoJZR5rfM/2xJ52sr+RU0UmVdG3mTVsl6CXz31FKJyVFfRilUUj7GhZascld6kle44530lr0T/uxOVms16svfR7/AA/V9RKKWq3eSHbf8kXVr2fkrCjbQilZJjtoiSWTHv4GUJXiyzV3ZkKqyfcZojeyTYnL6Fmomaz06HNNR5dPqNOWabb01/6M+jbyS1/6Ipx5ks9c7i5bZv8AT0RVk3Zv5RyKrzf5ibXteiIKUr/S7FzK0V80hpasjHVXe9xKbbj+Z8/Ug9Uh5OI0KrSs9UNzaEpocUn55fshJt2Vm9V+iLy9xD6yyI3WvzLPL8yUndvtMlsVNipsVdirsVditsVtit8JV+Eq/Cyr8LK3wlZ/dK76FZk3rInSj7M3cafJVye5ftJyzLNafJjU2npbRofsqS19PRFv2btf6IS5bwzy/wDrISSTt9f2RJ9ckNpNtIiptNeo0ko2X5EU+iJJvVk5PSxUtqSvmLqiDSKeVkR3JLRl8mj7LiVF6SP5jLSOZJ5Z2Ttk/kNqyyIpJSYloN9ib0RVkTfRm9imiiiivulL4UU/hRHZEdhCFsLYWwhCF2KdRZo4jh38cNinVV4v5rqsELC0deu9i9pJqyutkNOOiTe1kNt7W1Xs6EOVK30WRVd7ZIhn1sJKz0IocpZKxN2uyBFYSsSb17DJIjJDUovYVbhYVF1RaTFoxp3bOZ43Kk+g8m0UY+ZCOiXgH2GM8yKE5c8HyyOIgrTpXe67CUVlbrdLP1YoXtJX8iTeS+pfV3INWSsJRzyZshvVkUhEh9pjH2FV4arSeqzQ02csht4zqNZFknLIpwWS7p9tC7D7Txew2k3MUbeyQVxJWWZKTusiPUiMfYZN9CbG+jH8OC3FuSKkOhKIqXFQb0bs/ky02Wlg27IlNptFOmsV4pdi6zIkkzPMii1xvsNk2N9B7WKa1KUdELbtReqIyTcSdGpe2guJ4CnU6pWZZjbHNpsjCKSXeLtrtsY8FjkNoiksH2ZyG+gynEitF3ka1N5ZklGrRkOEmh1aqyI04KK7p9l+EaRfsSZKXQexCJCOi8AocTGa66l5p7ip0+a3dsfgpPoyexuyPZbJNjfQSIR6eDuiNRRFGKWGfaZJ9CZ5kdyO5HcW+K2wYyRLce5/uIkF0IbCXTtyZOWEF0EvGtiIx+7cqdIFd9Cs9ZEushbsiRF4KUuhJ9CK1IR6eIk+hUfQmSJlTYnsNsSIbIXioQQl4FkmSJIawkyT1KaIrRdlCF+GNkmRRBEEX6YQfQhcitFg12UXLYv8IbIohEgib0RVlqyK7mSLDeCQmIv+DNm5CIuiKkioxLUiuneIaMjMaJYITIkRCELFCIiEIWCFgu/SEtCcib1IoS8CmND7DGMYx91ct27Iu+5sMcupES8KmRLd0xjb7TSGx4PtNn//xAAjEQABBAIDAQEBAQEBAAAAAAABAAIDEQQQEhMgBTAUQBUG/9oACAEDAQECANu1lDND/AUJhMaagghoeCiiijo6KOhoopxcbJJJJJJJKKOzo+K8nWSMxsoQR1CYDEWkEIFDQ0U5FHZFOB0EESS5OVkkkuRRR0dVRBBHoEm9TrMbkAeIlCYnNIILdBoYGCPqMJh6urrLC1zDAcYwFrkU5FFFFFFHRVVqiCq3SKaVdkyrLGRjNwR84fLHyY/lxYMeM2EMDQrDg4PD+RcSVdk3driYn48sT0UUUUUUdH0UfB0dNN6KkRhGK7H6RF0iERhq5cufPnzDw8SB/LZFaLu45D8mXIMtooooo+ySj+DShop6jKILaBoN4FpHoCghqy8yOmflPzZM1+ec52YZ4XBFFFFFFHZV2Ufxam6CMpkXIGi0gEO5WRx41V9nd3mfu58kQ5r2PY9sjXAoGBBHZRRRV3q0fJ8MLCpHl/KwQQUWuByv6/6/6v6O7nYHENA40rLzK6Z80k0ktiJ2MMeOPRRRRJR2UfB8Hwwsc50hKuwQgQU8SsDA2gA0Cr5mXuM5yDkOyHTmd2Q/IfkOlgMTDGY6JtFFE2fZ0fbXMe6SyjoEEEECp2gK+XPnytVw6unoOOcZ0DoXxPYRAoXci4pyJ5F5dy5F134KPkbEPByjJGqQLSwl2Q61VcQzrEYZw48aqiHiQSKQFROif2dhe6R8hkMpk58+YdyLrvlaJ9fznHfAIwx0TmqkFzfkUG8QK2BQGyS4uc6RPa9j4wGyd/f3mZ0hdyu7u+XK75WTd+egwOx345hDXwPirRVDxdhAK+XIvLzIZC8lyIcHh6Ju7RR/yABEcDE6F0BilglhIRB3d3YdzLy8yF5ddkgCL+f+U4RwD80/LPyj8o/KPynfLk+e+L3Sqq8jQ8OVcHRywzY7mpyLuRkdMJQ/nezolrWQCENV3d3quPU7Gn+flfNI3dhX+XPs7OzkNFOEkU8L2ytIXAsawDdlxk5xsZHfK7/C7DgZYc75kkXm71d+eyTJGYMtuUMv+s5ZzHZs07nk0Q7JC6+vrLHl07p2vhYxl/uCCW5nz8jD/dz5nE8+zu7+4zGQnYGRiD5wwG4bIWoOhI+bPgMZf+EEG58TL+a6Oq48eNVVeLlJRN3ftqlhZIyA4pxJcYT/AFRivd9HmGBrXic5Hf2Mljz9X4O7BBezL+fLi8Q3jxrjVVSoF5J/IauQjOH0mfVGXmY7Jv740Yug4h+f/wA84vBqy/rBMnZ9PF+oz6DMj2DrJwsjGpVxogjxbkf3p0TceZ8GWshmO5xvh1Bjn/2jL/8AQ5oeuv5vyXfHd8puK3LB8WCgZsbKwiPB8klH9rHiXGimIjDhVPyXZsmQQcGX5X/G/wCL/wAWL58EEZY4uvlyuybD0C5uZ858V6KqqTiUf8j2QkpwKmyGQNxQ1HRAaYwzjx4GPrDa4qkQ0oEHJwcnEvVapxOrQ/K1fKybQTyw5csMGrQbVbqlVcaoCqotaBoGaDN+YW3djRJ/K9VXGqquJAMjYsvEYdgeKqvxpVVaACIyvl5WHbdlHV7tDVV+RQX0WYbSigN1XqlVVq9Xy5mb+o55+rJ9TJ+UVy5aKJvYQH51vPhwnlAbHgKnPOUc05pyzkdxkL+V3y5lxcXEqi3HyJW5OJ4duvzAryFhog7A0A6Z2a6VHV3d3d3ZJJcXk6vlZEOY75+z+QH51mgIigEBLlSZF8uV7pFUqIog6OqoBBVx4fjX4EnJOd/0B9BuY13HMgwZTt7pspWgLu7v0USXFxIHHjQAFUQij7Hol+W/6LssuqlVMfj/AEKgBCkfLLYFKjq7vVk2SS4k2AABQCBsE7I0PZL8x/0HSoeQFVLBzM9jdTzWB4Pi70UUS4uNgIICtAbO6HkukyZPovnQQ3fKwgq1RTZ8B/0JigiRuy7VVSsokokqgKArZRc7IOWcn0+WX6EmXaGhq9AAAau0Q04mRK8+bJc52Qc055zv7hm/2f1HJOR3icTnIGR/Ucs5RyTMX+Dsuly5Povl0PxGrvloaLSNg6e4yPb0EGQyCTt5/wCN8030ZMwnQ2PNggjXLmHN2SZX5hz/APoNzxnDKfkzZHO9Af5p/pPm0PA1erQAXLmZzkNna4OdNJnyZpfqqDAyuIaG/iB+9obsK70PHN2S/K7BE5nJkxy3SJrQzhwKDAAOvjxdqvIH+G0PF6CCsudkOyAGYYxHTPmJ9MkYXM6w3oEJaSTxo+R/ipDVoeS58oazDERyn5jn/kCzIEsbWpsbsd+KcM4r4DCYuPHiBVCMQmPr4dfEMEPQIekxdbWdQV+Bq6bj8H5b8on9ggociKVhQRNGMwnH/lOJ/J/L/MzDEBj6ekQPibC2ARdXW6Prc0RBm7QNtDY3zvyi8f5GPgy45URsaCDCyOF7C1zeHEgsbGGhpFESGNuv/8QANxEAAgECAwcCBQMDAwUAAAAAAAECAxEQITEEEiAwQEFRUmEiMkJxkQUTUCOBsUNioTOCg8Hh/9oACAEDAQM/AOHJmTPi4M/5nIyZab6dj8fwuRqWnx5cL8EvBIkMeCELwIR7CfYQyaJL+AvHCtN5RNp9BtPgrlXyNayZFdyCIIh4EIQhCEIXGsERZFkCKM+oy4fhN+bIJaC4EJcbGMfLRFdyPkXkuy7612LSasK3CnyXi+CJEiRQlhIn7lQqlRvUbMuqSIiFfFcuJAgQInsSJkvI/Ix8bvhl0+eNlyEWRFOxHB+CZUKj7kvI+FCIkSBEQhG8y+GZb+EvE/qPkRIiwYxkiRIYxjZdoREQl1SLoz42ZFqmKFgxjGMYxjGPjy4X00iaJDtx54KxeeDHwoQhCEIQhC4LYoQunWO6xNYNcLSGxt4IXLXIsWx9+r9hrFrg+Ez6VC4H1SEJixTQ12GsMjN8K4FixjxkybHimIXhEfSiPgj6T2H7lRE4PNdYmWLGRm8EIXLbwiRQhCEIQhESJHwQfYhJaEoNuKGnZ9UhMSwqJ6FTwVPBPwT8DwfAhFxsSQlz0RmhO7SJ05Wa6GxbBESBDyQICN4TwQjZouzkQkrqwvKH7FT0k/QyUfpl+Bo9xtjZZdHGSIVE8ipSk8ugbeDGSGMkSJD4FchPat2E2+7v2KyikpldP5yol/1ZIrRd/wB5sqL61gnvb6SitGbFUz345vSxOnXcVBRURR8CxfRQqReRKDdkSi81i+XmZ83MpxW/FLeNpctEbRJao2ju0bTvJJJtsrUo3kUdHvXNqnJKnCW6bfQ2mlPcl8ElKz0yJV951YWuzZX2Nm9/yUe05aeSPapIhB52dykUGvmKTeUk/BQlTclLvb2+7ZsVSTUa0brzkXWXNhNWaLZpZFtCz6tNWZVi3uxyNpg9JFTfW9OVrq6NmlBKCm35sibalUWjyQ69XejZFairOmpFGzUqNm0Oaf8ATyKb1gUmRekyfaqzaF9dzaIlZfQ8tD4ktxrJpP7+PYnHZqtGnDdjJyX9pO3+FhVh8s5L7M26OleT++Zts4TvaUtIrdt92ynZKpFp+ShP5akW+NrFNEZJuI09C3Ly6FeClLWJBfLkbQreEJ5N5lyV8iW5YYvBB9rD7VGV1o0ytFXlTy9ij3TRsz+pGx1aFOFOCUozTeVsrFLvA2Z+UUXpMntOyU6lGvZxcoyjbvc/VF/q0mvc/UX/AKVKf2kkfrFJ2jCS9t+Ml+GzaaclCtQk2rXcbd/YyWXJhVXhkoN3Q4uz5WXSZEZZrJlSnJRmv7inAtwUoe5PtZE2/mbK89Iy/BtDfyM2ifb/AJTNr8L8o2z/AGr7s2v1Qf2bZ+pUoyip2i3mlIrw+em5/wDkf/plDvslvzL/ACU7ZQt/22EL/wCCLX9hewvKxWMJxtJGrSyJ03nycuiXBGSsxwe69BKeEYxu2SqPwipL2RSWt5MjHRJY65sfuZl9VfIS7L8YIi+yE+y/B3uxq2uGY7jH5M27jWT4IVYtoqUpPLp7cHs/+RrHsONrm9FM3pbq0Qoq8tfHTsa4KdVZolFtxRKLs1Z4357wuPgQvAhjN6m13N2m09Tfk5vtjfq01Zop1U7IrbPL4k7eeblcvbnLB0qiktJFqEffC/MXGvKF5QvKI+SPlEfKIepFJfUigvrRsy+o2ePuUast2dNOInF1Nne9HvHuizawfFdYPov3dll5jmhS2eHMpx1miivLF2gVOyRW8lb1FX1Mq+pk/Uyflk/UyfqZP1Mn6mT9TJ+pkvLHwVqMk4yNj26Of9Or6vJX2eVpx+z7PrHSr1qL7O6+z5NKHe7JP5UkVJayfCuUuFETwiTGqf7dWKnB6pmx1HvU9oUV6Zarq/2tpoVlo/gl/lF0uKlDJZsqT1YuQhC4WMfAhCxuR6JkVqygvqRQRS9LKXpZQfexCWjWDq7NUitbXX3WaP3KEX34I043kydTJZLF8LHymPhWN+hitWUI97j+mJXl9ViUtW3wPCcHkzRT/ImrrNH7O2VKfaXxRxhShvP+yJ1JNt8hcpD40IXgZLmpdyjDuVH8qsVJ6yfMdOSjJ/CxJ0qq7MUoJiinJ6IlVm29Oy5SELkPB8pX5KRShrI9KKs9ZclcbqbLKD1ib+zr2NKa+75SEIQuYsUQWrRST+Yj2iTvpxwjqyC0zK0+9ht9E4sdLeXuOdRt4ZcKEiC7kEexPwVPBPwP0jGPzgiJAh4ZH0n+0n4RVfcqv6mTf1PkJFOC1Jv5Scnm+mzwz4VEZOWs7FBa1DZV3uUFpAj2giS7ImS89JCPdEI6ZlWfeyG9X0T4YJZspLuQI+CBSfch5IpEpvJ5EvLH1Tbe6VJ6voV5IruQ8kGJiRGKzZFaZlWXsSereLGNkiQ8Ev4mK7kESZUZUkburPBUjoydictXhF4Itgyw2WGxL+HSIokyrPsypLUpRWbKEMoom34G+O2pBlxJisSY4kiyLvqny0h9irMb1ZQhrYox0RN6InLWXLaGtSEjMSRGRGxcZJEyZIl4GMYxkvBIkiRIkMkyRkPBli75cnoN6lGGpTj8qKkvYb1fQWHFq5GXcWKERIkReBHsex7C8CXYSWhdiMxLIbZbthfgvKxawnyLiFDSJUlpkSk830sovIkX7F+O4hERLC4ksLF2IWCSMzPBN4JH/9k=",
            "signatureName": "developer_signature",
            "state": "Lagos",
            "street": "No name street",
            "utilityBill": "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",
            "utilityBillName": "developer_utility_bill",
            "utilityBillType": "Water corporation",
            "customerId": customer.id
        }

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
            setShowPersonalSpinner(false);
            setApiResponseMessage(response.data.description);
            setIsPersonalDetailsSuccessful(true);

            setTimeout(()=>{
                setIsPersonalDetailsSuccessful(false);
                setIsEmployeeDetailsSuccessful(false);
                setIsNokSuccessful(false);

                setIsPinChangeSuccessful(false);
                setIsPasswordChangeSuccessful('false');

                setIsPinValid('');
            },1000)
        })
        .catch(function (error) {
            console.log(error);
            setShowPersonalSpinner(false);

        });
    }

    function sendEmployeeDetails(){
        let customer = HelperFunctions.getCustomerInfo();

        let requestData = {
            "employer": employer,
            "profession": profession,
            "salary": salary,
            "customerId": customer.id
        }

        console.log(salary);

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
            setApiResponseMessage(response.data.description);
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
            "emailId": nokEmail,
            "firstName": nokFirstname,
            "lastName": nokLastname,
            "phoneNumber": nokPhone,
            "relationship": nokRelationship
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
            setApiResponseMessage(response.data.description);
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
    }

    function changeUtlityBill(event :any){
        setUtilityBillFile(event.target.files[0].name);
    }

    function changeSignature(event :any){
        setSignatureFile(event.target.files[0].name);
    }

    function deleteIdFile(){
        setIdFile('');
    }

    function deleteUtilityBillFile(){
        setUtilityBillFile('');
    }

    function deleteSignatureFile(){
        setSignatureFile('');
    }

    function validatePin(){
        setShowSpinner(true);

        let PINData = {
            "pin": pin
        }

        let validatePinCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(PINData));
        localStorage.setItem('validatePinCypher', validatePinCypher);

        let customer =  HelperFunctions.getCustomerInfo()

        let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

        axios.post(authOnboardingServiceBaseUrl+'/customer/pin/validate?customerId='+customer.id, 
        {
            "text" : localStorage.getItem('validatePinCypher')
        },{headers})
        .then(function (response) {
            setIsPinValid('true');
            setApiResponseMessage(response.data.message);

            if(pinValidationType === "personal-details"){
                setPinValidatedForPersonalDetails(true);
            }
            else if(pinValidationType === "employment"){
                setPinValidatedForEmployment(true);
            }
            else if(pinValidationType === "nok"){
                setPinValidatedForNok(true);
            }

            
            setShowSpinner(false);

            setTimeout(()=>{
                setShowValidatePINModal(false);
                setShowModalBG(false);
            },1000)
        })
        .catch(function (error) {
            setIsPinValid('false');
            setApiResponseMessage(error.response.data.message);
            setShowSpinner(false);
        });
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
        let id = event.target.getAttribute("data-bank");
        let bArr = [];
        let bDetails :any =  bankDetailsList.find((el :any) => el.id === id);

        bArr.push(bDetails);

        setSelectedBankId(id);
        setSelectedBankDetails(bArr);

        setShowModalBG(true);
        setShowManageBankModal(true);
    }

    function displayAddBankModal(){
        setShowModalBG(true);
        setShowAddBankModal(true);
    }

    function checkNameEnquiryOnBankDetails(event :any){
        if(accountNumber === ''){
            setBankDetailsError('Kindly type you account number.');
        }
        else{
            let bl = document.getElementById("bankList") as HTMLInputElement;

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

            axios.get(process.env.REACT_APP_WALLET_SERVICE_URL+'/wallet-api/name-enquiry?accountNo='+accountNumber+'&bankCode='+bl.value, 
            { headers })
            .then(function (response) {
                setAccountName(response.data.data.name);
                setBankDetailsError('');
            })
            .catch(function (error) {
                setBankDetailsError(error.response.data.message);
            });

            setBankCode(bl.value);
        }
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

        axios.delete(process.env.REACT_APP_WALLET_SERVICE_URL+'/wallet-api/bank-details/delete',
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

    function addBankDetails(){
        
        let requestData = {
            "accountName": accountName,
            "accountNumber": accountNumber,
            "bankCode": bankCode,
            "bankName": 'VFD MICROFINANCE BANK',
        }

        console.log(requestData)

        setShowSpinner(true);

        let genericCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('genericCypher', genericCypher);

        let headers = {
            'Authorization': 'Bearer '+localStorage.getItem('aislUserToken'), 
            'x-firebase-token': '12222',
            'x-transaction-pin': '{ "text":"0v++z64VjWwH0ugxkpRCFg=="}'
        }

        axios.post(process.env.REACT_APP_WALLET_SERVICE_URL+'/wallet-api/bank-details/add?nameEnquirySessionId='+nameEnquiryId,
        {
            "text": localStorage.getItem('genericCypher')
        }, 
        { headers })
        .then(function (response) {  
            setShowSpinner(false);
            setApiResponseSuccessMsg(response.data.description);
            setIsAddBankSuccess('true');

            alert("Bank Details added successfully.");
        })
        .catch(function (error) {
            setShowSpinner(false);
            alert("Unable to add bank details. Please try again later")
        });
    }

    function validateAccountNumber(event :any){
        let ccNumberPattern :RegExp = /^\d{0,10}$/g;

        if(ccNumberPattern.test(event.target.value)){
            setAccountNumber(event.target.value);
        }
        else{
            return;
        }        
    }

    function validateAccountNumberOnKeyDown(event :any){
        
        let banklist = document.getElementById("bankList") as HTMLInputElement;
        let acctNo = document.getElementById("accountNumber") as HTMLInputElement;

        let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

        axios.get(process.env.REACT_APP_WALLET_SERVICE_URL+'/wallet-api/name-enquiry?accountNo='+acctNo.value+'&bankCode='+banklist.value, 
        { headers })
        .then(function (response) {
            setAccountName(response.data.data.name);
            setNameEnquiryId(response.data.data.account.id);
            setBankDetailsError('');
        })
        .catch(function (error) {
            setBankDetailsError(error.response.data.message);
        });

        setBankCode(banklist.value);        
    }

    function displayDeleteModal(event :any){
        setShowModalBG(true);
        setShowDeleteModal(true);
        setShowManageBankModal(false);
    }

    function closeModal(){
        setIsPasswordChangeSuccessful('false');
        setIsPinChangeSuccessful(false);
        setIsEmployeeDetailsSuccessful(false);
        setIsPersonalDetailsSuccessful(false);
        setIsNokSuccessful(false);
        setShowModalBG(false);
        setShowAddBankModal(false);
        setShowManageBankModal(false);
        setShowDeleteModal(false);
        setShowNotificationDetailModal(false);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-10">
                            <span className="font-bold text-color-1">Profile</span>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">Manage your information</div>

                        {/*Switch */}
                        <div>
                            <div className='mb-30 flex justify-between items-center'>
                                <div className="border_1 flex rounded-lg p-02rem">
                                    <div>
                                        <button onClick={performSwitchToKYC} type='button' className={switchToKYC ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>KYC Details</button>
                                    </div>

                                    <div>
                                        <button onClick={performSwitchToSecurity} type='button' className={switchToSecurity ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Security</button>
                                    </div>

                                    <div>
                                        <button onClick={performSwitchToNotification}  type='button' className={switchToNotification ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Notification</button>
                                    </div>

                                    <div className='hidden'>
                                        <button onClick={performSwitchToBankDetails}  type='button' className={switchToBankDetails ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Bank Details</button>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <button type='button' className={switchToKYC ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 cursor-pointer":"hidden"}>KYC Category: {customer.kycStatus}</button>
                                    </div>

                                    <div>
                                        <button type='button' onClick={displayAddBankModal} className={switchToBankDetails ?"rounded-lg bgcolor-1 text-white border-0 py-3 px-12 cursor-pointer font-bold":"hidden"}>Add New Bank</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {/*End */}

                        {/*KYC section */}
                        <div className={switchToKYC ? '':'hidden'}>
                            {/*Personal details card */}
                            <div className='mb-30'>
                                <div className='card'>

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

                                                <div className="pt-1 text-14 text-color-1">{apiResponseMessage}</div>
                                            </div>
                                            
                                            <div className="cursor-pointer" onClick={closeModal}>
                                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className='font-gotham-black-regular text-color-1 mb-30'>Personal Details</div>

                                    <div className='flex mb-30'>
                                        <div className='flex w-1/2 justify-between'>
                                            <div>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Firstname</div>
                                                <div>{customer.firstName}</div>
                                            </div>

                                            <div>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Surname</div>
                                                <div>{customer.lastName}</div>
                                            </div>

                                            <div>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Email address</div>
                                                <div>{customer.email}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-30'>
                                        <div className='flex w-3/4 space-x-6'>
                                            <div className='w-1/2'>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Address</div>
                                                <div><input value={customer.permanentAddress} onChange={e => setAddress(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>City</div>
                                                <div><input type='text' value={street} onChange={e => setStreet(e.target.value)} className='border border-gray-300 px-3 py-2 text-lg outline-white rounded-lg w-full'/></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-12'>
                                        <div className='flex w-3/4 space-x-6'>
                                            <div className='w-1/2'>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>State</div>
                                                <div>
                                                    <select onChange={e => setState(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                        <option value="">Select a state</option>
                                                        <option value="Lagos">Lagos</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Country</div>
                                                <div>
                                                    <select onChange={e => setCountry(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                        <option value=''>Select a country</option>
                                                        <option value='Nigeria'>Nigeria</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='font-gotham-black-regular text-color-1 mb-30'>Uploads</div>
                                    <div className='font-bold mb-20'>Valid identification</div>

                                    <div className='flex w-2/4 justify-between mb-30'>
                                        <div className='flex items-center'>
                                            <div className='text-gray-900 mr-2'>Drivers License</div>
                                            <Form.Check type="checkbox" className='portfoliolist-checkbox' /> 
                                        </div>

                                        <div className='flex items-center'>
                                            <div className='text-gray-900 mr-2'>Int'l Passport</div>
                                            <Form.Check type="checkbox" className='portfoliolist-checkbox' /> 
                                        </div>

                                        <div className='flex items-center'>
                                            <div className='text-gray-900 mr-2'>NIN</div>
                                            <Form.Check type="checkbox" className='portfoliolist-checkbox' /> 
                                        </div>

                                        <div className='flex items-center'>
                                            <div className='text-gray-900 mr-2'>Voters Card</div>
                                            <Form.Check type="checkbox" className='portfoliolist-checkbox' /> 
                                        </div>
                                    </div>

                                    <div className='font-bold mb-10'>Upload a selected ID type </div>

                                    <div className='flex w-3/4 justify-between mb-30'>
                                        <div className='flex items-center'>
                                            <img className={idFile === '' ? 'cursor-pointer':'hidden'} src={BrowseFile} alt="" onClick={triggerIdUpload}/>

                                            <div className={idFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg'}>
                                                <div><img src={FileIcon} alt=""/></div>
                                                <div className='font-bold flex-1'>{idFile}</div>
                                                <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteIdFile} alt=""/></div>
                                            </div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className='text-gray-900 mr-2 mb-10'>ID Number</div>
                                            <input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/>
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center mb-20'>
                                        <div>
                                            <div className='font-bold mb-10'>Upload a Valid Utility Bill (3 months old)</div>
                                            <img className={utilityBillFile === '' ? 'cursor-pointer':'hidden'} src={BrowseFile} alt="" onClick={triggerUtilityBillUpload} />

                                            <div className={utilityBillFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg'}>
                                                <div><img src={FileIcon} alt=""/></div>
                                                <div className='font-bold flex-1'>{utilityBillFile}</div>
                                                <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteUtilityBillFile} alt=""/></div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className='font-bold mb-10'>Upload Signature </div>
                                            <img className={signatureFile === '' ? 'cursor-pointer':'hidden'} src={BrowseFile} alt="" onClick={triggerSignatureUpload} />

                                            <div className={signatureFile === '' ? 'hidden':'flex space-x-3 items-center p-5 w-96 bg-gray-100 border rounded-lg'}>
                                                <div><img src={FileIcon} alt=""/></div>
                                                <div className='font-bold flex-1'>{signatureFile}</div>
                                                <div><img className='cursor-pointer' src={DeleteIcon} onClick={deleteSignatureFile} alt=""/></div>
                                            </div>
                                        </div>

                                        <div>

                                            <button onClick={sendPersonalDetails} type='button' className="mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">
                                                <span className={ showPersonalSpinner ? "hidden" : ""}>Update</span>
                                                <img src={SpinnerIcon} alt="spinner icon" className={ showPersonalSpinner ? "" : "hidden"} width="15"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            {/*End */}

                            {/*Employment details card */}
                            <div className='mb-30'>
                                <div className='card'>
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

                                                <div className="pt-1 text-14 text-color-1">{apiResponseMessage}</div>
                                            </div>
                                            
                                            <div className="cursor-pointer" onClick={closeModal}>
                                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className='font-gotham-black-regular text-color-1 mb-30'>Employment Details</div>


                                    <div className='flex mb-30'>
                                        <div className='flex w-3/4 space-x-6'>
                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Name of employer</div>
                                                <div><input value={employer} onChange={e => setEmployer(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Profession</div>
                                                <div><input value={profession} onChange={e => setProfession(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg outline-white rounded-lg w-full'/></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex justify-between'>
                                            <div className='flex justify-between space-x-6 w-3/4'>
                                                <div className='w-1/2'>
                                                    <div className='text-gray-700 mb-4'>Salary Range</div>
                                                    <div>
                                                        <select onChange={e => setSalary(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                            <option value=''>Select a salary</option>
                                                            <option value='150000'>150,000 - 200,000</option>
                                                            <option value='250000'>250,000 - 300,000</option>
                                                            <option value='350000'>350,000 - 400,000</option>
                                                            <option value='450000'>450,000 - 500,000</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='w-1/2'>
                                                    <div className='text-gray-700 mb-4'>Are you a politically exposed person?</div>
                                                    <div>
                                                        <select className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                            <option value='Yes'>Yes</option>
                                                            <option value='No'>No</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>

                                                <button onClick={sendEmployeeDetails} type='button' className="mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">
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
                            <div className='mb-30'>
                                <div className='card'>
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

                                                <div className="pt-1 text-14 text-color-1">{apiResponseMessage}</div>
                                            </div>
                                            
                                            <div className="cursor-pointer" onClick={closeModal}>
                                                <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End */}

                                    <div className='font-gotham-black-regular text-color-1 mb-30'>Next of KIN Details</div>


                                    <div className='flex mb-30'>
                                        <div className='flex w-3/4 space-x-6'>
                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Firstname</div>
                                                <div><input value={nokFirstname} onChange={e => setNokFirstname(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Lastname</div>
                                                <div><input value={nokLastname} onChange={e => setNokLastname(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>                                            
                                        </div>
                                    </div>

                                    <div className='flex mb-30'>
                                        <div className='flex w-3/4 space-x-6'>
                                            <div className='w-1/3'>
                                                <div className='text-gray-700 mb-4'>Email Address</div>
                                                <div><input value={nokEmail} onChange={e => setNokEmail(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>

                                            <div className='w-1/3'>
                                                <div className='text-gray-700 mb-4'>Phone number</div>
                                                <div><input value={nokPhone} onChange={e => setNokPhone(e.target.value)} type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>

                                            <div className='w-1/3'>
                                                <div className='text-gray-700 mb-4'>Relationship</div>
                                                <div>
                                                    <select value={nokRelationship} onChange={e => setNokRelationship(e.target.value)} className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                        <option value="">Select relationship</option>
                                                        <option value="Father">Father</option>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Sister">Sister</option>
                                                        <option value="Brother">Brother</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex justify-between space-x-5'>
                                            <div className='flex-1'>
                                                <div className='text-gray-700 mb-4'>Next of Kin Address</div>
                                                <div><input value={nokAddress} onChange={e => setNokAddress(e.target.value)}  type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                            </div>

                                            <div>

                                                <button onClick={sendNextOfKin} type='button' className="mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">
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
                            <div className='mb-30'>
                                <div className='card'>
                                    

                                    <div className='font-gotham-black-regular text-color-1 mb-30'>Bank Details</div>


                                    <div className='flex mb-30'>
                                        <div className='flex w-3/4 space-x-6'>
                                            
                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Select Bank</div>

                                                <div>
                                                    <select onChange={checkNameEnquiryOnBankDetails} className='input px-5 py-3 border-1-d6 outline-white font-bold text-lg' id='bankList' >
                                                        <option value="">...</option>
                                                        {
                                                            bankList.map((item :any) =>
                                                            <option value={item.code}>{item.name}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Account Number</div>
                                                <div><input id="accountNumber" type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' value={accountNumber} onKeyDown={validateAccountNumberOnKeyDown} onChange={validateAccountNumber} maxLength={10}/></div>
                                            </div>

                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex justify-between space-x-5'>
                                            <div className='flex-1'>
                                                <div className='text-gray-700 mb-4'>Account Name</div>
                                                <div><input readOnly type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' value={accountName}/></div>
                                            </div>

                                            <div>

                                                <button onClick={addBankDetails} type='button' className="mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">
                                                    <span className={ showSpinner ? "hidden" : ""}>Update</span>
                                                    <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                                                </button>
                                            </div>
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
                            <div className='card mb-30'>
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

                                            <div className="pt-1 text-14 text-color-1">{apiResponseMessage}</div>
                                        </div>
                                        
                                        <div className="cursor-pointer" onClick={closeModal}>
                                            <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Login Error */}
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

                                <div className='font-gotham-black-regular text-color-1 mb-30'>Change Password</div>

                                <div className='mb-30'>
                                    <div className='flex justify-between space-x-5'>
                                        <div className='w-3/4'>
                                            <div className='text-gray-700 mb-4'>Old Password</div>
                                            <div><input onChange={e => setOldPassword(e.target.value)} type='password' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className="w-1/2 mb-20 relative">
                                            <div className="mb-10 text-16">New Password</div>
                                            
                                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                <div className='w-full'>
                                                    <input value={password} onChange={e => setPassword(e.target.value)} className="outline-white p-3 input border-0 text-14"  type={isShowPassword ? 'text' : 'password'} name="password"/>
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

                                        <div className="w-1/2 mb-20 relative">
                                            <div className="mb-10 text-16">Confirm New Password</div>
                                            
                                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                <div className='w-full'>
                                                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="outline-white p-3 input border-0 text-14"  type={isShowConfirmPassword ? 'text' : 'password'} name="password"/>
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
                                    </div>

                                    <div>
                                        <button onClick={changePassword} type='button' className={passwordOrConfirmPasswordIsNullOrEmpty ? "mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer opacity-50":"mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer"} disabled={passwordOrConfirmPasswordIsNullOrEmpty}>
                                            <span className={ showPasswordSpinner ? "hidden" : ""}>Update</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={ showPasswordSpinner ? "" : "hidden"} width="15"/>
                                        </button>
                                    </div>
                                </div>

                                {/* Password Policy section */}
                                <div>
                                    <div className="flex space-x-5 mb-10">
                                        <div className="flex text-13 space-x-1 text-color-3">
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasMinAndMaxCharacter ? '#2AD062' : '#999CA0'}/>
                                                </svg>
                                            </div>

                                            <div className={hasMinAndMaxCharacter ? "pt-20 text-color-2a font-bold": "pt-20"}>At least 8 characters strong</div>
                                        </div>

                                        <div className="flex text-13 space-x-1 text-color-3">
                                            <div>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasLowerCaseCharacter ? "#2AD062":"#999CA0"}/>
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
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasUpperCaseCharacter ? "#2AD062":"#999CA0"}/>
                                                </svg>
                                            </div>

                                            <div className={hasUpperCaseCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>One or more upper case character</div>
                                        </div>

                                        <div className="flex text-13 space-x-1 text-color-3">
                                            <div>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3.6665" y="4.16699" width="11.6667" height="11.6667" rx="5.83333" stroke={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasNumericCharacter ? "#2AD062":"#999CA0"}/>
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
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3804 8.41699C11.2234 8.41699 11.0832 8.47868 10.9822 8.57961L8.57655 10.9909L7.2924 9.70114C7.19146 9.6002 7.05127 9.53852 6.89426 9.53852C6.58584 9.53852 6.3335 9.79086 6.3335 10.0993C6.3335 10.2563 6.39518 10.3965 6.49612 10.4974L8.17841 12.1797C8.27935 12.2807 8.41954 12.3423 8.57655 12.3423C8.73357 12.3423 8.87376 12.2807 8.97469 12.1797L11.7785 9.3759C11.8795 9.27496 11.9411 9.13477 11.9411 8.97776C11.9411 8.66934 11.6888 8.41699 11.3804 8.41699Z" fill={hasSpecialCharacter ? "#2AD062":"#999CA0"}/>
                                                </svg>
                                            </div>

                                            <div className={hasSpecialCharacter ? "pt-20 font-bold text-color-2a":"pt-20"}>A symbol or special character</div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}
                            </div>
                            {/*End */}

                            {/*Change Pin */}
                            <div className='card mb-30'>
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

                                            <div className="pt-1 text-14 text-color-1">{apiResponseMessage}</div>
                                        </div>
                                        
                                        <div className="cursor-pointer" onClick={closeModal}>
                                            <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                <div className='font-gotham-black-regular text-color-1 mb-30'>Change Pin</div>

                                <div className='mb-30'>
                                    <div className='flex justify-between space-x-5'>
                                        <div className='w-3/4'>
                                            <div className='text-gray-700 mb-4'>Old Pin</div>
                                            <div><input value={oldPin} onChange={e => setOldPin(e.target.value)} type='password' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className="w-1/2 mb-20 relative">
                                            <div className="mb-10 text-16">New Pin</div>
                                            
                                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                <div className='w-full'>
                                                    <input value={pin} onChange={e => setPin(e.target.value)} className="outline-white p-3 input border-0 text-14" type={isShowPin ? 'text' : 'password'} name="password"/>
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

                                        <div className="w-1/2 mb-20 relative">
                                            <div className="mb-10 text-16">Confirm New Pin</div>
                                            
                                            <div className='flex w-full items-center justify-between border-1-d7 rounded-lg '>
                                                <div className='w-full'>
                                                    <input value={confirmPin} onChange={e => setConfirmPin(e.target.value)} className="outline-white p-3 input border-0 text-14"  type={isShowConfirmPin ? 'text' : 'password'} name="password"/>
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
                                    </div>

                                    <div>
                                        <button onClick={changePin} type='button' className={pinOrConfirmPinIsNullOrEmpty ? "mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer opacity-50":"mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer"} disabled={pinOrConfirmPinIsNullOrEmpty}>
                                            <span className={ showPinSpinner ? "hidden" : ""}>Update</span>
                                            <img src={SpinnerIcon} alt="spinner icon" className={ showPinSpinner ? "" : "hidden"} width="15"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/*End */}

                            {/*2FA Auth */}
                            <div className='card' style={{display: 'none'}}>
                                <div className='font-gotham-black-regular text-color-1 mb-20'>2 Factor Authentication</div>


                                <div className='flex justify-between'>                                
                                    <div>
                                        <button type='button' className="rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">Enable 2FA</button>
                                    </div>
                                </div>
                            </div>
                            {/*End */}
                        </div>
                        {/*End */}

                        {/*Notification section */}
                        <div className={switchToNotification ? '':'hidden'}>
                            <div className='flex justify-between bg-white font-bold border border-gray-500 rounded-t-lg p-5 text-color-1'>
                                <div>
                                    <div className='text-xl mb-10'>My Notifications</div>
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

                        {/*Bank Details section */}
                        <div className={switchToBankDetails ? '':'hidden'}>

                            <div className='bg-white border border-gray-500 p-5 rounded-lg mb-30'>
                                <div className={bankDetailsList.length > 0 ? 'hidden':'w-full'}>You have not added a bank account. Click <strong>Add New Bank</strong> button above to begin.</div>

                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                    bankDetailsList.map((item :any, index :any) =>
                                        <div onClick={selectBankDetails} key={index} data-bank={item.id}>
                                            <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer' data-bank={item.id}>
                                                <img src={MaskGroupImg} alt='' data-bank={item.id} className="w-full"/>
                                                <div className='absolute bottom-0 px-7 py-6' data-bank={item.id}>
                                                    <div className='text-white text-sm mb-20' data-bank={item.id}>{item.accountName}</div>
                                                    <div className='text-white font-bold' data-bank={item.id}>{item.bankName} ({item.accountNumber})</div>
                                                </div>
                                            </div>
                                        </div>  
                                    )}
                                </div>      
                            </div>
                        </div>
                        {/*End */}
                        
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
                            <div className="font-bold text-lg text-color-1">Notification</div>

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

            <div className={showAddBankModal ? 'generic-modal':'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="validate-pin-modal">
                        <div className="px-5 py-4 flex justify-between" style={{borderBottom : '1px solid #dee2e6'}}>
                            <div className="font-bold text-xl text-color-1">Add New Bank</div>

                            <div onClick={closeModal} className=''>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='px-5 py-3'>
                            {/* Bank Details Error */}
                            <div className={bankDetailsError ? "error-alert mb-20":"hidden"}>
                                <div className="flex justify-between space-x-1 pt-3">
                                    <div className="flex">
                                        <div>
                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                            </svg>
                                        </div>

                                        <div className="pt-1 text-14">{bankDetailsError}</div>
                                    </div>
                                    
                                    <div className="cursor-pointer">
                                        <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            {/* Add Bank Success */}
                            <div className={isAddBankSuccess === 'true'? "otp-alert mb-20":"hidden"}>
                                <div className="flex otp-validated justify-between space-x-1 pt-3">
                                    <div className="flex">
                                        <div>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                            </svg>
                                        </div>

                                        <div className="pt-1 text-14 text-color-1">{apiResponseSuccessMsg}</div>
                                    </div>
                                    
                                    <div className="cursor-pointer">
                                        <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            
                            <div className='mb-5 text-color-1 text-xl font-bold'>Enter your bank details below</div>
                            <div className='mb-30 text-color-1 text-md'>We pay your withdrawal into your bank account </div>

                            <div className='mb-30'>
                                <div className='text-14 mb-10 font-bold'>Select Bank</div>

                                <div>
                                    <select onChange={checkNameEnquiryOnBankDetails} className='input px-5 py-3 border-1-d6 outline-white font-bold text-lg' id='bankList' >
                                        <option value="">...</option>
                                        {
                                            bankList.map((item :any) =>
                                            <option value={item.code}>{item.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className='mb-30'>
                                <div className='text-14 mb-10 font-bold'>Account Number</div>

                                <div>
                                    <input id="accountNumber" type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' value={accountNumber} onKeyDown={validateAccountNumberOnKeyDown} onChange={validateAccountNumber} maxLength={10}/>
                                </div>
                            </div>                                        

                            <div className='mb-30'>
                                <div className='text-14 mb-10 font-bold'>Account Name</div>

                                <div>
                                    <input readOnly type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' value={accountName}/>
                                </div>
                            </div>

                            <div>
                                <button onClick={addBankDetails} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >
                                    <span className={ showSpinner ? "hidden" : ""}>Proceed</span>
                                    <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className={showManageBankModal ? 'generic-modal':'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className='validate-pin-modal'>
                        <div className="px-5 py-4 flex justify-between" style={{borderBottom : '1px solid #dee2e6'}}>
                            <div className="font-bold text-xl text-color-1">Manage Bank Details</div>

                            <div onClick={closeModal} className=''>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='px-5 py-3'>
                            {selectedBankDetails.map((item :any, index :any)=>
                            <div className='mb-30'>
                                <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer'>
                                    <img src={MaskGroupImg} alt='' className="w-full" />
                                    <div className='absolute bottom-0 px-7 py-6'>
                                        <div className='text-white text-sm mb-20'>{item.accountName}</div>
                                        <div className='text-white font-bold'>{item.bankName} ({item.accountNumber})</div>
                                    </div>
                                </div>
                            </div>
                            )} 

                            <div className='mb-20 hidden'>
                                <div className='mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                <div className='mt-1 text-gray-900'>Make this card your default debit card for your payments and transactions</div>
                            </div>

                            <div className="font-bold flex mb-30 hidden">
                                <div className='mr-3'>Default bank account </div>
                                
                                <div  className='flex rounded-3xl p-1 bgcolor-1 ease-in-out transition delay-75 duration-75'>
                                    <button className="rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75" type="button"></button>

                                    <button className="ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75" type="button"></button>
                                </div>
                            </div>

                            {selectedBankDetails.map((item :any, index :any)=>
                            <div>
                                <div className='flex justify-between py-5'>
                                    <div>Bank</div>
                                    <div className='font-bold'>{item.bankName}</div>
                                </div>

                                <div className='mb-30 flex justify-between py-5 border-top-1'>
                                    <div>Date Added</div>
                                    <div className='font-bold text-color-1 font-bold'>{moment(item.updatedOn).format("MMMM Do, YYYY")}</div>
                                </div>
                            </div>
                            )}

                            <div>
                                <button onClick={displayDeleteModal} type='button' className='w-full font-bold text-lg border-0 bg-red-500 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' data-type='Bank'>Delete bank</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden" }>
            </div>

            <div className={showValidatePINModal ? 'generic-modal':'hidden'}>
                <div className='generic-modal-dialog'>
                    <div className="validate-pin-modal">
                        <div className="p-5 flex justify-between pb-5" style={{borderBottom : '1px solid #dee2e6'}}>
                            <div className="font-bold text-xl text-color-1">Validate PIN</div>

                            <div onClick={closeModal} className='hidden'>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                            </div>
                        </div>


                        <div className='p-5'>
                            {/* Pin Success */}
                            <div className={isPinValid === 'true'? "otp-alert mb-20":"hidden"}>
                                <div className="flex otp-validated justify-between space-x-1 pt-3">
                                    <div className="flex">
                                        <div>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="#2AD062"/>
                                                <path d="M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z" fill="#2AD062"/>
                                            </svg>
                                        </div>

                                        <div className="pt-1 text-14 text-color-1">{apiResponseMessage}</div>
                                    </div>
                                    
                                    <div className="cursor-pointer" onClick={closeModal}>
                                        <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            {/* Pin Error */}
                            <div className={isPinValid !== 'false' ? "hidden":"error-alert mb-20"}>
                                <div className="flex justify-between space-x-1 pt-3">
                                    <div className="flex">
                                        <div>
                                            <svg width="30" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M52.5 8.75C76.6625 8.75 96.25 28.3375 96.25 52.5C96.25 76.6625 76.6625 96.25 52.5 96.25C28.3375 96.25 8.75 76.6625 8.75 52.5C8.75 28.3375 28.3375 8.75 52.5 8.75ZM52.5 17.5C33.17 17.5 17.5 33.17 17.5 52.5C17.5 71.83 33.17 87.5 52.5 87.5C71.83 87.5 87.5 71.83 87.5 52.5C87.5 33.17 71.83 17.5 52.5 17.5ZM52.5 43.75C54.9162 43.75 56.875 45.7088 56.875 48.125V74.375C56.875 76.7912 54.9162 78.75 52.5 78.75C50.0838 78.75 48.125 76.7912 48.125 74.375V48.125C48.125 45.7088 50.0838 43.75 52.5 43.75ZM52.5 26.25C54.9162 26.25 56.875 28.2088 56.875 30.625C56.875 33.0412 54.9162 35 52.5 35C50.0838 35 48.125 33.0412 48.125 30.625C48.125 28.2088 50.0838 26.25 52.5 26.25Z" fill="#FF0949"/>
                                            </svg>
                                        </div>

                                        <div className="pt-1 text-14">{apiResponseMessage}</div>
                                    </div>
                                    
                                    <div className="cursor-pointer">
                                        <svg  className="" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z" fill="#353F50"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* End */}

                            <div className='font-bold mb-10'>Enter PIN</div>

                            <div className='mb-30'><input maxLength={4} type="password" className="w-full rounded-lg p-5 border border-gray-100 outline-white" onChange={e => setPin(e.target.value)} /> </div>

                            <div><button type='button' className='px-16 py-3 bgcolor-1 text-white rounded-lg font-bold border-0 w-full cursor-pointer' onClick={validatePin}>
                                <span className={ showSpinner ? "hidden" : ""}>Validate</span>
                                <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="15"/>
                            </button></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showDeleteModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-28 text-color-1 font-gotham-black-regular"></div>

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

                                <div className="pt-1 text-14 text-color-1">{apiResponseSuccessMsg}</div>
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