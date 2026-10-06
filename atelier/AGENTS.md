# Conventions et règles du projet · Cap Web

Ce document fixe les conventions de code et les règles obligatoires applicables par les développeurs et agents d'IA travaillant sur Cap Web.

## 1. Conventions de nommage

- **Fonctions** : Une fonction porte un verbe d'action explicite en camelCase décrivant fidèlement son rôle (ex. `validateMessage`, `replyTo`, `compterMots`).
- **Constantes** : Une constante de configuration globale s'écrit en SCREAMING_SNAKE_CASE (ex. `LIMITE`), tandis qu'une constante interne porte un nom descriptif en camelCase (ex. `listeMotsReconnus`, `REPONSES`).
- **Fichiers** : Les noms de fichiers sont en minuscules (kebab-case ou camelCase) sans espaces ni caractères spéciaux, suffixés par `.js` ou `.test.js` pour les tests unitaires.
- **Messages de commit** : Les commits suivent le format structuré `type: description` en minuscules avec un préfixe clair (`fix:`, `feat:`, `test:`, `docs:`, `refactor:`), décrivant précisément l'impact du changement.

## 2. Interdits stricts

1. **Ne jamais modifier les contrats de test ni le cahier personnel** : Il est formellement interdit de toucher aux fichiers de `tests/contrat/`, `browser/contrat.spec.js` ou `cahier-personnel.json`. Si un test est rouge, c'est le code de `public/js/` qui doit être corrigé.
2. **Ne jamais injecter de HTML direct dans le DOM** : L'utilisation de `innerHTML`, `outerHTML` ou `insertAdjacentHTML` est proscrite pour éviter toute faille XSS. Les données doivent toujours être insérées avec `textContent` et des nœuds DOM créés unitairement.
3. **Préserver la pureté de brain.js** : Le module `brain.js` ne doit jamais accéder au DOM, à `document`, à `window` ou à `localStorage`. Il est exclusivement réservé aux fonctions pures déterministes.
4. **Aucune donnée sensible ni secret dans le dépôt** : Aucun mot de passe, clé d'API, jeton personnel ou donnée privée ne doit être écrit dans les fichiers ni partagé lors des échanges.
5. **Aucun ajout de dépendance non validée** : Aucune bibliothèque tierce runtime ne doit être ajoutée au projet ; l'application repose uniquement sur les APIs natives de Node.js et du navigateur.