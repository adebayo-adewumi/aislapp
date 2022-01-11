import React from 'react';
import { Form } from 'react-bootstrap';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import BrowseFile from '../../assets/images/browse-file.svg';

const Profile = () => {     

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
                                        <button type='button' className= "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">KYC Details</button>
                                    </div>

                                    <div>
                                        <button  type='button' className="cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f">Security</button>
                                    </div>

                                    <div>
                                        <button  type='button' className="cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f">Notificaion</button>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <button type='button' className= "rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">KYC Category: 2</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {/*End */}

                        {/*Personal details card */}
                        <div className='mb-30'>
                            <div className='card'>
                                <div className='font-gotham-black-regular text-color-1 mb-30'>Personal Details</div>

                                <div className='flex mb-30'>
                                    <div className='flex w-1/2 justify-between'>
                                        <div>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Firstname</div>
                                            <div>Olasuyi</div>
                                        </div>

                                        <div>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Surname</div>
                                            <div>Olasuyi</div>
                                        </div>

                                        <div>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Email address</div>
                                            <div>Olasuyi</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex mb-30'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className='w-1/2'>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Address</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>City</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg outline-white rounded-lg w-full'/></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex mb-12'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className='w-1/2'>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>State</div>
                                            <div>
                                                <select className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className='font-bold font-gotham-black-regular text-gray-700 mb-4'>Country</div>
                                            <div>
                                                <select className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                    <option></option>
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
                                        <img src={BrowseFile} alt="" />
                                    </div>

                                    <div className='w-1/2'>
                                        <div className='text-gray-900 mr-2 mb-10'>ID Number</div>
                                        <input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div>
                                        <div className='font-bold mb-10'>Upload a Valid Utility Bill (3 months old)</div>
                                        <img src={BrowseFile} alt="" />
                                    </div>
                                    
                                    <div>
                                        <div className='font-bold mb-10'>Upload Signature </div>
                                        <img src={BrowseFile} alt="" />
                                    </div>

                                    <div>
                                        <button type='button' className="mt-14 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">Update changes</button>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                        {/*End */}

                        {/*Employment details card */}
                        <div className='mb-30'>
                            <div className='card'>
                                <div className='font-gotham-black-regular text-color-1 mb-30'>Employment Details</div>


                                <div className='flex mb-30'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className='w-1/2'>
                                            <div className='text-gray-700 mb-4'>Name of employer</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className='text-gray-700 mb-4'>Profession</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg outline-white rounded-lg w-full'/></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex justify-between'>
                                        <div className='flex justify-between space-x-6 w-3/4'>
                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Salary Range</div>
                                                <div>
                                                    <select className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className='text-gray-700 mb-4'>Are you a politically exposed person?</div>
                                                <div>
                                                    <select className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button type='button' className="mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">Update changes</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                        {/*End */}

                        {/*Next of Kin card */}
                        <div>
                            <div className='card'>
                                <div className='font-gotham-black-regular text-color-1 mb-30'>Next of KIN Details</div>


                                <div className='flex mb-30'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className='w-1/2'>
                                            <div className='text-gray-700 mb-4'>Fullnames</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className='text-gray-700 mb-4'>Relationship</div>
                                            <div>
                                                <select className='border border-gray-300 px-4 py-3 text-lg text-gray-700 outline-white rounded-lg w-full'>
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex mb-30'>
                                    <div className='flex w-3/4 space-x-6'>
                                        <div className='w-1/2'>
                                            <div className='text-gray-700 mb-4'>Email Address</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className='text-gray-700 mb-4'>Phone number</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex justify-between space-x-5'>
                                        <div className='flex-1'>
                                            <div className='text-gray-700 mb-4'>Next of Kin Address</div>
                                            <div><input type='text' className='border border-gray-300 px-3 py-2 text-lg text-gray-700 outline-white rounded-lg w-full'/></div>
                                        </div>

                                        <div>
                                            <button type='button' className="mt-9 rounded-lg bgcolor-1 text-white border-0 py-3 px-12 font-bold cursor-pointer">Update changes</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                        {/*End */}
                        
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default Profile;