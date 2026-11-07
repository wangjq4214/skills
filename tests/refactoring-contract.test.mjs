import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8').replace(/\r\n/g, '\n');
const contractPath = 'skills/grimoire-map/references/coordination-contract.md';
const contract = read(contractPath);
const skills = ['map', 'improve', 'simplify', 'refactor'];

// Authoring guards, not a runtime schema validator or evidence of agent compliance.
test('all four refactoring skills resolve to one shared contract', () => {
  for (const name of skills) {
    const path = `skills/grimoire-${name}/SKILL.md`;
    const source = read(path);
    const links = [...source.matchAll(/\]\(([^)]+coordination-contract\.md)\)/g)];
    assert.equal(links.length, 1, name);
    assert.equal(resolve(root, dirname(path), links[0][1]), resolve(root, contractPath), name);
    assert.doesNotMatch(source, /\.grimoire\/(?:improve|simplify)-state\.json/);
  }
  assert.match(read('skills/grimoire-refactor/references/coordination.md'), /only schema authority/);
});

test('source provenance is reused while analysis and execution coverage stay separate', () => {
  assert.match(contract, /wire-format\.md.*authoritative for/);
  assert.doesNotMatch(contract, /type (?:Snapshot|Evidence|Inspection)\s*=/);
  assert.match(contract, /Map inspection does not establish improve\/simplify analysis coverage/);
  assert.match(contract, /never sum overlapping analyses/);
  assert.match(contract, /Source dependency edges are not work-unit prerequisites/);
  assert.match(contract, /without deleting either analysis/);
  assert.match(contract, /not maintain a competing inventory, finding body, source graph, or check result/);
  assert.match(contract, /if coverage differs by lens, publish separate Analysis records/);
});

test('artifact references pin editions and no-persistence handoffs remain resolvable', () => {
  assert.match(contract, /sha256.*hashes exact artifact bytes, not source bytes/);
  assert.match(contract, /snapshots\/<snapshot-id>\/index\.json/);
  assert.match(contract, /Never follow a mutable `index\.json` or `latest` alias as a baseline/);
  assert.match(contract, /inlineArtifacts.*keyed by artifact ID/);
  assert.match(contract, /Persisted state must not depend on ephemeral inline objects/);
  assert.match(read('skills/grimoire-map/references/persistence.md'), /map, analysis, and active-run references/);
  assert.match(contract, /Small standalone responses need no envelope/);
  assert.match(contract, /selective installation.*before emitting versioned records/);
});

test('check records preserve executor provenance and cannot confer integrated acceptance', () => {
  assert.match(contract, /type CheckResults = \{ contractVersion: 1; checks: Check\[\] \}/);
  assert.match(contract, /context: "baseline" \| "branch" \| "integrated"/);
  assert.match(contract, /status: "passed" \| "failed" \| "blocked" \| "not-run"/);
  assert.match(contract, /unexecuted check.*never `passed`/);
  assert.match(contract, /preserve their original verdict in `classification`/);
  assert.match(contract, /Branch verification cannot be promoted to integrated acceptance/);
  assert.match(contract, /Preserve its immutable index, inventory, and shards before worktree cleanup/);
  assert.match(contract, /without advancing the shared current map index/);
});

test('contract and run versions do not silently reinterpret legacy owner state', () => {
  assert.match(contract, /contractVersion: 1, schemaVersion: 2/);
  assert.match(contract, /independently of map `schemaVersion`/);
  assert.match(contract, /Reject unsupported versions without overwriting or downgrading/);
  assert.match(contract, /Legacy refactor schema v1 and unversioned improve\/simplify ledgers/);
  assert.match(contract, /separate schema-v2 run state/);
  assert.match(contract, /Never infer acceptance from legacy status labels/);
});

test('run state and worker outputs have shared concrete shapes rather than private field lists', () => {
  for (const type of ['Execution', 'Target', 'Unit', 'UnitResult', 'Recheck', 'Acceptance', 'Run']) {
    assert.match(contract, new RegExp(`type ${type} = \\{`), type);
  }
  assert.match(contract, /type Handoff<T> = \{/);
  assert.match(contract, /results: ArtifactRef\[\]; status: UnitStatus/);
  assert.match(contract, /decisions: \{ requirementId: Id;/);
  assert.match(read('skills/grimoire-refactor/references/coordination.md'), /Outputs use the shared `UnitResult` shape/);
});
