# Pruning Skills

Skills accumulate unnecessary content over time.

Pruning keeps execution predictable and maintainable.

---

## Single Source of Truth

Every behavior should have one authoritative location.

Avoid:

- duplicated rules
- repeated explanations
- copied examples
- slightly different versions of the same instruction

When duplicates exist:

1. Choose the strongest definition.
2. Keep one authoritative version.
3. Remove the others.

---

## Relevance Test

Review every sentence.

Ask: "Does this sentence change agent behavior?"

- If no: remove it.

Information that only explains an already obvious behavior adds load without improving execution.

---

## Delete Before Rewrite

When improving a skill:

First ask: "Can this sentence disappear?"

Many weak instructions should be deleted rather than rewritten.

---

## Sediment

Sediment is old content that remains because removing it feels risky.

Common examples:

- historical explanations
- outdated examples
- abandoned workflows
- old exceptions
- previous implementation details

Remove sediment aggressively.

A skill should describe current behavior, not its history.

---

## Pruning Order

Use this order:

1. Remove irrelevant sections.
2. Remove duplicated rules.
3. Move explanations into references.
4. Simplify remaining instructions.
5. Add precision where ambiguity remains.

---

## Completion Test

A pruned skill should have:

- fewer instructions
- clearer execution path
- no lost required behavior

The goal is not shorter text.
The goal is higher signal density.
