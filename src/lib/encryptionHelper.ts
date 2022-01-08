import CryptoJS from 'crypto-js';


export const encryptData = (encKey: string, data: string) => {
  // @ts-ignore
  let keyArr = CryptoJS.enc.Base64.parse(encKey);
  let encOptions = {
    // @ts-ignore
    mode: CryptoJS.mode.ECB,
    // @ts-ignore
    padding: CryptoJS.pad.Pkcs7,
  };
  // @ts-ignore
  let encryptedData = CryptoJS.AES.encrypt(data, keyArr, encOptions);
  return encryptedData.toString() as string;
};