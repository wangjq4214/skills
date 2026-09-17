# Reduction and structural acceptance

## Fixed baseline

Before modifications, save the actual source snapshot (revision plus dirty-source evidence), included roots, exclusions with reasons, file inventory, counter/version, command, language classification, and formatter configuration. Use a language-aware counter such as cloc/tokei when available. If unavailable, use a documented reproducible fallback and disclose its limitations; incomparable estimates cannot establish a percentage gate.

Primary metric: nonblank, noncomment first-party production source lines. Report test, configuration, documentation, generated, and vendor totals separately; also show total first-party change so moving logic between categories is visible. For non-code repositories, establish the relevant content metric explicitly rather than pretending a production LOC denominator exists.

Let B be baseline production LOC and F be final production LOC:

```text
net reduction = B - F
reduction percentage = 100 * (B - F) / B
30% gate: F <= 0.70 * B
```

For B = 0, the percentage is undefined; report not applicable, not 100%. Calculate on the integrated tree using unchanged classification/filter rules and formatting conventions. Newly added source counts; deleted source disappears; moved or renamed responsibilities stay in scope even when their new paths fall outside the original roots. Do not sum worker percentages or count only deletions from git diff. Include all scope additions in the final numerator; scope changes require an explicit baseline reconciliation, never a quiet reset.

## Anti-gaming constraints

A LOC win must remove or simplify maintained logic. Do not claim reduction through minification, compressed formatting, removed explanatory comments, renamed extensions, reclassification as generated code, moving implementations into config/templates/tests/vendor, or outsourcing the same complexity to a new dependency. Report transferred logic and dependency footprint separately; transferred complexity cannot satisfy the reduction gate. Preserve needed features, APIs, validation, authorization, error paths, observability, and performance guarantees.

Tests may grow to protect behavior. Do not delete useful tests to reach a source target. Removing obsolete tests is justified by the removed private implementation, not by the line budget.

## Independent structural gates

Record before/after evidence for requested dimensions, not only LOC:

| Dimension | Useful evidence | False win |
| --- | --- | --- |
| God files | Responsibility groups, state ownership, largest files, dependency edges | Same god object scattered across partial files |
| Reuse | Duplicate implementations eliminated, one semantic owner, migrated callers | Global utils dumping ground or flag-heavy universal helper |
| Control flow | Maximum nesting and decision structure for affected paths | Nested ternaries or hidden routing framework |
| Explainability | Entry → policy → effects path, concepts/hops, short explanation | More files and forwarding layers with nicer names |
| Dependencies | Cycles, fan-out, changed contracts and consumers | Smaller modules coupled through a universal context |

Size/depth thresholds are investigation signals, not universal style laws. Splitting can add lines temporarily; assess the net outcome across all units. Set the reduction target globally, never per worker or per module.

## Completion evidence

Report B, F, percentage, source snapshots, commands, category totals, structural outcomes, validation, and exact remaining shortfall. Achieving LOC does not waive coverage, readability, or behavior gates. Exhausting safe candidates does not retroactively waive a requested percentage: report incomplete/unmet target with concrete retained-code evidence, not fabricated success or unsafe deletion. Continue actionable work until resolved; resource interruption is a resumable incomplete run.
