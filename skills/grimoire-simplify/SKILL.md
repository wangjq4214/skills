---
name: grimoire-simplify
description: Simplify existing code without changing behavior or architectural boundaries by deleting, flattening, collapsing, and clarifying accidental complexity.
disable-model-invocation: true
---

# Purpose

Express the same logic with fewer concepts, states, branches, indirections, and dependencies while preserving behavior and existing architectural boundaries.

# Scope

This skill controls surgical simplification of an existing implementation within its current architecture.

Outside scope: changing observable behavior or public APIs, redesigning module responsibilities, adding architectural layers or domain abstractions, and broadly reversing dependency direction. Use `grimoire-improve` when the structure itself should be questioned.

Invocation: user-invoked because simplification intentionally modifies existing code and should begin only on explicit request.

# Leading words

- **behavior contract** — observable behavior, public API, error semantics, concurrency semantics, ownership or lifetime guarantees, and important characteristics of performance-sensitive paths
- **understanding path** — concepts, states, branches, representations, types, files, and calls required to explain the target logic
- **subtraction order** — `Delete > Inline > Merge > Rename > Extract > Introduce abstraction`
- **justified abstraction** — an abstraction that hides real complexity, enforces an invariant, provides actual substitutability, or forms a necessary boundary

# Workflow

## 1. Establish the contract

Read the target code, its callers, and relevant tests. Record the behavior contract and the architectural boundaries containing the change. Run the narrowest relevant validation to capture the baseline; record pre-existing failures.

Completion: The behavior contract, in-scope boundaries, validation command, and baseline result are explicit.

---

## 2. Trace the understanding path

Trace the target logic end to end. Identify:

- concepts and temporary representations
- mutable or duplicated states
- branches and special cases
- wrappers, helpers, interfaces, and conversion chains
- dependencies and file or call-chain hops

Prioritize candidates that remove forwarding wrappers, one-use helpers, single-implementation traits or interfaces, wrappers without invariants, redundant conversions, or duplicated state. See [references/candidate-guide.md](./references/candidate-guide.md) when a candidate's value is uncertain.

Completion: Each candidate names the complexity it removes and the behavior or boundary it must preserve.

---

## 3. Choose the smallest simplification

Evaluate candidates in subtraction order:

1. Delete unused or redundant code.
2. Inline indirection that hides no useful complexity.
3. Merge duplicated state, branches, or representations.
4. Rename only when naming is the remaining source of confusion.
5. Extract only when it shortens the understanding path.
6. Introduce an abstraction only when it is justified.

Rank outcomes by: fewer concepts, fewer states, fewer branches, fewer indirections, fewer dependencies, then fewer lines. Consult [references/examples.md](./references/examples.md) when comparing before/after transformations.

Reject a candidate when it changes the behavior contract, crosses an architectural boundary, or merely exchanges one abstraction for an equally complex one.

Completion: The selected change or coherent set of changes uses the highest available operations in subtraction order and has an explicit reason it reduces the understanding path.

---

## 4. Apply a coherent change

Implement the selected simplification as the smallest coherent change. Preserve existing public surfaces and dependency direction. Remove code made unreachable or redundant by the change.

Completion: The target logic remains complete, and no obsolete helper, state, conversion, import, or dependency introduced by the old path remains.

---

## 5. Verify preservation

Run the baseline validation and any focused checks needed for the behavior contract. Compare results with the baseline. Inspect guarantees that tests may not prove directly, especially errors, concurrency, ownership or lifetime, and performance-sensitive behavior.

Completion: Validation has no new failures, and every behavior-contract item is confirmed preserved or the change is reverted.

---

## 6. Verify simplification and stop

Explain the result using the concepts required after the change and compare it with the original understanding path. Keep the change only when the explanation requires fewer concepts without hiding complexity. Repeat steps 3–5 while another in-scope candidate passes this test.

Stop when the next change would be:

- a stylistic preference
- an equally complex abstraction swap
- preparation for a hypothetical future need
- line-count reduction without concept reduction
- architectural redesign

Completion: The retained implementation has a shorter understanding path, and every remaining candidate meets a stop condition or lies outside scope.

---

# Final response

Report:

- what was deleted, flattened, collapsed, or clarified
- which behavior and boundaries were preserved
- validation commands and results
- why further simplification stopped

# Rule

**Delete. Flatten. Collapse. Clarify. Preserve.**

# References

- [candidate-guide.md](./references/candidate-guide.md) — retention tests, common candidates, and hidden-contract checks
- [examples.md](./references/examples.md) — before/after transformations and stop decisions
