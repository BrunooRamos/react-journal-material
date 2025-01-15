import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from './useReduxConfig';
import { FirebaseAuth } from '../auth/firebase/config';
import { onLogin, onLogout } from '../store/auth/authSlice';


export const useCheckAuth = () => {
  
    const { status } = useAppSelector( state => state.auth );
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user ) return dispatch( onLogout( { errorMessage: null } ) );

        const { uid, email, displayName, photoURL } = user;
        dispatch( onLogin({ uid, email, displayName, photoURL }) );
        })
    }, []);

    return status;
}