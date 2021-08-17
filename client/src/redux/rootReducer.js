import { combineReducers } from '@reduxjs/toolkit';

import { toursFilter } from './toursFilter.slice';
import { auth } from './auth.slice';
import { hotel } from './hotel.slice';
import { reservation } from './reservation.slice';
import { orders } from './orders.slice';
import { snackbar } from './snackbar.slice';

export const rootReducer = combineReducers({
    // reducers
    toursFilter,
    auth,
    hotel,
    reservation,
    orders,
    snackbar,
});