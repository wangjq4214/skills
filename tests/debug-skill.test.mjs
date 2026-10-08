import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createShop } from './fixtures/debug-quote/quote.mjs';

const source = readFileSync(new URL('../skills/grimoire-debug/SKILL.md', import.meta.url), 'utf8');

// Authoring guardrails only, not proof of agent behavior. Runtime evaluation is
// described separately in debug-acceptance.md.
test('debug scales depth without mandatory TDD or a tool checklist', () => {
  for (const mode of ['Direct', 'Investigate', 'Deep']) assert.ok(source.includes(`**${mode}**`));
  assert.match(source, /without asking the user to select a mode/);
  assert.match(source, /TDD is not required/);
  assert.match(source, /not a checklist of required tools/);
});

test('debug retains causal evidence, original-symptom verification, and repair boundaries', () => {
  assert.match(source, /An error message is a clue, not proof/);
  assert.match(source, /predict an observation that would distinguish it from alternatives/);
  assert.match(source, /also verify the original scenario/);
  assert.match(source, /single clean run does not establish resolution/);
  assert.match(source, /Diagnosis alone does not authorize repairs/);
  assert.match(source, /omitted checks remain unverified/);
  for (const name of ['implement', 'test', 'check']) assert.ok(source.includes(`\`grimoire-${name}\``));
});

// Preserve the intentionally buggy evaluator fixture; never use this assertion
// as the desired product contract or show it to the blind diagnostic agent.
test('blind fixture retains a correct fresh quote and the seeded history-dependent failure', () => {
  const fresh = createShop();
  fresh.setCurrency('EUR');
  fresh.setQuantity(2);
  assert.deepEqual(fresh.quote('notebook'), { currency: 'EUR', unitPrice: 900, quantity: 2, total: 1800 });

  const used = createShop();
  assert.deepEqual(used.quote('notebook'), { currency: 'USD', unitPrice: 1000, quantity: 1, total: 1000 });
  used.setQuantity(2);
  used.setCurrency('EUR');
  assert.deepEqual(used.quote('notebook'), { currency: 'USD', unitPrice: 1000, quantity: 2, total: 2000 });
});
