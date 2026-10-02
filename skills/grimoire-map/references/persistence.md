# Persistent map contract (version 1)

The map is a disposable evidence cache. Source and executable evidence remain authoritative; ordinary JSON and repository tools suffice.

Read [wire-format.md](./wire-format.md) for authoritative keys, types, path bases, fingerprints, and validation. Do not invent alternate version-1 fields.

## Layout and coverage

```text
.grimoire/map/
  index.json
  snapshots/<snapshot-id>/inventory.json
  snapshots/<snapshot-id>/modules/<module-id>.json
  overview.md
```

Snapshot IDs identify scans, not just commits; dirty trees at the same HEAD may differ. Module IDs are stable across verified renames. Paths/IDs must obey wire-format safety rules.

Inspection and assignment are independent. Count every included file once as inspected, inventoried-only, partial, or blocked, and separately count null module IDs as unclassified. Module coverage is inspected only when all assigned files are inspected, blocked when all are blocked, inventoried-only when all are inventoried-only, and partial otherwise (including empty modules). Index coverage covers the persisted scope; requestedRoots identifies the attempted refresh.

Freshness is current, stale, or unknown, independent of inspection. Current inventory-only records are not inspected. Empty observation arrays do not prove absence; candidate test commands do not prove execution. Execution results separately need snapshot, exit status, and output location.

## Incremental updates

1. Verify schema and repository identity. Compare current enumeration and byte hashes, including new/deleted/renamed/dirty files; HEAD or mtimes alone are insufficient.
2. Invalidate changed claims, incident edges, reverse dependents, and linked test expectations. Manifest/build/config changes may invalidate a package or graph. Contract changes require dependent inspection; unbounded dynamic reachability requires broader scanning.
3. Preserve unrelated shards and original provenance during bounded refresh. Mark affected but uninspected shards stale, never current merely because the global revision changed. Deleted files lose active claims.
4. If source changes during inspection, repeat or mark affected observations stale. Never publish mixed observations as fully current.

## Publication and recovery

One coordinator publishes. Write new immutable shards, parse and validate them against wire-format, then atomically replace the index where supported. Check paths, IDs, counts, hashes, and provenance before publication; never reference missing shards. If atomic replacement is unavailable, retain the previous valid index and a recoverable temporary file.

Workers return branch-bound observations; revalidate against the integrated tree. Clean orphan snapshots only after checking index references; never remove the last valid snapshot during an update.

On corruption, retain the damaged artifact and rebuild separately from source. Reject unsupported versions without overwriting/downgrading them; use separate versioned output. On resume, compare fingerprints and reuse only valid evidence. Preserve unknown keys when updating.

Keep human notes outside generated shards. Persist facts and locators, not raw source, secrets, runtime payloads, or unverified summaries. Committing map output requires project permission and is never automatic.
