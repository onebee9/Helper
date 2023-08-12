import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Card,
  CardContent,
  Box,
  Typography,
  Container,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileServiceProvider from './ProfileServiceProvider';
import ProfileNav from '../components/Navbar/ProfileNav';

const theme = createTheme();

export default function ServiceBooking(props) {
  const [userStatus, setUserStatus] = useState({});
  const [serviceBookings, setServiceBookings] = useState([]);

  useEffect(() => {
    //retrive data from storage
    const userinfo = localStorage.getItem('usersinfo');
    const user = JSON.parse(userinfo);

    setUserStatus(user);

    //fetch bookings
    const userId = user.data.id;
    axios({
      method: 'get',
      url: `/api/users/${userId}/service-bookings`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    })
      .then((response) => {
        setServiceBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    alt={`${userStatus?.data?.first_name} ${userStatus?.data?.last_name}`}
                    src={`/images/phototest${userStatus?.data?.id}.jpg`}
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
                <ProfileNav />
              </Card>
            </Container>
          </Grid>

          <Grid container xs={8} spacing={2}>
            {serviceBookings.map((booking) => (
              <ProfileServiceProvider key={booking.booking_id} data={booking} />
            ))}
          </Grid>
        </Grid>
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
         We're here to help!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
