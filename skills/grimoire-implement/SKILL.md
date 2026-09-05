---
name: grimoire-implement
description: Implement code from a plan, ticket, spec, or sufficiently clear conversation using proportionate design and verification.
---

# Purpose

Implement production code from the best available source of intent. Preserve useful architecture while adapting the approach to repository evidence.

# Scope

This skill writes code to the repository. A formal plan is optional: a clear conversation, ticket, or spec can be sufficient for bounded work.

Completion: Requested behavior is implemented and verified at an appropriate scope, with assumptions and material deviations reported.

---

# Workflow

## 1. Resolve implementation source

Use the richest available source: plan, ticket, spec, or conversation. Stop only when a material ambiguity could cause irreversible, unsafe, or substantially different work. Otherwise state reasonable assumptions and proceed.

Extract intended outcomes, constraints, likely affected areas, and verification expectations. Treat predicted files and types as hypotheses that repository exploration may revise.

Completion: The objective is actionable and material assumptions are explicit.

---

## 2. Survey relevant code

Read the files likely to change and enough neighboring code to understand patterns, ownership, error handling, and available language features. Search for reusable behavior before introducing new helpers, but do not force reuse when it creates coupling or obscures intent.

Completion: Relevant implementation patterns and constraints are understood.

---

## 3. Choose structure

Apply [references/principles.md](./references/principles.md) as heuristics, not universal laws. For each material boundary, consider lifecycle, ownership, responsibility, state validity, dependencies, and public contract.

An abstraction is justified when it provides current boundary value: stable protocol, dependency inversion, test substitution, plugin surface, invariant enforcement, or meaningful complexity hiding. Multiple implementations are evidence, not a prerequisite.

Record design reasoning only for non-obvious or high-impact boundaries. Small local changes do not require a type-by-type design dossier.

Completion: The chosen structure is proportionate and material tradeoffs are understood.

---

## 4. Implement coherently

Implement in the smallest coherent units that can be reviewed and verified. Coupled files or types may change atomically. Prefer focused changes, while allowing adjacent cleanup when it is necessary for correctness, removes duplication introduced by the change, or materially reduces risk.

Follow current project conventions unless they are the source of the problem. Avoid unrelated formatting and opportunistic rewrites.

Completion: Requested behavior is implemented without avoidable scope expansion.

---

## 5. Verify

Run checks appropriate to the change: compile/type-check, targeted tests, integration tests, linting, or focused manual validation. At minimum:

- verify the requested behavior or acceptance criteria;
- inspect public API/schema compatibility when those surfaces changed;
- inspect dependency direction, ownership, and error paths when architectural boundaries changed.

Verify after coherent units rather than every type when intermediate states cannot compile. If repository evidence requires a material departure from a plan, implement the safer solution and report the deviation; ask first only when it changes approved scope or an irreversible decision.

Completion: Selected checks have recorded results, every changed high-risk surface has a corresponding check, and remaining failures are reported with evidence.

---

# Rules

- A clear ticket, spec, or conversation can authorize implementation; do not require ceremony for its own sake.
- Prefer surgical scope, but include necessary adjacent changes and explain them.
- Treat architectural principles as decision aids with explicit exceptions, not absolute syntax rules.
- Optimize for coherent, verifiable behavior rather than artificial type-by-type sequencing.
- Repository evidence may revise the plan; user intent and acceptance criteria outrank incidental plan details.
