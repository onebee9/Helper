import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
  Container,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { NavLink } from 'react-router-dom';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { Link } from '@mui/material';
import Detail from '../../pages/Detail';
import { convertValueToMeridiem } from '@mui/lab/internal/pickers/time-utils';

export default function Service(props) {
  const {
    description,
    category,
    created_at,
    fee,
    first_name,
    id,
    title,
    user_id,
  } = props.data;

  // category image

  const [pic, setPic] = React.useState([
    {
      category: 'Carpentry',
      url: '/images/carpentry.jpg',
    },
    {
      category: 'Plumbing',
      url: '/images/plumbing.jpg',
    },
    {
      category: 'Education',
      url: '/images/education.jpg',
    },
    {
      category: 'Cleaning',
      url: '/images/cleaning.jpg',
    },
    {
      category: 'Gardening',
      url: '/images/gardening.jpg',
    },
    {
      category: 'Construction',
      url: '/images/construction.jpg',
    },
    {
      category: 'Translation',
      url: '/images/translation.jpg',
    },
  ]);
  const categoryimg = pic.map((pic) => {
    return pic.category === category ? (
      <CardMedia
        component="img"
        sx={{ width: 1 }}
        image={pic.url}
        alt={pic.category}
      />
    ) : (
      ''
    );
  });
  return (
    <>
      {categoryimg}
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
        {/* <Link style={{ textDecoration: 'none' }}> */}
        <NavLink to={`/Detail/${id}`}>
          <Button size="small" variant="contained">
            Book
          </Button>
        </NavLink>

        {/* </Link> */}
      </CardActions>
    </>
  );
}
