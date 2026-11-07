# Handoffs and parallel work

Read before delegated/parallel dispatch or cross-session handoff/resumption. Handoffs do not authorize delegation, planning, persistence, or additional writes; use the execution contract in [../SKILL.md](../SKILL.md).

Pass source intent/acceptance criteria, available plan or conversation approach, contract, assigned scope, risk, write permissions, complete change context including untracked files, and prior evidence. Preserve this context in conversation when persistence is disabled. Capture resulting diffs and evidence, not only a completion claim.

Delegate only when authorized and useful for coverage/context. Combine read-only dimensions when separate agents would duplicate exploration; split them when independent perspectives materially improve coverage. For delegated QA, read [agent-prompts.md](./agent-prompts.md) and use only enabled assignment modules.

Coordinate write ownership and sequence dependent assignments. Complete test writes before dependent assessments, or isolate writes and refresh affected enabled checks over the combined result. A child's clean result establishes only its assigned scope; the coordinator owns cross-stage status and integrated evidence.

Before resumption, reconcile the handoff with current source, dependencies, environment, user instructions, and unresolved gates. Reuse only applicable evidence and release only authorized work. For interrupted or failed work, also read [recovery.md](./recovery.md); for a pending human gate, read [checkpoints.md](./checkpoints.md).
