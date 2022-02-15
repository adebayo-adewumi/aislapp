import React, { useState } from 'react';
import Main from './containers/Main';
//import { getToken } from "./firebase"
import { onMessageListener } from "../public/firebase-message-sw";

const App = () => {
  // const [isTokenFound, setTokenFound] = useState(false);
  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({ title: '', body: '' });

  //getToken(setTokenFound);
  // onMessageListener().then(payload => {
  //   setShow(true);
  //   setNotification({ title: payload.notification.title, body: payload.notification.body })
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));
  return (
    <>
      <Main />
    </>
  );
}

export default App;
