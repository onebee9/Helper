import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';

// import Link from '@mui/material/Link';
import { createTheme} from '@mui/material/styles';

import BuyerProfile from './BuyerProfile';
import ServiceProfile from './ServiceProfile';

const theme = createTheme();

export default function Profile(props) {

  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);

  //show date in properformat
  const newDate = userStatus.data && new Date(userStatus.data.created_at);
  const completeDate = newDate && newDate.toDateString();
  const yearFinal = completeDate && completeDate.slice(4);

  const provider = userStatus.data && userStatus.data.isserviceprovider ? 'yes' : 'No';
  const profileType =  provider === 'yes'? (<ServiceProfile userStatus/>) : (<BuyerProfile/>);

  return <>{profileType}</>;
}
