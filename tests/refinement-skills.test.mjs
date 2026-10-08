import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const names = ['refine', 'clarify', 'record', 'spec', 'slice'];
const read = path => readFileSync(join(root, path), 'utf8');
const skill = name => read(`skills/grimoire-${name}/SKILL.md`);
const files = directory => readdirSync(join(root, directory), { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? files(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);

// Static authoring checks, not proof of agent behavior in a live workflow.
test('refinement skill identities and invocation modes remain intact', () => {
  for (const name of names) {
    const metadata = skill(name).match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
    assert.match(metadata, new RegExp(`^name: grimoire-${name}$`, 'm'));
    assert.match(metadata, /^description: .+/m);
    assert.equal(/^disable-model-invocation: true$/m.test(metadata), name === 'refine');
  }
});

test('refinement instructions have no broken local references', () => {
  for (const path of names.flatMap(name => files(`skills/grimoire-${name}`))) {
    // Template links in code examples describe future project files, not skill dependencies.
    const prose = read(path).replace(/```[^\n]*\n[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');
    for (const [, target] of prose.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      if (/^(?:[a-z]+:|#)/i.test(target)) continue;
      assert.ok(existsSync(resolve(root, dirname(path), target.split('#')[0])), `${path} -> ${target}`);
    }
  }
  for (const reference of ['relationship-file-template.md', 'vertical-slice-template.md']) {
    assert.ok(skill('slice').includes(`./references/${reference}`), `slice must identify ${reference}`);
  }
});

test('live recording, assumptions, and coordinated artifact boundaries remain explicit', () => {
  assert.match(skill('refine'), /before the next discussion round/);
  assert.match(skill('record'), /Under `grimoire-refine`, process each settled delta before the next discussion round/);
  assert.match(skill('clarify'), /Never present an assumption as a confirmed fact/);
  assert.match(skill('record'), /Skip[^\n]*unconfirmed assumptions/);
  assert.match(skill('refine'), /no downstream invention followed by retrospective recording/);
  for (const name of ['spec', 'slice']) {
    assert.match(skill(name), /require and follow its supplied knowledge boundary, permissions, and endpoint/);
  }
  assert.match(skill('refine'), /recommend user invocation of `grimoire-loop`; do not start it/);
  assert.match(read('skills/grimoire-record/references/adr-template.md'), /body metadata, not YAML frontmatter/);
});

test('standalone artifact skills do not require the refinement coordinator', () => {
  for (const name of ['spec', 'slice']) {
    assert.match(skill(name), /Standalone invocation does not require refine or its handoff/, name);
    assert.match(skill(name), /Under `grimoire-refine`, require and follow/, name);
  }
});

test('refine loads the selected specialist method instead of merely naming it', () => {
  const source = skill('refine');
  assert.match(source, /exact name through the host's registry or discovery mechanism/);
  assert.match(source, /Load their full instructions and required references from the reported paths; inline execution is sufficient/);
  assert.match(source, /Never guess an installation path or treat naming a skill as execution/);
  assert.match(source, /If unavailable or invocation requires user action, report the blocked stage/);
  assert.match(source, /load artifact skills only when selected/);
  assert.match(source, /Run selected specialists and read their outputs/);
});
