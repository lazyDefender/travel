import React from 'react';
import {
    Typography,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Book } from '../../../common/enums/book';

const Order = (props) => {
    const { 
      adultsCount,
      kidsCount,
      datetime,
      tour, 
    } = props;
    
    const {
      duration,
      kidPrice,
      adultPrice,
      hotel,
    } = tour;

    const { 
      name,
      id,
    } = hotel;

    const total = kidPrice * kidsCount + adultPrice * adultsCount;

    const date = new Date(datetime._seconds * 1000);
    
    return <>
        <Link to={`${Book.HOTELS}/${id}`}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={name}
                height="140"
                image={hotel.image.source}
                title={name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  К-сть дорослих - {adultsCount}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  К-сть дітей - {kidsCount}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Початок туру - {moment(date).format('DD-MM-yyyy')}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Тривалість туру - {duration} дн.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Cума - {total}$
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
    </>;
};

export default Order;
