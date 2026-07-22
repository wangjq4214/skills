# ADR Template

## Full template

```markdown
# [Decision Title]

**Status:** Proposed
**Date:** YYYY-MM-DD

## Context

[1–2 sentences describing the situation, the problem to solve, and the alternatives considered.]

## Decision

[1–2 sentences stating what was chosen and the primary reason.]

## Consequences

- [What this decision enables.]
- [What this decision constrains.]
- [Action items required because of this decision.]
```

---

## Examples

### Architecture pattern

```markdown
# Use Event Sourcing for Write Models

**Status:** Completed
**Date:** 2025-03-15

## Context

The ordering domain requires full audit trail and temporal queries for compliance. Alternatives: state-based persistence with audit logging, or full event sourcing.

## Decision

Write models use event sourcing. Read models project to PostgreSQL for query performance.

## Consequences

- Full audit trail available without extra logging infrastructure.
- Write and read schemas evolve independently.
- Teams must learn event versioning and projection rebuild patterns.
```

### Integration pattern

```markdown
# Order and Billing Modules Communicate via Domain Events

**Status:** Completed
**Date:** 2025-03-20

## Context

Order completion triggers billing. Alternatives: synchronous HTTP call from Order to Billing service, or async domain events via message bus.

## Decision

Use domain events over RabbitMQ. Avoid synchronous coupling between Order and Billing.

## Consequences

- Order service remains available even when Billing is degraded.
- Eventual consistency means billing may lag behind order confirmation (acceptable: <30s).
- Both teams must agree on event schema contracts.
```

### Boundary definition

```markdown
# Customer Data Owned by Customer Context

**Status:** Completed
**Date:** 2025-04-01

## Context

Multiple contexts (Ordering, Billing, Support) need customer information. Alternatives: each context manages its own customer copy, or a single Customer context owns it.

## Decision

Customer data belongs to the Customer context. Other contexts reference customers by ID only.

## Consequences

- No duplicated or conflicting customer data across contexts.
- Cross-context queries requiring customer details must join via ID.
- Customer context API must support high-throughput ID lookups.
```

### Intentional deviation

```markdown
# Hand-Written SQL for Reporting Queries

**Status:** Completed
**Date:** 2025-04-10

## Context

Reporting queries span multiple aggregates and require optimized joins. Alternatives: ORM query builders (TypeORM, Prisma), or raw SQL with a lightweight mapper.

## Decision

Use hand-written SQL with pg-promise for reporting queries. ORM covers standard CRUD.

## Consequences

- Report queries are optimized per use case.
- No ORM abstraction overhead on complex joins.
- Schema changes require manual query updates; must be caught by integration tests.
```

### Invisible constraint

```markdown
# AWS Cannot Be Used Due to Compliance

**Status:** Completed
**Date:** 2025-05-01

## Context

Project handles data subject to GDPR with data residency requirements. Alternatives: AWS with EU regions, Azure, or on-premise.

## Decision

Azure is the deployment target. AWS is disallowed due to client contractual obligations with a specific data residency clause.

## Consequences

- All infrastructure must target Azure services.
- Team must use Azure-equivalent services (e.g., Azure Service Bus instead of SQS).
- Multi-cloud is not an option for this project.
```

### Rejected alternative

```markdown
# REST over GraphQL for Public API

**Status:** Completed
**Date:** 2025-05-15

## Context

Public API must serve both mobile app and third-party integrations. Alternatives: GraphQL for flexible queries, or REST for simplicity and cacheability.

## Decision

REST chosen. GraphQL rejected because: (1) third-party integrators overwhelmingly prefer REST, (2) CDN caching requirements favor resource-based URLs, (3) team has deep REST experience and no GraphQL production experience.

## Consequences

- Mobile app must make multiple REST calls where GraphQL could resolve in one query.
- Caching strategy is straightforward with standard HTTP cache headers.
- Third-party integration documentation follows familiar OpenAPI patterns.
```

---

## Status lifecycle

```
Proposed → Implementing → Testing → Completed
                ↓                      ↓
          Deprecated ←────────── Superseded
```

- **Proposed:** Decision written but not yet acted on.
- **Implementing:** Code changes in progress.
- **Testing:** Implementation done, under verification.
- **Completed:** Decision fully realized in the codebase.
- **Deprecated:** No longer relevant; the system no longer uses this approach.
- **Superseded:** Replaced by a newer ADR. Link to the replacement with `**Superseded by:** [NNNN-other-title](./NNNN-other-title.md)`.

---

## Anti-patterns

### Recording trivial choices

Bad ADR subject: "We use ESLint for linting." (low switching cost, near-universal default)

Good ADR subject: "We use Rust for the compute engine because GC pauses violate latency SLO." (high switching cost, non-obvious choice)

### Long-winded context

Bad: 3 paragraphs of project history before stating the decision.

Good: 1–2 sentences. The ADR is a record, not a blog post.

### Decision without alternatives

Bad:
```markdown
We chose PostgreSQL.
```

Good:
```markdown
PostgreSQL chosen over MySQL and MongoDB because: transaction guarantees required for ledger, team PostgreSQL experience, and JSONB covers document needs.
```
