import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tourService, orderService } from '../services';

const ActionTypes = {
    GET_TOUR: 'reservation/get-by-id',
    CREATE_ORDER: 'reservation/create-order',
}

const getTour = createAsyncThunk(
    ActionTypes.GET_TOUR,
    async (id, thunkAPI) => {
        const response = await tourService.getById(id);
        return response.data;
    } 
)

const createOrder = createAsyncThunk(
    ActionTypes.CREATE_ORDER,
    async (payload, thunkAPI) => {
        const response = await orderService.create(payload);
        return response.data;
    }
)

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState: {
        tour: {
            data: null,
            isFetching: false,
        }, 
    },
    reducers: {

    },
    extraReducers: {
        [getTour.pending]: (state, action) => {
            state.tour.isFetching = true;
        },
        [getTour.fulfilled]: (state, action) => {
            state.tour.data = action.payload;
            state.tour.isFetching = false;
        },
    },
});

export const reservation = reservationSlice.reducer;

export const reservationActions = {
    getTour,
    createOrder,
};