# Boundary tradeoffs

Use before adding a shared or general-purpose component, or when a changed boundary needs explicit design reasoning.

- Group state by shared invariants and lifecycle, not a one-responsibility-per-method rule. Split where independent ownership or change drivers create real coupling.
- Dependency cycles are not uniformly forbidden: graphs, event loops, and parent/child models may need bidirectional links. Make ownership and cleanup explicit and preserve binding architecture constraints.
- Stable protocols, invariant enforcement, external isolation, and test substitution can justify abstraction with one implementation. Avoid wrappers that only rename concrete behavior.
- Types can prevent meaningful invalid states; do not encode every runtime validation rule into the type system.
- Public capabilities usually hide storage. Exposing internals for performance or platform constraints needs a documented tradeoff, not an automatic rejection.
- Prefer composition, but retain framework inheritance when it is the established contract. Verify coherent units rather than requiring every intermediate type to compile.

## Shared component decisions

Before adding a shared or general-purpose component, compare these alternatives by responsibility, contract, and current boundary value—not a fixed preference order:

- Extend an existing mechanism when the capability fits its responsibility and contract without importing application-specific policy or weakening its boundary.
- Compose existing capabilities at the application layer when the new behavior is application-specific policy, orchestration, or configuration.
- Add a general-purpose component when it owns a distinct responsibility with a clear contract and provides concrete boundary value, such as invariant enforcement, dependency inversion, or external isolation.

Do not use consumer count as a test of generality: one consumer does not disqualify a useful general-purpose component, and multiple consumers do not by themselves justify extracting one.
