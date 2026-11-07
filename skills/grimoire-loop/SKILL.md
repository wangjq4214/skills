---
name: grimoire-loop
description: Use when explicitly invoked to coordinate implementation and quality checks, including custom stage order, omitted stages, or human checkpoints. Not for a plain request to write code.
disable-model-invocation: true
---

Coordinate the selected work; specialists own their methods. Run this workflow only on explicit user invocation, not automatically from a specialist or a general implementation request.

## 1. Choose the execution path

Choose the smallest useful path; these are defaults, not mandatory stage bundles.

- **Direct:** for clear, bounded, reversible work with no recovery, handoff, or reusable planning need, default to **implement → targeted verification → report**. Do not invoke plan or create a Plan file, plan directory, or viewer merely because loop was selected. Explicitly requested planning or artifacts still apply.
- **Structured:** when sequencing or consequential approach decisions make a plan useful, default to **plan → implement → test → review + check → assess → affected fixes/checks → final integrated verification → format → report**. Risk determines check depth, not a compulsory document.
- **Orchestrated:** when human checkpoints, delegated/parallel handoffs, or recovery across sessions need coordination, adapt Direct or Structured to that need. Coordination alone does not require a plan, subagents, or all references; load only the relevant branch below.

## 2. Establish the execution contract

Use the request to determine scope, enabled stages/order, write permissions, human gates, and required evidence. Record special ownership or fix/repetition limits only when relevant. Natural language and conversation context suffice; no contract artifact is required. Later instructions revise remaining work.

- Every stage/substage is independently selectable, reorderable, or human-owned—including planning/persistence, test design/authoring/execution, assessment, fixes, repetition, final verification, formatting, and reporting. Users may add stages/checkpoints.
- Apply defaults only to unspecified choices. “Only review” excludes other work stages. Disabling a parent stage disables its substages unless explicitly retained; exclusions never grant other write permissions.
- Do not restore a disabled stage through a specialist's defaults, risk recommendation, automatic fix, or renamed check. This applies inline and to delegates. Omitted work is not passed; surface conflicting evidence requirements rather than bypass exclusions.
- All work stays within scope and authority. Fixes require both fix and corresponding write permission; honor single-pass/user limits. Risk does not authorize delegation or excluded work. Higher-priority safety and authority constraints still apply.
- Honor required human gates: stop before gated work, set **waiting for user**, and end the turn. Automated success is not human approval; checkpoints never expand permissions. Add discretionary checkpoints only when authorized. Missing authority, material ambiguity, required human evidence, or unresolved unsafe/irreversible decisions still require a pause.

Accept conversation, plan, ticket, spec, slice ticket set, or diff; optional artifacts are not prerequisites. Read ticket dependencies and complete diffs including untracked files when relevant. Keep source intent and the contract across stages; ask only about unresolved target, authority, or consequential conflicts.

## 3. Execute selected stages

Load each selected skill before its work, inline or delegated. A separate agent or report is not required. Disclose unavailable skills and fallbacks; assign added stages an owner, scope, and completion evidence.

| Responsibility | Skill |
| --- | --- |
| Implementation approach and revisions | `grimoire-plan` |
| Production changes and authorized fixes | `grimoire-implement` |
| Test design, authoring, execution, diagnosis | `grimoire-test` |
| Code risks and regressions | `grimoire-review` |
| Intent, acceptance, artifact alignment | `grimoire-check` |

For selected planning, reuse/revise adequate plans. Persist before production edits by default only on this route; create only the plan directory, not init, registration, or Git changes. If persistence is disabled, pass the approach in conversation; if planning is disabled, use the original source. Report required saves that fail; plan revisions must preserve acceptance criteria.

For local reversible work, implement may perform targeted verification without a separate QA stage or report. Select deeper enabled checks for integration, security, migration, concurrency, API, or architectural risks. Run final integrated verification only within its enabled scope. Format only after behavioral work stabilizes, when enabled and writes are authorized; verification-only formatting uses non-writing checks.

### Joint review + check

When both responsibilities are enabled for the same change and the contract permits grouping, default to one inline pass with both skills loaded. Read the complete diff and original task/sources once; share relevant code, tests, and execution evidence for that snapshot. Reuse actual source evidence, not just the implementer's summary; inspect additional consumers or requirements as either axis demands.

Keep two assessments distinct:
- **Code Risk — grimoire-review:** correctness, security, compatibility, performance, and other relevant regression risks.
- **Intent Check — grimoire-check:** source-derived outcomes and constraints, including missing behavior and unauthorized extras even when tests pass.

When reporting is enabled, return one consolidated result: deduplicate findings by root cause, retain both axis labels where applicable, and preserve criterion-to-evidence coverage and each axis's unresolved gaps. Count a shared blocker once. Assess acceptance once against the required evidence from both axes; no code findings does not establish intent satisfaction, and matched requirements do not establish code safety.

Do not create two agents merely because two skills are selected. Use authorized parallel reviewers only when context size, risk, or the value of independent scrutiny justifies it. Share the same source snapshot and prior evidence, not predetermined verdicts; independent reviewers may reread sources. Keep separate stages when required by order or human gates, and never enable an excluded axis through this path.

Read references only for the selected situation:
- **Human checkpoint preparation or resumption:** [checkpoints.md](./references/checkpoints.md), before reaching or releasing the gate.
- **Delegation, parallel work, or cross-session handoff:** [handoffs.md](./references/handoffs.md), before dispatch or resumption; it links QA assignment templates.
- **Failed checks, repair cycles, or interrupted execution:** [recovery.md](./references/recovery.md), before classifying failures or retrying.
- **Unclear formatting tooling/scope:** [format-detection.md](./references/format-detection.md), before choosing a command.

## 4. Determine completion

Each enabled gate returns results or explicit evidence gaps. Separate confirmed blockers, advisory findings, praise, and **needs-verification**. Blocking findings require demonstrated incorrect behavior, security exposure, data loss, regression, violated criteria, or concrete architectural breakage. A failed command alone does not prove a product defect: distinguish baseline failures, missing prerequisites, and change-induced failures.

Reuse evidence only while source, dependencies, and environment remain applicable. After any writes—including tests, fixes, integration, or formatting—refresh affected enabled checks over the combined result or disclose uncertainty. Do not rerun unaffected checks or silently enable excluded ones.

End when authorized work is complete or a concrete stopping reason exists. When reporting is enabled, briefly give the chosen path and why planning was used or omitted, plan path/context if any, completed/omitted stages, evidence, findings, and remaining work/risks:
- **clean:** enabled work complete, selected gates establish the result with no confirmed blockers, and all required evidence is available—not acceptance of disabled checks.
- **blocked:** unmet prerequisite; **issues remaining:** unresolved findings; **unverified:** work done but no quality gates establish a clean result.
- **waiting for user:** paused, not final completion.

Never claim overall acceptance without required evidence. If reporting is disabled, omit routine summaries, not necessary questions, checkpoints, or blockers.

For unusual stage combinations, consult [composition-examples.md](./references/composition-examples.md); these walkthroughs are not runtime verification.
