# Ticket template

Use for any coherent ticket shape, not only vertical slices. Omit empty sections.

```markdown
# Ticket title

**Ticket ID:** TNNNN
**Source:** Spec/issue paths or concise conversation contract.
**Status:** Todo

## Goal

Observable outcome, invariant, migration milestone, or enabling capability.

## Affected Surfaces

Only modules/contracts/data/operations this ticket changes, with important boundaries.

## Approach

Direction and likely integration points without freezing incidental implementation detail.

## Dependencies and Coordination

- **Blocked by:** Ticket and concrete reason, or none.
- **Blocks:** Ticket and concrete reason, or none.
- **Coordination risks:** Shared files/contracts and handling strategy.

## Acceptance

- [ ] Observable or executable criterion.

## Out of Scope

Meaningful exclusions.
```

“OAuth login” may need UI, callback, persistence, and E2E coverage. “Signed session codec” may need only library code and contract tests. “Backfill identifiers” may need migration, rollback, and operational evidence without UI. Each is valid when its outcome is coherent and independently verifiable.
