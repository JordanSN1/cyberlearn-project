"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  query, 
  orderBy,
  where
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { Save, RefreshCw, AlertTriangle } from "lucide-react";
import styles from "./AdminComponents.module.css";

interface AppSetting {
  id: string;
  name: string;
  value: string | boolean | number;
  description: string;
  type: "string" | "boolean" | "number";
  category: string;
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  // Charger les paramètres
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const settingsQuery = query(collection(db, "settings"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(settingsQuery);
        
        const settingsData: AppSetting[] = [];
        const categoriesSet = new Set<string>();
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as AppSetting;
          settingsData.push({
            ...data,
            id: doc.id
          });
          
          if (data.category) {
            categoriesSet.add(data.category);
          }
        });
        
        setSettings(settingsData);
        setCategories(Array.from(categoriesSet));
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des paramètres:", err);
        setError("Impossible de charger les paramètres. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Filtrer les paramètres par catégorie
  const filteredSettings = activeCategory === "Tous" 
    ? settings 
    : settings.filter(setting => setting.category === activeCategory);

  // Mettre à jour un paramètre
  const handleSettingChange = (id: string, value: string | boolean | number) => {
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    );
  };

  // Sauvegarder les paramètres
  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      for (const setting of settings) {
        await setDoc(doc(db, "settings", setting.id), setting);
      }
      
      setSuccess("Paramètres sauvegardés avec succès !");
      setSaving(false);
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des paramètres:", err);
      setError("Impossible de sauvegarder les paramètres. Veuillez réessayer plus tard.");
      setSaving(false);
    }
  };

  // Recharger les paramètres
  const handleReloadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const settingsQuery = query(collection(db, "settings"), orderBy("name", "asc"));
      const querySnapshot = await getDocs(settingsQuery);
      
      const settingsData: AppSetting[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as AppSetting;
        settingsData.push({
          ...data,
          id: doc.id
        });
      });
      
      setSettings(settingsData);
      setSuccess("Paramètres rechargés avec succès !");
      setLoading(false);
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Erreur lors du rechargement des paramètres:", err);
      setError("Impossible de recharger les paramètres. Veuillez réessayer plus tard.");
      setLoading(false);
    }
  };

  // Ajouter un nouveau paramètre
  const handleAddSetting = async () => {
    const newSetting: AppSetting = {
      id: `setting_${Date.now()}`,
      name: "Nouveau paramètre",
      value: "",
      description: "Description du paramètre",
      type: "string",
      category: "Général"
    };
    
    try {
      await setDoc(doc(db, "settings", newSetting.id), newSetting);
      setSettings(prevSettings => [...prevSettings, newSetting]);
      setSuccess("Nouveau paramètre ajouté avec succès !");
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de l'ajout du paramètre:", err);
      setError("Impossible d'ajouter le paramètre. Veuillez réessayer plus tard.");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Chargement des paramètres...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminSettingsContainer}>
      <div className={styles.adminSettingsHeader}>
        <h2 className={styles.adminSettingsTitle}>Paramètres de l'Application</h2>
        <div className={styles.settingsActions}>
          <button 
            className={styles.reloadButton}
            onClick={handleReloadSettings}
            disabled={saving}
          >
            <RefreshCw size={18} />
            <span>Recharger</span>
          </button>
          <button 
            className={styles.saveButton}
            onClick={handleSaveSettings}
            disabled={saving}
          >
            <Save size={18} />
            <span>{saving ? "Sauvegarde en cours..." : "Sauvegarder"}</span>
          </button>
        </div>
      </div>
      
      {error && (
        <div className={styles.settingsError}>
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className={styles.settingsSuccess}>
          <span>{success}</span>
        </div>
      )}
      
      <div className={styles.settingsCategories}>
        <button 
          className={`${styles.categoryButton} ${activeCategory === "Tous" ? styles.active : ""}`}
          onClick={() => setActiveCategory("Tous")}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button 
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className={styles.settingsGrid}>
        {filteredSettings.length === 0 ? (
          <div className={styles.noSettingsContainer}>
            <p>Aucun paramètre trouvé dans cette catégorie.</p>
          </div>
        ) : (
          filteredSettings.map((setting) => (
            <div key={setting.id} className={styles.settingCard}>
              <div className={styles.settingHeader}>
                <div className={styles.settingInfo}>
                  <h3 className={styles.settingName}>{setting.name}</h3>
                  <span className={styles.settingCategory}>{setting.category}</span>
                </div>
                <div className={styles.settingType}>{setting.type}</div>
              </div>
              
              <p className={styles.settingDescription}>{setting.description}</p>
              
              <div className={styles.settingValue}>
                {setting.type === "boolean" ? (
                  <div className={styles.toggleContainer}>
                    <label className={styles.toggleSwitch}>
                      <input 
                        type="checkbox" 
                        checked={setting.value as boolean}
                        onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                    <span className={styles.toggleLabel}>
                      {setting.value ? "Activé" : "Désactivé"}
                    </span>
                  </div>
                ) : setting.type === "number" ? (
                  <input 
                    type="number"
                    className={styles.settingInput}
                    value={setting.value as number}
                    onChange={(e) => handleSettingChange(setting.id, Number(e.target.value))}
                  />
                ) : (
                  <input 
                    type="text"
                    className={styles.settingInput}
                    value={setting.value as string}
                    onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className={styles.addSettingContainer}>
        <button 
          className={styles.addSettingButton}
          onClick={handleAddSetting}
        >
          Ajouter un nouveau paramètre
        </button>
      </div>
    </div>
  );
};

export default AdminSettings; 