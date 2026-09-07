---
name: grimoire-refine
description: Resolve requirements and coordinate the appropriate spec, slice, and planning handoffs.
disable-model-invocation: true
---

# Purpose

Turn discussion into actionable intent and coordinate the next appropriate specialist. Refine owns clarification and routing, not a parallel spec-writing or ticket-generation method.

# Skill composition

Default delivery route: **refine → spec → slice → plan → loop**. This is a map of responsibilities, not a requirement to create every artifact.

Use skills for work being performed now, not merely because they appear later in the delivery route:

| Current work                               | Skill to use when needed |
| ------------------------------------------ | ------------------------ |
| Resolve material ambiguity                 | `grimoire-clarify`       |
| Capture durable terminology or decisions   | `grimoire-record`        |
| Produce or revise an authorized spec       | `grimoire-spec`          |
| Produce or revise an authorized ticket set | `grimoire-slice`         |

Use the selected skill by name when its work begins. Discussing requirements does not require spec or slice, and recommending a next step does not require loading it. `grimoire-plan`, `grimoire-loop`, and `grimoire-implement` are possible follow-up workflows, not dependencies of refinement.

A handoff carries resolved intent, constraints, acceptance criteria, relevant artifact paths, unresolved assumptions, and authorization limits. Discussion-only requests end with a recommendation. If further work is already authorized, continue with the next applicable skill when refinement is complete, within that scope and the host's invocation rules; no repeated approval is needed solely for crossing a skill boundary. If a needed skill is unavailable, disclose the limitation and any fallback.

# Workflow

## 1. Assess

Determine the minimum refinement needed for the current request:

- **Ready** — the goal and constraints are sufficient; skip clarification and route to the requested work.
- **Targeted clarification** — a few material decisions are unresolved; use grimoire-clarify at the relevant depth. Use grimoire-record only if durable knowledge emerges.
- **Full refinement** — multiple domains, irreversible decisions, or substantial ambiguity justify both clarify and record.

Completion: Refinement depth and the boundary of authorized work are explicit.

---

## 2. Discuss

Resolve material uncertainties without turning the discussion into a mandatory ceremony. Use direct tools for targeted repository facts; use sub-agents for broad or independent research. Record durable domain knowledge or architectural decisions through grimoire-record as they emerge, but do not record transient implementation details.

Stop refining when the request becomes actionable. Capture outcomes, constraints, and observable acceptance criteria compactly enough for the next skill; this handoff summary is not a substitute for a requested spec or ticket set.

Completion: Blocking uncertainty is resolved, assumptions are explicit, and qualifying durable knowledge is recorded within authorized scope.

---

## 3. Select the delivery route

Start with the default route and omit stages that add no decision or verification value:

| Signal                                                          | Default path                                                               |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Small, local, reversible change                                 | implement with targeted verification; loop if iterative QA was requested   |
| Clear single outcome with material design choices               | plan → loop                                                                |
| Cross-system or high-risk requirement needing a shared contract | spec → plan when useful → loop                                             |
| Multiple independently deliverable outcomes                     | spec → slice → per-ticket plan when useful → loop                          |
| Existing adequate spec or tickets                               | enter at the next needed stage; reuse the source rather than regenerate it |
| Explicit ticket request with clear, bounded requirements        | slice directly; spec only if a requirement contract is missing and useful  |

The model may combine passes, change order, or return upstream when new evidence changes assumptions. Preserve user-requested artifacts and essential verification; skip ceremony, not responsibilities. Briefly explain material departures, such as omitting a spec because an existing source already captures the contract.

Completion: The selected route has a concrete reason, avoids redundant artifacts, and covers the requested outcome.

---

## 4. Hand off or continue

Recommend the next useful action and its expected result without loading its skill just to make the recommendation. If the request includes writing a spec or ticket set, use grimoire-spec or grimoire-slice respectively instead of creating a parallel method inside refine.

When refinement is complete, hand off to planning or implementation only if that further work is authorized. Carry forward intent and new evidence; revisit only affected decisions rather than restarting the entire route. Ask before changing approved scope or committing an irreversible decision.

Completion: Refinement is complete with the requested requirement artifacts, if any, and an actionable next step. Any authorized follow-up begins as the next workflow, not as a prerequisite for finishing refine.

---

# Rules

- Default to specialist composition; adapt depth, order, and artifacts to the task.
- Load only skills and references needed for current work; a recommended route is not a preload list.
- Ask only about material choices or facts unavailable through tools.
- Do not keep refining after the request is actionable.
- A handoff preserves intent and evidence, not a frozen implementation prescription.
