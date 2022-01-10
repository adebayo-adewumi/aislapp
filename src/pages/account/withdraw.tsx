import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import SuccessIcon from '../../assets/images/success.gif';
import Form from 'react-bootstrap/Form';
import Sidebar from '../../components/Sidebar';

const WithdrawFund = () => {
    const [show10K, setShow10k] = useState('');
    const [showAmount, setShowAmount] = useState('');
    const [showWithdraw, setShowWithdraw] = useState<boolean>(true);
    const [showWithdrawSummary, setShowWithdrawSummary] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    function add10k(){
        setShow10k('₦ 10,000.00');
        setShowAmount('₦ 10,000.00');
    }

    function displayWithdrawSummary(){
        setShowWithdraw(false);
        setShowWithdrawSummary(true);
    }

    function displaySuccess(){
        setShowWithdraw(false);
        setShowWithdrawSummary(false);
        setShowSuccess(true);
    }

    return (
        <div className="relative">
            <UserAreaHeader />
            <div className='hidden'>{show10K}</div>

            <div>
                <div className="flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="main-content w-full p-10">
                        <div className='m-auto w-42rem pt-12'>
                            {/*Withdraw Funds Header */}
                            <div className={showWithdraw ? "flex justify-between":'hidden'}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Withdraw Funds</div>
                                    <div className="font-bold mb-30">Confirm bank and amount below</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Withdraw Summary Header */}
                            <div className={showWithdrawSummary ? "flex justify-between mb-30":"hidden"}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Withdrawal Summary</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}                            

                            <div className={showWithdraw ? 'border-bottom-1d mb-30':"hidden"}></div>

                            <div>
                                {/* Withdraw Section */}
                                <div className={showWithdraw ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className="wallet-balance-card mb-30">
                                            <div className="italic text-green-500 mb-5">Available Balance</div>
                                            <div className="font-bold text-28 text-white mb-5">
                                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                                                </svg> 
                                                <span className="ml-2">₦ 5,000,000.00</span>
                                            </div>
                                            <div className="text-gray-300 text-13 leading-5">Cash available in your wallet for trading or immediate withdrawal</div>
                                        </div>

                                        <div className='text-lg mb-10'>Amount</div>

                                        <div className='mb-30'>
                                            <input type='text' className='input font-gotham-black-regular font-black text-4xl p-5 border-1-d6 outline-white' placeholder='₦ 0.00' value={showAmount}/>
                                        </div>

                                        <div className='mb-30'>
                                            <Form.Range />
                                        </div>

                                        <div className='mb-30 flex space-x-3'>
                                            <button type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 5,000</button>

                                            <button type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 8,000</button>

                                            <button onClick={add10k} type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 10,000</button>

                                            <button type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 15,000</button>
                                        </div>

                                        <div className='mb-30 bg-gray-100 p-3 rounded border-gray-500 border'>
                                            {/* <div className='mb-10 flex justify-between font-bold'>
                                                <div>Bank Account</div>
                                                <div><img src={ChevronDownIcon} alt='chevron down icon' className='cursor-pointer' /></div>
                                            </div>
                                            <div className='font-bold text-color-1'>Funmi Ajibade | Access Bank Plc| 093000390</div> */}

                                            <select className='bg-gray-100 border-0 w-full text-xl'>
                                                <option>Select Bank Account</option>
                                                <option className='font-bold'>Funmi Ajibade | Access Bank Plc| 093000390</option>
                                            </select>
                                        </div>

                                        <div>
                                            <button onClick={displayWithdrawSummary} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Continue</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Withdraw  Summary Section */}
                                <div className={showWithdrawSummary ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>                                        

                                        <div className='text-lg mb-5 font-bold'>Amount</div>

                                        <div className='mb-30 font-gotham-black-regular font-bold text-28 text-color-1'>₦10,000.00</div>

                                        <div className='mb-20 flex justify-between'>
                                            <div>Fees</div>
                                            <div>₦ 306.00</div>
                                        </div>

                                        <div className='mb-30 flex justify-between'>
                                            <div>Total Amount</div>
                                            <div className='font-bold'>₦ 10,000.00</div>
                                        </div>

                                        <div className='mb-30 bg-gray-100 p-3 rounded border-gray-500 border'>
                                            <div className='mb-10 flex justify-between font-bold'>
                                                <div>Bank Account</div>
                                                
                                            </div>
                                            <div className='font-bold text-color-1'>Funmi Ajibade | Access Bank Plc| 093000390</div>
                                        </div>

                                        <div className="border-bottom-1d mb-20"></div>

                                        <div className='font-bold text-color-1 text-lg mb-30'>Confirm Transaction PIN</div>

                                        <form>
                                            <div className="mb-20">
                                                <div className="font-bold mb-10 text-sm">Enter PIN</div>
                                                <div className="flex space-x-2">
                                                    <input type="password" className="short-input text-center" maxLength={1}/>

                                                    <input type="password" className="short-input text-center" maxLength={1}/>

                                                    <input type="password" className="short-input text-center" maxLength={1}/>

                                                    <input type="password" className="short-input text-center" maxLength={1}/>
                                                </div>
                                            </div>                                            
                                        </form>

                                        <div>
                                            <button onClick={displaySuccess} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Withdraw ₦ 10,000.00</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Success Section */}
                                <div className={ showSuccess ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div className="mx-auto w-2/3 h-64 relative">
                                        <img src={SuccessIcon} alt="success icon" className="w-96"/>
                                        <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                    </div>

                                    <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>
                                    <div className="text-color-4 text-16 text-center mb-14">Your withdralwal of <strong>₦ 10,000.00</strong> was successfully recieved and will be processed shortly</div>
                                    <div className="mb-30 text-center">
                                        <button className="bgcolor-1 w-96 rounded-lg border-0 cursor-pointer text-white p-5 font-bold">Close</button>
                                    </div>
                                </div>
                                {/* End */}
                            </div>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>
        </div>
    );
};

export default WithdrawFund;