---
name: grimoire-map
description: Build and incrementally refresh an evidence-backed, persistent map of codebase responsibilities, dependencies, entry points, and verification boundaries.
---

# Purpose

Make a codebase navigable without requiring every investigation to rediscover its structure. Persist observations with provenance and explicit coverage, not an invented architecture.

# Scope

Read repository evidence and write `.grimoire/map/index.json` plus supporting map data. Do not modify production code, prescribe a redesign, or treat the map as proof of current behavior. Works independently; no other skill or formal artifact is required.

# Workflow

## 1. Establish identity and scope

Record repository identity, revision, dirty working-tree state, requested roots, exclusions, and available languages/build systems. Default to the whole first-party repository when no narrower target is given. Include manifests, configuration, tests, and scripts as structural evidence; distinguish generated and third-party content.

Load an existing index when present. Apply [references/persistence.md](./references/persistence.md) for format, freshness, and safe updates. Never overwrite a broader map with a narrower scan or mix different repository identities.

Completion: Scope, source snapshot, and whether this is a fresh scan or refresh are explicit.

## 2. Inventory and partition

Enumerate in-scope files, including relevant untracked files; record exclusions and unreadable paths. Group by actual responsibility, package, entry point, state ownership, and dependency seams, not equal file counts. Use manifests, symbol/import indexes, search, and history when available to prioritize reading.

Assign every included file to a module or an explicit unclassified set. Record inspection as inventoried-only, inspected, partial, or blocked; separately count unclassified files from null module IDs. A file may be both inspected and unclassified. Enumeration and search hits do not count as semantic inspection. Large modules may have paged file inventories and separate shards.

Completion: All included files are accounted for, with an inspectable coverage denominator and no silent top-N cutoff.

## 3. Trace relationships

For each module, inspect its entry points, public exports, core implementation, state lifecycle, configuration, and relevant tests. Follow representative behavior paths through callers and dependencies. Record:

- responsibility and owning paths;
- entry points and exposed contracts;
- incoming/outgoing dependencies and their kind: import, call, data, event, or runtime registration;
- state/resource ownership and external systems;
- test boundaries and discovered validation commands;
- concentration, cycles, duplication clues, and unresolved relationships.

Every material claim needs a path and symbol or other concrete source locator. Distinguish observed edges from inferred ones; reflection, plugins, DI, configuration, and generated registration need inspection beyond static imports. Mark uncertainty rather than inventing missing connections.

Completion: Inspected modules can be explained through evidence-backed responsibilities and connections; remaining gaps are explicit.

## 4. Persist and refresh

Write module shards before publishing an index that references them. Follow the persistence reference for hashes, invalidation, schema validation, and interrupted writes. Only the coordinating writer publishes shared map data; read-only subagents may return module observations.

Refresh changed/new/deleted files and invalidate affected claims, incoming references, reverse dependents, and relevant test links. Unknown dynamic impact requires a broader rescan, not an assumption of isolation. Reuse unchanged observations only when their source fingerprints still match.

Completion: The index resolves to valid shards; freshness and partial coverage are accurate for the recorded source snapshot.

## 5. Present navigation

Report the main entry points, responsibility boundaries, important connections, coverage counts, uncertainty, and persisted paths. For broad maps, write `.grimoire/map/overview.md` with a short module table and a simple dependency/data-flow sketch. Label its snapshot and link back to evidence; it is a navigation view, not a second source of truth.

Completion: Another reader can locate a behavior path and its validation without repeating the inventory. A partial map is reported as partial, never as a completed full audit.

# Execution and reuse

- Read index metadata first and load only relevant module shards. Do not flood context with the whole repository.
- Parallel read-only mapping is optional and subject to host/user authorization. Serial execution produces the same artifacts and coverage semantics.
- Existing maps are accelerators, not authorities. Consumers revalidate claims against current source before editing or issuing verdicts.
- Keep secrets, credentials, customer data, and raw source dumps out of persisted artifacts. Record source locators rather than sensitive contents.

# References

- [persistence.md](./references/persistence.md) — versioned data contract, incremental refresh, and safe publication
