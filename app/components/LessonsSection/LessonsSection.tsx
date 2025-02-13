"use client";

import { Code, Network, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import styles from './LessonsSection.module.css';
import { JSX } from "react";

interface Lesson {
    category: string;
    title: string;
    description: string;
    icon: JSX.Element;
}

const lessons: Lesson[] = [
    {
        category: 'Code',
        title: 'Introduction à la Programmation',
        description: 'Apprenez les bases de la programmation avec des exercices pratiques et des projets réels.',
        icon: <Code />,
    },
    {
        category: 'Réseaux',
        title: 'Architecture des Réseaux',
        description: 'Découvrez comment fonctionnent les réseaux informatiques et l\'infrastructure d\'Internet.',
        icon: <Network />,
    },
    {
        category: 'Social',
        title: 'Impact Social du Numérique',
        description: 'Explorez l\'influence de la technologie sur la société et les enjeux éthiques.',
        icon: <Users />,
    },
    {
        category: 'Ressources',
        title: 'Bibliothèque Numérique',
        description: 'Accédez à une collection complète de ressources pédagogiques et tutoriels.',
        icon: <BookOpen />,
    },
];

const LessonsSection = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Nos Leçons
            </h2>
            <div className={styles.cardContainer}>
                {lessons.map((lesson, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.etiquette}>
                                {lesson.icon}
                                {lesson.category}
                            </div>
                            <h3 className={styles.cardTitle}>{lesson.title}</h3>
                        </div>
                        <p className={styles.cardText}>
                            {lesson.description}
                        </p>
                        <div className={styles.cardFooter}>
                            <Link href="/lecons" className={styles.cardLink}>
                                Voir plus
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LessonsSection;