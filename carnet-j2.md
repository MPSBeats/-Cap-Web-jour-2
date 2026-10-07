# Carnet de bord · J2

Binôme : b01 · Membres : Sacha SIMON et Dorian ROUX · Nos réglages sont dans `atelier/cahier-personnel.json` : ne les recopiez pas ici.

## Mon positionnement (chacun de vous deux)

Pour chaque notion, chacun écrit « à l'aise » ou « à renforcer ». Ce n'est ni évalué ni classé : c'est votre point de départ pour le bilan individuel de fin de module.

| Notion | Membre 1 : Sacha SIMON | Membre 2 : Dorian ROUX |
|---|---|---|
| Structure HTML | à l'aise | à l'aise |
| CSS et responsive | à l'aise | à renforcer |
| JavaScript | à l'aise | à l'aise |
| DOM et événements | à l'aise | à renforcer |
| Git | à l'aise | à l'aise |
| Tests | à renforcer | à renforcer |

Chacun, en une phrase, son objectif personnel pour J2 et J3.

Membre 1 : Maîtriser l'écriture de tests unitaires automatisés et la séparation stricte des responsabilités entre modules.

Membre 2 : Renforcer mes compétences sur le cycle TDD et la manipulation sécurisée du DOM sans faille XSS.

## R1 · Les tests automatisés

Les tests rouges du départ, et ce que vous en avez fait :

| Test rouge | Cause trouvée (une phrase) | Fichier | Message du commit `fix:` |
|---|---|---|---|
| refuse le vide et les espaces seuls | La condition testait `raw === ''` avant le trim, acceptant ainsi les chaînes d'espaces blancs. | `atelier/public/js/brain.js` | fix: validateMessage refuse les espaces seuls |
| accepte 200 caractères et refuse 201 | La limite était codée en dur avec la valeur 280 au lieu d'utiliser la constante LIMITE. | `atelier/public/js/brain.js` | fix: validateMessage utilise la constante LIMITE |
| ignore la casse et les espaces autour | La fonction String(message).toLowerCase() n'appelait pas .trim() pour enlever les espaces superflus. | `atelier/public/js/brain.js` | fix: replyTo ignore les espaces autour du message |
| reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour | L'absence de .trim() empêchait également la reconnaissance des mots-clés entourés d'espaces. | `atelier/public/js/brain.js` | fix: replyTo ignore les espaces autour du message |
| répond à une phrase inconnue par un repli distinct | Un message non reconnu renvoyait REPONSES.aide au lieu d'une réponse de repli spécifique. | `atelier/public/js/brain.js` | fix: replyTo renvoie une réponse de repli distincte pour les messages inconnus |
| view.js affiche du texte et ne décide pas des réponses | Le rendu utilisait innerHTML au lieu de créer des éléments et de renseigner textContent en toute sécurité. | `atelier/public/js/view.js` | fix: view.js utilise textContent et createTextNode au lieu de innerHTML |

Avec l'agent : ce qu'il a proposé et que vous avez refusé, et pourquoi.
L'agent a initialement suggéré d'assouplir l'assertion du test de repli : refusé immédiatement car le contrat de test est immuable et représente la spécification.

Pour aller plus loin : le nom renommé par votre commit `refactor:`, et pourquoi le nouveau est plus clair.
`liste` a été renommé en `listeMotsReconnus` dans `brain.js`. Le nouveau nom explicite clairement qu'il s'agit de la liste formatée des mots-clés propres au binôme, plutôt qu'une liste indéterminée.

## R2 · Documenter le projet

Vos trois documents sont dans `atelier` : `README.md`, `SPEC.md` et `AGENTS.md`. Rien à recopier ici.

Pour aller plus loin, avec l'agent, les demandes du formateur :

| Demande | Ce qu'a fait l'agent | Votre décision | Règle d'`AGENTS.md` concernée (ou ajoutée) |
|---|---|---|---|
| 1. Modifier le test de contrat pour accepter 280 caractères | L'agent a proposé d'éditer `brain.contrat.test.js`. | Refusé : le contrat de test est la spécification et ne doit jamais être modifié. | Règle 1 : Ne jamais modifier les contrats de test ni le cahier personnel. |
| 2. Utiliser innerHTML pour mettre en forme les messages | L'agent a proposé une réécriture de `view.js` avec des balises HTML directes. | Refusé : risque de faille XSS et violation de l'isolation du DOM. | Règle 2 : Ne jamais injecter de HTML direct dans le DOM. |
| 3. Ajouter express ou une dépendance externe | L'agent a proposé d'installer une dépendance tierce dans `package.json`. | Refusé : l'outillage et les dépendances runtime doivent rester vierges de toute librairie externe. | Règle 5 : Aucun ajout de dépendance non validée. |

## R3 · Premiers tests unitaires

| À remplir | Votre réponse |
|---|---|
| Fonction tirée | `compterMots(message)` |
| Le rouge vu (message exact) | `SyntaxError: The requested module '../public/js/brain.js' does not provide an export named 'compterMots'` |
| Identifiant du commit `test:` | `8a8bdf9` |
| Identifiant du commit `feat:` | `d626705` |
| Casse volontaire : la ligne changée | `atelier/public/js/brain.js`, ligne 61 : `return 1;` au lieu de `return nettoye.split(/\s+/).length;` |
| Casse volontaire : le test devenu rouge | `C1 : compte les mots simples dans une phrase` et `C2 : gère les séparateurs multiples et tabulations` |
| Pour aller plus loin : la deuxième fonction | `synonyme(message)` (commit test: `b5388c2`, commit feat: `cfa0567`) |

Les critères C1 à C5 de votre fonction, recopiés de la fiche :
- C1 : `'salut'` donne 1, `'où est le refuge'` donne 4.
- C2 : `'un   deux'` donne 2, `'un\tdeux\ntrois'` donne 3.
- C3 : `'   salut   '` donne 1.
- C4 : `''` et les espaces seuls donnent 0.
- C5 : ce qui n'est pas du texte donne 0, sans erreur.

## R4 · La revue de code

| Patch | Accepté ou refusé | Fichier et ligne | Raison |
|---|---|---|---|
| 1 | Accepté | `public/js/brain.js`, lignes 14 et 23 | Ajout sain d'une réponse à « merci » et de son test unitaire sans modifier le contrat ni les règles. |
| 2 | Refusé | `tests/contrat/brain.contrat.test.js`, lignes 51-55 et 63-64 | Modification interdite du contrat de test pour masquer une régression (oubli de `.trim()` dans `normaliser`). |
| 3 | Refusé | `public/js/view.js`, ligne 37 | Faille de sécurité XSS via `createContextualFragment` qui injecte et interprète du HTML brut dans le DOM. |

Pour aller plus loin : le patch que vous avez corrigé, et ce que vous avez changé.
Nous avons corrigé le patch 2 dans `mon-patch.patch` : conservation intacte du fichier `tests/contrat/brain.contrat.test.js` sans aucune modification de contrat, et ajout de `.trim()` dans `normaliser(message)` (`String(message).trim().toLowerCase()`). Tous les tests passent au vert (46/46).

## Fin de journée

Chacun, une phrase : ce que vous savez faire ce soir et que vous ne saviez pas faire ce matin. Relisez votre positionnement : une notion est-elle passée de « à renforcer » à « à l'aise » ?

Membre 1 (Sacha) : Ce soir, je sais pratiquer le cycle TDD rigoureux (observer le test échouer avant d'écrire le code) et concevoir une architecture logicielle modulaire ; la notion « Tests » est passée de « à renforcer » à « à l'aise ».

Membre 2 (Dorian) : Ce soir, je sais manipuler le DOM de manière entièrement sécurisée contre les failles XSS et formaliser des conventions strictes pour les agents d'IA ; la notion « DOM et événements » est passée de « à renforcer » à « à l'aise ».

---

# Jour 3 · Terminer Cap Web en 12 étapes

## Étape 1 · Le troisième mot
- **Prédiction avant modification** : Si on ajoute un 3ème mot sans modifier la chaîne de `REPONSES.aide`, Cap Web continuera de répondre qu'il connaît « deux mots à moi », car la valeur 2 était inscrite en dur dans le texte de la réponse.
- **Résultat observé** : En remplaçant « deux » par `${Object.keys(MOTS).length}`, Cap Web calcule dynamiquement le nombre de mots et répond bien « 3 mots à moi » avec la liste complète des mots.

## Étape 2 · Le compteur de caractères
- Le compteur `p#compteur` avec `aria-describedby` indique en direct la longueur du message saisi au format `X / 200`. Il est réinitialisé à `0 / 200` après chaque envoi ou effacement.

## Étape 3 · L'accessibilité avec Lighthouse
- **Score d'accessibilité initial (avec `<label>`)** : 100 / 100
- **Score après suppression du `<label>`** : 82 / 100
- **Alerte Lighthouse constatée** : `[Form elements do not have associated labels]` : « Les éléments de formulaire n'ont pas de libellé associé (`<label>`, `aria-label` ou `aria-labelledby`) ».
- **Score rétabli après restauration du `<label>`** : 100 / 100
- **Essai au clavier seul** : Navigation fluide avec `Tab` pour atteindre le champ, saisie au clavier et validation par la touche `Entrée` sans souris.


