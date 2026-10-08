---
name: grimoire-improve
description: Use when asked to assess or improve responsibility boundaries, dependency direction, or tangled state ownership in a module or across modules while preserving behavior. For redundant code within existing boundaries, use grimoire-simplify.
---

Improve ownership, dependency direction, and how directly a reader can explain behavior—not merely file size.

Under orchestration, the caller's execution contract governs scope, writes, verification, persistence, reporting, and completion. Apply only enabled responsibilities; return findings/results rather than overwrite shared ledgers, maps, or reports. Standalone defaults below apply only where unspecified. Explicit no-write requests create no artifacts.

## Scope and discovery

Default to audit mode. Implement only when authorized; comprehensive implementation already authorizes in-scope internal restructuring without per-finding approval. Preserve observable behavior and public contracts. Ask for material scope expansion, contract changes, or irreversible actions.

Start with user-reported pain points and scoped Git history before deep inspection: look for repeated edits, fixes, and modules changed together over a stated revision/time window. Inspect representative diffs; discount generated, formatting-only, and bulk-migration churn. Use hotspots to order investigation, not as proof of defects or a substitute for requested coverage. If history is absent or shallow, state the limitation and prioritize user pain and source-level coupling.

Read hotspot code and relevant callers, configuration, state ownership, and tests, then expand through affected dependencies and remaining requested scope. Record scope, source revision/dirty state, contracts, and baseline checks when implementing. Optional map data accelerates navigation, not proof; verify source claims.

For broad work, inventory all first-party modules and track file/module coverage, evidence, findings, dependencies, dispositions, and next action. Persist `.grimoire/improve-state.json` only when allowed and not using a coordinator's ledger. Search hits are not inspection; expose unread, excluded, and blocked regions.

Use [dimensions.md](./references/dimensions.md) to examine within- and cross-module relationships. Record finding ID, locations, evidence, affected contract, impact, confidence, cost, and consumers. Names, size, or implementation counts alone are not findings.

## Design and execution

Deduplicate root causes; prioritize impact, confidence, change frequency, blast-radius reduction, and effort. Every retained finding needs a coherent unit or evidence-backed disposition. Units include callers, tests, prerequisites, owned paths, and preserved contracts. Set shared-helper semantics before consumer migrations.

Split by cohesive responsibility, invariant, lifecycle, or change driver. Reject mechanical file splitting, universal context objects, cycles, and forwarding layers that merely relocate complexity. Show a short before/after behavior path and ownership change.

In audit mode, return recommendations and coverage without implementation; proposed benefits remain estimates. In implementation mode, execute dependency-ready units. Parallel writers require permission and isolation; shared writes must be serialized. Inspect actual diffs and verify the combined tree, not just branches. Remove obsolete private paths, registrations, imports, and dependencies; update affected navigation.

## Verification and completion

Run permitted affected checks and inspect contracts, lifecycle, errors, dependencies, and consumers. Distinguish baseline/new failures and unavailable checks. Confirm responsibility concentration and understanding cost improved, not just file sizes.

For comprehensive implementation, rescan all modules and cross-module seams until no actionable structural work remains. Record retained/out-of-scope/blocked reasons. Refresh an existing map or flag affected data stale. Interruptions retain a next action and incomplete status.

Report source snapshot, coverage, findings/dispositions, actual changes, checks/results, and remaining work in concise text or Markdown. Audit completion is separate from implementation acceptance; unread requested scope remains partial. Supplied LOC targets retain their fixed counter/scope and include additions/moved code. Distinguish aspirational shortfalls from unmet required gates.

Persist a report only when requested or supplied by the execution contract. For explicitly requested HTML, read [report-template.md](./references/report-template.md); read [mermaid-conventions.md](./references/mermaid-conventions.md) only when a diagram clarifies the finding.
