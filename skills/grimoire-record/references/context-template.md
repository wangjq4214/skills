# Context examples and relationship meanings

Minimal entry:

```markdown
### LineItem
- **Definition:** One product SKU and quantity within an Order.
```

With optional fields:

```markdown
### Order
- **Definition:** A confirmed customer purchase request containing line items.
- **Synonyms:** Purchase
- **Relationships:**
  - contains LineItem
  - references Customer
```

| Verb | Meaning |
| --- | --- |
| contains | Whole-part ownership of lifecycle |
| references | Non-owning reference |
| depends on | Requires the target to function |
| implements | Realizes a contract |
| extends | Specializes a concept |
| communicates with | Exchanges messages or events |
| belongs to | Member of a bounded context or aggregate |

When splitting domains, keep inline concepts under `## Concepts` and index moved entries without duplicating them:

```markdown
## Domain Index

| Domain | File | Entry Count |
| --- | --- | --- |
| Billing | [CONTEXT-billing.md](./CONTEXT-billing.md) | 23 |
```

Separate lifecycle vocabulary only when independently useful; do not fragment a complete definition merely to shorten it.
