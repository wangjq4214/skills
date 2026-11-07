---
name: grimoire-check
description: Use when asked whether an implementation satisfies user intent, the original request, a spec, ticket, or acceptance criteria, including missing requirements despite passing tests or work beyond the requested scope. For code defects, security, compatibility, or performance risks, use grimoire-review.
---

Compare implementation with user intent and acceptance criteria, not literal adherence to a plan. Plans are design guidance; code and relevant execution evidence establish behavior. Tickets, specs, and applicable ADRs refine constraints.

Under orchestration, the caller's execution contract takes precedence over this skill's standalone defaults.

Standalone, remain read-only: report findings without changing Spec, Ticket, or other artifact statuses. Update statuses only with explicit user authorization or permission from the caller's execution contract; evidence alone is not write permission. Fix code only when implementation is also authorized.

## Compare outcomes

Accept a plan, ticket, spec, acceptance criteria, or clear conversation goal; no formal plan is required. Derive the behavior-and-constraint checklist from original requirements before comparing implementation summaries or tests, so their omissions do not define the audit scope. Retain a source reference for each scoped outcome, including required error paths and constraints. If original sources are unavailable, disclose the limit rather than treating a summary as exhaustive. Ask only when competing interpretations would change the verdict; otherwise bound assumptions.

Read source artifacts, applicable ADRs, actual implementation, relevant tests/configuration, and available runtime evidence. Separate intent from optional design choices. Inspect related changes for scope expansion; do not infer behavior from filenames.

Each outcome must have evidence or an explicit evidence gap:
- **match** — evidence establishes required behavior and constraints.
- **gap** — evidence demonstrates required behavior or a binding contract is missing or unmet.
- **deviation** — implementation materially differs from design guidance; acceptable when requirements and constraints still hold.
- **extra** — related behavior exceeds the authorized scope, not merely an omitted plan detail.
- **needs-verification** — evidence is insufficient to establish satisfaction or violation. Absence of evidence is not evidence of missing behavior.

A blocking finding requires demonstrated incorrect behavior, concrete risk, or a violated requirement/constraint. Missing runtime access or a failing command alone is not proof of a product defect. A defensible design variation does not become blocking because it differs from a planned filename, class, or algorithm. For examples, read [check-patterns.md](./references/check-patterns.md).

Cross-check each scoped source requirement against the checklist and criterion-specific evidence, including outcomes no test mentions. Green tests establish only what their assertions cover, not complete acceptance. Do not make missing tests a new acceptance condition unless the source requires them. For uncovered outcomes, inspect the implementation and collaborators: demonstrated missing behavior is a gap; insufficient evidence is needs-verification. Surface artifact conflicts; prioritize explicit user intent and the latest approved artifact, not a plan's incidental details. Do not count the same issue twice.

## Report and status

When reporting is enabled, return criterion-to-evidence results, summary counts, material deviations/extras, blockers, uncertainty, and coverage gaps. Include source snapshot and commands/results where relevant. Complete the audit when all scoped outcomes are classified or explicitly unverified; audit completion does not imply acceptance.

Before proposing or writing artifact statuses, read [status-transitions.md](./references/status-transitions.md). Change only authorized status fields supported by evidence; preserve non-status content and report every mutation. Do not update an artifact whose transition evidence is insufficient; the explicit ADR Testing transition records pending verification, not acceptance. A local result cannot establish global completion.

For quantitative simplification, refactoring, or batch assignments, read [batch-context.md](./references/batch-context.md) for criterion-specific measurements and integrated-tree evidence.
