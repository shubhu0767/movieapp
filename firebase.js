import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5nXBUkBPn-bXCf_q4kdN5FXZjbrZ6Mbs",
  authDomain: "movie-app-7b35c.firebaseapp.com",
  projectId: "movie-app-7b35c",
  storageBucket: "movie-app-7b35c.appspot.com",
  messagingSenderId: "705271761670",
  appId: "1:705271761670:web:a7aea792fadecf13c06c87",
  measurementId: "G-6DKDGQ2JMD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Authencation

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    // console.log(response);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const docRef = await doc(collection(db, "users"), user.uid);
      await setDoc(docRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log("firebase file response",response);
    const user = response.user;
    user.displayName = name;

    const docRef = await doc(collection(db, "users"), user.uid);
    const dataDoc = await setDoc(docRef, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email); //we resent email with code
    alert("Password reset link sent to your Register E-mail Id");
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
