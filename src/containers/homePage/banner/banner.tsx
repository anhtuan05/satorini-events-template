"use client";

import styles from "./banner.module.css";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import RoundedButton from "@/components/button/roundedButton/roundedButton";
import ScrollDownButton from "@/components/button/flatButton/scrollDownButton";
import { getImages } from "@/services/fireBase/adminServices/dbServices";

interface BannerProps {
    title: string;
    content: string;
}

export default function Banner({ title, content }: BannerProps) {
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
            const images = await getImages();
            const lightImage = images.find(img => img.tagname === "home-banner-light");
            const darkImage = images.find(img => img.tagname === "home-banner-dark");

            if (lightImage) setBgImgLight(lightImage.file);
            if (darkImage) setBgImgDark(darkImage.file);
        }

        fetchImages();
    }, []);

    return (
        <div
            ref={bannerRef}
            className={styles.banner}
            style={{
                '--bg-img-light': `url(${bgImgLight})`,
                '--bg-img-dark': `url(${bgImgDark})`,
            } as React.CSSProperties}
        >
            <h1>{title}</h1>
            <p>{content}</p>
            <ScrollDownButton />
            <div className={styles["banner-buttons"]}>
                <RoundedButton href="/about" label="About Us" effect="scale" />
                <RoundedButton href="/contact" label="Contact" effect="scale" />
            </div>
        </div>
    );
}
