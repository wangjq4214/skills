---
name: grimoire-improve
description: Audit codebase structure with explicit coverage and evidence, then implement authorized responsibility and dependency improvements in coherent units.
---

# Purpose

Improve structural quality, responsibility boundaries, and the ability to explain how a codebase works. Scale from one module to a whole repository without capping discovery at a short report.

# Scope

Default to audit mode and write `.grimoire/improve-report.html`. Implement when explicitly authorized; a comprehensive implementation request already authorizes in-scope internal restructuring, without repeated finding-selection prompts. Preserve observable behavior and public contracts unless their change is approved. Discussion alone is not implementation authorization.

Works independently with its own survey and validation. A fresh `grimoire-map` artifact or orchestration handoff may accelerate discovery but is never required. Revalidate source evidence before relying on it. This skill owns structural decisions; it does not require a separate skill to complete authorized work.

# Workflow

## 1. Establish scope and coverage

Record target, mode, contracts, source revision/dirty state, and baseline checks when implementing. For a bounded audit, inspect the target and relevant callers/dependencies. For a comprehensive request, inventory all first-party modules and maintain `.grimoire/improve-state.json` with scope, per-module/file coverage, findings, dependencies, dispositions, checks, and next action. Under orchestration, return this information to its ledger instead of creating competing shared state.

Map entry points, state ownership, dependency direction, tests, hotspots, and unusually connected or complex types. Load only relevant map shards; stale or partial map coverage does not establish an inspected module. Read source beyond search excerpts. Explicitly account for unread, excluded, and blocked regions.

Completion: The audit surface, structural relationships, baseline, and coverage gaps are known.

## 2. Audit within and across modules

Use [references/dimensions.md](./references/dimensions.md) as evidence lenses. For broad simplification, include god files/objects, shared-helper ownership, repeated policies, routing complexity, unnecessary abstraction, state duplication, and dependency cycles. Examine cross-module connections as well as isolated files.

Record stable finding ID, concrete locations, evidence, affected contract, impact, confidence, remediation cost, and likely consumers. Size, names, or a single implementation are clues, not sufficient findings. Read-only reviewers may overlap; deduplicate root causes before assigning modifications.

Completion: Relevant dimensions have concrete findings or an inspected no-finding disposition; unsupported observations are discarded with reasons where useful for repeat scans.

## 3. Design coherent improvement units

Rank retained findings by impact, confidence, change frequency, blast-radius reduction, and effort. Group coupled files and callers into independently verifiable units. Establish prerequisites, write ownership, preserved contracts, and checks. Set common-helper semantics and ownership before parallel consumer migrations.

Split god files along cohesive responsibilities, independent state lifecycles, or change drivers. Keep a clear entry/coordinator only where necessary. Avoid mechanical line-count splits, universal context objects, new dependency cycles, or forwarding layers that merely move complexity. Explain ownership and dependency changes with a short before/after path; use diagrams when they clarify relationships.

Completion: Every retained finding has an actionable unit or evidence-backed disposition, including those outside the report's emphasized set.

## 4. Report or implement

Generate the HTML report using [references/report-template.md](./references/report-template.md). Emphasize five findings by default for readability, but expose the full discovery and disposition counts. This is a presentation limit, never a work limit. Follow [references/mermaid-conventions.md](./references/mermaid-conventions.md) when diagrams help.

In audit mode, present recommendations and stop without modifying production code. In implementation mode, execute all authorized units in dependency order. Independent writers may use isolated worktrees when permitted; shared contracts and overlapping write paths must be serialized. Inspect actual diffs and verify after integration, not only on worker branches. Serial execution is equally valid.

Remove obsolete internal paths, duplicate helpers, registrations, imports, and dependencies made unnecessary by the change. Update affected navigation/docs; do not leave a new design alongside an unused old one. Ask only for new public-contract changes, material scope expansion, or irreversible decisions.

Completion: Audit findings are disclosed, or authorized units are implemented with no unexplained migration residue.

## 5. Verify, refresh, and finish

Run appropriate build/type/test/lint checks and inspect changed contracts, state lifecycle, error paths, dependencies, and consumer behavior. Record baseline versus new failures. Verify god-file decomposition reduced responsibility concentration and that shared helpers shortened understanding rather than centralizing unrelated policy.

For comprehensive implementation, rescan all in-scope modules and cross-module seams after changes; continue while actionable structural findings remain. Give each remaining candidate a reasoned retained/out-of-scope/blocked disposition. Refresh affected map data if maintaining it, or flag it stale. On interruption, persist next actions and report incomplete rather than claiming the entire repository was covered.

Update the report with actual outcomes, source snapshot, coverage, validation commands/results, remaining findings, and acceptance status. When a LOC target is supplied, preserve its fixed scope/counter, count additions and moved implementations, and report actual net reduction; file splitting is not reduction, and an unmet target remains unmet.

Completion: Authorized work has integrated evidence and a full disposition ledger; audit-only completion is clearly distinguished from implementation completion.

# Standalone and orchestration handoff

Accept scope, mode, base snapshot, contracts, optional owned paths/map shards, and checks. Return evidence-backed findings or actual changed paths, source snapshot, contract/dependency changes, checks/results, and remaining work. Reconstruct missing essentials locally for standalone use. Workers return results rather than overwrite coordinator reports, maps, or acceptance state.

# References

- [dimensions.md](./references/dimensions.md) — structural lenses and interpretation
- [mermaid-conventions.md](./references/mermaid-conventions.md) — relationship diagrams
- [report-template.md](./references/report-template.md) — report presentation and coverage
