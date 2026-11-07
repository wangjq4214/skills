# Agent Prompt Templates

Use these modules only when delegated QA is selected. Identify the assigned skill by name; the child may not inherit the parent's loaded skills. Give enough source and repository access to verify claims, not only a diff excerpt.

For a combined review + check assignment, name and load both skills, pass one shared handoff, and include both assignment modules below. Follow the joint path in [../SKILL.md](../SKILL.md): reuse source evidence and return one deduplicated result while retaining each axis's coverage and uncertainty.

## Shared handoff

Prepend to each assignment and specialize the modules below to enabled responsibilities only. Pass the execution contract from [../SKILL.md](../SKILL.md) to every delegate. Follow [handoffs.md](./handoffs.md) for scheduling; when a human gate applies, follow [checkpoints.md](./checkpoints.md).

```text
Use {skill_name} for the assigned responsibility at {risk_level} depth. Load only relevant references. If it is unavailable, report that limitation and the fallback used.

Intent, acceptance criteria, and constraints: {intent_and_criteria}
Source artifacts or conversation contract: {sources}
Available plan path or conversation approach, relevant steps/revisions (or planning disabled): {plan_context}
Execution contract — enabled/disabled stages and substages, order, human checkpoints, required evidence, fixes/repetition permissions: {execution_contract}
Apply specialist methods within this contract, including its exclusions. Return control at human checkpoints with the requested handoff; the coordinator obtains user feedback.
Changed files and relevant diff, including untracked files: {change_context}
Assigned scope and verification already performed: {scope_and_prior_evidence}
Write permissions: {write_permissions}

Inspect actual files as needed. Return evidence tied to intent or risk, commands and results, changed files if any, and unresolved limitations. Do not expand the authorized scope.
```

## Check assignment — grimoire-check

```text
Audit alignment with the supplied intent and acceptance criteria. Treat incidental plan details as guidance.
Return matches, gaps, deviations, extras, and needs-verification items using grimoire-check.
This assignment is read-only: propose justified artifact status changes for the coordinator to handle within the execution contract. Do not modify files.
```

## Review assignment — grimoire-review

```text
Review the current change using grimoire-review, focusing on {risk_lenses}.
Verify testable concerns where practical. Return confirmed blockers, needs-verification items, and suggestions with locations, impact, and confidence. Do not modify files.
```

## Test assignment — grimoire-test

```text
Use grimoire-test for the selected test responsibilities {test_substages} covering {behavior_and_risks}.
Reuse adequate existing coverage; do not add tests merely to create an artifact.
Write only within {test_write_scope}. Report product defects rather than changing production behavior. Return actual commands/results, test changes, and pending human evidence for enabled downstream stages.
```
