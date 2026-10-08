---
name: grimoire-loop
description: Use when explicitly invoked to coordinate implementation and quality checks, including custom stage order, omitted stages, or human checkpoints. Not for a plain request to write code.
disable-model-invocation: true
---

Coordinate scope, permissions, evidence, and handoffs; specialists own their methods.
Run this workflow only on explicit user invocation, not automatically from a specialist or a general implementation request.

Choose the smallest useful route before applying defaults. For clear, bounded, reversible work with no recovery, handoff, or reusable planning need, default to **implement → targeted verification → report**. Do not invoke plan or create a Plan file, plan directory, or viewer merely because loop was selected. Explicitly requested planning or artifacts still apply.

When sequencing, recovery, coordination, or consequential approach decisions make a plan useful, default to **plan → implement → test → review + check → assess → affected fixes/checks → final integrated verification → format → report**. Planning and execution remain independently composable; risk determines check depth, not a compulsory document.

## Resolve the execution contract

Before dispatching, derive target/scope, stages/order, write permissions, automated/human ownership, required evidence, checkpoints, and fix/repetition limits from the request. Natural language suffices. Later instructions revise remaining work.

- Every stage/substage can be enabled, disabled, reordered, or assigned to a human; planning and persistence, test design/authoring/execution (including E2E), assessment, fixes, repetition, final verification, formatting, and reporting are independently selectable. Users may add stages/checkpoints.
- Apply defaults only to unspecified choices. “Only review” excludes other work stages. Disabling a parent stage disables its substages unless explicitly retained; exclusions never grant other write permissions.
- Do not restore a disabled stage through a specialist's defaults, risk recommendation, automatic fix, or renamed check. This applies inline and to delegates. Omitted work is not passed and cannot establish acceptance; report incompatible evidence requirements or ask about the specific conflict.
- Accept conversation, plan, ticket, spec, slice ticket set, or diff. Read ticket-set relationships and dependencies; inspect complete diffs including untracked files. Missing optional artifacts are not prerequisites. Ask only about unresolved target, authority, or consequential conflicts.

Keep the contract and source context across stages, in conversation when persistence is disabled. Surface material departures from defaults when reporting is enabled. Higher-priority safety and authority constraints still apply.

## Route enabled work

Load each selected skill before its work, inline or delegated; a separate agent/report is not required. Disclose unavailable skills and fallbacks. Assign added stages an owner, scope, and completion evidence.

| Responsibility | Skill |
| --- | --- |
| Implementation approach and revisions | `grimoire-plan` |
| Production changes and authorized fixes | `grimoire-implement` |
| Test design, authoring, execution, diagnosis | `grimoire-test` |
| Code risks and regressions | `grimoire-review` |
| Intent, acceptance, artifact alignment | `grimoire-check` |

- **Plan (when selected):** reuse/revise adequate plans. Persist before production edits by default only on this route; persistence needs only the plan directory, not init or registration/Git changes. If persistence is disabled, pass the approach in conversation; if planning is disabled, use the original source. Report required saves that fail. Material approach changes revise enabled planning context, never erase acceptance criteria.
- **Handoff:** pass source intent/criteria, available plan context, contract, assigned scope, risk, write permissions, complete change context, and prior evidence. Capture resulting diffs and evidence. For delegated QA, read [agent-prompts.md](./references/agent-prompts.md).
- **Depth:** local reversible work usually needs focused inline checks; implement may perform targeted verification without a separate QA stage or report. Select test/review/check when their responsibility adds needed coverage. Integration, security, migration, concurrency, API, or architectural changes need deeper enabled checks. Risk does not authorize delegation or excluded work. Delegate only when authorized and useful for coverage/context; coordinate writes and sequence dependent checks.

## Evidence, fixes, and finalization

Each enabled gate returns results or explicit evidence gaps. Deduplicate findings into confirmed blocking, advisory, praise, or **needs-verification**. Blocking requires demonstrated incorrect behavior, security exposure, data loss, regression, violated criteria, or concrete architectural breakage. A failed command alone does not prove a product defect: distinguish baseline failures, missing prerequisites, and change-induced failures. Resolve uncertainty only with authorized checks; otherwise retain it. A prerequisite can block execution without proving a code defect.

Fix only with both fix and corresponding write permission. Adjacent advisory fixes must be low-risk, related, and in scope; clarify requirement/scope changes instead of redefining acceptance. Repeat only while authorized, making progress, safe, and in scope; honor single-pass/user limits. Stop with a reason on nonconvergence, missing authority/information, or exhausted scope.

Reuse evidence only while source, dependencies, and environment remain applicable. After any writes—including test authoring, fixes, integration, or formatting—refresh affected enabled checks over the combined result or disclose uncertainty. Do not rerun unaffected checks or silently enable excluded ones.

Run final integrated verification only within its enabled scope. Format after behavioral work stabilizes, only when enabled and writes are authorized; verification-only formatting uses non-writing checks. Consult [format-detection.md](./references/format-detection.md) when tooling/scope is unclear.

## Human checkpoints

Honor user-specified checkpoints. Select discretionary checkpoints only when the user authorizes that judgment; record each concrete risk, uncertainty, reversibility, or human-evidence reason before reaching it, revising as evidence changes. Otherwise add no routine approvals. Necessary blockers—missing authority, material ambiguity, required human evidence, or unresolved unsafe/irreversible decisions—still pause automatic execution. Checkpoints never expand permissions.

1. Prepare only up to the checkpoint. Present the artifact/build/version, requested action/decision, expected feedback/evidence, and paused work.
2. Set **waiting for user** and end the turn. Do not substitute automated approval, mark the checkpoint passed, launch downstream work, poll, or continue. Independent work during a pause requires explicit user permission.
3. Bind feedback to the checkpoint and current code/artifact version. Record satisfaction, requested changes, or contract revisions. Resume only released work; partial or ambiguous feedback leaves unresolved checkpoint work paused. Invalidate affected evidence if files changed while waiting.

## Completion and report

End when authorized work is complete or a concrete stopping reason exists. When reporting is enabled, summarize the selected route and why planning was useful or omitted, plan path/context if any, completed/omitted stages, evidence, findings, and remaining work:
- **clean**: enabled work complete, selected gates establish the result with no confirmed blockers, and all required evidence is available—not acceptance of disabled checks.
- **blocked**: unmet prerequisite; **issues remaining**: unresolved findings; **unverified**: work done but no quality gates establish a clean result.
- **waiting for user**: paused, not final completion.

Never claim overall acceptance without required evidence. If reporting is disabled, omit routine summaries, not necessary questions, checkpoints, or blockers.

For composition or resumption edge cases, consult [composition-examples.md](./references/composition-examples.md); these are walkthroughs, not runtime verification.
