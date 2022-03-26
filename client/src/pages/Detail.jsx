import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  Container,
  Grid,
  CardMedia,
  Button,
  Link,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Service } from './../components/Service/index';

import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useParams } from 'react-router-dom';
const theme = createTheme();

export default function Detail() {
  const [service, setService] = React.useState([]);
  const [booking, setBooking] = React.useState([]);
  const [time, setTime] = React.useState([]);

  const start = time[0];
  const end = time[2];
  const bookingStatus = 'accepted';

  const params = useParams();

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/services/${params.id}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }).then((response) => {
      setService(response.data.services[0]);
    });
  }, [params.id]);

  const submitBooking = async (event) => {
    event.preventDefault();
    try {
      const data = {
        id: params.id,
        title: service.title,
        services_id: service.services_id,
        start: start,
        end: end,
        status: bookingStatus,
      };

      let response = await axios({
        method: 'post',
        url: `/api/bookings/new`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //data: qs.stringify(data),
        data: data,
        withCredentials: true,
      });
      setBooking(response.data);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Grid container>
          <Grid item xs={8}>
            <Container maxWidth="sm">
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 1 }}
                  image="https://demo.themesberg.com/bootstrap/spaces/assets/img/image-office.jpg"
                  alt="random"
                />
                <Typography>Price : {service ? service.fee : ''}</Typography>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {service ? service.category : ''}
                  </Typography>
                  <Typography>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarTwoToneIcon />
                  </Typography>
                  <Typography>{service ? service.description : ''}</Typography>
                </CardContent>
              </Card>
            </Container>
          </Grid>

          <Grid item xs={4}>
            <Container sx={{ width: 1 }}>
              <Card sx={{ width: 1 }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" color="text.secondary">
                    Booking
                  </Typography>
                </CardContent>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Grid item xs={10}>
                    <Link
                      to="12:00"
                      style={{ textDecoration: 'Not available' }}
                    >
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[9, 10]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 9 + 'AM' + ' - ' + 10 + 'AM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[10, 11]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 10 + 'AM' + ' - ' + 11 + 'AM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[11, 12]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 11 + 'AM' + ' - ' + 12 + 'PM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[12, 1]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 12 + 'PM' + ' - ' + 1 + 'PM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[1, 2]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 1 + 'PM' + ' - ' + 2 + 'PM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[2, 3]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 2 + 'PM' + ' - ' + 3 + 'PM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[3, 4]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 4 + 'PM' + ' - ' + 5 + 'PM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ width: 1 }}
                        value={[4, 5]}
                        onClick={(event) => setTime(event.target.value)}
                      >
                        {service
                          ? 5 + 'PM' + ' - ' + 6 + 'PM'
                          : 'Not available'}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item xs={10}>
                    <Link to="Booking" style={{ textDecoration: 'none' }}>
                      <Button onClick={submitBooking}>Book</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
