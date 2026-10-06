import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { synonyme } from '../public/js/brain.js';

describe('Fonction pure — synonyme', () => {
  it('C1 : fait correspondre coucou, hello et bonsoir vers salut', () => {
    assert.equal(synonyme('coucou'), 'salut');
    assert.equal(synonyme('hello'), 'salut');
    assert.equal(synonyme('bonsoir'), 'salut');
  });

  it('C2 : fait correspondre help et sos vers aide', () => {
    assert.equal(synonyme('help'), 'aide');
    assert.equal(synonyme('sos'), 'aide');
  });

  it('C3 : ignore la casse et les espaces autour', () => {
    assert.equal(synonyme('  HELLO '), 'salut');
    assert.equal(synonyme(' Help '), 'aide');
  });

  it('C4 : renvoie un autre message en minuscules sans les espaces autour', () => {
    assert.equal(synonyme('  Météo '), 'météo');
    assert.equal(synonyme('Reservation'), 'reservation');
  });

  it('C5 : renvoie une chaîne vide sans erreur quand l’entrée n’est pas du texte', () => {
    assert.equal(synonyme(undefined), '');
    assert.equal(synonyme(null), '');
    assert.equal(synonyme(42), '');
    assert.equal(synonyme({}), '');
    assert.equal(synonyme([]), '');
  });
});