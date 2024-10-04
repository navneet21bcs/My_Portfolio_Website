import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase, get,ref, set, onValue } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyBqGBDAXufiLpCU557nOnOmEmuSptYsh1E",
//   authDomain: "alpaago-609eb.firebaseapp.com",
//   databaseURL: "https://saurabh-portfolio-9a2e0-default-rtdb.firebaseio.com/",
//   projectId: "alpaago-609eb",
//   storageBucket: "alpaago-609eb.appspot.com",
//   messagingSenderId: "817616629388",
//   appId: "1:817616629388:web:d6edd005b00769168815a9",
//   measurementId: "G-NFE9BSQ49N",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const useFireBase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupWithGoogle = () => {
   return  signInWithPopup(firebaseAuth, googleProvider);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
    });

    // alert("bhai dekh yaar " + process.env.REACT_APP_FIREBASE_API_KEY)

    return () => unsubscribe();
  }, []);

  const logout = () => {
    
    signOut(firebaseAuth);
  };

  const addUserInfo = (uid, userInfo) => {
    const userRef = ref(database, `users/${uid}`);
    set(userRef, userInfo);
  };
  const signupUserWithEmailandPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log("User signed up successfully");
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  };

  const signInUserWithEmailandPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error during sign in:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const isLoggedIn = user ? true : false;

  const putData = (key, data) => set(ref(database, key), data);  

  const getData = async (path) => {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    return snapshot.val();
  };
  // Inside FirebaseProvider
  const updateUserStatus = async (uid, newStatus) => {
    const userRef = ref(database, `users/${uid}`);
    await set(userRef, { status: newStatus }, { merge: true });
  };
  

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailandPassword,
        signInUserWithEmailandPassword,
        putData,
        getData,
        signupWithGoogle,
        isLoggedIn,
        logout,
        database,
        addUserInfo,
        updateUserStatus,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
