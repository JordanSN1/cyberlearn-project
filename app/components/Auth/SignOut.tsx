"use client"



import styles from './Auth.module.css';

export default function SignOut() {
    return (
        <div className={styles.authContainer}>
            <div className={styles.glassEffect}>
                <h2 className={styles.title}>Terminate Session</h2>
                <p className={styles.confirmText}>Confirm session termination:</p>
                <button className={styles.authButton}>
                    Confirm Logout
                </button>
            </div>
        </div>
    );
}