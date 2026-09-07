# Agent Prompt Templates

Use these modules only when delegated QA is selected. Identify the assigned skill by name; the child may not inherit the parent's loaded skills. Give enough source and repository access to verify claims, not only a diff excerpt.

## Shared handoff

Prepend to each assignment:

```text
Use {skill_name} for the assigned responsibility at {risk_level} depth. Load only relevant references. If it is unavailable, report that limitation and the fallback used.

Intent, acceptance criteria, and constraints: {intent_and_criteria}
Source artifacts or conversation contract: {sources}
Changed files and relevant diff, including untracked files: {change_context}
Assigned scope and verification already performed: {scope_and_prior_evidence}
Write permissions: {write_permissions}

Inspect actual files as needed. Return evidence tied to intent or risk, commands and results, changed files if any, and unresolved limitations. Do not expand the authorized scope.
```

## Check assignment — grimoire-check

```text
Audit alignment with the supplied intent and acceptance criteria. Treat incidental plan details as guidance.
Return matches, gaps, deviations, extras, and needs-verification items using grimoire-check.
This assignment is read-only: propose justified artifact status changes for the coordinator to apply after integrated verification. Do not modify files.
```

## Review assignment — grimoire-review

```text
Review the current change using grimoire-review, focusing on {risk_lenses}.
Verify testable concerns where practical. Return confirmed blockers, needs-verification items, and suggestions with locations, impact, and confidence. Do not modify files.
```

## Test assignment — grimoire-test

```text
Use grimoire-test to assess coverage, write missing valuable tests, and run relevant checks for {behavior_and_risks}.
Reuse adequate existing coverage; do not add tests merely to create an artifact.
Write only within {test_write_scope}. Report product defects for grimoire-implement rather than changing production behavior. Return commands/results and test changes so final review/check can include them.
```

## Delegation guidance

- Combine read-only review/check dimensions when separate agents would duplicate exploration; load each selected skill. When the same agent also authors tests, give it a separate test phase with explicit test-write permission, followed by a read-only review/check assignment over the resulting diff. Do not concatenate incompatible assignment-wide write permissions.
- Split dimensions when independent perspectives materially increase coverage and delegation is authorized.
- Supply bounded context plus paths for further inspection; do not omit the intent needed to judge the change.
- Sequence prompts when one result should shape the next check. Coordinate test writes before final review/check, or isolate them and verify the integrated result.
- The coordinator deduplicates findings and owns final status; a child's clean result is evidence for its assigned scope, not the whole change.
