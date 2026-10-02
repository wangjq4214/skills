# ADR format and lifecycle

Use body metadata, not YAML frontmatter:

```markdown
# Decision title

**Status:** Proposed
**Date:** YYYY-MM-DD

## Context

Situation, material constraints, and known alternatives.

## Decision

What was chosen and why.

## Consequences

- What this enables.
- What it constrains or requires.
```

| Status | Meaning |
| --- | --- |
| Proposed | Recorded, not yet acted on |
| Implementing | Changes in progress |
| Testing | Implementation done, verification in progress |
| Completed | Realized in the system |
| Deprecated | No longer applicable |
| Superseded | Replaced by another decision |

Supersession links belong in both records:
- Old: `**Superseded by:** [NNNN-title](./NNNN-title.md)`
- New: `**Supersedes:** [NNNN-title](./NNNN-title.md)`

A useful constraint record explains the non-obvious commitment: “Partner policy forbids shared customer storage; each tenant needs isolated storage.” A routine choice such as “use the default formatter” usually needs no ADR. Do not invent alternatives when a binding constraint leaves only one viable option.
