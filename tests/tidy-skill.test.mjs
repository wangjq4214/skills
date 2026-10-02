import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8').replace(/\r\n/g, '\n');
const path = 'skills/grimoire-tidy/SKILL.md';
const source = read(path);

// Static authoring checks, not proof of an agent's runtime deletion decisions.
test('tidy is explicitly user-invoked and discoverable', () => {
  const metadata = source.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(metadata);
  assert.match(metadata[1], /^name: grimoire-tidy$/m);
  assert.match(metadata[1], /^description: .+/m);
  assert.match(metadata[1], /^disable-model-invocation: true$/m);
  const entries = JSON.parse(read('skills.sh.json')).groupings.flatMap(group => group.skills);
  assert.equal(entries.filter(name => name === 'grimoire-tidy').length, 1);
  for (const doc of ['README.md', 'README_zh.md']) assert.ok(read(doc).includes(`./${path}`));
});

test('tidy local references resolve', () => {
  for (const [, target] of source.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
    if (/^(?:[a-z]+:|#)/i.test(target)) continue;
    assert.ok(existsSync(resolve(root, dirname(path), target.split('#')[0])), `${path} -> ${target}`);
  }
});

test('tidy retains all retirement gates without prescribing an outline', () => {
  for (const gate of ['Knowledge preservation', 'Active-work continuity', 'Tracked recoverability and authority']) {
    assert.ok(source.includes(`**${gate}:**`), gate);
  }
});

// Textual guardrails only: these cannot establish runtime compliance.
test('tidy distinguishes excluded inputs from authorized new outputs', () => {
  assert.match(source, /Exclude pre-existing untracked files: do not read, extract from, edit, or delete them/);
  assert.match(source, /Authorized outputs created during this run may be read back, edited, and verified even while untracked/);
  assert.match(source, /Never overwrite an excluded path/);
  assert.match(source, /Do not automatically commit, stage, stash, or archive/);
  assert.match(source, /Read back and verify any new destination before deleting its source/);
  assert.match(source, /list newly created outputs separately with their Git status/);
});

test('tidy separates evaluation from ordered execution and final verification', () => {
  assert.match(source, /Audit and planning requests are read-only/);
  assert.match(source, /gate evaluation does not itself perform deletion/);
  assert.match(source, /preserve knowledge first, repair navigation and incoming references second, and delete eligible artifacts last/);
  assert.match(source, /Confirm sources have not changed since review before destructive edits/);
  assert.match(source, /Completion requires no introduced dangling references or unexplained information loss/);
});
