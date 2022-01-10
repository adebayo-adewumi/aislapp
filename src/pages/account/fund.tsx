import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import Form from 'react-bootstrap/Form';
import SuccessIcon from '../../assets/images/success.gif';
import InfoIcon from '../../assets/images/info.svg';
import Sidebar from '../../components/Sidebar';

const FundAccount = () => {

    const [switchToDebit, setSwitchToDebit] = useState<boolean>(true);
    const [switchToBank, setSwitchToBank] = useState<boolean>(false);
    
    const [showAmountSection, setShowAmountSection] = useState<boolean>(true);
    const [showCardSection, setShowCardSection] = useState<boolean>(false);
    const [showPinSection, setShowPinSection] = useState<boolean>(false);
    const [showTransactionSection, setShowTransactionSection] = useState<boolean>(false);
    const [showBankTransferSection, setShowBankTransferSection] = useState<boolean>(false);

    const [show5K, setShow5k] = useState('');
    const [showAmount, setShowAmount] = useState('');

    function performSwitchToDebit(){
        setSwitchToDebit(true);
        setSwitchToBank(false);

        setShowAmountSection(true);
        setShowCardSection(false);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(false);
    }

    function performSwitchToBank(){
        setSwitchToDebit(false);
        setSwitchToBank(true);

        setShowAmountSection(false);
        setShowCardSection(false);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(true);
    }

    function add5k(){
        setShow5k('₦ 5,000.00');
        setShowAmount('₦ 5,000.00');
    }

    function add8k(){
        setShow5k('₦ 8,000.00');
        setShowAmount('₦ 8,000.00');
    }

    function add10k(){
        setShow5k('₦ 10,000.00');
        setShowAmount('₦ 10,000.00');
    }

    function add15k(){
        setShow5k('₦ 15,000.00');
        setShowAmount('₦ 15,000.00');
    }

    function displayCardSection(){
        setShowAmountSection(false);
        setShowCardSection(true);
        setShowPinSection(false);
        setShowTransactionSection(false);
        setShowBankTransferSection(false);
    }

    function displayPinSection(){
        setShowAmountSection(false);
        setShowCardSection(false);
        setShowPinSection(true);
        setShowTransactionSection(false);
        setShowBankTransferSection(false);
    }

    function displayTransactionSection(){
        setShowAmountSection(false);
        setShowCardSection(false);
        setShowPinSection(false);
        setShowTransactionSection(true);
        setShowBankTransferSection(false);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="main-content w-full p-10">
                        <div className='m-auto w-42rem pt-12'>
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Fund Account</div>
                                    <div className="font-bold mb-30">Provide the details below</div>
                                    <span className='hidden'>{show5K}</span>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>

                            <div className='mb-30'>
                                <div className="border_1 flex rounded-lg p-02rem w-22-4rem">
                                    <div>
                                        <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Debit Card</button>
                                    </div>

                                    <div>
                                        <button onClick={performSwitchToBank} type='button' className={switchToBank ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Bank Transfer</button>
                                    </div>
                                </div>
                            </div>

                            <div className='border-bottom-1d mb-30 '></div>

                            <div>
                                {/* Enter Amount Section */}
                                <div className={showAmountSection ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-30 font-gotham-black-regular text-color-1 text-xl'>How much would like to fund</div>

                                        <div className='text-lg mb-10'>Amount</div>

                                        <div className='mb-30'>
                                            <input type='text' className='input font-gotham-black-regular font-black text-4xl p-5 border-1-d6 outline-white' placeholder='₦ 0.00' value={showAmount}/>
                                        </div>

                                        <div className='mb-30'>
                                            <Form.Range />
                                        </div>

                                        <div className='mb-30 flex space-x-3'>
                                            <button onClick={add5k} type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 5,000</button>

                                            <button onClick={add8k}  type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 8,000</button>

                                            <button onClick={add10k} type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 10,000</button>

                                            <button onClick={add15k} type='button' className='border border-gray-300 bg-gray-100 rounded-full focus:shadow-outline text-lg px-5 py-3 cursor-pointer text-gray-400'>₦ 15,000</button>
                                        </div>

                                        <div>
                                            <button onClick={displayCardSection} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Continue</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Enter Card Details Section */}
                                <div className={showCardSection ? 'card-section rounded-lg border-1-d6 bg-white p-10': 'hidden'}>
                                    <div>
                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-20 font-gotham-black-regular text-color-1 text-3xl'>₦ 8,000.00</div>

                                        <div className='border-bottom-1d mb-10'></div>

                                        <div className='mb-20 text-color-1 text-xl font-bold'>Enter your card details</div>

                                        <div className='mb-20'>
                                            <div className='text-14 mb-10'>Card Number</div>

                                            <div>
                                                <input placeholder='Enter your 16 digits card number' type='text' className='input p-3 border-1-d6 outline-white' />
                                            </div>
                                        </div>

                                        <div className='mb-20'>
                                            <div className='flex justify-between space-x-5'>
                                                <div>
                                                    <div className='text-lg mb-10 text-14'>Validity</div>

                                                    <div>
                                                        <input placeholder='MM / YY' type='text' className='input p-3 border-1-d6 outline-white' />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className='text-lg mb-10 text-14'>CVV</div>

                                                    <div>
                                                        <input placeholder='CVV' type='text' className='input p-3 border-1-d6 outline-white' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-20'>
                                            <div className='text-lg mb-10 text-14'>PIN</div>

                                            <div className='mb-30'>
                                                <input type='password' className='input p-3 border-1-d6 outline-white' />
                                            </div>
                                        </div>

                                        <div className='mb-20 flex'>
                                            <Form.Check type="checkbox" className='portfoliolist-checkbox' /> 
                                            <div className='mt-1 font-bold mx-2 text-gray-900'>Save card details</div>
                                        </div>

                                        <div>
                                            <button onClick={displayPinSection} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Proceed</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Enter PIN Section */}
                                <div className={showPinSection ? 'pin-section rounded-lg border-1-d6 bg-white p-10 ':'hidden'}>
                                    <div>
                                        <div className='text-lg font-bold'>Amount</div>

                                        <div className='mb-30 font-gotham-black-regular text-color-1 text-3xl'>₦ 8,000.00</div>

                                        <div>
                                            <div className='flex justify-between mb-30'>
                                                <div>Fees</div>
                                                <div>₦306.00</div>
                                            </div>

                                            <div className='flex justify-between mb-30'>
                                                <div>Total Cost</div>
                                                <div className='font-bold text-color-1 font-bold'>₦ 24,206.00</div>
                                            </div>

                                            <div className='flex justify-between mb-30'>
                                                <div>Card</div>
                                                <div className='font-bold text-gray-500'> (*** 3456)</div>
                                            </div>
                                        </div>

                                        <div className='border-bottom-1d mb-20'></div>

                                        <div className='mb-20 text-color-1 text-xl font-bold'>Confirm Transaction PIN</div>

                                        <div className='mb-20'>
                                            <div className='text-13 font-bold mb-10'>Enter PIN</div>

                                            <div className='flex space-x-3'>
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                                                
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white opacity-0' />
                                                <input type='password' className='text-center input p-3 border-1-d6 outline-white opacity-0' />
                                                
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={displayTransactionSection} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Proceed</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Transaction success Section */}
                                <div className={showTransactionSection ? 'transaction-section rounded-lg border-1-d6 bg-white p-10 ':'hidden'}>
                                    <div>
                                        <div className="mx-auto w-65p h-64 relative">
                                            <img src={SuccessIcon} alt="success icon" className="w-22rem"/>
                                            <div className="bg-white p-2 w-full -bottom-5 absolute"></div>
                                        </div>

                                        <div className='text-xl font-bold text-color-1 text-center mb-20'>Transaction Successful</div>

                                        <div className='border-bottom-1d'></div>

                                        <div className='mb-30'>
                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Card</div>
                                                <div className='font-bold text-gray-500'> (*** 3456)</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Fees</div>
                                                <div>₦306.00</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Amount Funded</div>
                                                <div>₦306.00</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Total Amount</div>
                                                <div className='font-bold text-color-1 font-bold'>₦ 24,206.00</div>
                                            </div>

                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Date</div>
                                                <div className='font-bold text-color-1 font-bold'>₦ 24,206.00</div>
                                            </div> 
                                                                                       
                                            <div className='flex justify-between p-5 border-bottom-1d'>
                                                <div>Reference</div>
                                                <div className='font-bold text-color-1 font-bold'>₦ 24,206.00</div>
                                            </div>                                            
                                        </div>

                                        <div className='flex space-x-3'>
                                            <button type='button' className='w-2/5 font-bold border-0 rounded-lg focus:shadow-outline px-5 py-2 bg-gray-200 cursor-pointer'>Share</button>

                                            <button type='button' className='w-3/5 font-bold border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Close</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Bank transfer Section */}
                                <div className={showBankTransferSection ? 'banktransfer-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className="wallet-id-card mb-30">
                                            <div className="font-bold text-green-500 mb-10">Wallet ID</div>
                                            <div className="font-bold text-white mb-10 text-14">Olabolanle Badmus</div>

                                            <div className="font-bold text-28 text-white mb-5">
                                                <span>0903940034</span>
                                            </div>
                                        </div>

                                        <div className='border border-gray-300 p-5 rounded mb-20'>
                                            <div className='font-bold'>
                                                <img src={InfoIcon} alt="" className='align-middle mr-3'/> Transfer Tips
                                            </div>
                                            <div className='pl-3'>
                                                <ul>
                                                    <li className='p-1'>Copy your wallect ID</li>
                                                    <li className='p-1'>Open Vbank app and click on funds transfer</li>
                                                    <li className='p-1'>Select (VFD Microfinance bank) beneficiary bank,</li> 
                                                    <li className='p-1'>Enter your wallet ID as account number</li>
                                                    <li className='p-1'>Input amount and transfer</li>
                                                    <li className='p-1'>Your anchoria wallet will be credited with the amount</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='flex space-x-3'>
                                            <button type='button' className='w-full font-bold border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Close</button>
                                        </div>
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

export default FundAccount;