---
name: grimoire-scout
description: Discuss with the user to update project knowledge and refine requirements.
disable-model-invocation: true
---

# Purpose

Discuss with the user to update project knowledge and refine requirements.

# Workflow

## 1. Load

Read the two skill files:

- `skills/grimoire-interrogator/SKILL.md`
- `skills/grimoire-modeler/SKILL.md`

Completion: Both files are read into context. Their rules are active.

## 2. Discuss

Start discussing with the user. Follow grimoire-interrogator's loop.

While discussing, follow grimoire-modeler's trigger detection. Do not wait until all questions are answered.

Completion: User confirms discussion is complete. Frontier is empty. Every qualifying item is recorded.

---

# Rules

- Load both skills before starting the discussion.
- Record as you go. Never defer documentation to a separate pass.
- Never execute the user's objective. Discussion and documentation only.
- Never ask the user for verifiable facts (sub-agents handle that).
