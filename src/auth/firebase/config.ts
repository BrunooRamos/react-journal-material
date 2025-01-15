// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyCnp96-UWjY0vlfiGSzo5fNNpng2kB9vMU",
    authDomain: "react-course-4d572.firebaseapp.com",
    projectId: "react-course-4d572",
    storageBucket: "react-course-4d572.firebasestorage.app",
    messagingSenderId: "772466231997",
    appId: "1:772466231997:web:88a5cd02aebce7a75985d4"
};
  
// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );