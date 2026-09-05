---
name: grimoire-test
description: Write proportionate tests using the structure and dependency strategy best suited to the behavior.
---

# Purpose

Increase confidence in behavior and important invariants with deterministic, maintainable tests. Unit tests are common, but integration, characterization, property, state-machine, snapshot, or concurrency tests may be better for some risks.

# Scope

This skill designs, writes, and runs tests relevant to the requested target. It follows project conventions and may recommend production refactoring without making scope-expanding changes unless authorized.

# Leading words

- **SUT** — system under test
- **test double** — mock, fake, or stub replacing a collaborator
- **behavior test** — test of an observable outcome or stable invariant
- **test boundary** — the real or doubled collaborators included in a test

# Workflow

## 1. Analyze the target

Identify behavior, stable invariants, dependencies, existing test conventions, and the failure modes that matter.

Output: target boundary and risk summary.

---

## 2. Check testability

Evaluate coupling, controllability, determinism, and observability. High setup cost or hard-coded dependencies are refactoring signals, not automatic stop conditions.

Proceed with the best valuable test that can be written safely. Ask before refactoring only when production changes alter design or exceed scope; otherwise use an appropriate seam and report limitations.

Output: testability assessment and chosen strategy.

---

## 3. Design cases

Select normal paths, material boundaries, failures, and state transitions by risk. A test may assert several facets of one coherent scenario when that improves diagnostics. Avoid combinatorial boilerplate with little confidence value.

Output: concise cases tied to risks or contracts.

---

## 4. Choose dependency strategy

Use real collaborators when fast and deterministic. Use stubs for controlled values, mocks for important interactions, and fakes for reusable behavior. Replace process-boundary resources in unit tests, but do not double every in-process dependency by default.

Output: justified real/doubled boundaries.

---

## 5. Write tests

Use Arrange → Act → Assert when it clarifies the scenario. Allow table-driven, property-based, state-machine, snapshot, concurrency, or framework-native structures when clearer.

Prefer public outcomes. Focused internal assertions are acceptable for characterization, complex invariants, or precise regressions when the coupling is documented and worthwhile. Keep tests deterministic and independently runnable.

Output: tests that maximize confidence without unnecessary ceremony.

---

## 6. Run and diagnose

Run the narrowest useful command during iteration. Fix test defects; report product defects rather than silently changing intended behavior. Finish with the broader affected suite when practical.

Output: passing relevant tests, or concrete failure evidence and blocker.

---

## 7. Verify

Confirm meaningful behavior/invariant coverage, useful failure diagnostics, appropriate boundaries, and freedom from accidental ordering or shared mutable state. Treat coverage as evidence, not the objective.

Output: verification result with remaining limitations.

---

# References

- [principles.md](./references/principles.md) — the six testing principles explained
- [patterns.md](./references/patterns.md) — AAA, naming conventions, test double decision guide
- [examples.md](./references/examples.md) — side-by-side good vs bad test examples
