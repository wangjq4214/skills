# Injection Targets

Configuration files that instruct AI coding agents about the project.

## Target Files

Search for these files in the project root (in order of priority):

1. `AGENTS.md` — convention used by multiple agent tools
2. `CLAUDE.md` — Anthropic Claude Code convention
3. `CURSOR.md` — Cursor IDE convention
4. `AGENT.md` — fallback single-file convention

If none exist, offer to create `AGENTS.md`.

## Injection Block

Append this block to each target file:

```markdown
<!-- GRIMOIRE:START -->
## Grimoire

This project maintains a grimoire at `.grimoire/`:

- `CONTEXT.md` — domain concepts and terminology (may split into `CONTEXT-[domain].md`)
- `adr/` — architecture decision records
- `spec/` — requirements specifications
- `ticket/` — implementation plans

Consult relevant grimoire files before making design decisions that affect project concepts, architecture, or requirements.
<!-- GRIMOIRE:END -->
```

## Detection

The `<!-- GRIMOIRE:START -->` / `<!-- GRIMOIRE:END -->` markers allow re-detection.

If a target already contains a grimoire block:

- Capture the existing block content during Explore.
- In the Plan step, show the existing block alongside the canonical block. Let the user choose: keep existing, replace with canonical, or merge.
- Never inject a duplicate block.

## Rules

- Append only. Never delete or reorder existing content.
- If the target file ends without a trailing newline, add one before the block.
- Inject at most one block per target file.
