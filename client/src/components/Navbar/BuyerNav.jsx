import * as React from 'react';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function BuyerNav(props) {
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
          to="/BuyerBooking"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="My Bookings" />
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
