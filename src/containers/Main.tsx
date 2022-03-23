import { AuthProvider } from '../contexts/authContext';
import { GlobalProvider } from '../contexts/globalContext';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; //Navigate, useLocation 
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Forgot from '../pages/auth/forgot';
import ForgotPin from '../pages/auth/forgot-pin';
import Reset from '../pages/auth/reset';
import ResetPin from '../pages/auth/reset-pin';
import Dashboard from '../pages/dashboard';
import { ToastProvider } from 'react-toast-notifications';
import Portfolio from '../pages/portfolio';
import PortfolioDetails from '../pages/portfolio/details';
import Trade from '../pages/trade';
import Stock from '../pages/stock';
import StockNews from '../pages/news/details';
import Watchlist from '../pages/watchlist';
import Account from '../pages/account';
import FundAccount from '../pages/account/fund';
import WithdrawFund from '../pages/account/withdraw';
import TradeConfirmations from '../pages/account/trade-confirmations';
import Statement from '../pages/account/statement';
import BankCard from '../pages/account/bank-card';
import QuickSearch from '../pages/search/quick';
import Profile from '../pages/profile';
import Learn from '../pages/learn';
import News from '../pages/news';
import NewsDetails from '../pages/news/details';
import Chat from '../pages/chat';
import AdminCreateResource from '../pages/admin/create-resource';
import AdminLearnResources from '../pages/admin/resource';

const Main = () => {

  return (
    <ToastProvider>
      <GlobalProvider>
        <AuthProvider>
          <div className="">
            <main className="">
              <Suspense fallback="loading">
                <BrowserRouter basename={process.env.PUBLIC_URL} >
                  <Routes>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot" element={<Forgot />} />
                    <Route path="forgot-pin" element={<ForgotPin />} />
                    <Route path="reset" element={<Reset />} />
                    <Route path="reset-pin" element={<ResetPin />} />
                    <Route path="dashboard" element={
                      <RequireAuth>
                        <Dashboard />
                      </RequireAuth>
                    } />
                    <Route path="portfolio" element={ 
                      <RequireAuth> 
                        <Portfolio />
                      </RequireAuth>
                    } />
                    <Route path="portfolio/details/:portfolioId" element={
                      <RequireAuth>
                        <PortfolioDetails />
                      </RequireAuth>
                    } />
                    <Route path="trade" element={
                      <RequireAuth>
                        <Trade />
                      </RequireAuth>
                    } />
                    <Route path="stock" element={
                      <RequireAuth>
                        <Stock />
                      </RequireAuth>
                    } />
                    <Route path="stock/news" element={
                      <RequireAuth>
                        <StockNews />
                      </RequireAuth>
                    } />
                    <Route path="watchlist" element={
                      <RequireAuth>
                        <Watchlist />
                      </RequireAuth>
                    } />
                    <Route path="account" element={
                      <RequireAuth>
                        <Account />
                      </RequireAuth>
                    } />
                    <Route path="account/fund" element={
                      <RequireAuth>
                        <FundAccount />
                      </RequireAuth>
                    } />
                    <Route path="account/withdraw" element={
                      <RequireAuth>
                        <WithdrawFund />
                      </RequireAuth> 
                    } />
                    <Route path="account/trade-confirmations" element={
                      <RequireAuth>
                        <TradeConfirmations />
                      </RequireAuth>    
                    } />
                    <Route path="account/statement" element={
                      <RequireAuth>
                        <Statement />
                      </RequireAuth>
                    } />
                    <Route path="account/bank-card" element={
                      <RequireAuth>
                        <BankCard />
                      </RequireAuth>
                    } />
                    <Route path="search/quick" element={
                      <RequireAuth>
                        <QuickSearch />
                      </RequireAuth>
                    } />
                    <Route path="profile" element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    } />
                    <Route path="learn" element={
                      <RequireAuth>
                        <Learn />
                      </RequireAuth>
                    } />
                    <Route path="news" element={
                      <RequireAuth>
                        <News />
                      </RequireAuth>
                    } />
                    <Route path="news/details" element={
                      <RequireAuth>
                        <NewsDetails />
                      </RequireAuth>
                    } />
                    <Route path="chat" element={
                        <Chat />
                    } />
                    <Route path="admin/learn/create" element={
                      <RequireAuth>
                        <AdminCreateResource />
                      </RequireAuth>
                    } />
                    <Route path="admin/learn/resources" element={
                      <RequireAuth>
                        <AdminLearnResources />
                      </RequireAuth>
                    } />
                  </Routes>
                </BrowserRouter>
              </Suspense>
            </main>
          </div>
        </AuthProvider>
      </GlobalProvider>
    </ToastProvider>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {

  let isAuthenticated = localStorage.getItem('aislUserIsAuthenticated');

  if (isAuthenticated !== 'true' ) {
    window.location.href = "/";
  }

  return children;
}

export default Main;

