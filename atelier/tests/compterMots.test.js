import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { compterMots } from '../public/js/brain.js';

describe('Fonction pure — compterMots', () => {
  it('C1 : compte les mots simples dans une phrase', () => {
    assert.equal(compterMots('salut'), 1);
    assert.equal(compterMots('où est le refuge'), 4);
  });

  it('C2 : gère les séparateurs multiples et tabulations', () => {
    assert.equal(compterMots('un   deux'), 2);
    assert.equal(compterMots('un\tdeux\ntrois'), 3);
  });

  it('C3 : ignore les espaces avant et après', () => {
    assert.equal(compterMots('   salut   '), 1);
  });

  it('C4 : renvoie 0 pour une chaîne vide ou des espaces seuls', () => {
    assert.equal(compterMots(''), 0);
    assert.equal(compterMots('   '), 0);
    assert.equal(compterMots('\t\n'), 0);
  });

  it('C5 : renvoie 0 sans erreur quand l’entrée n’est pas du texte', () => {
    assert.equal(compterMots(undefined), 0);
    assert.equal(compterMots(null), 0);
    assert.equal(compterMots(42), 0);
    assert.equal(compterMots({}), 0);
    assert.equal(compterMots([]), 0);
  });
});