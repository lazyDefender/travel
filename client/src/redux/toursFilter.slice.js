import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cityService, tourService } from '../services';

const ActionTypes = {
    GET_CITIES: 'toursFilter/get-cities',
    GET_TOURS: 'toursFilter/get-tours',
}

const getCities = createAsyncThunk(
    ActionTypes.GET_CITIES,
    async (thunkAPI) => {
        const response = await cityService.getAll();
        return response.data;
    }
);

const getTours = createAsyncThunk(
    ActionTypes.GET_TOURS,
    async (filters, thunkAPI) => {
        const response = await tourService.getAll(filters);
        return response.data;
    } 
)

export const toursFilterSlice = createSlice({
    name: 'toursFilter',
    initialState: {
        cities: {
            isFetching: false,
            data: [],
        },
        tours: {
            isFetching: false,
            data: null,
        },
        formState: null
    },
    reducers: {
        setFormState: (state, action) => {
            state.formState = action.payload;
        },
    },
    extraReducers: {
        [getCities.pending]: (state, action) => {
            state.cities.isFetching = true;
        },
        [getCities.fulfilled]: (state, action) => {
            state.cities.data = action.payload;
            state.cities.isFetching = false;
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

export const toursFilter = toursFilterSlice.reducer;
const {
    setFormState,
} = toursFilterSlice.actions;

export const toursFilterActions = {
    getCities,
    getTours,
    setFormState,
};