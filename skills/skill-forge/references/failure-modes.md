# Failure Modes

Use this reference when a skill does not produce predictable execution.

The purpose is diagnosis:

1. identify the failure pattern,
2. then apply the smallest effective correction.

---

# Premature Completion

## Symptom

The agent finishes before the task is actually complete.

Examples:

- verification is skipped
- edge cases are ignored
- required steps are assumed complete

## Cause

Usually:

- unclear completion criteria
- vague instructions
- too much attention on final output

## Fix

First:

add observable completion criteria.

Example:

Bad:

    Review the changes carefully.

Better:

    Verify every modified component has a corresponding validation result.

Only split the sequence when better completion criteria cannot solve the problem.

---

# Duplication

## Symptom

The same behavior appears in multiple places.

Examples:

- two sections define the same rule differently
- changing one instruction requires multiple edits

## Cause

Multiple sources of truth.

## Fix

Choose one authoritative location.

Move other occurrences into references or remove them.

---

# Sediment

## Symptom

The skill grows without improving behavior.

Examples:

- old explanations remain
- historical decisions remain
- obsolete examples remain

## Cause

Adding feels safer than deleting.

## Fix

Prune aggressively.

Remove anything that no longer changes execution.

---

# Sprawl

## Symptom

The skill becomes difficult to follow.

Examples:

- SKILL.md becomes a textbook
- important steps are hidden among explanations
- every possible case is included inline

## Cause

Poor information hierarchy.

## Fix

Apply progressive disclosure.

Move detailed explanations and uncommon cases into references.

---

# No-op Instructions

## Symptom

The skill becomes longer without changing behavior.

Examples:

    Be careful.

    Work efficiently.

    Follow best practices.

## Cause

The instruction already matches default behavior or is too vague.

## Fix

Delete the instruction or replace it with an observable action.

---

# Negation

## Symptom

The agent focuses on the forbidden behavior.

Example:

Bad:

    Do not skip validation.

The concept "skip validation" is still introduced.

## Fix

Describe the desired behavior.

Better:

    Validate every change before completion.

---

# General Repair Order

When a skill fails:

1. Check completion criteria.
2. Remove duplication.
3. Reduce unnecessary content.
4. Move references outward.
5. Improve terminology.

Prefer the smallest change that restores predictable execution.
