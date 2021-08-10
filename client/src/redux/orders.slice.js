import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderService } from '../services';

const ActionTypes = {
    GET_BY_USER: 'orders/get-by-user',
}

const getByUser = createAsyncThunk(
    ActionTypes.GET_BY_USER,
    async (userId, thunkAPI) => {
        const response = await orderService.getByUser(userId);
        return response.data;
    } 
)

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        data: null,
        isFetching: false,
    },
    reducers: {

    },
    extraReducers: {
        [getByUser.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getByUser.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.isFetching = false;
        },
    },
});

export const orders = ordersSlice.reducer;
// const {
//     setFormState,
// } = toursFilterSlice.actions;

export const ordersActions = {
    getByUser,
};