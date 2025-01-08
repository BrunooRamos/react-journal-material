
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    status: AuthStatus
    uid: string | null
    email: string | null
    displayName: string | null
    photoURL: string | null
    errorMessage: string | null
}

enum AuthStatus {
    checking = 'checking',
    notAuthenticated = 'not-authenticated',
    authenticated = 'authenticated'
}

const initialState: AuthState = {
    status: AuthStatus.checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {}, 

    logout: (state, action) => {},

    checkingCredentials: (state, action) => {}
  },
})

// Exportamos las acciones, para que puedan ser usadas en el componente
export const { login, logout, checkingCredentials } = authSlice.actions

export default authSlice.reducer