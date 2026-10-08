---
name: grimoire-implement
description: Use when asked to add or change code to deliver a feature, satisfy a ticket or spec, apply an implementation plan, or make an already-understood fix. A clear conversation request is sufficient; a saved plan is not required.
---

Implement the authorized behavior from the original source and available plan context; a persisted plan is not required.
Standalone, do not start `grimoire-loop`; it requires explicit user invocation.

Under orchestration, the caller's execution contract governs scope, writes, verification, checkpoints, reporting, and completion. Apply only enabled responsibilities; disabled verification stays omitted, not passed. The practices below are standalone defaults, not permission to restore excluded stages.

## Source and scope

Resolve intended outcomes, constraints, and acceptance criteria from the supplied conversation, ticket, spec, or plan. User intent outranks incidental plan details. Ask when ambiguity would materially change scope, safety, or an irreversible decision; otherwise state bounded assumptions.

Inspect relevant implementation and consumers. Plans predict files and types, not immutable boundaries. When repository evidence invalidates the approach, make authorized adaptations and return material deviations to the coordinator; ask before changing approved scope or irreversible decisions.

## Change boundaries

Implement coherent units, allowing coupled files to change atomically. Include adjacent cleanup only when necessary for correctness, removing duplication introduced by the change, or materially reducing its risk. Avoid unrelated formatting and opportunistic rewrites.

An abstraction may be justified by current boundary value—test substitution, dependency inversion, external isolation, invariant enforcement—even with one implementation. Do not add interfaces solely for predicted future variation. For consequential ownership or boundary tradeoffs, consult [principles.md](./references/principles.md); these are heuristics, not syntax rules.

## Evidence and handoff

When verification is enabled, select checks for requested behavior and changed risks: public API/schema compatibility, dependency direction, ownership, error paths, and integration as applicable. Verify coherent units, not uncompilable intermediate types. Reuse evidence only when its source and relevant dependencies/environment remain applicable.

Return the complete authorized diff including new files, material deviations, executed checks/results, and remaining limitations when reporting is enabled. Separate product failures from baseline failures and unavailable tooling.

Complete when the authorized behavior exists and enabled verification has results or explicit evidence gaps. Unavailable or disabled checks cannot establish verified success; do not silently run them to satisfy this completion condition.
