import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar/Navbar';
import Avatar from '@mui/material/Avatar';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function ProfileService() {
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                  boxShadow: 1,
                  fontWeight: 'bold',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 1,
                    width: 1 / 4,
                  }}
                  alt="The house from the offer."
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                />
                <Box sx={{ width: 3 / 4 }}>
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
                    <Grid
                      container
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <Button size="small" variant="contained">
                          12:00
                        </Button>
                        <Button size="small" variant="contained">
                          Booking
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Link to="Edit" style={{ textDecoration: 'none' }}>
                          <Button variant="contained" sx={{ width: 1 }}>
                            Edit
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link to="Delete" style={{ textDecoration: 'none' }}>
                          <Button variant="contained" sx={{ width: 1 }}>
                            Delete
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Box>
              </Box>
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
