"use client";

import { motion } from "framer-motion";
import styles from "./companyIntro.module.css";

interface CompanyIntroProps {
    bgImgLight: string;
    bgImgDark: string;
}

export default function CompanyIntro({ bgImgLight, bgImgDark }: CompanyIntroProps) {
    return (
        <section
            className={styles.intro}
            data-theme="light"
            style={
                {
                    "--bg-img-light": `url(${bgImgLight})`,
                    "--bg-img-dark": `url(${bgImgDark})`,
                } as React.CSSProperties
            }
        >
            <div className={styles.text}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    About the Company
                </motion.h2>
                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Santorini Corp is a company from the Western world, bringing a fresh breeze to Vietnam through the refined expression of cultural and spiritual values in every event we deliver to you.

                    We cater to all needs: individuals, organizations, and businesses.
                </motion.p>
            </div>
            <motion.div
                className={styles.image}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            />
        </section>
    );
}
