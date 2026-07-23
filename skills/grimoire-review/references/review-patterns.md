# Review Patterns

Common review scenarios and how to handle them.

---

## Large PR

When the change is too large for a single review session:

1. Ask the author if they want the review split by directory, by feature, or by commit.
2. Review one portion at a time, completing the full workflow per portion.
3. In the summary, note which portions were reviewed and which remain.

Do not skim a large PR. Partial thorough review is better than full shallow review.

---

## Author Disagreement

When the author disagrees with a finding:

1. Confirm you understood their intent correctly. Restate it back: "I think you chose X because Y — is that right?"
2. If the finding is a suggestion: drop it. No further discussion needed.
3. If the finding is blocking and they disagree: ask "What am I missing?" — not "Why won't you fix this?"
4. If the disagreement is about tradeoffs: document both sides briefly and let the author decide. The author owns the code.

---

## Unfamiliar Domain

When you don't fully understand the problem domain:

1. State what you can review (general code structure, error handling, naming) and what you cannot (domain correctness).
2. Review what you can. Skip what you cannot.
3. In the summary, call out the gap explicitly: "Domain logic in `pricing.ts` was not reviewed — I'm not familiar with the pricing model."

Do not pretend to understand what you don't. A partial honest review is valuable; a confident wrong review is harmful.

---

## No Issues Found

When the review finds nothing to flag:

1. Still deliver a summary. "No blocking issues or suggestions — this change looks correct, well-structured, and maintainable."
2. Add specific praise where warranted. "The error handling in `retryWithBackoff` is particularly clean."
3. Do not invent issues to appear thorough. A clean review is a valid outcome.

---

## Urgent / Hotfix Review

When the change is time-sensitive:

1. Prioritize correctness and security above all else. Everything else can follow up.
2. State the reduced scope explicitly: "Reviewing for correctness and security only due to urgency."
3. Flag skipped categories for follow-up: "Architecture and maintainability should be reviewed post-merge."

---

## Giving Praise Effectively

Praise is not filler. It serves three purposes:

1. **Reinforce patterns** — signal which design decisions align with project standards.
2. **Build trust** — show you recognize good work, not just problems.
3. **Balance tone** — a review with only problems feels adversarial; praise makes it collaborative.

Rules for praise:

- Be specific. "Nice" is not praise; "The `Either` type here avoids null-check leakage into every caller" is.
- Limit to 2–3 genuine highlights. More dilutes the signal.
- Never invent praise to soften criticism. Authors can tell.
