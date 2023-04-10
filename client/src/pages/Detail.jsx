import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {
  Card,
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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format, getHours, isToday, setHours } from 'date-fns';

const theme = createTheme();

export default function Detail(props) {
  const [service, setService] = React.useState();
  const [booking, setBooking] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const [client, setClient] = useState();
  const [open, setOpen] = React.useState(false);
  const today = new Date();
  const [slot, setSlot] = React.useState([
    {
      start: setHours(today, 9).toISOString(),
      end: setHours(today, 10).toISOString(),
      booked: false,
    }, // booked is button disabled
    {
      start: setHours(today, 10).toISOString(),
      end: setHours(today, 11).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 11).toISOString(),
      end: setHours(today, 12).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 12).toISOString(),
      end: setHours(today, 13).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 13).toISOString(),
      end: setHours(today, 14).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 14).toISOString(),
      end: setHours(today, 15).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 15).toISOString(),
      end: setHours(today, 16).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 16).toISOString(),
      end: setHours(today, 17).toISOString(),
      booked: false,
    },
    {
      start: setHours(today, 17).toISOString(),
      end: setHours(today, 18).toISOString(),
      booked: false,
    },
  ]);
  const [index, setIndex] = React.useState(null);

  //service provider ID
  const serviceProviderId = props.serviceid;

  //get the service data id to identify service
  const params = useParams();
  const bookingStatus = 'accepted';

  //get client data to associate to booking
  const user = localStorage.getItem('usersinfo');
  const formattedUser = JSON.parse(user);
  const id = formattedUser.data.id;

  const updateAvailableSlots = (bookings) => {

    const updatedSlots = [];
    for (let i = 0; i < slot.length; i++) {
      let foundOne = false;
      const currentSlot = slot[i];
      for (let j = 0; j < bookings.length; j++) {
        const booking = bookings[j];
        const isTod = isToday(new Date(), booking.start_time);
        const bookingHour = getHours(new Date(booking.start_time));
        const slotHour = getHours(new Date(currentSlot.start));

        foundOne = bookingHour === slotHour && isTod;
        if (foundOne) {
          break;
        }
      }
      updatedSlots.push({ ...currentSlot, booked: foundOne });
    }

    setSlot(updatedSlots);
  };

  useEffect(() => {
    // get service data to append to booking
    axios({
      method: 'get',
      url: `/api/services/${params.id}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }).then((response) => {
      setService(response.data);
    });
  }, [params.id]);

  React.useEffect(() => {
    if (!service) {
      return;
    }
    // get booking data to append to page
    axios({
      method: 'get',
      url: `/api/bookings/provider/${service.user_id}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }).then((response) => {
      setBooking(response.data);
      // update slots with response.data(booking)
      updateAvailableSlots(response.data);
    });
  }, [service]);

  //create booking
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
        // id: client.id,
        id: id,
        title: service.title,
        services_id: service.id,
        start: time[0],
        end: time[1],
        status: bookingStatus,
      };

      let response = await axios({
        method: 'post',
        url: `/api/bookings/new`,
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        withCredentials: true,
      });

      setBooking(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // Modal

  // this is a {buttons} control
  const buttons = slot.map((slot, index) => {
    return (
      <Grid item xs={10}>
        <Link style={{ textDecoration: 'Not available' }}>
          <Button
            variant="contained"
            sx={{ width: 1 }}
            key={index}
            value={[slot.start, slot.end]}
            disabled={slot.booked}
            onClick={(event) => {
              handleClickOpen(index);
              setTime([slot.start, slot.end]);
            }}
          >
            {slot.booked
              ? 'Booked'
              : `${format(new Date(slot.start), 'ha')} - ${format(
                  new Date(slot.end),
                  'ha'
                )}`}
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

  // category image

  const [pic, setPic] = React.useState([
    {
      category: 'Carpentry',
      url: '/images/carpentry.jpg',
    },
    {
      category: 'Plumbing',
      url: '/images/plumbing.jpg',
    },
    {
      category: 'Education',
      url: '/images/education.jpg',
    },
    {
      category: 'Cleaning',
      url: '/images/cleaning.jpg',
    },
    {
      category: 'Gardening',
      url: '/images/gardening.jpg',
    },
    {
      category: 'Construction',
      url: '/images/construction.jpg',
    },
    {
      category: 'Translation',
      url: '/images/translation.jpg',
    },
    {
      category: 'Delivery',
      url: '/images/delivery.jpg',
    },
    {
      category: 'Babysitter',
      url: '/images/babysitter.jpg',
    },
    {
      category: 'Repair',
      url: '/images/repair.jpg',
    },
  ]);
  const categoryimg = pic.map((pic) => {
    return service && pic.category === service.category ? (
      <CardMedia
        component="img"
        sx={{ width: 1 }}
        image={pic.url}
        alt={pic.category}
      />
    ) : (
      ''
    );
  });
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
                {categoryimg}
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
                    Avavilable Time Slots
                  </Typography>
                </CardContent>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  {buttons}
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
            {service ? `Please confirm` : ''}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {service
                ? `You're booking ${service.title}, at $${service.fee}/hr`
                : ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={submitBooking}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Helper
        </Typography>
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
