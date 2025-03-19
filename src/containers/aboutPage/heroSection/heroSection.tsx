"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styles from "./heroSection.module.css";
import { getImages } from "@/services/fireBase/adminServices/dbServices";

export default function HeroSection() {
    const bannerRef = useRef<HTMLDivElement>(null);
    const [bgImgLight, setBgImgLight] = useState<string>("");
    const [bgImgDark, setBgImgDark] = useState<string>("");

    useEffect(() => {
        gsap.fromTo(bannerRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        async function fetchImages() {
            const fetchedImages = await getImages();
            const lightImage = fetchedImages.find(img => img.tagname === "aboutus-banner-light");
            const darkImage = fetchedImages.find(img => img.tagname === "aboutus-banner-dark");

            if (lightImage) setBgImgLight(lightImage.file);
            if (darkImage) setBgImgDark(darkImage.file);
        }

        fetchImages();
    }, []);

    return (
        <section
            ref={bannerRef}
            className={styles.hero}
            style={{
                "--hero-bg-dark": `url(${bgImgDark})`,
                "--hero-bg-light": `url(${bgImgLight})`,
            } as React.CSSProperties}
        >
            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                About Us
            </motion.h1>
            <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                Professional - Creative - All-in-One Service
            </motion.p>
        </section>
    );
}