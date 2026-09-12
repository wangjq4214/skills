---
name: grimoire-plan
description: Generate a risk-scaled, revisable implementation plan from a ticket, spec, or conversation.
disable-model-invocation: true
---

# Purpose

Create a temporary implementation hypothesis with enough design, sequencing, risk, and verification detail for the task—without pretending every file or type is known in advance.

# Scope

This skill writes HTML plans to `.grimoire/plans/`. It does not implement production code unless the user separately authorizes execution.

When coordinated by `grimoire-refine`, apply the knowledge boundary and selected endpoint supplied in its coordination contract instead of standalone design, assumption, or execution permissions. If that contract is missing, pause and request it from the coordinator; do not guess its installation path. Return knowledge gaps and stage results to the coordinator.

Completion: A readable plan exists with actionable steps, material design choices, affected areas, risks, and verification appropriate to the task.

---

# Workflow

## 1. Pre-flight

Verify `.grimoire/` exists. If not, stop — tell the user to run grimoire-init first.

Verify `.grimoire/plans/` exists. If not, create it.

Determine the input source:

- If the user provided a ticket path (e.g., `.grimoire/ticket/0001-xxx/T0001-xxx.md`), use that ticket.
- If the user provided a spec path (e.g., `.grimoire/spec/0001-xxx.md`), use that spec.
- If neither, treat the conversation as the input. Derive a short kebab-case title from the user's goal. Do not ask.

Assign the next available sequence number from `.grimoire/plans/`. Naming: `NNNN-title.html` (zero-padded).

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

## 7. Assemble and write

Use [references/html-template.md](./references/html-template.md) as the default presentation. Adapt or omit sections that do not apply, while preserving clear implementation steps, affected areas, risks, and verification.

Write to `.grimoire/plans/NNNN-title.html`, verify valid HTML, and open it for preview when the environment supports doing so without disruption.

Completion: The plan exists, is readable, and contains the information needed for implementation.

---

# Rules

- Keep unrelated goals in separate plans; related atomic changes may share one plan.
- ADRs are constraints with history, not infallible code contracts. Surface conflicts and ask only when authority or irreversibility requires it.
- Plans are revisable hypotheses. Update the implementation approach when repository evidence invalidates an assumption.
- Use the template to aid comprehension, not to force empty sections or decorative diagrams.
- Scale detail to complexity and risk.
