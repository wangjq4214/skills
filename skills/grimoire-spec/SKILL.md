---
name: grimoire-spec
description: Turn requirements and relevant repository context into proportionate, traceable specs.
---

Write requirements contracts in `.grimoire/spec/`, not production code. Preserve every independent outcome; scale detail to risk.
Standalone invocation does not require refine or its handoff.

Under `grimoire-refine`, require and follow its supplied knowledge boundary, permissions, and endpoint. Return gaps/results to the coordinator; do not resolve new semantic choices or choose downstream workflows. If the coordination contract is absent, request it rather than guess its location.

# Build the contract

- Require an existing `.grimoire/`; otherwise stop and request `grimoire-init`. Create `spec/` if authorized. Allocate unused `NNNN-title-with-dashes.md` names; do not overwrite unrelated specs.
- Read the requirement, relevant context/domain files, applicable ADRs, and affected repository surfaces. Scan ADR titles/statuses before expanding unrelated history.
- Surface ADR conflicts. Standalone work may recommend a resolution or keep a non-blocking assumption visible; ask before committing an irreversible, policy-breaking, or scope-changing choice. Coordinated work returns these gaps to refine.
- Describe necessary integration points and what they exchange or guarantee, including in-process boundaries when correctness or ownership depends on them. Exclude incidental calls and speculative architecture. Read [minimum-seams.md](./references/minimum-seams.md) when inclusion is unclear.
- Use [spec-template.md](./references/spec-template.md) for drafting. Include outcomes, the solution, representative input-to-outcome verification, material choices and their sources, and meaningful exclusions. Add further test guidance or future evolution only when justified; omit empty sections without omission boilerplate.
- Split specs only for genuinely independent lifecycles or approval paths. Make acceptance observable; do not invent thresholds or excluded scope to fill a template.

# Write and verify

Present material choices, assumptions, seams, and exclusions. Write reversible drafts within permission; require approval before consequential split/merge, scope change, ADR conflict resolution, or irreversible commitment. Revise affected sections after feedback.

Read written files and check every requested outcome, source/ADR links, necessary contracts, and verification criteria. A blocking decision remains incomplete even if a draft exists.

Completion: All requested outcomes have traceable specs with useful verification guidance and no unresolved blocking choice.

Standalone, recommend `grimoire-slice` only if decomposition adds value, otherwise `grimoire-loop`; execute further work only when authorized. Under refine, return at its selected endpoint.
