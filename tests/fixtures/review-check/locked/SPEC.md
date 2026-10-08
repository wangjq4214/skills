# Counter

R1. Every successful `increment()` contributes exactly one to the counter, including concurrent calls.
R2. `read()` returns the current count. Preserve the public API while adding an asynchronous pause inside increment.

Scope: one JavaScript isolate; only the returned methods access the private count. No shared memory or external callbacks are involved.
