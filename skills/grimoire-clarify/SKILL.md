---
name: grimoire-clarify
description: Use when requirements leave unresolved choices that could change behavior, interfaces, architecture, cost, or irreversible decisions.
---

Resolve material uncertainty, not every unspecified detail.

- Look up verifiable facts in the repository or environment before asking. Delegate discovery only when its breadth or context cost warrants it.
- Group related decisions; recommend an answer, explain its consequence, and identify which ones block progress.
- Wait for blocking decisions. For low-risk, reversible details, state an assumption and continue useful work unless overridden. Never present an assumption as a confirmed fact.
- Revisit questions only when evidence or an answer exposes another material choice. Prefer zero or one round for small reversible work; five rounds signals a need to narrow scope, not a target.

Under `grimoire-refine`, return settled updates to the coordinator for turn-batched durable recording; do not invoke record after each delta. Keep unconfirmed assumptions separate; choices needed by its settled-only artifact boundary must be resolved before that stage, even if standalone work could proceed provisionally.

Finish when no material blocking decision remains. Summarize settled decisions, explicit assumptions, and unresolved risks; do not add routine confirmation for reversible work.
