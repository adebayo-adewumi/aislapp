export const portfolioServiceBaseUrlUrl = `${process.env.REACT_APP_PORTFOLIO_SERVICE_URL}`;
export const utilityServiceBaseUrlUrl = `${process.env.REACT_APP_UTILITY_SERVICE_URL}`;
export const stockTradingServiceBaseUrlUrl = `${process.env.REACT_APP_STOCK_SERVICE_URL}`;
export const authOnboardingServiceBaseUrl = `${process.env.REACT_APP_AUTH_SERVICE_URL}`;
export const walletAndAccountServiceBaseUrl = `${process.env.REACT_APP_WALLET_SERVICE_URL}`;

export const getPortfolioEndpoint = portfolioServiceBaseUrlUrl.concat("/portfolio");
export const createPortfolioEndpoint = portfolioServiceBaseUrlUrl.concat("/portfolio/add");
export const getTopMoverByValueEndpoint = utilityServiceBaseUrlUrl.concat("/utils/top-movers?type=value");
export const getTopMoverByVolumeEndpoint = utilityServiceBaseUrlUrl.concat("/utils/top-movers?type=volume");
export const getTopGainersEndpoint = utilityServiceBaseUrlUrl.concat("/utils/top-gainers");
export const getTopLosersEndpoint = utilityServiceBaseUrlUrl.concat("/utils/top-losers");
export const getNewsEndpoint = utilityServiceBaseUrlUrl.concat("/utils/news");
export const loginEndpoint = authOnboardingServiceBaseUrl.concat("/api/login");
export const getStocksEndpoint = stockTradingServiceBaseUrlUrl.concat("/stock");
export const getUtilitiesEndpoint = utilityServiceBaseUrlUrl.concat("/utils");