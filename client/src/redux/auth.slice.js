import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, cityService, tourService } from '../services';

const ActionTypes = {
    SIGN_IN: 'auth/sign-in',
    GET_CURRENT_USER: 'auth/get-current-user',
}


const signIn = createAsyncThunk(
    ActionTypes.SIGN_IN,
    async (payload, thunkAPI) => {
        const {
            email,
            password,
        } = payload;

        const response = await authService.signIn(email, password);
    } 
)

const getCurrentUser = createAsyncThunk(
    ActionTypes.GET_CURRENT_USER,
    async (token, thunkAPI) => {
        const response = await authService.getCurrentUser(token);
        return response.data;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isFetching: true,
    },
    reducers: {

    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.isFetching = true;
        },
        [signIn.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [getCurrentUser.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isFetching = false;
        },
    },
});

export const auth = authSlice.reducer;
// const {
//     setFormState,
// } = toursFilterSlice.actions;

export const authActions = {
    signIn,
    getCurrentUser,
};