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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BuyerNav from '../components/Navbar/BuyerNav';

const theme = createTheme();

export default function Profile(props) {
  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    //retrive data from storage
    const userinfo = localStorage.getItem('usersinfo');
    const user = JSON.parse(userinfo);

    setUserStatus(user);
  }, []);

  //show date in properformat
  const newDate = userStatus.data && new Date(userStatus.data.created_at);
  const completeDate = newDate && newDate.toDateString();
  const yearFinal = completeDate && completeDate.slice(4);

  const provider =
    userStatus.data && userStatus.data.isserviceprovider ? 'yes' : 'No';

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
                <BuyerNav />
              </Card>
            </Container>
          </Grid>

          <Grid container xs={8} spacing={2}>
            <Grid item sx={{ width: 1 }}>
              <Container maxWidth="sm">
                <TableContainer component={Paper}>
                  <Table sx={{ width: 1 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={2}>
                          Client Profile
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Name
                        </TableCell>
                        <TableCell>
                          {userStatus?.data?.first_name}{' '}
                          {userStatus?.data?.last_name}
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
                        <TableCell>{userStatus?.data?.email}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {' '}
                          Member from
                        </TableCell>
                        <TableCell>{yearFinal} </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Service Provider
                        </TableCell>
                        <TableCell>{provider} </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Grid>
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
