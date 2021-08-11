import { createSlice } from '@reduxjs/toolkit';
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