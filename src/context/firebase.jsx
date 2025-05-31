import { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCq3FOvIqYPxmyAvZqjZQjl4TGD61Vc918",
    authDomain: "first-project-2fae9.firebaseapp.com",
    projectId: "first-project-2fae9",
    storageBucket: "first-project-2fae9.firebasestorage.app",
    messagingSenderId: "71884325270",
    appId: "1:71884325270:web:9e0c48d068d25bee999db7"
};

export const useFirebase = () => {
    return useContext(FirebaseContext);
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)

export const FirebaseProvider = (props) => {


    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinUserWithEmailAndPass = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return { success: true, data: userCredential };
        } catch (error) {
            console.error("Firebase SignIn Error:", error.message);
            return { success: false, error: error.message };
        }
    };



    return <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPass }}>{props.children}</FirebaseContext.Provider>
};
