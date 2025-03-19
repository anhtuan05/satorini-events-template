import { ReactNode } from "react";
import Header from "@/containers/header/header";
import Footer from "@/containers/footer/footer";


interface CustomerLayoutProps {
    children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
