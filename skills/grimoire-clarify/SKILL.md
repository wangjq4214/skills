---
name: grimoire-clarify
description: Resolve material ambiguity while preserving progress through explicit, reversible assumptions.
---

# Purpose

Resolve only the uncertainties that could materially change behavior, public interfaces, architecture, cost, or irreversible decisions. Preserve momentum by making explicit, reversible assumptions for low-risk details.

# Design tree

A tree of material decisions. Each node is a question whose answer can change the chosen approach. Frontier nodes are unanswered, unblocked decisions that are ready to resolve.

# Loop

Repeat until no blocking frontier remains:

1. **Calculate frontier** — collect unanswered decisions whose answers could materially change the work. Drop questions that can be handled by a safe, reversible assumption.
2. **Resolve facts directly** — use repository and environment tools for targeted facts. Dispatch a sub-agent only when discovery spans multiple modules, requires independent research, or would overload the current context.
3. **Present decisions** — group related questions. For each, recommend an answer, explain the consequence, and mark whether work is blocked without it.
4. **Collect answers or proceed** — wait only for blocking decisions. For non-blocking decisions, state the assumption and continue unless the user overrides it.
5. **Reshape** — add child decisions only when the answer exposes another material choice. Do not recursively expand low-stakes details.
6. **Repeat** — recalculate the frontier. Close when no blocking decisions remain.

# Close

Summarize the decisions and explicit assumptions. Request confirmation only when unresolved choices are irreversible or high-impact; otherwise proceed with the stated assumptions and invite corrections.

Completion: No material blocking decisions remain; assumptions and unresolved risks are explicit.

# Rules

- Prefer zero or one clarification round for small, reversible work.
- Use additional rounds only while material blocking decisions remain; five rounds is a warning to narrow scope, not a target.
- Look up verifiable facts directly when a targeted tool call is sufficient.
- Continue useful, reversible work while non-blocking questions or delegated research are pending.
- The user has final authority, but the model may recommend and act on clearly stated low-risk assumptions.
