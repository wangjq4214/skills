---
name: grimoire-review
description: Review code changes using evidence-backed severity, confidence, and risk-relevant lenses.
---

# Purpose

Identify concrete correctness, security, maintainability, architecture, and performance risks without turning uncertainty or stylistic preference into blockers.

# Scope

This skill reviews code and reports findings. It may execute targeted read-only verification when needed; it does not modify production code unless the user separately authorizes fixes.

# Leading words

- **blocking** — evidenced issue that prevents safe acceptance
- **needs-verification** — plausible concern lacking enough evidence to block
- **suggestion** — optional improvement
- **praise** — concrete strength worth preserving
- **confidence** — high, medium, or low confidence in the evidence

# Workflow

## 1. Understand context

Infer purpose from the diff, tests, issue, and surrounding code. Ask only when competing interpretations materially change the verdict; otherwise state the working interpretation.

Completion: Purpose and assumptions are explicit.

---

## 2. Review relevant risks

Always consider correctness and security when behavior can change. Examine architecture, maintainability, performance, compatibility, concurrency, or domain-specific risks when the diff can affect them. Skip irrelevant lenses without producing empty confirmations.

Completion: Material risks introduced or exposed by the change have been examined.

---

## 3. Verify and classify

Use targeted inspection or executable checks to resolve uncertainty when practical. Assign severity and confidence:

- **blocking** — reproducible incorrect behavior, security exposure, data loss, violated acceptance criterion, regression, or concrete architectural breakage.
- **needs-verification** — credible impact requiring unavailable context, authority, or execution evidence.
- **suggestion** — useful but optional improvement.
- **praise** — specific good decision worth retaining.

Never promote uncertainty to blocking merely to be safe. Drop observations without concrete impact. See [references/severity-guide.md](./references/severity-guide.md).

Completion: Every finding has evidence, impact, severity, and confidence.

---

## 4. Write review

For each finding provide location, observation, concrete impact, evidence, recommendation, severity, and confidence. Keep one issue per finding. Discuss tradeoffs when several approaches are valid.

Describe code rather than the author, and distinguish verified facts from inference.

Completion: Findings are actionable and objectively framed.

---

## 5. Summarize

State readiness, confirmed blocker count, needs-verification items, suggestion count, and important themes. Do not imply a clean review when required evidence could not be obtained.

Completion: The summary accurately reflects both findings and evidence limits.

---

# Rules

- Blocking requires concrete evidence or a directly violated contract.
- Resolve testable uncertainty before reporting; otherwise use needs-verification.
- Skip formatting when automated tooling owns it.
- Respect valid design alternatives and explain tradeoffs.
- Review scope follows change risk, not a mandatory category checklist.

---

# Optional refactoring and batch context

Keep the existing standalone workflow and severity categories. For a batch or integrated refactoring, record the actual base/current revision or fingerprints, changed paths, preserved contracts, and relevant consumers. Use map shards only for navigation and revalidate source claims. Review actual diffs, including deletions and neighboring behavior, rather than worker summaries.

Partition large reviews by risk and subsystem with explicit inspected/partial/unread coverage; independent lenses may overlap. Deduplicate root causes before reporting and verify concrete findings. Examine cross-unit seams after integration: shared-helper semantics, error/route precedence, registration reachability, state ownership, dependency cycles, and required public compatibility.

Do not treat a smaller file, LOC reduction, or successful merge as evidence of improved architecture. Check whether the new understanding path is shorter rather than hidden behind wrappers, flags, or a universal context. Preserve valid alternative designs and the existing evidence threshold for blockers.

Return findings with source locations, evidence, impact, severity/confidence, reviewed snapshot, executed checks, coverage gaps, and unresolved verification. A branch review is scoped to that branch; reassess affected findings after integration or conflict resolution. If a coordinator owns shared status, return recommendations rather than mutate it. No findings in inspected code is not a clean review of unread code.

# References

- [severity-guide.md](./references/severity-guide.md) — detailed severity classification with concrete examples
- [review-patterns.md](./references/review-patterns.md) — common review scenarios and how to handle them
