# Minimum Seams

A seam is an integration point where the feature touches another part of the system — another module, service, data store, or external system.

## Principle

Apply the inclusion rule in [grimoire-spec](../SKILL.md): document integration points needed for behavior or to preserve a required boundary.

Trust or deployment crossings are useful signals, not prerequisites. An in-process module boundary also qualifies when its contract matters to correctness, ownership, or an applicable architectural decision. Describe what the two sides exchange or guarantee; avoid listing incidental call structure.

## What to exclude

Do NOT include as a seam:

- Internal function calls within the same module.
- Framework-level middleware that every endpoint uses (unless this feature has a unique requirement from it).
- Standard library or language features.
- Speculative integration points ("we might need this later"). These belong in Future Evolution.
- Obvious infrastructure (logging, metrics) unless the feature has a non-standard requirement.

## What to include

Include a seam when:

- The feature calls an external service or API.
- The feature exposes a new endpoint or event that other modules consume.
- The feature writes to or reads from a shared data store with a schema contract.
- The feature depends on a configuration or secret managed outside the module.
- The feature crosses a bounded context boundary defined in an ADR.

## Seam table format

```markdown
| Seam        | Connects                | Expects                   | Provides                    |
| ----------- | ----------------------- | ------------------------- | --------------------------- |
| [seam name] | [module A] ↔ [module B] | [what this feature needs] | [what this feature exposes] |
```

- **Seam:** Short, descriptive name.
- **Connects:** The two sides of the integration. Use `↔` to indicate bidirectional, `→` for unidirectional.
- **Expects:** What this feature requires from the other side (data format, SLA, behavior).
- **Provides:** What this feature exposes to the other side (contract, guarantee).

## Example: Good

For an "Order Notification" feature:

```markdown
| Seam                | Connects                               | Expects                                            | Provides                 |
| ------------------- | -------------------------------------- | -------------------------------------------------- | ------------------------ |
| Order status events | Ordering context → Notification module | OrderCompleted, OrderShipped events on message bus | —                        |
| Email delivery      | Notification module → SendGrid API     | API key, template ID, recipient email              | Delivery status callback |
| User preferences    | Notification module → Customer context | User notification preferences by user ID           | —                        |
```

Three seams. All cross boundaries. All necessary. The feature cannot send the right email to the right person without all three.

## Example: Bad (too many seams)

```markdown
| Seam                | Connects                           | Expects                        | Provides                  |
| ------------------- | ---------------------------------- | ------------------------------ | ------------------------- |
| Order status events | ...                                | ...                            | ...                       |
| Email delivery      | ...                                | ...                            | ...                       |
| User preferences    | ...                                | ...                            | ...                       |
| Logger              | Notification module → Logger       | Log level config               | Structured logs           |
| Metrics             | Notification module → Prometheus   | —                              | Email send count, latency |
| Database connection | Notification module → PostgreSQL   | Connection string              | —                         |
| HTTP router         | Notification module → Express      | Route prefix                   | POST /send endpoint       |
| Config service      | Notification module → Config       | SendGrid API key, from address | —                         |
| Health check        | Notification module → Orchestrator | —                              | /health endpoint          |
```

These additional rows are noise when they merely repeat standard infrastructure already covered by the feature's contracts. Include them when they carry a feature-specific requirement, such as audit logging, delivery metrics used for acceptance, or a distinct secret-management contract. Infrastructure is not automatically irrelevant.
