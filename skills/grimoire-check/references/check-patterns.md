# Check Patterns

Examples for step 4, governed by the main skill's classification rule. Treat plan details as requirements only when supported by intent, acceptance criteria, or applicable constraints.

---

## Match

An outcome is a **match** when code and relevant verification evidence establish the required behavior and constraints.

Behavior match is sufficient — the code need not be textually identical to pseudo-code.

### Examples

Intent requires order validation to reject a null status.
Code checks that status is non-null, and relevant checks confirm the caller handles validation failure as required.

→ **match**. A different return type is acceptable only when it preserves the required contract and behavior.

Plan says: "Create class `PaymentGateway` implementing `IPaymentProcessor`."
Code has: `class PaymentGateway implements IPaymentProcessor { ... }`.

→ Structural evidence for the planned boundary, not proof of completion by itself. Inspect the implementation and relevant checks before classifying the required processing behavior.

### Edge case: partial match

Plan says: "Add method `process` with validation, transformation, and persistence steps."
Code has: method `process` with only validation and persistence steps, no transformation.

→ If the required transformation is absent across the relevant path, record a **gap** for that behavior. If it occurs through an equivalent mechanism, assess that mechanism; omitting a planned intermediate step alone does not establish missing behavior.

---

## Gap

A required outcome is a **gap** when available evidence shows its behavior or binding contract is missing. A planned filename, field, or helper is not itself a requirement unless the source makes it one.

### Examples

Plan says: "Create file `src/services/notifier.ts`."
File does not exist on disk.

→ Inspect where notification behavior lives. Missing required notifications are a **gap**; equivalent behavior elsewhere is a defensible design deviation unless the path itself is a binding contract.

Plan says: "Add field `retryCount: number` to type `ConnectionConfig`."
Code has no `retryCount` field.

→ **gap** if this field is a required public configuration contract. If retry behavior is configured through an equivalent permitted mechanism, assess that evidence rather than the field name alone.

Plan says: "Add error handling for timeout in `fetchData`."
Neither `fetchData` nor its callers/middleware provide the required timeout behavior.

→ **gap**. Required error handling is absent, not merely located elsewhere.

### Not a gap

Plan says: "Use a builder pattern for `Query`."
Code constructs `Query` through a static factory method instead.

→ This is a **deviation**, not a gap. The type exists; the construction approach differs.

---

## Deviation

A planned item is a **deviation** when code exists that addresses the same intent, but the implementation differs materially from the plan.

### Blocking deviations

A deviation is blocking only when it violates user intent, acceptance criteria, an applicable constraint, or creates concrete risk:

- Different type boundary: inlining violates a required isolation boundary.
- Different responsibility split: splitting validation allows a documented invariant to be bypassed.
- Different algorithm: array iteration instead of a Map demonstrably violates the lookup performance requirement.
- Missing applicable constraint: "no circular dependencies" is binding, and code has one.

### Advisory deviations

These are defensible alternatives when required outcomes and constraints are met without concrete risk:

- Different naming: plan said `UserService`, code has `UserManager` (same responsibility).
- Different language idiom: plan described a class, code used a function + closure (in a functional language).
- Extracted utility: plan inlined a check, code extracted it to a reusable helper.

### Examples

Plan says: "Add `PaymentValidator` as a separate type in `src/validation/`."
Code has validation logic inlined in `PaymentService.process()`.

→ **deviation (advisory)** when required behavior and constraints are satisfied without concrete risk; the planned type boundary alone does not make it blocking.

Plan says: "Store cache in Redis."
Code stores cache in an in-memory Map with a TODO comment.

→ **deviation (blocking)** if Redis is an applicable constraint or shared cache behavior is required and the Map cannot provide it. Otherwise assess the alternative on requirements and concrete risk, not technology choice alone.

Plan says: "Method `calculateTotal` iterates items and sums price * quantity."
Code has `calculateTotal` that delegates to `items.reduce(...)`.

→ **deviation (advisory)**. Same behavior, different implementation style. Defensible.

### How to assess

For each deviation, ask: "Does it violate user intent, acceptance criteria, an applicable constraint, or create concrete risk?"

- Yes, with evidence → blocking.
- No, with sufficient evidence → advisory.
- Insufficient evidence → needs-verification, not an assumed blocker.

---

## Extra

An **extra** is code found in the repository that relates to the feature area but was not in the plan.

### Harmless extras

- Helper function extracted from planned logic (avoids duplication).
- Additional test cases beyond the planned test strategy.
- Logging or observability added to planned code.
- Type export that the plan didn't mention but the module naturally exposes.

### Suspicious extras

- New public API not in the plan (possible scope creep).
- New dependency added (possible unplanned coupling).
- Refactoring of unrelated code alongside planned changes.
- New type that overlaps with a planned type's responsibility.

### Examples

Plan says: "Modify `OrderService.submit` to validate before persisting."
Code has: `OrderService.submit` with validation, plus a new exported `validateOrder` helper.

→ **extra (harmless)**. The helper supports the planned change and doesn't expand scope.

Plan says: "Add `emailNotifications: boolean` to `UserSettings`."
Code has: `UserSettings` with `emailNotifications`, `smsNotifications`, `pushNotifications`, and a new `NotificationPreferences` type.

→ **extra (suspicious)**. Multiple notification fields and a new type go beyond the planned scope.

### How to assess

For each extra, ask: "Does this support the planned change, or does it expand the scope?"

- Supports planned change → harmless.
- Expands scope → suspicious. Flag it.

---

## Classification decision tree

```
Is there sufficient evidence to classify this item?
├── No → needs-verification
└── Yes
    └── Is there code addressing the required intent?
        ├── No → gap
        └── Yes
            └── Does implementation materially differ from guidance?
                ├── No → match
                └── Yes → deviation
                    └── Violates intent, criteria, an applicable constraint, or creates concrete risk?
                        ├── Yes → blocking deviation
                        └── No → advisory deviation
```

For code not in the plan:
```
Is this code related to the feature area?
├── No → ignore (not an extra)
└── Yes
    └── Does it support the planned change or expand scope?
        ├── Supports → harmless extra
        └── Expands → suspicious extra
```
