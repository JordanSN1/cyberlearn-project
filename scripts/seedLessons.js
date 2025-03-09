// Script pour ajouter des données de leçons à Firebase
// Pour exécuter ce script : node scripts/seedLessons.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
require('dotenv').config();

// Configuration Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction pour nettoyer le contenu HTML pour Firestore
const sanitizeHtmlContent = (html) => {
    // Supprimer les indentations excessives et normaliser les espaces
    return html.replace(/\n\s+/g, '\n').trim();
};

// Données des leçons
const lessons = [
    {
        id: "intro-prog",
        category: "Code",
        title: "Introduction à la Programmation",
        description: "Apprenez les bases de la programmation avec des exercices pratiques et des projets réels.",
        iconName: "Code",
        locked: false,
        tags: ["Débutant", "Programmation", "Bases"],
        order: 1
    },
    {
        id: "network-arch",
        category: "Réseaux",
        title: "Architecture des Réseaux",
        description: "Découvrez comment fonctionnent les réseaux informatiques et l'infrastructure d'Internet.",
        iconName: "Network",
        locked: false,
        tags: ["Intermédiaire", "Réseaux", "Internet"],
        order: 2
    },
    {
        id: "social-impact",
        category: "Social",
        title: "Impact Social du Numérique",
        description: "Explorez l'influence de la technologie sur la société et les enjeux éthiques.",
        iconName: "Users",
        locked: false,
        tags: ["Société", "Éthique", "Technologie"],
        order: 3
    },
    {
        id: "digital-lib",
        category: "Ressources",
        title: "Bibliothèque Numérique",
        description: "Accédez à une collection complète de ressources pédagogiques et tutoriels.",
        iconName: "BookOpen",
        locked: false,
        tags: ["Ressources", "Documentation", "Apprentissage"],
        order: 4
    },
    {
        id: "cyber-basics",
        category: "Cybersécurité",
        title: "Fondamentaux de la Cybersécurité",
        description: "Découvrez les principes fondamentaux de la cybersécurité et les meilleures pratiques.",
        iconName: "Lock",
        locked: true,
        tags: ["Cybersécurité", "Sécurité", "Fondamentaux"],
        order: 5
    },
    {
        id: "data-protection",
        category: "Cybersécurité",
        title: "Protection des Données",
        description: "Apprenez à protéger vos données personnelles et professionnelles contre les menaces.",
        iconName: "Shield",
        locked: true,
        tags: ["Cybersécurité", "Données", "Protection"],
        order: 6
    },
    {
        id: "web-security",
        category: "Cybersécurité",
        title: "Sécurité Web",
        description: "Découvrez les vulnérabilités web courantes et comment sécuriser vos applications.",
        iconName: "Globe",
        locked: true,
        tags: ["Cybersécurité", "Web", "Applications"],
        order: 7
    }
];

// Contenu détaillé des leçons
const lessonContents = {
    "intro-prog": {
        sections: [
            {
                title: "Introduction à la Programmation",
                content: sanitizeHtmlContent(`
<p>La programmation est l'art de donner des instructions à un ordinateur pour qu'il exécute des tâches spécifiques. C'est un domaine fascinant qui combine logique, créativité et résolution de problèmes.</p>

<h3>Pourquoi apprendre à programmer ?</h3>
<ul>
    <li>Développer une pensée logique et analytique</li>
    <li>Créer des applications et des sites web</li>
    <li>Automatiser des tâches répétitives</li>
    <li>Améliorer ses perspectives professionnelles</li>
</ul>

<p>Dans cette leçon, nous allons explorer les concepts fondamentaux de la programmation qui s'appliquent à presque tous les langages.</p>
`)
            },
            {
                title: "Variables et Types de Données",
                content: sanitizeHtmlContent(`
<p>Les variables sont des conteneurs pour stocker des données. Chaque variable a un type qui détermine quelle sorte de données elle peut contenir.</p>

<h3>Types de données courants :</h3>
<ul>
    <li><strong>Entiers</strong> : nombres sans décimales (1, 42, -7)</li>
    <li><strong>Flottants</strong> : nombres avec décimales (3.14, -0.001)</li>
    <li><strong>Chaînes de caractères</strong> : texte ("Bonjour", "CyberLearn")</li>
    <li><strong>Booléens</strong> : valeurs vrai/faux (true, false)</li>
</ul>

<h3>Exemple en JavaScript :</h3>
<pre>
// Déclaration de variables
let age = 25;               // Entier
let prix = 19.99;           // Flottant
let nom = "Alice";          // Chaîne de caractères
let estInscrit = true;      // Booléen
</pre>

<p>Les variables nous permettent de stocker et de manipuler des données tout au long de notre programme.</p>
`)
            },
            {
                title: "Structures de Contrôle",
                content: sanitizeHtmlContent(`
<p>Les structures de contrôle déterminent l'ordre dans lequel les instructions sont exécutées dans un programme.</p>

<h3>Conditions (if/else)</h3>
<p>Les conditions permettent d'exécuter différentes parties de code selon qu'une condition est vraie ou fausse.</p>

<pre>
// Exemple de condition
let age = 18;

if (age >= 18) {
    console.log("Vous êtes majeur.");
} else {
    console.log("Vous êtes mineur.");
}
</pre>

<h3>Boucles</h3>
<p>Les boucles permettent de répéter des instructions plusieurs fois.</p>

<pre>
// Boucle for
for (let i = 0; i < 5; i++) {
    console.log("Itération " + i);
}

// Boucle while
let compteur = 0;
while (compteur < 3) {
    console.log("Compteur : " + compteur);
    compteur++;
}
</pre>

<p>Les structures de contrôle sont essentielles pour créer des programmes dynamiques qui peuvent prendre des décisions et répéter des tâches.</p>
`)
            }
        ],
        questions: [
            {
                id: "q1",
                text: "Quel type de données utiliseriez-vous pour stocker le nom d'un utilisateur ?",
                options: [
                    "Entier (int)",
                    "Flottant (float)",
                    "Chaîne de caractères (string)",
                    "Booléen (boolean)"
                ],
                correctAnswer: 2,
                explanation: "Les noms d'utilisateurs sont du texte, donc on utilise des chaînes de caractères (string) pour les stocker."
            },
            {
                id: "q2",
                text: "Quelle structure de contrôle utiliseriez-vous pour répéter une action 10 fois ?",
                options: [
                    "Une condition if/else",
                    "Une boucle for ou while",
                    "Une fonction",
                    "Une variable"
                ],
                correctAnswer: 1,
                explanation: "Les boucles (for ou while) sont utilisées pour répéter des actions un certain nombre de fois."
            },
            {
                id: "q3",
                text: "Qu'est-ce qu'une variable en programmation ?",
                options: [
                    "Une fonction mathématique",
                    "Un conteneur pour stocker des données",
                    "Un type de boucle",
                    "Une condition"
                ],
                correctAnswer: 1,
                explanation: "Une variable est un conteneur nommé qui permet de stocker des données qui peuvent être utilisées et modifiées dans un programme."
            }
        ]
    },
    "network-arch": {
        sections: [
            {
                title: "Introduction aux Réseaux",
                content: sanitizeHtmlContent(`
<p>Les réseaux informatiques permettent à des ordinateurs et autres appareils de communiquer entre eux. Ils constituent l'infrastructure fondamentale d'Internet et des systèmes de communication modernes.</p>

<h3>Types de réseaux</h3>
<ul>
    <li><strong>LAN (Local Area Network)</strong> : réseau local, comme celui d'une maison ou d'un bureau</li>
    <li><strong>WAN (Wide Area Network)</strong> : réseau étendu couvrant une grande zone géographique</li>
    <li><strong>Internet</strong> : le plus grand réseau mondial, reliant des milliards d'appareils</li>
</ul>

<p>Comprendre les réseaux est essentiel pour appréhender la cybersécurité et le fonctionnement d'Internet.</p>
`)
            },
            {
                title: "Modèle OSI et TCP/IP",
                content: sanitizeHtmlContent(`
<p>Le modèle OSI (Open Systems Interconnection) est un cadre conceptuel qui standardise les fonctions d'un système de communication en sept couches distinctes.</p>

<h3>Les 7 couches du modèle OSI :</h3>
<ol>
    <li><strong>Physique</strong> : transmission des bits bruts sur un canal de communication</li>
    <li><strong>Liaison de données</strong> : transfert fiable de données entre deux nœuds</li>
    <li><strong>Réseau</strong> : routage des paquets de données à travers différents réseaux</li>
    <li><strong>Transport</strong> : transfert fiable de données entre les points d'extrémité</li>
    <li><strong>Session</strong> : gestion des sessions entre applications</li>
    <li><strong>Présentation</strong> : traduction, chiffrement et compression des données</li>
    <li><strong>Application</strong> : interface avec les applications et les utilisateurs</li>
</ol>

<p>Le modèle TCP/IP est une version simplifiée du modèle OSI, utilisée dans Internet. Il comprend quatre couches : Accès réseau, Internet, Transport et Application.</p>
`)
            }
        ],
        questions: [
            {
                id: "q1",
                text: "Quel type de réseau couvre généralement une maison ou un petit bureau ?",
                options: [
                    "WAN (Wide Area Network)",
                    "MAN (Metropolitan Area Network)",
                    "LAN (Local Area Network)",
                    "PAN (Personal Area Network)"
                ],
                correctAnswer: 2,
                explanation: "Un LAN (Local Area Network) est un réseau qui couvre une zone géographique limitée comme une maison, un bureau ou un campus."
            },
            {
                id: "q2",
                text: "Combien de couches comporte le modèle OSI ?",
                options: [
                    "4 couches",
                    "5 couches",
                    "6 couches",
                    "7 couches"
                ],
                correctAnswer: 3,
                explanation: "Le modèle OSI comporte 7 couches : Physique, Liaison de données, Réseau, Transport, Session, Présentation et Application."
            }
        ]
    }
};

// Fonction pour ajouter les leçons à Firebase
async function seedLessons() {
    try {
        console.log("Début de l'ajout des leçons à Firebase...");
        
        // Ajouter les leçons
        for (const lesson of lessons) {
            console.log(`Tentative d'ajout de la leçon : ${lesson.title}...`);
            try {
                await setDoc(doc(db, "lessons", lesson.id), lesson);
                console.log(`Leçon ajoutée avec succès : ${lesson.title}`);
            } catch (err) {
                console.error(`Erreur lors de l'ajout de la leçon ${lesson.title}:`, err);
            }
        }
        
        // Ajouter le contenu détaillé des leçons
        for (const [lessonId, content] of Object.entries(lessonContents)) {
            console.log(`Tentative d'ajout du contenu pour la leçon : ${lessonId}...`);
            try {
                await setDoc(doc(db, "lessonContents", lessonId), content);
                console.log(`Contenu ajouté avec succès pour la leçon : ${lessonId}`);
            } catch (err) {
                console.error(`Erreur lors de l'ajout du contenu pour la leçon ${lessonId}:`, err);
            }
        }
        
        console.log("Toutes les leçons ont été traitées !");
    } catch (error) {
        console.error("Erreur générale lors de l'ajout des leçons :", error);
    }
}

// Exécuter la fonction
seedLessons()
    .then(() => {
        console.log("Script terminé.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Erreur dans le script :", error);
        process.exit(1);
    }); 