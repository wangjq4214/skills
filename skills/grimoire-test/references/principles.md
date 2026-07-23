# Six Principles of Unit Testing

## 1. Test behavior, not implementation

Verify what the SUT produces for its caller — return values, thrown errors, observable side effects.

Do not assert on internal fields, private methods, or intermediate state. Those are implementation details that change without affecting correctness.

Internal refactoring should not break a behavior test.

## 2. Keep tests independent, simple, stable

Each test sets up its own fixture. No dependency on other tests. No ordering requirement. No shared mutable state.

A test that relies on another test's side effect will fail unpredictably.

## 3. Isolate dependencies

Replace every external resource — database, network, filesystem, clock, random — with a test double.

The SUT should never reach outside process boundaries in a unit test.

## 4. Cover key scenarios

Normal path validates the happy case. But the happy case alone gives false confidence.

Also cover:
- Boundary values (zero, empty, max, min)
- Null or undefined inputs
- Error propagation (what does the caller see on failure?)
- State transitions (for stateful SUTs)

## 5. Tests reflect design quality

A SUT that is hard to test signals a design problem:
- Too many dependencies → unclear boundaries
- Can't isolate → hidden coupling
- Giant setup → excessive responsibility

Do not work around these symptoms. Flag them.

## 6. Test code is maintainable

Tests are read far more than written. Use AAA structure. Name tests so the failure message tells what broke. Delete tests that exist only to raise coverage — they add maintenance cost without adding confidence.
