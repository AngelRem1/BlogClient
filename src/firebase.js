// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPNI6PsluUaSseiAdkv2iGNZex65TKVxY",
  authDomain: "blog-project-acd22.firebaseapp.com",
  projectId: "blog-project-acd22",
  storageBucket: "blog-project-acd22.appspot.com",
  messagingSenderId: "367406099247",
  appId: "1:367406099247:web:d01278959e821e7bab8fda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
