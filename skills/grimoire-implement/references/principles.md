# Design Principles

Use these principles as design prompts. Apply only those relevant to the change and allow exceptions when repository constraints or a clearer tradeoff justify them.

---

## 1. Structure by lifecycle

Prefer grouping state with a shared lifecycle. Split state when independently created, updated, or destroyed behavior causes real coupling or invalid states. Do not create types solely to satisfy this heuristic.

## 2. Make ownership and dependency direction clear

Avoid accidental cycles and hidden ownership. Bidirectional collaboration can be valid for event loops, graph models, parent/child navigation, or framework lifecycles when ownership and cleanup are explicit.

## 3. Prefer composition for independent capabilities

Composition usually changes more safely than deep inheritance. Use inheritance or framework base types when they are the established contract and the coupling is intentional.

## 4. Abstract stable boundaries

Introduce an abstraction when it has present value: multiple implementations, test substitution, dependency inversion, external-system isolation, plugin protocol, platform boundary, or invariant enforcement. A single implementation is a review signal, not proof that the abstraction is wrong.

Avoid speculative interfaces that merely rename one concrete class without stabilizing a boundary.

## 5. Keep responsibilities coherent

A type may coordinate several closely related operations when they change for the same reason. Split only when responsibilities have independent lifecycles, audiences, invariants, or change drivers.

## 6. Separate resources, domain values, and logic when useful

Keep resource lifecycle code from obscuring business rules, but allow cohesive wrappers that enforce an important invariant across both.

## 7. Prevent meaningful invalid states

Use types to rule out high-impact invalid states when this improves clarity. Do not encode every input validation rule into the type system when runtime validation is simpler or required.

## 8. Design stable interfaces

Expose capabilities and contracts rather than incidental storage. Internal references or specialized methods are acceptable when performance or platform constraints require them and the tradeoff is documented.

---

## Decision shortcut

1. Identify the invariant and lifecycle.
2. Make ownership and dependency direction explicit.
3. Choose the simplest boundary that contains the risk.
4. Add abstraction only for present boundary value.
5. Record exceptions when the tradeoff is non-obvious.

The goal is coherent, adaptable code—not mechanical compliance with every principle.
