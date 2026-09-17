# Large-scale simplification patterns

## Decompose god files without distributing a god object

Read the entire relevant implementation, then group functions by data used, invariant, lifecycle, callers, and change reason. Extract cohesive groups with explicit inputs and outputs; keep state with the code that owns it. Preserve the established architectural boundary and any public import path that is part of the contract.

A useful split lets a reader understand one responsibility without the rest of the former file. A bad split passes the entire old context to every new file, adds cycles, exposes formerly private mutation, or inserts forwarding classes for every operation. File length is a clue, not a mandate to split every 500 lines. Measure responsibility concentration and navigation cost as well as maximum file size. Structural boundary changes need the appropriate authorization, not silent reclassification as cleanup.

## Consolidate semantic duplicates

Search across packages and naming variants for equivalent normalization, validation, parsing, mapping, retry, error translation, and routing policy. Compare inputs, outputs, exceptions, side effects, and order before merging. Similar syntax is insufficient when business rules evolve independently.

Choose the nearest stable common owner: a feature-local helper for feature policy, a domain module for domain rules, or a dependency-neutral package for genuinely shared primitives. Reuse an existing suitable helper first. Set its contract and tests, migrate all intended consumers, then delete obsolete copies and imports. Include helper additions and caller changes in the net LOC calculation.

Reject a universal helper needing unrelated mode flags, callback hooks, feature imports, or an options object that reproduces every old branch. Retain intentional duplication when merging would create wrong coupling, with evidence. Keep meaningful one-use functions that name dense logic or isolate resource/security boundaries.

## Flatten routing while preserving precedence

Write down the original decision order and error/side-effect behavior. Prefer guard clauses for invalid/terminal cases, then keep the main path sequential. Merge equal branch bodies after normalizing genuinely equivalent inputs. Use switch/match for a finite discriminant; use a dispatch table only for true key-to-handler selection with explicit unknown-key behavior. Do not replace a few clear branches with a routing engine or nested ternaries.

Example (assuming calls below are synchronous):

```ts
// Before
if (user) {
  if (user.active) {
    if (canEdit(user, item)) {
      return save(item);
    } else {
      return forbidden();
    }
  } else {
    return inactive();
  }
} else {
  return unauthenticated();
}

// After: same evaluation and error precedence
if (!user) return unauthenticated();
if (!user.active) return inactive();
if (!canEdit(user, item)) return forbidden();
return save(item);
```

Test overlapping conditions, first-match rules, unknown keys, null/empty input, and thrown errors. Preserve short-circuit evaluation, cleanup/finally, transaction boundaries, and async sequencing. Extracting conditions into eager variables can accidentally execute work the original skipped.

## Delete with reachability evidence

“No grep callers” is not proof of dead code. Inspect public exports, reflection, DI containers, string-based registration, configuration, templates, scripts, plugin discovery, platform/build variants, and external compatibility commitments. Use compiler/static analysis plus targeted runtime or contract tests where needed. If reachability is uncertain, investigate or retain with a reason; do not manufacture savings.

After a migration, remove the complete obsolete path: implementation, private adapters, registrations, feature flags no longer used, fixtures tied only to deleted internals, imports, and unused direct dependencies. Keep externally required compatibility until removal is authorized. Verify lockfile/build changes using project tooling rather than deleting transitive entries by hand.

## Explain connections, not just filenames

For changed modules, make the entry point, policy, state owner, effects, and dependency direction discoverable in names and layout. Add short navigation documentation when needed; avoid redundant prose narrating obvious code. Compare before/after explanations of a representative path. More files are acceptable only when readers can follow responsibilities more directly, not because a size chart looks better.
