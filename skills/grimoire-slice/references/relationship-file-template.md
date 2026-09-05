# Relationship File Template

The relationship file (`README.md`) summarizes outcomes, affected surfaces, proven dependencies, coordination risks, and the ticket index.

## Default template

```markdown
# [Feature Title]

**Source:** [spec, issue, or conversation]
**Ticket folder:** `.grimoire/ticket/NNNN-title/`

## Overview

[What the ticket set collectively delivers and its important constraints.]

## Delivery Surfaces

[List the modules, layers, contracts, data, UI, operations, or documentation touched across the set. Individual tickets list only what they change.]

## Dependency Graph

| Ticket | Blocks | Concrete reason |
| --- | --- | --- |
| T0001 | T0003 | T0003 cannot compile or verify until the contract from T0001 exists |

## Coordination Risks

| Tickets | Risk | Strategy |
| --- | --- | --- |
| T0002, T0004 | Shared file or contract | Agree boundary, sequence edits, or merge changes before integration |

## Parallel Candidates

[List tickets with no semantic dependency. File overlap may require merge coordination without creating a blocking edge.]

## Recommended Order

[An efficient order consistent with proven blockers. This is guidance, not an additional dependency source.]

## Ticket Index

| Ticket | File | Outcome |
| --- | --- | --- |
| T0001 | [T0001-name.md](./T0001-name.md) | [coherent outcome] |
```

---

## Rules

- Every blocking relationship names what cannot be implemented or verified out of order.
- Shared files and contracts are coordination risks, not automatic blockers.
- Cycles trigger boundary review; merge only when it creates a coherent atomic ticket.
- Parallel work may overlap files when an explicit merge strategy makes it safe.
- Every ticket file appears in the index with a valid link.
- Recommended order follows dependencies but may optimize context, ownership, or integration cost.
