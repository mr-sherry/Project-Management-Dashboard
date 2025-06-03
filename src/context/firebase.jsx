import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, query, where } from 'firebase/firestore'

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
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)


/////////////////////////////////////////functions here////////////////////////////////////////
export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);


    ////////////////////////////////////////////////userget///////////////////////////////////////

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null)
        })
    }, [])


    /////////////////////////////////////////////signup//////////////////////////////////////////////////////

    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    /////////////////////////////////////////////signin//////////////////////////////////////////////

    const signinUserWithEmailAndPass = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return { success: true, data: userCredential };
        } catch (error) {
            console.error("Firebase SignIn Error:", error.message);
            return { success: false, error: error.message };
        }
    };
    console.log("🚀 ~ FirebaseProvider ~ user:", user)


    ///////////////////////////////create new profile////////////////////////////////////////////////////

    const handleCreateNewProfile = async (userId, name, age, location, email, phone, website, github, linkedin, tagline, bio, about) => {

        await addDoc(collection(firestore, 'userProfiles'), {
            userId, name, age, location, email, phone, website, github, linkedin, tagline, bio, about
        })
    }

    const updateUserProfile = async (uid, name, age, location, email, phone, website, github, linkedin, tagline, bio, about) => {
        try {
            // Step 1: Get all documents from 'userProfiles'
            const querySnapshot = await getDocs(collection(firestore, 'userProfiles'));

            // Step 2: Find the doc with matching userName
            const targetDoc = querySnapshot.docs.find(doc => doc.data().userId === uid);
            console.log("🚀 ~ updateUserProfile ~ targetDoc:", targetDoc)

            // Step 3: Update the document
            const docRef = targetDoc.ref;
            await updateDoc(docRef, { uid, name, age, location, email, phone, website, github, linkedin, tagline, bio, about });

            console.log(`Profile updated successfully for ${name}`);
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    }
    ///////////////////////////////////////addPrject////////////////////////////////////////

    const addNewProject = async (userId, projectData) => {
        try {
            const docRef = await addDoc(collection(firestore, 'userProjects'), {
                userId,
                ...projectData, // flatten the data
                createdAt: new Date(),
                projectId: Date.now()
            });
            console.log("New project added with ID:", docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Error adding new project:", error.message);
            return { success: false, error: error.message };
        }
    };


    const updateProjectByUserIdAndProjectId = async (userId, projectId, updatedFields) => {
        try {
            const q = query(
                collection(firestore, "userProjects"),
                where("userId", "==", userId),
                where("projectId", "==", projectId)
            );

            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.warn("❗ No matching project found.");
                return { success: false, message: "No project found with this userId and projectId." };
            }

            const docRef = doc(firestore, "userProjects", snapshot.docs[0].id);
            await updateDoc(docRef, updatedFields);

            console.log("✅ Project updated successfully.");
            return { success: true };
        } catch (error) {
            console.error("❌ Error updating project:", error.message);
            return { success: false, error: error.message };
        }
    };






    /////////////////////////////////////////getprofiles//////////////////////////////////////

    const getUserProfile = () => {
        return getDocs(collection(firestore, 'userProfiles'));
    }
    const getUserProjects = () => {
        return getDocs(collection(firestore, 'userProjects'));
    }


    /////////////////////////////////////logouut///////////////////////////////////////////////
    const logoutUser = async () => {
        try {
            await signOut(firebaseAuth);
            console.log("User signed out successfully");
        } catch (error) {
            console.error("Sign out error:", error.message);
        }
    };


    return <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPass, handleCreateNewProfile, updateUserProfile, getUserProfile, logoutUser, addNewProject, getUserProjects, updateProjectByUserIdAndProjectId, user }}>{props.children}</FirebaseContext.Provider>
};
