import * as React from 'react';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar(props) {
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
          to="/ServiceBooking"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="My Job" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/ServiceBuyerBooking"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="My Booking" />
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
        <Link
          to="/ServiceList"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Service List" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/ProfileServiceCreate"
          component={RouterLink}
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="New Service" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </nav>
  );
}

export default Navbar;
