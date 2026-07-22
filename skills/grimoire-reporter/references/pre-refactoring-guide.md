# Pre-refactoring Guide

Pre-refactoring is work that must complete before any vertical slice can be demonstrated.

This guide is project-type-agnostic. Adapt categories to the project's architecture.

---

## Identification Test

For each piece of work identified from the requirement, ask:

> "Can any vertical slice be demonstrated without this work?"

- If **no slice** can be demonstrated without it → pre-refactoring.
- If **at least one slice** can be demonstrated without it → belongs in that specific slice.

---

## Common Pre-refactoring Categories

### Foundation data or types

Shared structures that every slice reads or writes:

- Core data types, structs, or classes
- Base schema or storage layout
- Shared constants or enums
- Fundamental abstractions or interfaces

Example: Defining the `User` struct blocks every slice that operates on users.

Not pre-refactoring: a type used by only one slice. Put it in that slice.

### Shared infrastructure

Code modules that multiple slices import or depend on:

- Error handling framework
- Configuration loader
- Logging or telemetry setup
- Authentication/authorization skeleton
- Common utilities or helpers

Example: A JWT sign/verify utility blocks every slice that issues or validates tokens.

Not pre-refactoring: a helper function used by exactly one slice.

### Cross-cutting entry points

Concerns that span the entire feature:

- Module or package entry point setup
- Shared output rendering skeleton (UI shell, CLI framework, output formatter)
- Test fixtures or factories used by multiple test files
- Build or CI configuration for the new feature

Example: The CLI argument parser setup is used by every subcommand slice.

Not pre-refactoring: an entry point used by exactly one slice.

### Dependency setup

External dependencies that the feature needs:

- New library installation and basic configuration
- Toolchain or SDK setup
- External service account or API key provisioning
- Environment variable or configuration file definitions

Example: Installing an OAuth2 library and configuring the provider strategy.

Not pre-refactoring: calling the library in a specific slice. The import is pre-refactoring; the call site is the slice.

---

## Pre-refactoring Ticket Structure

A pre-refactoring ticket follows the same template as a vertical slice but differs in one way:

**Pre-refactoring has no externally observable outcome.** It is verified by tests passing and by the fact that subsequent slices work.

```markdown
## Layers

- [ ] **data store:** Create `users` table migration
- [ ] **service:** Add JWT sign/verify utilities, auth middleware skeleton
- [ ] **API:** Add route prefix and middleware chain
- [ ] **UI:** None — pre-refactoring has no user-visible outcome
- [ ] **tests:** Unit tests for JWT utilities, config loader; integration test for migration rollback
```

The acceptance criteria for pre-refactoring are tests passing, not user-visible behavior.

---

## Pre-refactoring Boundaries

### Include in pre-refactoring

- Work that EVERY slice needs
- Work that, if done later, would cause rework in completed slices
- Work that is a hard prerequisite (code won't compile or the system won't start without it)

### Exclude from pre-refactoring

- Work that only SOME slices need → put in the first slice that needs it
- Work that can be added incrementally without breaking earlier slices
- Polishing or optimization that doesn't block slices

### Gray area: when uncertain

If a piece of work is needed by 2+ slices but not all, place it in the first slice that needs it. That slice then blocks the other slices.

Example: Email sending is needed by T0004 (email verification) and T0006 (password reset) but not T0002 (login) or T0003 (logout). Put email infrastructure in T0004. T0004 blocks T0006.

---

## Anti-patterns

### Pre-refactoring as a dumping ground

Bad: putting every shared concern in T0001 until T0001 becomes a horizontal "build all infrastructure" ticket.

Good: pre-refactoring is minimal — only what blocks every slice. Infrastructure specific to a subset of slices goes in the first consuming slice.

### Pre-refactoring with observable outcomes

Bad: pre-refactoring includes a login page or a working CLI command.

Good: pre-refactoring has no externally observable outcome. The first vertical slice produces the first observable change.

### Skipping pre-refactoring

Bad: T0002 includes "set up project structure, define all types, install libraries, configure toolchain, implement first feature..."

Good: T0001 sets up foundation. T0002 implements the first slice on that foundation.

### Over-splitting pre-refactoring

Bad: T0001 defines types. T0002 installs library. T0003 adds config. T0004 adds error handling. Then T0005 finally does something observable.

Good: one pre-refactoring ticket that sets up all shared foundation. Multiple pre-refactoring tickets defeat the purpose — they delay observable work.
