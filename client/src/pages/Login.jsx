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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import { authContext } from './../providers/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
  const [userStatus, setStatus] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        email: email,
        password: password,
      };

      let response = await axios({
        method: 'post',
        url: `/api/users/login`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        withCredentials: true,
      });
      setStatus(response.data);
      
      //store login info in storage
      localStorage.setItem('usersinfo', JSON.stringify(response.data));

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
            Sign in
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <Link
              to="/SignupService"
              component={RouterLink}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained">Signup Service</Button>
            </Link>
            <Link
              to="/SignupClient"
              component={RouterLink}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained">Signup Client</Button>
            </Link>
          </Box>
          <Box
            component="form"
            // onSubmit={submitLogin}
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              email={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              password={password}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
