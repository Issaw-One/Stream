// Utilitaires d'authentification et d'abonnement pour PafStreaming
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userSubscription = null;
        this.auth = null;
        this.db = null;
        this.isInitialized = false;
    }

    // Initialiser Firebase et l'authentification
    async initialize(firebaseConfig) {
        if (this.isInitialized) return;

        try {
            // Import dynamique des modules Firebase
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
            const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
            const { getFirestore } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");

            const app = initializeApp(firebaseConfig);
            this.auth = getAuth(app);
            this.db = getFirestore(app);

            // Écouter les changements d'état d'authentification
            onAuthStateChanged(this.auth, async (user) => {
                this.currentUser = user;
                if (user) {
                    console.log("Utilisateur connecté:", user.email);
                    await this.loadUserSubscription();
                    this.onUserStateChange?.(user, this.userSubscription);
                } else {
                    console.log("Aucun utilisateur connecté");
                    this.userSubscription = null;
                    this.onUserStateChange?.(null, null);
                }
            });

            this.isInitialized = true;
        } catch (error) {
            console.error("Erreur lors de l'initialisation de l'authentification:", error);
        }
    }

    // Charger les informations d'abonnement de l'utilisateur
    async loadUserSubscription() {
        if (!this.currentUser || !this.db) return;

        try {
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
            const userDoc = await getDoc(doc(this.db, 'users', this.currentUser.uid));
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                this.userSubscription = userData.subscription;
                
                // Vérifier si l'abonnement premium est expiré
                if (this.userSubscription.type === 'premium' && this.userSubscription.endDate) {
                    const endDate = this.userSubscription.endDate.toDate();
                    if (endDate < new Date()) {
                        await this.downgradeToFree();
                    }
                }
            }
        } catch (error) {
            console.error("Erreur lors du chargement de l'abonnement:", error);
        }
    }

    // Rétrograder vers un compte gratuit
    async downgradeToFree() {
        if (!this.currentUser || !this.db) return;

        try {
            const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
            await updateDoc(doc(this.db, 'users', this.currentUser.uid), {
                'subscription.type': 'free',
                'subscription.status': 'expired'
            });
            
            this.userSubscription = {
                type: 'free',
                status: 'expired'
            };
            
            console.log("Abonnement premium expiré, passage en gratuit");
        } catch (error) {
            console.error("Erreur lors de la rétrogradation:", error);
        }
    }

    // Vérifier si l'utilisateur a un abonnement premium actif
    isPremium() {
        return this.userSubscription && 
               this.userSubscription.type === 'premium' && 
               this.userSubscription.status === 'active';
    }

    // Vérifier si l'utilisateur est connecté
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Obtenir l'ID de l'utilisateur
    getUserId() {
        return this.currentUser ? this.currentUser.uid : null;
    }

    // Obtenir l'email de l'utilisateur
    getUserEmail() {
        return this.currentUser ? this.currentUser.email : null;
    }

    // Obtenir le nom d'affichage de l'utilisateur
    getUserDisplayName() {
        return this.currentUser ? this.currentUser.displayName : null;
    }

    // Callback pour les changements d'état utilisateur
    onUserStateChange(user, subscription) {
        // À implémenter dans les pages qui utilisent AuthManager
    }
}

// Instance globale de AuthManager
window.authManager = new AuthManager();

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCf5VvODie8_V8PDNUig66-yyxA12dhY-c",
    authDomain: "stream-df8b9.firebaseapp.com",
    projectId: "stream-df8b9",
    storageBucket: "stream-df8b9.firebasestorage.app",
    messagingSenderId: "488904493156",
    appId: "1:488904493156:web:9b468948bc244b9a78f771",
    measurementId: "G-SJFE58Y2JN"
};

// Initialiser AuthManager au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await window.authManager.initialize(firebaseConfig);
});

// Fonctions utilitaires pour l'interface utilisateur
window.showPremiumUpgradeModal = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg max-w-md mx-4">
            <h3 class="text-xl font-semibold mb-4">Contenu Premium</h3>
            <p class="text-gray-300 mb-4">
                Ce contenu nécessite un abonnement premium. 
                Les utilisateurs gratuits peuvent voir uniquement le premier épisode de chaque série.
            </p>
            <div class="flex space-x-3">
                <button onclick="this.closest('.fixed').remove()" 
                        class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Fermer
                </button>
                <a href="auth.html" 
                   class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-colors text-center">
                    Passer à Premium
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// Fonction pour vérifier l'accès au contenu
window.checkContentAccess = (contentType, episodeNumber = null) => {
    if (!window.authManager.isAuthenticated()) {
        // Utilisateur non connecté - accès limité
        return {
            hasAccess: false,
            reason: 'not_authenticated',
            message: 'Connectez-vous pour accéder au contenu'
        };
    }

    if (contentType === 'film') {
        // Les films sont accessibles à tous les utilisateurs connectés
        return {
            hasAccess: true,
            reason: 'film_access'
        };
    }

    if (contentType === 'serie') {
        if (window.authManager.isPremium()) {
            // Utilisateur premium - accès complet
            return {
                hasAccess: true,
                reason: 'premium_access'
            };
        } else {
            // Utilisateur gratuit - premier épisode seulement
            if (episodeNumber === 1 || episodeNumber === null) {
                return {
                    hasAccess: true,
                    reason: 'free_first_episode'
                };
            } else {
                return {
                    hasAccess: false,
                    reason: 'premium_required',
                    message: 'Abonnement premium requis pour cet épisode'
                };
            }
        }
    }

    return {
        hasAccess: false,
        reason: 'unknown_content_type'
    };
};

// Fonction pour afficher un indicateur de statut d'abonnement
window.updateSubscriptionIndicator = () => {
    const indicator = document.getElementById('subscriptionIndicator');
    if (!indicator) return;

    if (window.authManager.isPremium()) {
        indicator.innerHTML = `
            <div class="flex items-center space-x-2 text-purple-400">
                <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span class="text-sm font-medium">Premium</span>
            </div>
        `;
    } else if (window.authManager.isAuthenticated()) {
        indicator.innerHTML = `
            <div class="flex items-center space-x-2 text-gray-400">
                <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span class="text-sm font-medium">Gratuit</span>
            </div>
        `;
    } else {
        indicator.innerHTML = `
            <div class="flex items-center space-x-2 text-gray-500">
                <span class="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span class="text-sm font-medium">Non connecté</span>
            </div>
        `;
    }
}; 