# Slicing Rules

How to decompose a requirement into vertical slices — project-type agnostic.

---

## Vertical Slice Definition

A vertical slice is a narrow but complete path through every architectural layer of the project:

```
     ┌──────────────────┐
     │  layer N         │  ← final observable output (UI, CLI output, API response, physical action)
     ├──────────────────┤
     │  ...             │
     ├──────────────────┤
     │  layer 2         │
     ├──────────────────┤
     │  layer 1         │  ← foundational data/input layer
     └──────────────────┘
```

The layers are discovered from the project (see SKILL.md step 3), not assumed.

A horizontal slice (anti-pattern):

```
     ┌──────────────────┐
     │  layer N         │  ← all work in one layer, nothing else
     └──────────────────┘
     ┌──────────────────┐
     │  layer N-1       │  ← all work in another layer
     └──────────────────┘
```

Horizontal slices cannot be demonstrated until all layers are complete. Vertical slices produce an observable outcome after each slice.

---

## Slicing Procedure

### Step 1: Extract observable scenarios

Start from externally observable scenarios:

- If a spec exists: use its E2E tests or acceptance criteria.
- If from conversation: derive scenarios by asking "What would an external observer see, receive, or measure at each step?" Walk through the user's goal and extract every distinct interaction or outcome.

Examples by project type:

| Project type | Observable scenario source |
|---|---|
| Web app | User interactions in the browser |
| CLI tool | Command invocations and their stdout/stderr/exit codes |
| Library/SDK | Public API calls and their return values / side effects |
| Embedded | Physical outputs, sensor readings, communication packets |
| Data pipeline | Query results, data quality metrics, output artifacts |
| Mobile app | Screen transitions, user interactions, notifications |

### Step 2: Size check

For each candidate slice, estimate implementation scope:

- **Fits one context window**: keep as one slice.
- **Too large**: split further. Common splits (project-type-agnostic):
  - Happy path → Error path
  - Simple input → Complex/edge-case input
  - Create → Update → Delete
  - Read → Write
  - Core behavior → Feedback/polish states
- **Too small**: merge with a neighboring slice. Test: "Can this be demonstrated meaningfully on its own?" If the demo would be trivial or invisible, merge.

### Step 3: Identify cross-cutting work

After all slices are defined, look for work that every slice needs:

- Does every slice need a shared data structure? → pre-refactoring
- Does every slice need a common entry point or interface skeleton? → pre-refactoring
- Does every slice need a shared output format or rendering skeleton? → pre-refactoring

Promote cross-cutting work to pre-refactoring. It becomes T0001.

### Step 4: Assign layer coverage

For each slice, list exactly what changes in each confirmed layer.

Test: "If I only implement this slice, can the outcome be observed and verified?"

- If no: the slice is missing a layer. Add it or justify the absence.
- If yes: the slice is vertically complete.

### Step 5: Verify independence

For each slice, answer: "What must exist before this slice can be demonstrated?"

- Pre-refactoring is the expected answer for most slices.
- If slice A needs something created by slice B, then B blocks A. This is a dependency, not a slice error.
- If slice A cannot be demonstrated even after its blockers are resolved, the slice is too thin — merge with an adjacent slice.

---

## Slice Quality Checks

### Good slice (web app, layers: data store → service → API → UI → tests)

```
T0002: OAuth2 Login — Happy Path
data store: users table
service: user lookup-or-create
API: GET /auth/google, GET /auth/google/callback
UI: LoginPage, DashboardHeader, ProtectedRoute
tests: E2E full flow, API callback test, UI redirect test

Demo after completion: click button → Google consent → dashboard with name
```

Cuts through all layers. One user-visible outcome. Demo is a complete flow.

### Good slice (CLI tool, layers: data model → core → CLI → output → tests)

```
T0002: Config file validation
data model: Config struct with validation
core: validate() method
CLI: validate subcommand
output: human-readable errors, --json flag
tests: unit tests, integration tests against fixtures

Demo after completion: run `tool validate --config bad.yaml` → sees specific errors
```

### Bad slice (horizontal)

```
T0002: Create all data models and migrations
data store: all tables
service: —
API: —
UI: —
tests: —
```

No upper layers. Cannot be demonstrated to anyone. This is a horizontal fragment.

### Bad slice (too thin)

```
T0002: Create users table migration
data store: users table
service: —
API: —
UI: —
tests: —
```

Only one layer. Not demonstrable alone.

### Bad slice (too broad)

```
T0002: Complete authentication system
(data store: users, sessions, password_resets; service: all auth logic; API: all endpoints; UI: all pages; tests: everything)
```

Fits multiple context windows. Split by scenario.

---

## Context Window Fit

A ticket fits one context window when:

- An agent can read the ticket, read the relevant codebase portions, and implement the complete slice without truncation.
- As a heuristic: the ticket should describe no more than 3–5 files of substantial change, plus tests.
- If the Approach section runs beyond 10 steps, the slice is probably too large.

When uncertain, err on the side of smaller slices. A too-small slice can be merged. A too-large slice causes context overflow and incomplete implementation.

---

## Pre-refactoring Boundary

Pre-refactoring stops and vertical slicing begins at this boundary:

| Pre-refactoring (T0001)              | First vertical slice (T0002)       |
| ------------------------------------ | ---------------------------------- |
| Define shared data structures/types  | Use them in a specific scenario    |
| Set up toolchain/library/imports     | Apply them to a specific task      |
| Create skeleton interfaces/contracts | Implement one concrete path        |
| Add configuration/error framework    | Handle one specific case           |

Pre-refactoring sets the stage. Vertical slices perform.
