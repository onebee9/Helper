import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceBooking from '../components/Service/ServiceBooking';

import {
  Card,
  CardContent,
  Box,
  Typography,
  Container,
  Avatar,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileService from './ProfileService';

const theme = createTheme();

export default function Profile(props) {
  const [userStatus, setUserStatus] = useState({});
  const [serviceBookings, setServiceBookings] = useState([]);
 

  useEffect(() => {

    //retrive data from storage 
    const userinfo = localStorage.getItem('usersinfo');
    const user = JSON.parse(userinfo);
   
    setUserStatus(user);

    //fetch bookings
    const userID = user.data.id;
    axios({
      method: 'get',
      url: `/api/bookings/provider/${userID}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }).then((response) => {
      setServiceBookings(response.data.serviceBookings);
      console.log(response.data)

    }).catch((error)=>{
      console.log(error)

    })


  }, []);

  //show date in properformat
  const newDate = userStatus.data && new Date(userStatus.data.created_at);
  const completeDate = newDate && newDate.toDateString();
  const yearFinal = completeDate && completeDate.slice(4);

  const provider =
    userStatus.data && userStatus.data.isserviceprovider ? 'yes' : 'No';

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Grid container>
          <Grid item xs={4}>
            <Container maxWidth="sm">
              <Card sx={{ width: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://htmlstream.com/preview/front-dashboard-v2.0/assets/img/160x160/img6.jpg"
                    sx={{ width: 1 / 2, height: 1 / 2 }}
                  />
                </Box>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" color="text.secondary">
                    {userStatus?.data?.first_name} {userStatus?.data?.last_name}
                  </Typography>
                </CardContent>

                <nav aria-label="secondary mailbox folders">
                  <List>
                    <Link to="Profile" style={{ textDecoration: 'none' }}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link to="Profile Edit" style={{ textDecoration: 'none' }}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile Edit" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link
                      to="Profile Service"
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile Servic" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link
                      to="Profile Service Edit"
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile Service Edit" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </List>
                </nav>
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            <Container maxWidth="sm">
              <TableContainer component={Paper}>
                <Table sx={{ width: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                        Profile
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Name : {userStatus?.data?.first_name}{' '}
                        {userStatus?.data?.last_name}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Email : {userStatus?.data?.email}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {' '}
                        Member from : {yearFinal}{' '}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Is Service Prvide : {provider}{' '}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </Grid>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {serviceBookings.map((booking) => (
              <Grid item key={booking.booking_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    flexDirection: 'column',
                  }}
                >
                  <ProfileService data={booking} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          We Help You!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
