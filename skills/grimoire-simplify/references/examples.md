# Simplification Examples

Use these examples to compare candidate transformations. They are illustrative; preserve the target codebase's language, conventions, and behavior contract.

## 1. Delete, then inline

Before:

```ts
function normalizeName(name: string): string {
  return name.trim();
}

function createLabel(name: string): string {
  return normalizeName(name);
}

const label = createLabel(input);
```

After:

```ts
const label = input.trim();
```

Why: both helpers have one caller, add no invariant or boundary, and only forward an existing operation. Two concepts and two call hops disappear.

Preserve first if either helper is public, instrumented, or overrides error behavior.

## 2. Collapse duplicated state

Before:

```ts
class Panel {
  private status: "open" | "closed" = "closed";
  private isOpen = false;

  open() {
    this.status = "open";
    this.isOpen = true;
  }
}
```

After:

```ts
class Panel {
  private status: "open" | "closed" = "closed";

  open() {
    this.status = "open";
  }

  get isOpen() {
    return this.status === "open";
  }
}
```

Why: one source of truth removes an invalid state where `status` and `isOpen` disagree.

Preserve the cached value when deriving it would change a measured performance characteristic.

## 3. Merge equivalent branches

Before:

```ts
if (kind === "draft") {
  save(record, false);
} else if (kind === "template") {
  save(record, false);
} else {
  save(record, true);
}
```

After:

```ts
const publish = kind !== "draft" && kind !== "template";
save(record, publish);
```

Why: duplicate branch bodies collapse into one decision and one operation.

Keep branches separate when they intentionally differ in logging, errors, ordering, locking, or future control flow already required by current behavior.

## 4. Collapse an unneeded private interface

Assume these symbols and all call sites are private to one module.

Before:

```ts
interface NameFormatter {
  format(value: string): string;
}

class DefaultNameFormatter implements NameFormatter {
  format(value: string): string {
    return value.trim().toLowerCase();
  }
}

function storeName(value: string, formatter: NameFormatter) {
  return save(formatter.format(value));
}
```

After:

```ts
function storeName(value: string) {
  return save(value.trim().toLowerCase());
}
```

Why: the private interface has one implementation, no runtime replacement, no invariant, and no necessary boundary.

Keep it when tests or production select multiple implementations, or when it isolates an external system or lifecycle boundary.

## 5. Keep a justified wrapper

Candidate:

```ts
class AccountId {
  private constructor(readonly value: string) {}

  static parse(value: string): AccountId {
    if (!/^acct_[a-z0-9]+$/.test(value)) {
      throw new InvalidAccountId(value);
    }
    return new AccountId(value);
  }
}
```

Decision: keep it.

Why: the wrapper prevents invalid construction and centralizes error semantics. Replacing it with `string` removes lines but adds possible states and weakens the behavior contract.

## 6. Stop at equivalent complexity

Current:

```ts
const activeUsers = users.filter(isActive);
```

Alternative:

```ts
const activeUsers = users.filter(user => user.status === "active");
```

Decision: stop when `isActive` is a shared domain predicate or hides a nontrivial rule. The alternative is not inherently simpler; it may only move the same concept into another location.

## 7. Rewrite a confusing internal pipeline

Before:

```ts
function prepare(input: Input) {
  const staged = stageInput(input);
  return routeStaged(staged);
}

function stageInput(input: Input): StagedInput {
  return { raw: input.value, valid: input.value.length > 0 };
}

function routeStaged(staged: StagedInput) {
  if (!staged.valid) return rejectStaged(staged);
  return acceptStaged(staged);
}
```

After:

```ts
function prepare(input: Input) {
  if (input.value.length === 0) return reject(input.value);
  return accept(input.value);
}
```

Why: the intermediate representation and helper pipeline carry no invariant or boundary. Rewriting the whole private path is clearer than separately inlining and repairing each helper. The public entry point and behavior remain unchanged; the old decomposition does not.

Do not apply this rewrite if staging owns validation policy, instrumentation, lifecycle, or an external integration boundary.

## Explanation test

A valid result should admit a shorter explanation.

Before:

> Update both status fields through a wrapper, convert to an intermediate record, then call the only formatter implementation.

After:

> Update the status and save its normalized value.

If the explanation merely uses different nouns or hides steps behind a new name, the change has not reduced the understanding path. Diff size is not part of this test: a larger rewrite is preferable when it produces a materially shorter and more direct explanation.
