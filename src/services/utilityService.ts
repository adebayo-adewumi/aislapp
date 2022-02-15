import axios from "axios";
import { utilityServiceBaseUrlUrl } from "../apiUrls";
import { getAxios } from "../network/httpClientWrapper";

export const getTopMoversApiCall = async (getBy = "value") => {
    let url = utilityServiceBaseUrlUrl.concat('/utils/top-movers?type=') + getBy;
    let data = await getAxios(axios).get(url)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error)
        });

    return data;
}
export const getStockQuoteApiCall = async (stockCode: string) => {
    let url = utilityServiceBaseUrlUrl.concat('/stock/quote?stockCode=') + stockCode;
    let data = await getAxios(axios).get(url)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error)
        });

    return data;
}
export const getNewsApiCall = async () => {
    let url = utilityServiceBaseUrlUrl.concat('/utils/news');
    let data = await getAxios(axios).get(url)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error)
        });

    return data;
}
export const getStockApiCall = async () => {
    let url = utilityServiceBaseUrlUrl.concat('/utils/news');
    let data = await getAxios(axios).get(url)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error)
        });

    return data;
}
