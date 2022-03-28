import * as React from 'react';
import {
  CardContent,
  Box,
  Typography,
  Link,
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import { convertLength } from '@mui/material/styles/cssUtils';

const theme = createTheme();

export default function ProfileService(props) {
  console.log(props);

  return (
    <ThemeProvider theme={theme}>
      <main>
          <Grid item xs={8}>
                <Box sx={{ width: 3 / 4 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {props.data.title}
                    </Typography>
                    <Typography>
                    Client name: {props.data.client_first_name}
                    </Typography>
                    <Typography>
                    Contact: {props.data.client_email}
                    </Typography>
                    <Typography>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarTwoToneIcon />
                    </Typography>
                    <Typography>
                    {props.data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">
                    {props.data.start_time}
                    </Button>

                    <Button size="small" variant="contained">
                    {props.data.end_time}
                    </Button>
                  </CardActions>

                  <CardActions>
                    <Grid
                      container
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <Link to="Edit" style={{ textDecoration: 'none' }}>
                          <Button 
                          variant="contained" 
                          sx={{ width: 1 }}
                          // onClick={updateBooking}
                          >
                            Edit
                          </Button>
                        </Link>
                      </Grid>
                      <Grid  justifyContent="end" item xs={6}>
                        <Link to="Delete" style={{ textDecoration: 'none' }}>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ width: 1 }}
                            // onClick={deleteBooking}
                            >
                            Delete
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Box>
          </Grid>
      </main>
    </ThemeProvider>
  );
}
