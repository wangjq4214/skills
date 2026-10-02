# Ticket-set README

```markdown
# Feature title

**Source:** Spec/issue paths or concise conversation contract.
**Ticket folder:** .grimoire/ticket/NNNN-title/

## Overview

Collective outcomes and important constraints.

## Delivery Surfaces

Modules, contracts, data, UI, operations, or documentation touched across the set.

## Dependencies

| Producer | Consumer | Why consumer cannot proceed first |
| --- | --- | --- |
| T0001 | T0003 | Required migration must be verified before consumer rollout |

## Coordination

| Tickets | Risk | Strategy |
| --- | --- | --- |
| T0002, T0004 | Shared file | Separate ownership or sequence edits |

## Recommended Order

Order consistent with proven blockers; identify parallel candidates and their coordination needs.

## Ticket Index

| Ticket | File | Outcome |
| --- | --- | --- |
| T0001 | [T0001-name.md](./T0001-name.md) | Coherent outcome |
```

Omit empty sections. Every ticket must appear in the index; recommended order is guidance, not a new source of blocking edges.
