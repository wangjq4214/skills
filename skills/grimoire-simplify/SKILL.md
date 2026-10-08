---
name: grimoire-simplify
description: Use when asked to simplify a function, module, subsystem, or repository by removing redundant code, state, branches, or indirection without changing behavior.
---

Reduce the concepts, states, branches, indirections, and maintained code needed to explain existing behavior. Cosmetic movement is not simplification.

Under orchestration, the caller's execution contract governs scope, writes, verification, persistence, reporting, and completion. Apply only enabled responsibilities; use its baseline and unit criteria, return results, and do not overwrite shared maps, reports, or acceptance state. Standalone defaults apply only where unspecified. Explicit no-write requests create no artifacts.

## Authorization and baseline

Explicit simplification requests authorize behavior-preserving internal rewrites and file reorganization within established responsibility boundaries. Analyze-only or discussion requests produce candidates without changing tests or production code. Ask before changing public contracts, expanding architectural scope, or irreversible actions. Structural redesign belongs to `grimoire-improve` when selected; otherwise report it outside this skill's boundary and continue safe work.

No map or other skill is required. Revalidate supplied map evidence used for the task against source. Match inspection to scope: a function and necessary callers/contracts/tests; a module's internals and adjacent dependencies/consumers; every module and seam in a specified subsystem; or the full first-party repository for deep whole-repository work. Inspect relevant registrations/configuration; expand only for affected contracts or uncertain reachability. Record source revision/dirty state, contracts, boundaries, validation commands, and baseline results. Before risky poorly tested rewrites, add characterization coverage when authorized.

For broad work, inventory every in-scope first-party module and cross-module seam. Track coverage, candidate evidence/dispositions, dependencies, results, and next action; search hits are not inspection. Persist `.grimoire/simplify-state.json` only when allowed and not using a coordinator's ledger.

Optimize understanding cost, not line count. There is no default LOC reduction target; use LOC as a target only when the user explicitly requests a quantified compression goal. Only an explicitly required numeric threshold is a hard gate. Under orchestration, user targets are global, never per-worker quotas.

Only for a user-specified LOC target, fix the baseline inventory, counter/version, command, formatting, and filters before edits. Count nonblank/noncomment first-party production LOC; report tests/config/docs/generated/vendor separately. Include new/moved implementations and reconcile scope changes without resetting the denominator. Compute `100 * (baseline - final) / baseline` on the combined tree; zero is not applicable, and non-code targets need an agreed metric. Never count minification, comment removal, deleted useful tests, or transferred complexity as savings. Otherwise do not require a LOC baseline.

## Select transformations

Trace entry → policy → state → effects. Find dead/duplicate paths, repeated policy, redundant state/conversions, routing, and forwarding chains. Use [candidate-guide.md](./references/candidate-guide.md) for retention and hidden contracts. Read [examples.md](./references/examples.md) when comparison would clarify a choice; use [large-scale-patterns.md](./references/large-scale-patterns.md) for broad refactoring.

Prefer deletion, equivalent-state consolidation, or inlining valueless indirection. Rewrite a bounded private path when incremental edits preserve a confusing shape. Keep meaningful domain operations and necessary boundaries even with one caller/implementation. Helpers must reduce understanding cost or enforce a real boundary.

Deduplicate by root cause. Each unit includes affected callers/tests, owned scope, dependencies, preserved contracts, and expected complexity reduction. Set shared contracts before migrations; no display limit truncates the backlog.

**Analyze-only stop:** return candidates, evidence, coverage, proposed units, and verification needs. Proposed reduction is not achieved reduction.

## Implement and verify

Replace obsolete private paths completely, including unreachable adapters, state, registrations, imports, and dependencies. Retain externally required compatibility. Execute dependency-ready units; permitted parallel writers require isolation and nonconflicting ownership. Preserve user work, inspect actual diffs, and validate the combined tree.

Run permitted baseline/changed-risk checks, consumers, and integration paths. Inspect guarantees tests may miss: authorization, error precedence, ordering, cleanup, transactions, concurrency, ownership, and sensitive performance. Repair or selectively undo regressions; unavailable checks remain unresolved, not passes.

Compare before/after explanations and relevant structural evidence: duplicate implementations, nesting, responsibility concentration, cycles, and call/file hops. Retain changes only when they reduce understanding cost without hiding complexity; fewer lines or files alone prove nothing.

## Rescan and finish

Continue while actionable in-scope candidates remain. For comprehensive work, revisit all in-scope modules and cross-module seams after integration; bounded work rechecks changed paths and affected relationships, not unrelated modules. Reuse only hash-validated inspection. Decline stylistic/equivalent-complexity swaps, speculative generalization, or contract-breaking candidates with concrete retention reasons. Update navigation and refresh affected evidence in an existing map or flag it stale.

Completion requires full requested coverage, no unresolved actionable candidates, behavior evidence, and all required gates. Safe candidates exhausted below a user-specified aspirational LOC target may still complete: disclose the shortfall and retention evidence. An explicitly required threshold remains binding. Do not stop merely at a target or force unsafe changes to reach it. Blocked checks or interruption require incomplete status and a next action.

Return changed paths, preserved contracts, snapshot, commands/results, actual metrics, coverage, and remaining work; include unit ID and base/head or fingerprints under orchestration. Small standalone work needs no ledger.
