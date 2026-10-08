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

test('turn-batched durable recording and coordinated artifact boundaries remain explicit', () => {
  assert.match(skill('refine'), /Within each user turn, merge related settled updates into one pending batch/);
  assert.match(skill('refine'), /before yielding to the user or handing off to selected artifact work/);
  assert.match(skill('refine'), /only project knowledge with lasting value for later tasks/);
  assert.match(skill('refine'), /If nothing qualifies[\s\S]*without invoking record/);
  assert.match(skill('refine'), /Reuse the turn's relevant reads and record results unless sources changed/);
  assert.match(skill('record'), /process the coordinator's qualifying batch before a user-turn pause or artifact handoff/);
  for (const name of ['refine', 'record', 'clarify']) {
    assert.doesNotMatch(skill(name), /process each settled delta|After each resolved discussion delta|overrides standalone batching|live recording before the next round/);
  }
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

test('spec and slice create only authorized artifact paths without initialization', () => {
  for (const [name, request, directory] of [
    ['spec', 'a spec', 'spec'], ['slice', 'tickets', 'ticket'],
  ]) {
    const source = skill(name);
    assert.ok(source.includes(`A request to create ${request} authorizes creating \`.grimoire/${directory}/\` and missing parents unless writes are restricted`), name);
    assert.match(source, /Do not require `grimoire-init` or create unrelated directories or knowledge files/, name);
    assert.match(source, /use init only when establishing the CONTEXT\/ADR system is requested/, name);
    assert.match(source, /A path\/type conflict or denied write blocks persistence, not permission to replace existing content/, name);
    assert.match(source, /Missing optional knowledge files are not prerequisites/, name);
    assert.match(source, /unused.*(?:names|folder)/, name);
    assert.doesNotMatch(source, /otherwise stop and request `grimoire-init`/, name);
  }
});

test('artifact creation leaves Git policy, registration, and commits separately authorized', () => {
  for (const name of ['spec', 'slice']) {
    const source = skill(name);
    assert.match(source, /Leave Git configuration \(including ignore rules\) and agent registration unchanged without separate explicit authorization/, name);
    assert.match(source, /existing Git allowlist permits Markdown/, name);
    assert.match(source, /(?:Report|report) conflicting ignore rules rather than bypassing them/, name);
  }
  assert.match(skill('spec'), /neither installs that policy nor authorizes staging or committing/);
  assert.match(skill('slice'), /whether to commit them depends on the task lifecycle and user authorization, not ticket creation/);
});

test('refinement distinguishes missing artifact directories from pending knowledge initialization', () => {
  assert.match(skill('refine'), /missing `\.grimoire\/` alone does not block spec\/ticket creation/);
  assert.match(skill('refine'), /Keep qualifying record updates pending if initialization or writes are blocked/);
  assert.match(skill('refine'), /the recording and completion gates still apply/);
  assert.match(skill('record'), /Before qualifying writes/);
  assert.match(skill('record'), /an artifact-only `\.grimoire\/` is not initialization/);
  assert.match(skill('record'), /`grimoire-init` is needed to establish CONTEXT\/ADR/);
  assert.match(skill('init'), /Write nothing until the user explicitly approves the plan/);
});
