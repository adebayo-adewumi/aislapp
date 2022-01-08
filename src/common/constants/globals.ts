export const developmentMode = true;

export const tokenExpTime = developmentMode ? 300000 : 1800000;
export const refreshTokenExpTime = developmentMode ? 1200000 : 43200000;

export const ENVIRONMENTS = {
  PROD: 'PROD',
  TEST: 'TEST',
};

export const FLUTTER_WAVE_PUBLIC_KEY = developmentMode
  ? 'FLWPUBK_TEST-30f1dffbd396ecc4127a7d12e933c95e-X'
  : '';

export const generalEncKey = developmentMode
  ? '0346388f-edcf-48'
  : 'TXktWFaSBm90aW-uLWVuY3J-cb24ta2f';

export let notificationToken = {
  token: '',
  device: '',
};

export let globalVariables = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  clientRefId: '',
  customerAid: '',
  tokenTimeToExpire: 0,
};

export const FILE_SIZE = 2000000;
