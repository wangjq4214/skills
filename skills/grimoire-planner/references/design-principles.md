# Design Principles

Use these principles during step 3 (Analyze Type Design) to decide when to extend an existing type vs. create a new one.

---

# Core Rule

**Each type owns one stable concept.** A concept is a coherent set of rules and behaviors that share the same reason to change.

When a new requirement arrives, ask: "Does it belong to an existing concept, or does it introduce a new one?"

---

# Extend vs. Split

## Extend an existing type when:

The new content is an attribute of the same concept.

Indicators:
- It uses the same data to answer a related question.
- It changes for the same reason as the rest of the type.
- It shares the same lifecycle (created, updated, deleted together).
- It cannot exist independently — removing the type removes this attribute too.

## Create a new type when:

The new content introduces a distinct concept.

Indicators:
- It has its own reason to change (different trigger, different frequency).
- It has a different lifecycle (created/updated independently).
- It can exist and be tested without the original type.
- It introduces a new responsibility that the original type should not own.

---

# Relationship Rules

## Prefer composition for "has-a"

When a type owns another concept, use a composed field — not inheritance, not a flat pile of fields.

A `User` has an `Address`. `Address` is a separate type. `User` composes it.

## Prefer interfaces/traits for "can-do"

When multiple types share a capability, express it through an interface or trait — not a shared base class.

A `PaymentProcessor` interface can be implemented by `StripeProcessor` and `PaypalProcessor`. Neither inherits from the other.

## Avoid inheritance for code reuse

Inheritance creates coupling between parent and child lifecycles. If the child concept changes for a different reason than the parent, the hierarchy is wrong.

---

# Litmus Test

For every type boundary decision, answer three questions:

1. **Independent existence**: Can this type exist without the other? If yes, it's a separate type.
2. **Independent change**: Can this type change for its own reasons without forcing the other to change? If yes, it's a separate type.
3. **Independent test**: Can this type be unit-tested with its dependencies mocked? If yes, it's a separate type.

If the answer to all three is "no", the content belongs in an existing type.

---

# Minimal Change

Every plan should minimize the number of files touched and types created.

Before adding a type:
- Can an existing type absorb this without violating its concept boundary?
- Can the behavior be composed from existing types?

Before adding a field:
- Is this field already derivable from existing data?
- Does this field belong to a concept that should be its own type?

The goal is not fewer lines of code. The goal is fewer concepts that can drift out of sync.
