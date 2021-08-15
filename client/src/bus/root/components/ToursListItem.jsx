import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Book } from '../../../navigation/book';
import ImageWithFallback from '../../../global/components/ImageWithFallback';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cardMedia: {
    objectFit: 'contain',
  },
});

const ToursListItem = ({ hotel, adultPrice, kidPrice }) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const { rating, id } = hotel;

  const hotelURL = `${Book.HOTELS}/${id}`;
  
  const onImageError = (e) => {
    setImage(`${process.env.PUBLIC_URL}/image-not-found.svg`);
  };

  return (
      <Grid item xs={12} sm={6} md={4}>
        <Tooltip title={hotel.name} interactive arrow>
          <Card className={classes.root}>
          <Link to={hotelURL}>
            <CardActionArea>
              <ImageWithFallback
                image={hotel?.image?.source || image}
                alt={hotel.name}
                title={hotel.name}
                onError={onImageError}
                height="140"
              />
              <CardContent>
                <Typography noWrap gutterBottom variant="h5" component="h2">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  1 дор - {adultPrice}$
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  1 дит - {kidPrice}$
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  disabled
                />
              </CardContent>
            </CardActionArea>
            </Link>
          </Card>
        </Tooltip>
    </Grid>
  );
};

export default ToursListItem;
