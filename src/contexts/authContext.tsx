import * as React from 'react';
import { IAuthState, IExchangeTokenResp, IGetUserResponse } from '../interfaces/auth';
import API from '../network/api';

const CONTEXT_ERROR =
  'Auth context not found. Have you wrapped your components with AuthContext.Consumer?';
type Action = { type: 'SET_PROFILE'; data: {} };

type dispatch = {
  exchangeToken: (toke: string, key: string | null) => Promise<IExchangeTokenResp>;
  getLoginEncryption: () => Promise<any>;
  getAuthUser: () => Promise<IGetUserResponse>;
};

export const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e: string) {
    var t = '';
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function (e: string) {
    var t = '';
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function (e: string) {
    e = e.replace(/\r\n/g, '\n');
    var t = '';
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function (e: string) {
    var t = '';
    var n = 0;
    // @ts-ignore
    var r = (c1 = c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        // @ts-ignore
        c2 = e.charCodeAt(n + 1);
        // @ts-ignore
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        // @ts-ignore
        c2 = e.charCodeAt(n + 1);
        // @ts-ignore
        c3 = e.charCodeAt(n + 2);
        // @ts-ignore
        t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        n += 3;
      }
    }
    return t;
  },
};

const AuthStateContext = React.createContext<IAuthState | undefined>(undefined);

const AuthDispatchContext = React.createContext<dispatch>({
  getLoginEncryption: () => {
    throw new Error(CONTEXT_ERROR);
  },
  exchangeToken: () => {
    throw new Error(CONTEXT_ERROR);
  },
  getAuthUser: () => {
    throw new Error(CONTEXT_ERROR);
  },
});

function reducer(prevState: IAuthState, action: Action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...prevState, profile: action.data };
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    profile: {},
  });

  // actions
  const AuthDispatch = React.useMemo(
    () => ({
      exchangeToken: async (token: string, key: string | null) => {
        const resp = await API.exchangeToken(token, key);
        if (resp && resp.data) {
          dispatch({
            type: 'SET_PROFILE',
            data: resp.data,
          });
        }
        return resp;
      },
      getLoginEncryption: async () => {
        const response = await API.getAuthKey();
        return response;
      },
      getAuthUser: async () => API.getAuthenticatedUser(),
    }),
    []
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={AuthDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState(): IAuthState {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used with a AuthProvider');
  }
  return context;
}

function useAuthDispatch(): dispatch {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used with a AuthProvider');
  }
  return context;
}

export { useAuthDispatch, useAuthState, AuthProvider };
