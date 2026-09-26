---
name: grimoire-plan
description: Create or revise a persisted implementation plan for grimoire-loop, or generate a standalone plan on request.
---

# Purpose

Create a temporary implementation hypothesis with enough design, sequencing, risk, and verification detail for the task—without pretending every file or type is known in advance.

# Scope

This skill writes revisable Markdown plans to `.grimoire/plans/` for execution and audit. It is model-invoked so `grimoire-loop` can use it automatically; users may also invoke it to generate a standalone plan. It does not implement production code. Standalone use ends with the saved plan; loop-coordinated use returns the plan to loop without a human approval gate.

Completion: A readable plan exists with actionable steps, material design choices, affected areas, risks, and verification appropriate to the task.

---

# Workflow

## 1. Pre-flight

Verify `.grimoire/` exists. If not, stop — tell the user to run grimoire-init first.

Verify `.grimoire/plans/` exists. If not, create it.

Determine the input source:

- Use the supplied conversation, spec, ticket, or selected slice ticket set and its relationship README. Preserve source paths or a concise conversation contract with intent, acceptance criteria, and constraints.
- When supplied an existing plan, compare it with current intent and repository evidence. Reuse it if adequate; revise the same file for the same goal when needed. Do not treat the plan itself as implementation authorization.
- For a new plan, derive a short kebab-case title from the goal without asking. Assign one more than the highest existing numbered plan (or `0001` if none), ignoring `viewer.html`. Naming: `NNNN-title.md` (zero-padded).

Completion: `.grimoire/plans/` exists. Input source determined. Plan path known.

---
## 2. Load context

Load enough context to make reliable implementation decisions:

1. The input source (ticket, spec, or conversation goal).
2. Relevant domain entries and referenced domain files.
3. ADRs referenced by the input or governing affected modules. Scan ADR metadata first; expand only applicable decisions.
4. Relevant repository files, nearby patterns, and integration surfaces.

Completion: The goal, applicable constraints, and existing implementation patterns are understood.

---

## 3. Analyze design impact

Identify the files, types, functions, schemas, or configuration likely to change. Treat this as a revisable design hypothesis, not an exhaustive contract.

For each material boundary change, record:

- **Action** — create, modify, move, or remove.
- **Responsibility** — behavior or invariant affected.
- **Relationships** — important dependencies or collaborators.
- **Rationale** — why this boundary is appropriate and what alternatives were rejected.

Apply [references/design-principles.md](./references/design-principles.md) as heuristics. Prefer minimal changes, but allow a new abstraction when it creates a stable boundary, enables substitution/testing, or contains real complexity.

Include a Mermaid relationship diagram only when multiple components or non-obvious dependency changes make it useful.

Completion: Material design choices and uncertainties are visible; incidental edits need not be predicted.

---

## 4. Draft implementation steps

Describe concrete implementation steps at the smallest coherent unit of change. Name specific files or symbols when known; otherwise name the discovery point that will resolve them.

Use pseudo-code only for non-trivial logic. State an observable outcome or verification method for each coherent step. Order steps by real dependency, allowing coupled changes to land atomically.

Completion: The plan is actionable without pretending all implementation details are known in advance.

---

## 5. Identify edge cases

List credible edge cases whose omission could cause incorrect behavior, data loss, security exposure, or operational failure. Use [references/edge-case-guide.md](./references/edge-case-guide.md) when needed.

For each, record the condition, expected behavior, and owning step or verification.

Completion: Material edge cases are covered; generic boilerplate is excluded.

---

## 6. Design verification strategy

Match verification to the behavior and risk: unit, integration, end-to-end, static checks, manual validation, or performance measurement. Prefer public contracts, but permit focused internal assertions when they are the clearest regression boundary.

Completion: Every material behavior has an appropriate verification method.

---

## 7. Persist and hand off

Use [references/markdown-template.md](./references/markdown-template.md) as the default plan structure. Adapt or omit sections that do not apply, while preserving source intent, implementation steps, affected areas, risks, and verification.

Write or revise `.grimoire/plans/NNNN-title.md`. Keep Mermaid diagrams in fenced `mermaid` blocks. Record material revisions with the changed approach, reason, and supporting evidence; retain earlier decisions in a concise revision log rather than silently overwriting the audit trail.

Read back the plan and verify that each material acceptance criterion has an owning step or check. Return its path, assumptions, and unresolved blockers to the caller. A saved plan is not a claim that implementation or verification has passed.

Only when the user asks for preview, follow [references/preview.md](./references/preview.md). Otherwise do not prepare the viewer, start a preview server, or open a browser.

Completion: The persisted plan is readable, traceable to intent, actionable, and available to the caller; any material revisions have a recorded rationale.

---

# Rules

- Keep unrelated goals in separate plans; related atomic changes may share one plan.
- ADRs are constraints with history, not infallible code contracts. Surface conflicts and ask only when authority or irreversibility requires it.
- Plans are revisable hypotheses. Update the implementation approach when repository evidence invalidates an assumption.
- Use the template to aid comprehension, not to force empty sections or decorative diagrams.
- Scale detail to complexity and risk.
