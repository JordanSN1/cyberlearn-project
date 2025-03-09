"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { BookOpen, Users, Settings, LogOut } from "lucide-react";
import styles from "./AdminComponents.module.css";

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div className={styles.adminHeader}>
      <h1 className={styles.adminTitle}>Interface d'Administration</h1>
      
      <div className={styles.adminTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === "lessons" ? styles.active : ""}`}
          onClick={() => setActiveTab("lessons")}
        >
          <BookOpen size={18} />
          <span>Leçons</span>
        </button>
        
        <button 
          className={`${styles.tabButton} ${activeTab === "users" ? styles.active : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <Users size={18} />
          <span>Utilisateurs</span>
        </button>
        
        <button 
          className={`${styles.tabButton} ${activeTab === "settings" ? styles.active : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={18} />
          <span>Paramètres</span>
        </button>
      </div>
      
      <button className={styles.logoutButton} onClick={handleLogout}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default AdminHeader; 