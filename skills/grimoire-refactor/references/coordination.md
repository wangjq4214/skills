# Coordination and integration

## Run state

Use the shared [coordination contract v1](../../grimoire-map/references/coordination-contract.md) for source/evidence references, owner analyses, checks, and run schema v2. It is the only schema authority; do not recreate its records here. When allowed, store coordination state at `.grimoire/refactor/<run-id>/state.json`; keep immutable owner result editions in authorized artifact paths and reference them. Without persistence, use inline artifacts and return the next action without creating files.

The coordinator owns permissions, deduplication links, execution dependencies, integration progress, acceptance, and recheck records (snapshot, scope, requested lenses, owner result references, cross-module risks, and rationale for further passes). Owners retain findings and dispositions. Reports are derived views, not another writable ledger.

Work-unit status transitions:

```text
planned → ready → running → verified → integrated → accepted
                        ↘ blocked / rejected
```

`verified` means branch-local checks passed; `accepted` requires integrated-tree evidence and acceptance review. A changed base or affected source invalidates the corresponding evidence. On resume, verify branches, diffs, file hashes, prerequisites, and command results before trusting statuses. Missing output is unfinished work, not success.

## Handoff contract

Inputs to a worker:

- Contract version and responsible skill, mode, scope, objective, and preserved behavior;
- acceptance criteria and targets with source and aspirational/required status;
- pinned source, proposal, and finding references; upstream contracts and decisions;
- owned writes, read-only neighbors, persistence/reporting permissions, and output destination;
- permitted checks, working directory, baseline check references, and integration dependencies.

Outputs use the shared `UnitResult` shape with referenced owner analyses and checks. Return newly observed source facts to map and recommendations to their analysis owner; do not write a second findings ledger into run state. Check executors produce their own results; an adapter may serialize an existing result but must preserve its provenance and classification.

The coordinator supplies the shared contract to delegates and resolves all returned references before using them. Standalone skills may return concise prose instead of versioned records. Workers never fabricate metrics, self-approve public-contract changes, or mark shared acceptance complete.

## Worktree execution

1. Inspect user changes. Workers must start from an agreed source snapshot, not an unrelated HEAD. Worktrees do not inherit uncommitted edits; if needed, use an authorized temporary snapshot or scoped patch, otherwise work serially in the existing tree. Never stash/reset user work automatically.
2. Assign exclusive write ownership. Shared exports, manifests, lockfiles, generated registries, and shared helper modules are coordinator-owned or serialized. Cross-cutting units may own multiple files; splitting by equal file counts is inappropriate.
3. Create independent branches/worktrees from the recorded integration base. Keep dependency installation and test outputs isolated; avoid shared ports, databases, caches, or build directories that undermine isolation. Observe available concurrency/resources.
4. Workers run focused checks and preserve their diff on a reachable branch/commit or durable patch before temporary worktree cleanup. A host may remove a worktree automatically; capture its returned branch and inspect the actual diff rather than the summary.
5. Integrate one dependency-ready unit at a time into a designated integration tree using project-approved merge or cherry-pick practice. Do not force-push, discard unrelated commits, or choose conflict sides mechanically. Repair semantic conflicts against agreed contracts.
6. Run affected consumer and integration checks on the combined tree, even after a conflict-free merge. Rebase/recreate queued dependent work against the new base and rerun affected checks; independent running work can finish but must be reconciled before acceptance.
7. Update coordination references after integration. Only integrated-tree evidence advances the shared current map index; retain branch-scoped immutable source artifacts under the shared contract before worktree cleanup. Delete temporary work only after its diff and evidence are preserved and verified, following host/project policy.

Read-only discovery can overlap freely. Shared contracts should settle before parallel consumer migration. Worktree isolation prevents file races, not semantic conflicts. If Git, worktrees, or subagents are unavailable, execute these units serially; do not make tooling availability a pretext to skip coverage or validation.

## Failure and completion

Fix or selectively undo changes that introduce failures; do not broadly reset the checkout. Known baseline failures remain visible and do not excuse new failures. Missing tools/resources are blocked evidence; record attempted alternatives and continue independent safe units. No arbitrary top-N, time cap, or exhausted context may be presented as full completion. On interruption, persist the exact next action and report incomplete.
