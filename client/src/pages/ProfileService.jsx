import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
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
import ProfileNav from '../components/Navbar/ProfileNav';
import { UserService } from './../components/Service/index';

import axios from 'axios';
import qs from 'qs';

const theme = createTheme();

export default function ProfileService(props) {
  const [userStatus, setUserStatus] = useState({});
  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/services/search`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }).then((response) => {
      setResults(response.data.searchResults);
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

                <ProfileNav />
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            {results.map((result) => (
              <UserService data={result} />
            ))}
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
