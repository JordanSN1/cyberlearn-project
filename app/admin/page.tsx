"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import AdminLessonsList from "../components/Admin/AdminLessonsList";
import AdminHeader from "../components/Admin/AdminHeader";
import UserManagement from "../components/Admin/UserManagement/UserManagement";
import UserSettings from "../components/Admin/UserSettings/UserSettings";
import styles from "./admin.module.css";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("lessons");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email === 'jordanturnaco@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Chargement de l'interface d'administration...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h1>Accès non autorisé</h1>
        <p>Vous devez être administrateur pour accéder à cette page.</p>
        <button
          className={styles.loginButton}
          onClick={() => router.push("/login")}
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.adminContent}>
        {activeTab === "lessons" && (
          <AdminLessonsList />
        )}
        {activeTab === "users" && (
          <UserManagement />
        )}
        {activeTab === "settings" && (
          <UserSettings />
        )}
      </div>
    </div>
  );
} 