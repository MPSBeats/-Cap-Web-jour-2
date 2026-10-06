# Spécification fonctionnelle · Cap Web

Ce document décrit les 5 critères fonctionnels essentiels de Cap Web pour le binôme b01, ainsi que leur modalité exacte de vérification.

1. Quand on envoie 201 caractères, Cap Web refuse le message et l'erreur précise « Le message doit contenir 200 caractères au maximum. ».
   - Vérifié par : Le test « accepte 200 caractères et refuse 201 » dans tests/contrat/brain.contrat.test.js.

2. Quand on saisit une entrée vide ou des espaces seuls, Cap Web refuse la soumission et affiche « Le message ne doit pas être vide. ».
   - Vérifié par : Le test « refuse le vide et les espaces seuls » dans tests/contrat/brain.contrat.test.js.

3. Quand on saisit «  SALUT  » ou «  MENU  » avec des majuscules et des espaces autour, Cap Web nettoie la saisie et renvoie la réponse exacte associée sans considérer les variations typographiques.
   - Vérifié par : Les tests « ignore la casse et les espaces autour » et « reconnaît les deux mots du cahier personnel » dans tests/contrat/brain.contrat.test.js.

4. Quand on saisit une phrase inconnue, Cap Web renvoie une réponse de repli dédiée et distincte de l'aide générale.
   - Vérifié par : Le test « répond à une phrase inconnue par un repli distinct » dans tests/contrat/brain.contrat.test.js.

5. Quand un message contient du HTML comme « <b>gras</b> », Cap Web affiche la chaîne brute avec ses chevrons sans exécuter ni interpréter aucune balise HTML.
   - Vérifié par : Le test « view.js affiche du texte et ne décide pas des réponses » dans tests/contrat/brain.contrat.test.js et l'essai manuel dans le navigateur.