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

export default function Service(props) {
  const {
    description,
    category,
    created_at,
    fee,
    first_name,
    id,
    title,
  } = props.data;
  return (
    <>
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
