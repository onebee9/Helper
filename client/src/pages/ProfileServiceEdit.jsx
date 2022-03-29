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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileNav from '../components/Navbar/ProfileNav';
import BuyerNav from '../components/Navbar/BuyerNav';

import { authContext } from './../providers/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

function createData(name, data) {
  return { name, data };
}

const rows = [
  createData(
    'Title',
    <TextField required id="title" name="title" label="Title" fullWidth />
  ),
  createData(
    'description',
    <TextField
      required
      id="description"
      name="description"
      label="Description"
      fullWidth
    />
  ),
  createData(
    'Category',
    <TextField
      required
      id="category"
      name="category"
      label="Category"
      fullWidth
    />
  ),
  createData(
    'Price',
    <TextField required id="fee" name="fee" label="$10.00" fullWidth />
  ),
];

export default function ProfileServiceEdit(props) {
  console.log('++++++++++++++++++', props);
  const [userStatus, setUserStatus] = useState({});
  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);
  const [status, setStatus] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [fee, setFee] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(authContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        user_id: userID,
        title: title,
        description: description,
        category: category,
        fee: fee,
      };

      let response = await axios({
        method: 'post',
        url: `/api/services/update/`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        withCredentials: true,
      });
      setStatus(response.data);
      console.log(response.data);

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

                {subnav}
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            <Container maxWidth="sm">
              <TableContainer component={Paper} onSubmit={handleSubmit}>
                <Table sx={{ width: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Edit Service</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const select_category = (
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
                      );
                      console.log('ttttttt', row.name);
                      return (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>
                            {row.name === 'Category'
                              ? select_category
                              : row.data}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update Service
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
