import * as React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Button, Typography, Avatar } from '@mui/material';
// import Link from '@mui/material/Link';

function Navbar() {
  return (
    <React.Fragment>
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

        <Link to="Detail" style={{ textDecoration: 'none' }}>
          <Button size="small">Detail</Button>
        </Link>

        <Link to="Profile" style={{ textDecoration: 'none' }}>
          <Button size="small">Profile</Button>
        </Link>

        <Link to="ProfileEdit" style={{ textDecoration: 'none' }}>
          <Button size="small">Profile Edit</Button>
        </Link>

        <Link to="ProfileService" style={{ textDecoration: 'none' }}>
          <Button size="small">Profile Service</Button>
        </Link>

        <Link to="ProfileServiceEdit" style={{ textDecoration: 'none' }}>
          <Button size="small">Profile Service Edit</Button>
        </Link>

        <Avatar
          alt="Remy Sharp"
          src="https://htmlstream.com/preview/front-dashboard-v2.0/assets/img/160x160/img6.jpg"
        />
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      ></Toolbar>
    </React.Fragment>
  );
}

export default Navbar;
