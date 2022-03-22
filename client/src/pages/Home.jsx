import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar/Navbar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link to="https://mui.com/" color="inherit">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();
export default function Home() {
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value); // need setting
    setLocation(event.target.value); // need setting
    setPrice(event.target.value); // need setting
    setDate(event.target.value); // need setting
  };
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
                  <FormControl sx={{ width: 1 }}>
                    <InputLabel id="date">Date</InputLabel>
                    <Select
                      labelId="date"
                      id="date"
                      value={date}
                      label="date"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>2022/01/01</MenuItem>
                      <MenuItem value={20}>2022/01/02</MenuItem>
                      <MenuItem value={30}>2022/01/03</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
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
