# Simplification Candidate Guide

Load this reference when an indirection or representation may carry hidden value.

## Retention test

Keep an abstraction when removing it would lose at least one of these properties:

| Property | Evidence |
| --- | --- |
| Hides real complexity | Callers avoid protocol, algorithm, platform, or integration details that otherwise spread outward. |
| Enforces an invariant | Invalid states or operations are prevented at the boundary. |
| Provides substitutability | Multiple implementations are used now, or replacement is an explicit tested requirement. |
| Forms a necessary boundary | Ownership, lifecycle, process, persistence, security, or external-system concerns are isolated. |

A name, wrapper, or interface alone is not evidence. Verify the property in current code or requirements.

## Common candidates

### Forwarding wrapper

Inline when it only forwards arguments and preserves no policy, invariant, lifecycle, or boundary.

### One-use helper

Inline when local reading becomes sequential and no independently meaningful operation is lost. Keep it when it names a dense algorithm or isolates a necessary boundary.

### Single-implementation interface or trait

Collapse when there is no current substitutability requirement and the interface does not establish a necessary boundary.

### Wrapper type without an invariant

Collapse when it neither restricts construction nor owns behavior, lifecycle, serialization, or compatibility concerns.

### Conversion chain

Collapse adjacent representations when intermediate forms enforce no invariant and are not required by an external boundary.

### Duplicated state

Choose one source of truth when values can diverge. Derive secondary values at use time unless doing so would violate a measured performance characteristic.

### Repeated branches

Merge branches when their behavior is equivalent after inputs are normalized. Preserve distinct branches when their error, concurrency, ownership, or timing semantics differ.

## Hidden-contract checks

Before removing a candidate, check for:

- exception or error translation
- cleanup and resource release
- locking, atomicity, ordering, cancellation, or backpressure
- ownership transfer, borrowing, aliasing, or lifetime constraints
- serialization and compatibility behavior
- tracing, metrics, audit, authorization, or transaction boundaries
- allocation count, algorithmic complexity, batching, caching, and I/O round trips on sensitive paths

If a hidden contract exists, retain the boundary or preserve the contract explicitly in the simpler path.
