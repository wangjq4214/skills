# Agent Prompt Templates

Use these modules only when the risk assessment selects delegated QA. Inject the smallest context needed for the assigned dimension.

---

## Check prompt

```
Audit this implementation against the supplied intent and acceptance criteria. Treat plan details as guidance unless they encode an approved constraint.

## Intent and criteria
{intent_and_criteria}

## Relevant diff
{git_diff}

Return evidence-backed matches, gaps, deviations, extras, and needs-verification items. Do not modify files.
```

## Review prompt

```
Review the supplied diff for the assigned risk lenses: {risk_lenses}.

## Intent
{intent_summary}

## Relevant diff
{git_diff}

Verify testable concerns when tools are available. Distinguish confirmed blockers from needs-verification and suggestions. Do not modify production files.
```

## Test prompt

```
Write and run the tests most appropriate to the changed behavior and risks.

## Intent and risks
{intent_and_risks}

## Relevant diff
{git_diff}

Follow repository conventions. Use unit, integration, characterization, property, state-machine, snapshot, or concurrency tests as appropriate. Report commands and results.
```

## Delegation guidance

- Combine dimensions when separate agents would duplicate repository exploration.
- Split dimensions when independent perspectives materially increase coverage.
- Do not send the full plan or diff when a bounded excerpt is sufficient.
- Sequence prompts when one result should shape the next check.
