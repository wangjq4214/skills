# Minimum Seams

A seam is an integration point where the feature touches another part of the system — another module, service, data store, or external system.

## Principle

Only document seams that are necessary for the feature to function.

A necessary seam satisfies all of:

1. The feature cannot function without it.
2. It crosses a trust or deployment boundary (another service, external API, shared database).
3. It has a contract that another team or module owner must honor.

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

Logger, metrics, database connection, HTTP router, config service, health check — these are infrastructure that every module uses. Including them adds noise, not clarity. They are not seams the reader needs to reason about.
