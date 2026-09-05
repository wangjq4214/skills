# Vertical Slice Ticket Template

## Default template

```markdown
# [Ticket Title]

**Ticket ID:** TNNNN
**Source:** [spec, issue, or conversation]
**Status:** Todo

## Goal

[Coherent observable outcome, invariant, migration milestone, or enabling capability.]

## Affected Surfaces

[List only modules, architectural layers, contracts, data, UI, operations, or documentation this ticket changes.]

- **[surface]:** [specific change or boundary]

## Approach

[Implementation direction, material decisions, likely files, and integration points. Avoid keystroke-level scripting.]

## Dependencies and Coordination

- **Blocked by:** [ticket and concrete reason, or none]
- **Blocks:** [ticket and concrete reason, or none]
- **Coordination risks:** [shared files/contracts that may merge cleanly or require sequencing]

## Acceptance

- [ ] [Observable or executable criterion]

## Out of Scope

[Meaningful exclusions only; omit this section when none exist.]
```

---

## Usage guidance

- Rename or omit sections when another structure communicates the ticket better.
- A ticket does not need to list unaffected layers.
- Several tightly coupled outcomes may share one ticket when they form one safe atomic change.
- Enabling or migration tickets should explain how they are verified independently.
- Dependency statements require a concrete inability to implement or verify out of order.

## Brief examples

### Vertical value slice

`OAuth login happy path` may touch persistence, auth service, callback endpoint, UI, and E2E verification because those surfaces are required for the outcome.

### Enabling slice

`Introduce signed session codec` may touch only a library module and tests when several independent features consume the stable contract.

### Migration slice

`Backfill account identifiers` may consist of migration code, telemetry, rollback, and verification without a UI change.

All three shapes are valid when their boundaries and acceptance criteria are coherent.
