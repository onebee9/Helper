import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar/Navbar';
import {
  Grid,
  CardMedia,
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import EditIcon from '@mui/icons-material/Edit';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function createData(name, calories, protein) {
  return { name, calories, protein };
}

const rows = [
  createData('Full Name', 'User Name', <EditIcon />),
  createData('Email', 'user.name@example.com', <EditIcon />),
  createData(
    'Address',
    '662 King Street West #101, Toronto ON, Canada',
    <EditIcon />
  ),
];

export default function Detail() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Grid container>
          <Grid item xs={8}>
            <Container maxWidth="sm">
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 1 }}
                  image="https://demo.themesberg.com/bootstrap/spaces/assets/img/image-office.jpg"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarTwoToneIcon />
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">
                    Booking
                  </Button>
                </CardActions>
              </Card>
            </Container>
          </Grid>

          <Grid item xs={4}>
            <Container sx={{ width: 1 }}>
              <Card sx={{ width: 1 }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" color="text.secondary">
                    Booking
                  </Typography>
                </CardContent>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <Link to="12:00" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ width: 1 }}>
                        12:00
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Link to="1:00" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ width: 1 }}>
                        1:00
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Link to="Login" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ width: 1 }}>
                        Login
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Card>
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
