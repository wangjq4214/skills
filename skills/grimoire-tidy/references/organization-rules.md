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

- **Finished ticket, active spec:** the ticket's slice is independently verified, useful details already survive, and remaining work does not rely on its plan. Retire the ticket after reference and recoverability checks; retain the spec.
- **Completed spec with an undocumented exception:** ordinary cases have passing tests, but a billing exception exists only in the spec. Retain it until the exception is adequately preserved; green tests alone do not justify deletion.
- **Completed artifacts fully represented elsewhere:** tests encode the behavior, a maintained feature document explains the constraints, and an ADR preserves the consequential rationale. Remove eligible spec/ticket files rather than creating an archive copy.
- **Stale completion label:** a ticket says Completed, but a linked requirement remains unimplemented or verification results no longer apply. Retain it and report the discrepancy; tidying must not rewrite status to resolve it.
- **Untracked finished ticket:** implementation is verified, but its current content has no recoverable copy. Ask for explicit deletion or backup approval instead of assuming Git can restore it.
- **Duplicate ADRs:** use the canonical-record and supersession rules in grimoire-record; do not delete decision history as though it were a completed task list.
- **Second run with no new facts:** return no changes, not a new index format or another cleanup report file.
