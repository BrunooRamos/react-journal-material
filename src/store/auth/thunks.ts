import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, resetPasswordWithEmail, signInWithGoogle } from '../../auth/firebase/providers';
import { ForgotPasswordForm, LoginUserProps, RegisterUserProps } from '../../auth/interfaces';
import { AppDispatch } from '../store';
import { onCheckingCredentials, onLogin, onLogout } from './authSlice';


export const checkingAuthentication = () => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( onCheckingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( onCheckingCredentials() );

        const result = await signInWithGoogle();

        if ( !result.ok ) return dispatch( onLogout( result ) );

        dispatch( onLogin( result ) );
    }
}

export const startRegisterUserWithEmailPassword = ({ email, password, displayName }: RegisterUserProps) => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( onCheckingCredentials() );

        const result = await registerUserWithEmailPassword({ email, password, displayName });

        if ( !result.ok ) return dispatch( onLogout( result ) );

        dispatch( onLogin( result ) );
    }
}


export const startLoginWithEmailPassword = ({ email, password }: LoginUserProps) => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( onCheckingCredentials() );

        const result = await loginUserWithEmailPassword({ email, password });

        if ( !result.ok ) return dispatch( onLogout( result ) );

        dispatch( onLogin( result ) );
    }
}


export const startResetPasswordWithEmail = ({ email }: ForgotPasswordForm) => {
    return async ( dispatch: AppDispatch ) => {
        await resetPasswordWithEmail( email );
    }
}

export const startLogout = () => {
    return async ( dispatch: AppDispatch ) => {
        await logoutFirebase();
        dispatch( onLogout({  errorMessage: null }) ); 
    }
}