import { Facebook, Instagram, Youtube } from 'lucide-react';
import styles from "./footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <h2 className={styles.companyName}>SANTORINI JOINT STOCK COMPANY</h2>
                    <p>220/50A/41C Xo Viet Nghe Tinh, Ward 21, Binh Thanh District, Ho Chi Minh City, Vietnam</p>
                    <p><a href="mailto:hdr.santorini@gmail.com">Email: hdr.santorini@gmail.com</a></p>
                    <p>Phone number: 0961 628 923 ( Mr. Jason Nguyễn )</p>
                </div>

                <div className={styles.policySection}>
                    <h3>Policies</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div className={styles.socialSection}>
                    <h3>Connect with us</h3>
                    <div className={styles.socialIcons}>
                        <a href="https://www.facebook.com/hrd.santorini" target="_blank" aria-label="Facebook">
                            <Facebook />
                        </a>
                        <a href="#" target="_blank" aria-label="Instagram">
                            <Instagram />
                        </a>
                        <a href="#" target="_blank" aria-label="YouTube">
                            <Youtube />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
