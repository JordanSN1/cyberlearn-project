"use client";

                    import { useState, useEffect } from "react";
                    import Link from "next/link";
                    import { auth } from "@/app/firebase/config";
                    import { User } from "lucide-react";
                    import styles from "./Navbar.module.css";
                    import ProfileDropdown from "@/app/components/ProfileDropdown/ProfileDropdown";

                    const AuthButton = () => {
                        const [isAuthenticated, setIsAuthenticated] = useState(false);
                        const [showDropdown, setShowDropdown] = useState(false);

                        useEffect(() => {
                            const unsubscribe = auth.onAuthStateChanged((user) => {
                                setIsAuthenticated(!!user);
                            });

                            return () => unsubscribe();
                        }, []);

                        const handleProfileClick = () => {
                            setShowDropdown((prev) => !prev);
                        };

                        return (
                            <div className={styles.userMenu}>
                                {isAuthenticated ? (
                                    <div className={styles.avatarContainer}>
                                        <div className={styles.avatar} onClick={handleProfileClick}>
                                            <User className="button" />
                                        </div>
                                        <ProfileDropdown
                                            isVisible={showDropdown}
                                            onClose={() => setShowDropdown(false)}
                                        />
                                    </div>
                                ) : (
                                    <Link href="/login">
                                        <button className={styles.connexionButton}>
                                            Connexion
                                        </button>
                                    </Link>
                                )}
                            </div>
                        );
                    };

                    export default AuthButton;