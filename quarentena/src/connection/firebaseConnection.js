import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDrKwe_nrhrGVZaM_wbxJbxKV1TBDnRyY8",
    authDomain: "quarentena-3d8f2.firebaseapp.com",
    projectId: "quarentena-3d8f2",
    storageBucket: "quarentena-3d8f2.appspot.com",
    messagingSenderId: "695175315382",
    appId: "1:695175315382:web:dd6eccc60198468b278b17",
    measurementId: "G-247TXJ8K25"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {db, auth}