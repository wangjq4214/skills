---
name: grimoire-refactor
description: Coordinate repository-scale refactoring with full-scope discovery, dependency-ordered changes, integrated verification, and measurable outcomes.
disable-model-invocation: true
---

Own coordination and acceptance; use `grimoire-map`, `grimoire-improve`, `grimoire-simplify`, `grimoire-test`, `grimoire-review`, and `grimoire-check` for their respective responsibilities. Load each when used. Do not nest `grimoire-loop`. If a skill is unavailable, disclose it and use equivalent steps only when permitted; never claim it ran.

## Execution contract

Before any writes, establish scope, analyze/implement mode, allowed write paths, persistence, permitted checks, and reporting. Audit requests do not authorize code changes. Explicit no-write requests use in-memory observations and inline reports: create no map, ledger, or report files. Pass these restrictions to every child skill; standalone defaults cannot restore excluded work.

Comprehensive implementation authorization covers reversible in-scope internal rewrites without per-batch approval. Preserve observable behavior and public contracts; ask only for material scope expansion, contract changes, or irreversible actions. Multi-agent execution is optional and requires host/user permission. Serial execution retains the same coverage and verification.

## 1. Establish baseline

Record source revision and dirty-tree fingerprint, user changes to preserve, baseline checks, and acceptance criteria. For comprehensive simplification, aim for 30% net production LOC reduction unless another target is specified. This is an aspirational target, not a completion gate or worker quota. Only an explicitly required numeric threshold is a hard gate. Bounded or architecture-only work does not inherit the default.

Use [measurement.md](./references/measurement.md) for fixed-scope counting, anti-gaming rules, and zero/non-code baselines. Separate each target's source and aspirational/required status from behavior and structural gates.

When persistence is allowed, create `.grimoire/refactor/<run-id>/state.json` using [coordination.md](./references/coordination.md). Revalidate prior evidence on resume.

## 2. Discover and synthesize

Use `grimoire-map` for navigation, then `grimoire-improve` and `grimoire-simplify` in analyze-only mode. Examine responsibility/state, control flow, duplication/dead code, abstractions/dependencies, and cross-module reuse. Omit irrelevant lenses with reasons, not unexamined subsystems. Require file-level coverage; search hits are not inspection. Keep unread/blocked regions visible and retain module results without loading the entire repository into one context.

Deduplicate findings by root cause and affected contract. Validate deletions against callers, exports, registrations, tests, and configuration. Every retained finding needs a dependency-ordered work unit or evidence-backed disposition. Units specify write ownership, read dependencies, preserved contracts, checks, and expected benefit. Set shared-helper contracts before consumer migrations; serialize cycles and shared writes or group them atomically. Report emphasis must not cap the backlog.

**Audit stop:** return findings, coverage, and a proposed dependency plan here. Complete audit coverage requires inspecting the requested scope; unread/blocked regions mean a partial audit. Benefits are estimates. Implementation, numeric achievement, and dry passes are not audit gates.

## 3. Execute and integrate

Use `grimoire-improve` for responsibility/boundary changes, `grimoire-simplify` for reduction, and `grimoire-test` for baseline characterization before risky rewrites and changed-risk tests. Pass the coordination handoff; workers cannot expand write scope or redefine shared contracts.

Follow the coordination reference for dirty-source snapshots, isolated writers, branch preservation, and dependency-ordered integration. Inspect actual diffs and rerun affected checks on the combined tree; conflict-free merging and worker summaries do not establish acceptance. Refresh dependent work against the integration base. Repair or selectively undo regressions without discarding user work.

## 4. Verify and converge

Run `grimoire-review` on the integrated diff and cross-module effects; run `grimoire-check` against acceptance criteria independently of review readiness. Run permitted affected build/type/lint/integration tests, using `grimoire-test` when behavior evidence is missing. Preserve their classifications; unavailable required checks remain unresolved.

Refresh affected map evidence and metrics. Rescan the full requested scope for obsolete paths, duplicate helpers, concentrated responsibilities, deep routing, and disconnected documentation; route findings back to synthesis. After the backlog clears, require two consecutive full-scope discovery passes with different lenses and no new actionable findings. A code change resets the count. Reuse hash-validated coverage but revisit cross-module effects.

## Completion and report

Complete only with full requested coverage, no unresolved actionable work, current integrated verification/map evidence, and all required gates satisfied. Exhausting safe candidates below an aspirational LOC target may still complete: report the actual reduction, shortfall, and retention evidence. Never force unsafe changes to reach it, stop merely because it is reached, or waive an explicitly required threshold.

Report baseline/final snapshots, counting scope and category totals, structural outcomes, coverage, finding dispositions, commands/results, and remaining work. Persist `.grimoire/refactor/<run-id>/report.md` only when allowed. Distinguish complete, incomplete, and blocked; interruptions need a resumable next action, not a convergence claim.
