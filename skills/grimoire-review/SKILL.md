---
name: grimoire-review
description: Review code changes for evidence-backed correctness, security, compatibility, and other material risks.
---

Review actual changes and relevant consumers, not just worker summaries. Include deletions and untracked files. Infer purpose from source intent, diff, tests, and surrounding code; ask only when competing interpretations materially change the verdict.

Under orchestration, the caller's execution contract governs scope, permitted verification, writes, checkpoints, reporting, and completion. Apply only enabled responsibilities; do not restore excluded checks. Standalone review is read-only unless the user separately authorizes fixes.

## Evidence threshold

Always consider correctness and security when behavior changes; add architecture, compatibility, performance, concurrency, or other lenses only when relevant.

- **blocking** — evidence demonstrates incorrect behavior, security exposure, data loss, regression, violated acceptance criteria, or concrete architectural breakage.
- **needs-verification** — a credible concern lacks decisive evidence. State what would confirm or refute it.
- **suggestion** — a valid optional improvement with concrete benefit.
- **praise** — a specific good decision worth retaining, not obligatory filler.

Attach confidence separately. A failed command alone does not prove a product defect: distinguish environment/tooling prerequisites, baseline failures, and failures attributable to the change. Resolve uncertainty with authorized inspection/execution where practical; never promote uncertainty to blocking merely to be safe. Use [severity-guide.md](./references/severity-guide.md) when classification is unclear.

## Findings and coverage

For each finding give location, evidence, impact, recommendation, severity, and confidence. Deduplicate root causes. Preserve valid design alternatives; skip formatting owned by automation and drop preferences without concrete impact.

Return a concise summary with confirmed blocker count, unresolved verification, suggestions, executed checks, and inspected/partial/unread coverage when reporting is enabled. No findings in inspected code is not a clean review of unread code. Complete when the assigned scope is assessed or its remaining coverage/evidence gaps are explicit.

For large, urgent, disputed, or unfamiliar-domain reviews, consult [review-patterns.md](./references/review-patterns.md). For refactoring or batch assignments, read [batch-context.md](./references/batch-context.md) for snapshot tracking and integrated cross-unit risks. Under orchestration, return findings rather than mutate shared status.
