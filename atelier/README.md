# Cap Web · Assistant de Restaurant de Quartier

Cap Web est un chatbot à base de règles conçu pour assister les habitants du quartier.
Il permet de découvrir les spécialités et le menu du jour, d'obtenir des informations de réservation et d'interagir simplement sans modèle d'IA externe.
L'application fonctionne entièrement en JavaScript standard côté client, servi par un serveur HTTP Node.js minimaliste et sécurisé.

## Installation et exécution

Exécutez les commandes suivantes dans l'ordre depuis le dossier `atelier` :

```powershell
# 1. Installer les dépendances de développement
npm ci

# 2. Configurer votre cahier personnel (limite et mots-clés)
Copy-Item cahier-personnel.exemple.json cahier-personnel.json

# 3. Lancer les tests automatisés
npm test

# 4. Démarrer le serveur local
npm start
```

L'application est ensuite accessible dans votre navigateur à l'adresse : http://127.0.0.1:3000 (Ctrl+C pour arrêter le serveur).

## Architecture des modules (`public/js`)

Le code JavaScript client respecte une séparation stricte des responsabilités entre trois modules :

1. `brain.js` : Le cœur métier logique. Il rassemble des fonctions pures (`validateMessage`, `replyTo`) sans aucun accès au DOM ou au navigateur pour garantir une testabilité unitaire totale.
2. `view.js` : Le module de présentation. Il s'occupe du rendu visuel de la conversation dans le DOM (`renderMessages`) en manipulant de façon sécurisée `textContent` pour prévenir les vulnérabilités XSS.
3. `app.js` : Le chef d'orchestre applicatif. Il relie les événements utilisateurs (formulaire, soumission, bouton effacer), synchronise l'historique dans `localStorage`, et fait le pont entre `brain.js` et `view.js`.
