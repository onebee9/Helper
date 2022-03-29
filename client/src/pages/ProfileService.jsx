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
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { format } from 'date-fns';
import axios from 'axios';

export default function ProfileService(props) {
  console.log(props);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newResponse = await axios({
        method: 'delete',
        url: `api/services/remove/${props.id}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
      });
      console.log('*****', newResponse);

      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
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
                  Service offered by {props.data.provider_first_name}
                </Typography>
                <Typography>
                  Contact: {props.data.provider_email_address}
                </Typography>
                <Typography>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarTwoToneIcon />
                </Typography>
                <Typography>{props.data.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  {format(new Date(props.data.start_time), 'ha')} -{' '}
                  {format(new Date(props.data.end_time), 'ha')}
                </Button>
              </CardActions>

              <CardActions>
                <Grid
                  container
                  spacing={1}
                  justifyContent="end"
                  alignItems="end"
                >
                  <Grid justifyContent="end" item xs={6}>
                    <Link
                      onClick={handleSubmit}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ width: 1 }}
                      >
                        Delete
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </CardActions>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
