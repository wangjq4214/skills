# Structural discovery lenses

Treat names, sizes, and implementation counts as search clues, not defects. A finding needs a current cost or violated boundary and affected consumers.

| Lens | Evidence to seek | Retain or avoid |
| --- | --- | --- |
| Responsibility / god objects | Disjoint state and method groups, independent lifecycles or change drivers, unrelated policy concentrated in one owner | A cohesive coordinator may legitimately span several operations. Do not scatter a god object through files sharing its entire context. |
| Encapsulation / leaked state | Callers can bypass a real invariant, lifecycle, authorization, or ownership rule | Public data and borrowed views can be valid contracts. Copying state is not automatically safer and may change identity or performance. |
| Method placement | Repeated foreign-state access creates coupling or forces exposure of internals | A function using one type need not become its method; preserve policy/mechanism separation and project conventions. |
| Expressive API / domain types | Ambiguous units, same-typed arguments swapped, repeated validation, invalid states propagated | Add types or named options only when they prevent concrete mistakes; avoid wrappers without invariants or semantic value. |
| Dependency direction | Cycles with material consequences, volatile details leaking into stable policy, excessive fan-out | Direction follows actual ownership and change patterns, not a mandatory directory architecture. |
| Change isolation | One policy duplicated across independently edited locations; unrelated changes repeatedly touch the same code | File counts alone prove nothing; a coherent cross-cutting change can legitimately span many files. |
| Speculative abstraction | Indirection adds concepts or maintenance without current boundary, isolation, test-substitution, or invariant value | One implementor is insufficient evidence. A present testing or external-system boundary justifies an interface. |
| Cross-module reuse | Equivalent inputs, outputs, side effects, error/ordering semantics, and one stable semantic owner | Preserve intentionally different policies. Reject global utils buckets and flag-heavy universal helpers. |
| Control flow | Deep routing, repeated branch bodies, redundant conversions or state obscure decision order | Preserve short-circuiting, first-match/error precedence, cleanup, and async sequencing; avoid replacing clear branches with a routing framework. |

For a proposed split or consolidation, trace entry points, state ownership, callers, registration, and test boundaries. Compare the before/after explanation and dependencies. Smaller files alone do not establish a structural improvement.
