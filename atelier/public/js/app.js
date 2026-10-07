// Cap Web — câblage : lire le formulaire, mettre à jour l'historique, demander l'affichage.
import { validateMessage, replyTo, LIMITE } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const effacer = document.querySelector('#effacer');
const versionElt = document.querySelector('#version');
const limiteElt = document.querySelector('#limite');
const compteurElt = document.querySelector('#compteur');

function majCompteur() {
  if (compteurElt) {
    compteurElt.textContent = `${champ.value.length} / ${LIMITE}`;
  }
}

const CLE = 'capweb.historique';
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(historique));
}

function charger() {
  const brut = localStorage.getItem(CLE);
  if (brut === null) {
    return;
  }
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees);
    }
  } catch {
    statut.textContent = 'Conversation précédente illisible : nouvelle conversation.';
  }
}

formulaire.addEventListener('submit', (event) => {
  event.preventDefault();
  const controle = validateMessage(champ.value);
  if (!controle.ok) {
    statut.textContent = controle.error;
    champ.focus();
    return;
  }
  historique.push({ role: 'user', text: controle.value });
  historique.push({ role: 'assistant', text: replyTo(controle.value) });
  sauvegarder();
  renderMessages(historique, liste);
  champ.value = '';
  majCompteur();
  statut.textContent = '';
  champ.focus();
});

champ.addEventListener('input', majCompteur);

effacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});

// La limite vient de brain.js : un seul endroit à modifier.
champ.maxLength = LIMITE;
limiteElt.textContent = String(LIMITE);
majCompteur();

charger();
renderMessages(historique, liste);

async function afficherVersion() {
  try {
    const reponse = await fetch('/version.json', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error('Erreur HTTP');
    }
    const donnees = await reponse.json();
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
      return;
    }
    if (versionElt) {
      versionElt.textContent = 'version indisponible';
    }
  } catch {
    if (versionElt) {
      versionElt.textContent = 'version indisponible';
    }
  }
}

afficherVersion();
