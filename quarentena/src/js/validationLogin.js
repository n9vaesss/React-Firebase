import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../connection/firebaseConnection'

export default function validationLogin() {

    async function checkLogin() {
        await onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = '/';
            }
        })
    }
    checkLogin()
}