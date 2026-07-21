# Invocation Modes

A skill can be reached in two ways:

- model-invoked
- user-invoked

The choice determines where the discovery cost is paid.

---

## Model-invoked

A model-invoked skill can be selected automatically by the agent.

Use it when:

- the trigger is often implicit
- missing the skill may cause incorrect behavior
- another skill needs to use this skill
- the behavior should be available without user awareness

Cost:

The skill description contributes context load.

Therefore:

Only make a skill model-invoked when automatic discovery provides enough reliability improvement to justify permanent context cost.

---

## User-invoked

A user-invoked skill runs only when explicitly requested.

Use it when:

- the user intentionally chooses the workflow
- the task is specialized
- automatic discovery is unnecessary
- the skill is rarely used

Cost:

The user or workflow designer must remember that the skill exists.

---

## Decision Rule

- Choose model-invoked when: automatic discovery improves reliability.
- Choose user-invoked when: manual selection is sufficient.
- The key question is: "Who should pay the discovery cost?"
