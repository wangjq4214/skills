# Map v1 wire format

These TypeScript shapes specify JSON, not an executable TypeScript dependency. All fields are required unless marked `?`; nullable fields must be present as null. Unknown keys may be ignored by readers but must be preserved when updating. Changing required fields or their meanings requires a new schema version.

## Common types and path bases

```ts
type Id = string; // nonempty, only ASCII letters, digits, hyphen, underscore
type Hash = string; // lowercase 64-character SHA-256 hex
type SourcePath = string; // repository-relative POSIX path; "." allowed only for roots/cwd
type MapPath = string; // relative to .grimoire/map/, never relative to the referring shard
type Inspection = "inspected" | "inventoried-only" | "partial" | "blocked";
type Freshness = "current" | "stale" | "unknown";
type Snapshot = {
  id: Id; revision: string | null; dirty: boolean;
  capturedAt: string; // ISO 8601 UTC timestamp
  algorithm: "sha256-path-hash-v1"; sourceFingerprint: Hash;
};
type Coverage = {
  included: number; inspected: number; "inventoried-only": number;
  partial: number; blocked: number; unclassified: number;
}; // all nonnegative integers; unclassified overlaps inspection counts
```

Reject absolute paths, backslashes, empty segments, `..` traversal, and paths resolving outside the relevant root (including symlink escapes). Source file symlinks are inventoried as blocked with an explicit reason unless their in-root target and hashing semantics are deliberately supported in a future version. IDs are unique within their collection. Source paths are case-preserving and unique; detect case-collision on case-insensitive filesystems rather than merging silently.

## Index and inventory

```ts
type Index = {
  schemaVersion: 1;
  repository: { id: Id; root: string; remote: string | null };
  snapshot: Snapshot;
  scope: { roots: SourcePath[]; exclusions: { pattern: string; reason: string }[];
           requestedRoots: SourcePath[] };
  inventory: MapPath;
  modules: { id: Id; label: string; shard: MapPath; snapshotId: Id;
             coverage: Inspection; freshness: Freshness }[];
  coverage: Coverage;
  limitations: string[];
};
type FileEntry = {
  path: SourcePath;
  category: "production" | "test" | "config" | "docs" | "generated" | "vendor";
  hash: Hash | null; moduleId: Id | null; coverage: Inspection; reason: string | null;
};
type Inventory = {
  schemaVersion: 1; snapshotId: Id;
  enumeration: { command: string; cwd: SourcePath; filters: string[] };
  entries: FileEntry[]; pages: MapPath[];
};
type InventoryPage = { schemaVersion: 1; snapshotId: Id; entries: FileEntry[] };
```

Choose either inline entries with `pages: []`, or pages with `entries: []`; both may be empty for an empty repository. Pages cannot reference more pages. Resolve all pages relative to `.grimoire/map/`, flatten once, reject duplicate file paths, then compute coverage. Index/inventory/pages must have matching snapshot IDs. Each non-null moduleId must reference an index module. Each non-inspected file needs a nonempty reason. Null hash means unavailable source bytes and requires blocked status. Repository root is an absolute local locator (the only path exception); id is persisted identity, not a credential-bearing remote. On root relocation, verify repository identity before reusing it.

## Module shard

```ts
type Claim = { text: string; evidence: Id[] };
type Evidence = {
  id: Id; path: SourcePath; symbol: string | null;
  lines: [number, number] | null; sourceHash: Hash; observation: string;
};
type Endpoint = {
  kind: "module" | "symbol" | "external" | "unresolved";
  moduleId: Id | null; name: string;
};
type ModuleShard = {
  schemaVersion: 1; id: Id; snapshotId: Id; sourceSnapshot: Snapshot;
  responsibility: Claim; files: SourcePath[];
  entryPoints: Claim[]; contracts: Claim[]; stateOwners: Claim[];
  edges: { from: Endpoint; to: Endpoint;
           kind: "import" | "call" | "data" | "event" | "runtime-registration";
           confidence: "observed" | "inferred"; evidence: Id[] }[];
  tests: { behavior: string; paths: SourcePath[]; command: string;
           cwd: SourcePath; evidence: Id[] }[];
  hotspots: { location: SourcePath; signal: string; evidence: Id[] }[];
  evidence: Evidence[]; unknowns: string[];
};
```

Evidence IDs are local to their module shard; every nonempty factual claim/edge/test/hotspot must cite existing evidence. Unknown claims use empty text/evidence plus an explanation in unknowns. An evidence locator requires a nonempty symbol or a positive ordered line range. Module/symbol endpoints require an indexed moduleId; external/unresolved endpoints use null. Shard files must exactly match its assigned inventory entries for current shards. Empty arrays never prove absence; coverage and unknowns qualify them.

`index.modules[].snapshotId`, shard.snapshotId, and shard.sourceSnapshot.id must agree. Reused shards may have an older snapshot than the index: retain sourceSnapshot unchanged, check all their file/evidence hashes and relationship assumptions against the new inventory, then label freshness current only when valid. A source fingerprint match alone does not validate a dynamic edge. Stale shards may reference deleted files/modules; keep such historical claims only with stale freshness, never as current navigation evidence.

## Fingerprints and validation

For each readable included file, hash its exact bytes with SHA-256. Sort flattened inventory entries by UTF-8 byte order of path. Encode the array of `[path, hash]` pairs using compact `JSON.stringify`-equivalent JSON, UTF-8, no trailing newline; hash those bytes with SHA-256 for sourceFingerprint. Null hashes remain JSON null and prevent claims of a fully verified current tree. Exclude `.git`, map/run output, vendor/generated roots excluded by declared scope, and other declared exclusions consistently. Record filters; changing scope requires explicit reconciliation, not comparing unlike fingerprints.

Validate parsing, required keys/types, enum values, safe paths, unique IDs, reference resolution, snapshot agreement, evidence locators, module assignments, and aggregate counts before publishing. `inspected + inventoried-only + partial + blocked == included`; `unclassified == count(moduleId === null)` independently. Module aggregation follows persistence.md. Hash reuse requires current byte comparison; parse success is not a freshness check.

## Complete empty-repository example

Each top-level key below names a file under `.grimoire/map/`; the outer object is an example bundle, not an additional persisted envelope. The empty inventory fingerprint is SHA-256 of the exact bytes `[]`. No module shard is needed when there are no modules.

```json
{
  "index.json": {
    "schemaVersion": 1,
    "repository": { "id": "example-repo", "root": "/example/repo", "remote": null },
    "snapshot": {
      "id": "scan-1", "revision": null, "dirty": false,
      "capturedAt": "2026-01-01T00:00:00Z",
      "algorithm": "sha256-path-hash-v1",
      "sourceFingerprint": "4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
    },
    "scope": { "roots": ["."], "exclusions": [], "requestedRoots": ["."] },
    "inventory": "snapshots/scan-1/inventory.json",
    "modules": [],
    "coverage": { "included": 0, "inspected": 0, "inventoried-only": 0, "partial": 0, "blocked": 0, "unclassified": 0 },
    "limitations": []
  },
  "snapshots/scan-1/inventory.json": {
    "schemaVersion": 1, "snapshotId": "scan-1",
    "enumeration": { "command": "git ls-files --cached --others --exclude-standard", "cwd": ".", "filters": [] },
    "entries": [], "pages": []
  }
}
```
