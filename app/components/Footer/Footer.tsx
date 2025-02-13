// components/Footer/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import logo from '../../../public/Images/White_log.png';
import TwitterIcon from '../../../public/Images/x.svg';
import LinkedinIcon from '../../../public/Images/linkedin.svg';
import InstagramIcon from '../../../public/Images/instagram.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Section Logo et Description */}
                <div className={styles.footerSection}>
                    <Image
                        src={logo}
                        alt="CyberLearn Logo"
                        className={styles.footerLogo}
                        width={160}
                        height={60}
                        style={{ objectFit: 'contain', cursor: 'pointer', width: '100px', height: '100px' }}

                    />
                    <p className={styles.footerText}>
                        La plateforme de cours en ligne pour apprendre la cybersécurité.
                    </p>
                </div>

                {/* Section Liens Utiles */}
                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Services</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/LessonsSection" className={styles.footerLink}>Cours</Link></li>
                        <li><Link href="/partenaires" className={styles.footerLink}>Partenariats</Link></li>
                        <li><Link href="/about" className={styles.footerLink}>À propos</Link></li>
                        <li><Link href="/contact" className={styles.footerLink}>Support</Link></li>
                    </ul>
                </div>

                {/* Section Contact */}
                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Contact</h4>
                    <ul className={styles.contactList}>
                        <li>contact@cyberlearn.com</li>
                        <li>+33 1 23 45 67 89</li>
                        <li>Paris, France</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Newsletter</h4>
                    <form className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Votre email"
                            className={styles.newsletterInput}
                        />
                        <button type="submit" className={styles.newsletterButton}>
                            S&apos;abonner
                        </button>
                    </form>
                </div>
            </div>

            {/* Barre de Copyright */}
            <div className={styles.copyrightBar}>
                <p>© 2024 CyberLearn. Tous droits réservés.</p>
                <div className={styles.socialLinks}>
                    <Link href="#" aria-label="Twitter">
                        <Image
                            src={TwitterIcon}
                            alt="Twitter"
                            className={styles.socialIcon}
                            width={24}
                            height={24}
                            style={{ backgroundColor: 'white', borderRadius: '50%' }}
                        />
                    </Link>
                    <Link href="#" aria-label="LinkedIn">
                        <Image
                            src={LinkedinIcon}
                            alt="LinkedIn"
                            className={styles.socialIcon}
                            width={24}
                            height={24}
                            style={{ backgroundColor: 'white', borderRadius: '5px' }}                        />
                    </Link>
                    <Link href="#" aria-label="Instagram">
                        <Image
                            src={InstagramIcon}
                            alt="Instagram"
                            className={styles.socialIcon}
                            width={24}
                            height={24}

                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;