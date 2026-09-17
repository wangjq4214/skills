# Coordination and integration

## Persistent run state

Store `.grimoire/refactor/<run-id>/state.json` with `schemaVersion: 1`, repository identity, requested scope, authorization, immutable baseline revision/fingerprint, measurement configuration, acceptance criteria, map snapshot reference, discovery coverage, findings, work units, integration head/fingerprint, validation records, dry-pass count, and next action. Large findings/results may live in referenced per-unit files. One coordinator writes shared state; publish valid JSON safely and retain the prior valid state on interruption.

Each finding has a stable ID, root cause, evidence, locations, affected contract, and disposition: pending, planned, implemented, retained-with-reason, out-of-scope, or blocked. Deduplicate against all previously evaluated findings, not just accepted ones. Reopen a dismissed finding only for new evidence or changed source.

Each work unit records ID, objective, finding IDs, owned write paths, read dependencies, upstream unit IDs, contract, shared interface decisions, validation commands, expected benefit, base revision/fingerprint, branch/worktree, result paths, and status:

```text
planned → ready → running → verified → integrated → accepted
                        ↘ blocked / rejected
```

`verified` means branch-local checks passed; `accepted` requires integrated-tree evidence and acceptance review. A changed base or affected source invalidates the corresponding evidence. On resume, verify branches, diffs, file hashes, prerequisites, and command results before trusting statuses. Missing output is unfinished work, not success.

## Handoff contract

Inputs to a worker:

- mode: analyze or implement; selected responsible skill;
- target, objective, acceptance criteria, preserved behavior;
- base revision plus relevant dirty-source fingerprint;
- owned write paths and read-only neighbors;
- upstream contracts and decisions, relevant map shards;
- validation commands, working directory, baseline failures;
- output location and integration dependencies.

Outputs:

- unit ID, actual base/head or file fingerprints, branch/commit where applicable;
- actual changed paths, summary of deleted/flattened/consolidated code;
- findings/evidence, contracts preserved, external or dependency changes;
- commands, working directories, exit statuses, log paths, checks not run;
- remaining risks, blockers, and prerequisite changes needed.

Markdown or JSON is acceptable if the fields are explicit. Standalone skills may return a concise response rather than create a run ledger. Workers never fabricate metrics, self-approve a public-contract change, or mark shared acceptance complete.

## Worktree execution

1. Inspect user changes. Workers must start from an agreed source snapshot, not an unrelated HEAD. Worktrees do not inherit uncommitted edits; if needed, use an authorized temporary snapshot or scoped patch, otherwise work serially in the existing tree. Never stash/reset user work automatically.
2. Assign exclusive write ownership. Shared exports, manifests, lockfiles, generated registries, and shared helper modules are coordinator-owned or serialized. Cross-cutting units may own multiple files; splitting by equal file counts is inappropriate.
3. Create independent branches/worktrees from the recorded integration base. Keep dependency installation and test outputs isolated; avoid shared ports, databases, caches, or build directories that undermine isolation. Observe available concurrency/resources.
4. Workers run focused checks and preserve their diff on a reachable branch/commit or durable patch before temporary worktree cleanup. A host may remove a worktree automatically; capture its returned branch and inspect the actual diff rather than the summary.
5. Integrate one dependency-ready unit at a time into a designated integration tree using project-approved merge or cherry-pick practice. Do not force-push, discard unrelated commits, or choose conflict sides mechanically. Repair semantic conflicts against agreed contracts.
6. Run affected consumer and integration checks on the combined tree, even after a conflict-free merge. Rebase/recreate queued dependent work against the new base and rerun affected checks; independent running work can finish but must be reconciled before acceptance.
7. Update the ledger and refresh map evidence after integration. Publish shared map snapshots from the integrated tree, not worker branches. Delete temporary work only after its result is preserved and verified, following host/project policy.

Read-only discovery can overlap freely. Shared contracts should settle before parallel consumer migration. Worktree isolation prevents file races, not semantic conflicts. If Git, worktrees, or subagents are unavailable, execute these units serially; do not make tooling availability a pretext to skip coverage or validation.

## Failure and completion

Fix or selectively undo changes that introduce failures; do not broadly reset the checkout. Known baseline failures remain visible and do not excuse new failures. Missing tools/resources are blocked evidence; record attempted alternatives and continue independent safe units. No arbitrary top-N, time cap, or exhausted context may be presented as full completion. On interruption, persist the exact next action and report incomplete.
