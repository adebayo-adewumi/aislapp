import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import AccountStatementIcon from '../../assets/images/commerce-2.svg';
import CardBankIcon from '../../assets/images/card-bank.svg';
import WithdrawFundIcon from '../../assets/images/withdraw-fund.svg';
import AccountBalanceIcon from '../../assets/images/account-balance.svg';
import FundAccountIcon from '../../assets/images/fund-account.svg';
import TradeConfirmationIcon from '../../assets/images/trade-confirmation.svg';
import CloseIcon from '../../assets/images/close.svg';
import '../account/index.scss';
import Sidebar from '../../components/Sidebar';

const Account = () => {
    const [showAccountBalance, setShowAccountBalance] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);

    function showBalanceModal(){
        setShowModalBG(true);
        setShowAccountBalance(true);
    }

    function closeBalanceModal(){
        setShowModalBG(false);
        setShowAccountBalance(false);
    }


    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    {/* Main Content section */}
                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-10">
                            <span className="font-bold text-color-1">Account Management</span>
                        </div> 

                        <div className="text-16 font-bold text-color-2 mb-30">You can manage your account form here</div>

                        <div className='mt-12'>
                            <div className='flex space-x-12 mb-14'>
                                <div>
                                    <div className='mb-20'>
                                        <button onClick={showBalanceModal} type='button' className='cursor-pointer bgcolor-1 py-10 px-12 border-0 focus:shadow-outline rounded-lg'>
                                            <img src={AccountBalanceIcon} alt="" />
                                        </button>
                                    </div>
                                    <div className='text-color-1 text-center text-24 font-bold'>Account Balances</div>
                                </div>

                                <div>
                                    <div className='mb-20'>
                                        <Link to='fund'>
                                            <button type='button' className='cursor-pointer bgcolor-1 py-10 px-12 border-0 focus:shadow-outline rounded-lg'>
                                                <img src={FundAccountIcon} alt="" />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='text-color-1 text-center text-24 font-bold'>Fund Account</div>
                                </div>

                                <div>
                                    <div className='mb-20'>
                                        <Link to='withdraw'>
                                            <button type='button' className='cursor-pointer bgcolor-1 py-10 px-12 border-0 focus:shadow-outline rounded-lg'>
                                                <img src={WithdrawFundIcon} alt="" />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='text-color-1 text-center text-24 font-bold'>Withdraw Funds</div>
                                </div>
                            </div>

                            <div className='flex space-x-12 mb-16'>                               

                                <div>
                                    <div className='mb-20'>
                                        <Link to='trade-confirmations'>
                                            <button type='button' className='cursor-pointer bgcolor-1 py-10 px-12 border-0 focus:shadow-outline rounded-lg'>
                                                <img src={TradeConfirmationIcon} alt="" />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='text-color-1 text-center text-24 font-bold'>Trade Confirmations</div>
                                </div>

                                <div>
                                    <div className='mb-20'>
                                        <Link to='statement'>
                                            <button type='button' className='cursor-pointer bgcolor-1 py-10 px-12 border-0 focus:shadow-outline rounded-lg'>
                                                <img src={AccountStatementIcon} alt="" />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='text-color-1 text-center text-24 font-bold'>Account Statement</div>
                                </div>

                                <div>
                                    <div className='mb-20'>
                                        <Link to='bank-card'>
                                            <button type='button' className='cursor-pointer bgcolor-1 py-10 px-12 border-0 focus:shadow-outline rounded-lg'>
                                                <img src={CardBankIcon} alt="" />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='text-color-1 text-center text-24 font-bold'>Card & Banks</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>

            {/* Account Balance */}
            <div className={showAccountBalance ? "account-balance-modal rounded-lg" : "rounded-lg account-balance-modal hidden"}>
                <div className="mb-10 flex justify-between">
                    <div className="font-bold text-25">Your wallet balances</div>

                    <div onClick={closeBalanceModal}>
                        <img src={CloseIcon} alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="border-1 mb-30"></div>

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

                <div className="wallet-balance-card mb-30">
                    <div className="italic text-yellow-500 mb-5">Unsettled Balance</div>
                    <div className="font-bold text-28 text-white mb-5">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                        </svg> 
                        <span className="ml-2">₦ 53,000.00</span>
                    </div>
                    <div className="text-gray-300 text-13 leading-5">Money from your recent sell orders that are yet to reflect in available balance</div>
                </div>

                <div className="wallet-balance-card mb-30">
                    <div className="italic text-green-950 mb-5">Reserved Balance</div>
                    <div className="font-bold text-28 text-white mb-5">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1787 6.06096C20.6317 6.06096 20.9989 5.67627 20.9989 5.20171V4.2995C20.9989 1.92875 19.1578 0 16.8948 0C16.8948 0 4.03797 0.00201923 4.00627 0.00592881C2.92406 0.0455401 1.88451 0.532046 1.13519 1.3546C0.36712 2.1977 -0.0332975 3.29427 0.00439032 4.44802C0.00283195 4.46989 0.00201176 16.8412 0.00201176 16.8412C0.00201176 19.6858 2.21103 22 4.92627 22H16.8948C19.1578 22 20.9989 20.0712 20.9989 17.7005V11.1767C20.9989 8.806 19.1578 6.87724 16.8948 6.87724H4.10292C2.78607 6.87724 1.70645 5.79898 1.64506 4.42246C1.61385 3.72252 1.85421 3.05437 2.3218 2.54105C2.79616 2.02035 3.46236 1.72176 4.14951 1.72176C4.17375 1.72176 16.8947 1.71849 16.8947 1.71849C18.2532 1.71849 19.3584 2.87633 19.3584 4.2995V5.20171C19.3585 5.67627 19.7257 6.06096 20.1787 6.06096ZM4.10292 8.59574H16.8948C18.2533 8.59574 19.3585 9.75358 19.3585 11.1767V17.7005C19.3585 19.1237 18.2533 20.2815 16.8948 20.2815H4.92627C3.11554 20.2815 1.64239 18.7382 1.64239 16.8412V7.73997C2.3284 8.27829 3.18078 8.59574 4.10292 8.59574ZM17.7181 14.4386C17.7181 15.0318 17.2591 15.5127 16.6929 15.5127C15.3329 15.4561 15.3333 13.4209 16.6929 13.3646C17.2591 13.3646 17.7181 13.8454 17.7181 14.4386ZM17.7181 4.2995C17.7181 3.82494 17.3509 3.44025 16.8979 3.44025H4.10297C3.01474 3.48562 3.01556 5.11377 4.10297 5.15875H16.8979C17.3509 5.15875 17.7181 4.77406 17.7181 4.2995Z" fill="white"/>
                        </svg> 
                        <span className="ml-2">₦ 100,000.00</span>
                    </div>
                    <div className="text-gray-300 leading-5 text-13">This balance is money reserved for your queued Buy Orders</div>
                </div>
            </div>
            {/* End */}

            {/* Modal BG */}
            <div className={ showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden" }>
            </div>
            {/* End */}
        </div>
    );
};

export default Account;