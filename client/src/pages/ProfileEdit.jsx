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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  TableFooter,
  Button,
} from '@mui/material';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileNav from '../components/Navbar/ProfileNav';
import BuyerNav from '../components/Navbar/BuyerNav';
import axios from 'axios';

const theme = createTheme();

export default function ProfileEdit() {
  const [userStatus, setUserStatus] = useState({});
  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);
  // sau nav component
  const provider =
    userStatus.data && userStatus.data.isserviceprovider ? 'yes' : 'No';
  const subnav = provider === 'yes' ? <ProfileNav userStatus /> : <BuyerNav />;

  // const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      let response = await axios({
        method: 'post',
        url: `/api/profile/${userStatus.data.id}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
                    {userStatus?.data?.first_name} {userStatus?.data?.last_name}
                  </Typography>
                </CardContent>

                {subnav}
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            <Container maxWidth="sm">
              <TableContainer component={Paper}>
                <Table sx={{ width: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Edit Profile</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        First Name
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Last Name
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Email
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleSubmit}
                        >
                          Update Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </Grid>
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
