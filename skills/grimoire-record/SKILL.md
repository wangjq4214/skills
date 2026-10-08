---
name: grimoire-record
description: Use when a conversation establishes or corrects project terminology, domain relationships, or durable architectural decisions, or when asked to preserve that knowledge in context files or ADRs. Not for ordinary task requirements or progress logs.
---

# What to record

Write only `.grimoire/CONTEXT.md`, its indexed `CONTEXT-[domain].md` files, and `adr/`. Do not bootstrap the store, interview the user, or write specs/tickets.

Record project-specific definitions, aliases, relationships, and consequential durable architectural choices or constraints whose rationale helps future work. Skip transient details, speculation, unconfirmed assumptions, trivial defaults, and information already clear from code. Ordinary requirements belong in the task contract, not automatically in this knowledge store.

Read existing relevant entries before writing. Resolve factual conflicts from evidence; return material unresolved conflicts to the user or coordinator instead of inventing knowledge.

Before qualifying writes, verify a knowledge store exists: an artifact-only `.grimoire/` is not initialization. If absent, report that `grimoire-init` is needed to establish CONTEXT/ADR; do not bootstrap it through recording. Create missing target files/directories only within authorized maintenance of an existing store. When writes are restricted, report qualifying pending items, not a persistence claim.

Batch related settled updates within each user turn. Under `grimoire-refine`, process the coordinator's qualifying batch before a user-turn pause or artifact handoff; return changed paths, concrete skip reasons, or pending items. Reuse relevant reads unless sources changed or conflicts require rechecking. Do not independently settle decisions or launch clarification.

# Domain context

Read `CONTEXT.md` and relevant indexed files. Match by name and synonym; reuse matching entries and update changed definitions rather than append duplicates.

Use this entry shape; omit absent fields:

```markdown
### Concept
- **Definition:** Concise project-specific meaning.
- **Synonyms:** Alias, OtherAlias
- **Relationships:**
  - references OtherConcept
```

Relationship verbs: `depends on`, `contains`, `references`, `implements`, `extends`, `communicates with`, `belongs to`. Read [context-template.md](./references/context-template.md) when choosing relationship semantics or splitting domains.

Keep definitions complete without arbitrary sentence limits. Split files only when domain grouping or navigation benefits; move rather than duplicate entries and index every domain file in `CONTEXT.md`. Update index counts and affected synonyms/relationships after edits or moves. Corrections, merges, deprecation, and removal are allowed; summarize destructive changes and repair references.

# Architectural decisions

Use ADRs for consequential durable choices, including boundaries, security/operational constraints, strong technology commitments, and meaningful rejected alternatives. Switching cost is a signal, not a requirement. Do not record experiments that have not committed the project, routine library defaults, or mere concept definitions.

Read relevant ADRs to avoid duplication. New records use the next unused `NNNN-title-with-dashes.md` in `adr/`. Read [adr-template.md](./references/adr-template.md) when creating a record or changing status; it defines metadata, sections, and lifecycle. Default to `Proposed` unless actual progress is established. Record known rationale/alternatives only; do not invent them to fill the template.

Preserve decision history:
- A changed decision needs a new superseding ADR with links in both directions.
- Correct factual errors or unclear wording in place only when the decision is unchanged; add a dated correction note.
- Merge duplicates under one canonical record and mark the others `Superseded` with links.
- Delete only records created in error with no historical value; summarize deletion and leave a correction note when future readers need it.

# Completion

Read back entries or inspect diffs. Qualifying knowledge is recorded or has a concrete skip/block reason; context entries remain reachable and consistent, ADR metadata and history links are valid, and only authorized knowledge-store paths changed.
