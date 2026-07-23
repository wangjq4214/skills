# Check Patterns

Detailed classification guide with concrete examples for step 4 of the workflow.

---

## Match

A planned item is a **match** when the code exists and fulfills the plan's design intent.

Behavior match is sufficient — the code does not need to be textually identical to pseudo-code.

### Examples

Plan says: "Add method `validate` to type `Order` that checks status is not null."
Code has: `Order.validate(): boolean { return this.status != null; }`

→ **match**. The behavior matches, even if the return type is boolean instead of void.

Plan says: "Create class `PaymentGateway` implementing `IPaymentProcessor`."
Code has: `class PaymentGateway implements IPaymentProcessor { ... }`

→ **match**. Exact structural match.

### Edge case: partial match

Plan says: "Add method `process` with validation, transformation, and persistence steps."
Code has: method `process` with only validation and persistence steps, no transformation.

→ This is a **deviation**, not a match. The method exists but is missing a planned step.

---

## Gap

A planned item is a **gap** when no corresponding code exists. The plan requires it; it is absent.

### Examples

Plan says: "Create file `src/services/notifier.ts`."
File does not exist on disk.

→ **gap**. File is missing.

Plan says: "Add field `retryCount: number` to type `ConnectionConfig`."
Code has `ConnectionConfig` but no `retryCount` field.

→ **gap**. Field is missing.

Plan says: "Add error handling for timeout in `fetchData`."
Code has `fetchData` but no timeout logic.

→ **gap**. Logic is missing.

### Not a gap

Plan says: "Use a builder pattern for `Query`."
Code constructs `Query` through a static factory method instead.

→ This is a **deviation**, not a gap. The type exists; the construction approach differs.

---

## Deviation

A planned item is a **deviation** when code exists that addresses the same intent, but the implementation differs materially from the plan.

### Blocking deviations

These change behavior, architecture, or responsibility boundaries:

- Different type boundary: plan said extract to a new type, code inlined into existing type.
- Different responsibility split: plan said one type owns validation, code split it across two.
- Different algorithm: plan said use a Map for lookup, code uses array iteration.
- Missing planned constraint: plan said "no circular dependencies," code has one.

### Advisory deviations

These are defensible alternatives that achieve the same outcome:

- Different naming: plan said `UserService`, code has `UserManager` (same responsibility).
- Different language idiom: plan described a class, code used a function + closure (in a functional language).
- Extracted utility: plan inlined a check, code extracted it to a reusable helper.

### Examples

Plan says: "Add `PaymentValidator` as a separate type in `src/validation/`."
Code has validation logic inlined in `PaymentService.process()`.

→ **deviation (blocking)**. The plan explicitly called for a separate type boundary.

Plan says: "Store cache in Redis."
Code stores cache in an in-memory Map with a TODO comment.

→ **deviation (blocking)**. Different technology choice with different behavior characteristics.

Plan says: "Method `calculateTotal` iterates items and sums price * quantity."
Code has `calculateTotal` that delegates to `items.reduce(...)`.

→ **deviation (advisory)**. Same behavior, different implementation style. Defensible.

### How to assess

For each deviation, ask: "Does this difference change observable behavior, type boundaries, or architectural constraints?"

- Yes → blocking.
- No → advisory.

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
Is there code that addresses this planned item?
├── No → gap
└── Yes
    └── Does the code match the plan's design intent?
        ├── Yes → match
        └── No → deviation
            └── Does the difference change behavior, boundaries, or architecture?
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
