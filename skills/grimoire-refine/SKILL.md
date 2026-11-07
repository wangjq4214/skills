---
name: grimoire-refine
description: Use when explicitly invoked to work through requirements and choose a handoff, spec, or ticket set. Not for implementation planning or code execution.
disable-model-invocation: true
---

# Coordination

Use `grimoire-clarify` for discussion, `grimoire-record` for durable knowledge, and `grimoire-spec` / `grimoire-slice` for selected artifacts. Refine owns routing and verification, not specialist methods. It does not generate implementation plans or start implementation/QA.

Resolve specialists by exact name through the host's registry or discovery mechanism. Load their full instructions and required references from the reported paths; inline execution is sufficient. Never guess an installation path or treat naming a skill as execution. If unavailable or invocation requires user action, report the blocked stage rather than substitute your own method. Load clarify for discussion, record for authorized qualifying batches, and load artifact skills only when selected.

User restrictions override the default workflow. Pass every specialist the scope, write permissions, selected endpoint, and relevant handoff. Specialists return to refine, not their own downstream workflows.

# Discussion and turn-batched recording

Check sources, permissions, and available project knowledge. Invoking refine or selecting spec/ticket output does not authorize CONTEXT/ADR writes. An explicit user request to record knowledge authorizes that scope without another confirmation; otherwise keep discovered knowledge as unpersisted candidates and obtain approval before writing. Track recording authorization separately from artifact permissions. If the knowledge store is absent, report that `grimoire-init` is needed; do not initialize it without authorization. Missing initialization or recording permission does not block selected spec/ticket work, whose specialists may create only their required directories within permission.

Keep a compact handoff: intent, constraints, acceptance criteria, settled decisions, separately labeled assumptions, source paths, record results, unresolved questions, permissions, and route.

Run clarify. Within each user turn, collect related settled domain knowledge and consequential durable decisions/constraints into one pending batch. Keep ordinary task requirements in the handoff or selected artifacts; exclude unresolved statements and unconfirmed assumptions. Invoke record for an authorized qualifying batch before yielding to the user or handing off to artifact work, not after each delta. If nothing qualifies, retain a concrete no-change reason without invoking record.

Pass record the batch, sources, relevant prior reads/results, and the user's recording authorization, scope, and write restrictions. Delegate deduplication, index maintenance, and ADR consistency checks to record. Require changed paths and verification results, concrete skip reasons, and pending items with blockers; use this report to reconcile the batch rather than repeat its checks. Retain blocked or unverified items as pending; a chat summary is not persistence.

Resume batching with the next user answer. Leave discussion once blocking decisions are resolved; pending recording alone does not block artifact work unless the user or caller explicitly requires knowledge persistence. Explicitly read-only discussion ends with the handoff and unpersisted items, without artifact writes.

# Choose the endpoint

Recommend the smallest useful route based on independent outcomes, shared contracts, coordination, risk, and existing artifacts:

| Need | Route |
| --- | --- |
| One bounded outcome; artifacts add no value | Settled handoff |
| A requirements contract has continuing value | Spec |
| Multiple outcomes need execution coordination or handoff | Spec → slice when both add value |
| An adequate current contract already exists | Slice directly when useful |

Explain omitted stages. A recommendation does not authorize spec/slice: obtain selection unless the user already chose the route. Honor discussion-only and spec-only endpoints. Reuse artifacts only after checking them against current intent.

# Artifact knowledge boundary

Pass this section's instructions, not merely a link, to spec/slice together with the handoff and verified sources:

- Consume settled requirements and established solution choices. Organize, express, decompose, and sequence them, but do not invent or revise domain facts, requirements, constraints, acceptance semantics, architecture, or unconfirmed assumptions.
- Trace meaningful assertions and choices to the handoff or sources. Formatting and execution ordering do not authorize filling semantic gaps.
- Suspend on a needed new fact or decision and return the gap to refine. Resolve it through clarify and apply the same recording-authorization gate before resuming: attempt authorized qualifying updates; keep unauthorized or failed updates Pending without blocking resumption unless the user or caller explicitly requires persistence. No downstream invention followed by retrospective recording. Do not re-record already processed updates.
- These constraints override standalone decision, assumption, and downstream-routing permissions. Return results to refine at the selected endpoint.

Run selected specialists and read their outputs: specs in `.grimoire/spec/`; relationship README and tickets in `.grimoire/ticket/`. Apply their completion checks and compare claims to sources. Unsupported claims keep the stage incomplete. After new discussion, recheck the route and affected artifacts.

# Close

Completion requires the selected endpoint's verified outputs and no blocking knowledge gaps. Pending knowledge persistence alone does not prevent delivering a completed Spec or other selected output: report it as Pending with the unpersisted items, blockers, and resumption point. Only when the user or caller explicitly requires knowledge persistence do blocked or unverified qualifying record updates prevent overall completion; permission to record alone is not such a requirement.

Report route, context/ADR updates or no-change reasons, artifact paths, explicit assumptions/limitations, and the handoff. For execution-ready work, recommend user invocation of `grimoire-loop`; do not start it or invoke a separate plan stage.
