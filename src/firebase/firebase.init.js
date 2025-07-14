// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//danger
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByfbQjjiPgAESPRsRnaaGebUWaq02P4kA",
  authDomain: "roommate-auth-intregation.firebaseapp.com",
  projectId: "roommate-auth-intregation",
  storageBucket: "roommate-auth-intregation.firebasestorage.app",
  messagingSenderId: "254765588959",
  appId: "1:254765588959:web:273eb05717cb9a375c246a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);