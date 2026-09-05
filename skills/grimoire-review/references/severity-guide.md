# Severity Classification

Every finding carries a severity and confidence level. Severity reflects demonstrated impact; confidence reflects evidence quality.

---

## Blocking

Use blocking only when evidence shows at least one of: incorrect behavior, security exposure, data loss, regression, violated acceptance criteria, or a concrete architectural breakage.

Examples include a reproducible logic error, unsafe input handling, destructive migration, broken public contract, or demonstrated dependency cycle with material consequences.

Uncertainty is not blocking. Run a targeted check when practical; otherwise classify the concern as **needs-verification**.

---

## Needs verification

Use when the concern is credible but depends on unavailable runtime evidence, domain authority, production configuration, or broader context. State what evidence would confirm or refute it and its potential impact.

---

## Suggestion

Use for valid optional improvements in readability, maintainability, performance, reuse, or non-critical test coverage. Explain the concrete benefit. Drop preferences without impact.

---

## Praise

Call out a specific decision that improves correctness, clarity, simplicity, or risk management. Praise the code decision, not the author.

---

## Confidence

- **High** — reproduced, tested, or directly proven by code and contract.
- **Medium** — strong code evidence with a stated assumption.
- **Low** — plausible but dependent on missing context; usually needs-verification rather than blocking.

## Quick decision table

| Evidence and impact | Classification |
| --- | --- |
| Demonstrated contract, correctness, security, or data failure | blocking |
| Credible impact but missing decisive evidence | needs-verification |
| Current behavior is valid; improvement is optional | suggestion |
| Specific decision worth preserving | praise |
| No concrete impact | drop |
