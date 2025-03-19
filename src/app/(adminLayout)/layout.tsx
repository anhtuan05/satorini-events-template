import { AuthProvider } from "@/services/fireBase/adminServices/AuthContext";
import { ReactNode } from "react";


interface CustomerLayoutProps {
    children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
    return (
        <div>
            <AuthProvider>{children}</AuthProvider>
        </div>
    );
}
