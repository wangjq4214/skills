# Structural discovery lenses

Treat names, sizes, and implementation counts as search clues, not defects. A finding needs a current cost or violated boundary and affected consumers.

| Lens | Evidence to seek | Retain or avoid |
| --- | --- | --- |
| Responsibility / god objects | Disjoint state and method groups, independent lifecycles or change drivers, unrelated policy concentrated in one owner | A cohesive coordinator may legitimately span several operations. Do not scatter a god object through files sharing its entire context. |
| State ownership / encapsulation | Who owns each state transition and enforces its invariants? Look for competing writers, caller-maintained synchronization, or bypassed lifecycle/authorization rules | Public data and borrowed views can be valid contracts. Copying state is not automatically safer and may change identity or performance. |
| Method placement | Repeated foreign-state access creates coupling or forces exposure of internals | A function using one type need not become its method; preserve policy/mechanism separation and project conventions. |
| Expressive API / domain types | Ambiguous units, same-typed arguments swapped, repeated validation, invalid states propagated | Add types or named options only when they prevent concrete mistakes; avoid wrappers without invariants or semantic value. |
| Dependency direction | Does a dependency cross an ownership or policy boundary? Look for cycles with material consequences, volatile details leaking into stable policy, excessive fan-out | Direction follows actual ownership and change patterns, not a mandatory directory architecture. |
| Change locality | For a representative requirement or fix, how many modules must change, and why? Trace scattered policy and repeated co-changes; also check unrelated changes repeatedly touching one owner | Distinguish necessary cross-cutting work from leaked implementation knowledge. File counts and co-change frequency alone prove nothing. |
| Interface depth | What must a caller know beyond the contract? Look for exposed storage details, internal types, sequencing, or repeated orchestration nearly as complex as the implementation | A short signature is not necessarily simple. Judge complexity hidden from callers, not method count or implementation size. |
| Indirection cost / speculative abstraction | How many forwarding hops must a reader follow, and what does each hide or enforce? Look for layers adding concepts without boundary, isolation, test-substitution, or invariant value | One implementor is insufficient evidence. Retain adapters and interfaces serving a present testing, compatibility, or external-system boundary. |
| Cross-module reuse | Equivalent inputs, outputs, side effects, error/ordering semantics, and one stable semantic owner | Preserve intentionally different policies. Reject global utils buckets and flag-heavy universal helpers. |
| Control flow | Deep routing, repeated branch bodies, redundant conversions or state obscure decision order | Preserve short-circuiting, first-match/error precedence, cleanup, and async sequencing; avoid replacing clear branches with a routing framework. |

## Deep module judgment

A deep module hides substantial complexity behind a contract simpler than its implementation. Trace one real caller task: which decisions, state rules, and ordering details must the caller know? Prefer moving cohesive mechanisms and their invariants behind the owning boundary; split or consolidate only when that reduces caller knowledge. Do not deepen by absorbing unrelated policy or adding a facade over unchanged caller orchestration.

For a proposed split or consolidation, trace entry points, state ownership, callers, registration, and test boundaries. Compare before/after caller obligations, modules touched by the same representative change, and dependency hops. Identify what complexity becomes private and who enforces its invariants. Smaller files or fewer public methods alone do not establish an improvement.
