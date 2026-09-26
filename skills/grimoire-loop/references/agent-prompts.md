# Agent Prompt Templates

Use these modules only when delegated QA is selected. Identify the assigned skill by name; the child may not inherit the parent's loaded skills. Give enough source and repository access to verify claims, not only a diff excerpt.

## Shared handoff

Prepend to each assignment and specialize the modules below to enabled responsibilities only. Composition policy and checkpoint behavior are defined in [../SKILL.md](../SKILL.md); pass their applicable execution contract to every delegate.

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

## Delegation guidance

- Combine enabled read-only dimensions when separate agents would duplicate exploration. Separate test-writing and read-only assignments with explicit permissions; only schedule enabled downstream assessments.
- Split dimensions when independent perspectives materially increase coverage and delegation is authorized.
- Supply bounded context plus paths for further inspection; do not omit the intent needed to judge the change.
- Sequence dependent assignments and coordinate test writes before enabled downstream checks, or isolate writes and refresh affected enabled checks over the combined result.
- The coordinator owns cross-stage status; a child's clean result is evidence for its assigned scope, not the whole change.
