'use client'

import { useTypewriter } from 'react-simple-typewriter';
import { ChevronDown, Shield, Lock, BookOpen, Users } from 'lucide-react';
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
            <div className={styles.heroBackground} />
            <div className={styles.accroche}>
                <div className={styles.textEntete}>
                    <h1 className={styles.entete}>{text}</h1>
                    <p className={styles.subtitle}>
                        Découvrez notre plateforme d'apprentissage en cybersécurité,
                        conçue pour vous accompagner dans votre formation.
                    </p>
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <Shield size={24} />
                            <span>Sécurité</span>
                        </div>
                        <div className={styles.feature}>
                            <Lock size={24} />
                            <span>Protection</span>
                        </div>
                        <div className={styles.feature}>
                            <BookOpen size={24} />
                            <span>Apprentissage</span>
                        </div>
                        <div className={styles.feature}>
                            <Users size={24} />
                            <span>Communauté</span>
                        </div>
                    </div>
                    <a
                        href="#section-title"
                        className={styles.more}
                        onClick={scrollToSection}
                    >
                        <span>
                            Découvrir nos leçons
                            <ChevronDown size={20} />
                        </span>
                    </a>
                </div>
                <div className={styles.logoContainer}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src={whiteLogo}
                            alt="Logo Blanc cyberLearn"
                            className={styles.logoEntete}
                            width={450}
                            height={450}
                            priority
                        />
                        <div className={styles.glowEffect} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;