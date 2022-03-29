import * as React from 'react';
import {
  Button,
  CardContent,
  Box,
  Typography,
  Link,
  Grid,
  CardActions,
  Container,

} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { format } from 'date-fns';
// import { convertLength } from '@mui/material/styles/cssUtils';

const theme = createTheme();

export default function ProfileService(props) {

  return (
    <Grid item sx={{ width: 1 }}>
      <Grid item>
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
                  {props.data.title}
                </Typography>
                <Typography>
                  Client name: {props.data.client_first_name}
                </Typography>
                <Typography>Contact: {props.data.client_email}</Typography>
                <Typography>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarTwoToneIcon />
                </Typography>
                <Typography>{props.data.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  {format(new Date(props.data.start_time), 'ha')} -{' '}
                  {format(new Date(props.data.end_time), 'ha')}
                </Button>
              </CardActions>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
