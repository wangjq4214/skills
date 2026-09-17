---
name: grimoire-tidy
description: Compress Git-tracked .grimoire knowledge into durable sources and aggressively retire redundant specs and tickets once their useful knowledge is preserved.
disable-model-invocation: true
---

# Purpose

Keep `.grimoire/` compact and focused on durable knowledge. Treat specs, tickets, and other execution artifacts as temporary compression inputs rather than permanent records.

# Scope

Organize Git-tracked documents across `.grimoire/`: consolidate durable knowledge, improve navigation, repair references, and retire specs, tickets, and redundant execution artifacts. Explicit invocation is required because maintenance may delete documents.

Do not use untracked files as knowledge sources or cleanup inputs: do not read their contents, extract or merge information from them, edit them, or delete them. Determine scope from the Git index (for example, `git ls-files`), and report untracked paths only as excluded scope when useful. If tracked-file status cannot be established, stop rather than broadening scope.

Do not implement features, change requirements or acceptance criteria, or infer new architectural decisions. Do not initialize a missing knowledge store; report that there is nothing to tidy.

Use existing formats and ownership rules: [directory structure](../grimoire-init/references/directory-structure.md) for the base layout and [grimoire-record](../grimoire-record/SKILL.md) for context and ADR maintenance. Specialized areas such as `map/` and `refactor/` are inventoried, not silently rewritten or removed; consult their owning skills before proposing changes. Preserve unknown formats by default.

# Workflow

## 1. Establish scope and inventory

Distinguish an audit request from authorization to edit. Advice or a proposed cleanup plan is read-only. A request to execute cleanup authorizes eligible retirement under step 3; do not require a second confirmation for every eligible file. Ask before expanding scope or performing destructive work whose eligibility remains uncertain.

Enumerate every Git-tracked file under the selected `.grimoire/` root, including tracked files with working-tree modifications. Identify document type, topic, declared status, dependencies, and navigation entry points. Check version-control state without discarding existing edits. Do not follow symlinks outside the authorized root. Untracked files are outside the content-review and extraction scope.

Read the full content of every tracked document considered for modification or deletion, its related tracked specifications/tickets, and relevant tracked evidence. Inventory is not equivalent to content review: report unread, inaccessible, or excluded tracked areas explicitly. For large stores, process coherent groups and retain coverage accounting rather than silently sampling.

Completion: The root, authorization, complete inventory, and content-review coverage are known.

## 2. Diagnose and propose coherent changes

Find duplicate definitions, scattered topics, oversized or fragmented documents, broken links, orphaned files, conflicting guidance, and compressible execution artifacts. Treat specs and tickets as presumptive retirement candidates, regardless of their declared status; retain them only when they still carry unique durable knowledge or are an active execution contract that has no adequate surviving replacement.

For each affected group, identify the smallest canonical destination for useful knowledge and propose keep, edit, merge, split, move, or delete with a reason. Prefer consolidation and deletion over preserving parallel summaries. Prefer existing navigation and stable IDs over renaming or new directories. Split by domain or lifecycle, not line counts. Do not merge distinct requirements merely because their wording resembles one another.

Apply [organization rules](references/organization-rules.md) for navigation and content destinations. Surface unresolved contradictions with sources; do not select a winner based only on recency. Show the planned destructive changes, the knowledge retained from each candidate, and any active dependency blocking deletion. In audit mode, stop here with recommendations.

Completion: Each proposed change has a purpose, affected references, and an authorization or explicit blocker.

## 3. Evaluate spec and ticket compression

Specs and tickets are temporary execution artifacts and presumptive deletion candidates. Declared status is context, not a deletion gate: completed, cancelled, superseded, stale, and inactive unfinished artifacts may all be retired. Delete a candidate when ALL gates pass:

- **Knowledge preservation:** unique terminology, decisions and rationale, ongoing constraints, behavior rules, unresolved requirements, and acceptance criteria have adequate surviving sources. Extract only information worth keeping, and compress it into the smallest appropriate canonical source instead of reproducing the artifact. Execution steps, investigation logs, progress notes, and completed checklists need not survive.
- **Active-work continuity:** no current work still depends on the artifact as its only execution contract. Search tracked files across the repository for path links, stable IDs, and plain-text references. Retarget meaningful references to surviving sources. An unfinished status alone does not block deletion, but a live dependency without an adequate replacement does.
- **Tracked recoverability and authority:** the candidate is Git-tracked and deletion is authorized. Preserve tracked working-tree modifications unless the user explicitly authorizes deleting content that is not recoverable from the index or history. Do not commit, stage, stash, archive, or consult untracked file contents automatically.

Evaluate linked specs and tickets as a group and bias toward the smallest surviving durable source. A broader spec need not remain merely because some tickets refer to it: preserve its useful requirements or constraints canonically, retarget active references, and retire the redundant artifacts. Retain a candidate only for a specific unique-knowledge, active-dependency, authorization, or recoverability blocker.

Completion: Every candidate is deleted after these gates pass or has a specific retention reason.
## 4. Apply the authorized plan

Work in coherent groups: preserve durable information first, update navigation and incoming references second, delete eligible artifacts last. Confirm sources have not changed since review before destructive edits; retain and re-evaluate concurrent changes.

Preserve requirements, acceptance criteria, decision meaning, stable IDs, and necessary historical distinctions. For ADR corrections, duplication, and supersession, follow grimoire-record rather than treating decisions as disposable notes.

Keep changes within `.grimoire/` except authorized incoming-reference repairs in repository documentation. Source code, tests, agent configuration, or tooling changes require separate authorization; otherwise retain affected candidates and report the follow-up. Do not create new tests merely to justify deleting a spec in this maintenance pass.

Completion: Applied changes match the plan, with durable content and references preserved before removal.

## 5. Verify and report

- Re-inventory the selected Git-tracked root and account for every originally tracked file as retained, modified, moved, merged, or deleted. List created tracked files, excluded untracked paths when useful, and remaining review gaps.
- Check modified Markdown links and anchors, navigation coverage, and repository references to removed paths and IDs. Distinguish pre-existing defects from introduced ones.
- Compare before/after content for preserved requirements, acceptance criteria, decisions, and unresolved work. Confirm every deletion still passes step 3.
- Run available document/schema validators relevant to changed formats. If a check fails, repair it or restore the affected group without overwriting concurrent user changes; do not report partial cleanup as verified success.
- Report concise counts and paths, deleted artifacts with their evidence and surviving information destinations (or why none were needed), retained blockers, and validation results. Keep this report in the response unless the user requests persistence.

Completion: No introduced dangling references or unexplained information loss remain, and partial coverage or unresolved failures are explicit.

# Rules
- Treat Git-tracked specs and tickets as compression inputs, not assets to preserve by default. Once useful knowledge and active-work continuity survive elsewhere, prefer deletion.
- Never inspect untracked file contents for knowledge extraction or use them to decide how tracked content should be rewritten.

- Do not default to `archive/`, per-run reports, or copies of retired documents under new names. Version control holds execution history; surviving documentation holds useful current knowledge.
- Do not use Git history as the only accessible home for still-active behavior contracts.
- No file-count or deletion quota. If nothing needs changing, report a no-op; repeated runs should not churn structure, timestamps, or prose.
