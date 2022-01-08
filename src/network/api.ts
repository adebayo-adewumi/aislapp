import { IExchangeTokenResp, IGetUserResponse } from '../interfaces/auth';

import { requestMaker } from './request';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const VALIANT_BASE_URL = process.env.REACT_APP_VALIANT_BASE_URL;
// AUTHENTICATION
const EXCHANGE_TOKEN = BASE_URL + '/auth/exchange';
const USER = BASE_URL + '/users';
const GET_AUTH_KEY = VALIANT_BASE_URL + '/user/secret';

function exchangeToken(token: string, key: string | null): Promise<IExchangeTokenResp> {
  return requestMaker({
    headers: { 'x-access-token': token, 'x-gate': key },
    type: 'GET',
    route: EXCHANGE_TOKEN,
  });
}

function getAuthenticatedUser(): Promise<IGetUserResponse> {
  return requestMaker({
    type: 'GET',
    route: USER + `/auth/user`,
    isSecure: true,
  });
}

function getAuthKey(): Promise<any> {
  return requestMaker({
    type: 'GET',
    route: GET_AUTH_KEY,
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5UZG1aak00WkRrM05qWTBZemM1TW1abU9EZ3dNVEUzTVdZd05ERTVNV1JsWkRnNE56YzRaQT09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiUHJvamVjdFZhbGlhbnQiLCJpZCI6MiwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9wdWJzdG9yZS1hcHBzLnZmZGJhbmsuc3lzdGVtczo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJVbmxpbWl0ZWQiOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlByb2plY3RWYWxpYW50IiwiY29udGV4dCI6IlwvdmFsaWFudCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiY29uc3VtZXJLZXkiOiJwZHpuVWxHMXE1amowSkJPVkVLY2M4bUQ5aElhIiwiZXhwIjozNzYwOTU3MTU5LCJpYXQiOjE2MTM0NzM1MTIsImp0aSI6ImI5NzA5ZDc0LTEyMWYtNDA1MC1hMmJhLTJjMjVmZjJmYTMwOCJ9.DynJEdiZy_moJc6cRkZmVFLUtXZ1Hl3_G36jk1KkxQ7yKWm0S_oGAe0uBtV2_6e8fpkBa4-u3VsoMbc4zPjDRjZzD9lGgLXaI94HPnN5XiXUWVtdaiH_RCG0GkT-r9sgIaS_TMYg12e_AzCkrNRg-SaBgcL2QuSkAQRX02GAEzoT_U3PIC91eV1rIqqEmsWgT3UOnO1Vr4uLtPAsLAhcj9ERWQyR3i2-ADLYYIkdhYjKM5242-5Ob7ekp8ZOh7Uy_hniM431L6eL3-3SjaU90_OgNDzcSNYACKWBDZUvaKkxDzmJtrGNqFaCBgDsScfql_tooh03vqKuuAHxHw3JpA',
    },
    isSecure: false,
  });
}

const exportObject = {
  exchangeToken,
  getAuthenticatedUser,
  getAuthKey
};

export default exportObject;
