# Severity Classification

Every finding must carry a severity label. This guide defines each level with concrete examples.

---

## Blocking

A blocking issue must be resolved before the change can be merged.

**Criteria (any one is sufficient):**

- Incorrect behavior — the code does not match its stated purpose
- Security vulnerability — data leak, injection, privilege escalation, missing auth check
- Data loss risk — deleting, overwriting, or corrupting persistent data unintentionally
- Regression — existing functionality is broken or degraded
- Architectural violation — introduces circular dependencies, crosses a hard boundary, bypasses an established abstraction layer in a way that blocks future changes

**Examples:**

| Blocking                                                                 | Why                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `if (user = null)` — assignment, not comparison                          | Silent logic error; null check always passes                  |
| SQL query concatenates user input without parameterization               | SQL injection vulnerability                                   |
| DELETE without WHERE clause in a migration                               | Data loss risk                                                |
| New dependency cycle between two modules that were previously acyclic    | Architectural degradation; makes future extraction impossible |
| Public API returns raw database rows instead of the documented DTO shape | Breaks existing callers expecting the documented contract     |

**When uncertain:** label it blocking and let the author decide to downgrade.

---

## Suggestion

A suggestion is an optional improvement. The author decides whether to act on it.

**Criteria:**

- Alternative approach that is worth considering but the current approach is not wrong
- Readability improvement — naming, structure, comments where intent is unclear
- Minor performance optimization — unlikely to be a bottleneck but could be more efficient
- Style inconsistency — deviates from local convention but not project-wide standards
- Test coverage gap for a non-critical path
- Opportunity to reuse existing utility instead of inline logic

**Examples:**

| Suggestion                                                                          | Why suggestion                                       |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| "`processOrder` is generic — consider `batchProcessPendingOrders` to reveal intent" | Current name works; clarity could improve            |
| "This loop could use `.filter().map()` instead of `for`"                            | Style preference; same behavior                      |
| "Consider adding a unit test for the empty-list edge case here"                     | Good practice; current tests cover the happy path    |
| "This helper duplicates logic from `src/utils/date.ts:42`"                          | Opportunity to deduplicate without changing behavior |

**When to drop:** if the suggestion has no concrete impact, drop it. "This could be written differently" without a reason why is noise.

---

## Praise

Explicitly call out good design choices. This reinforces the right patterns and builds trust.

**Criteria:**

- Well-designed abstraction that simplifies the codebase
- Clean handling of a genuinely tricky edge case
- Thoughtful naming that makes intent obvious
- Judicious use of "no" — the author chose simplicity over unnecessary generality
- A test that catches a real bug scenario other tests would miss

**Examples:**

| Praise                                                                    | Why                             |
| ------------------------------------------------------------------------- | ------------------------------- |
| "The `Result` type here elegantly avoids the null-check sprawl elsewhere" | Recognizes good design judgment |
| "Good catch handling the `maxRetries=0` edge case — easy to overlook"     | Reinforces attention to detail  |
| "Naming `PendingRefund` vs `Refund` makes the state machine obvious"      | Highlights effective naming     |

**Rule:** praise specific decisions, not the author. "Good handling of the timeout edge case" not "You did a good job here."

---

## Quick Decision Table

| Question                                                                 | Severity           |
| ------------------------------------------------------------------------ | ------------------ |
| Could this cause incorrect behavior or data loss?                        | blocking           |
| Could this introduce a security vulnerability?                           | blocking           |
| Does this break an existing architectural contract?                      | blocking           |
| Is there a clearly better approach that is just as simple?               | suggestion         |
| Is the current approach valid but harder to understand than it could be? | suggestion         |
| Is this a style preference with no correctness impact?                   | drop or suggestion |
| Is this a design choice worth reinforcing?                               | praise             |
