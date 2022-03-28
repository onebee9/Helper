import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
  Container,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Service } from './../components/Service/index';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const theme = createTheme();

export default function Home() {
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [city, setCity] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [value, setValue] = React.useState(new Date());

  const submitSearch = async (event) => {
    const status = 'accepted';
    event.preventDefault();
    try {
      const data = {
        category,
        location,
        price,
        city,
        keyword,
        status,
      };

      console.log('filtered search data ', data);

      let response = await axios({
        method: 'get',
        url: `/api/services/search`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        params: data,
        withCredentials: true,
      });
      setResults(response.data);
      console.log('Response\n', response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/services/search`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container fixed>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Search
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    id="keyword"
                    name="keyword"
                    label="Keyword"
                    fullWidth
                    autoComplete="given-name"
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: 1 }}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      labelId="category"
                      id="category"
                      value={category}
                      label="Category"
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      <MenuItem value="Repair">Repair</MenuItem>
                      <MenuItem value="Babysitter">Babysitter</MenuItem>
                      <MenuItem value="Delivery">Delivery</MenuItem>
                      <MenuItem value="Carpentry">Carpentry</MenuItem>
                      <MenuItem value="Plumbing">Plumbing</MenuItem>
                      <MenuItem value="Construction">Construction</MenuItem>
                      <MenuItem value="Writing">Writing</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: 1 }}>
                    <InputLabel id="location">Location</InputLabel>
                    <Select
                      labelId="location"
                      id="location"
                      value={location}
                      label="location"
                      onChange={(event) => setLocation(event.target.value)}
                    >
                      <MenuItem value="Toronto">Toronto</MenuItem>
                      <MenuItem value="Ottawa">Ottawa</MenuItem>
                      {/* Etobicoke, York, North York, West End, Downtown, Midtown, Uptown, East York, East End, Scarborough */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: 1 }}>
                    <TextField
                      required
                      id="price"
                      name="price"
                      label="price"
                      onChange={(event) => setPrice(event.target.value)}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField sx={{ width: 1 }} {...props} />
                      )}
                      label="DateTimePicker"
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button onClick={submitSearch} variant="contained">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {results.map((result) => (
              <Grid item key={result.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    flexDirection: 'column',
                  }}
                >
                  <Service data={result} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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
          We Help You!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
