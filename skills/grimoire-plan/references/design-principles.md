# Design Principles

Use these principles as prompts for material boundary decisions. They are heuristics, not requirements for every type.

---

# Cohesion

Group behavior and state that share invariants, lifecycle, and reasons to change. A type may own several closely related operations; split only when independent change drivers or ownership make the boundary clearer.

# Extend or introduce a boundary

Extend an existing type when new behavior belongs to its current invariant and lifecycle. Introduce a new type, module, or function when it isolates a meaningful responsibility, stable contract, resource lifecycle, security boundary, or change pattern.

Independent existence, change, and testing are useful evidence—not mechanical pass/fail tests.

# Relationships

Prefer composition when it keeps ownership explicit. Interfaces and traits are justified by present boundary value such as substitution, dependency inversion, external isolation, plugins, or invariant enforcement; multiple implementations are not mandatory.

Inheritance or framework base classes may be appropriate when required by an established ecosystem contract.

# Minimal coherent change

Minimize unnecessary concepts and churn, not merely file count. A broader atomic change is preferable when it avoids invalid intermediate states, duplicate work, or fragile coordination.

Before introducing structure, ask:

- Which invariant or risk does this boundary contain?
- Does it reduce coupling or only rename it?
- Is there a simpler repository-native pattern?
- Can the change be verified coherently?

The goal is the smallest coherent design that preserves correctness and future changeability.
