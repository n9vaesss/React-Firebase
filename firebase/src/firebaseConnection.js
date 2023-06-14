import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAUzCsCkzYX49dzUt8HFK8G0W1vpHUH4vM",
    authDomain: "curso-8838e.firebaseapp.com",
    projectId: "curso-8838e",
    storageBucket: "curso-8838e.appspot.com",
    messagingSenderId: "172725761908",
    appId: "1:172725761908:web:46ff980ff6282cafb51e21",
    measurementId: "G-RN0F7ERJHL"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }