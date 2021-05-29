import { auth } from '../services/firebase'

export function signUp(email: string, password: string) {
    return auth().createUserWithEmailAndPassword(email, password)
}

export function signIn(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password)
}

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider()
    return auth().signInWithPopup(provider)
}