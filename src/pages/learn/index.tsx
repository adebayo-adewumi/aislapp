import React, {useEffect, useState} from 'react';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import Sidebar from '../../components/Sidebar';
import '../learn/index.scss'
import DesignerSVG from '../../assets/images/designer.svg';
import FAQsSVG from '../../assets/images/faqs.svg';
import VideoCallSVG from '../../assets/images/faqs.svg';
import BrowseFile from '../../assets/images/browse-file.svg';
import SuccessIcon from '../../assets/images/success.gif';
import EmailIcon from '../../assets/images/email.svg';
import FacebookIcon from '../../assets/images/facebook.svg';
import LivechatIcon from '../../assets/images/livechat.svg';
import LinkedInIcon from '../../assets/images/linkedin.svg';
import InstagramIcon from '../../assets/images/instagram.svg';
import PhoneIcon from '../../assets/images/phone.svg';
import SpreadsheetIcon from '../../assets/images/spreadsheet.svg';
import Accordion  from 'react-bootstrap/Accordion';
import * as HelperFunctions from '../../lib/helper';
import axios from 'axios';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';

const Learn = () => {
    document.title = "Learn - Anchoria";
    HelperFunctions.removeOverflowAndPaddingFromModalBody();


    const [switchToLearn, setSwitchToLearn] = useState<boolean>(true);
    const [switchToSupport, setSwitchToSupport] = useState<boolean>(false);
    const [switchToContactUs, setSwitchToContactUs] = useState<boolean>(false);

    const [showLearningResource, setShowLearningResource] = useState<boolean>(false);
    const [learningResourcesList, setLearningResourcesList] = useState([{}]);

    useEffect(() => {
        function checkUrlParamsForActiveLearnSection(){
            let queryParams = new URLSearchParams(window.location.search);

            if(queryParams.has("type")){
                if(queryParams.get("type") === 'learn'){
                    setSwitchToLearn(true);
                    setSwitchToContactUs(false);
                }
                else if(queryParams.get("type") === 'contactus'){
                    setSwitchToLearn(false);
                    setSwitchToContactUs(true);
                }
            }
        }

        function getLearningResource(){

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}
    
            axios.get(utilityServiceBaseUrlUrl+'/learn/retrieve-all', 
            { headers })
            .then(function (response) {
                setLearningResourcesList(response.data.data);
            })
            .catch(function (error) {
                alert("Unable to get learning resources. Please try again later.");
            });
        }

        getLearningResource();
        checkUrlParamsForActiveLearnSection();
    },[])

    function performSwitchToLearn(){
        setSwitchToLearn(true);
        setSwitchToSupport(false);
        setSwitchToContactUs(false);
        setShowLearningResource(false);
    }

    function performSwitchToSupport(){
        setSwitchToLearn(false);
        setSwitchToSupport(true);
        setSwitchToContactUs(false);
        setShowLearningResource(false);
    }

    function performSwitchToContactUs(){
        setSwitchToLearn(false);
        setSwitchToSupport(false);
        setSwitchToContactUs(true);
        setShowLearningResource(false);
    }

    function displayLearningResource(){
        setSwitchToLearn(true);
        setSwitchToSupport(false);
        setSwitchToContactUs(false);
        setShowLearningResource(true);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className="text-3xl mb-10">
                                <span className="font-bold text-green-900">Learning Centre</span>
                            </div>

                            <div className="text-sm font-bold text-color-2 mb-12">Explore curated resources on how to trade stocks</div>

                            {/*Switch */}
                            <div className='mb-14'>
                                <div className='mb-30 flex justify-between items-center'>
                                    <div className="border_1 flex rounded-lg p-02rem">
                                        <div>
                                            <button onClick={performSwitchToLearn} type='button' className={switchToLearn ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Learn</button>
                                        </div>

                                        <div className='hidden'>
                                            <button onClick={performSwitchToSupport} type='button' className={switchToSupport ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Support</button>
                                        </div>

                                        <div>
                                            <button onClick={performSwitchToContactUs}  type='button' className={switchToContactUs ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer":"cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bgcolor-f"}>Contact Us</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End */}

                            {/*Learn Section */}   
                            <div className={switchToLearn ? '':'hidden'}>
                                {/* Search Section */}
                                <div className='px-14 pb-16 search-bg mb-14 hidden'>
                                    <div>
                                        <div className='mb-30 text-3xl font-gotham-black-regular text-green-900 text-center font-bold'>How can we help you?</div>
                                    </div>

                                    <div className='md:flex md:space-x-3 md:mx-auto mb-20 md:w-7/12'>
                                        <div className='md:w-3/4 md:mb-0 mb-6'>
                                            <input type="text" className='border border-gray-500 p-4 w-full rounded-lg outline-white p-4' placeholder='Search the knowledge base'/>
                                        </div>

                                        <div>
                                            <button className='bg-green-900 rounded-lg text-white border-0 px-10 font-bold py-4 w-full'>Search</button>
                                        </div>
                                    </div>

                                    <div className='flex items-center  mx-auto space-x-3 hidden' style={{width : '50rem'}}>
                                        <div>Popular searches:</div>
                                        <div>
                                            <button className='bg-gray-200 rounded-lg border-0 px-6 py-3'>Add a beneficiary</button>
                                        </div>
                                        <div>
                                            <button className='bg-gray-200 rounded-lg border-0 px-6 py-3'>Make transfer</button>
                                        </div>
                                        <div>
                                            <button className='bg-gray-200 rounded-lg border-0 px-6 py-3'>Fund Wallet</button>
                                        </div>
                                        <div>
                                            <button className='bg-gray-200 rounded-lg border-0 px-6 py-3'>USSD Code</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End */} 

                                <div className={showLearningResource ? 'hidden':''}>
                                    <div className=''>
                                        <div className='font-bold text-center w-full mb-30'>QUICK LINKS</div>
                                    </div>      

                                    <div className='flex mx-auto space-x-5 mb-28 cursor-pointer' style={{width: '15rem'}}>
                                        <div onClick={displayLearningResource} className='rounded-lg px-12 py-5 w-72' style={{backgroundColor: '#FF0949'}}>
                                            <div className='mb-10 text-center'><img src={DesignerSVG} alt=""/></div>
                                            <div className='mb-10 font-bold text-white text-center'>Knowledge base</div>
                                            <div className='mb-10 text-center text-white text-xs'>Read and learn from our curated articles and contents</div>
                                        </div>

                                        <div className='rounded-lg px-12 py-5 w-72 hidden' style={{backgroundColor: '#144A22'}}>
                                            <div className='mb-10 text-center'><img src={FAQsSVG} alt=""/></div>
                                            <div className='mb-10 font-bold text-white text-center'>FAQs</div>
                                            <div className='mb-10 text-center text-white text-xs'>Browse and learn more from our frequently asked questions </div>
                                        </div>

                                        <div onClick={performSwitchToContactUs} className='hidden rounded-lg px-12 py-5 w-72 cursor-pointer' style={{backgroundColor: '#FFAF34'}}>
                                            <div className='mb-10 text-center'><img src={VideoCallSVG} alt=""/></div>
                                            <div className='mb-10 font-bold text-white text-center'>Live Support</div>
                                            <div className='mb-10 text-center text-white text-xs'>Easily connect with one of our support representative for 24/7</div>
                                        </div>
                                    </div>
                                </div>

                                {/*Knowledge Base */}
                                <div className={showLearningResource ? '':'hidden'}>
                                    <div className=''>
                                        <div className='flex justify-between items-center text-center mx-auto w-96 mb-3'>
                                            <div style={{fontSize : '30px'}} className='mb-10 font-gotham-black-regular text-green-900 text-center font-bold'>Knowledge Base</div>
                                            
                                            <div className='cursor-pointer'>
                                                <a href='/learn' className='no-underline text-green-900'>
                                                    <img src={ArrowBackIcon} alt="" className="cursor-pointer align-middle w-6" /> Back
                                                </a>
                                            </div>
                                        </div>
                                        

                                        <div className='mb-30 text-sm text-green-900 text-center'>Browse articles to find answers and troubleshooting tips.</div>                               
                                    </div>

                                    <div className="mb-11">
                                        <div className={learningResourcesList.length <= 0 ? 'mx-auto text-center text-gray-400':'hidden'} style={{width: '18rem'}}>No resources available</div>

                                        <div className={learningResourcesList.length > 0 ? 'grid grid-cols-4 gap-4 mb-28':'hidden'}>
                                            {learningResourcesList.map((item :any, index :any)=>
                                                <div className='rounded-lg px-12 py-5' style={{backgroundColor: '#EBEBEB'}} key={index}>
                                                    <div className='mb-10 text-center'><img src={SpreadsheetIcon} alt=""/></div>
                                                    <div className='mb-10 font-bold text-center'>{item.title}</div>
                                                    <div className='mb-30 text-center text-xs'>{item.description}</div>
                                                    <div className='mb-10 text-center text-xs font-bold'>
                                                        <a href={item.link} className="text-green-900 no-underline hover:underline">Read article</a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                </div>
                                {/*End */}

                                {/*FAQs */}
                                <div className='hidden'>
                                    <div className=''>
                                        <div style={{fontSize : '30px'}} className='mb-10 font-gotham-black-regular text-green-900 text-center font-bold'>Frequently asked questions</div>

                                        <div style={{fontSize : '15px'}} className='mb-30 text-green-900 text-center'>Browse our FAQs to find quick answers to your questions</div>                               
                                    </div>

                                    <div>
                                        <div>
                                            <Accordion defaultActiveKey="0" className='mb-30'>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className='m-0 bg-transparent font-bold'>&middot; Once I refer, is that all I have to do?</Accordion.Header>
                                                    <Accordion.Body>
                                                    
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                                {/*End */}
                            </div>   
                            {/*End */} 

                            {/*Support Section */}  
                            <div className={switchToSupport ? '':'hidden'}>
                                <div className=''>
                                    <div style={{fontSize : '30px'}} className='mb-10 font-gotham-black-regular text-green-900 text-center font-bold'>Raise a ticket</div>

                                    <div style={{fontSize : '15px'}} className='mb-30 text-green-900 text-center'>We are here to help you, send us a message and we’ll respond in a short while</div>                               
                                </div>

                                <div className='rounded shadow-sm bg-white border border-gray-500 p-10 mx-auto' style={{width: '50rem'}}>
                                    <div className='mb-30'>
                                        <div className='font-bold mb-10'>Email Address</div>
                                        
                                        <div>
                                            <input type="text" placeholder='Enter your email address' className='w-full p-5 border border-gray-500 rounded-lg outline-white'/>
                                        </div>
                                    </div>

                                    <div className='mb-30'>
                                        <div className='font-bold mb-10'>Subject</div>

                                        <div>
                                            <input type="text" placeholder='Short description of your message' className='w-full p-5 border border-gray-500 rounded-lg outline-white'/>
                                        </div>
                                    </div>

                                    <div className='mb-30'>
                                        <div className='font-bold mb-10'>How can we help you?</div>

                                        <div>
                                            <textarea rows={8} className='w-full p-3 outline-white border border-gray-500 rounded-lg'></textarea>
                                        </div>
                                    </div>

                                    <div className='mb-30'>
                                        <div><img className='cursor-pointer' style={{width: '45rem'}} src={BrowseFile} alt="" /></div>
                                    </div>

                                    <div>
                                        <div className='text-right'>
                                            <button className='bg-green-900 text-white rounded-lg font-bold px-16 py-5 border-0 cursor-pointer'>Submit</button>
                                        </div>
                                    </div>
                                </div> 

                                <div className="hidden p-5 mx-auto bg-white border border-gray-500 mb-32" style={{width: '27rem'}}>
                                    <div className="mx-auto h-64 relative">
                                        <img src={SuccessIcon} alt="success icon" className="w-96"/>
                                        <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                                    </div>

                                    <div className="relative z-10 text-green-900 font-gotham-black-regular text-3xl text-center mb-20">Successful</div>

                                    <div className="text-color-4 text-sm text-center mb-30">Your message has been successfully sent a support representative will attend to your request in 24hrs</div>

                                    <div className="flex space-x-5">
                                        <button type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Close</button>
                                    </div>
                                </div>
                            </div>
                            {/*End */}  

                            {/*Contact Us Section */}  
                            <div className={switchToContactUs ? '':'hidden'}>
                                <div className='md:px-24 py-16 mb-12 contactus-bg text-center'>

                                    <div>                                    
                                        <div className='md:px-10 md:py-10 px-5 py-4 bg-white shadow-sm rounded-lg mx-auto md:w-full w-80'>

                                            <div className='font-bold md:text-2xl text-xl mb-10'>Contact Us</div>

                                            <div className='mb-30 text-sm'>Address: 12th floor, Elephant House, 214 Broad Street, Marina, Lagos</div>

                                            <div className='md:flex md:space-x-5 md:mx-auto md:w-2/3'>

                                                <div className='flex space-x-5 justify-center items-center md:mb-0 mb-6'>       
                                                    <div>
                                                        <a href="https://web.facebook.com/Anchoriang" target="_blank" rel="noreferrer">
                                                            <img src={FacebookIcon} alt=""  className='md:w-14 w-10'/>
                                                        </a>
                                                    </div> 

                                                    <div>
                                                        <a href="https://www.instagram.com/anchoriang/" target="_blank" rel="noreferrer">
                                                            <img src={InstagramIcon} alt=""  className='md:w-14 w-10'/>
                                                        </a>
                                                    </div>

                                                    <div>
                                                        <a href="https://www.linkedin.com/company/anchoria-investment-and-securities-ltd" target="_blank" rel="noreferrer">
                                                            <img src={LinkedInIcon} alt=""  className='md:w-14 w-10'/>
                                                        </a>
                                                    </div>

                                                    <div>
                                                        <a href="mailto:help@anchoriaonline.com" target="_blank" rel="noreferrer">
                                                            <img src={EmailIcon} alt=""  className='md:w-14 w-10'/>
                                                        </a>
                                                    </div>

                                                    

                                                    <div className='hidden'>
                                                        <img src={LivechatIcon} alt=""  className='w-36'/>
                                                    </div>
                                                </div> 

                                                <div className='flex space-x-5 justify-center items-center'>       
                                                    <div>
                                                        <div className='flex bg-green-900 items-center space-x-2 py-4 font-bold px-5 rounded-3xl text-white'>
                                                            <img src={PhoneIcon} alt="" className='w-6'/> 
                                                            <span>+234 817 629 0550</span>
                                                        </div>
                                                    </div>
                                                </div> 
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

        </div>
    );
};

export default Learn;
