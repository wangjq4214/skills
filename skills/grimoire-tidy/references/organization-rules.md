# Organization Rules

## Navigation and structure

Reuse existing entry points before creating another index. Keep `CONTEXT.md` focused on terminology and its domain index; it is not a general project dashboard. When broader navigation is genuinely missing, propose a lightweight index consistent with local conventions rather than introducing a mandatory new layout. Link to authoritative documents without duplicating their bodies or manually maintained statistics.

Prefer topic-oriented headings and links over physical relocation. Keep stable IDs and filenames unless their current form materially obstructs navigation. Distinguish current guidance from historical decisions through existing status conventions. Do not renumber ADRs to close gaps or normalize every file to one template.

A small knowledge store may need no index or split at all. Machine-readable maps, run checkpoints, and unfamiliar formats require their own schema and lifecycle rules; Markdown cleanup rules do not authorize transforming them.

## Durable information destinations

| Information | Destination or action |
| --- | --- |
| Project-specific terminology and domain relationships | `CONTEXT.md` or its indexed domain files, following grimoire-record |
| Consequential architectural choice, alternatives, rationale, or binding constraint | Existing appropriate ADR, or a new ADR only when an actual recorded decision qualifies; follow grimoire-record's history rules |
| Ongoing behavior, business rules, exceptions, acceptance requirements | Existing maintained feature/domain documentation or tests that actually encode the contract; retain the spec when no adequate source exists |
| Execution steps, temporary investigation, completed change lists | Discard with an eligible ticket; do not promote into permanent knowledge |
| Already-preserved information | Reference the existing source; do not duplicate it to demonstrate that extraction occurred |
| Contradictory or uncertain information | Retain and report the conflicting sources until resolved |

Do not turn CONTEXT into a requirements dump or ADRs into implementation diaries. Tests can preserve observable behavior but may not explain business intent, operational constraints, or a rejected alternative. Code that happens to implement a rule is not automatically an adequate record of why that rule is required.

Prefer a concise addition to an existing durable document over a new file. If preserving a contract requires a new long-lived document or edits outside the authorized maintenance scope, propose that destination and retain the source until the transfer is approved and verified.

## Retirement examples

- **Finished ticket, active knowledge:** preserve any unique requirement or constraint in the canonical domain source, retarget meaningful references, and retire the ticket. Keep the broader spec only if it remains the sole active execution contract or durable behavior source.
- **Completed spec with an undocumented exception:** compress the billing exception into maintained feature/domain documentation before deleting the spec. Green tests alone do not prove that business intent survives.
- **Completed artifacts fully represented elsewhere:** tests encode the behavior, a maintained feature document explains the constraints, and an ADR preserves the consequential rationale. Remove the redundant spec/ticket files rather than creating an archive copy.
- **Inactive unfinished spec:** preserve unresolved requirements that still matter, discard obsolete execution detail, and delete the spec when no active work depends on it. Its unfinished label alone is not a retention reason.
- **Active ticket used as the only work contract:** retain it until the active dependency ends or its necessary execution contract is moved and references are retargeted.
- **Untracked spec or ticket:** exclude it entirely. Do not read it for knowledge, merge it, edit it, delete it, or use it to influence tracked-file cleanup.
- **Tracked file with uncommitted edits:** it is in scope for analysis, but do not delete unrecoverable working-tree content without explicit authorization.
- **Duplicate ADRs:** use the canonical-record and supersession rules in grimoire-record; do not erase decision history as though it were an execution artifact.
- **Second run with no new facts:** return no changes, not a new index format or another cleanup report file.
