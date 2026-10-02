# Boundary tradeoffs

Use only when a changed boundary needs explicit design reasoning.

- Group state by shared invariants and lifecycle, not a one-responsibility-per-method rule. Split where independent ownership or change drivers create real coupling.
- Dependency cycles are not uniformly forbidden: graphs, event loops, and parent/child models may need bidirectional links. Make ownership and cleanup explicit and preserve binding architecture constraints.
- Stable protocols, invariant enforcement, external isolation, and test substitution can justify abstraction with one implementation. Avoid wrappers that only rename concrete behavior.
- Types can prevent meaningful invalid states; do not encode every runtime validation rule into the type system.
- Public capabilities usually hide storage. Exposing internals for performance or platform constraints needs a documented tradeoff, not an automatic rejection.
- Prefer composition, but retain framework inheritance when it is the established contract. Verify coherent units rather than requiring every intermediate type to compile.
