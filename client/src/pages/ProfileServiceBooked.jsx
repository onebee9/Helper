import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
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
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileNav from '../components/Navbar/ProfileNav';
import BuyerNav from '../components/Navbar/BuyerNav';

const theme = createTheme();

export default function ProfileServiceBooked(props) {
  const userInfo = props.user && props.user;
  const [services, setServices] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios.get(`/api/users/${params.id}/service-bookings`).then((response) => {
      setServices(response.data);
    });
  }, []);

  const [userStatus, setUserStatus] = useState({});
  const provider =
    userStatus.data && userStatus.data.isserviceprovider ? 'yes' : 'No';
  const subnav = provider === 'yes' ? <ProfileNav userStatus /> : <BuyerNav />;
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
                    {userInfo.first_name} {userInfo.last_name}
                  </Typography>
                </CardContent>

                {subnav}
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            {services.map((s) => {
              return (
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
                    <Box
                      component="img"
                      sx={{
                        height: 1,
                        width: 1 / 4,
                      }}
                      alt="The house from the offer."
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
                    <Box sx={{ width: 3 / 4 }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Category : {s.category}
                        </Typography>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarTwoToneIcon />
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h4">
                          Title : {s.title}
                        </Typography>
                        <Typography>Fee : {s.fee}</Typography>
                        <br />
                        <Typography>Description: {s.description}</Typography>
                      </CardContent>

                      <CardActions>
                        <Button size="small" variant="contained">
                          12:00
                        </Button>

                        <Button size="small" variant="contained">
                          Booking
                        </Button>
                      </CardActions>

                      <CardActions>
                        <Grid
                          container
                          spacing={1}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item xs={6}>
                            <Link to="Edit" style={{ textDecoration: 'none' }}>
                              <Button variant="contained" sx={{ width: 1 }}>
                                Edit
                              </Button>
                            </Link>
                          </Grid>
                          <Grid justifyContent="end" item xs={6}>
                            <Link
                              to="Delete"
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
                  <br />
                </Container>
              );
            })}
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
