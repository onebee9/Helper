import * as React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Toolbar, Button, Typography, Avatar } from '@mui/material';
import { useContext } from 'react';
import { authContext } from './../../providers/AuthProvider';

function Navbar(props) {



    const user = localStorage.getItem('usersinfo');

 
 
  return (
    <React.Fragment>
      {!user  && (
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flex: 1 }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
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
      {user && (
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
            to="/ProfileEdit"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Profile Edit</Button>
          </Link>

          <Link
            to="/ProfileService"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Profile Service</Button>
          </Link>

          <Link
            to="/ProfileServiceEdit"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Profile Service Edit</Button>
          </Link>

          <Link
            to="/ProfileServiceCreate"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">New Service</Button>
          </Link>

          <Link
            to="/ProfileServiceBooked"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
            <Button size="small">Service Booked</Button>
          </Link>

          <Link
            to="/Login"
            component={RouterLink}
            style={{ textDecoration: 'none' }}
          >
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
