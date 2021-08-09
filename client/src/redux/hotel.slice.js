import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hotelService, tourService } from '../services';

const ActionTypes = {
    GET_BY_ID: 'hotel/get-by-id',
    GET_TOURS: 'hotel/get-tours',
}

const getById = createAsyncThunk(
    ActionTypes.GET_BY_ID,
    async (id, thunkAPI) => {
        const response = await hotelService.getById(id);
        return response.data;
    } 
)

const getTours = createAsyncThunk(
    ActionTypes.GET_TOURS,
    async (hotelId, thunkAPI) => {
        const response = await tourService.getByHotel(hotelId);
        return response.data;
    }
)

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        hotel: {
            data: null,
            isFetching: false,
        },
        tours: {
            data: [],
            isFetching: false,
        }  
    },
    reducers: {

    },
    extraReducers: {
        [getById.pending]: (state, action) => {
            state.hotel.isFetching = true;
        },
        [getById.fulfilled]: (state, action) => {
            state.hotel.data = action.payload;
            state.hotel.isFetching = false;
        },

        [getTours.pending]: (state, action) => {
            state.tours.isFetching = true;
        },
        [getTours.fulfilled]: (state, action) => {
            state.tours.data = action.payload;
            state.tours.isFetching = false;
        },
    },
});

export const hotel = hotelSlice.reducer;
// const {
//     setFormState,
// } = toursFilterSlice.actions;

export const hotelActions = {
    getById,
    getTours,
};