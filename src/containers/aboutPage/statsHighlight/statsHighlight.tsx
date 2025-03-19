import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./statsHighlight.module.css";

const stats = [
    { label: "Events", value: 200 },
    { label: "Clients", value: 150 },
    { label: "Partners", value: 50 }
];

export default function StatsHighlight() {
    return (
        <section className={styles.stats}>
            {stats.map((stat, index) => (
                <StatCard key={index} label={stat.label} value={stat.value} />
            ))}
        </section>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = Math.ceil(value / (duration / 30));

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <motion.div
            className={styles.stat}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h3>{count}+</h3>
            <p>{label}</p>
        </motion.div>
    );
}
