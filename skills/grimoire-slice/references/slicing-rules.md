# Slicing Rules

Choose a decomposition that preserves coherent delivery and exposes real dependencies.

---

## Slice shapes

- **Vertical value slice** — delivers an externally observable scenario across the surfaces it needs.
- **Enabling slice** — creates a shared capability with independent verification and multiple proven consumers.
- **Migration slice** — safely changes data, protocol, or infrastructure with rollout/rollback evidence.
- **Component slice** — changes one bounded component when its contract can be tested independently.
- **Operational/documentation slice** — delivers an observable operational or user-support outcome.

Vertical value slices are preferred for user-facing behavior, but horizontal work is not inherently an anti-pattern.

---

## Procedure

### 1. Extract outcomes

Map every user requirement or acceptance criterion to an observable outcome, invariant, migration milestone, or enabling capability.

### 2. Size coherently

Prefer work that fits one implementation context. Split by value, risk, lifecycle, rollout stage, or independently testable contract. Keep tightly coupled behaviors together when separation would create incomplete states or repeated coordination.

### 3. Place shared work

Put setup/refactoring into the first consumer unless it serves multiple tickets and can be verified independently. Do not create a global pre-refactoring ticket merely because several slices touch similar code.

### 4. Record affected surfaces

List only modules, layers, contracts, or operational surfaces the ticket changes. Verify that all necessary surfaces are covered across the ticket set, not inside every ticket.

### 5. Prove dependencies

A ticket blocks another only when the consumer cannot be implemented or verified first. Shared files are merge risks; shared contracts can often be coordinated without serializing implementation.

---

## Quality checks

A good ticket has a coherent outcome, evidence-based dependencies, testable acceptance, manageable scope, and explicit coordination risks.

Warning signs:

- A ticket exists only to satisfy a layer checklist.
- Splitting creates non-compiling or non-verifiable intermediate states.
- A shared-file conflict is represented as a business dependency.
- Enabling work blocks tickets that do not actually consume it.
- A context-window estimate overrides a more coherent atomic change.

When uncertain, choose the boundary that minimizes incomplete states and coordination overhead.
