import { isNullOrUndefined } from "../common/Utilities";

export const formatCurrencyWithDecimal = (amount: number) => {
  // @ts-ignore
  if (amount === 0 || isNullOrUndefined(amount)) {
    return "0";
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  let removeNGN = formatter.format(amount);
  let formattedAmount = removeNGN.replace('NGN', '').trim();
  return formattedAmount;
};

export const addOverflowAndPaddingToModalBody = () => {
  // @ts-ignore
  let bdy = document.querySelector("body") as HTMLBodyElement;
  bdy.style.overflow = "hidden";
  bdy.style.paddingRight = "17px";
};

export const removeOverflowAndPaddingFromModalBody = () => {
  // @ts-ignore
  let bdy = document.querySelector("body") as HTMLBodyElement;
  bdy.style.overflow = "";
  bdy.style.paddingRight = "";
};
export const getCustomerInfo = () => {
  // @ts-ignore
  let customer = JSON.parse(localStorage.getItem('aislCustomerInfo') as string);

  return customer;
};
export const generateRandomString = (stringLength: number) => {
  // @ts-ignore
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// export const creditCardInputMask = () => {

//   // @ts-ignore
//   let ccNumberInput :Element | null = document.querySelector('.cc-number-input');
//   let ccExpiryInput :Element | null = document.querySelector('.cc-expiry-input');
//   let ccCVVInput :Element | null = document.querySelector('.cc-cvv-input');

//   let ccNumberPattern :RegExp = /^\d{0,16}$/g;
//   let ccNumberSeparator :string = " ";
//   let ccNumberInputOldValue :any;
//   let ccNumberInputOldCursor :any;

//   let ccExpiryPattern :RegExp = /^\d{0,4}$/g;
//   let ccExpirySeparator :string = "/";
//   let ccExpiryInputOldValue :any;
//   let ccExpiryInputOldCursor :any = '';  

//   let ccCVVPattern :RegExp = /^\d{0,3}$/g;
//   let ccCVVInputOldValue :any;
//   let ccCVVInputOldCursor :any = '';

//   let mask = (value :any, limit :any, separator :any) => {
//     let output = [];

//     for (let i = 0; i < value.length; i++) {

//       if ( i !== 0 && i % limit === 0) {
//         output.push(separator);
//       }

//       output.push(value[i]);
//     }

//     return output.join("");
//   };

//   let unmask = (value :any) => {
//     return value.replace(/[^\d.]/g, '');
//   }

//   let checkSeparator = (position :any, interval :any) => {
//     return Math.floor(position / (interval + 1));
//   }

//   //Number Handler
//   let ccNumberInputKeyDownHandler = (e :any) => {
//     let el = e.target;

//     ccNumberInputOldValue = el.value;

//     ccNumberInputOldCursor = el.selectionEnd;
//   };

//   let ccNumberInputHandler = (e :any) => {
//     let el = e.target;
//     let newValue = unmask(el.value);
//     let newCursorPosition;

//     if ( newValue.match(ccNumberPattern) ) {
//       newValue = mask(newValue, 4, ccNumberSeparator);

//       newCursorPosition = 
//         ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) + 
//         checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) + 
//         (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

//       el.value = (newValue !== "") ? newValue : "";
//     } 
//     else {
//       el.value = ccNumberInputOldValue;
//       newCursorPosition = ccNumberInputOldCursor;
//     }

//     el.setSelectionRange(newCursorPosition, newCursorPosition);

//     highlightCC(el.value);
//   };

//   //Expiry Handler
//   let ccExpiryInputKeyDownHandler = (e :any) => {
//     let el = e.target;

//     ccExpiryInputOldValue = el.value;

//     ccExpiryInputOldCursor = el.selectionEnd;
//   };

//   let ccExpiryInputHandler = (e :any) => {
//     let el = e.target;
//     let newValue = el.value;

//     newValue = unmask(newValue);

//     if ( newValue.match(ccExpiryPattern) ) {
//       newValue = mask(newValue, 2, ccExpirySeparator);
//       el.value = newValue;
//     } 
//     else {
//       el.value = ccExpiryInputOldValue;
//     }
//   };


//   //CVV Handler
//   let ccCVVInputKeyDownHandler = (e :any) => {
//     let el = e.target;

//     ccCVVInputOldValue = el.value;

//     ccCVVInputOldCursor = el.selectionEnd;
//   };

//   let ccCVVInputHandler = (e :any) => {
//     let el = e.target;
//     let newValue = el.value;

//     newValue = unmask(newValue);

//     if ( newValue.match(ccCVVPattern) ) {
//       el.value = newValue;
//     } 
//     else {
//       el.value = ccCVVInputOldValue;
//     }
//   };

//   // ccNumberInput?.addEventListener('keydown', ccNumberInputKeyDownHandler);
//   // ccNumberInput?.addEventListener('input', ccNumberInputHandler);

//   // ccExpiryInput?.addEventListener('keydown', ccExpiryInputKeyDownHandler);
//   // ccExpiryInput?.addEventListener('input', ccExpiryInputHandler);

//   // ccCVVInput?.addEventListener('keydown', ccCVVInputKeyDownHandler);
//   // ccCVVInput?.addEventListener('input', ccCVVInputHandler);
// };

export const maskCreditCardInput = (value: any, limit: any, separator: any) => {
  let output = [];

  for (let i = 0; i < value.length; i++) {

    if (i !== 0 && i % limit === 0) {
      output.push(separator);
    }

    output.push(value[i]);
  }

  return output.join("");
};

export const unmaskCreditCardInput = (value: any) => {
  return value.replace(/[^\d]/g, '');
}

export const showCreditCardTypeBasedOnCardNumber = (ccValue: any) => {
  let ccCardType = '';

  let ccCardTypePatterns: any = {
    amex: /^3/,
    visa: /^4/,
    mastercard: /^5/,
    disc: /^6/,
    generic: /(^1|^2|^7|^8|^9|^0)/,
  };

  for (const cardType in ccCardTypePatterns) {
    if (ccCardTypePatterns[cardType].test(ccValue)) {
      ccCardType = cardType;
      break;
    }
  }

  let activeCC = document.querySelector('.cc-types__img--active');

  let newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

  if (activeCC) {
    activeCC.classList.remove('cc-types__img--active');
    activeCC.classList.add('hidden');
  }

  if (newActiveCC) {
    newActiveCC.classList.add('cc-types__img--active');
    newActiveCC.classList.remove('hidden');
  }
};

// export const creditCardNumberInputMask = (event :any) =>{
//   let ccNumberPattern :RegExp = /^\d{0,16}$/g;
//   let ccNumberSeparator :string = " ";
//   let ccNumberInputOldValue :any;
//   let ccNumberInputOldCursor :any;

//   let checkSeparator = (position :any, interval :any) => {
//     return Math.floor(position / (interval + 1));
//   }
// }


//Number Handler
export const ccNumberInputKeyDownHandler = (e: any) => {
  let el = e.target;

  let ccNumberInputOldValue = el.value;

  let ccNumberInputOldCursor = el.selectionEnd;
};

export const ccNumberInputHandler = (e: any) => {
  let ccNumberPattern: RegExp = /^\d{0,16}$/g;
  let ccNumberSeparator: string = " ";
  let ccNumberInputOldValue: any = '';
  let ccNumberInputOldCursor: any = '';

  let el = e.target;
  let newValue = unmaskCreditCardInput(el.value);
  let newCursorPosition: any = '';

  let checkSeparator = (position: any, interval: any) => {
    return Math.floor(position / (interval + 1));
  }

  if (newValue.match(ccNumberPattern)) {
    newValue = maskCreditCardInput(newValue, 4, ccNumberSeparator);

    newCursorPosition =
      ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) +
      checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) +
      (unmaskCreditCardInput(newValue).length - unmaskCreditCardInput(ccNumberInputOldValue).length);

    el.value = (newValue !== "") ? newValue : "";
  }
  else {
    el.value = ccNumberInputOldValue;
    newCursorPosition = ccNumberInputOldCursor;
  }

  el.setSelectionRange(newCursorPosition, newCursorPosition);

  showCreditCardTypeBasedOnCardNumber(el.value);
};

//Expiry Handler
export const ccExpiryInputKeyDownHandler = (e: any) => {
  let el = e.target;

  let ccExpiryInputOldValue: any = el.value;

  let ccExpiryInputOldCursor: any = el.selectionEnd;
};

export const ccExpiryInputHandler = (e: any) => {
  let el = e.target;
  let newValue = el.value;

  let ccExpiryPattern: RegExp = /^[0-9]+$/i;
  let ccExpirySeparator: string = "/";
  let ccExpiryInputOldValue: any = '';

  newValue = unmaskCreditCardInput(newValue);

  if (newValue.match(ccExpiryPattern)) {
    newValue = maskCreditCardInput(newValue, 2, ccExpirySeparator);
    el.value = newValue;

    return el.value;
  }
  else {
    return el.value = ccExpiryInputOldValue;
  }

};

//CVV Handler
export const ccCVVInputKeyDownHandler = (e: any) => {
  let el = e.target;

  let ccCVVInputOldValue = el.value;

  let ccCVVInputOldCursor = el.selectionEnd;
};

export const ccCVVInputHandler = (e: any) => {
  let el = e.target;
  let newValue = el.value;

  let ccCVVPattern: RegExp = /^\d{0,3}$/g;
  let ccCVVInputOldValue: any = '';

  newValue = unmaskCreditCardInput(newValue);

  if (newValue.match(ccCVVPattern)) {
    return el.value = newValue;
  }
  else {
    return el.value = ccCVVInputOldValue;
  }
};
