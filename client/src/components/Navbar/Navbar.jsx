import * as React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Toolbar, Button, Typography, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';


import { useContext } from 'react';
import { authContext } from './../../providers/AuthProvider';

function Navbar(props) {
  const { auth, user} = useContext(authContext);
  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);

  const logout = () => {
    localStorage.removeItem('usersinfo');
    this.authToken = null;
    this.user = null;
  };

  return (
    <React.Fragment>
      {!auth && (
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flex: 1 }}
          >
            <Link
              to="/"
              component={RouterLink}
              style={{ textDecoration: 'none' }}
            >
              Helper
            </Link>
          </Typography>

          <Link
            to="/Login"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Login</Button>
          </Link>

          <Link
            to="/SignupService"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Signup Service</Button>
          </Link>

          <Link
            to="/SignupClient"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Signup Client</Button>
          </Link>
        </Toolbar>
      )}
      {auth && (
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flex: 1 }}
          >
            <Link
              to="/"
              component={RouterLink}
              style={{ textDecoration: 'none' }}
            >
              Helper
            </Link>
          </Typography>

          <Link
            to="/Profile"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Profile</Button>
          </Link>

          <Link
            to="/"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
            onClick={logout}
          >
            <Button size="small">Logout</Button>
          </Link>

          <Avatar
            alt={
              userStatus.data
                ? `${userStatus.data.first_name} ${userStatus.data.last_name}`
                : ''
            }
            src={
              userStatus.data
                ? `/images/phototest${userStatus.data.id}.jpg`
                : ''
            }
          />
        </Toolbar>
      )}
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      ></Toolbar>
    </React.Fragment>
  );
}

export default Navbar;
