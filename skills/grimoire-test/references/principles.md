# Testing Principles

## 1. Test stable behavior and meaningful invariants

Prefer caller-visible outcomes. Use focused internal assertions when they are the clearest boundary for characterization, concurrency invariants, or a precise regression, and document the coupling.

## 2. Keep tests deterministic and independently runnable

Avoid accidental ordering and shared mutable state. Shared immutable fixtures and controlled lifecycle helpers are acceptable when they improve clarity.

## 3. Choose the right boundary

Unit tests usually replace process-boundary resources such as network, clock, randomness, and external storage. Keep real in-process collaborators when they are fast, deterministic, and provide stronger confidence.

## 4. Cover risks, not a ritual list

Select normal, boundary, error, and transition cases that could fail differently. Do not enumerate categories that add no meaningful behavior coverage.

## 5. Treat testability as design evidence

Difficult testing may reveal coupling. Continue with a useful characterization or integration test when possible, and recommend refactoring in proportion to its production impact.

## 6. Optimize test readability and diagnostics

Use AAA, table-driven cases, properties, snapshots, state machines, or framework-native forms according to what communicates the behavior best. Names and failure output should reveal what broke.
