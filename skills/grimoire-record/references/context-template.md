# CONTEXT.md Template

## Full template for a new CONTEXT.md

```markdown
# Project Context

## Concepts

<!-- Domain concepts are recorded here. See grimoire-record skill for format. -->
```

---

## Entry examples

### Basic entry

```markdown
### Order
- **Definition:** A confirmed purchase request from a customer containing one or more line items.
- **Synonyms:** Purchase, SalesOrder
- **Relationships:**
  - contains LineItem
  - belongs to Customer
  - communicates with Payment
```

### Minimal entry (no synonyms, no relationships)

```markdown
### LineItem
- **Definition:** A single product SKU with quantity and price within an Order.
- **Synonyms:**
- **Relationships:**
```

### Entry with multiple relationships

```markdown
### Customer
- **Definition:** A registered user who can place orders and manage subscriptions.
- **Synonyms:** Client, Account
- **Relationships:**
  - contains Order
  - contains Subscription
  - extends User
```

---

## Relationship verbs

Use only these verbs for consistency:

| Verb                | Meaning                                        |
| ------------------- | ---------------------------------------------- |
| `contains`          | Whole-part; parent owns child lifecycle        |
| `references`        | Non-owning pointer; child exists independently |
| `depends on`        | Requires the target to function                |
| `implements`        | Realizes an interface or contract              |
| `extends`           | Inherits or specializes a base concept         |
| `communicates with` | Sends messages/events to the target            |
| `belongs to`        | Member of a bounded context or aggregate       |

---

## Domain index (when split)

```markdown
## Domain Index

| Domain   | File                                         | Entry Count |
| -------- | -------------------------------------------- | ----------- |
| Billing  | [CONTEXT-billing.md](./CONTEXT-billing.md)   | 23          |
| Auth     | [CONTEXT-auth.md](./CONTEXT-auth.md)         | 15          |
| Ordering | [CONTEXT-ordering.md](./CONTEXT-ordering.md) | 42          |
```

---

## Anti-patterns

### Overlong definition

Bad:
```markdown
### Order
- **Definition:** An Order represents a customer's intent to purchase one or more products from the catalog. It goes through several lifecycle stages: pending, confirmed, shipped, delivered, and cancelled. Each order has a unique identifier...
```

Good — split into sub-concepts:
```markdown
### Order
- **Definition:** A confirmed purchase request containing one or more line items.
- **Synonyms:**
- **Relationships:**
  - contains LineItem

### OrderStatus
- **Definition:** The lifecycle stage of an Order: Pending, Confirmed, Shipped, Delivered, or Cancelled.
- **Synonyms:**
- **Relationships:**
  - belongs to Order
```

### Vague definition

Bad:
```markdown
### Processor
- **Definition:** Handles processing stuff.
```

Good:
```markdown
### PaymentProcessor
- **Definition:** External service that charges a Customer's payment method and returns a transaction ID.
```
