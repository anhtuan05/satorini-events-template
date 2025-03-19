"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { checkAuthState, loginAdmin, logoutAdmin } from "./firebaseAuth";
import { auth } from "../configFirebase";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = checkAuthState(setUser);
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const loggedInUser = await loginAdmin(email, password);
        setUser(loggedInUser);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            throw error;
        }
    };


    const logout = async () => {
        await logoutAdmin();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
