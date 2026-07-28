---
name: grimoire-check
description: Audit code implementation completeness against a plan — identify every match, gap, deviation, and extra, report ticket and spec alignment, and update artifact statuses.
---

# Purpose

Audit whether current code correctly implements a plan. Identify every planned item that is missing, implemented differently, or never planned. Report ticket and spec alignment. Update artifact statuses (ADR, spec, ticket) to reflect implementation reality.

# Scope

This skill reads plans, tickets, specs, ADRs, and code. It reports findings and updates status fields in artifacts. It does NOT write code, fix issues, create plans, or modify artifact content beyond status fields.

Outside scope: writing fixes, refactoring, creating plans, writing specs, running tests, merging changes, modifying artifact content other than the Status field.

# Leading words

- **match** — implemented exactly as planned
- **gap** — planned but not found in code
- **deviation** — implemented differently from the plan
- **extra** — found in code but not in the plan

# Input hierarchy

Spec → Ticket → Plan (most detailed).

The plan is the ground truth for checking. Ticket and spec provide context.

# Workflow

## 1. Pre-flight

Determine the input source from the user:

- If a **plan path** is given (`.grimoire/plans/NNNN-title.html`), use it directly.
- If a **ticket path** is given (`.grimoire/ticket/NNNN-xxx/`), find the corresponding plan under `.grimoire/plans/` by matching sequence number or title keywords. If multiple candidates, ask the user to choose.
- If a **spec path** is given (`.grimoire/spec/NNNN-title.md`), find the corresponding plan the same way.
- If no input is given, ask: "Which plan, ticket, or spec should I check against?"

**Stop condition**: If no plan exists or no plan can be matched, stop. Report: "No plan found — nothing to check against."

Completion: A specific plan file path is resolved. If no plan exists, execution stops here.

---

## 2. Load artifacts

Read every source that constrains the check:

1. **Plan** — the resolved plan HTML. Extract the concrete change list: files to create/modify, types to add/change, methods, fields, and implementation steps.
2. **Ticket** (if one maps to this plan) — extract the acceptance criteria and scope boundaries.
3. **Spec** (if one maps to this plan) — extract the requirement, solution, and seams.
4. **ADRs** — read `.grimoire/adr/*.md`. The plan must comply; note any ADR the plan references.

Completion: Plan change list extracted as a structured checklist. Ticket and spec loaded if available. Referenced ADRs noted.

---

## 3. Survey code

For every file the plan references (create or modify):

- Read the actual file on disk.
- If a planned new file does not exist, mark it as a **gap** immediately.
- For existing files, locate the specific types, methods, and fields the plan describes.

Also scan for files not in the plan that appear related — same module, same feature area. These feed the **extra** classification.

Completion: Every planned file is checked for existence. Every planned type/method/field is located or confirmed missing.

---

## 4. Classify

Compare each planned item against the actual code. Assign one classification per item.

See: [references/check-patterns.md](./references/check-patterns.md)

Quick reference:

| Classification | Definition                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **match**      | Code exists and matches the plan's design intent. Exact text match not required; behavior match is sufficient.                       |
| **gap**        | Planned but not found. File missing, type not created, method not added, logic not present.                                          |
| **deviation**  | Code exists but differs materially from the plan: different type boundary, different responsibility split, different algorithm.      |
| **extra**      | Code found that relates to this feature but was not in the plan. Could be harmless (utility extraction) or suspicious (scope creep). |

Rules:

- One classification per planned item.
- A deviation must explain what differs and whether the difference is defensible.
- An extra must note whether it belongs to this feature or is unrelated noise.
- When uncertain between gap and deviation: if any code addresses the intent, it's a deviation; if nothing does, it's a gap.

Completion: Every planned item has a classification. Every gap/deviation/extra has a concrete description.

---

## 5. Cross-check ticket and spec

If a ticket exists, check: do the implemented changes satisfy the ticket's acceptance criteria? Note each criterion as satisfied, partially satisfied, or unsatisfied.

If a spec exists, check: do the implemented changes satisfy the spec's requirement? Note seams that match, seams missing, and spec-level deviations.

Rules:

- Ticket/spec alignment is secondary. The plan is the primary check.
- Do not re-evaluate items already classified in step 4. Reference them by their classification.
- If no ticket or spec exists, skip this step.

Completion: Each ticket acceptance criterion is assessed. Each spec seam is assessed. No re-classification of plan items.

---

## 6. Report

Deliver a structured report with four sections:

**Summary**: One sentence on overall status. Count of matches, gaps, deviations, extras.

**Plan coverage**: Per-file breakdown. Each planned item with its classification. Gaps and deviations include the specific location and what's missing/different.

**Ticket alignment** (if ticket exists): Per-criterion status.

**Spec alignment** (if spec exists): Per-seam status.

Rules:

- Gaps are blocking — the plan is not fully implemented.
- Deviations require judgment — flag as blocking if the difference changes behavior or architecture; note as advisory if it's a defensible alternative.
- Extras are advisory — flag only if they indicate scope creep or unplanned complexity.

Completion: Report delivered with all four sections. Every gap has a location. Every deviation has a rationale assessment.

---

## 7. Update artifact statuses

Based on the classifications from steps 4 and 5, determine the correct status for each loaded artifact and write the update back to the file.

### Ticket status

Compare acceptance criteria against code reality:

- All criteria satisfied → `Done`
- Some criteria satisfied, some not → `In Progress`
- No criteria satisfied → leave as `Todo` (or unchanged if already Todo)

Update the `**Status:**` field in the ticket file.

### Spec status

Compare spec seams against code reality:

- All seams match → `Implemented`
- Some seams match, some gaps or deviations → `In Progress`
- No seams implemented → leave as `Draft` (or unchanged if already Draft)

Update the `**Status:**` field in the spec file.

### ADR status

For each ADR referenced by the plan or spec, check whether the decision is realized in code:

- Decision fully realized → `Completed`
- Decision partially realized → `Implementing`
- Decision not yet acted on → `Proposed`

Update the `**Status:**` field in the ADR file.

Rules:

- Only update status if it differs from the current value. Do not rewrite unchanged files.
- If an artifact was not loaded (no ticket, no spec, no referenced ADRs), skip that artifact type.
- Status transitions are based on code evidence, not speculation. If uncertain, do not update.
- Write the updated file content back with `write` or `edit`. Preserve all other content.

See: [references/status-transitions.md](./references/status-transitions.md)

Completion: Every loaded artifact has its status field updated to reflect implementation reality. Unchanged files are not rewritten.

---

# Rules

- No plan, no check. Stop at step 1 if no plan is resolved.
- The plan is ground truth. Ticket and spec inform context, not the primary comparison.
- Read code, don't assume. Every classification is based on actual file contents.
- One classification per item. Do not merge unrelated findings.
- Report findings and update artifact statuses. Do not fix gaps, rewrite deviations, or remove extras.

---

# References

- [check-patterns.md](./references/check-patterns.md) — detailed classification patterns with concrete examples
- [status-transitions.md](./references/status-transitions.md) — artifact status determination rules and write procedures
