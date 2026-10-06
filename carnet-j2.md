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
| Fonction tirée | |
| Le rouge vu (message exact) | |
| Identifiant du commit `test:` | |
| Identifiant du commit `feat:` | |
| Casse volontaire : la ligne changée | |
| Casse volontaire : le test devenu rouge | |
| Pour aller plus loin : la deuxième fonction | |

Les critères C1 à C5 de votre fonction, recopiés de la fiche :

## R4 · La revue de code

| Patch | Accepté ou refusé | Fichier et ligne | Raison |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

Pour aller plus loin : le patch que vous avez corrigé, et ce que vous avez changé.

## Fin de journée

Chacun, une phrase : ce que vous savez faire ce soir et que vous ne saviez pas faire ce matin. Relisez votre positionnement : une notion est-elle passée de « à renforcer » à « à l'aise » ?
