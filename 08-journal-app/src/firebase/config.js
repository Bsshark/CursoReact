// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers";

/* console.log(process.env); */
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyCzQ8mZwtq_8ph-vl-8FE_GLcwbJ3D2Lek",
  authDomain: "react-cursos-9dcaf.firebaseapp.com",
  projectId: "react-cursos-9dcaf",
  storageBucket: "react-cursos-9dcaf.appspot.com",
  messagingSenderId: "821684381528",
  appId: "1:821684381528:web:6671bab610654820fb672d"
}; */

//Testing
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

/* const firebaseConfig = {
  apiKey: "AIzaSyCEpxR531hbV9b_8yAotY2lhxeE6pk1HFA",
  authDomain: "react-cursos-b8ca2.firebaseapp.com",
  projectId: "react-cursos-b8ca2",
  storageBucket: "react-cursos-b8ca2.appspot.com",
  messagingSenderId: "224894344511",
  appId: "1:224894344511:web:1a3bb92fa7631683ca478a"
}; */

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);