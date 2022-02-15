import React  from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { encryptData } from './lib/encryptionHelper';
import { generalEncKey } from './common/constants/globals';
import { authOnboardingServiceBaseUrl } from './apiUrls';

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response.status === 401){
      let requestData = {
        "customerId" : localStorage.getItem("aislUserCustomerId"),
        "refreshToken" : localStorage.getItem("aislUserRefreshToken"),
      }

      let refreshTokenCypher = encryptData(Buffer.from(generalEncKey).toString('base64'), JSON.stringify(requestData));
      localStorage.setItem('refreshTokenCypher', refreshTokenCypher);

      if(localStorage.getItem('refreshTokenCypher')){
        
        axios.post(authOnboardingServiceBaseUrl+'/api/refresh/token', 
        {
          "text" : localStorage.getItem('refreshTokenCypher')
        })
        .then(function (response) {
          localStorage.setItem('aislUserToken', response.data.data.token);
          localStorage.setItem('aislUserRefreshToken', response.data.data.refreshToken);
        })
        .catch(function (error) {
          window.location.href = "/";
        });
    }
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();