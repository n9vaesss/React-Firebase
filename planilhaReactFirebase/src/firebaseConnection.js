import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAgClGfGDfiI-W2a0cGrB6lLE7fkAg-NkE",
    authDomain: "testeplanilha-7bff8.firebaseapp.com",
    databaseURL: "https://testeplanilha-7bff8-default-rtdb.firebaseio.com",
    projectId: "testeplanilha-7bff8",
    storageBucket: "testeplanilha-7bff8.appspot.com",
    messagingSenderId: "679546509586",
    appId: "1:679546509586:web:42fd06f90ca617972cfbcb",
    measurementId: "G-RENWT7KX54"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export {db}