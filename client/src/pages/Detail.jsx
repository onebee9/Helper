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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

 
export default function Detail(props) {
  const [service, setService] = React.useState([]);
  const [booking, setBooking] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const serviceid = props;

  console.log(serviceid);
 

  const start = time[0];
  const end = time[2];
  const bookingStatus = 'accepted';

  const params = useParams();
  console.log(params);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/services/${params.id}`,
      // headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }).then((response) => {
      setService(response.data.services[0]);
      // console.log('Detail+++++++++', response.data.services);
    });
  }, [params.id]);

  const submitBooking = async (event) => {
    setSlot((slots) => {
      return slots.map((slot, i) => {
        if (i === index) {
          return { ...slot, booked: true };
        }
        return slot;
      });
    });
    setOpen(false);
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
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //data: qs.stringify(data),
        data: data,
        withCredentials: true,
      });
      setBooking(response.data);
      console.log('Post Detail++++++++++', response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // Modal
  const [open, setOpen] = React.useState(false);
  const [slot, setSlot] = React.useState([
    { start: '9AM', end: '10AM', booked: false }, // booked is button disabled
    { start: '10AM', end: '11AM', booked: false },
    { start: '11AM', end: '12AM', booked: false },
    { start: '12AM', end: '1PM', booked: false },
    { start: '1PM', end: '2PM', booked: false },
    { start: '2PM', end: '3PM', booked: false },
    { start: '3PM', end: '4PM', booked: false },
    { start: '4PM', end: '5PM', booked: false },
    { start: '5PM', end: '6PM', booked: false },
  ]);
  const [index, setIndex] = React.useState(null);
  // this is a {buttons} control
  const buttons = slot.map((slot, index) => {
    return (
      <Grid item xs={10}>
        <Link style={{ textDecoration: 'Not available' }}>
          <Button
            variant="contained"
            sx={{ width: 1 }}
            value={[slot.start, slot.end]}
            disabled={slot.booked}
            onClick={(event) => {
              handleClickOpen(index);
              setTime(event.target.value);
            }}
          >
            {slot.booked ? 'Not Available' : `${slot.start} - ${slot.end}`}
          </Button>
        </Link>
      </Grid>
    );
  });
  const handleClickOpen = (i) => {
    setOpen(true);
    setIndex(i);
  };

  const handleClose = () => {
    setOpen(false);
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
                  <Typography variant="h5" component="h2">
                    Price : $ {service ? service.fee : ''}
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
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  {buttons} {/* // this is a {buttons} control */}
                  {/* <Grid item xs={10}>
                    <Link to="Booking" style={{ textDecoration: 'none' }}>
                      <Button onClick={submitBooking}>Book</Button>
                    </Link>
                  </Grid> */}
                </Grid>
              </Card>
            </Container>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Thank you for your booking!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for your booking!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={submitBooking}>
              Book
            </Button>
          </DialogActions>
        </Dialog>
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
