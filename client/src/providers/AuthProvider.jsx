import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

export const authContext = createContext();

export default function AuthProvider(props) {
  // const [userStatus, setStatus] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  
  const login = function (email, password) {
    setAuth(true);
    // const id = '1234-1234-1234'; // Some random userId
    setUser({ email, password });
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  // authContext will expose these items
  const userData = { auth, user, login, logout };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}
