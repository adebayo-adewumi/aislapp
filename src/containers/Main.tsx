import { AuthProvider } from '../contexts/authContext';
import { GlobalProvider } from '../contexts/globalContext';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Forgot from '../pages/auth/forgot';
import Reset from '../pages/auth/reset';
import Dashboard from '../pages/dashboard';
import { ToastProvider } from 'react-toast-notifications';
import Portfolio from '../pages/portfolio';
import PortfolioDetails from '../pages/portfolio/details';
import Trade from '../pages/trade';
import Stock from '../pages/stock';
import StockNews from '../pages/stock/news';
import Watchlist from '../pages/watchlist';
import Account from '../pages/account';
import FundAccount from '../pages/account/fund';
import WithdrawFund from '../pages/account/withdraw';
import TradeConfirmations from '../pages/account/trade-confirmations';
import Statement from '../pages/account/statement';
import BankCard from '../pages/account/bank-card';

const Main = () => {

  return (
    <ToastProvider>
      <GlobalProvider>
        <AuthProvider>
          <div className="">
            <main className="">
              <Suspense fallback="loading">
                <BrowserRouter>
                  <Routes>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot" element={<Forgot />} />
                    <Route path="reset" element={<Reset />} />
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
                        <Statement />
                    } />
                    <Route path="account/bank-card" element={
                      <RequireAuth>
                        <BankCard />
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
  let location = useLocation();

  let isAuthenticated = localStorage.getItem('aislUserIsAuthenticated');

  if (isAuthenticated != 'true' ) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default Main;

