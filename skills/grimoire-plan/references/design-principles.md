# Boundary decisions

Use only for material design choices, not a dossier for every type.

Prefer the smallest coherent change, not necessarily the fewest changed files. Coupled edits may be atomic when splitting would create invalid intermediate states.

A new boundary earns its place through a current invariant, lifecycle, security boundary, external protocol, or change driver. Test substitution and dependency inversion can justify a single-implementation interface; predicted future variation alone does not.

Reuse is not automatically simpler: shared helpers that couple unrelated lifecycles may cost more than local logic. Document rejected alternatives only when the tradeoff is consequential. Established framework inheritance can be appropriate; composition is a preference, not a ban.
