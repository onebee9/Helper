import * as React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Button, Typography, Avatar } from '@mui/material';
import { useContext } from 'react';
import { authContext } from './../../providers/AuthProvider';

function Navbar(props) {
  const { auth } = useContext(authContext);
  console.log(auth);
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
            Helper
          </Typography>

          <Link to="Login" style={{ textDecoration: 'none' }}>
            <Button size="small">Login</Button>
          </Link>

          <Link to="SignupService" style={{ textDecoration: 'none' }}>
            <Button size="small">Signup Service</Button>
          </Link>

          <Link to="SignupClient" style={{ textDecoration: 'none' }}>
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
            Helper
          </Typography>

          <Link to="Login" style={{ textDecoration: 'none' }}>
            <Button size="small">Logout</Button>
          </Link>
          <Link to="Profile" style={{ textDecoration: 'none' }}>
            <Button size="small">Profile</Button>
          </Link>

          <Avatar
            alt="Remy Sharp"
            src="https://htmlstream.com/preview/front-dashboard-v2.0/assets/img/160x160/img6.jpg"
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
