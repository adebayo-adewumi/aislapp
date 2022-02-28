import React, { useEffect, useState } from 'react';
import '../dashboard/index.scss';
import Sidebar from '../../components/Sidebar';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import axios from 'axios';
import moment from 'moment';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import * as HelperFunctions from '../../lib/helper';
import { getAxios } from '../../network/httpClientWrapper';
import { utilityServiceBaseUrlUrl } from '../../apiUrls';

const News = () => {
    document.title = "News - Anchoria";
    HelperFunctions.addOverflowAndPaddingToModalBody();

    const [newsList, setNewsList] = useState('');
    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);
    const [newsApiResponseSuccess, setNewsApiResponseSuccess] = useState<boolean>(false);

    useEffect(() => {

        function getNews() {
            getAxios(axios).get(utilityServiceBaseUrlUrl.concat('/utils/news'))
                .then(function (response:any) {

                    const newsItem = response.data.data.map((item: any, index :any) =>
                        <a href={item.url === null || item.url === '' ? '#': item.url} className='no-underline' target="_blank" key={index} rel="noreferrer">
                            <div key={item.id}>
                                <div className='mb-20'>
                                    <img src={item.imageUrl} alt='' style={{width:'75px', height:'75px'}}/>
                                </div>
                                <div className='w-22rem'>
                                    <div className='font-bold mb-10 text-sm w-6/6 text-black'>{item.title}</div>
                                    <div className='mb-10 text-sm tracking-wider leading-5 text-color-5'>{item.snippet}</div>
                                    <div className='font-bold text-sm text-black'>&middot; {moment(item.date).format("MMM Do YYYY, hh:ss a")}</div>
                                </div>
                            </div>
                        </a>
                    ) as unknown as string;

                    setNewsList(newsItem);
                    setShowPageLoader(false);
                    setNewsApiResponseSuccess(true);
                })
                .catch(function (error: any) {
                    setShowPageLoader(false);
                    setNewsApiResponseSuccess(false);
                });
        }

        getNews();
    }, []);

    HelperFunctions.removeOverflowAndPaddingFromModalBody();

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="flex">
                    <Sidebar />

                    <div className="main-content w-full p-10">
                        <div className="text-3xl mb-20">
                            <span className="font-bold text-green-900">News and Insights</span>
                        </div>

                        <div className="text-sm font-bold text-color-2 mb-30">
                            Lastest news on stocks and the stock market
                        </div>

                        {/* News Section */}
                        <div className='mb-30 news-section'>
                            <div className={newsApiResponseSuccess ? 'hidden' : 'text-sm text-gray-400'}>Nothing to display</div>
                            <div className='grid gap-x-10 gap-y-24 grid-cols-3 grid-rows-3 mb-12 mt-10'>
                                {newsList}
                            </div>
                        </div>
                        {/* End */}

                        {/* Page Loader Section */}
                        <div className={showPageLoader ? "page-loader-backdrop opacity-90" : "hidden"}>
                            <div className='w-96 relative lg:ml-72'>
                                <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                                <div className='text-center'><img src={AnchoriaSpinner} alt="" /></div>
                            </div>
                        </div>
                        {/* End */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;