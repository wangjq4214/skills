import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const selected = ['debug', 'map', 'refactor', 'improve', 'simplify', 'loop', 'plan', 'implement', 'test', 'review', 'check'];
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
    const userInvoked = ['refactor', 'loop'].includes(name);
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

test('QA preserves public classification vocabularies independently of document structure', () => {
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

test('LOC aspirations cannot silently become acceptance gates', () => {
  for (const name of ['refactor', 'simplify']) {
    const source = read(skillPath(name));
    assert.match(source, /30%/);
    assert.match(source, /aspirational target, not a completion gate/);
    assert.match(source, /Only an explicitly required numeric threshold is a hard gate/);
    assert.match(source, /below an aspirational LOC target may still complete/);
  }
  const check = read('skills/grimoire-check/references/batch-context.md');
  assert.match(check, /missed required threshold is a gap/);
  assert.match(check, /missed aspirational target is a reported shortfall/);
  assert.match(check, /Do not invent a target or promote an aspiration into a requirement/);
  assert.match(read('skills/grimoire-refactor/references/coordination.md'), /targets with source and aspirational\/required status/);
});

test('zero and non-code baselines do not fabricate percentage achievement', () => {
  const source = read('skills/grimoire-refactor/references/measurement.md');
  assert.match(source, /For B = 0, report percentage not applicable, never 100%/);
  assert.match(source, /default aspiration is inapplicable/);
  assert.match(source, /Non-code repositories need a relevant agreed content metric/);
  assert.match(source, /explicit incompatible numeric requirement needs clarification/);
});

test('refactoring children inherit no-write and persistence restrictions', () => {
  for (const name of ['map', 'improve', 'simplify']) {
    const source = read(skillPath(name));
    assert.match(source, /Under orchestration, the caller's execution contract governs/);
    assert.match(source, /Apply only enabled responsibilities/);
    assert.match(source, /Explicit no-write requests/);
  }
  const source = read(skillPath('refactor'));
  assert.match(source, /Before any writes/);
  assert.match(source, /create no map, ledger, or report files/);
  assert.match(source, /Pass these restrictions to every child skill/);
  assert.match(source, /Implementation, numeric achievement, and dry passes are not audit gates/);
});

test('refactor retains distinct-lens convergence and integrated acceptance', () => {
  const source = read(skillPath('refactor'));
  assert.match(source, /two consecutive full-scope discovery passes with different lenses and no new actionable findings/);
  assert.match(source, /A code change resets the count/);
  assert.match(source, /conflict-free merging and worker summaries do not establish acceptance/);
  assert.match(source, /unavailable required checks remain unresolved/);
});

test('HTML reporting is opt-in without losing finding evidence', () => {
  const source = read(skillPath('improve'));
  assert.match(source, /concise text or Markdown/);
  assert.match(source, /For explicitly requested HTML, read/);
  const report = read('skills/grimoire-improve/references/report-template.md');
  assert.match(report, /Read only when HTML output is explicitly requested/);
  assert.match(report, /only the designated writer publishes/);
  assert.match(report, /Escape all repository text/);
});

test('illustrations preserve visibility and do not equate diagram shape with structure', () => {
  const examples = read('skills/grimoire-simplify/references/examples.md');
  const stateExample = examples.split('## 2. Collapse duplicated state')[1].split('## 3.')[0];
  assert.match(stateExample, /private isOpen = false/);
  assert.match(stateExample, /private get isOpen\(\)/);
  assert.match(stateExample, /own-property enumeration, serialization, or descriptors/);
  const diagrams = read('skills/grimoire-improve/references/mermaid-conventions.md');
  assert.match(diagrams, /Identical high-level shapes can hide structural changes/);
});
