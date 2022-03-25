import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

export const authContext = createContext();

export default function AuthProvider(props) {
  // const [userStatus, setStatus] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // const [state, setState] = useState({
  //   users: {},
  // });
  // const setUsers = (users) => {
  //   return setState({ ...state, users });
  // };
  // useEffect(() => {
  //   const usersURL = `http://localhost:8080/users/login`;
  //   Promise.all([axios.get(usersURL)]).then((all) => {
  //     console.log('New++++++++++++++', all);
  //     setState((prev) => ({
  //       ...prev,
  //       users: all[0].data, // http://localhost:8080/users/login
  //     }));
  //   });
  // }, []);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // Perform login process for the user & save authID, etc
  // async function userLogin() {
  //   try {
  //     let data = {
  //       email: email,
  //       password: password,
  //     };
  //     let response = await axios({
  //       method: 'post',
  //       url: `http://localhost:8080/users/login`,
  //       headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //       data: qs.stringify(data),
  //       withCredentials: true,
  //     });
  //     // setStatus(response.data);
  //     // localStorage.setItem('usersinfo', JSON.stringify(response.data));
  //     // const obj = response.data.json();
  //     console.log('async------------', data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // userLogin();
  // console.log('json+++++++++++++++', test);
  // console.log('Authdata+++++++++', setStatus);
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
  console.log('Authdata', userData);

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}
