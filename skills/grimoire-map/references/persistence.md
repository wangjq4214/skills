# Persistent map contract (version 1)

The map is a disposable, evidence-backed cache. Source code and executable evidence remain authoritative. No database, map generator, or other skill is required; ordinary JSON and repository tools suffice.

## Layout

```text
.grimoire/map/
  index.json
  snapshots/<snapshot-id>/inventory.json
  snapshots/<snapshot-id>/modules/<module-id>.json
  overview.md
```

Snapshot IDs identify an actual scan, not just a commit: dirty trees at the same HEAD may differ. Use repository-relative, normalized paths; opaque stable module IDs survive renames. IDs and shard paths must not escape the map directory.

## Required fields

The exact keys, types, path bases, page envelopes, and fingerprint algorithm are defined in [wire-format.md](./wire-format.md). That contract is authoritative for version 1; the table below is an overview, not permission to invent alternative field names.

`index.json`:

| Field | Meaning |
| --- | --- |
| `schemaVersion` | Integer `1`; reject unsupported versions without overwriting them. |
| `repository` | Local identity/root marker and optional sanitized remote identifier; never credential-bearing URLs. |
| `snapshot` | ID, revision (or null without VCS), dirty flag, capture time, fingerprint algorithm, source-tree fingerprint. |
| `scope` | Included roots, exclusions with reasons, and requested scan scope. |
| `inventory` | Relative JSON shard path. |
| `modules` | Entries with stable ID, label, shard path, coverage, and freshness. |
| `coverage` | Included file count and four mutually exclusive inspection counts: inspected, inventoried-only, partial, blocked. Their sum equals included. Unclassified is a separate overlapping count of null module IDs. |
| `limitations` | Missing tools, inaccessible roots, dynamic edges, and other unresolved gaps. |

Inventory entries: `path`, `category` (production/test/config/docs/generated/vendor), `hash`, `moduleId` (nullable), `coverage`, and `reason` where not inspected. Store hashes of inspected source bytes, not mtimes alone. Inaccessible files have null hashes and a recorded reason; exclude map output itself from source fingerprints. Record the enumeration command and filters so coverage is reproducible. Large inventories can be partitioned into referenced pages with the same entry format.

Inspection status and module assignment are independent: an inspected or blocked file can have a null moduleId. Count it once under inspection and additionally under unclassified. Module coverage is inspected only when all assigned files are inspected, blocked when all are blocked, inventoried-only when all are inventoried-only, and partial otherwise (including an empty module). Index coverage describes the entire persisted scope; requested scan scope identifies what this refresh attempted.

Module shards: `id`, `snapshotId`, `responsibility`, `files`, `entryPoints`, `contracts`, `stateOwners`, `edges`, `tests`, `hotspots`, `evidence`, and `unknowns`. Empty arrays mean no observations, not proof of absence.

- Evidence: `id`, `path`, `symbol` or line range, `sourceHash`, and a short observation. Line numbers are hints; hashes determine freshness.
- Edge: source and target module/symbol/external resource, `kind`, `confidence` (observed/inferred), and evidence IDs. External or unresolved targets are explicit, not fabricated module IDs.
- Test link: covered behavior/module, test paths, candidate command, working directory, and discovery evidence. A discovered command is not a passed test; execution results separately carry snapshot, exit status, and output location.
- Hotspot: location, signal, evidence IDs; a size or dependency count is a clue, not an approved refactoring finding.

Example edge:

```json
{
  "from": { "kind": "symbol", "moduleId": "orders", "name": "orders.submit" },
  "to": { "kind": "symbol", "moduleId": "payments", "name": "payments.charge" },
  "kind": "call",
  "confidence": "observed",
  "evidence": ["orders-submit-charge"]
}
```

## Freshness and incremental updates

Freshness is `current`, `stale`, or `unknown`, separate from coverage. A current inventory-only record is still not inspected.

1. Verify repository identity and schema. Compare current file enumeration and hashes with the prior inventory; include new, deleted, renamed, and dirty files. Do not rely on HEAD alone. Hashing all included files is a valid conservative fallback.
2. Invalidate changed source claims, their incident edges, reverse dependents, and linked test expectations. Manifest/build/config changes may invalidate the entire affected package or graph. Reinspect further dependents when contracts change; broaden to a full relevant scan when dynamic reachability cannot be bounded.
3. On a bounded refresh, preserve unrelated shards and their original provenance. Mark affected but uninspected shards stale; do not stamp them current with a new global revision. Deleted files lose active claims; stable IDs may keep rename continuity after verification.
4. If sources change during inspection, mark affected observations stale or repeat the scan. Never publish mixed observations as one fully current snapshot.

## Publication and recovery

One coordinator owns publication. Write new immutable snapshot shards, parse and validate their required fields, then publish `index.json` with an atomic replacement when supported. Check referenced paths, evidence IDs, module IDs, counts, hashes, and snapshot provenance before publication. Do not point the index at missing shards. If atomic replacement is unavailable, retain the previous valid index and use a recoverable temporary file.

Workers return observations rather than editing the shared index. Worktree observations are tied to their branch snapshot; refresh them against the integrated tree before publication. Orphan snapshots from interrupted runs can be cleaned after confirming no index references them; do not delete the last valid snapshot during an update.

On corruption, retain the damaged artifact for diagnosis and rebuild a separate valid snapshot from source. On unsupported schema, report the incompatibility and use a separate versioned output rather than silently downgrading. On resume, read metadata, compare fingerprints, and reuse only still-valid shards.

Persist concise facts and locators, not entire code files, secrets, runtime payloads, or unverified agent summaries. Keep human notes outside generated snapshot shards. Map output may be committed if project policy allows, but the skill does not commit automatically.
