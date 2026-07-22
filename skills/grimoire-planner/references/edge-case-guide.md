# Edge Case Guide

Use this guide during step 5 (Identify Edge Cases) to filter meaningful edge cases from noise.

---

# Inclusion Criteria

A condition is worth listing as an edge case when it meets ALL three:

1. **Real probability**: The condition can occur in production with non-zero frequency. If it requires an unlikely combination of failures, skip it.

2. **Silent corruption**: Missing this case would produce incorrect results, data corruption, or a crash — not just a generic error message the system already handles.

3. **Not already covered**: The codebase's existing patterns (validation middleware, type system, framework error handling) do not already prevent this condition.

---

# Exclusion Criteria

## Skip: Null/undefined at internal boundaries

If the value comes from within the same process and the type system enforces non-null, do not list null checks as edge cases.

Only list null/undefined when the value crosses a trust boundary: external API response, user input, database read, message queue payload.

## Skip: Infrastructure failures

Skip "database is down", "network timeout", "disk full" unless:
- The plan specifically touches connection handling, retry logic, or timeout configuration.
- The system has a custom failure mode that differs from the framework default.

Otherwise, the framework/ORM already handles these with standard error responses.

## Skip: Type-system-prevented conditions

If the language's type system makes a condition impossible (e.g., enum exhaustiveness in Rust, sealed classes in Kotlin), do not list it.

## Skip: "User does X weird"

Do not list edge cases that require the user to willfully bypass the normal interface. If a user manually edits the URL, curl's an internal endpoint, or modifies the DOM, that's a security concern, not an edge case for this plan.

---

# Good Edge Cases

Examples of edge cases worth listing:

- **Empty collection**: "What happens when the list of items is empty?" — especially when the UI or algorithm assumes at least one element.
- **Boundary values**: "What happens when the value is exactly at the max/min limit?" — especially when the limit is defined in the requirement.
- **Concurrent mutation**: "What happens if two requests modify the same resource simultaneously?" — when the feature touches shared mutable state.
- **Order dependency**: "What happens if events arrive out of order?" — when the feature processes an event stream or message queue.
- **State transition**: "What happens if the action is triggered from an unexpected state?" — when the feature has a state machine.

---

# Per-Edge-Case Output

For each edge case the plan lists, record:

- **Condition**: The specific input, state, or timing that triggers it.
- **Expected behavior**: What the system should do.
- **Owning step**: Which step from section 4 (Implementation Steps) must handle it.
