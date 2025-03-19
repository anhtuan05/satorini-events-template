"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, PhoneCall } from "lucide-react";
import styles from "./contactInformation.module.css";

export default function ContactInformation() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.container}
        >
            <div className={styles.card}>
                <h2 className={styles.title}>Contact Information</h2>
                <div className={styles.info}>
                    <div className={styles.item}>
                        <MapPin className={styles.icon} size={36} />
                        <span>220/50A/41C Xô Viết Nghệ Tĩnh, P.21, Bình Thạnh, TP.HCM</span>
                    </div>
                    <div className={styles.item}>
                        <Mail className={styles.icon} size={20} />
                        <a href="mailto:hdr.santorini@gmail.com" className={styles.link}>
                            hdr.santorini@gmail.com
                        </a>
                    </div>
                    <div className={styles.item}>
                        <PhoneCall className={styles.icon} size={20} />
                        <a href="tel:0961628923" className={styles.link}>
                            0961 628 923 (Mr. Jason Nguyễn)
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546.6452530275888!2d106.7096133745175!3d10.798243858792011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528afe6f08cb5%3A0x75b263daa0c20779!2zMjIwLzUwQSBYw7QgVmnhur90IE5naOG7hyBUxKluaCwgUGjGsOG7nW5nIDE5LCBCw6xuaCBUaOG6oW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1741499756899!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                ></iframe>

            </div>
        </motion.div>
    );
}
