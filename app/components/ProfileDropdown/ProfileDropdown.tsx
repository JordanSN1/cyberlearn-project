"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import styles from "./ProfileDropdown.module.css";

interface ProfileDropdownProps {
    isVisible: boolean;
    onClose: () => void;
}

const ProfileDropdown = ({ isVisible, onClose }: ProfileDropdownProps) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/login');
            onClose();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownContent}>
                <Link href="/profile" className={styles.dropdownItem}>
                    Mon Profil
                </Link>
                <Link href="/settings" className={styles.dropdownItem}>
                    Paramètres
                </Link>
                <button
                    onClick={handleSignOut}
                    className={styles.dropdownItem}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default ProfileDropdown;