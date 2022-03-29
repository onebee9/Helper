import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import ProfileService from './ProfileService';

import {
  Card,
  CardContent,
  Box,
  Typography,
  Container,
  Avatar,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import BuyerNav from '../components/Navbar/BuyerNav';

const theme = createTheme();

export default function BuyerBooking(props) {
  const [userStatus, setUserStatus] = useState({});
  const [clientBookings, setClientBookings] = useState([]);

  useEffect(() => {
    //retrive data from storage
    const userinfo = localStorage.getItem('usersinfo');
    const user = JSON.parse(userinfo);

    setUserStatus(user);

    //fetch bookings
    const userID = user.data.id;
    axios({
      method: 'get',
      url: `/api/bookings/${userID}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    })
      .then((response) => {
        setClientBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                <BuyerNav />
              </Card>
            </Container>
          </Grid>

          <Grid container xs={8} spacing={2}>
            {clientBookings.map((booking) => (
              <ProfileService key={booking.booking_id} data={booking} />
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
          We Help You!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
