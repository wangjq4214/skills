---
name: grimoire-check
description: Audit implementation against user intent, acceptance criteria, relevant artifacts, and executable evidence.
---

# Purpose

Audit whether implementation satisfies user intent, acceptance criteria, and applicable constraints. Use plans as design guidance and code/tests as evidence. Report gaps, defensible deviations, extras, uncertainty, and artifact status changes.

# Scope

This skill reads relevant artifacts and implementation evidence, reports findings, and updates status fields when justified. It fixes code only when the user also requested implementation.

# Leading words

- **match** — required behavior is evidenced
- **gap** — required behavior lacks implementation evidence
- **deviation** — implementation differs from design guidance
- **extra** — related behavior exceeds stated scope
- **needs-verification** — available evidence is insufficient
# Input hierarchy

User intent and acceptance criteria are the primary truth. Plans describe an intended route; code and tests provide implementation evidence. Tickets, specs, ADRs, and conversation context refine the comparison.

# Workflow

## 1. Resolve comparison source

Accept a plan, ticket, spec, acceptance criteria, or clear conversation goal. Intent is reliable enough when the expected outcome and scope boundary have one plausible interpretation and material constraints are known. If competing interpretations could change the verdict, ask a targeted question; otherwise state assumptions and derive a behavior checklist.

Completion: A concrete behavior-and-constraint checklist exists, with ambiguities resolved or explicitly bounded.

---

## 2. Load relevant artifacts

Read the comparison source, linked artifacts, applicable ADRs, and referenced implementation areas. Scan related metadata first and expand only relevant context.

Completion: Intended outcomes, constraints, and optional implementation guidance are separated.

---

## 3. Survey code and evidence

Inspect actual files, tests, configuration, and generated/runtime evidence relevant to each checklist item. Scan nearby feature areas for related unplanned changes. Do not infer implementation from filenames alone.

Completion: Each intended outcome has direct code or execution evidence.

---

## 4. Classify

Classify each outcome or material plan item as:

- **match** — behavior and intent are satisfied.
- **gap** — required behavior has no implementation evidence.
- **deviation** — behavior or structure differs from guidance.
- **extra** — related behavior exists beyond the stated scope.
- **needs-verification** — evidence is insufficient to distinguish the above.

A deviation is blocking only when it violates user intent, acceptance criteria, an applicable constraint, or creates concrete risk. A defensible implementation that differs from incidental plan details is acceptable and should be explained.

Completion: Every classification cites evidence and distinguishes requirements from optional design guidance.

---

## 5. Cross-check intent

Assess ticket acceptance criteria and spec requirements directly. When they conflict with a plan, surface the conflict and prioritize explicit user intent plus the latest approved artifact. Do not count the same issue twice.

Completion: Requirement alignment and artifact conflicts are visible.

---

## 6. Report

Report summary counts, behavior coverage, material plan deviations, extras, needs-verification items, and artifact conflicts. Mark blockers only with concrete impact or unmet criteria. Include confidence where evidence is incomplete.

Completion: The report explains whether the implementation satisfies its intended outcomes, not merely whether it followed a script.

---

## 7. Update artifact statuses

Update status fields only when code or execution evidence supports the transition. Do not change status for needs-verification items. Preserve all non-status content and report every mutation.

Completion: Loaded artifact statuses reflect verified implementation reality.

---

# Rules

- No formal plan is required when intent can be derived reliably from another source.
- User intent and acceptance criteria outrank incidental plan details.
- Read code and executable evidence; do not assume.
- Separate unmet behavior from defensible design variation.
- Report and update statuses; fix code only when the user also requested implementation.
---

# References

- [check-patterns.md](./references/check-patterns.md) — detailed classification patterns with concrete examples
- [status-transitions.md](./references/status-transitions.md) — artifact status determination rules and write procedures
