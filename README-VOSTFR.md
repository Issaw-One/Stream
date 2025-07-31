# Lecteur VOSTFR - PafStreaming

## Fonctionnalités ajoutées

Le lecteur VOSTFR a été intégré avec les fonctionnalités suivantes :

### 🎬 Boutons VF/VOSTFR
- **VF** : Version française (sans sous-titres)
- **VOSTFR** : Version originale sous-titrée français

### 📝 Support des sous-titres
- Format supporté : WebVTT (.vtt)
- Bouton de contrôle des sous-titres dans le lecteur
- Activation/désactivation en temps réel

### 🎮 Interface utilisateur
- Boutons de langue sous le titre du contenu
- Indicateur visuel du mode actif (VF ou VOSTFR)
- Bouton de contrôle des sous-titres dans le lecteur vidéo

## Comment utiliser

### Pour les films :
1. Cliquez sur le bouton "Lecture"
2. Les boutons VF/VOSTFR apparaissent
3. Choisissez votre version préférée
4. Utilisez le bouton "Sous-titres" dans le lecteur pour les contrôler

### Pour les séries :
1. Cliquez sur un épisode
2. Les boutons VF/VOSTFR apparaissent
3. Basculez entre les versions selon vos préférences
4. Les sous-titres sont automatiquement activés en mode VOSTFR

## Configuration des données

Pour que le lecteur VOSTFR fonctionne, vos données Firebase doivent inclure :

### Pour les films :
```json
{
  "title": "Nom du film",
  "videoUrl": "URL de la vidéo",
  "subtitleUrl": "URL du fichier .vtt (optionnel)"
}
```

### Pour les séries :
```json
{
  "seriesEpisodes": "[{\"seasonNumber\": \"1\", \"episodes\": [{\"episodeNumber\": \"1\", \"videoUrl\": \"URL\", \"subtitleUrl\": \"URL .vtt\"}]}]"
}
```

## Format des sous-titres

Utilisez le format WebVTT (.vtt) pour une compatibilité optimale :

```
WEBVTT

00:00:01.000 --> 00:00:04.000
Premier sous-titre

00:00:05.000 --> 00:00:08.000
Deuxième sous-titre
```

## Compatibilité

- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Lecteur vidéo HTML5 natif
- ✅ Support des iframes (sites externes)
- ✅ Interface responsive

## Notes techniques

- Les sous-titres sont automatiquement activés en mode VOSTFR
- Le bouton de contrôle des sous-titres n'apparaît que si des sous-titres sont disponibles
- Compatible avec les URLs d'embed existantes
- Support des vidéos directes (MP4, WebM, etc.) 