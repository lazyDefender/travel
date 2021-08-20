import React from 'react';
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { ImageWithFallback } from '../../../global/components';

export const HotelMain = ({ hotel }) => {
    const {
        name,
        description,
        rating,
        image,
    } = hotel || {};

    return (
        <Card>
            <ImageWithFallback
              image={image?.source}
              alt={name}
              title={name}
              height="300"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Rating
                    name="simple-controlled"
                    value={rating || 0}
                    disabled
                />
            </CardContent>
        </Card>
    );
};
