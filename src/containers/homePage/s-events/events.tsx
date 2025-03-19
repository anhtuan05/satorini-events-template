"use client"

import { useState, useEffect } from 'react';
import styles from "./events.module.css";
import { getProjects } from '@/services/fireBase/adminServices/dbServices';
import { motion } from 'framer-motion';
import RoundedButton from '@/components/button/roundedButton/roundedButton';
import { Project } from '@/services/fireBase/adminServices/type';

export default function Events() {
    const [filter, setFilter] = useState<string>('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProjects() {
            setLoading(true);
            try {
                const projectsData = await getProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
            setLoading(false);
        }
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.status === filter);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const formatDay = (dateString: string) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.projectsContainer}>
            <h2>Our Events</h2>
            {/* Tab Filter */}
            <div className={styles.tabs}>
                {["all", "coming soon", "finished", "currently"].map(status => (
                    <button
                        key={status}
                        className={`${styles.tab} ${filter === status ? styles.active : ''}`}
                        onClick={() => setFilter(status)}
                    >
                        {status.toUpperCase()}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading events...</p>
            ) : (
                <div className={styles.grid}>
                    {filteredProjects.map(project => (
                        <motion.div
                            key={project.id}
                            className={styles.projectCard}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className={styles.imageWrapper}>
                                <img src={project.file} alt={project.title} className={styles.projectImage} />
                                <div className={styles.overlay}>
                                    <h3>{project.title}</h3>
                                    <p>{project.content}</p>
                                    <p><strong>Start:</strong> {formatDay(project.start_date)}</p>
                                    <p><strong>End:</strong> {formatDay(project.end_date)}</p>
                                    <RoundedButton label="Buy Tickets" effect="pulse" href={project.linking} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
