import * as React from 'react';
import {
  Button,
  CardContent,
  Box,
  Typography,
  Link,
  Grid,
  CardActions,
  Container,
  Rating
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function ProfileService(props) {
  const [rating, setRating] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newResponse = await axios({
        method: 'delete',
        url: `api/services/remove/${props.id}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
      });

      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = props.data.booking_id
    axios({
      method: 'get',
      url: `api/bookings/ratings/${id}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    })
      .then((response) => {
        setRating(response.data.rating);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

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
        <Grid justifyContent="end" item xs={6}>
          <Button variant="contained">Contact</Button>
        </Grid>
        <Grid justifyContent="end" item xs={6} dir="rtl">
          <Button
            variant="contained"
            color="success"
          >
            Paid
          </Button>
        </Grid>
      </CardActions>
    ) : (
      <CardActions>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Link onClick={handleSubmit} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="error" sx={{ width: 1 }}>
                Reject
              </Button>
            </Link>
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
                  Client name: {props.data.client_first_name}
                </Typography>
                <Typography>Contact: {props.data.client_email}</Typography>

                <Typography component="legend"></Typography>
                <Rating name="read-only" value={rating} readOnly />

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
