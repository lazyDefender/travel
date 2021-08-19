import React from 'react';
import {
    Grid
} from '@material-ui/core';

import Order from './Order';

const OrdersListItem = (props) => {
    const { order } = props;
    return <Grid item 
        xs={12} sm={6} md={4}
    >
        <Order {...order}/>
    </Grid>;
}; 

export default OrdersListItem;
