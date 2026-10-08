import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { findAccount } from './fixtures/review-check/contract/accounts.mjs';
import { accountStatus } from './fixtures/review-check/contract/endpoint.mjs';
import { createCounter } from './fixtures/review-check/locked/counter.mjs';
import { normalizeLabel } from './fixtures/review-check/acceptance/normalize.mjs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

// Authoring guardrails, not measurements of agent discovery or judgment.
test('review retains contract tracing, refutation, and independent high-risk evidence', () => {
  const source = read('../skills/grimoire-review/SKILL.md');
  assert.match(source, /including unchanged files/);
  assert.match(source, /triggering conditions and seek evidence that could refute/);
  assert.match(source, /Drop refuted concerns/);
  assert.match(source, /original requirements and the diff independently/);
  assert.match(source, /second reviewer is optional based on risk and cost/);
});

test('check derives acceptance from original requirements, not passing tests', () => {
  const source = read('../skills/grimoire-check/SKILL.md');
  assert.match(source, /checklist from original requirements before/);
  assert.match(source, /source reference for each scoped outcome/);
  assert.match(source, /including outcomes no test mentions/);
  assert.match(source, /Green tests establish only what their assertions cover/);
  assert.match(source, /Do not make missing tests a new acceptance condition unless the source requires them/);
  assert.match(source, /insufficient evidence is needs-verification/);
});

// Evaluator-only oracles: the fixtures intentionally include defects.
// Passing these checks preserves the challenge, not the product's correctness.
test('contract fixture has a correct new lookup and a broken unchanged caller', () => {
  assert.deepEqual(findAccount('missing'), { found: false });
  assert.deepEqual(findAccount('a1'), { found: true, account: { id: 'a1', name: 'Ada' } });
  assert.equal(accountStatus('a1'), 200);
  assert.equal(accountStatus('missing'), 200); // SPEC R2 requires 404.
});

test('shared lock serializes reads and async increments in the control fixture', async () => {
  const counter = createCounter();
  assert.equal(await counter.read(), 0);
  const increments = Array.from({ length: 100 }, () => counter.increment());
  const queuedRead = counter.read();
  await Promise.all(increments);
  assert.equal(await queuedRead, 100);
  assert.equal(await counter.read(), 100);
});

test('removing the shared lock exposes the suspected lost-update interleaving', async () => {
  const source = read('./fixtures/review-check/locked/counter.mjs');
  const unlocked = source.replace('const withLock = createMutex();', 'const withLock = action => action();');
  assert.notEqual(unlocked, source);
  const { createCounter: createUnlocked } = await import(
    'data:text/javascript;base64,' + Buffer.from(unlocked).toString('base64')
  );
  const counter = createUnlocked();
  await Promise.all([counter.increment(), counter.increment()]);
  assert.equal(await counter.read(), 1);
});

test('acceptance fixture tests are green while required rejection is absent', () => {
  const result = spawnSync(process.execPath, ['--test', 'normalize.test.mjs'], {
    cwd: fileURLToPath(new URL('./fixtures/review-check/acceptance/', import.meta.url)),
    encoding: 'utf8',
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(normalizeLabel('  ADA  '), 'ada');
  for (const input of ['', '   ']) {
    assert.equal(normalizeLabel(input), ''); // SPEC R3 requires RangeError.
  }
});
