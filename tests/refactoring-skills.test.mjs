import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const selected = ['map', 'refactor', 'improve', 'simplify', 'test', 'review', 'check'];
const read = path => readFileSync(join(root, path), 'utf8').replace(/\r\n/g, '\n');
const skillPath = name => `skills/grimoire-${name}/SKILL.md`;

function markdownFiles(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(entry => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? markdownFiles(path) : path.endsWith('.md') ? [path] : [];
  });
}

// Static authoring checks; these do not prove an agent will execute the playbooks correctly.
test('skill names and invocation modes remain explicit', () => {
  for (const name of selected) {
    const source = read(skillPath(name));
    const metadata = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(metadata, `${name}: frontmatter missing`);
    assert.match(metadata[1], new RegExp(`^name: grimoire-${name}$`, 'm'));
    assert.match(metadata[1], /^description: .+/m);
    const userInvoked = name === 'refactor';
    assert.equal(/^disable-model-invocation: true$/m.test(metadata[1]), userInvoked, name);
  }
});

test('local Markdown references resolve in all selected skills and entry docs', () => {
  const paths = selected.flatMap(name => markdownFiles(`skills/grimoire-${name}`));
  paths.push('README.md', 'README_zh.md');
  for (const path of paths) {
    for (const [, target] of read(path).matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      if (/^(?:[a-z]+:|#)/i.test(target)) continue;
      const destination = decodeURIComponent(target.split('#')[0]);
      assert.ok(existsSync(resolve(root, dirname(path), destination)), `${path} -> ${target}`);
    }
  }
});

test('selected skills are discoverable and registry entries are unique and valid', () => {
  const registry = JSON.parse(read('skills.sh.json'));
  const entries = registry.groupings.flatMap(group => group.skills);
  assert.equal(new Set(entries).size, entries.length);
  for (const name of entries) assert.ok(existsSync(join(root, 'skills', name, 'SKILL.md')), name);
  for (const name of selected) {
    assert.ok(entries.includes(`grimoire-${name}`), name);
    for (const doc of ['README.md', 'README_zh.md']) {
      assert.ok(read(doc).includes(`./${skillPath(name)}`), `${doc}: ${name}`);
    }
  }
});

test('literal JSON examples in persistent map documentation parse', () => {
  const source = markdownFiles('skills/grimoire-map').map(read).join('\n');
  const examples = [...source.matchAll(/```json\s*\n([\s\S]*?)\n```/g)];
  assert.ok(examples.length > 0);
  for (const [, example] of examples) assert.doesNotThrow(() => JSON.parse(example));
});

test('QA extensions preserve existing public classification vocabularies and phases', () => {
  for (const [name, phases] of [['test', 7], ['review', 5], ['check', 7]]) {
    const source = read(skillPath(name));
    const headings = [...source.matchAll(/^## (\d+)\. /gm)].map(match => Number(match[1]));
    assert.deepEqual(headings, Array.from({ length: phases }, (_, i) => i + 1), name);
    assert.match(source, /^# Optional refactoring and batch context$/m);
  }
  for (const word of ['blocking', 'needs-verification', 'suggestion', 'praise']) {
    assert.ok(read(skillPath('review')).includes(`**${word}**`), word);
  }
  for (const word of ['match', 'gap', 'deviation', 'extra', 'needs-verification']) {
    assert.ok(read(skillPath('check')).includes(`**${word}**`), word);
  }
});

test('map wire example resolves its inventory and reproduces its snapshot fingerprint', () => {
  const source = read('skills/grimoire-map/references/wire-format.md');
  const example = source.match(/```json\s*\n([\s\S]*?)\n```/);
  assert.ok(example);
  const bundle = JSON.parse(example[1]);
  const index = bundle['index.json'];
  const inventory = bundle[index.inventory];
  assert.ok(inventory, 'inventory path is map-root relative');
  assert.equal(index.schemaVersion, 1);
  assert.equal(inventory.schemaVersion, 1);
  assert.equal(index.snapshot.id, inventory.snapshotId);
  assert.equal(index.snapshot.algorithm, 'sha256-path-hash-v1');
  assert.deepEqual(inventory.pages, []);
  const entries = [...inventory.entries].sort((a, b) => Buffer.compare(Buffer.from(a.path), Buffer.from(b.path)));
  const pairs = entries.map(entry => [entry.path, entry.hash]);
  assert.equal(index.snapshot.sourceFingerprint, createHash('sha256').update(JSON.stringify(pairs)).digest('hex'));
  assert.equal(index.coverage.included, entries.length);
  for (const status of ['inspected', 'inventoried-only', 'partial', 'blocked']) {
    assert.equal(index.coverage[status], entries.filter(entry => entry.coverage === status).length);
  }
  assert.equal(index.coverage.unclassified, entries.filter(entry => entry.moduleId === null).length);
});

test('README invocation tables match all registered skill metadata', () => {
  const names = JSON.parse(read('skills.sh.json')).groupings.flatMap(group => group.skills);
  for (const [doc, userHeading, modelHeading] of [
    ['README.md', '### 👤 User-invoked', '### 🤖 Model-invoked'],
    ['README_zh.md', '### 👤 用户调用', '### 🤖 模型调用'],
  ]) {
    const source = read(doc);
    const section = heading => {
      assert.ok(source.includes(heading), `${doc}: ${heading}`);
      return source.split(heading)[1].split(/^#{2,3} /m)[0];
    };
    const userSection = section(userHeading);
    const modelSection = section(modelHeading);
    for (const name of names) {
      const path = `skills/${name}/SKILL.md`;
      const metadata = read(path).match(/^---\n([\s\S]*?)\n---/)[1];
      const userOnly = /^disable-model-invocation: true$/m.test(metadata);
      const link = `](./${path})`;
      assert.equal(userSection.split(link).length - 1, userOnly ? 1 : 0, `${doc}: ${name} user table`);
      assert.equal(modelSection.split(link).length - 1, userOnly ? 0 : 1, `${doc}: ${name} model table`);
    }
  }
});

test('refactoring guidance is nested under Quick Start', () => {
  for (const [doc, quickStart, refactoring] of [
    ['README.md', '## 🚀 Quick Start', '### Repository-scale refactoring'],
    ['README_zh.md', '## 🚀 快速开始', '### 大型代码库改造'],
  ]) {
    const source = read(doc);
    assert.ok(source.includes(quickStart), doc);
    assert.ok(source.split(quickStart)[1].split(/^## /m)[0].includes(refactoring), doc);
  }
});
