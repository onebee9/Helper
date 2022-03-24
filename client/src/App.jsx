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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from './providers/AuthProvider';
function App() {
  const { auth } = useContext(authContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" /> */}
        <Route index element={<Home />} />
        <Route path="Login" element={<Login />} />
        {/* {!auth && <Route index element={<Login />} />} */}
        {/* {auth && <Route index element={<Home />} />} */}
        <Route path="SignupService" element={<SignupService />} />
        <Route path="SignupClient" element={<SignupClient />} />
        <Route path="Detail" element={<Detail />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="ProfileEdit" element={<ProfileEdit />} />
        <Route path="ProfileService" element={<ProfileService />} />
        <Route path="ProfileServiceEdit" element={<ProfileServiceEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
