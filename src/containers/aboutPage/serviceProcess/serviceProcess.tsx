"use client"

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import styles from "./serviceProcess.module.css";

const steps = [
    { title: "Receive Request", description: "Listen and record customer information." },
    { title: "Consultation & Proposal", description: "Provide creative ideas that match customer needs." },
    { title: "Plan & Sign Contract", description: "Create a detailed plan and sign the contract." },
    { title: "Execution & Event Organization", description: "Execute the plan, ensuring a smooth event." },
    { title: "Summary & Post-Event Report", description: "Evaluate results and provide a detailed report." }
];

export default function ServiceProcess() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <section ref={ref} className={styles.process}>
            <h2>Service Process</h2>
            <div className={styles.timeline}>
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={styles.step}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                    >
                        <div className={styles.number}>{index + 1}</div>
                        <p>{step.title}</p>
                        {hoveredStep === index && (
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step.description}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
