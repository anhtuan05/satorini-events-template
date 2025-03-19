"use client";

import { useCallback } from 'react';
import { CircleChevronDown  } from 'lucide-react';
import styles from './scrollDownButton.module.css';

export default function ScrollDownButton() {
    const handleScroll = useCallback(() => {
        window.scrollBy({
            top: 700,
            behavior: 'smooth',
        });
    }, []);

    return (
        <button className={styles.scrollDownButton} onClick={handleScroll}>
            <CircleChevronDown  className={styles.arrow} />
        </button>
    );
}
