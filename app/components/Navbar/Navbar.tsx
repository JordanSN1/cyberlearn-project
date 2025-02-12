// components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "@/public/Images/White_log.png";
import AuthButton from "@/app/components/Navbar/AuthButton";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Home"
                        className={styles.homeImage}
                        width={110}
                        height={40}
                        priority
                        style={{ objectFit: "contain" }}
                    />
                </Link>
            </div>

            {/* Menu Burger (Mobile) */}
            <button className={styles.burgerMenu} onClick={toggleMenu}>
                <div className={styles.burgerLine}></div>
                <div className={styles.burgerLine}></div>
                <div className={styles.burgerLine}></div>
            </button>

            {/* Liens et Menu Utilisateur */}
            <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
                <Link href="/lessons" className={styles.link}>
                    Lessons
                </Link>
                <Link href="/partenaires" className={styles.link}>
                    Partenaires
                </Link>
                <Link href="/contact" className={styles.link}>
                    Contact
                </Link>
                <Link href="/about" className={styles.link}>
                    About
                </Link>

                {/* Composant dynamique pour la connexion */}
                <AuthButton />
            </div>
        </nav>
    );
};

export default Navbar;
