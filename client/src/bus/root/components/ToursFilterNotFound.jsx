import React from 'react';
import {
    Grid, 
    Typography,
} from '@material-ui/core';
import {
    Cancel,
} from '@material-ui/icons';

const ToursFilterNotFound = () => {
    return (
        <div>
            <Grid 
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <Cancel />
                </Grid>
                <Grid item>
                    <Typography>
                        За введеними фільтрами турів не знайдено
                    </Typography>
                </Grid>
            </Grid>
        </div> 
    );
};

export default ToursFilterNotFound;
