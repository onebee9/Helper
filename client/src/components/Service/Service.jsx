import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { NavLink } from 'react-router-dom';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

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


  // category images

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
    {
      category: 'Delivery',
      url: '/images/delivery.jpg',
    },
    {
      category: 'Babysitter',
      url: '/images/babysitter.jpg',
    },
    {
      category: 'Repair',
      url: '/images/repair.jpg',
    },
  ]);
  const categoryimg = pic.map((pic) => {
    return pic.category === category ? (
      <CardMedia
        component="img"
        key={pic.id}
        sx={{ width: 1 }}
        image={pic.url}
        alt={pic.category}
      />
    ) : (
      ''
    );
  });
  const isLoggedIn = localStorage.getItem('usersinfo');
  console.log(isLoggedIn);
  const canBook = isLoggedIn ?
    (<NavLink to={`/Detail/${id}`}>
      <Button size="small" variant="contained">
        Book
      </Button>
    </NavLink>) : 
    (<NavLink to={`/Login`}>
      <Button size="small" variant="contained">
        Book
      </Button>
    </NavLink>)
  return (
    <>
      {categoryimg}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {category}
        </Typography>

        <Typography gutterBottom>{first_name}</Typography>
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={null} readOnly />
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions dir="rtl">
        {canBook} 
      </CardActions>
    </>
  );
}
