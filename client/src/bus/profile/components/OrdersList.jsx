import React from 'react';
import {
    Grid,
    Typography
} from '@material-ui/core';
import {
    Cancel,
} from '@material-ui/icons';

import OrdersListItem from './OrdersListItem';

const OrdersList = ({ orders }) => {
    const listJSX = <Grid container spacing={3}>
            {orders?.map(o =>  <OrdersListItem order={o} key={o.id} />)}
        </Grid>;
    
    const emptyJSX = <div>
        <Grid 
            container
            spacing={4}
        >
            <Grid item>
                <Cancel/>
            </Grid>
            <Grid item>
                <Typography>
                    Ще немає замовлень
                </Typography>
            </Grid>
        </Grid>  
    </div>;

    return orders?.length ? listJSX : emptyJSX;
};

export default OrdersList;
