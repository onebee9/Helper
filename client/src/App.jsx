import * as React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignupService from './pages/SignupService';
import SignupClient from './pages/SignupClient';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import ProfileService from './pages/ProfileService';
import ProfileServiceEdit from './pages/ProfileServiceEdit';
import ProfileServiceCreate from './pages/ProfileServiceCreate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from './providers/AuthProvider';
import {useState, useEffect} from "react"; 

function App() {
  const { auth, user, userStatus, login, logout } = useContext(authContext);
  // console.log("context",auth, user, userStatus, login, logout)
  const [userObject, setUserObject] = useState({}); 
  useEffect (()=>{
    const user = localStorage.getItem("usersinfo")
  setUserObject(JSON.parse(user))
  },[])

  const currentUser = userObject.data && userObject.data
  console.log("currnetUser", currentUser) 
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" /> */}
        <Route index element={<Home />} />
        <Route
          path="Login"
          element={
            <Login
              auth={auth}
              user={user}
              userStatus={userStatus}
              login={login}
              logout={logout}
            />
          }
        />
        {/* {!auth && <Route index element={<Login />} />} */}
        {/* {auth && <Route index element={<Home />} />} */}
        <Route
          path="SignupService"
          element={
            <SignupService
              auth={auth}
              user={user}
              userStatus={userStatus}
              login={login}
              logout={logout}
            />
          }
        />
        <Route path="SignupClient" element={<SignupClient />} />
        <Route path="Detail/:id" element={<Detail />} />
        <Route
          path="Profile"
          element={
            <Profile auth={auth} user={user} login={login} logout={logout} />
          }
        />
        <Route path="ProfileEdit" element={<ProfileEdit />} />
        <Route path="ProfileService" element={<ProfileService user={currentUser} />} />
        <Route path="ProfileServiceEdit" element={<ProfileServiceEdit />} />
        <Route path="ProfileServiceCreate" element={<ProfileServiceCreate user={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
