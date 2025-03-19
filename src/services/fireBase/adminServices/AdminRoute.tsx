"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return user ? <>{children}</> : null;
}
