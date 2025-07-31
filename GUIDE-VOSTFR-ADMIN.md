# Guide d'utilisation des liens VOSTFR - Administration

## 🎬 Ajout de liens VOSTFR pour les films

### Étapes pour ajouter un film avec VOSTFR :

1. **Accédez à l'administration** : Connectez-vous à votre interface d'administration
2. **Cliquez sur "Ajouter un film / série"**
3. **Remplissez les informations de base** :
   - Titre du film
   - Description
   - URL de l'affiche
   - **Lien vidéo VF** (Version Française) - **Obligatoire**
   - **Lien vidéo VOSTFR** (Version Originale Sous-Titrée) - **Optionnel**
4. **Sélectionnez "Film"** comme type de contenu
5. **Cliquez sur "Ajouter"**

### Format des vidéos :
- **VF** : Vidéo en version française (sous-titres intégrés ou doublage)
- **VOSTFR** : Vidéo en version originale avec sous-titres français intégrés
- **Optionnel** : Laissez vide si pas de version VOSTFR disponible

---

## 📺 Ajout de liens VOSTFR pour les séries

### Étapes pour ajouter une série avec VOSTFR :

1. **Accédez à l'administration**
2. **Cliquez sur "Ajouter un film / série"**
3. **Remplissez les informations de base** :
   - Titre de la série
   - Description
   - URL de l'affiche
4. **Sélectionnez "Série"** comme type de contenu
5. **Définissez le nombre de saisons**
6. **Cliquez sur "Générer champs de saisons et d'épisodes"**
7. **Pour chaque saison** :
   - Définissez le nombre d'épisodes
   - Cliquez sur "Générer champs vidéo pour Saison X"
8. **Pour chaque épisode** :
   - **Lien vidéo VF** : URL de la vidéo VF de l'épisode
   - **Lien vidéo VOSTFR** : URL de la vidéo VOSTFR de l'épisode (optionnel)

### Structure des données pour les séries :

```json
{
  "seriesEpisodes": [
    {
      "seasonNumber": "1",
      "episodes": [
        {
          "episodeNumber": "1",
          "videoUrl": "https://example.com/episode1-vf.mp4",
          "vostfrUrl": "https://example.com/episode1-vostfr.mp4"
        },
        {
          "episodeNumber": "2",
          "videoUrl": "https://example.com/episode2-vf.mp4",
          "vostfrUrl": "https://example.com/episode2-vostfr.mp4"
        }
      ]
    }
  ]
}
```

---

## 🔧 Modification des liens VOSTFR existants

### Pour modifier un film :
1. **Cliquez sur "Modifier"** dans la liste des films
2. **Modifiez les URLs** dans les champs "Lien vidéo VF" et "Lien vidéo VOSTFR"
3. **Cliquez sur "Enregistrer les modifications"**

### Pour modifier une série :
1. **Cliquez sur "Modifier"** dans la liste des séries
2. **Générez les champs d'épisodes** si nécessaire
3. **Modifiez les URLs VF et VOSTFR** pour chaque épisode
4. **Cliquez sur "Enregistrer les modifications"**

---

## 🎮 Fonctionnalités du lecteur VOSTFR

### Interface utilisateur :
- **Boutons VF/VOSTFR** : Basculement entre les versions
- **Bouton de contrôle** : Basculement direct dans le lecteur (si VOSTFR disponible)
- **Indicateurs visuels** : Mode actif clairement indiqué

### Comportement automatique :
- **Mode VF** : Lecture de la vidéo VF
- **Mode VOSTFR** : Lecture de la vidéo VOSTFR (avec sous-titres intégrés)
- **Basculement** : Possibilité de changer de version en cours de lecture

---

## ⚠️ Notes importantes

### Compatibilité :
- ✅ **Navigateurs modernes** : Chrome, Firefox, Safari, Edge
- ✅ **Vidéos directes** : MP4, WebM, etc.
- ✅ **Iframes** : Sites externes (uqload, etc.)
- ✅ **Sous-titres intégrés** : Pas besoin de fichiers .vtt séparés

### Bonnes pratiques :
- **Testez vos liens** : Vérifiez que les URLs sont accessibles
- **Format cohérent** : Utilisez le même format pour tous les épisodes
- **Qualité** : Assurez-vous que les vidéos VOSTFR ont des sous-titres lisibles
- **Fallback** : Si pas de VOSTFR, le lecteur utilise automatiquement la VF

---

## 🆘 Dépannage

### Problèmes courants :
1. **Vidéo VOSTFR ne se charge pas** :
   - Vérifiez l'URL du fichier vidéo
   - Testez l'URL dans un navigateur
   - Vérifiez que la vidéo contient bien les sous-titres

2. **Erreur CORS** :
   - Hébergez les vidéos sur un serveur avec CORS activé
   - Utilisez HTTPS pour tous les liens

3. **Basculement ne fonctionne pas** :
   - Vérifiez que les deux URLs sont valides
   - Testez avec des vidéos simples

### Support :
- Consultez la documentation du lecteur VOSTFR
- Vérifiez les logs de la console du navigateur
- Testez avec des vidéos d'exemple

---

## 💡 Avantages du nouveau système

### Pour les administrateurs :
- **Plus simple** : Pas besoin de gérer des fichiers .vtt séparés
- **Plus flexible** : Possibilité d'avoir des vidéos VOSTFR de qualité différente
- **Meilleur contrôle** : Synchronisation parfaite entre vidéo et sous-titres

### Pour les utilisateurs :
- **Meilleure qualité** : Sous-titres parfaitement synchronisés
- **Plus rapide** : Pas de chargement de fichiers .vtt supplémentaires
- **Plus fiable** : Moins de problèmes de compatibilité 