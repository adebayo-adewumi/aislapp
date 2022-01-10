import React, {useState, useEffect} from 'react';
import {Link, useNavigate } from "react-router-dom";
import '../portfolio/index.scss';
import ArrowUpIcon from '../../assets/images/arrow-up.svg';
import ArrowDownIcon from '../../assets/images/arrow-down.svg';
import SuccessIcon from '../../assets/images/success.gif';
import CloseIcon from '../../assets/images/close.svg';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import ChevronRightIcon from '../../assets/images/chevron-right.svg';
import Sidebar from '../../components/Sidebar';
import Chart from "react-apexcharts";
import axios from 'axios';
import { encryptData } from '../../lib/encryptionHelper';
import {generalEncKey} from '../../common/constants/globals';
import SpinnerIcon from "../../assets/images/spinner.gif";
import { formatCurrencyWithDecimal } from '../../lib/helper';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';

const Portfolio = () => {
    const [showCreatePortfolio, setShowCreatePortfolio] = useState<boolean>(false);
    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showSuccess, setShowSuccessModal] = useState<boolean>(false);
    const [portfolioName, setPortfolioName] = useState('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [apiResponseHasError, setApiResponseHasError] = useState<boolean>(false);
    const [portfolioIsNullOrEmpty, setPortfolioIsNullOrEmpty] = useState<boolean>(true);
    const [portfolioCount, setPortfolioCount] = useState(0);
    const [portfolioList, setPortfolioList] = useState('');
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [netPortfolioReturns, setNetPortfolioReturns] = useState(0);
    const [netPortfolioReturnsPercentage, setNetPortfolioReturnsPercentage] = useState(0);

    let navigate = useNavigate();

    let options = {
        chart: {
          toolbar:{
              show: false
          }
        },
        xaxis: {
            categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            tooltip:{
                enabled: false
            }
        },
        markers:{
            colors: ['#A41856'],
            strokeColors: '#00C48C',
            strokeWidth: 4
        },
        fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
              //colorStops: ['#A0F2DB', 'rgba(187, 230, 217, 0)']
              colorStops: [
                [
                    {
                      offset: 0,
                      color: '#A0F2DB',
                      opacity: 1
                    },
                    {
                      offset: 100,
                      color: 'rgba(187, 230, 217, 0)',
                      opacity: 1
                    }
                  ],
              ]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            colors: ['#3BC359']
        },
        grid:{
            show: true,
            borderColor: '#F3F4F6 '
        },
        tooltip:{
            followCursor: false
        }

    };
    
    let series = [
        {
          name: "series-1",
          data: [45, 52, 38, 45, 19, 23, 2, 45, 52, 38, 45, 19]
        }
    ];

    useEffect(() => {
        function checkIfPortfolioIsNullOrEmpty(){
    
            if(portfolioName ===  ''){
                setPortfolioIsNullOrEmpty(true);
            }
            else{
                setPortfolioIsNullOrEmpty(false);
            }            
        } 

        function getPortfolioList(){

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}
    
            axios.post('http://34.252.87.56:7933/portfolio/list?customerId='+localStorage.getItem('aislUserCustomerId'), 
            {}, { headers })
            .then(function (response) {
                setPortfolioCount(response.data.data.portfolio.length);
                setTotalPortfolioValue(response.data.data.totalCurrentPrice);
                setInvestmentAmount(response.data.data.totalPurchasedPrice);
                setNetPortfolioReturns(totalPortfolioValue - investmentAmount);

                let returnsPercentage = netPortfolioReturns === 0 ? 0 : (netPortfolioReturns * 100)/totalPortfolioValue;

                setNetPortfolioReturnsPercentage(returnsPercentage);

                const listItems = response.data.data.portfolio.map((item : any) =>
                <Link to={'details/'+item.uuid} className='no-underline' key={item.uuid}>
                    <div onClick={viewPortfolioDetails} className="card-custom p-5 flex justify-between cursor-pointer">
                        <div className="flex space-x-4">
                            <div><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" /></div>

                            <div className="text-14">
                                <div className="mb-10 font-bold text-color-2">{item.name}</div>
                                <div className='text-black'>Count: 0</div>
                            </div>
                        </div>

                        <div className="text-14">
                            <div className="flex mb-10 justify-between">
                                <div className="text-color-1 font-bold">Portfolio Value</div>
                            </div>

                            <div className="font-gotham-black-regular text-color-1 text-24 mb-10">₦ {formatCurrencyWithDecimal(item.currentPrice)}</div>

                            <div>
                                <span className={(item.currentPrice - item.purchasedPrice) >=0 ? "text-green-500 text-24 font-bold":"text-red-500 text-24 font-bold"}>{formatCurrencyWithDecimal(item.currentPrice - item.purchasedPrice)} | {netPortfolioReturns === 0 ? 0 : (netPortfolioReturns * 100)/totalPortfolioValue}%</span>  
                                <span className='text-black hidden'> 7days</span>
                            </div>
                        </div>

                        <div><img src={ChevronRightIcon} alt="" /></div>
                    </div>
                </Link>
                );

                setPortfolioList(listItems);
            })
            .catch(function (error) {
    
                console.log(apiResponseHasError);
    
                setApiResponseHasError(true);
    
                setTimeout(()=>{
                    setApiResponseHasError(false);
                },3000);
            });
        }

        getPortfolioList();
        checkIfPortfolioIsNullOrEmpty();
    });  

    function showCreatePorfolioModal(){
        setShowCreatePortfolio(true);
        setShowModalBG(true);
    }

    function closeModal(){
        setShowCreatePortfolio(false);
        setShowModalBG(false);
        setShowSuccessModal(false);
        setPortfolioName('');
    }

    function createPortfolio(){
        let requestData = {
            "customer": {
                "id": localStorage.getItem('aislUserCustomerId')
            },
            "name": portfolioName
        }

        setShowSpinner(true);

        let createPortfolioCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
        localStorage.setItem('createPortfolioCypher', createPortfolioCypher);
        
        //Login User
        if(localStorage.getItem('createPortfolioCypher')){

            setShowSpinner(true);

            let headers = {'Authorization': 'Bearer '+localStorage.getItem('aislUserToken')}

            axios.post('http://34.252.87.56:7933/portfolio/add', 
            {
                "text" : localStorage.getItem('createPortfolioCypher')
            }, { headers })
            .then(function (response) {
                setShowSpinner(false);

                setShowCreatePortfolio(false);
                setShowModalBG(true);
                setShowSuccessModal(true);
            })
            .catch(function (error) {

                console.log(error);

                setShowSpinner(false);

                setApiResponseHasError(true);

                setTimeout(()=>{
                    setApiResponseHasError(false);
                },3000);
            });
        }
    }

    function viewPortfolioDetails(){      

        navigate("details/:customerId");
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />
                    
                    <div className="main-content w-full p-10">
                        <div className="text-28 mb-20">
                            <span className="font-bold text-color-1">Portfolio</span>
                        </div>

                        <div className="text-16 font-bold text-color-2 mb-30">
                            Overview of portfolio performance
                        </div>

                        <div className="flex mt-10 space-x-10 mb-30">
                            <div className="card-50">
                                <div className="mb-10 py-3">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="mb-10">Total Portfolio Value</div>

                                            <div className="font-bold text-25 font-gotham-black-regular">
                                                ₦ {formatCurrencyWithDecimal(totalPortfolioValue)} 
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-10">Investment Amount</div>

                                            <div className="font-bold text-25 font-gotham-black-regular">
                                                 ₦ {formatCurrencyWithDecimal(investmentAmount)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-50">
                                <div className="w-full mb-10 py-3">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="mb-10">Net Portfolio Returns</div>
                                            <div>
                                                <img src={netPortfolioReturns >= 0 ? ArrowUpIcon : ArrowDownIcon} alt="" width="20" className="align-middle" /> 
                                                <span className={netPortfolioReturns >= 0 ? "text-green-500 font-bold font-gotham-black-regular mx-2":"text-red-500 font-bold font-gotham-black-regular mx-2"}>{netPortfolioReturns >= 0 ? '+'+formatCurrencyWithDecimal(netPortfolioReturns) : formatCurrencyWithDecimal(netPortfolioReturns)} | {netPortfolioReturnsPercentage}%</span>
                                            </div>

                                            <div className="hidden font-bold text-28 font-gotham-black-regular">
                                                ₦ 53,000.00
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-10">Number of Portfolio</div>

                                            <div className="font-bold text-28 font-gotham-black-regular">
                                                {portfolioCount}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='hidden'>
                                    <img src={ArrowUpIcon} alt="" width="20" className="align-middle" /> 
                                    <span className="text-green-500 font-bold font-gotham-black-regular mx-2">+500 | 5.55%</span>  7days
                                </div>
                            </div>
                        </div>

                        <div className='mb-30'>
                            <div className='card'>
                                <div className='mb-30'>
                                    <div className='flex justify-between items-center'>
                                        <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>Total Portfolio Performance</div>
                                        <div className='w-1/2 flex bg-gray-300 p-1 rounded justify-between'>
                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1D</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1W</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1M</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>3M</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>6M</button>

                                            <button className='bg-gray-300 hover:text-white py-3 px-5 rounded border-0 hover:bg-green-900 cursor-pointer text-gray-500 font-bold' type='button'>1Y</button>
                                        </div>
                                    </div>

                                    <div className='text-lg'>Total Portfolio Value</div>
                                    <div className='font-gotham-black-regular font-bold text-color-1 text-xl'>₦ {formatCurrencyWithDecimal(totalPortfolioValue)}</div>
                                </div>

                                <div>
                                    {/* <Line options={options} data={data} id='canvas'/> */}
                                    <Chart options={options} series={series} type="area" height='489'/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="flex justify-between items-center">
                                <div className="text-lg font-gotham-black-regular">My Portfolio List</div>
                                <div>
                                    <button onClick={showCreatePorfolioModal} className="cursor-pointer bgcolor-1 rounded-lg text-white border-0 py-3 px-5 font-bold focus:shadow-outline" type='button'>
                                        Create new portfolio
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-30">
                            <div className="grid grid-cols-2 gap-4">
                                {portfolioList}

                                {/* <div onClick={viewPortfolioDetails} className="card-custom p-5 flex justify-between cursor-pointer">
                                    <div className="flex space-x-4">
                                        <div><img src={GreenBoxIcon} alt="" /></div>
                                        <div className="text-14">
                                            <div className="mb-10 font-bold text-color-2">Equity Investments</div>
                                            <div>Count: 3</div>
                                        </div>
                                    </div>

                                    <div className="text-14">
                                        <div className="flex mb-10 justify-between">
                                            <div className="text-color-1 font-bold">Portfolio Value</div>
                                        </div>

                                        <div className="font-gotham-black-regular text-24 mb-10">₦ 20,000.00</div>

                                        <div>
                                            <span className="text-red-500 text-24 font-bold">-500 | 5.55%</span>  
                                            <span> 7days</span>
                                        </div>
                                    </div>

                                    <div><img src={ChevronRightIcon} alt="" /></div>
                                </div>

                                <div className="card-custom p-5 flex justify-between cursor-pointer">
                                    <div className="flex space-x-4">
                                        <div><img src={RedBoxIcon} alt="" /></div>
                                        <div className="text-14">
                                            <div className="mb-10 font-bold text-color-2">Family Investment</div>
                                            <div>Count: 3</div>
                                        </div>
                                    </div>

                                    <div className="text-14">
                                        <div className="flex mb-10 justify-between">
                                            <div className="text-color-1 font-bold">Portfolio Value</div>
                                        </div>

                                        <div className="font-gotham-black-regular text-24 mb-10">₦ 20,000.00</div>

                                        <div>
                                            <span className="text-green-500 text-24 font-bold">-500 | 5.55%</span>  
                                            <span> 7days</span>
                                        </div>
                                    </div>

                                    <div><img src={ChevronRightIcon} alt="" /></div>
                                </div>

                                <div className="card-custom p-5 flex justify-between cursor-pointer">
                                    <div className="flex space-x-4">
                                        <div><img src={BlueBoxIcon} alt="" /></div>
                                        <div className="text-14">
                                            <div className="mb-10 font-bold text-color-2">Business Investment</div>
                                            <div>Count: 0</div>
                                        </div>
                                    </div>

                                    <div className="text-14">
                                        <div className="flex mb-10 justify-between">
                                            <div className="text-color-1 font-bold">Portfolio Value</div>
                                        </div>

                                        <div className="font-gotham-black-regular text-24 mb-10">₦ 0.00</div>
                                    </div>

                                    <div><img src={ChevronRightIcon} alt="" /></div>
                                </div> */}
                            </div>
                        </div>

                        <div className={showCreatePortfolio ? "create-portfolio-modal" : "create-portfolio-modal hidden"}>
                            <div className="mb-20 flex justify-between">
                                <div className="font-bold text-25 opacity-0">Top Losers</div>

                                <div onClick={closeModal}>
                                <img src={CloseIcon} alt="" className="cursor-pointer" />
                                </div>
                            </div>

                            <div>
                                <div className="text-28 font-bold mb-30">Create New Portfolio</div>

                                <form>
                                    <div>
                                        <div className="mb-10">Name</div>
                                        <div className="mb-30">
                                            <input value={portfolioName} onChange={e => setPortfolioName(e.target.value)} type="text" className="text-xl outline-white input-xsm p-3" />
                                        </div>

                                        <div className="flex space-x-5">
                                            <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Cancel</button>

                                            <button onClick={createPortfolio} className={portfolioIsNullOrEmpty ? "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer opacity-50" : "py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer"} disabled={portfolioIsNullOrEmpty} type='button'>
                                                <span className={ showSpinner ? "hidden" : ""}>Add</span>
                                                <img src={SpinnerIcon} alt="spinner icon" className={ showSpinner ? "" : "hidden"} width="30"/>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className={showSuccess ? "success-modal" : "success-modal hidden"}>
                            <div className="mx-auto h-64 relative">
                                <img src={SuccessIcon} alt="success icon" className="w-96"/>
                                <div className="bg-white p-3 w-full -bottom-10 absolute"></div>
                            </div>

                            <div className="relative z-10 text-color-1 font-gotham-black-regular text-28 text-center mb-20">Successful</div>

                            <div className="text-color-4 text-16 text-center mb-14">Your portfolio has been successfully created</div>

                            <div className="flex space-x-5 mb-30">
                                <button onClick={closeModal} type="button" className="py-4 px-10  font-bold bg-gray-200 rounded-lg border-0 cursor-pointer">Close</button>

                                <button onClick={closeModal} type="button" className="py-4 w-full font-bold bg-green-900 text-white rounded-lg border-0 cursor-pointer">Okay</button>
                            </div>
                        </div>

                        <div className={showModalBG ? "modal-backdrop opacity-40" : "modal-backdrop opacity-40 hidden"}>
                        </div>

                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default Portfolio;