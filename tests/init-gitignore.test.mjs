import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';

// Exercise the actual template with Git, not a reimplementation of ignore matching.
test('init allowlist stages only shared Markdown knowledge and preserves local files', () => {
  const root = mkdtempSync(join(tmpdir(), 'grimoire-ignore-'));
  const git = (...args) => execFileSync('git', ['-c', 'core.excludesFile=', ...args], {
    cwd: root, encoding: 'utf8',
  }).trim();
  try {
    git('init', '--quiet');
    const allowed = ['.gitignore', 'CONTEXT.md', 'CONTEXT-billing.md',
      'adr/0001-choice.md', 'spec/feature.md', 'ticket/task.md',
      'adr/domain/nested.md', 'spec/domain/nested.md', 'ticket/domain/nested.md'];
    const ignored = ['notes.md', 'CONTEXT.txt', 'CONTEXT-billing.json', '.env',
      'map/index.md', 'refactor/plan.md', 'other/CONTEXT.md',
      'adr/data.json', 'spec/domain/data.yaml', 'ticket/domain/output.txt',
      'adr/domain/.gitignore', 'spec/feature.md.bak'];
    for (const file of [...allowed, ...ignored]) {
      const target = join(root, '.grimoire', file);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, '');
    }
    copyFileSync(new URL('../skills/grimoire-init/assets/grimoire.gitignore', import.meta.url),
      join(root, '.grimoire/.gitignore'));
    git('add', '.grimoire');
    assert.deepEqual(git('ls-files', '--', '.grimoire').split('\n').sort(),
      allowed.map(file => `.grimoire/${file}`).sort());
    for (const file of ignored) {
      assert.equal(git('check-ignore', '--no-index', '--', `.grimoire/${file}`), `.grimoire/${file}`);
    }
    // Ignore rules alone cannot remove files already in the index.
    git('add', '-f', '.grimoire/map/index.md');
    assert.equal(git('ls-files', '--', '.grimoire/map/index.md'), '.grimoire/map/index.md');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
