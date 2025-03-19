"use client";
import { useAuth } from "@/services/fireBase/adminServices/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function AdminLogin() {
    const { login, loginWithGoogle } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError("");

        try {
            await loginWithGoogle();
            router.push("/dashboard");
        } catch (err) {
            setError("Google login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className={`w-full p-2 rounded flex justify-center items-center text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
                >
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : "Login"}
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full p-2 mt-3 rounded bg-red-500 text-white flex justify-center items-center"
                >
                    Sign in with Google
                </button>
            </form>
        </div>
    );
}
