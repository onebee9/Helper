import * as React from 'react';
import {
  CardContent,
  Box,
  Typography,
  Container,
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { format } from 'date-fns';

export default function ProfileService(props) {
  console.log(props);

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
                  Service offered by {props.data.provider_first_name}
                </Typography>
                <Typography>
                  Contact: {props.data.provider_email_address}
                </Typography>
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
