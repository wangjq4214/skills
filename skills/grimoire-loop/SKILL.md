---
name: grimoire-loop
description: Compose user-selected implementation and verification stages, using a plan–implement–test–review–check loop by default, with explicit human checkpoints.
disable-model-invocation: true
---

# Purpose

Coordinate a user-configurable execution workflow and its evidence. Loop selects and connects stages; specialist skills own their methods, not the workflow's scope or permissions.

# Leading words

- **execution contract** — the current stage selection, order, permissions, required evidence, checkpoints, and stopping conditions derived from the user's request
- **iteration** — one authorized cycle of change, verification, and assessment
- **clean** — all enabled work is complete, selected quality gates have no confirmed blockers, and required evidence is available; not a claim about disabled checks
- **needs-verification** — a plausible concern requiring evidence before it can block

# Composition policy

Default: **plan → implement → test → review + check → assess → affected fixes/checks → final integrated verification → format → report**. This is a preset, not a mandatory sequence.

Every stage and substage can be enabled, disabled, reordered, or assigned to a human by the user: planning and plan persistence, implementation, test design/authoring/execution (including E2E), review, intent check, assessment, fixes, iteration, final verification, formatting, and reporting. Users may add stages or checkpoints. Apply explicit instructions first and defaults only to unspecified choices; later instructions revise the remaining workflow. An exclusive request such as “only review” disables other work stages rather than filling them from defaults. Disabling a broad stage also disables its substages unless the user explicitly retains one. Turning a stage off does not grant permission for another stage's writes.

The execution contract governs both inline work and delegated specialist work. Do not restore a disabled stage through a specialist's defaults, a risk recommendation, an automatic fix, or a differently named check. Risk scales enabled work and informs recommendations; it does not override an explicit exclusion. Higher-priority safety and authority constraints still apply. Disabled work is omitted, not passed; it cannot establish an acceptance criterion it was meant to verify. If a required outcome cannot be established within the contract, report the limitation or ask about the specific conflict rather than silently enabling work.

## Specialist routing

| Enabled responsibility | Skill to use |
| --- | --- |
| Persisted implementation approach and material revisions | `grimoire-plan` |
| Production changes and authorized fixes | `grimoire-implement` |
| Test strategy, regression tests, and test diagnosis | `grimoire-test` |
| Code-level risks and regressions | `grimoire-review` |
| Alignment with intent, acceptance criteria, and artifacts | `grimoire-check` |

Load each selected skill before doing its work, inline or delegated. Apply its relevant methods within the execution contract; loading does not require a separate agent or report. Disclose an unavailable skill and any fallback. Route added stages to suitable tools or skills with explicit scope and completion evidence.

# Workflow

The sections below describe selectable responsibilities, not an unconditional checklist. Resolve the execution contract before dispatching work, then execute only its enabled stages in the selected order. Select human checkpoints using the policy below.

## 1. Resolve source and execution contract

Accept a plan, ticket, spec, slice ticket set, diff, or clear conversation goal. For ticket sets, read the relationship README and identify authorized tickets and dependencies. For existing changes, start from the complete diff, including untracked files. Ask only when target, authority, or a material workflow conflict cannot be resolved safely.

Identify enabled and disabled stages, order/dependencies, write permissions, automated versus human ownership, required evidence, checkpoints, and whether fixes/repetition are authorized. Natural-language requests suffice; do not require a configuration form. Reuse this context across stages, keeping it in the conversation when persistence is disabled. Briefly surface material departures from defaults unless reporting is disabled.

Classify risk to scale enabled work: **low** for local reversible changes; **medium** for meaningful integration or multi-file behavior; **high** for security, data migration, concurrency, public API, architecture, or broad cross-module impact. Use the relevant source directly when planning is disabled. A missing optional artifact is not a reason to re-enable its producing stage; identify any genuinely necessary dependency before proceeding.

Completion: The target and execution contract are actionable, or a specific unresolved conflict is presented to the user.

## 2. Plan when enabled

Load grimoire-plan with the source, repository evidence, scope, risk, and execution contract. Reuse or revise an adequate existing plan instead of duplicating it. By default persist the plan before production changes; when only persistence is disabled, keep the approach in conversation and pass that context onward. When persistence is required but blocked, report the blocker rather than treating the plan as saved.

Completion: The selected planning deliverable exists, covers the source intent, and reflects the execution contract.

## 3. Implement when enabled

Load grimoire-implement with the original source, available plan context, and execution contract. Capture the resulting complete diff and any authorized verification evidence. Reuse evidence against unchanged code rather than rerunning identical commands.

Completion: The authorized change exists, with deviations and evidence limitations recorded; disabled verification is not represented as completed.

## 4. Perform enabled quality gates

Apply selected specialist methods at risk-appropriate depth. Low-risk work normally uses focused inline checks; medium/high-risk work benefits from distinct intent, code-risk, and test evidence where those responsibilities are enabled. Delegate when it improves coverage or protects context; high risk alone does not authorize multi-agent orchestration.

Supply delegates the source, available plan context, execution contract, assigned scope, prior evidence, and write permissions. Use [references/agent-prompts.md](./references/agent-prompts.md) for QA handoffs. Sequence dependent checks and coordinate writes. If test authors change files after an assessment, refresh affected enabled checks over the combined result.

Completion: Each selected gate has results or an explicit unmet evidence requirement; omitted gates remain identified as omitted.

## 5. Assess and fix when enabled

Classify findings as confirmed blocking, advisory, praise, or needs-verification. A blocker requires code evidence, a failing command, a violated acceptance criterion, or credible concrete impact. Deduplicate findings without discarding evidence. Resolve needs-verification items with authorized inspection/execution; otherwise retain their uncertainty.

Route confirmed blockers to the appropriate specialist only when fixes and the corresponding writes are authorized. Include adjacent advisory fixes only when low-risk, directly related, and within scope. Otherwise report findings without changing files. Requirement or scope changes need clarification, not a quiet redefinition of acceptance criteria.

Completion: Assessed findings have evidence-backed dispositions; any unfixed work has an owner or stopping reason.

## 6. Iterate and finalize when enabled

Rerun only affected enabled gates after authorized fixes. Reuse valid unrelated evidence. Revise planning context when the approach materially changes, using grimoire-plan when planning is enabled. A revision cannot erase an unmet acceptance criterion.

Continue only while repetition is authorized, progress is being made, and the next action is safe and in scope. Honor user limits or single-pass requests. Stop on nonconvergence, missing authority/information, or scope exhaustion. Run final integrated verification only when enabled, using the selected verification scope.

When formatting is enabled and writes are authorized, format within scope after behavioral work is stable; use [references/format-detection.md](./references/format-detection.md) if detection is unclear. Verification-only work uses non-writing format checks. Formatting changes invalidate affected evidence: refresh enabled checks or record the remaining uncertainty.

Completion: Authorized iterations and finalization are complete, or a concrete stopping reason is recorded.

## 7. Report when enabled

Provide one concise summary of the execution contract's material adaptations, available plan path/context, completed stages, evidence, omitted stages, findings, and remaining work. Use **clean** only as defined above; use **blocked** for an unmet prerequisite, **issues remaining** for unresolved findings, and **unverified** when the requested work is done but no quality gates establish a clean result. A user-requested pause uses **waiting for user**, not a final completion status. Do not claim overall acceptance when required evidence is absent. If reporting is disabled, omit the routine summary while still communicating necessary questions, checkpoints, or blockers.

Completion: The reported status is supported by actual evidence and does not imply disabled work was performed.

# Human checkpoints and resumption

Select checkpoints in this order:

- **User-specified** — honor explicit checkpoints before, after, or within any stage. Model discretion cannot remove or bypass them.
- **Model-selected with user authorization** — when the user asks the model to decide where human involvement is needed, select checkpoints within that authorization based on concrete risk, uncertainty, reversibility, or need for human-only evidence. Record each checkpoint and its reason in the execution contract before reaching it; add or revise model-selected checkpoints as new evidence emerges. This authorization does not enable disabled stages or expand write permissions.
- **No checkpoint instruction or authorization** — proceed automatically without adding routine approval gates. Pause only for necessary blockers such as missing authority, material ambiguity, unavailable required human evidence, or unsafe/irreversible decisions that cannot be resolved within the request. These blockers still apply when the user requests automatic execution.

Completion: Each checkpoint is traceable to an explicit user instruction, authorized model judgment with a concrete reason, or a necessary blocker.

Apply the following pause/resume protocol to every selected checkpoint, including necessary blocker pauses:

1. Perform only the authorized preparation up to the checkpoint. Provide the artifact/build or relevant context, exact action or decision requested, expected feedback/evidence, and what remains paused.
2. Set status to **waiting for user** and end the turn. Do not substitute automated approval, mark the checkpoint passed, launch downstream work, poll, or continue the loop. Independent work may proceed only if the user explicitly allows it during the pause.
3. On feedback, reconnect it to the checkpoint and current code/artifact version. Record whether the feedback satisfies the requirement, requests changes, or revises the execution contract. Resume only released work; partial or ambiguous feedback leaves unresolved checkpoint work paused. Invalidate affected evidence if files changed while waiting.

Completion: A checkpoint is either visibly waiting or released by applicable user feedback, with the next authorized action identified.

For sample compositions and expected execution paths, see [references/composition-examples.md](./references/composition-examples.md).
