// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA_zFYntmdaNbJ0nmoT87jPGqyWw-zTzs",
  authDomain: "pokeapi-5c1cd.firebaseapp.com",
  projectId: "pokeapi-5c1cd",
  storageBucket: "pokeapi-5c1cd.appspot.com",
  messagingSenderId: "602412480988",
  appId: "1:602412480988:web:73ca9611a14ccfa0e83719"
};

// Initialize Firebase
const firebaseApp= initializeApp(firebaseConfig);

export default firebaseApp;