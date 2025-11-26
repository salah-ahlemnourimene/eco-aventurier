# 📋 RAPPORT DE PROJET IHM - ECO-AVENTURIER

## 1. Introduction
Projet : Application web/mobile pour l'apprentissage du tri des déchets destinée aux enfants

Contexte : Dans le cadre du module IHM L3 Informatique, nous avons développé une application éducative pour sensibiliser les jeunes au tri sélectif.

## 2. Conception de l'Interface

### 2.1 Architecture générale
L'application suit une structure simple à 3 écrans :
- Écran de jeu : Interface principale avec le jeu de tri
- Zone mascotte : Personnage interactif qui guide l'enfant
- Navigation : Boutons d'accès aux différentes fonctionnalités

### 2.2 Choix ergonomiques
- Boutons larges : Adaptés aux doigts des enfants
- Couleurs standards : Correspondent aux codes couleurs des poubelles réelles
- Feedback visuel : Animations pour les bonnes/mauvaises réponses
- Police simple : System UI pour une meilleure lisibilité

## 3. Structure Technique

### 3.1 Fichier HTML (index.html)
<!-- Structure de base -->
<div class="app-container">
    <header> <!-- Score et vies -->
    <main>   <!-- Jeu principal -->
    <nav>    <!-- Navigation -->
</div>

Explications :
- J'ai utilisé une div container pour englober toute l'application
- Le header contient le score et le nombre de vies
- Le main a toute la logique du jeu
- Le nav permet de naviguer entre les écrans

### 3.2 Styles CSS (style.css)
/* Variables pour les couleurs */
:root {
    --plastic: #FFC107;  /* Jaune poubelle plastique */
    --paper: #2196F3;    /* Bleu poubelle papier */
    --glass: #4CAF50;    /* Vert poubelle verre */
    --other: #F44336;    /* Rouge autres déchets */
}

/* Design responsive */
.app-container {
    max-width: 400px;  /* Optimisé pour mobile */
    margin: 0 auto;    /* Centrage */
}

Mes choix :
- J'ai utilisé CSS Grid pour les boutons de poubelles
- Les animations CSS donnent du feedback visuel
- Le design s'adapte aux petits écrans

### 3.3 Logique JavaScript (script.js)
class EcoGame {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.wastes = [ /* liste des déchets */ ];
    }
    
    checkAnswer(selectedType) {
        // Vérifie si la réponse est correcte
        if (selectedType === this.currentWaste.type) {
            this.score += 10;  // Bonus points
        } else {
            this.lives--;      // Perte d'une vie
        }
    }
}

Fonctionnalités implémentées :
- Gestion du score et des vies
- Sélection aléatoire des déchets
- Vérification des réponses
- Messages d'encouragement

## 4. Éléments d'Interaction

### 4.1 Mascotte "Léo le Renard"
J'ai ajouté une mascotte pour :
- Rendre l'application plus attrayante pour les enfants
- Donner des instructions et encouragements
- Créer une expérience plus immersive

### 4.2 Système de jeu
- 8 types de déchets différents
- 4 catégories de tri : Plastique, Papier, Verre, Autre
- Système de vies : 3 chances avant Game Over
- Calcul de score : 10 points par bonne réponse

## 5. Difficultés Rencontrées

### 5.1 Problèmes résolus
- Adaptation mobile : J'ai dû ajuster les tailles pour les petits écrans
- Gestion des états : Synchronisation du score et des vies
- Animations CSS : Apprentissage des keyframes pour les feedbacks

### 5.2 Améliorations possibles
- Ajouter un écran d'accueil avec les instructions
- Implémenter un guide éducatif sur le tri
- Ajouter des sons et musiques

## 6. Conclusion

Cette application respecte les principes d'ergonomie vus en cours :
- Simplicité : Interface intuitive même pour les enfants
- Cohérence : Design uniforme sur tous les éléments
- Feedback : Retour immédiat sur les actions de l'utilisateur
- Accessibilité : Boutons larges, contrastes suffisants

Le projet m'a permis de mettre en pratique les concepts d'IHM tout en créant une application utile pour l'éducation environnementale des jeunes.

---

Réalisé par : Salah Ahlem Nour Imene  et  Belamri Meriem Elbatoul
**Section2 G3 L3 Informatique - Université Oran1
Module IHM - Année 2025-2026
