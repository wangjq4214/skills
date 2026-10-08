---
name: grimoire-tidy
description: Use when explicitly invoked to audit or clean up Git-tracked .grimoire documents, consolidate stored knowledge, or retire redundant specs and tickets. Not for source-code cleanup or automatic deletion after implementation.
disable-model-invocation: true
---

Keep `.grimoire/` compact, not a permanent task log. Specs are requirements contracts with continuing value; tickets primarily support multi-step execution and handoff. Retire completed redundant documents when the gates below pass; do not delete useful specs merely because implementation is complete. Status alone neither permits nor blocks retirement, including for inactive unfinished artifacts.

## Scope and authority

Explicit invocation is required because cleanup may delete documents. Audit and planning requests are read-only; an execution request authorizes eligible cleanup without per-file reconfirmation. Ask before expanding scope or proceeding with uncertain destructive changes. Do not initialize a missing store, implement features, change requirements or acceptance criteria, or invent architectural decisions.

Establish the selected root and inventory every Git-tracked file with `git ls-files`, including working-tree modifications. Stop if tracked status cannot be established. Do not follow symlinks outside the authorized root. Read every document proposed for change in full, its related tracked specs/tickets, and relevant tracked evidence. Report unread or inaccessible areas; inventory is not content review. For large stores, work in coherent groups without silently sampling.

Exclude pre-existing untracked files: do not read, extract from, edit, or delete them; report paths only when useful. Authorized outputs created during this run may be read back, edited, and verified even while untracked. Never overwrite an excluded path. Do not automatically commit, stage, stash, or archive.

Keep changes inside `.grimoire/`, except authorized incoming-reference repairs in repository documentation. Source code, tests, agent configuration, and tooling need separate authorization; retain candidates whose deletion requires unauthorized repairs. Do not create tests merely to justify retirement.

## Knowledge destinations

Follow the existing [directory structure](../grimoire-init/references/directory-structure.md). For context or ADR changes, consult [grimoire-record](../grimoire-record/SKILL.md); preserve ADR history rather than treating decisions as disposable execution notes. Inventory specialized areas such as `map/` and `refactor/`, but consult their owners before proposing changes. Preserve unfamiliar formats by default.

- Put terminology and domain relationships in `CONTEXT.md` or its indexed domain files. It is not a project dashboard or requirements dump.
- Preserve actual architectural choices, rationale, alternatives, and binding constraints in appropriate ADRs; do not turn them into implementation diaries.
- Preserve behavior, business rules, exceptions, unresolved requirements, and acceptance criteria in useful specs, maintained feature/domain documentation, or tests that actually encode the contract. Tests may preserve behavior without preserving intent; implementation alone is not proof of the required contract. Retain a spec or ticket holding unique requirements if no adequate destination exists. Do not relocate a useful contract solely to delete its source.
- Discard obsolete execution detail, investigation logs, progress notes, and completed checklists when retirement is eligible. Do not duplicate information already preserved.

Prefer concise additions to existing sources. If transfer needs a new durable document or an out-of-scope edit, propose the destination and retain the source until approved and verified. Reuse navigation, stable IDs, and filenames; split by domain or lifecycle, not length. Avoid parallel summaries, compulsory indexes, ADR renumbering, archive copies, and per-run report files. Surface unresolved contradictions with sources; do not resolve them by recency or merge distinct requirements merely because they sound alike.

## Retirement and execution

Evaluate linked specs and tickets together. For each candidate, identify surviving information destinations, affected references, and any blocker. All three gates must pass before deletion:

- **Knowledge preservation:** unique durable knowledge and still-relevant requirements, acceptance criteria, and constraints survive in adequate accessible sources, including requirements found only in tickets. Git history alone is not a home for active behavior contracts.
- **Active-work continuity:** no current work loses its only execution contract. Search tracked files across the repository for paths, stable IDs, and plain-text references; retarget meaningful references. Do not discard execution detail still needed by active work. Report the tracked-only evidence boundary rather than claiming excluded content was checked.
- **Tracked recoverability and authority:** the candidate is tracked and deletion is authorized. Preserve working-tree changes unless the user explicitly authorizes deleting content unrecoverable from the index or history. Retain candidates blocked by uncertainty, unresolved contradictions, or unauthorized reference repairs.

Show proposed changes, retained knowledge, and blockers. In audit mode, stop with recommendations; gate evaluation does not itself perform deletion.

For authorized execution, preserve knowledge first, repair navigation and incoming references second, and delete eligible artifacts last. Read back and verify any new destination before deleting its source, and report its untracked status without staging it. Confirm sources have not changed since review before destructive edits; retain and re-evaluate concurrent changes. Preserve decision meaning, necessary historical distinctions, and stable IDs or their meaningful reference targets.

## Completion

Account for every originally tracked file as retained, modified, moved, merged, or deleted; list newly created outputs separately with their Git status. Check changed links and anchors, navigation, repository references to removed paths/IDs, and before/after preservation of requirements, decisions, and unresolved work. Recheck deletion gates and run relevant available document/schema validators. Distinguish pre-existing defects from introduced ones. On failure, repair or restore the affected group without overwriting concurrent user changes; report unresolved failures and partial coverage, not verified success.

Return concise counts and paths, deletion evidence and surviving destinations (or why none were needed), retained blockers, review gaps, and validation results. Completion requires no introduced dangling references or unexplained information loss. No deletion quota: if nothing needs changing, report a no-op; repeated runs should not churn structure, timestamps, or prose. Keep the report in the response unless persistence is requested.
