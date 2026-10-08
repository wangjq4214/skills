---
name: grimoire-refine
description: Coordinate requirements discussion with live knowledge recording, then select a settled handoff, spec, or ticket set.
disable-model-invocation: true
---

# Coordination

Use `grimoire-clarify` for discussion, `grimoire-record` for durable knowledge, and `grimoire-spec` / `grimoire-slice` for selected artifacts. Refine owns routing and verification, not specialist methods. It does not generate implementation plans or start implementation/QA.

Resolve specialists by exact name through the host's registry or discovery mechanism. Load their full instructions and required references from the reported paths; inline execution is sufficient. Never guess an installation path or treat naming a skill as execution. If unavailable or invocation requires user action, report the blocked stage rather than substitute your own method. Load clarify and record together; load artifact skills only when selected.

User restrictions override the default workflow. Pass every specialist the scope, write permissions, selected endpoint, and relevant handoff. Specialists return to refine, not their own downstream workflows.

# Discussion and live recording

Check sources, permissions, and available project knowledge. Refinement authorizes automatic knowledge recording unless restricted. Use `grimoire-init` when establishing the CONTEXT/ADR system is needed; missing `.grimoire/` alone does not block spec/ticket creation. Keep qualifying record updates pending if initialization or writes are blocked; the live-recording and completion gates still apply. When no qualifying update is pending, selected artifact skills may create only their required directories within permission.

Keep a compact handoff: intent, constraints, acceptance criteria, settled decisions, separately labeled assumptions, source paths, record results, unresolved questions, permissions, and route.

Run clarify. After each resolved discussion delta, run record for qualifying knowledge **before the next discussion round**; this overrides standalone batching. Unresolved statements and unconfirmed assumptions are not settled knowledge. Do not force ordinary task requirements into context or ADRs merely to persist them; retain them in the handoff or selected artifacts.

Read changed entries or inspect diffs, including domain indexes and ADR links. For no change, retain the concrete reason and existing source paths when already recorded. For blocked writes, retain pending items; a chat summary is not persistence.

On a user-turn pause, reconcile the current delta and resume these same responsibilities with the next answer. Leave discussion only when no blocking decision or qualifying record update remains pending. Explicitly read-only discussion ends with the handoff and unpersisted items, without artifact writes.

# Choose the endpoint

Recommend the smallest useful route based on independent outcomes, shared contracts, coordination, risk, and existing artifacts:

| Need | Route |
| --- | --- |
| One bounded outcome; artifacts add no value | Settled handoff |
| A shared requirements contract is useful | Spec |
| Independently deliverable outcomes need decomposition | Spec → slice |
| An adequate current contract already exists | Slice directly when useful |

Explain omitted stages. A recommendation does not authorize spec/slice: obtain selection unless the user already chose the route. Honor discussion-only and spec-only endpoints. Reuse artifacts only after checking them against current intent.

# Artifact knowledge boundary

Pass this section's instructions, not merely a link, to spec/slice together with the handoff and verified sources:

- Consume settled requirements and established solution choices. Organize, express, decompose, and sequence them, but do not invent or revise domain facts, requirements, constraints, acceptance semantics, architecture, or unconfirmed assumptions.
- Trace meaningful assertions and choices to the handoff or sources. Formatting and execution ordering do not authorize filling semantic gaps.
- Suspend on a needed new fact or decision and return the gap to refine. Resolve it through clarify with live record **before** resuming; no downstream invention followed by retrospective recording.
- These constraints override standalone decision, assumption, and downstream-routing permissions. Return results to refine at the selected endpoint.

Run selected specialists and read their outputs: specs in `.grimoire/spec/`; relationship README and tickets in `.grimoire/ticket/`. Apply their completion checks and compare claims to sources. Unsupported claims keep the stage incomplete. After new discussion, recheck the route and affected artifacts.

# Close

Completion requires the selected endpoint's verified outputs, no blocking knowledge gaps, and no pending qualifying record updates. Otherwise report the blocker and resumption point.

Report route, context/ADR updates or no-change reasons, artifact paths, explicit assumptions/limitations, and the handoff. For execution-ready work, recommend user invocation of `grimoire-loop`; do not start it or invoke a separate plan stage.
