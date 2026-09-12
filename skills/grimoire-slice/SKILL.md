---
name: grimoire-slice
description: Decompose a requirement into coherent, independently valuable or enabling tickets with explicit dependencies.
disable-model-invocation: true
---

# Purpose

Convert a requirement into a ticket set sized for reliable implementation. Prefer vertical value slices, but allow enabling, migration, component, or operational slices when those better match the work.

# Scope

This skill writes `.grimoire/ticket/NNNN-title/` relationship and ticket files. It does not implement code or invent missing requirements.

`grimoire-plan` and `grimoire-loop` are possible follow-up workflows, not dependencies to preload. Complete the ticket set first; recommend a next step by name, or hand off when further work is already authorized.

When coordinated by `grimoire-refine`, apply the knowledge boundary and selected endpoint supplied in its coordination contract instead of standalone decision and handoff permissions. If that contract is missing, pause and request it from the coordinator; do not guess its installation path. Return knowledge gaps and stage results to the coordinator.

Completion: Every requirement is assigned to a coherent ticket, dependencies reflect real execution constraints, and each ticket has observable acceptance criteria.

---

# Workflow

## 1. Resolve input

Default to an existing, relevant spec as the requirement contract. Use conversation requirements directly when they already make outcomes, constraints, and acceptance clear; do not create a spec merely to satisfy an input dependency. Preserve multiple independent outcomes and derive a folder name.

Reading an existing spec is reading input, not invoking grimoire-spec. Resolve bounded questions from the source and repository; substantial unresolved scope or solution decisions may warrant grimoire-refine, while a needed formal contract belongs to grimoire-spec. Use those skills by name only when that work is actually needed and authorized, not as routine prerequisites. Slice may summarize its source in the ticket README, but does not generate a separate spec using its own method.

Carry source paths or a concise conversation contract into the ticket set so downstream plan, implement, and check can trace acceptance to intent.

Completion: Input, material requirement decisions, and target folder are known; missing contracts are routed rather than invented.

---

## 2. Load relevant constraints

Read the requirement source, relevant domain context, applicable ADRs, and repository areas involved. Scan metadata before expanding unrelated ADRs or modules.

Completion: Material constraints and integration surfaces are understood.

---

## 3. Map delivery surfaces

Identify the architectural surfaces touched by the overall requirement using project terminology. This is a map, not a checklist that every ticket must satisfy.

For each prospective ticket, include only the surfaces it actually changes. A ticket may be vertical, enabling, migration-focused, component-focused, documentation-focused, or operational when that shape provides the clearest independently verifiable progress.

Completion: Required surfaces are covered across the ticket set, with intentional omissions explained where useful.

---

## 4. Identify enabling work

Separate enabling work only when it is independently verifiable or truly blocks multiple outcomes. Prefer placing setup or refactoring inside the first slice that needs it. Avoid global pre-refactoring tickets that merely make later work aesthetically cleaner.

Completion: Enabling tickets have concrete acceptance criteria and only real dependents.

---

## 5. Decompose

Create tickets around coherent outcomes. A ticket may contain several tightly coupled observable behaviors when splitting them would create artificial coordination or incomplete states.

Prefer sizes that fit one implementation context, but treat this as a planning signal rather than a hard limit. Split large work by value, risk, lifecycle, or independently testable contract—not mechanically by architectural layer.

Completion: All requirements are covered without artificial cross-layer boilerplate.

---

## 6. Map dependencies

Add a blocking edge only when the consumer cannot be implemented or verified before the producer. Shared files indicate possible merge conflict, not semantic dependency. Shared contracts may be coordinated through an agreed interface without forcing serial implementation.

Classify pairs as blocking, parallel with coordination, or independent. If a cycle appears, revisit boundaries; merge tickets only when that produces a more coherent unit.

Completion: Every blocking edge has a concrete reason and the graph supports a practical execution strategy.

---

## 7. Present decomposition

Show ticket outcomes, relevant surfaces, dependencies, coordination risks, and recommended order. Invite adjustments to naming, grouping, boundaries, and dependencies. Require confirmation only before writing when decomposition materially commits scope or sequencing; otherwise write a reversible draft and invite edits.

Completion: The decomposition is approved or safe to record as a draft.

---

## 8. Generate ticket folder

Create `README.md` plus `TNNNN-title.md` files. Use the reference templates as defaults.

Each ticket should contain:

1. **Goal** — coherent outcome or enabling capability.
2. **Surfaces** — only affected layers/modules, with important boundaries.
3. **Approach** — enough direction without freezing incidental implementation detail.
4. **Dependencies and coordination** — proven blockers and merge/contract risks.
5. **Acceptance** — observable, testable criteria.
6. **Out of Scope** — meaningful exclusions only.

Completion: Every requirement maps to a ticket and every ticket is actionable.

---

## 9. Validate

Check requirement coverage, coherent ticket boundaries, dependency evidence, feasible size, applicable ADR alignment, and testable acceptance. Fix inconsistencies and revalidate.

Completion: The ticket set is complete without forcing every ticket through every architectural layer.

---

# Rules

- Prefer vertical slices, but choose the decomposition shape that best preserves coherent value and safe delivery.
- Shared files are coordination risks, not automatic blockers.
- Enabling work precedes only the tickets it truly blocks.
- Multiple tightly coupled outcomes may stay together when splitting harms coherence.
- Cover all necessary architectural surfaces across the ticket set, not mechanically in every ticket.
- Treat ADR conflicts as decisions to surface, not text to hide in Out of Scope.
