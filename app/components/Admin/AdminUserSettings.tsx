"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  query, 
  orderBy,
  where,
  deleteDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { User, Edit, Trash2, Save, Search, AlertTriangle, UserPlus } from "lucide-react";
import styles from "./AdminComponents.module.css";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin: string;
  settings: {
    theme: string;
    notifications: boolean;
    language: string;
  };
}

const AdminUserSettings: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersQuery = query(collection(db, "users"), orderBy("username", "asc"));
        const querySnapshot = await getDocs(usersQuery);
        
        const usersData: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            email: data.email || "",
            username: data.username || "",
            isAdmin: data.isAdmin || false,
            createdAt: data.createdAt || new Date().toISOString(),
            lastLogin: data.lastLogin || new Date().toISOString(),
            settings: data.settings || {
              theme: "default",
              notifications: true,
              language: "fr"
            }
          });
        });
        
        setUsers(usersData);
        setFilteredUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
        setError("Impossible de charger les utilisateurs. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtrer les utilisateurs
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = users.filter(
      user => 
        user.username.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Mettre à jour un utilisateur
  const handleUpdateUser = async (user: UserProfile) => {
    try {
      await setDoc(doc(db, "users", user.id), user, { merge: true });
      
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === user.id ? user : u
        )
      );
      
      setEditingUser(null);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
      setError("Impossible de mettre à jour l'utilisateur. Veuillez réessayer plus tard.");
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      setError("Impossible de supprimer l'utilisateur. Veuillez réessayer plus tard.");
    }
  };

  // Éditer un utilisateur
  const handleEditUser = (user: UserProfile) => {
    setEditingUser({ ...user });
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Mettre à jour un champ de l'utilisateur en cours d'édition
  const handleEditChange = (field: string, value: any) => {
    if (!editingUser) return;
    
    if (field.startsWith("settings.")) {
      const settingField = field.split(".")[1];
      setEditingUser({
        ...editingUser,
        settings: {
          ...editingUser.settings,
          [settingField]: value
        }
      });
    } else {
      setEditingUser({
        ...editingUser,
        [field]: value
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminUsersContainer}>
      <div className={styles.adminUsersHeader}>
        <h2 className={styles.adminUsersTitle}>Gestion des Utilisateurs</h2>
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Rechercher un utilisateur..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {error && (
        <div className={styles.errorContainer}>
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}
      
      {editingUser ? (
        <div className={styles.userEditForm}>
          <h3 className={styles.editFormTitle}>Modifier l'utilisateur</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input 
                type="email"
                className={styles.formInput}
                value={editingUser.email}
                onChange={(e) => handleEditChange("email", e.target.value)}
                disabled
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nom d'utilisateur</label>
              <input 
                type="text"
                className={styles.formInput}
                value={editingUser.username}
                onChange={(e) => handleEditChange("username", e.target.value)}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Administrateur</label>
              <div className={styles.toggleContainer}>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={editingUser.isAdmin}
                    onChange={(e) => handleEditChange("isAdmin", e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
                <span className={styles.toggleLabel}>
                  {editingUser.isAdmin ? "Oui" : "Non"}
                </span>
              </div>
            </div>
          </div>
          
          <h4 className={styles.settingsSectionTitle}>Paramètres utilisateur</h4>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Thème</label>
              <select 
                className={styles.formSelect}
                value={editingUser.settings.theme}
                onChange={(e) => handleEditChange("settings.theme", e.target.value)}
              >
                <option value="default">Par défaut</option>
                <option value="dark">Sombre</option>
                <option value="light">Clair</option>
                <option value="high-contrast">Contraste élevé</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Langue</label>
              <select 
                className={styles.formSelect}
                value={editingUser.settings.language}
                onChange={(e) => handleEditChange("settings.language", e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="es">Espagnol</option>
                <option value="de">Allemand</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Notifications</label>
              <div className={styles.toggleContainer}>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={editingUser.settings.notifications}
                    onChange={(e) => handleEditChange("settings.notifications", e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
                <span className={styles.toggleLabel}>
                  {editingUser.settings.notifications ? "Activées" : "Désactivées"}
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button 
              className={styles.cancelButton}
              onClick={handleCancelEdit}
            >
              Annuler
            </button>
            <button 
              className={styles.saveButton}
              onClick={() => handleUpdateUser(editingUser)}
            >
              <Save size={18} />
              <span>Sauvegarder</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className={styles.noUsersContainer}>
              <p>Aucun utilisateur trouvé.</p>
            </div>
          ) : (
            <div className={styles.usersTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableCell}>Utilisateur</div>
                <div className={styles.tableCell}>Email</div>
                <div className={styles.tableCell}>Rôle</div>
                <div className={styles.tableCell}>Dernière connexion</div>
                <div className={styles.tableCell}>Actions</div>
              </div>
              
              {filteredUsers.map((user) => (
                <div key={user.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>
                        <User size={18} />
                      </div>
                      <span>{user.username}</span>
                    </div>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <span className={`${styles.roleBadge} ${user.isAdmin ? styles.adminRole : styles.userRole}`}>
                      {user.isAdmin ? "Admin" : "Utilisateur"}
                    </span>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <span className={styles.lastLogin}>
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  
                  <div className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.actionButton}
                        onClick={() => handleEditUser(user)}
                        title="Modifier l'utilisateur"
                      >
                        <Edit size={18} />
                      </button>
                      
                      {confirmDelete === user.id ? (
                        <div className={styles.confirmDelete}>
                          <span>Confirmer ?</span>
                          <button 
                            className={styles.confirmYes}
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Oui
                          </button>
                          <button 
                            className={styles.confirmNo}
                            onClick={() => setConfirmDelete(null)}
                          >
                            Non
                          </button>
                        </div>
                      ) : (
                        <button 
                          className={styles.actionButton}
                          onClick={() => setConfirmDelete(user.id)}
                          title="Supprimer l'utilisateur"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUserSettings; 