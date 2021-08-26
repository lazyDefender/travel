import React from 'react';
import {
    Grid,
    Typography,
    Box,
} from '@material-ui/core';
import {
    Cancel,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { OrdersListItem } from './OrdersListItem';

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%)',
    },
}));

export const OrdersList = ({ orders }) => {
    const classes = useStyles();
    const listJSX = (
        <Grid 
            container 
            spacing={3}
        >
            {orders?.map(o =>  <OrdersListItem order={o} key={o.id} />)}
        </Grid>
    );
    
    
    const emptyJSX = <div>
        <Grid 
            container
            spacing={4}
            alignItems="center"
            justify="center"
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                className={classes.box}
            >
                <Grid item>
                    <Cancel/>
                </Grid>
                <Grid item>
                    <Typography>
                        Ще немає замовлень
                    </Typography>
                </Grid>
            </Box>
            
        </Grid>  
    </div>;

    return orders?.length ? listJSX : emptyJSX;
};
