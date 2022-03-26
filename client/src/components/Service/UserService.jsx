import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Container,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { Link } from '@mui/material';

export default function ProfileService(props) {
  const {
    description,
    category,
    created_at,
    fee,
    first_name,
    service_id,
    title,
  } = props.data;
  return (
    <>
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
                {category} {first_name}
              </Typography>
              <Typography>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarTwoToneIcon />
              </Typography>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                12:00
              </Button>

              <Button size="small" variant="contained">
                Booking
              </Button>
            </CardActions>
          </Box>
        </Box>
      </Container>

      <CardMedia
        component="img"
        sx={{ width: 1 }}
        image="https://demo.themesberg.com/bootstrap/spaces/assets/img/image-office.jpg"
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {category}
        </Typography>

        <Typography gutterBottom>{first_name}</Typography>

        <Typography>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarTwoToneIcon />
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <Link to="/Detail" style={{ textDecoration: 'none' }}>
          <Button size="small" variant="contained">
            Book
          </Button>
        </Link>
      </CardActions>
    </>
  );
}
