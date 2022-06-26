// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpM339Dk1wuNqz3x20B9xuDpL7aB0piXo",
  authDomain: "popcorncito-9db1f.firebaseapp.com",
  projectId: "popcorncito-9db1f",
  storageBucket: "popcorncito-9db1f.appspot.com",
  messagingSenderId: "934500517048",
  appId: "1:934500517048:web:007911a4158e714984a04d"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
export const auth = firebase.auth();