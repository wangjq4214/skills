# Artifact status transitions

Read before proposing or writing status changes. The main skill governs write permission and coordinator ownership. Status describes the whole artifact, not only the inspected work unit.

## Evidence and precedence

Do not infer a negative result from unavailable evidence. If evidence needed for a transition is insufficient, leave status unchanged and report needs-verification. Partial implementation counts as unmet for completion; a defensible design alternative meeting the requirements counts as satisfied.

For an ADR, evaluate explicit supersession or approved retirement before implementation progress. Preserve an existing `Superseded` or `Deprecated` status unless an explicit approved lifecycle decision changes it. Old code still present, or absent, cannot reactivate a retired decision. Set `Superseded` only with a referenced replacement ADR; set `Deprecated` only with approved retirement evidence.

For active artifacts, allow a backward implementation-status transition only when current evidence demonstrates a regression or approved scope change. Report the reason; missing runtime access, a partial audit, or unavailable tests is not a reason to downgrade status.

## Tickets and specs

Evaluate every acceptance criterion/requirement, including necessary seams. No criteria, partial coverage, or unresolved required evidence means no status update.

| Verified state | Ticket | Spec |
| --- | --- | --- |
| All requirements satisfied with required evidence | `Done` | `Implemented` |
| Some satisfied, others demonstrably unmet | `In Progress` | `In Progress` |
| None satisfied, all demonstrably unmet | `Todo` | `Draft` |

A partially satisfied criterion is unmet, not a partial pass. Do not promote from a local result while other required checks or human evidence remain pending.

## Active ADRs

| Established state | Status |
| --- | --- |
| Decision not acted on, with sufficient coverage to establish this | `Proposed` |
| Decision partially implemented, or a demonstrated implementation defect remains | `Implementing` |
| Implementation complete; identified required verification remains pending | `Testing` |
| Decision realized across relevant surfaces and all required verification satisfied | `Completed` |

`Testing` records known pending verification, not proof of acceptance. Use it only when implementation completeness and the remaining checks are established; uncertainty about implementation itself leaves status unchanged. Excluded or unavailable required checks do not justify `Completed`. If no execution check is required, direct inspection may provide sufficient verification; do not invent a test requirement.

Constraint ADRs need positive coverage of relevant implementation, dependencies, deployment configuration, and operational evidence where applicable. An empty keyword search does not prove compliance. Prohibited usage is a violation, not retirement.

Examples:
- Code complete, required manual E2E pending → active ADR `Testing`; ticket stays unchanged until its transition evidence is complete.
- Existing `Superseded` ADR, old implementation still present → keep `Superseded`.
- Existing `Completed` ADR, runtime inaccessible and no demonstrated regression → unchanged, needs-verification.
- Confirmed regression in an active ADR's implementation → `Implementing`, with evidence and downgrade reason.

## Writing

Update only loaded artifacts within authorized scope. Replace only the exact current `**Status:**` field using the host's targeted editing tool; preserve all non-status content, whitespace, and formatting. Skip unchanged statuses.

Read back each change and report old/new status and evidence. Independent artifact updates need not be atomic together. If a field is missing, ambiguous, concurrently changed, or an edit fails, report the mismatch rather than rewriting the artifact or guessing. Do not scan unrelated artifacts to find more statuses to update.
