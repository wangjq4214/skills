---
name: grimoire-test
description: Design, write, run, or diagnose tests for changed behavior, regressions, and important invariants.
---

Use the test boundary and structure that best expose the relevant failure, not a mandatory unit-test or AAA template.

Under orchestration, the caller's execution contract governs test design, authoring, execution, write scope, checkpoints, reporting, and completion. Apply only enabled responsibilities. Standalone, design, write, and run relevant tests unless the request narrows that scope. Authoring-only work must not execute tests; execution-only work must not author or repair them.

## Test selection

Identify observable behavior, stable invariants, material boundaries, failures, and state transitions. Reuse adequate existing coverage; do not add a test solely to produce an artifact.

Hard setup is a testability signal, not an automatic stop. Use useful characterization/integration tests where unit isolation would require scope-expanding production changes. Recommend refactoring rather than making unauthorized changes.

Use real collaborators when fast and deterministic. Use stubs for controlled values, mocks for contractual interactions, and fakes for reusable behavior. Isolate external resources in unit tests without doubling every in-process collaborator. Prefer the real system under test; document partial-mock compromises.

Prefer public outcomes, but allow focused internal assertions for characterization, complex invariants, or precise regressions when the coupling is worthwhile. Choose scenario, table-driven, property, state-machine, snapshot, concurrency, or framework-native structure as appropriate. Several assertions may describe one coherent scenario. Keep tests independently runnable and avoid accidental shared mutable state.

For dependency or structure choices needing examples, read [patterns.md](./references/patterns.md) and [examples.md](./references/examples.md). For the rationale behind these tradeoffs, see [principles.md](./references/principles.md).

## Execution and evidence

When execution is enabled, run the narrowest useful command during iteration, then the broader affected suite when authorized and practical. Fix test defects only within write permissions; report product defects rather than silently changing intended behavior. Distinguish baseline failures, new failures, and unavailable infrastructure.

Return test paths and covered contracts, source snapshot, commands/working directories/results, changed files, and skipped/unavailable checks when reporting is enabled. A command that found zero relevant tests is not a passing behavior check. Evidence from an older or different tree cannot establish current success without checking applicability.

Complete when selected responsibilities have results or explicit limitations. Unrun tests are authored, not passing. Do not mark the whole change accepted or modify shared orchestration status.

For refactoring or batch assignments, read [batch-context.md](./references/batch-context.md) for baseline characterization, integrated-tree validation, and collision avoidance.
