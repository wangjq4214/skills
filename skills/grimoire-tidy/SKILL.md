---
name: grimoire-tidy
description: Organize .grimoire knowledge, preserve durable information, and remove completed specs and tickets after evidence-backed retirement checks.
disable-model-invocation: true
---

# Purpose

Keep `.grimoire/` focused on current work and durable knowledge rather than an accumulating execution log.

# Scope

Organize documents across `.grimoire/`: improve navigation, consolidate duplicates, split or merge coherent topics, repair references, and retire completed specs and tickets. Explicit invocation is required because maintenance may delete documents.

Do not implement features, change requirements or acceptance criteria, infer new architectural decisions, or mark work completed to make it eligible for cleanup. Do not initialize a missing knowledge store; report that there is nothing to tidy.

Use existing formats and ownership rules: [directory structure](../grimoire-init/references/directory-structure.md) for the base layout and [grimoire-record](../grimoire-record/SKILL.md) for context and ADR maintenance. Specialized areas such as `map/` and `refactor/` are inventoried, not silently rewritten or removed; consult their owning skills before proposing changes. Preserve unknown formats by default.

# Workflow

## 1. Establish scope and inventory

Distinguish an audit request from authorization to edit. Advice or a proposed cleanup plan is read-only. A request to execute cleanup authorizes eligible retirement under step 3; do not require a second confirmation for every eligible file. Ask before expanding scope or performing destructive work whose eligibility remains uncertain.

Enumerate every file under the selected `.grimoire/` root, including untracked and unfamiliar files. Identify document type, topic, declared status, dependencies, and navigation entry points. Check version-control state without discarding existing edits. Do not follow symlinks outside the authorized root.

Read the full content of every document considered for modification or deletion, its related specifications/tickets, and relevant evidence. Inventory is not equivalent to content review: report unread, inaccessible, or excluded areas explicitly. For large stores, process coherent groups and retain coverage accounting rather than silently sampling.

Completion: The root, authorization, complete inventory, and content-review coverage are known.

## 2. Diagnose and propose coherent changes

Find duplicate definitions, scattered topics, oversized or fragmented documents, broken links, orphaned files, conflicting guidance, and finished execution artifacts. An unlinked document is not necessarily obsolete.

For each affected group, identify canonical content and propose keep, edit, merge, split, move, or delete with a reason. Prefer existing navigation and stable IDs over renaming or new directories. Split by domain or lifecycle, not line counts. Do not merge distinct requirements merely because their wording resembles one another.

Apply [organization rules](references/organization-rules.md) for navigation and content destinations. Surface unresolved contradictions with sources; do not select a winner based only on recency. Show the planned destructive changes and the retirement evidence. In audit mode, stop here with recommendations.

Completion: Each proposed change has a purpose, affected references, and an authorization or explicit blocker.

## 3. Evaluate spec and ticket retirement

Completed specs and tickets are deletion candidates, not permanent records. Delete a candidate only when ALL gates pass:

- **Completion evidence:** every in-scope requirement or task is satisfied and verified, using relevant implementation, tests, or attributable verification results. A `Completed` label, file age, or the author's assertion alone is insufficient. Check that recorded results still apply to the relevant implementation; run targeted checks when needed. If verification is unavailable or fails, retain the candidate and report the gap.
- **Durable information:** unique terminology, decisions and rationale, ongoing constraints, behavior rules, and acceptance requirements have adequate surviving sources. Confirm their actual coverage; the existence of a test file is not enough. A spec still serving as the sole behavior contract stays unless that contract is preserved elsewhere. See the destination rules before transferring content.
- **Dependencies and references:** no unfinished work depends on the artifact as its execution contract. Search the repository outside `.grimoire/` too, including path links, stable IDs, and plain-text references. Retarget meaningful references to surviving sources; do not remove traceability still needed by active work. Disclose search exclusions and inaccessible or external consumers; unresolved material dependencies block deletion.
- **Recoverability and authority:** the deletion is authorized and the exact current content is recoverable from version control or a user-approved backup. Verify this; a Git repository does not prove a file or its current edits were committed. Preserve dirty/untracked candidates unless the user explicitly approves their deletion or backup. Do not commit, stage, stash, or create an archive automatically.

Evaluate linked specs and tickets as a group: a finished ticket may be retired while its broader spec remains active; a spec with unfinished scope must remain. Cancelled or superseded work is not completed work and requires a separate explicit disposal decision.

Completion: Every deletion candidate has evidence for all four gates or a specific retention reason.

## 4. Apply the authorized plan

Work in coherent groups: preserve durable information first, update navigation and incoming references second, delete eligible artifacts last. Confirm sources have not changed since review before destructive edits; retain and re-evaluate concurrent changes.

Preserve requirements, acceptance criteria, decision meaning, stable IDs, and necessary historical distinctions. For ADR corrections, duplication, and supersession, follow grimoire-record rather than treating decisions as disposable notes.

Keep changes within `.grimoire/` except authorized incoming-reference repairs in repository documentation. Source code, tests, agent configuration, or tooling changes require separate authorization; otherwise retain affected candidates and report the follow-up. Do not create new tests merely to justify deleting a spec in this maintenance pass.

Completion: Applied changes match the plan, with durable content and references preserved before removal.

## 5. Verify and report

- Re-inventory the selected root and account for every original file as retained, modified, moved, merged, or deleted. List created files and remaining review gaps.
- Check modified Markdown links and anchors, navigation coverage, and repository references to removed paths and IDs. Distinguish pre-existing defects from introduced ones.
- Compare before/after content for preserved requirements, acceptance criteria, decisions, and unresolved work. Confirm every deletion still passes step 3.
- Run available document/schema validators relevant to changed formats. If a check fails, repair it or restore the affected group without overwriting concurrent user changes; do not report partial cleanup as verified success.
- Report concise counts and paths, deleted artifacts with their evidence and surviving information destinations (or why none were needed), retained blockers, and validation results. Keep this report in the response unless the user requests persistence.

Completion: No introduced dangling references or unexplained information loss remain, and partial coverage or unresolved failures are explicit.

# Rules

- Do not default to `archive/`, per-run reports, or copies of retired documents under new names. Version control holds execution history; surviving documentation holds useful current knowledge.
- Do not use Git history as the only accessible home for still-active behavior contracts.
- No file-count or deletion quota. If nothing needs changing, report a no-op; repeated runs should not churn structure, timestamps, or prose.
