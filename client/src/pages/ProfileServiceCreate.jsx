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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileNav from '../components/Navbar/ProfileNav';
import BuyerNav from '../components/Navbar/BuyerNav';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const theme = createTheme();

export default function ProfileServiceCreate(props) {
  const userInfo = props.user && props.user;
  const [userStatus, setUserStatus] = useState({});
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        title: title,
        description: description,
        fee: fee,
        category: category,
        user_id: userInfo.id,
      };
      console.log('new service data', data);

      const newResponse = await axios({
        method: 'post',
        url: `/api/services/new`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        withCredentials: true,
      });
      console.log('*****', newResponse);

      navigate('/ServiceList');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);
  const provider =
    userStatus.data && userStatus.data.isserviceprovider ? 'yes' : 'No';
  const subnav = provider === 'yes' ? <ProfileNav userStatus /> : <BuyerNav />;
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
                    {userInfo.first_name} {userInfo.last_name}
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
                      <TableCell colSpan={2}>Add New Service</TableCell>
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
                        <FormControl sx={{ width: 1 }}>
                          <InputLabel id="category">Category</InputLabel>
                          <Select
                            labelId="category"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={(event) =>
                              setCategory(event.target.value)
                            }
                          >
                            <MenuItem value="">All Categories</MenuItem>
                            <MenuItem value="Repair">Repair</MenuItem>
                            <MenuItem value="Babysitter">Babysitter</MenuItem>
                            <MenuItem value="Delivery">Delivery</MenuItem>
                            <MenuItem value="Carpentry">Carpentry</MenuItem>
                            <MenuItem value="Plumbing">Plumbing</MenuItem>
                            <MenuItem value="Construction">
                              Construction
                            </MenuItem>
                            <MenuItem value="Gardening">Gardening</MenuItem>
                          </Select>
                        </FormControl>
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
