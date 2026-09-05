---
name: grimoire-refine
description: Discuss with the user to update project knowledge and refine requirements.
disable-model-invocation: true
---

# Purpose

Discuss with the user to update project knowledge and refine requirements.

# Workflow

## 1. Assess

Determine the minimum refinement needed for the current request:

- **Ready** — the goal and constraints are sufficient; no supporting skill load is required. Summarize working assumptions and recommend or continue direct execution.
- **Targeted clarification** — a few material decisions are unresolved; load grimoire-clarify and use only the relevant decision steps. Load grimoire-record only if durable knowledge emerges.
- **Full refinement** — multiple domains, irreversible decisions, or substantial ambiguity justify loading both grimoire-clarify and grimoire-record.

Completion: The refinement depth matches the task's uncertainty and risk.

---

## 2. Discuss

Resolve material uncertainties without turning the discussion into a mandatory ceremony. Use direct tools for targeted repository facts; use sub-agents for broad or independent research. Record durable domain knowledge or architectural decisions as they emerge, but do not record transient implementation details.

When the request becomes actionable, stop refining. If the user asked this skill only for discussion, do not execute the objective; otherwise hand off or continue according to the user's request.

Completion: Blocking uncertainty is resolved, assumptions are explicit, and qualifying durable knowledge is recorded.

---

## 3. Recommend next action

Choose the smallest workflow that manages the actual risk:

| Signal | Recommended path |
| --- | --- |
| Small, local, reversible change | implement directly → targeted verification |
| Well-understood multi-file change | lightweight plan → implement → targeted verification |
| Multiple interacting components or high-risk behavior | spec or plan → implement → full QA |
| Multiple independently deliverable outcomes | spec → optional slice → per-slice plan/implement |

State the recommendation with a concrete reason. The recommendation is guidance, not a gate: follow the user's requested action when it is safe and feasible.

Completion: The user receives an appropriately scaled next action, or execution continues when already requested.

---

# Rules

- Load only the supporting skills needed for the chosen refinement depth.
- Record durable knowledge as it becomes clear; do not interrupt the user for low-value documentation.
- Ask the user only about material choices or facts unavailable through tools.
- Do not keep refining after the request is actionable.
- Recommend the smallest workflow that adequately manages risk.
