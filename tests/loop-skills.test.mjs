import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const skill = name => read(`skills/grimoire-${name}/SKILL.md`);
const reference = (name, file) => read(`skills/grimoire-${name}/references/${file}.md`);

// Static authoring regression checks, not execution of an agent or a policy engine.
// These protect explicit boundary rules without prescribing heading counts/order.
test('every loop specialist states the coordinated permission boundary', () => {
  for (const name of ['plan', 'implement', 'test', 'review', 'check']) {
    assert.match(skill(name), /Under orchestration, the caller's execution contract governs/, name);
    assert.match(skill(name), /Apply only enabled responsibilities/, name);
  }
});

test('planning supports conversation-only work and minimal directory creation', () => {
  const source = skill('plan');
  assert.match(source, /If persistence is disabled[\s\S]*?do not create directories, files, or a viewer/);
  assert.match(source, /create missing parent directories when authorized/);
  assert.match(source, /Do not require grimoire-init or change registration, knowledge files, or Git configuration/);
  assert.doesNotMatch(source, /If not, stop|tell the user to run grimoire-init/);
  assert.match(skill('implement'), /a persisted plan is not required/);
});

test('implementation and test defaults cannot restore excluded verification or writes', () => {
  assert.match(skill('implement'), /When verification is enabled/);
  assert.match(skill('implement'), /disabled verification stays omitted, not passed/);
  assert.match(skill('test'), /Authoring-only work must not execute tests/);
  assert.match(skill('test'), /execution-only work must not author or repair them/);
  assert.match(skill('loop'), /Do not restore a disabled stage through a specialist's defaults/);
});

test('missing evidence and command failures do not establish product defects', () => {
  assert.match(skill('check'), /\*\*gap\*\* — evidence demonstrates/);
  assert.match(skill('check'), /Absence of evidence is not evidence of missing behavior/);
  assert.match(skill('check'), /exceeds the authorized scope, not merely an omitted plan detail/);
  for (const name of ['loop', 'review']) {
    assert.match(skill(name), /A failed command alone does not prove a product defect/);
    assert.match(skill(name), /baseline failures/);
  }
});

test('artifact transitions preserve history and distinguish pending verification', () => {
  const source = reference('check', 'status-transitions');
  assert.match(source, /supersession or approved retirement before implementation progress/);
  assert.match(source, /cannot reactivate a retired decision/);
  assert.match(source, /backward implementation-status transition only when current evidence demonstrates a regression or approved scope change/);
  assert.match(source, /Implementation complete; identified required verification remains pending.*Testing/);
  assert.match(source, /all required verification satisfied.*Completed/);
  assert.match(source, /Excluded or unavailable required checks do not justify/);
  assert.match(skill('check'), /Explicit read-only requests prohibit status writes in any mode/);
  assert.match(skill('check'), /coordinator owns shared artifact status/);
});

test('human checkpoints stop downstream work and bind resumption to current evidence', () => {
  const source = skill('loop');
  assert.match(source, /end the turn/);
  assert.match(source, /Do not substitute automated approval/);
  assert.match(source, /launch downstream work/);
  assert.match(source, /partial or ambiguous feedback leaves unresolved checkpoint work paused/);
  assert.match(source, /Invalidate affected evidence if files changed while waiting/);
});

test('conditional batch evidence remains reachable without fixing document structure', () => {
  for (const name of ['test', 'review', 'check']) {
    assert.match(skill(name), /\(\.\/references\/batch-context\.md\)/, name);
    assert.match(reference(name, 'batch-context'), /snapshot|fingerprint/, name);
  }
  assert.match(reference('test', 'batch-context'), /collisions/);
  assert.match(reference('review', 'batch-context'), /cross-unit seams/);
  assert.match(reference('check', 'batch-context'), /same scope, counter, filters, and formatting/);
  assert.match(reference('loop', 'composition-examples'), /not additional rules or evidence of runtime compliance/);
});

test('loop composition retains exclusions, revisions, and no-work boundaries', () => {
  const source = skill('loop');
  assert.match(source, /Apply defaults only to unspecified choices/);
  assert.match(source, /Only review.*excludes other work stages/);
  assert.match(source, /Disabling a parent stage disables its substages unless explicitly retained/);
  assert.match(source, /Later instructions revise remaining work/);
  assert.match(source, /If persistence is disabled, pass the approach in conversation/);
  assert.match(source, /if planning is disabled, use the original source/);
  assert.match(source, /Risk does not authorize delegation or excluded work/);
});

test('loop finalization keeps evidence freshness and acceptance separate from task completion', () => {
  const source = skill('loop');
  assert.match(source, /source, dependencies, and environment remain applicable/);
  assert.match(source, /refresh affected enabled checks over the combined result/);
  assert.match(source, /honor single-pass\/user limits/);
  assert.match(source, /verification-only formatting uses non-writing checks/);
  assert.match(source, /all required evidence is available/);
  assert.match(source, /Never claim overall acceptance without required evidence/);
  assert.match(source, /If reporting is disabled, omit routine summaries, not necessary questions, checkpoints, or blockers/);
});
