import * as React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignupService from './pages/SignupService';
import SignupClient from './pages/SignupClient';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import ServiceList from './pages/ServiceList';
import ProfileServiceEdit from './pages/ProfileServiceEdit';
import ProfileServiceCreate from './pages/ProfileServiceCreate';
import ProfileServiceBooked from './pages/ProfileServiceBooked';
import ServiceBooking from './pages/ServiceBooking';
import BuyerBooking from './pages/BuyerBooking';
import ServiceBuyerBooking from './pages/ServiceBuyerBooking';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from './providers/AuthProvider';
import { useState, useEffect } from 'react';

function App() {
  const { auth, user, userStatus, login, logout } = useContext(authContext);

  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    if (user) {
      setUserObject(JSON.parse(user));
    }
  }, [user]);

  const currentUser = userObject.data;

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
        <Route
          path="ServiceList"
          element={<ServiceList user={currentUser} />}
        />
        <Route path="ProfileServiceEdit/:id" element={<ProfileServiceEdit />} />

        <Route
          path="ProfileServiceCreate"
          element={<ProfileServiceCreate user={currentUser} />}
        />
        <Route
          path="ProfileServiceBooked"
          element={<ProfileServiceBooked user={currentUser} />}
        />
        <Route
          path="ServiceBooking"
          element={<ServiceBooking user={currentUser} />}
        />
        <Route
          path="BuyerBooking"
          element={<BuyerBooking user={currentUser} />}
        />
        <Route
          path="ServiceBuyerBooking"
          element={<ServiceBuyerBooking user={currentUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
