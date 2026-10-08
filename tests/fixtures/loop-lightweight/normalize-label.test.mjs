import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeLabel } from './normalize-label.mjs';

test('trims surrounding whitespace and lowercases labels', () => {
  assert.equal(normalizeLabel('  HeLLo  '), 'hello');
});

test('whitespace-only input yields an empty label', () => {
  assert.equal(normalizeLabel(' \t\n '), '');
});

test('preserves internal spacing and already normalized labels', () => {
  assert.equal(normalizeLabel('Two  Words'), 'two  words');
  assert.equal(normalizeLabel('ready'), 'ready');
  assert.equal(normalizeLabel(''), '');
});
