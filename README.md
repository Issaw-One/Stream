# PafStreaming - Système d'Authentification et d'Abonnement

## Vue d'ensemble

PafStreaming est une plateforme de streaming qui propose un système d'authentification et d'abonnement premium intégré avec Firebase. Le système permet aux utilisateurs de créer des comptes, de se connecter et de souscrire à un abonnement premium pour accéder à tout le contenu.

## Fonctionnalités

### 🔐 Authentification
- **Inscription** : Création de compte avec email, mot de passe et nom d'utilisateur
- **Connexion** : Authentification avec email et mot de passe
- **Déconnexion** : Gestion de session sécurisée
- **Gestion des erreurs** : Messages d'erreur localisés en français

### 💎 Système d'Abonnement
- **Compte Gratuit** : Accès limité au premier épisode de chaque série
- **Compte Premium** : Accès complet à tous les épisodes de toutes les séries
- **Gestion automatique** : Expiration automatique des abonnements premium
- **Interface utilisateur** : Indicateurs visuels du statut d'abonnement

### 🎬 Contrôle d'Accès au Contenu
- **Films** : Accessibles à tous les utilisateurs connectés
- **Séries** : 
  - Utilisateurs gratuits : Premier épisode seulement
  - Utilisateurs premium : Tous les épisodes
- **Indicateurs visuels** : Étoiles sur les épisodes premium

## Structure des Fichiers

```
Stream/
├── auth.html              # Page d'authentification et gestion de compte
├── js/
│   └── auth-utils.js      # Utilitaires d'authentification centralisés
├── index.html             # Page d'accueil avec système d'accès
├── detail.html            # Page de détail avec contrôle d'accès
└── README.md              # Documentation
```

## Configuration Firebase

Le projet utilise Firebase pour :
- **Authentication** : Gestion des utilisateurs
- **Firestore** : Stockage des données utilisateur et abonnements

### Structure des Données Firestore

#### Collection `users`
```javascript
{
  uid: "user_id",
  email: "user@example.com",
  username: "nom_utilisateur",
  createdAt: timestamp,
  subscription: {
    type: "free" | "premium",
    status: "active" | "expired",
    startDate: timestamp,
    endDate: timestamp | null
  },
  watchHistory: [],
  favorites: []
}
```

## Utilisation

### 1. Page d'Authentification (`auth.html`)
- **URL** : `/auth.html`
- **Fonctionnalités** :
  - Formulaire d'inscription
  - Formulaire de connexion
  - Gestion du profil utilisateur
  - Mise à niveau vers premium
  - Affichage des avantages premium

### 2. Intégration dans les Pages
Toutes les pages incluent le système d'authentification via :
```html
<script src="js/auth-utils.js"></script>
```

### 3. Vérification d'Accès
```javascript
// Vérifier l'accès à un contenu
const accessCheck = window.checkContentAccess('serie', episodeNumber);
if (accessCheck.hasAccess) {
    // Afficher le contenu
} else {
    // Afficher la modal d'upgrade
    window.showPremiumUpgradeModal();
}
```

## Fonctions Principales

### AuthManager
Classe principale pour gérer l'authentification :

```javascript
// Vérifier si l'utilisateur est premium
window.authManager.isPremium()

// Vérifier si l'utilisateur est connecté
window.authManager.isAuthenticated()

// Obtenir l'ID de l'utilisateur
window.authManager.getUserId()
```

### Fonctions Utilitaires
```javascript
// Afficher la modal d'upgrade premium
window.showPremiumUpgradeModal()

// Vérifier l'accès au contenu
window.checkContentAccess(contentType, episodeNumber)

// Mettre à jour l'indicateur d'abonnement
window.updateSubscriptionIndicator()
```

## Interface Utilisateur

### Indicateurs de Statut
- **Non connecté** : Point gris avec "Non connecté"
- **Gratuit** : Point gris avec "Gratuit"
- **Premium** : Point violet avec "Premium"

### Boutons d'Épisodes
- **Accessible** : Bouton normal
- **Premium** : Bouton avec étoile violette

### Modal d'Upgrade
- Affichage automatique pour le contenu premium
- Bouton de redirection vers la page d'authentification
- Explication des avantages premium

## Sécurité

### Règles Firestore Recommandées
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Authentification
- Validation côté client et serveur
- Gestion sécurisée des sessions
- Protection contre l'accès non autorisé

## Développement

### Ajouter une Nouvelle Page
1. Inclure `auth-utils.js`
2. Ajouter l'indicateur d'abonnement dans la navigation
3. Utiliser `checkContentAccess()` pour contrôler l'accès
4. Appeler `updateSubscriptionIndicator()` pour l'affichage

### Personnalisation
- Modifier les couleurs dans `auth-utils.js`
- Adapter les messages d'erreur
- Personnaliser l'interface utilisateur

## Déploiement

1. Configurer Firebase dans votre projet
2. Déployer les fichiers sur votre serveur web
3. Vérifier les règles Firestore
4. Tester l'authentification et les abonnements

## Support

Pour toute question ou problème :
- Vérifier la console du navigateur pour les erreurs
- Contrôler la configuration Firebase
- Tester avec différents types de comptes (gratuit/premium)

---

**Note** : Ce système est conçu pour être extensible et peut être adapté selon vos besoins spécifiques. 