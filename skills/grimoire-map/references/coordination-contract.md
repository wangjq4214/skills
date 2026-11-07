# Refactoring coordination contract v1

Read when exchanging structured results between map, improve, simplify, and refactor, or persisting resumable analysis. This is the sole definition of shared record shapes; it does not authorize work or require a coordinator for standalone tasks. Small standalone responses need no envelope. If this reference is unavailable in a selective installation, obtain it from the caller before emitting versioned records; do not invent a substitute schema.

## Ownership

| Owner | Authoritative data | Other stages consume |
| --- | --- | --- |
| map | Repository/source snapshots, inventory, source-inspection coverage, navigation claims, source dependency graph, evidence locators and freshness | Pinned source and evidence references |
| improve / simplify | Each skill's analysis coverage, findings, recommendations, retention reasons, proposed changes | Analysis and finding references |
| Check executor | Actual commands/observations and results, bound to the checked source | Check references; never a copied pass flag |
| refactor | Execution permissions, cross-stage deduplication links, work-unit dependency graph, integration/recheck progress, final acceptance | Coordination state and derived report |

Source dependency edges are not work-unit prerequisites. Map inspection does not establish improve/simplify analysis coverage. Refactor may summarize owner records but must not maintain a competing inventory, finding body, source graph, or check result. One agent may perform several roles; ownership is of data, not processes.

## References and source identity

The map's [wire-format.md](./wire-format.md) remains authoritative for `Id`, `Hash`, `SourcePath`, `MapPath`, `Inspection`, `Snapshot`, evidence, fingerprints, and map v1 storage. This contract references those definitions rather than creating alternate snapshot or coverage formats. The following TypeScript shapes specify JSON; all fields are required unless marked `?`.

```ts
type ArtifactRef = { id: Id; path: SourcePath | null; sha256: Hash | null };
type RecordRef = { artifact: ArtifactRef; id: Id };
type SourceRef = { repositoryId: Id; index: ArtifactRef; snapshotId: Id };
type Scope = { roots: SourcePath[]; exclusions: { pattern: string; reason: string }[] };
type AnalysisCoverage = { path: SourcePath; coverage: Inspection; reason: string | null };
type Handoff<T> = {
  contractVersion: 1; payload: T;
  inlineArtifacts: Record<Id, unknown>; mapFiles: Record<MapPath, unknown>;
};
```

Artifact paths are repository-relative, never relative to the referring document; use the map wire format's safe-path rules. For persisted artifacts, `sha256` hashes exact artifact bytes, not source bytes. References pin immutable editions. For a source reference, map publishes an immutable copy of its validated index at `.grimoire/map/snapshots/<snapshot-id>/index.json`; its internal map paths remain map-root-relative. `repositoryId` and `snapshotId` must match that index. Existing map v1 readers remain compatible; standalone navigation need not publish this extra copy.

Use `Handoff<T>` for structured transfers, with payload equal to the selected record (for example Analysis or UnitResult); artifact values must be JSON. For no-persistence handoffs, set artifact `path` and `sha256` to null and supply an `inlineArtifacts` object keyed by artifact ID containing the referenced values. `mapFiles` supplies map inventories/shards keyed by their map-root-relative paths for inline indexes; use empty objects when none are needed. Resolve every reference in the same handoff or a retained caller registry; a bare ID is not evidence. Persisted state must not depend on ephemeral inline objects: materialize permitted artifacts and repin references before saving, or remain explicitly non-resumable.

Artifact IDs identify immutable editions; record IDs identify stable findings/checks/proposals within their owner and must be unique across collections within an artifact. A `RecordRef` resolves to the record with that ID in the referenced artifact (map evidence IDs resolve within their module shard). Missing records, mismatched repository/snapshot IDs, or changed artifact hashes invalidate the reference. Never follow a mutable `index.json` or `latest` alias as a baseline. Keep referenced snapshots alive while any active analysis/run needs them.

## Analysis and validation records

```ts
type Finding = {
  id: Id; rootCause: string; locations: SourcePath[]; evidence: RecordRef[];
  affectedContract: string; impact: string; confidence: string; cost: string;
  consumers: SourcePath[]; recommendation: string;
  disposition: "pending" | "proposed" | "addressed" | "retained" | "out-of-scope" | "blocked";
  reason: string | null;
};
type Proposal = {
  id: Id; findingIds: Id[]; objective: string;
  writePaths: SourcePath[]; readPaths: SourcePath[]; dependsOn: RecordRef[];
  preservedContracts: string[]; interfaceDecisions: string[];
  validationCommands: string[]; expectedBenefit: string;
};
type Analysis = {
  contractVersion: 1; owner: "improve" | "simplify"; id: Id;
  source: SourceRef; scope: Scope; lenses: string[];
  coverage: AnalysisCoverage[]; findings: Finding[]; proposals: Proposal[];
  checks: RecordRef[]; nextAction: string | null;
};
type Check = {
  id: Id; executor: string; source: SourceRef; scope: Scope;
  context: "baseline" | "branch" | "integrated";
  method: "command" | "inspection"; command: string | null; cwd: SourcePath;
  status: "passed" | "failed" | "blocked" | "not-run"; exitCode: number | null;
  classification: string | null; summary: string; output: ArtifactRef | null;
};
type CheckResults = { contractVersion: 1; checks: Check[] };
```

Analysis coverage records every included file in its declared scope once; derive totals using map inspection semantics, without copying module assignments or inventory. Scope must reconcile with the referenced inventory, including explicit exclusions and blocked/unread paths. Inspecting one function leaves a larger file partial. Analyzed-with-no-findings requires coverage, not an empty findings array. Coverage is per owner/lens and source snapshot; never sum overlapping analyses or treat one skill's coverage as another's. One Analysis coverage entry applies to every listed lens; if coverage differs by lens, publish separate Analysis records. Do not mark a file inspected until every listed lens was evaluated across it.

Findings cite map evidence, not copied source facts. Discovery workers return new source observations for map adoption; their findings remain provisional until those references resolve. Standalone analysis may perform the map evidence role inline without invoking another skill or creating a full-repository map. It still uses the same source/evidence shapes when publishing structured results. Small unstructured responses may cite source locations directly.

Finding IDs survive re-evaluation. `retained`, `out-of-scope`, and `blocked` require concrete reasons; `addressed` describes an owner's assessment, not integrated acceptance. Deduplicate within an owner by root cause and affected contract. Across owners, the coordinator links duplicates and selects an implementation owner without deleting either analysis. Reopen retained findings only for changed source or new evidence. Proposal dependencies reference proposals; source relationships remain in map.

Checks are produced by whoever actually ran the command or inspection, including test/review/check adapters; preserve their original verdict in `classification`. A command check requires its exact command and working directory; an executed command requires its exit code. An unexecuted check has null exitCode and a reason in summary, never `passed`. Inspection checks have null command/exitCode and cite observations in summary/output. Keep baseline failures, branch checks, and integrated checks distinct. Missing logs may use a concise inline result, but absence of execution evidence cannot become success. Candidate commands in map or proposals are not check results.

## Run state and evolution

Refactor state uses `contractVersion: 1, schemaVersion: 2`. The shared run and worker-result shapes are:

```ts
type Execution = {
  mode: "analyze" | "implement"; scope: Scope; allowedWrites: SourcePath[];
  persistence: boolean; permittedChecks: string[]; reporting: string | null;
  preserveChanges: string[];
};
type Target = {
  id: Id; metric: string; value: number; scope: Scope; source: string;
  requirement: "aspirational" | "required"; measurement: string;
};
type UnitStatus = "planned" | "ready" | "running" | "verified" | "integrated" |
  "accepted" | "blocked" | "rejected";
type Unit = {
  id: Id; proposalRefs: RecordRef[]; findingRefs: RecordRef[];
  owner: "improve" | "simplify"; dependsOn: Id[];
  writePaths: SourcePath[]; readPaths: SourcePath[]; interfaceDecisions: string[];
  base: SourceRef; branch: string | null; worktree: string | null;
  results: ArtifactRef[]; status: UnitStatus;
};
type UnitResult = {
  contractVersion: 1; unitId: Id; base: SourceRef; final: SourceRef;
  branch: string | null; commit: string | null; patch: ArtifactRef | null;
  changedPaths: SourcePath[]; summary: string; preservedContracts: string[];
  dependencyChanges: string[]; analyses: ArtifactRef[]; checks: ArtifactRef[];
  risks: string[]; blockers: string[]; nextAction: string | null;
};
type Recheck = {
  source: SourceRef; scope: Scope; lenses: string[];
  analyses: ArtifactRef[]; checks: ArtifactRef[]; crossModuleRisks: string[];
  furtherPass: { required: boolean; reason: string };
};
type Acceptance = {
  status: "complete" | "incomplete" | "blocked";
  decisions: { requirementId: Id; status: "satisfied" | "unmet" | "unverified";
               evidence: RecordRef[]; reason: string }[];
  unresolved: string[];
};
type Run = {
  contractVersion: 1; schemaVersion: 2; id: Id; repositoryId: Id;
  execution: Execution; baseline: SourceRef; integration: SourceRef;
  targets: Target[]; acceptanceCriteria: { id: Id; requirement: string }[];
  analyses: ArtifactRef[]; checks: ArtifactRef[];
  duplicates: { canonical: RecordRef; duplicate: RecordRef; reason: string }[];
  units: Unit[]; rechecks: Recheck[]; acceptance: Acceptance;
  nextAction: string | null;
};
```

Run baseline is immutable; integration initially references it and advances after reconciliation. Requirement IDs are unique across targets and acceptanceCriteria; acceptance decisions reference those IDs. Target `measurement` records the fixed counter/version, command, formatting, and filters when applicable. Reporting null disables reports; otherwise it states format/destination restrictions. No requested target means an empty targets array, not an invented threshold.

Each unit references owner proposals for objective, preserved contracts, validation plan, and expected benefit. Its interfaceDecisions contain only cross-proposal resolutions; dependsOn contains unit IDs, not source edges or proposal IDs. Results reference `UnitResult` artifacts. Analysis/check arrays reference `Analysis`/`CheckResults` artifacts. Branch/worktree may be null for serial execution; worktree is a local locator, not an artifact path. Unit state transitions and integration procedure belong to refactor's coordination reference.

A worker final SourceRef may identify a branch-scoped snapshot. Preserve its immutable index, inventory, and shards before worktree cleanup; never repoint it to the integrated snapshot. The designated map writer may publish those branch artifacts under unique snapshot IDs without advancing the shared current map index. Only integrated-tree evidence may advance that index or support integrated acceptance. Inline branch artifacts must be materialized in authorized durable paths before a persisted run references them.

One designated writer publishes each owner's artifacts, then the referencing run state. Validate types, versions, reference resolution, repository/scope agreement, coverage, and dependency IDs before publication. Unit prerequisites must be acyclic; group a necessary cycle into one atomic unit. Use immutable result editions and safe index/state replacement; retain the last valid state on interruption. A source change invalidates affected analysis/check applicability even when artifact hashes still match; map freshness and dependent contract reinspection govern reuse. Branch verification cannot be promoted to integrated acceptance without combined-tree checks.

`contractVersion` versions this shared interface independently of map `schemaVersion`. Optional additive keys may be preserved; required-key or meaning changes require a new contract version. Reject unsupported versions without overwriting or downgrading them. Legacy refactor schema v1 and unversioned improve/simplify ledgers are not contract-v1 records: preserve them, explicitly convert into new owner artifacts and a separate schema-v2 run state, and revalidate source, coverage, and checks before reuse. Never infer acceptance from legacy status labels. No permission to migrate means report the incompatibility and keep results inline.
