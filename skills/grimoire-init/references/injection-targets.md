# Injection targets

## Choose targets

Inspect root `AGENTS.md` and `CLAUDE.md`. Recommend the file used by the intended agent; if several agents need registration, propose each relevant target explicitly rather than selecting by filename priority or modifying every file found. If the intended agent is unclear, ask which target(s) to use as part of plan approval.

Treat other names, including `CURSOR.md` and `AGENT.md`, as candidates only when project configuration or the user confirms they are loaded; their presence alone does not establish host support. If no suitable target exists, offer to create root `AGENTS.md`, making any unverified host support explicit. Do not claim registration is effective while that support remains unresolved.

## Registration block

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

## Propose the action

- Neither marker exists: append the block, adding a trailing newline first if needed.
- One complete block exists: offer keep, replace with the canonical block, or merge; show the proposed result.
- Multiple complete, non-nested blocks exist: propose consolidation into one, preserving content between them.
- Markers are unpaired, reversed, or nested: show the malformed region and propose exact repair boundaries for explicit approval. Without that approval, leave the target unchanged and report registration as blocked.

Do not delete or reorder unrelated content outside approved block or repair boundaries.
