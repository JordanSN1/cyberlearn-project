'use client'
    import { useTypewriter } from 'react-simple-typewriter';
    import styles from './Hero.module.css';
    import Image from 'next/image';
    import whiteLogo from '@/public/Images/White_log.png';
    import React from "react";

    const Hero: React.FC = () => {
        const [text] = useTypewriter({
            words: [
                'CyberLearn : Votre guide essentiel pour maîtriser la cybersécurité.',
                'Des professionnels de la cybersécurité à votre service.'
            ],
            loop: true,
            deleteSpeed: 10,
            delaySpeed: 40
        });

        return (
            <nav className={styles.accroche}>
                <h1 id="entete" className={styles.entete}>{text}</h1>
                <Image
                    src={whiteLogo}
                    alt="Logo Blanc cyberLearn"
                    className={styles.logoEntete}
                    width={450}
                    height={450}
                    priority
                />
                <a href="#section-title" className={styles.more}>
                    VOIR PLUS <span> &gt;</span>
                </a>
            </nav>
        );
    };

    export default Hero;