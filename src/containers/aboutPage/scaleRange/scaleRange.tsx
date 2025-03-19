"use client"

import styles from "./scaleRange.module.css";
import { motion } from "framer-motion";

export default function ScaleRange() {
    return (
        <section className={styles.scale}>
            <h2>Event Scale</h2>
            <div className={styles.range}>
                <span>20 People</span>
                <div className={styles.bar}>
                    <motion.div
                        className={styles.fill}
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                <span>1000+ Guests</span>
            </div>
        </section>
    );
}
