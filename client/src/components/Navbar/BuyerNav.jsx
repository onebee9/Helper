import * as React from 'react';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Toolbar, Button, Typography, Avatar } from '@mui/material';
import { useContext } from 'react';
import { authContext } from './../../providers/AuthProvider';

function BuyerNav(props) {
  const { auth } = useContext(authContext);
  // console.log(auth);
  return (
    <nav aria-label="secondary mailbox folders">
      <List>
        <Link
          to="/Profile"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/ProfileEdit"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile Edit" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </nav>
  );
}

export default BuyerNav;
