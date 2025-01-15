import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        resetPasswordCountdown: 0,
    },
    reducers: {
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage || null;
        },
        onCheckingCredentials: (state) => {
            state.status = 'checking';
        },
        setResetPasswordCountdown: (state, { payload }) => {
            state.resetPasswordCountdown = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onCheckingCredentials, setResetPasswordCountdown } = authSlice.actions;