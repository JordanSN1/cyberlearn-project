'use client'

import { useTypewriter } from 'react-simple-typewriter';
import { ChevronDown } from 'lucide-react';
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
        typeSpeed: 50,
        deleteSpeed: 10,
        delaySpeed: 1500
    });

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const section = document.getElementById('section-title');
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.hero}>
            <div className={styles.accroche}>
                <div className={styles.textEntete}>
                    <h1 className={styles.entete}>{text}</h1>
                    <a
                        href="#section-title"
                        className={styles.more}
                        onClick={scrollToSection}
                    >
                        <span>
                            VOIR PLUS
                            <ChevronDown size={20} />
                        </span>
                    </a>
                </div>
                <div className={styles.logoContainer}>
                    <Image
                        src={whiteLogo}
                        alt="Logo Blanc cyberLearn"
                        className={styles.logoEntete}
                        width={450}
                        height={450}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;