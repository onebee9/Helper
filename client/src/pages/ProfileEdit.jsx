import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Container,
  Avatar,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function createData(name, calories, protein) {
  return { name, calories, protein };
}

const rows = [
  createData(
    'Full Name',
    <TextField
      required
      id="name"
      name="name"
      label="Full Name"
      fullWidth
      autoComplete="given-name"
    />,
    <EditIcon />
  ),
  createData(
    'Email',
    <TextField
      required
      id="email"
      name="email"
      label="abc@test.com"
      fullWidth
      autoComplete="given-email"
    />,
    <EditIcon />
  ),
  createData(
    'Address',

    <TextField
      required
      id="address"
      name="address"
      label="Address"
      fullWidth
      autoComplete="given-address"
    />,
    <EditIcon />
  ),
];

export default function ProfileEdit() {
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
                    User Name
                  </Typography>
                </CardContent>

                <nav aria-label="secondary mailbox folders">
                  <List>
                    <Link to="Profile" style={{ textDecoration: 'none' }}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link to="Profile Edit" style={{ textDecoration: 'none' }}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile Edit" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link
                      to="Profile Service"
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile Servic" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link
                      to="Profile Service Edit"
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Profile Service Edit" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </List>
                </nav>
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            <Container maxWidth="sm">
              <TableContainer component={Paper}>
                <Table sx={{ width: 1 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Profile</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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
