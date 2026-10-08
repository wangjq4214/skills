import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeLabel } from './normalize.mjs';

test('trims whitespace', () => {
  assert.equal(normalizeLabel('  ada  '), 'ada');
});

test('lowercases a label', () => {
  assert.equal(normalizeLabel('ADA'), 'ada');
});
