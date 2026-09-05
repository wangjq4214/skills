---
name: grimoire-record
description: Record domain terminology and architectural decisions from conversations.
---

# Purpose

Watch the conversation for domain concepts and architectural decisions. Record them into the `.grimoire` knowledge store.

# Scope

This skill edits two areas under `.grimoire/`:

- `CONTEXT.md` — domain entities, definitions, synonyms, relationships
- `adr/` — architecture decision records

This skill does NOT:

- Bootstrap `.grimoire/` (use grimoire-init)
- Interrogate the user (use grimoire-clarify)
- Write `spec/` or `ticket/` files

Completion: Only CONTEXT.md and adr/ are modified by this skill.

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
- **Definition:** [one concise sentence]
- **Synonyms:** [alias1, alias2, ...] (omit if none)
- **Relationships:**
  - [verb] [target-concept] (omit if none)
```

Constraints:
- One sentence per definition. Split long definitions by creating sub-concepts.
- Synonyms list comma-separated aliases the user or codebase uses interchangeably.
- Relationship verbs: `depends on`, `contains`, `references`, `implements`, `extends`, `communicates with`, `belongs to`.

See [references/context-template.md](./references/context-template.md) for full template and examples.

## Adding a concept

1. Read the current `CONTEXT.md`.
2. Check: does this concept already exist (name or synonym match)?
   - If yes and the definition matches: skip.
   - If yes and the definition conflicts: flag to user, ask which definition is correct.
   - If no: append the new entry.
3. Update any existing entries whose relationships or synonyms reference this new concept.
4. If the entry count now exceeds 100, trigger [Entity Overflow Split](#entity-overflow-split).

Completion: New concept is present in CONTEXT.md. Cross-references updated. Entry count checked.

## Updating a concept

When the user refines a definition:

1. Locate the existing entry.
2. Replace the definition/synonyms/relationships with the refined version.
3. Check all entries that reference this concept — update if the relationship changed.

Completion: Old definition replaced. Dependent entries consistent.

## Entity Overflow Split

When CONTEXT.md exceeds 100 entries:

1. Group entries into larger domain categories (e.g., "Billing", "Auth", "Ordering").
2. For each domain with ≥5 entries, create `.grimoire/CONTEXT-[domain-slug].md`.
3. Move those entries into the domain file.
4. Replace entries in `CONTEXT.md` with a domain index table.

Index table format:

```markdown
## Domain Index

| Domain        | File                               | Entry Count |
| ------------- | ---------------------------------- | ----------- |
| [Domain Name] | [CONTEXT-xxx.md](./CONTEXT-xxx.md) | N           |
```

5. Entries that don't fit any domain (<5 per category) stay inline in CONTEXT.md under an "Uncategorized" section.

Completion: No single file exceeds 100 entries. CONTEXT.md contains the index. Every entry is reachable through the index.

---

# ADR Workflow

## When to write an ADR

Write an ADR only when a decision meets ALL of:

1. It has long-term consequences (reversing it costs a quarter or more).
2. A rational reader could have chosen differently — the decision was not obvious.
3. Multiple alternatives existed at the time.

Do NOT write an ADR for:
- Trivial or obvious defaults (e.g., "we use Git").
- Library choices with low switching cost.
- Decisions already captured in CONTEXT.md as concepts.
- Temporary or experimental choices that don't yet commit the project.

Completion: Every qualifying decision has an ADR. Every skipped decision can be justified by the exclusion criteria.

## ADR categories

Record decisions in these categories:

| Category              | Example triggers                                                                    |
| --------------------- | ----------------------------------------------------------------------------------- |
| Architecture pattern  | Monorepo vs polyrepo, event sourcing, CQRS, microservices vs monolith               |
| Integration pattern   | Domain events vs sync HTTP, shared DB vs API                                        |
| Strong tech binding   | Database, message bus, auth provider, deployment target — switching costs a quarter |
| Boundary definition   | "X belongs to Y context; others reference by ID only." Explicit NOT-dos.            |
| Intentional deviation | "We hand-write SQL instead of using an ORM because X."                              |
| Invisible constraint  | "Compliance forbids AWS." "Partner API requires <200ms response."                   |
| Rejected alternative  | "We chose REST over GraphQL because X." Record the rejected option.                 |

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
- ADRs record consequential decisions with real alternatives; low-cost library choices usually do not qualify.
- Preserve decision history through status, supersession links, and correction notes rather than blanket immutability.
- Prefer an accurate, maintainable knowledge base over append-only accumulation.
