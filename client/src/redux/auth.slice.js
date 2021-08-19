import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, userService } from '../services';

const ActionTypes = {
    SIGN_UP: 'auth/sign-up',
    SIGN_IN: 'auth/sign-in',
    SIGN_IN_WITH_PROVIDER: 'auth/sign-in-with-provider',
    SIGN_OUT: 'auth/sign-out',
    GET_CURRENT_USER: 'auth/get-current-user',
    UPDATE_USER: 'auth/update-user',
}

const signUp = createAsyncThunk(
    ActionTypes.SIGN_UP,
    async (payload, thunkAPI) => {
        const {
            email,
            password,
            firstName,
            lastName,
        } = payload;

        const { user: { uid } } = await authService.signUp(email, password);
        const userResponse = await userService.create({
            firstName,
            lastName,
            email,
            authID: uid,
        })

        return userResponse.data;
    }
)

const signIn = createAsyncThunk(
    ActionTypes.SIGN_IN,
    async (payload, thunkAPI) => {
        const {
            email,
            password,
        } = payload;

        await authService.signIn(email, password);
    } 
)

const signInWithProvider = createAsyncThunk(
    ActionTypes.SIGN_IN_WITH_PROVIDER,
    async (providerName, thunkAPI) => {
        const { 
            uid, 
            email,
            firstName,
            lastName, 
        } = await authService.signInWithProvider(providerName);
        const userResponse = await userService.search({ email });
        const [user] = userResponse.data;

        // if user with specified email exists
        if(user) {
            const { 
                id,
                authIDs,
            } = user;
    
            let result = user;
    
            if(!authIDs.includes(uid)) {
                const updatedUserResponse = await userService.update(id, {
                    authIDs: [...user.authIDs, uid],
                })
    
                result = updatedUserResponse.data;
            }
            
            return result;
        }

        // create new user
        else {
            const { data: newUser } = await userService.create({
                email,
                firstName,
                lastName,
                authID: uid,
            })

            return newUser;
        }
        
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
        setFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [signUp.pending]: (state, action) => {
            state.isFetching = true;
        },
        [signUp.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [signUp.rejected]: (state, action) => {
            state.isFetching = false;
            state.user = null;
        },

        [signIn.pending]: (state, action) => {
            state.isFetching = true;
        },
        
        [signIn.rejected]: (state, action) => {
            state.isFetching = false;
            state.user = null;
        },

        [signInWithProvider.pending]: (state, action) => {
            state.isFetching = true;
        },
        [signInWithProvider.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.user = action.payload;
        },
        [signInWithProvider.rejected]: (state, action) => {
            state.isFetching = false;
            state.user = null;
        },

        [signOut.pending]: (state, action) => {
            state.isFetching = true;
        },
        [signOut.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.user = null;
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

const {
    setFetching,
    setError,
} = authSlice.actions;

export const authActions = {
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    getCurrentUser,
    updateUser,
    setFetching,
    setError,
};