# Pre-refactoring Guide

Enabling work is foundation, migration, tooling, or shared-contract work separated from a value slice because that boundary improves delivery.

Use this guide only when SKILL.md identifies a possible enabling ticket.

---

## Identification

Create a separate enabling ticket when all are true:

1. Multiple tickets genuinely consume it, or it has an independent rollout/lifecycle.
2. It can be verified with concrete acceptance criteria.
3. Keeping it in the first consumer would cause duplication, unsafe sequencing, or an invalid intermediate state.
4. The boundary reduces coordination more than it adds.

Otherwise put the work in the first ticket that needs it.

## Examples

Valid enabling work may include a reusable protocol contract, migration with rollback, shared authentication primitive, toolchain capability, or test harness consumed by several outcomes.

A helper used once, cosmetic cleanup, speculative framework, or broad “prepare architecture” effort is not an enabling ticket.

## Dependencies

An enabling ticket blocks only its real consumers. Other tickets remain independent. If consumers can develop against an agreed contract or temporary adapter, record coordination rather than forcing serialization.

## Acceptance

Use direct evidence: contract tests, migration dry-run/rollback, successful build capability, fixture behavior, or another independently executable check. “Later tickets work” is supporting evidence, not the sole acceptance criterion.

## Warning signs

- The enabling ticket becomes a dumping ground for shared concerns.
- It blocks every ticket by convention rather than evidence.
- It has no independently observable or executable result.
- Splitting it delays value while reducing no real risk.
- Several tiny enabling tickets create more coordination than they remove.
