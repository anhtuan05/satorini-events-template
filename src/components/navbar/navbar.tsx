"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import ThemeToggle from "../themeToggle/themeToggle";
import logosantorini from '../images/logo-santorini.jpg';
import styles from "./navbar.module.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const logoRef = useRef(null);
    const navLinksRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setIsOpen(false);  // Đóng menu khi chuyển trang

        // GSAP animation (Logo bay từ trái vào)
        gsap.fromTo(logoRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // GSAP animation (Link fade-in theo thứ tự)
        if (navLinksRef.current) {
            const links = navLinksRef.current.querySelectorAll("li");
            gsap.fromTo(links,
                { y: -50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.15,
                    ease: "power2.out"
                }
            );
        }
    }, [pathname]);  // Chạy lại mỗi khi đổi trang

    return (
        <nav className="border-b-2 border-[var(--primaryBorder)] p-4" style={{ background: "var(--sectionHeader)" }}>
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1 text-right">
                    <Link href="/">
                        <Image
                            ref={logoRef}
                            src={logosantorini}
                            alt="Logo"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </Link>
                </div>

                <button
                    className="md:hidden text-[var(--primaryText)]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <ul
                    ref={navLinksRef}
                    className={`absolute md:static left-0 w-full md:w-auto md:flex 
                      flex-col md:flex-row items-center md:gap-8 gap-4 md:bg-transparent 
                      transition-all duration-300 shadow-lg md:shadow-none p-4 md:p-0 rounded-lg z-50 
                      ${isOpen ? "top-24 opacity-100 space-y-4 p-4" : "top-[-300px] opacity-0 md:opacity-100 md:top-0"
                        }`}
                    style={{ background: "var(--sectionHeader)", paddingLeft: "20px" }}>
                    <li><Link href="/" className={styles.navLink}>HOME</Link></li>
                    <li><Link href="/about" className={styles.navLink}>ABOUT US</Link></li>
                    <li><Link href="/contact" className={styles.navLink}>CONTACT</Link></li>
                    <li><ThemeToggle /></li>
                </ul>
            </div>
        </nav>
    );
}
