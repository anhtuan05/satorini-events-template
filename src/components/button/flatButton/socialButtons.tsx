import styles from './socialButtons.module.css';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function SocialButtons() {
    return (
        <div className={styles.floatingSocialButtons}>
            <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.facebook}`}
            >
                <span className={styles.tooltip}>Facebook</span>
                <Facebook className={styles.icon} />
            </a>
            <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.instagram}`}
            >
                <span className={styles.tooltip}>Instagram</span>
                <Instagram className={styles.icon} />
            </a>
            <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.youtube}`}
            >
                <span className={styles.tooltip}>YouTube</span>
                <Youtube className={styles.icon} />
            </a>
        </div>
    );
}
