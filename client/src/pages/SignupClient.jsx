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
import { authContext } from './../providers/AuthProvider';
import { useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const theme = createTheme();

export default function SignupClient() {
  const navigate = useNavigate();
  const { login } = useContext(authContext);
  // const [userStatus, setStatus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value); // need setting
  };
  const handleSubmit = async (event) => {
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
        url: `/api/users/new`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        withCredentials: true,
      });

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
            Creat Client Account
          </Typography>
          <Box
            component="form"
            noValidate
            onClick={handleSubmit}
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
                  value={firstName}
                  type="text"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  type="text"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  value={password}
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
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
                  id="address"
                  value={address}
                  type="text"
                  onChange={(event) => setAddress(event.target.value)}
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
                <Link to="/Login" component={RouterLink} variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
