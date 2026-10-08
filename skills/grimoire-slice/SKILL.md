---
name: grimoire-slice
description: Break clear requirements into coherent, verifiable tickets with evidence-based dependencies.
---

Write ticket sets in `.grimoire/ticket/NNNN-title/`; do not implement code or invent requirements.
Standalone invocation does not require refine or its handoff.

Under `grimoire-refine`, require and follow its supplied knowledge boundary, permissions, and endpoint. Return gaps/results to the coordinator rather than settle new semantic choices or launch downstream work. Request a missing coordination contract; do not guess its location.

# Establish input

Use an adequate current spec, or conversation requirements with clear outcomes, constraints, and acceptance. Reading a spec is not invoking its authoring skill; do not create one merely to satisfy a dependency.

Read available relevant context, applicable ADRs, and affected repository surfaces. Missing optional knowledge files are not prerequisites. Resolve bounded factual questions from evidence. Standalone, surface material scope/solution gaps and recommend refine or spec only when needed and authorized; under refine, return those gaps.

A request to create tickets authorizes creating `.grimoire/ticket/` and missing parents unless writes are restricted. Do not require `grimoire-init` or create unrelated directories or knowledge files; use init only when establishing the CONTEXT/ADR system is requested. A path/type conflict or denied write blocks persistence, not permission to replace existing content.

Allocate the next unused numbered folder. Carry source paths or a concise conversation contract into the README and tickets.

Leave Git configuration (including ignore rules) and agent registration unchanged without separate explicit authorization. The existing Git allowlist permits Markdown tickets; whether to commit them depends on the task lifecycle and user authorization, not ticket creation. Do not install ignore rules or stage/commit tickets merely because they were created; report conflicting ignore rules rather than bypassing them.

# Decompose

- Map every required outcome and affected surface across the set, not into every ticket.
- Prefer vertical value slices, but allow component, migration, operational, documentation, and enabling work when independently verifiable. Split by value, risk, lifecycle, or testable contract, not mechanically by layer or context-window estimate.
- Keep tightly coupled behaviors together when splitting creates incomplete states or artificial coordination.
- Put setup/refactoring in the first consumer unless a separate ticket has independent verification and either multiple real consumers or an independent rollout/lifecycle. Separation must reduce duplication, unsafe intermediate states, or coordination; avoid cosmetic global pre-refactoring.
- Add a blocking edge only when a consumer cannot be implemented or verified before the producer. Shared files are merge risks, not semantic dependencies; agreed interfaces may permit parallel work. Record blocking, parallel-with-coordination, and independent relationships as relevant.
- Revisit cyclic boundaries; merge only when the result is a coherent work unit.

Present outcomes, real dependencies, coordination risks, and recommended order. Within permission, write reversible drafts and invite edits; obtain confirmation before decomposition materially commits scope or sequencing.

# Generate and validate

Read [relationship-file-template.md](./references/relationship-file-template.md) for the README and [vertical-slice-template.md](./references/vertical-slice-template.md) for `TNNNN-title.md` tickets. These are defaults, not mandatory empty sections.

Completion requires:
- Every requirement maps to an actionable ticket with observable acceptance and source traceability.
- All necessary surfaces are covered; boundaries do not force unnecessary cross-layer work.
- Every blocker has a reason, the graph is acyclic, and recommended order follows it.
- Coordination risks, ADR alignment, and feasible scope are checked.
- Written files are read back; every ticket appears in the README with a valid link.

Standalone, recommend `grimoire-loop` after the set is complete; execute further work only when authorized. Under refine, return at the selected endpoint. Do not preload plan or implementation skills.
