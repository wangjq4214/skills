# Refactoring coordination scenarios

These are authoring walkthroughs, not executed agent evaluations. The static suite checks reference wiring and selected contract constraints, not runtime compliance or JSON schema validation.

## Description-only selection

| Request | Expected selection / boundary |
| --- | --- |
| Where does session state live? Trace login to storage. | map; source navigation, no redesign findings |
| Assess whether these modules own the right responsibilities. | improve; recommendations, no implementation without authorization |
| Remove redundant state and forwarding in this function. | simplify; no responsibility redesign or mandatory ledger |
| Use grimoire-refactor to restructure this subsystem and simplify it. | explicit refactor; coordinate owners and integrated acceptance |
| Add a new authentication feature. | Not these skills merely because source inspection is needed |
| Refactor this local conditional. | simplify when behavior-preserving; do not auto-select explicit-only refactor |

## Contract and recovery cases

| Setup | Required observation |
| --- | --- |
| Map inspected a file; improve has not evaluated its ownership. | Map coverage remains inspected; improve coverage remains inventoried-only/partial. Refactor cannot call discovery complete from map coverage alone. |
| Duplication analysis is complete but lifecycle analysis is unread for the same file. | Separate Analysis records preserve different per-lens coverage; a shared coverage entry cannot mark both inspected. |
| Both owners identify the same duplicated policy. | Keep both finding records; coordinator links duplicates and assigns one implementation owner. No copied finding bodies in run state. |
| Source graph contains a dependency cycle. | It does not automatically become a unit prerequisite cycle. Settle interfaces or group an atomic unit when scheduling actually requires it. |
| Analyze-only, explicitly no writes. | Inline artifacts resolve source/shard/finding/check references. No map, owner ledger, run state, or report files appear. |
| Small standalone simplification with only simplify installed. | Direct source citations and concise results suffice. No map/coordinator installation or versioned envelope required. Structured output requires the canonical contract rather than an improvised schema. |
| Baseline and new dirty tree share HEAD. | Source byte fingerprints distinguish them; baseline reference still resolves its retained immutable index and shards. A changed fact does not inherit an old check pass. |
| A worker passes tests, then another unit changes shared lifecycle behavior. | Branch result stays branch-bound; affected integrated checks rerun and owner findings are reassessed. Worker status cannot mark run acceptance complete. |
| Persisted run resumes after an owner artifact was replaced or removed. | Hash/reference mismatch blocks reuse. Recover retained artifacts or refresh evidence; do not follow latest or infer success from status. |
| An older shard remains valid after a bounded refresh. | Preserve original shard provenance; validate hashes and relationships against the newer index rather than rewriting evidence to match its snapshot ID. |
| Legacy refactor v1 or unversioned analysis ledger exists. | Preserve it. Authorized conversion creates new owner records and separate schema-v2 state with revalidated evidence; denied conversion stays inline and reports incompatibility. |
| Cleanup considers a historical map snapshot. | An active run/analysis baseline reference prevents deletion even when current map index no longer uses it. |

For a real evaluation, use a disposable repository, capture prompts/model/tool versions, before/after files, emitted artifacts, and executed checks. Mark each case observed or unresolved; do not promote these walkthroughs to tested reliability.
