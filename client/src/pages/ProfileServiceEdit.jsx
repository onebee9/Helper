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
import { useNavigate, useParams } from 'react-router-dom';
const theme = createTheme();

export default function ProfileServiceEdit(props) {
  // get service data from server
  const [service, setService] = useState([]);

  // get service id
  const params = useParams();
  const url = 'api/services/provider/';
  useEffect(() => {
    axios.get(`${url}${params.id}`).then((response) => {
      setService(response.data);
    });
  }, [params.id]);

  // get user info
  const [userStatus, setUserStatus] = useState({});
  useEffect(() => {
    const user = localStorage.getItem('usersinfo');
    setUserStatus(JSON.parse(user));
  }, []);
  const [status, setStatus] = useState(false);

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
        title: title,
        description: description,
        category: category,
        fee: fee,
      };

      let response = await axios({
        method: 'post',
        url: `/api/services/update/${params.id}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        withCredentials: true,
      });
      setStatus(response.data);

      //store login info in storage
      localStorage.setItem('usersinfo', JSON.stringify(response.data));

      // email && login(email, password);
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
                      <TableCell colSpan={2}>Edit Service</TableCell>
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
                          value={service.title}
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
                          value={service.description}
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
                            value={service.category}
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
                          value={service.fee}
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
         We're here to help!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
