---
name: grimoire-map
description: Use when asked where behavior lives, which module owns state, how repository components connect, or to create or refresh a codebase map. Describes existing structure, not a redesign.
---

Make repository behavior paths navigable through source-backed observations, not an invented architecture. Do not modify production code or prescribe a redesign; a map is not proof of behavior.

Under orchestration, the caller's execution contract governs scope, writes, persistence, reporting, and completion. Apply only enabled responsibilities. Explicit no-write requests return in-memory observations without creating map files. Standalone, persist `.grimoire/map/index.json` and supporting shards; no other skill is required.

## Inventory and inspect

Record repository identity, revision/dirty state, scope, exclusions, languages, and build systems. Match inventory and inspection to the request; use the whole first-party repository only for a repository-wide map or refactor. Include relevant untracked files, manifests, tests, configuration, and scripts; distinguish generated/vendor content.

- Function: inspect the function and necessary callers, contracts, and tests.
- Module: inspect its internals and adjacent dependencies/consumers.
- Subsystem: fully scan the specified subsystem and inspect its external seams.
- Deep whole-repository refactor: cover every first-party module and cross-module seam.

Expand inspection when changed contracts or uncertain reachability require it, not merely because the repository is large. Keep unrelated areas outside the scan; do not present bounded coverage as a whole-repository audit.

Load existing index metadata first, then relevant shards. Follow [persistence.md](./references/persistence.md) for schema, freshness, and safe updates. Never replace a broader map with a narrower scan or mix repository identities.

Account for every included file: assign it to a responsibility/package/entry-point/state-ownership module or an explicit unclassified set, not equal-sized file groups. Track inventoried-only, inspected, partial, or blocked separately from module assignment. Inspecting one function does not mark its entire file inspected. Search/index hits are triage, not semantic inspection. Record exclusions and unreadable paths; page large inventories rather than silently truncating coverage.

Within the selected scope, inspect relevant entry points, exports, core code, state lifecycle, configuration, and tests. Trace representative behavior through callers and dependencies. Record:
- responsibilities, owning paths, public contracts, and state/resource owners;
- incoming/outgoing import, call, data, event, and runtime-registration edges;
- external systems, test boundaries, and candidate validation commands;
- concentration, cycles, duplication clues, and unresolved relationships.

Every material claim needs a source locator and fingerprint. Distinguish observed/inferred edges; reflection, DI, plugins, configuration, and generated registration require more than static imports. Unknown relationships stay explicit.

## Refresh and publish

Compare inventory and hashes within the refresh scope, including new/deleted/dirty files and affected dependencies. Invalidate changed claims, incident edges, reverse dependents, and test links. Reinspect further dependents when contracts change; unknown dynamic impact requires broader scanning. Reuse evidence only after verifying source hashes and relationship assumptions; unrelated preserved evidence retains its original freshness/provenance.

When persistence is enabled, one coordinating writer publishes immutable shards before the index, following the persistence reference's validation and recovery rules. Read-only workers may return observations when delegation is permitted. Worker-branch evidence must be refreshed against the integrated tree. When persistence is disabled, return equivalent coverage/provenance in the result, not files.

Keep secrets, credentials, customer data, and raw source dumps out of artifacts; persist concise facts and locators. Existing maps accelerate navigation, never replace current-source validation before editing or issuing verdicts.

## Completion

Return entry points, responsibility boundaries, connections, coverage counts, uncertainty, and artifact paths when present. For broad persisted maps, write `.grimoire/map/overview.md`: a snapshot-labelled module table and relationship sketch linked to evidence, not a second source of truth.

A persisted index must resolve to valid shards with accurate freshness and coverage. A partial map remains partial; unread source is not a completed audit. Readers should be able to locate a behavior path and its validation without repeating the inventory.
