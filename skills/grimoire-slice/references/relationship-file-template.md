# Relationship File Template

The relationship file (`README.md`) is the entry point for a ticket folder. It describes the overall feature, maps dependencies between tickets, and provides an index of all sub-tickets.

## Template

```markdown
# [Feature Title]

**Source:** [Spec: NNNN-title-with-dashes.md](../spec/NNNN-title-with-dashes.md) | Conversation
**Ticket folder:** `.grimoire/ticket/NNNN-title/`

## Overview

[2–4 sentences summarizing the feature. If from a spec, summarize the spec. If from conversation, distill the user's goal and constraints. Enough context that a reader understands what the tickets collectively build.]

## Layers

The project's architectural layers (confirmed during decomposition):

1. **[layer-1]** — [what this layer concerns]
2. **[layer-2]** — [what this layer concerns]
3. ...

Every ticket cuts through all confirmed layers.

## Dependency Graph

### Blocking relationships

| Ticket | Blocks     | Reason                                                   |
| ------ | ---------- | -------------------------------------------------------- |
| T0001  | T0002, T0003, T0004, T0005 | Foundation must exist before any slice |
| T0002  | T0003, T0005 | Error handling extends the happy path                   |
| T0002  | T0004      | Refresh depends on token issuance from happy path        |
| T0003  | —          |                                                          |
| T0004  | —          |                                                          |
| T0005  | —          |                                                          |

### Parallel groups

Tickets in the same group can be worked on simultaneously — they share no files and no runtime contracts.

| Group | Tickets              | Reason                            |
| ----- | -------------------- | --------------------------------- |
| A     | T0003, T0005         | Touch different modules, no shared files |
| B     | T0004                | Depends on T0002                  |

## Recommended Order

1. T0001 — Foundation (pre-refactoring)
2. T0002 — Happy path
3. T0003 and T0005 — Error handling and cleanup (parallel)
4. T0004 — Token refresh

## Ticket Index

| Ticket ID | File                              | Title                       | Summary                                        |
| --------- | --------------------------------- | --------------------------- | ---------------------------------------------- |
| T0001     | [T0001-foundation.md](./T0001-foundation.md)        | Foundation  | Shared types, utilities, config, skeleton |
| T0002     | [T0002-happy-path.md](./T0002-happy-path.md) | Happy Path   | Core scenario from input to observable outcome |
| T0003     | [T0003-error-handling.md](./T0003-error-handling.md)  | Error Handling       | Graceful error paths and user feedback |
| T0004     | [T0004-token-refresh.md](./T0004-token-refresh.md)         | Token Refresh               | Silent refresh of expired credentials |
| T0005     | [T0005-cleanup.md](./T0005-cleanup.md)              | Cleanup                      | Session teardown, resource release |
```

---

## Rules

### Dependency graph

- The graph must be acyclic. Circular dependencies indicate tickets that should be merged.
- Every blocking relationship must have a reason. Example: "T0001 blocks T0002 because T0002 imports shared types from T0001."
- A ticket with no blockers is either pre-refactoring or has all its dependencies satisfied by pre-refactoring.

### Parallel groups

- Only declare parallel when there is zero file overlap AND zero runtime contract overlap.
- If uncertain, default to sequential (blocking). False parallelism causes merge conflicts. False blocking only costs time.
- Reference the reason: what mechanism ensures no overlap?

### Ticket Index

- Every sub-ticket file in the folder must appear in the index.
- Every index entry must have a working relative link to the ticket file.
- The summary is one line — enough to understand the ticket without opening it.

### Recommended order

- Must respect the dependency graph. No ticket appears before its blockers.
- Parallel groups are listed together on one line.
- The order is a recommendation, not a constraint. The dependency graph is authoritative.

---

## Anti-patterns

### Missing blocking reasons

Bad:
```
| T0001 | T0002, T0003 | — |
```

Good: every blocking relationship has a reason.

### Phantom tickets in graph

Bad: the graph references T0006 but no T0006.md exists and it's not in the index.

Good: every ticket ID in the graph maps to a file in the index.

### Circular dependency

Bad:
```
T0002 blocks T0003
T0003 blocks T0002
```

Good: merge T0002 and T0003 into one ticket, or identify the true dependency direction.

### All sequential with no parallel

Bad: every ticket blocks the next. No parallel groups identified when actually independent work exists.

Good: identify genuine parallelism. Two tickets that touch different modules and different files should be parallel.

### Forced parallelism

Bad: declaring tickets parallel when they touch the same shared module or contract.

Good: if two tickets both modify the same file or interface, they are NOT parallel.
