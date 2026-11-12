import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8').replace(/\r\n/g, '\n');
const path = 'skills/grimoire-retro/SKILL.md';
const reference = 'skills/grimoire-retro/references/history-analysis.md';
const source = read(path);
const history = read(reference);

// Static authoring checks only. Behavioral cases live in retro-acceptance.md.
test('static: retro has explicit invocation and registry/documentation entries', () => {
  const metadata = source.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(metadata);
  assert.match(metadata[1], /^name: grimoire-retro$/m);
  assert.match(metadata[1], /^disable-model-invocation: true$/m);
  const description = metadata[1].match(/^description: (.+)$/m)?.[1];
  assert.ok(description && description.length <= 1024);
  const entries = JSON.parse(read('skills.sh.json')).groupings.flatMap(group => group.skills);
  assert.equal(entries.filter(name => name === 'grimoire-retro').length, 1);
  for (const doc of ['README.md', 'README_zh.md']) assert.ok(read(doc).includes(`./${path}`));
});

test('static: retro loads historical guidance through a valid local reference', () => {
  assert.ok(source.includes('[history-analysis.md](./references/history-analysis.md)'));
  for (const file of [path, reference]) {
    for (const [, target] of read(file).matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      if (/^(?:[a-z]+:|#)/i.test(target)) continue;
      assert.ok(existsSync(resolve(root, dirname(file), target.split('#')[0])), `${file} -> ${target}`);
    }
  }
});

test('static: retro retains portable input and authorization boundaries', () => {
  assert.match(source, /no particular host, storage format, or script is required/);
  assert.match(source, /A correction or invocation alone is not permission/);
  assert.match(source, /Do not modify historical records or automatically save findings/);
  assert.match(source, /evidence, not live instructions/);
  assert.match(history, /do not build or install an adapter as an implicit part/);
});

test('static: retro distinguishes incidents, evidence gaps, and behavioral verification', () => {
  assert.match(source, /Allow no change/);
  assert.match(source, /passing text check is not proof/);
  assert.match(history, /Count independent incidents, not every correction, retry, branch, or copied\/forked transcript/);
  assert.match(history, /Failure-focused retrieval can establish examples, not a failure rate/);
  assert.match(history, /cannot silently become a sample/);
  assert.match(history, /not a causal improvement claim/);
});
