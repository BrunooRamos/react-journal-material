import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { LoginUserProps, RegisterUserProps } from '../interfaces';
import { FirebaseAuth } from './config';
import { refactorErrorAuthMessages } from '../../helpers';

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider ); // signInWithPopup is a function that allows the user to sign in with a popup
        
        const { displayName, email, photoURL, uid } = result.user; // result.user is the user object that contains the user's information

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = refactorErrorAuthMessages( errorCode );

        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: RegisterUserProps) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );

        const { uid, photoURL } = resp.user;

        await updateProfile( resp.user, { displayName } );  // Firebase.currentUser is the user object that contains the user's information and could be nu

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = refactorErrorAuthMessages( errorCode );

        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const loginUserWithEmailPassword = async ({ email, password }: LoginUserProps) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );

        const { displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            displayName, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = refactorErrorAuthMessages( errorCode );

        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const logoutFirebase = async () => {
    await signOut( FirebaseAuth );  
}