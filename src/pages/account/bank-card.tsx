import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import SuccessIcon from '../../assets/images/success.gif';
import MaskGroupImg from '../../assets/images/mask-group.svg';
import LockIcon from '../../assets/images/lock.svg';
import DeleteCardIcon from '../../assets/images/delete-card.svg';
import Sidebar from '../../components/Sidebar';
import CloseIcon from '../../assets/images/close.svg';

const BankCard = () => {
    const [showDebitCards, setShowDebitCards] = useState<boolean>(true);
    const [showBank, setShowBank] = useState<boolean>(false);
    const [showAddCard, setShowAddCard] = useState<boolean>(false);
    const [showAddBank, setShowAddBank] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showManageCard, setShowManageCard] = useState<boolean>(false);
    const [showManageBank, setShowManageBank] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showDeleteCardModal, setShowDeleteCardModal] = useState<boolean>(false);
    const [switchToDebit, setSwitchToDebit] = useState<boolean>(true);
    const [switchToBank, setSwitchToBank] = useState<boolean>(false);
    const [showBankHeader, setShowBankHeader] = useState<boolean>(false);
    const [showAddBankHeader, setShowAddBankHeader] = useState<boolean>(false);
    const [showBankSuccessMsg, setshowBankSuccessMsg] = useState<boolean>(false);

    function performSwitchToDebit(){
        setSwitchToDebit(true);
        setSwitchToBank(false);

        setShowDebitCards(true);
        setShowBank(false);
        setShowBankHeader(false);
    }

    function performSwitchToBank(){
        setSwitchToDebit(false);
        setSwitchToBank(true);

        setShowDebitCards(false);
        setShowBank(true);
        setShowBankHeader(true);
    }

    function displayAddCard(){
        setShowDebitCards(true);
        setShowAddCard(false);
        setShowSuccess(false);
        setShowManageCard(false);
    }

    function displayManageCard(){
        setShowDebitCards(false);
        setShowAddCard(false);
        setShowSuccess(false);
        setShowManageCard(true);
        setShowBank(false);
    }

    function displayManageBank(){
        setShowDebitCards(false);
        setShowAddCard(false);
        setShowSuccess(false);
        setShowManageCard(false);
        setShowBankHeader(false);
        setShowManageBank(true);
        setShowBank(false);
    }

    function displayAddBank(){
        setShowDebitCards(false);
        setShowBank(false);
        setShowAddCard(false);
        setShowAddBank(true);
        setShowSuccess(false);
        setShowManageCard(false);
        setShowAddBankHeader(true);
        setShowBankHeader(false);
    }

    function displaySuccess(){
        setShowDebitCards(false);
        setShowBank(false);
        setShowAddCard(false);
        setShowAddBank(false);
        setShowSuccess(true);
        setShowManageCard(false);
        setShowAddBankHeader(false);
        setShowBankHeader(false);
        setshowBankSuccessMsg(true);
    }

    function displayDeleteCard(){
        setShowModalBG(true);
        setShowDeleteCardModal(true);
    }

    function closeModal(){
        setShowModalBG(false);
        setShowDeleteCardModal(false);
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

                            {/*Card Header */}
                            <div className={showDebitCards ? "flex justify-between":'hidden'}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Bank and Cards</div>
                                    <div className="font-bold mb-30">Request for investment statements</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Bank Header */}
                            <div className={showBankHeader ? "flex justify-between":'hidden'}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Bank and Cards</div>
                                    <div className="font-bold mb-30">Request for investment statements</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Add Card Header */}
                            <div className={showAddCard ? "flex justify-between mb-30":"hidden"}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Add New Card</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}  

                            {/*Add Bank Header */}
                            <div className={showAddBankHeader ? "flex justify-between mb-30":"hidden"}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Add New Bank</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}  

                            {/*Manage Card Header */}
                            <div className={showManageCard ? "flex justify-between mb-30":"hidden"}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Manage Card</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}  

                            {/*Manage Bank Header */}
                            <div className={showManageBank ? "flex justify-between mb-30":"hidden"}>
                                <div>
                                    <div className="text-28 text-color-1 font-gotham-black-regular font-bold mb-10">Manage Bank</div>
                                </div>
                                
                                <div className='font-bold'>
                                    <Link to='/account' className='no-underline text-color-1'>
                                        <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle" /> Back
                                    </Link>
                                </div>
                            </div>
                            {/*End*/}  

                            <div>
                                {/* Cards Section */}
                                <div className={showDebitCards ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-30'>
                                            <div className="border_1 flex justify-between rounded-lg p-02rem w-22-4rem">
                                                <div className='w-1/2'>
                                                    <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Debit Cards</button>
                                                </div>

                                                <div className='w-1/2'>
                                                    <button onClick={performSwitchToBank} type='button' className={switchToBank ? "w-full rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "w-full cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Bank</button>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className='mb-30' onClick={displayManageCard}>
                                            <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer'>
                                                <img src={MaskGroupImg} alt='' className="w-full" />
                                                <div className='absolute bottom-0 px-7 py-6'>
                                                    <div className='text-white font-bold mb-5'>****9803</div>
                                                    <div className='text-green-500 font-bold'>Expires 09/2024</div>
                                                </div>
                                            </div>
                                        </div>                                       

                                        <div>
                                            <button onClick={displayAddCard} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Add New Card</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Bank Section */}
                                <div className={showBank ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-30'>
                                            <div className="border_1 flex justify-between rounded-lg p-02rem w-22-4rem">
                                                <div className='w-1/2'>
                                                    <button onClick={performSwitchToDebit} type='button' className={switchToDebit ? "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Debit Cards</button>
                                                </div>

                                                <div className='w-1/2'>
                                                    <button onClick={performSwitchToBank} type='button' className={switchToBank ? "w-full rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer" : "w-full cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Bank</button>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className='mb-30' onClick={displayManageBank}>
                                            <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer'>
                                                <img src={MaskGroupImg} alt='' className="w-full" />
                                                <div className='absolute bottom-0 px-7 py-6'>
                                                    <div className='text-white font-bold mb-20'>Olatoyin Gbade</div>
                                                    <div className='text-green-500 font-bold'>VFD Bank</div>
                                                </div>
                                            </div>
                                        </div>                                       

                                        <div>
                                            <button onClick={displayAddBank} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer'>Add New Bank</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Add Card Section */}
                                <div className={showAddCard ? 'card-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-20 text-color-1 text-xl font-bold'>Enter your card details below</div>

                                        <div className='mb-20'>
                                            <div className='text-14 mb-10 font-bold'>Card Number</div>

                                            <div>
                                                <input placeholder='Enter your 16 digits card number' type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' />
                                            </div>
                                        </div>

                                        <div className='mb-20'>
                                            <div className='flex justify-between space-x-5'>
                                                <div className='w-1/2'>
                                                    <div className='text-lg mb-10 text-14 font-bold'>Validity</div>

                                                    <div>
                                                        <input placeholder='MM / YY' type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' />
                                                    </div>
                                                </div>

                                                <div className='w-1/2'>
                                                    <div className='text-lg mb-10 text-14 font-bold'>CVV</div>

                                                    <div>
                                                        <input placeholder='CVV' type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-20'>
                                            <div className='text-center mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                            <div className='px-20 pb-5 mt-1 mx-2 text-gray-900 text-center'>Your card details are secured and protected by our PCI-DSS compliant payment partners</div>
                                        </div>

                                        <div>
                                            <button onClick={displaySuccess} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Save Card</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Add Bank Section */}
                                <div className={showAddBank ? 'card-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-5 text-color-1 text-xl font-bold'>Enter your bank details below</div>
                                        <div className='mb-30 text-color-1 text-md'>We pay your withdrawal into your bank account </div>

                                        <div className='mb-30'>
                                            <div className='text-14 mb-10 font-bold'>Account Number</div>

                                            <div>
                                                <input  type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' />
                                            </div>
                                        </div>

                                        <div className='mb-30'>
                                            <div className='text-14 mb-10 font-bold'>Select Bank</div>

                                            <div>
                                                <select className='input px-5 py-3 border-1-d6 outline-white font-bold text-lg' >
                                                    <option>VFD Microfinance Bank</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='mb-30'>
                                            <div className='text-14 mb-10 font-bold'>Account Name</div>

                                            <div>
                                                <input  type='text' className='input p-3 border-1-d6 outline-white font-bold text-lg' />
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={displaySuccess} type='button' className='w-full font-bold text-lg border-0 bgcolor-1 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Proceed</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Manage Card Section */}
                                <div className={showManageCard ? 'pin-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-30'>
                                            <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer'>
                                                <img src={MaskGroupImg} alt='' className="w-full" />
                                                <div className='absolute bottom-0 px-7 py-6'>
                                                    <div className='text-white font-bold mb-5'>****9803</div>
                                                    <div className='text-green-500 font-bold'>Expires 09/2024</div>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className='mb-20'>
                                            <div className='mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                            <div className='mt-1 text-gray-900'>Make this card your default debit card for your payments and transactions</div>
                                        </div>

                                        <div className="font-bold flex mb-30">
                                            <div className='mr-3'>Default debit card</div>
                                            
                                            <div  className='flex rounded-3xl p-1 bgcolor-1 ease-in-out transition delay-75 duration-75'>
                                                <button className="rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75" type="button"></button>

                                                <button className="ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75" type="button"></button>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='font-bold flex justify-between p-5 border-top-1'>
                                                <div>Bank</div>
                                                <div>VFD Microfinance bank</div>
                                            </div>

                                            <div className='font-bold flex justify-between p-5 border-top-1'>
                                                <div>Date Added</div>
                                                <div className='font-bold text-color-1 font-bold'>Aug 23, 2021</div>
                                            </div>

                                            <div className='font-bold flex justify-between mb-30 p-5 border-top-1'>
                                                <div>Expriy Date</div>
                                                <div className='font-bold text-gray-500'> July 13, 2022</div>
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={displayDeleteCard} type='button' className='w-full font-bold text-lg border-0 bg-red-500 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Delete Card</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Manage Bank Section */}
                                <div className={showManageBank ? 'pin-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div>
                                        <div className='mb-30'>
                                            <div className='bgcolor-2 rounded-xl p-0 relative cursor-pointer'>
                                                <img src={MaskGroupImg} alt='' className="w-full" />
                                                <div className='absolute bottom-0 px-7 py-6'>
                                                    <div className='text-white font-bold mb-20'>Olatoyin Gbade</div>
                                                    <div className='text-green-500 font-bold'>VFD Bank</div>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className='mb-20'>
                                            <div className='mb-10 mt-12'><img src={LockIcon} alt='' /></div>
                                            <div className='mt-1 text-gray-900'>Make this card your default debit card for your payments and transactions</div>
                                        </div>

                                        <div className="font-bold flex mb-30">
                                            <div className='mr-3'>Default bank account </div>
                                            
                                            <div  className='flex rounded-3xl p-1 bgcolor-1 ease-in-out transition delay-75 duration-75'>
                                                <button className="rounded-3xl knob border-0 cursor-pointer ease-in-out transition delay-75 duration-75" type="button"></button>

                                                <button className="ml-0.5 p-1.5 rounded-3xl knob items-center border-0 cursor-pointer opacity-0 ease-in-out transition delay-75 duration-75" type="button"></button>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='font-bold flex justify-between p-5 border-top-1'>
                                                <div>Bank</div>
                                                <div>VFD Microfinance bank</div>
                                            </div>

                                            <div className='mb-30 font-bold flex justify-between p-5 border-top-1'>
                                                <div>Date Added</div>
                                                <div className='font-bold text-color-1 font-bold'>Aug 23, 2021</div>
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={displayDeleteCard} type='button' className='w-full font-bold text-lg border-0 bg-red-500 text-white rounded-lg focus:shadow-outline px-5 py-3 cursor-pointer' >Delete Card</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}

                                {/* Success Section */}
                                <div className={showSuccess ? 'amount-section rounded-lg border-1-d6 bg-white p-10':'hidden'}>
                                    <div className="mx-auto w-2/3 h-64 relative">
                                        <img src={SuccessIcon} alt="success icon" className="w-96"/>
                                        <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                    </div>

                                    <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>

                                    <div className={showBankSuccessMsg ? 'hidden':"px-20 pb-14 text-color-4 text-16 text-center"}>Your card details with card number endin <strong>****3990</strong> has been successfully saved</div>

                                    <div className={showBankSuccessMsg ? "px-20 pb-14 text-color-4 text-16 text-center":'hidden'}>Your <strong>VFD Microfinance bank</strong> details with has been successfully saved</div>

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

            <div className={showDeleteCardModal ? "set-price-alert-modal rounded-lg" : "hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-28 text-color-1 font-gotham-black-regular"></div>

                    <div onClick={closeModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

                <div>
                    <div className='text-center'>
                        <img src={DeleteCardIcon} alt='' />
                    </div>
                    <div className='text-red-500 font-bold text-center'>Delete Card</div>
                    <div className='text-center my-8'>Enter your transaction to PIN confirm</div>
                    <div className='font-bold text-center my-5'>Enter PIN</div>
                    <div className='flex space-x-3 my-10'>
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        <input type='password' className='text-center input p-3 border-1-d6 outline-white' />
                        
                    </div>
                </div>

                <div className="flex space-x-5 mb-10">
                    <button type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer" onClick={closeModal}>Cancel</button>

                    <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-red-500 text-white rounded-lg border-0 cursor-pointer">Delete</button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40": "modal-backdrop opacity-40 hidden"}>
            </div>

        </div>
    );
};

export default BankCard;