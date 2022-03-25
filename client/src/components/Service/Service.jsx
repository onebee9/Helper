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
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { Link } from '@mui/material';
import Detail from '../../pages/Detail';

export default function Service(props) {
  const {description, category, created_at, fee, first_name, service_id, title} = props.data
  return (
    <>
     {first_name}
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

        <Typography>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarTwoToneIcon />
        </Typography>
        <Typography>
        {description}
        </Typography>
      </CardContent>
      <CardActions>
      <Link to="Detail" style={{ textDecoration: 'none' }}>
            <Button size="small">Book</Button>
      </Link>
      </CardActions>
    </>
  );
}
