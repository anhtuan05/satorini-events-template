import RoundedButton from '@/components/button/roundedButton/roundedButton';
import styles from './contactBanner.module.css';

export default function ContactBanner() {
    return (
        <section className={styles.contact}>
            <h2>Start Your Idea Now</h2>
            <p>With Our Professional Team</p>
            <RoundedButton label='Contact Us' effect='scale' href='/contact'/>
        </section>
    );
}
