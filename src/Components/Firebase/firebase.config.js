// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// import firebase from "firebase/compat/app"
// import "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaenNcyoL22EpAkYNMjAPrHGVdxRrSpPQ",
    authDomain: "full-stack-assignment-64ea9.firebaseapp.com",
    projectId: "full-stack-assignment-64ea9",
    storageBucket: "full-stack-assignment-64ea9.appspot.com",
    messagingSenderId: "801325075237",
    appId: "1:801325075237:web:c8e26d2fea600f5e4268cc"
};

// Initialize Firebase
// const fireDb = firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export default fireDb.database().ref();


