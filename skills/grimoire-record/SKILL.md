---
name: grimoire-record
description: Record domain terminology and architectural decisions from conversations.
---

# Purpose

Watch the conversation for domain concepts and architectural decisions. Record them into the `.grimoire` knowledge store.

# Scope

This skill edits two areas under `.grimoire/`:

- `CONTEXT.md` and its indexed `CONTEXT-[domain].md` files — domain entities, definitions, synonyms, relationships
- `adr/` — architecture decision records

This skill does NOT:

- Bootstrap `.grimoire/` (use grimoire-init)
- Interrogate the user (use grimoire-clarify)
- Write `spec/` or `ticket/` files

Completion: Only CONTEXT.md, its indexed domain context files, and adr/ are modified by this skill.

---

# Trigger Detection

When this skill is active, scan for durable project knowledge:

- domain terms with project-specific meanings;
- aliases or relationships needed to interpret the codebase;
- consequential architectural decisions, constraints, and rejected alternatives.

Record only when persistence will improve future work. Skip transient implementation details, speculative ideas, and information already clear from code. Batch low-urgency updates so documentation does not interrupt the user's objective.

Completion: Durable qualifying knowledge is recorded or intentionally skipped without ceremony.
---

# CONTEXT.md Workflow

## Entry format

Every concept gets one entry:

```markdown
### [concept-name]
- **Definition:** [concise, unambiguous definition]
- **Synonyms:** [alias1, alias2, ...] (omit if none)
- **Relationships:**
  - [verb] [target-concept] (omit if none)
```

Constraints:
- Keep definitions concise and unambiguous; use additional sentences when needed. Split concepts for genuine domain distinctions, not sentence count.
- Synonyms list comma-separated aliases the user or codebase uses interchangeably.
- Relationship verbs: `depends on`, `contains`, `references`, `implements`, `extends`, `communicates with`, `belongs to`.

See [references/context-template.md](./references/context-template.md) for full template and examples.

## Adding a concept

1. Read the current `CONTEXT.md` and relevant indexed domain context files.
2. Check: does this concept already exist (name or synonym match)?
   - If yes and the definition matches: skip.
   - If yes and the definition conflicts: use repository evidence and context to resolve it; ask the user only if a material conflict remains.
   - If no: append the new entry to the appropriate context file.
3. Update any existing entries whose relationships or synonyms reference this new concept.
4. Assess whether file size, navigation difficulty, or coherent domain groupings would benefit from an [Entity Overflow Split](#entity-overflow-split).

Completion: New concept is present in CONTEXT.md or an indexed domain context file. Cross-references are updated and organization remains manageable.

## Updating a concept

When the user refines a definition:

1. Locate the existing entry.
2. Replace the definition/synonyms/relationships with the refined version.
3. Check all entries that reference this concept — update if the relationship changed.

Completion: Old definition replaced. Dependent entries consistent.

## Entity Overflow Split

Split when file size, navigation difficulty, or coherent domain groupings make separate files useful. Entry counts are signals, not mandatory thresholds.

1. Group entries into coherent domain categories (e.g., "Billing", "Auth", "Ordering").
2. For domains that benefit from separate navigation, create or reuse `.grimoire/CONTEXT-[domain-slug].md`.
3. Move those entries into the domain file, preserving existing entries.
4. Index each domain file in `CONTEXT.md` rather than duplicating moved entries.

Index table format:

```markdown
## Domain Index

| Domain        | File                               | Entry Count |
| ------------- | ---------------------------------- | ----------- |
| [Domain Name] | [CONTEXT-xxx.md](./CONTEXT-xxx.md) | N           |
```

5. Entries that do not benefit from a separate domain file stay inline in CONTEXT.md under a "Concepts" or "Uncategorized" section.

Completion: All entries are preserved and reachable from CONTEXT.md, inline or through its index. Organization is manageable without a hard entry cap.

---

# ADR Workflow

## When to write an ADR

Write an ADR for consequential, durable architectural decisions whose rationale, material alternatives, or constraints will help future readers understand the choice.

Consider effects on boundaries, operations, security, compliance, and future options. Switching cost is one signal of significance, not a prerequisite; a binding constraint can merit a record even when it leaves only one viable option.

Do NOT write an ADR for:
- Trivial or obvious defaults (e.g., "we use Git").
- Routine library choices without consequential tradeoffs or constraints.
- Concept definitions without a consequential decision to explain; an existing CONTEXT.md entry does not replace decision rationale.
- Temporary or experimental choices that don't yet commit the project.

Completion: Every qualifying decision has an ADR. Every skipped decision can be justified by the exclusion criteria.

## ADR categories

Record decisions in these categories:

| Category              | Example triggers                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Architecture pattern  | Monorepo vs polyrepo, event sourcing, CQRS, microservices vs monolith                              |
| Integration pattern   | Domain events vs sync HTTP, shared DB vs API                                                       |
| Strong tech binding   | Database, message bus, auth provider, deployment target — consequential commitments or constraints |
| Boundary definition   | "X belongs to Y context; others reference by ID only." Explicit NOT-dos.                           |
| Intentional deviation | "We hand-write SQL instead of using an ORM because X."                                             |
| Invisible constraint  | "Compliance forbids AWS." "Partner API requires <200ms response."                                  |
| Rejected alternative  | "We chose REST over GraphQL because X." Record the rejected option.                                |

## File format

Naming: `NNNN-title-with-dashes.md` (zero-padded, next available sequence number).

Template:

```markdown
# [Decision Title]

**Status:** [Proposed | Implementing | Testing | Completed | Deprecated | Superseded]
**Date:** YYYY-MM-DD

## Context

[1–2 sentences: what prompted this decision and what alternatives existed.]

## Decision

[1–2 sentences: what we chose and why.]

## Consequences

- [What this enables.]
- [What this constrains.]
- [What we must do because of this.]
```

See [references/adr-template.md](./references/adr-template.md) for full template and examples.

## Adding an ADR

1. Determine the next available sequence number (check existing adr/ files).
2. Create the file.
3. Set status to `Proposed` unless the user indicates otherwise.

Completion: ADR file exists with correct sequence number and valid frontmatter.

## Maintaining ADRs

ADRs preserve decision history while allowing explicit correction:

1. Update status as implementation progresses.
2. When a decision changes, create a superseding ADR and link both records.
3. Correct factual errors or ambiguous wording in place when the original decision is unchanged; add a dated correction note describing the edit.
4. Merge duplicate ADRs by choosing one canonical record and marking the others `Superseded` with links.
5. Delete an ADR only when it was created in error and has no historical decision value. Summarize the deletion in the user-facing result; when future readers need the correction, leave a note in the canonical ADR or context entry.

Do not silently rewrite history. Material changes to the decision require a new ADR rather than an in-place edit.

Completion: Current guidance is accurate and historical changes remain traceable.

---

# Pre-Flight Checks

Before writing, verify `.grimoire/` and create missing target files/directories only when the current user request authorizes knowledge-store maintenance. Otherwise explain what initialization is needed.

Completion: Target paths are available or the limitation is reported.

---

# Rules

- Keep definitions concise, but use additional sentences when needed to prevent ambiguity.
- Never invent definitions; ask only when repository evidence and context cannot resolve a material conflict.
- CONTEXT entries may be corrected, merged, moved, deprecated, or removed when obsolete or wrong; update references and summarize destructive changes.
- ADRs record consequential, durable decisions with material alternatives or constraints; switching cost alone does not determine whether a decision qualifies.
- Preserve decision history through status, supersession links, and correction notes rather than blanket immutability.
- Prefer an accurate, maintainable knowledge base over append-only accumulation.
