import Link from 'next/link';
import styles from './LessonsSection.module.css';

interface Lesson {
    category: string;
    title: string;
}

const lessons: Lesson[] = [
    { category: 'Code', title: 'Leçon 1' },
    { category: 'Réseaux', title: 'Leçon 2' },
    { category: 'Social', title: 'Leçon 3' }
];

const LessonsSection: React.FC = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle} id="section-title">
                Nos Leçons
            </h2>
            <div className={styles.cardContainer}>
                {lessons.map((lesson, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.etiquette}>{lesson.category}</div>
                        <h3 className={styles.cardTitle}>{lesson.title}</h3>
                        <p className={styles.cardText}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <Link href="/lecons" className={styles.cardLink}>
                            Voir plus
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LessonsSection;