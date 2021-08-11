import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, cityService, tourService, userService } from '../services';

const ActionTypes = {
    SIGN_IN: 'auth/sign-in',
    GET_CURRENT_USER: 'auth/get-current-user',
    UPDATE_USER: 'auth/update-user',
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

const signInWithFacebook = createAsyncThunk(
    ActionTypes.SIGN_IN_WITH_FACEBOOK,
    async (_, thunkAPI) => {
        
    }
)

const signOut = createAsyncThunk(
    ActionTypes.SIGN_OUT,
    async (_, thunkAPI) => {
        await authService.signOut();
    }
)

const getCurrentUser = createAsyncThunk(
    ActionTypes.GET_CURRENT_USER,
    async (_, thunkAPI) => {
        const response = await authService.getCurrentUser();
        return response.data;
    }
)

const updateUser = createAsyncThunk(
    ActionTypes.UPDATE_USER,
    async (payload, thunkAPI) => {
        const { id } = payload;
        const response = await userService.update(id, payload);
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

        [updateUser.pending]: (state, action) => {
            state.isFetching = true;
        },
        [updateUser.fulfilled]: (state, action) => {
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
    updateUser,
};