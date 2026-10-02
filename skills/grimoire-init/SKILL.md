---
name: grimoire-init
description: Set up .grimoire project knowledge and agent registration, or fill gaps in an existing setup.
disable-model-invocation: true
---

Initialize by adding missing items, not by normalizing existing knowledge; the Git allowlist configuration may be updated with approval. Preserve existing `.grimoire` contents, including domain indexes and extra directories; rewriting, migration, and cleanup are outside this skill's scope.

## Inspect and propose

Establish the project root. Check the base paths in [directory structure](./references/directory-structure.md) and select registration targets using [injection targets](./references/injection-targets.md). Inspect relevant paths and existing registration blocks; summarize other knowledge as preserved rather than enumerating the entire tree.

Show the proposed additions, Git allowlist diff, and registration diff, naming each target and its keep, append, replace, merge, or repair action. For existing blocks, show the current content and proposed result. If a required directory is a file or a required file is a directory, report the conflict rather than replacing it.

Write nothing until the user explicitly approves the plan; obtain renewed approval for changes to it. If nothing needs changing, report the setup as already complete without rewriting files.

## Apply and verify

Create only missing base items and apply approved Git allowlist and registration changes. Preserve content outside the approved block or repair boundaries. Unpaired, reversed, or nested markers require an explicitly approved repair range; never guess the boundary or append around malformed markers.

Verify the base paths have the expected types, new `CONTEXT.md` content matches the plan, and every approved registration target contains exactly one complete block matching its approved result. Verify the Git allowlist as described in the directory reference. Check that existing knowledge and unrelated configuration content remain unchanged. Report unresolved conflicts or skipped registration as incomplete setup, not success.
