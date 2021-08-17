import { createSlice } from '@reduxjs/toolkit';
import { SnackbarSeverity } from '../common/enums/snackbarSeverity';
import { getAuthErrorMessage } from '../helpers/getAuthErrorMessage';
import { authActions } from './auth.slice';
import { reservationActions } from './reservation.slice';

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        message: '',
        severity: '',
        open: false,
    },
    reducers: {
        show: (state, action) => {
            const {
                message,
                severity,
                open
            } = action.payload;

            state.message = message;
            state.severity = severity;
            state.open = open;
        },
        reset: (state, action) => {
            state.message = null;
            state.severity = null;
            state.open = false;
        },
    },
    extraReducers: {
        [authActions.signUp.rejected]: (state, action) => {
            state.message = getAuthErrorMessage(action.error.code);
            state.severity = SnackbarSeverity.ERROR;
            state.open = true;
        },

        [authActions.signIn.rejected]: (state, action) => {
            state.message = getAuthErrorMessage(action.error.code);
            state.severity = SnackbarSeverity.ERROR;
            state.open = true;
        },

        [reservationActions.createOrder.fulfilled]: (state, action) => {
            state.message = 'Заброньовано успішно';
            state.severity = SnackbarSeverity.SUCCESS;
            state.open = true;
        }
    },
});

export const snackbar = snackbarSlice.reducer;

const {
    show,
    reset,
} = snackbarSlice.actions;

export const snackbarActions = {
    show,
    reset,
};