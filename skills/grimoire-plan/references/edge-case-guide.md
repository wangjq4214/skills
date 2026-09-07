# Edge Case Guide

Use this guide during step 5 (Identify Edge Cases) to filter meaningful edge cases from noise.

---

# Inclusion Criteria

Use the risk criterion in [grimoire-plan](../SKILL.md) to choose cases. Consider:

- **Plausibility and impact**: Identify a concrete production scenario and its consequence. Rare failures can matter when they threaten security, data integrity, or recovery.
- **Changed behavior**: Focus on boundaries and failure modes the change introduces, depends on, or could invalidate.
- **Existing protection**: Reuse verified validation, type guarantees, framework behavior, and tests rather than duplicating them. Check that those protections apply to the actual path.

---

# Common Filtering Decisions

## Null/undefined and type guarantees

Omit defensive cases that the type system demonstrably prevents on the relevant path. Include nullable internal state or unchecked runtime values when they can actually occur; process location alone does not prove safety.

## Infrastructure failures

Investigate database outages, timeouts, or disk exhaustion when their effect matters to the change: partial writes, retries, duplicate effects, lost work, or recovery. A framework's generic error response is adequate only when it preserves the required behavior. Reuse existing failure coverage when it remains applicable.

## Adversarial interface use

Direct endpoint requests, edited URLs, and modified DOM state can expose authorization, validation, or trust-boundary failures. Include these when relevant to the feature's security contract, regardless of whether the normal UI permits the action. Skip speculative attack lists unrelated to the changed surface.

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
