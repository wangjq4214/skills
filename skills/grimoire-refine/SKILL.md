---
name: grimoire-refine
description: Coordinate clarification with live knowledge recording, then recommend spec/slice by complexity or route simple work directly to a plan; finish at slice or plan.
disable-model-invocation: true
---

# Purpose

Coordinate specialist-led discussion with synchronous knowledge recording, then route settled requirements to proportionate artifacts, ending at a completed ticket set or implementation plan.

Refine owns scheduling, route recommendations, handoffs, and verification. It does not conduct its own requirements interview, author specialist artifacts, or execute implementation.

# Specialist execution

Refine is user-invoked because the user intentionally selects a coordinated refinement workflow. Explicit discussion-only, read-only, or narrower artifact requests take precedence.

**Execute a specialist** means resolve the skill by its exact name through the host's available skill registry or discovery mechanism, then use the host's supported invocation mechanism. When execution requires reading instructions, load the full `SKILL.md` from the actual path reported by the host and follow its workflow and required references with the supplied input. Resolve that skill's own references relative to its discovered directory. Never infer another skill's location from a sibling directory or a hard-coded installation root.

Naming a skill, reading a repository navigation link, or using a generic equivalent is not execution. Inline execution is sufficient; separate agents are not required. If a specialist cannot be resolved or host invocation rules require user action, report the blocked stage and required action instead of guessing a path or substituting refine's own method.

Load clarify and record together when discussion begins; load an artifact specialist only when its selected stage begins. Each specialist returns control to refine rather than choosing another downstream workflow itself.

# Workflow

## 1. Prepare discussion

Identify the request, existing sources, write permissions, and `.grimoire/` availability. Refinement includes automatic knowledge recording unless the user restricts writes. If initialization is missing, report that grimoire-init is required; discussion may proceed, but required persistence and dependent artifact generation remain blocked.

Maintain a compact **handoff**: settled intent, constraints, acceptance criteria, decisions, source paths, record results, unresolved questions, permissions, and the selected route once known. This is coordination state, not a substitute for persisted knowledge.

Completion: Discussion inputs and permissions are known, and persistence prerequisites are available or explicitly blocked.

## 2. Run clarify with live record

Execute `grimoire-clarify` to manage the discussion, with `grimoire-record` active throughout the same discussion. Clarify owns questions and resolution; record owns knowledge qualification, deduplication, context updates, and ADR maintenance.

After each resolved answer or decision, pass the discussion delta to record and execute any qualifying update before advancing to the next discussion round. Do this automatically within write permissions, without a separate recording request. Record is a companion to clarify, not a stage deferred until the entire discussion ends or a detached task whose writes may lag behind the handoff. Speculative or unresolved statements remain questions, not settled knowledge.

Verify each record result by reading changed entries or inspecting diffs: context/domain files and their index, or ADR paths as applicable. When no write is needed, retain record's concrete reason, including existing source paths for already-recorded knowledge. When writing is blocked, retain the pending item and report the blocker; a chat summary is not persistence.

On a user-turn pause, keep clarify and record active and resume with the next answer. Before leaving discussion, reconcile the last discussion delta with record and pass verified current context/ADR paths into the handoff.

Completion: Clarify has no blocking frontier, all qualifying settled knowledge is persisted and verified, and no record update remains pending. In explicitly read-only discussion, report unpersisted knowledge and stop without entering artifact generation.

## 3. Recommend the artifact route

Assess the settled task's complexity: number of independently deliverable outcomes, cross-system contracts, coordination needs, risk, and adequacy of existing artifacts. Explain whether spec and slice add value and recommend the smallest useful route to the user.

| Signal                                                                        | Recommendation                                                                | Endpoint |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| Simple, bounded task with one clear implementation outcome                    | Skip spec and slice; execute plan directly                                    | Plan     |
| Shared requirement contract is useful, but delivery remains one coherent task | Spec, then plan                                                               | Plan     |
| Multiple independently deliverable outcomes need a ticket set                 | Spec, then slice; reuse an adequate existing contract instead of rewriting it | Slice    |
| Clear bounded contract already exists and decomposition is useful             | Slice directly                                                                | Slice    |

For a simple task, state why spec/slice are unnecessary and proceed directly to plan within the user's scope. Before adding spec or slice, obtain the user's route selection unless their request already selected it. A recommendation alone does not authorize those extra artifacts. Respect an explicit discussion-only or spec-only endpoint.

Completion: The complexity-based recommendation, selected route, omitted stages with reasons, and endpoint are explicit; any required user selection has been received.

## 4. Execute the selected artifacts

Pass the settled handoff, verified source paths, selected endpoint, and the full [knowledge boundary](#knowledge-boundary) instructions to each selected specialist as its coordination contract, including when delegating execution. Pass the instructions themselves, not just a link or an assumed coordinator file path. Existing artifacts can be reused only after checking that they represent current settled intent.

| Stage | Owner            | Verified output                                                                      |
| ----- | ---------------- | ------------------------------------------------------------------------------------ |
| Spec  | `grimoire-spec`  | Requirement files in `.grimoire/spec/` traceable to settled inputs                   |
| Slice | `grimoire-slice` | Relationship README and tickets in `.grimoire/ticket/` covering the settled contract |
| Plan  | `grimoire-plan`  | Readable HTML plan in `.grimoire/plans/` covering the settled task                   |

After each stage, read its outputs, apply its completion checks, and verify compliance with the knowledge boundary. Spec returns to the selected next stage; slice and plan return directly to closure. Never automatically plan the tickets after slice, or start implementation after plan.

Completion: Selected artifacts satisfy their owners' checks and stay within the settled inputs, or the stage is explicitly suspended for a knowledge gap.

## 5. Close

End the entire refine workflow when slice or plan completes, or at an explicitly narrower endpoint. Report the selected route, verified context/ADR updates or no-change reason, and artifact paths. If blocked, report the missing input or permission and the resumption point instead of claiming completion.

Completion: The selected endpoint has verified evidence; no further artifact, implementation, or QA workflow has been started as part of refine.

# Knowledge boundary

Within a refine route, **spec, slice, and plan consume settled knowledge; they do not produce new knowledge**. This boundary takes precedence over their standalone permission to resolve decisions or make assumptions.

They may organize, express, decompose, and sequence the supplied requirements and established solution, but must not introduce or revise domain facts, definitions, requirements, constraints, acceptance semantics, architectural decisions, or unconfirmed assumptions. Their meaningful assertions and choices must be traceable to the settled handoff and verified sources. Artifact formatting and execution ordering do not authorize filling semantic gaps.

If an artifact stage needs a new fact or decision, suspend it and report the gap to refine. Return to **clarify with live record** to resolve and persist the knowledge before resuming; never generate the knowledge downstream and send it directly to record for retrospective approval. Recheck the route and affected artifacts against the updated settled inputs.

Verification: Check artifact claims against their sources; unsupported knowledge keeps the stage incomplete and returns to discussion rather than being accepted as an artifact-stage decision.
