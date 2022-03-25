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
const theme = createTheme();

function createData(name, calories, protein) {
  return { name, calories, protein };
}

const rows = [
  createData('Full Name', 'User Name', <EditIcon />),
  createData('Email', 'user.name@example.com', <EditIcon />),
  createData(
    'Address',
    '662 King Street West #101, Toronto ON, Canada',
    <EditIcon />
  ),
];

export default function Detail(props) {
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
          {results.map((result) => (
            <Grid item key={result.id} xs={8}>
              <Container maxWidth="sm">
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Service data={result} />
                </Card>
              </Container>
            </Grid>
          ))}

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
                    <Link to="12:00" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ width: 1 }}>
                        12:00
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ width: 1 }}>
                        1:00
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Link to="Booking" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ width: 1 }}>
                        Booking
                      </Button>
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
