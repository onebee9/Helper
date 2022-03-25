import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { authContext } from './../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const theme = createTheme();

export default function SignupService() {
  const navigate = useNavigate();
  const { login } = useContext(authContext);
  const [userStatus, setStatus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value); // need setting
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        category: category,
        address: address,
      };

      let response = await axios({
        method: 'post',
        url: `/api/users/login`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        withCredentials: true,
      });
      setStatus(response.data);
      console.log('signup+++++++++', response.data);

      //store login info in storage
      localStorage.setItem('usersinfo', JSON.stringify(response.data));
      console.log('signup---------', response.data);

      email && login(email, password);
      // redirect to Home
      if (response) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Creat Service Provider Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 1 }}>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value="Repair">Repair</MenuItem>
                    <MenuItem value="Babysitter">Babysitter</MenuItem>
                    <MenuItem value="Delivery">Delivery</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Service Provider"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
