"use client"

import { useState } from 'react';
import Link from 'next/link';
import styles from './Auth.module.css';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config"
import { auth } from "@/app/firebase/config";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordStrength() < 3) {
            setError('Password is too weak');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            if (userCredential) {
                const user = auth.currentUser;
                if (user) {
                    await sendEmailVerification(user);
                    await setDoc(doc(db, "users", user.uid), {
                        username: username,
                        email: email,
                        authID: user.uid
                    });
                    setSuccess('Registration successful! Check your email for verification.');
                }
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const passwordStrength = () => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^A-Za-z0-9]/)) strength++;
        return strength;
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.glassEffect}>
                <h2 className={styles.title}>Create CyberLearn Account</h2>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className={styles.passwordStrength}>
                            {Array(4).fill(null).map((_, i) => (
                                <div
                                    key={i}
                                    className={`${styles.strengthBar} ${i < passwordStrength() ? styles.active : ''}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className={styles.authButton}>
                        Activate Account
                    </button>
                </form>

                <p className={styles.switchAuth}>
                    Already initiated? <Link href="/login" className={styles.link}>Access Terminal</Link>
                </p>
            </div>
        </div>
    );
}