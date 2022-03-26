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

import { authContext } from './../providers/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
const theme = createTheme();

export default function ProfileServiceCreate(props) {
  const [userStatus, setUserStatus] = useState({});
  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [fee, setFee] = useState('');

  console.log('++++++++++', title);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        user_id: userStatus?.data?.id,
        title: title,
        description: description,
        category: category,
        fee: fee,
      };
      let response = await axios({
        method: 'post',
        url: `/api/services/new`,
        data: data,
        withCredentials: true,
      });

      // console.log('data', data);
      console.log(response.data);
      return response;
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
            <Container maxWidth="sm">
              <TableContainer component={Paper}>
                <Table sx={{ width: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Profile</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Title
                      </TableCell>
                      <TableCell>
                        <TextField
                          required
                          id="title"
                          name="title"
                          label="Title"
                          value={title}
                          type="text"
                          onChange={(event) => setTitle(event.target.value)}
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Description
                      </TableCell>
                      <TableCell>
                        <TextField
                          required
                          id="description"
                          name="description"
                          label="Description"
                          value={description}
                          type="text"
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Category
                      </TableCell>
                      <TableCell>
                        <TextField
                          required
                          id="category"
                          name="category"
                          label="Category"
                          value={category}
                          type="text"
                          onChange={(event) => setCategory(event.target.value)}
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Price
                      </TableCell>
                      <TableCell>
                        <TextField
                          required
                          id="fee"
                          name="fee"
                          label="$10.00"
                          value={fee}
                          type="text"
                          onChange={(event) => setFee(event.target.value)}
                          fullWidth
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
                          Creat New Service
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
