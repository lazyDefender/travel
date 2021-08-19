import React from 'react';
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ToursListItem from './ToursListItem';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
    },
}));

const ToursList = ({ tours }) => {
    const classes = useStyles();

    return (
        <Grid 
            container
            spacing={4}
            className={classes.root}
        >
            {tours?.map((tour) => <ToursListItem key={tour.id} {...tour} />)}
        </Grid>   
    );
};

export default ToursList;
