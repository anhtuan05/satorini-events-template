import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../configFirebase"

export const loginAdmin = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error("Invalid email or password.");
    }
};

export const logoutAdmin = async () => {
    await signOut(auth);
};

export const checkAuthState = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
