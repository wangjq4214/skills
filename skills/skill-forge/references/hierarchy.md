# Information Hierarchy

A skill contains information with different urgency levels.

Place information at the highest level where it is needed.

---

## Layer 1: Execution

Location: SKILL.md

Contains:

- workflow
- ordered actions
- decisions
- completion criteria
- mandatory constraints

This information affects every execution.

---

## Layer 2: Common Reference

Location: SKILL.md or references/

Contains:

- frequently used rules
- shared concepts
- standard procedures

Use this layer when information is needed by multiple execution paths but not every step.

---

## Layer 3: External Reference

Location: references/

Contains:

- detailed explanations
- examples
- uncommon cases
- background knowledge

Load only when a specific step requires it.

---

## Progressive Disclosure

Progressive disclosure means: Start with the minimum information required to execute.

Reveal deeper information only when needed. A good structure:

    SKILL.md
        |
        +-- workflow
        |
        +-- decision point
                |
                +-- reference
                        |
                        +-- examples

---

## Placement Rule

Ask: "Does every execution need this information?"

- If yes: keep it in SKILL.md.
- If no: move it to a reference.

---

## Common Mistake

Do not move execution rules into references.
References explain.
SKILL.md controls behavior.
