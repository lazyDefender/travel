import { combineReducers } from '@reduxjs/toolkit';

import { toursFilter } from './toursFilter.slice'    
import { toursReducer as tours } from './tours/reducer'
import { auth } from './auth.slice'
import { hotel } from './hotel.slice'
import { reservation } from './reservation.slice'
import { ordersReducer as orders } from './orders/reducer'
import { defaultReducer } from './default/reducer'

export const rootReducer = combineReducers({
    // reducers
    toursFilter,
    // tours,
    auth,
    hotel,
    reservation,
    // orders,
    // defaultReducer,
});