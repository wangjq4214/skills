# Measurement and acceptance

Separate aspirational targets from required acceptance gates. Record each numeric target's value, metric/scope, source (user or default), and whether explicitly required. The default 30% reduction is an aspiration, not a hard gate.

## Fixed baseline

Before edits, save the actual source snapshot (revision plus dirty-source evidence), included roots, exclusions/reasons, inventory, counter/version, command, language classification, and formatter configuration. Prefer a language-aware counter such as cloc/tokei; a reproducible fallback must disclose limitations. Incomparable estimates cannot establish target achievement.

Count nonblank/noncomment first-party production LOC. Report tests, configuration, documentation, generated, and vendor totals separately, plus total first-party change to expose transfers.

For baseline B and final F:
```text
net reduction = B - F
reduction percentage = 100 * (B - F) / B
30% target achieved when F <= 0.70 * B (B > 0)
```

For B = 0, report percentage not applicable, never 100%; the default aspiration is inapplicable. Non-code repositories need a relevant agreed content metric, not an invented production denominator. An explicit incompatible numeric requirement needs clarification, not a silent waiver.

Measure the integrated tree with unchanged counting/formatting rules. Include additions and moved/renamed responsibilities even outside original roots. Do not sum worker percentages or count only diff deletions. Reconcile scope changes explicitly; never quietly reset the baseline.

## Anti-gaming

Savings must remove or simplify maintained logic. Do not claim minification, compressed formatting, removed comments, renamed extensions, reclassification as generated, transfers into config/templates/tests/vendor, or outsourcing unchanged complexity to a dependency. Report transferred logic and dependency footprint separately; they are not simplification gains.

Preserve features, APIs, validation, authorization, errors, observability, and performance guarantees. Useful tests may grow; remove obsolete tests only because their private implementation disappeared, not for a budget.

## Structural evidence

| Dimension | Before/after evidence | False win |
| --- | --- | --- |
| Responsibility | State ownership, cohesive groups, dependency edges | God object scattered across files |
| Reuse | Equivalent policies eliminated, stable owner, migrated callers | Universal utils or flag-heavy helper |
| Control flow | Nesting, decision/error precedence | Nested ternaries or hidden routing framework |
| Explainability | Entry → policy → effects, concepts/hops | More forwarding layers with nicer names |
| Dependencies | Cycles, fan-out, contracts and consumers | Modules coupled through a universal context |

Size/depth thresholds are clues, not laws. Splits may temporarily add lines; assess net results globally, never impose per-module quotas.

## Completion evidence

Report B, F, percentage, snapshots, commands, category totals, structural outcomes, validation, and target shortfalls. Reaching LOC never waives behavior, readability, coverage, or remaining actionable work.

If safe candidates are exhausted below an aspirational target, completion is allowed when all required gates pass; disclose the shortfall and retention evidence. Missing an explicitly required threshold remains an unmet gate. Never delete necessary behavior to force either target. Resource interruption remains resumable incomplete work.
