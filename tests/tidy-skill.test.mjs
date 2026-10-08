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
test('static: tidy is explicitly user-invoked and discoverable', () => {
  const metadata = source.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(metadata);
  assert.match(metadata[1], /^name: grimoire-tidy$/m);
  assert.match(metadata[1], /^description: .+/m);
  assert.match(metadata[1], /^disable-model-invocation: true$/m);
  const entries = JSON.parse(read('skills.sh.json')).groupings.flatMap(group => group.skills);
  assert.equal(entries.filter(name => name === 'grimoire-tidy').length, 1);
  for (const doc of ['README.md', 'README_zh.md']) assert.ok(read(doc).includes(`./${path}`));
});

test('static: tidy local references resolve', () => {
  for (const [, target] of source.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
    if (/^(?:[a-z]+:|#)/i.test(target)) continue;
    assert.ok(existsSync(resolve(root, dirname(path), target.split('#')[0])), `${path} -> ${target}`);
  }
});

test('static: tidy retains all retirement gates without prescribing an outline', () => {
  for (const gate of ['Knowledge preservation', 'Active-work continuity', 'Tracked recoverability and authority']) {
    assert.ok(source.includes(`**${gate}:**`), gate);
  }
});

// Textual guardrails only: these cannot establish runtime compliance.
test('static: tidy distinguishes excluded inputs from authorized new outputs', () => {
  assert.match(source, /Exclude pre-existing untracked files: do not read, extract from, edit, or delete them/);
  assert.match(source, /Authorized outputs created during this run may be read back, edited, and verified even while untracked/);
  assert.match(source, /Never overwrite an excluded path/);
  assert.match(source, /Do not automatically commit, stage, stash, or archive/);
  assert.match(source, /Read back and verify any new destination before deleting its source/);
  assert.match(source, /list newly created outputs separately with their Git status/);
});

test('static: tidy separates evaluation from ordered execution and final verification', () => {
  assert.match(source, /Audit and planning requests are read-only/);
  assert.match(source, /gate evaluation does not itself perform deletion/);
  assert.match(source, /preserve knowledge first, repair navigation and incoming references second, and delete eligible artifacts last/);
  assert.match(source, /Confirm sources have not changed since review before destructive edits/);
  assert.match(source, /Completion requires no introduced dangling references or unexplained information loss/);
});

test('static: specs keep requirements value without becoming a small-task prerequisite', () => {
  const spec = read('skills/grimoire-spec/SKILL.md');
  assert.match(spec, /A spec retains value after implementation/);
  assert.match(spec, /Small tasks may proceed from clear conversation requirements without a spec/);
  assert.match(spec, /Retirement belongs to explicitly invoked `grimoire-tidy`, not spec completion/);
  assert.match(spec, /retire only redundant documents after its preservation and safety gates pass/);
});

test('static: tickets serve execution and handoff without losing ticket-only requirements', () => {
  const slice = read('skills/grimoire-slice/SKILL.md');
  assert.match(slice, /primarily for multi-step execution and handoff/);
  assert.match(slice, /Tickets are not a permanent task log/);
  assert.match(slice, /Completed redundant tickets are retired by explicitly invoked `grimoire-tidy`/);
  assert.match(slice, /only after preserving any requirements unique to them and active-work continuity/);
  assert.match(slice, /Use an adequate current spec, or conversation requirements/);
  assert.match(slice, /do not create one merely to satisfy a dependency/);
});

test('static: tidy retires redundancy rather than useful contracts or completion status', () => {
  assert.match(source, /not a permanent task log/);
  assert.match(source, /Specs are requirements contracts with continuing value/);
  assert.match(source, /Retire completed redundant documents when the gates below pass/);
  assert.match(source, /do not delete useful specs merely because implementation is complete/);
  assert.match(source, /Status alone neither permits nor blocks retirement/);
  assert.match(source, /Retain a spec or ticket holding unique requirements if no adequate destination exists/);
  assert.match(source, /Do not relocate a useful contract solely to delete its source/);
  assert.match(source, /requirements found only in tickets/);
  assert.doesNotMatch(source, /temporary compression inputs|prefer deletion once/);
});

test('static: retirement still requires tracked evidence, active-work continuity, and authority', () => {
  assert.match(source, /All three gates must pass before deletion/);
  assert.match(source, /inventory every Git-tracked file with `git ls-files`/);
  assert.match(source, /Stop if tracked status cannot be established/);
  assert.match(source, /no current work loses its only execution contract/);
  assert.match(source, /Do not discard execution detail still needed by active work/);
  assert.match(source, /the candidate is tracked and deletion is authorized/);
  assert.match(source, /Preserve working-tree changes unless the user explicitly authorizes deleting content unrecoverable from the index or history/);
  assert.match(source, /Retain candidates blocked by uncertainty, unresolved contradictions, or unauthorized reference repairs/);
});
