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
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Home() {
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value); // need setting
    setLocation(event.target.value); // need setting
    setPrice(event.target.value); // need setting
    setCity(event.target.value);//need setting
  };
  const [value, setValue] = React.useState(new Date());

  const handleSearch = (category, location, price, city) => {
    const data = {
       category,
       location,
       price,
       city
    };
    
 }

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
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Repair</MenuItem>
                      <MenuItem value={20}>Babysitter</MenuItem>
                      <MenuItem value={30}>Delivery</MenuItem>
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
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Toronto</MenuItem>
                      <MenuItem value={20}>Ottawa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: 1 }}>
                    <InputLabel id="price">Price</InputLabel>
                    <Select
                      labelId="price"
                      id="price"
                      value={price}
                      label="Price"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>$10.0</MenuItem>
                      <MenuItem value={20}>$20.0</MenuItem>
                      <MenuItem value={30}>$30.0</MenuItem>
                    </Select>
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
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>   
          <Button onClick={handleSearch}>Search</Button>
            </React.Fragment>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">

          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
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
                      Heading
                    </Typography>
                    <Typography>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarTwoToneIcon />
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">
                      Booking
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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
