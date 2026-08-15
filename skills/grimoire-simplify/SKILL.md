---
name: grimoire-simplify
description: Make existing code easier to understand while preserving behavior, using deletion, flattening, consolidation, or bounded rewrites as appropriate.
disable-model-invocation: true
---

# Purpose

Make existing logic easier to understand by reducing concepts, states, branches, indirections, and dependencies while preserving its behavior contract.

# Scope

This skill controls behavior-preserving simplification, including coherent rewrites within the target's established responsibility and public boundary.

Outside scope: changing observable behavior or public APIs, moving responsibilities across architectural boundaries, introducing a new system architecture, or broadly reversing dependency direction. Internal structure is not a constraint: control flow, helpers, private types, representations, and file organization may be rewritten when the result is materially easier to understand. Use `grimoire-improve` when module responsibilities or system structure itself should be questioned.

Invocation: user-invoked because simplification intentionally modifies existing code and should begin only on explicit request.

# Leading words

- **behavior contract** — observable behavior, public API, error semantics, concurrency semantics, ownership or lifetime guarantees, and important characteristics of performance-sensitive paths
- **understanding path** — concepts, states, branches, representations, types, files, and calls required to explain the target logic
- **transformation scale** — the smallest scale that produces a coherent, materially clearer implementation: local edit, section rewrite, or bounded module rewrite
- **approval-required rewrite** — a section or bounded module rewrite that replaces the organizing shape of a coherent implementation path; local deletion, inlining, merging, renaming, and equivalent expression-level replacement do not qualify
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

## 3. Choose the clearest transformation

First consider subtractive operations:

1. Delete unused or redundant code.
2. Inline indirection that hides no useful complexity.
3. Merge duplicated state, branches, or representations.
4. Rename when naming is the remaining source of confusion.

Then compare those edits with a section or bounded module rewrite. Prefer the rewrite when incremental edits would preserve a confusing decomposition, require compatibility scaffolding for private details, or produce less direct control flow. A rewrite may replace private helpers, types, representations, and internal file organization; it need not preserve the old implementation shape.

Extract or introduce an abstraction only when it shortens the understanding path and is justified. Rank outcomes by: directness of control flow, fewer concepts, fewer states, fewer branches, fewer indirections, fewer dependencies, then fewer lines. Prefer familiar language constructs over custom machinery. Consult [references/examples.md](./references/examples.md) when comparing transformations.

Choose the transformation scale by clarity, not diff size. Reject a candidate when it changes the behavior contract, moves responsibility across an architectural boundary, or merely exchanges one abstraction for an equally complex one.

Completion: The selected local edit or rewrite has an explicit before/after understanding path and is the clearest coherent option considered.

---

## 4. Obtain rewrite approval

If the selected work contains any approval-required rewrite, make no code changes yet. Output a short approval checklist containing only the rewrites. For each rewrite, state:

- **target** — section or module to replace
- **reason** — confusion the rewrite removes
- **shape** — one-sentence description of the intended implementation
- **preserves** — behavior and public boundary that remain unchanged

Do not include local deletion, inlining, merging, renaming, import cleanup, or other incidental edits. Ask the user to approve, reject, or adjust the listed rewrites and stop until they respond. Approval of one checklist applies only to the listed targets and shapes; list newly discovered or materially expanded rewrites for separate approval.

If no approval-required rewrite is selected, do not emit a checklist and continue directly.

Completion: Every approval-required rewrite has explicit user approval, or the selected work contains only local edits.

---

## 5. Apply the transformation

Implement the approved simplification at its chosen transformation scale. Preserve the behavior contract, established responsibility, public surfaces, and system-level dependency direction—not the old private structure. When rewriting, replace the old path completely rather than layering the new path beside it. Remove code made unreachable or redundant by the change.

Completion: The target logic remains complete, the new path can be read without understanding the replaced design, and no obsolete helper, state, conversion, import, compatibility shim, or dependency remains.

---

## 6. Verify preservation

Run the baseline validation and any focused checks needed for the behavior contract. Compare results with the baseline. Inspect guarantees that tests may not prove directly, especially errors, concurrency, ownership or lifetime, and performance-sensitive behavior.

Completion: Validation has no new failures, and every behavior-contract item is confirmed preserved or the change is reverted.

---

## 7. Verify simplification and stop

Explain the result using the concepts required after the change and compare it with the original understanding path. Keep the change only when the explanation requires fewer concepts without hiding complexity. Repeat steps 3–6 while another in-scope candidate passes this test.

Stop when the next change would be:

- a stylistic preference
- an equally complex abstraction swap
- preparation for a hypothetical future need
- line-count reduction without concept reduction
- a rewrite that only changes style or vocabulary
- movement of responsibility across architectural boundaries

Completion: The retained implementation has a shorter understanding path, and every remaining candidate meets a stop condition or lies outside scope.

---

# Final response

Report:

- what was deleted, flattened, collapsed, clarified, or rewritten
- which approved rewrite checklist was implemented, when applicable
- which behavior and boundaries were preserved
- validation commands and results
- why further simplification stopped

# Rule

**Delete when possible. Rewrite when clearer. Preserve behavior.**

# References

- [candidate-guide.md](./references/candidate-guide.md) — retention tests, common candidates, and hidden-contract checks
- [examples.md](./references/examples.md) — before/after transformations and stop decisions
