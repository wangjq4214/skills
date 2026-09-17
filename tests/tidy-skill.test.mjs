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
  for (const file of [path, 'skills/grimoire-tidy/references/organization-rules.md']) {
    for (const [, target] of read(file).matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      if (/^(?:[a-z]+:|#)/i.test(target)) continue;
      assert.ok(existsSync(resolve(root, dirname(file), target.split('#')[0])), `${file} -> ${target}`);
    }
  }
});

test('tidy retains retirement gates and completion criteria', () => {
  for (const gate of ['Completion evidence', 'Durable information', 'Dependencies and references', 'Recoverability and authority']) {
    assert.ok(source.includes(`**${gate}:**`), gate);
  }
  const steps = source.split(/^## \d+\. /m).slice(1);
  assert.equal(steps.length, 5);
  for (const step of steps) assert.match(step, /^Completion: .+/m);
});
