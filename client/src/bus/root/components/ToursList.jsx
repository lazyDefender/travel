import React from 'react';
import {
    Grid,
} from '@material-ui/core';

import ToursListItem from './ToursListItem';

const ToursList = ({ tours }) => {
    return (
        <Grid 
            container
            spacing={4}
        >
            {tours?.map((tour) => <ToursListItem key={tour.id} {...tour} />)}
        </Grid>   
    );
};

export default ToursList;
