import * as React from 'react';
import {
  CardContent,
  Box,
  Typography,
  Container,
  Grid,
  Button,
  CardActions,
  Link,
  Rating
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import qs from 'qs';
import { useState,useEffect } from 'react';

export default function ProfileService(props) {
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newResponse = await axios({
        method: 'delete',
        url: `/api/services/${props.id}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = (event) => {
    event.preventDefault();

    const data = {
      name: props.data.description,
      unit_amount: props.data.fee,
      link: window.location.href,
      bookingId: props.data.booking_id,
    };

    axios({
      method: 'post',
      url: `/payment`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      withCredentials: true,
    })
      .then((response) => {
        window.open(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

   //only trigger if rating state changed
   useEffect(() => {

    const data = {
      bookingId: props.data.booking_id,
      rating: rating
    };

    axios({
      method: 'put',
      url: `api/bookings/ratings`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(rating),
      withCredentials: true,
    })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });

  }, [rating]);

  useEffect (()=>{
    const data = {
      bookingId: props.data.booking_id,
      rating: rating,
      serviceId: props.data.services_id
    }
    axios({
      method: 'get',
      url: `/api/services/${data.services_id}/rating`, 
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    })
      .then((response) => {
        setRating(response.data.rating);
      })
      .catch((error) => {
        console.log(error);
      });

  },[rating])

console.log(props)
  // category image
  const [pic] = React.useState([
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
    return pic.category === props.data.category ? (
      <Box
        component="img"
        sx={{
          height: 1,
          width: 1 / 4,
        }}
        key={pic}
        alt={pic.category}
        src={pic.url}
      />
    ) : (
      ''
    );
  });
  const cardActions =
    props.data.status === 'paid' ? (
      <CardActions>
        <Grid justifyContent="" alignItems="right">
          <Grid justifyContent="end" item xs={6}>
            <Typography component="legend">Review</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                
              }}
            />
          </Grid>
        </Grid>
        <Grid justifyContent="end" alignItems="left">
          <Grid justifyContent="end" item xs={6}>
            <Button variant="contained" color="success" dir="rtl">
              Paid
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    ) : (
      <CardActions>
        <Grid container spacing={1} justifyContent="end" alignItems="end">
          <Grid justifyContent="end" item xs={6}>
            <Link onClick={handleSubmit} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Link>
          </Grid>
          <Grid justifyContent="end" item xs={6} dir="rtl">
            <Button onClick={handlePayment} variant="contained" color="success">
              Pay
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    );

  return (
    <Grid item sx={{ width: 1 }}>
      <Grid item>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              bgcolor: 'background.paper',
              overflow: 'hidden',
              boxShadow: 1,
              fontWeight: 'bold',
            }}
          >
            {categoryimg}
            <Box sx={{ width: 3 / 4 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.data.title}
                </Typography>
                <Typography>
                  Provider : {`${props.data.provider_first_name}`}
                </Typography>
                <Typography>
                  Contact: {props.data.provider_email_address}
                </Typography>
                <Typography>{props.data.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  {format(new Date(props.data.start_time), 'ha')} -{' '}
                  {format(new Date(props.data.end_time), 'ha')}
                </Button>
              </CardActions>
              {cardActions}
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
