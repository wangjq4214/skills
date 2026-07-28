# Status Transitions

Detailed rules for step 7 — determining and writing artifact status updates.

---

## Ticket status lifecycle

```
Todo → In Progress → Done
```

### Determination rules

| Condition                                  | Status        |
| ------------------------------------------ | ------------- |
| All acceptance criteria have matching code | `Done`        |
| At least one criterion satisfied, not all  | `In Progress` |
| No criteria satisfied                      | `Todo`        |
| Ticket has no acceptance criteria          | Do not update |

### Partial satisfaction

When a criterion is "partially satisfied" from step 5:
- Count it as not satisfied for status purposes.
- The ticket can only reach `Done` when every criterion is fully satisfied.

### Example

Ticket T0002 has three acceptance criteria:
- Criterion A: match (satisfied)
- Criterion B: gap (unsatisfied)
- Criterion C: deviation — blocking (partially satisfied)

→ Status: `In Progress`. Two criteria are not fully satisfied.

---

## Spec status lifecycle

```
Draft → In Progress → Implemented
```

### Determination rules

| Condition                          | Status        |
| ---------------------------------- | ------------- |
| All seams match                    | `Implemented` |
| At least one seam matches, not all | `In Progress` |
| No seams match                     | `Draft`       |
| Spec has no seams defined          | Do not update |

### Seam classification mapping

From step 5 cross-check:
- "Seam matches" → that seam counts as satisfied.
- "Seam missing" → that seam counts as unsatisfied (gap).
- "Spec-level deviation" → the seam is unsatisfied for status purposes.

### Example

Spec 0001 has four seams:
- OAuth2 handshake: match
- Token issuance: match
- Token validation: deviation (different algorithm)
- User storage: gap (no user table yet)

→ Status: `In Progress`. Two seams satisfied, two not.

---

## ADR status lifecycle

```
Proposed → Implementing → Testing → Completed
                ↓                      ↓
          Deprecated ←────────── Superseded
```

### Determination rules

| Condition                                           | Status         |
| --------------------------------------------------- | -------------- |
| Decision fully realized in code                     | `Completed`    |
| Decision partially realized                         | `Implementing` |
| Decision not yet acted on                           | `Proposed`     |
| Decision no longer relevant (code removed approach) | `Deprecated`   |
| Decision replaced by newer ADR                      | `Superseded`   |

### How to assess ADR realization

1. Identify the decision: what approach was chosen?
2. Search the codebase for evidence that this approach is used.
3. If the decision is a constraint (e.g., "AWS cannot be used"), verify the constraint is honored.

### Evidence thresholds

- **Fully realized**: The decision is consistently applied across all relevant modules. No counterexamples found.
- **Partially realized**: The decision is applied in some places but not others, or the implementation is incomplete.
- **Not yet acted on**: No code evidence that the decision has been implemented.
- **Deprecated**: Code no longer uses this approach; the decision is irrelevant.
- **Superseded**: A newer ADR exists that explicitly replaces this one. Only set if the superseding ADR is referenced.

### Edge case: constraint ADRs

Some ADRs define constraints (what NOT to do) rather than approaches (what TO do).

Example: "AWS Cannot Be Used Due to Compliance."

Assessment: search for any AWS imports, SDK usage, or configuration. If none found → `Completed`. If AWS usage found → note as a deviation in the report AND set ADR status to `Implementing` or `Proposed`.

---

## Writing updates

### Format

Use the `edit` tool to replace only the `**Status:**` line. Do not rewrite the entire file.

Example edit:

```markdown
oldText: **Status:** Todo
newText: **Status:** Done
```

### Rules

- Match the exact current status text. Status values are case-sensitive.
- If the status is already correct, skip the file. Do not rewrite unchanged files.
- Preserve all surrounding whitespace and formatting.
- Only update artifacts that were loaded in step 2. Do not scan for additional artifacts.

### Atomicity

- Status updates are independent — failure to update one artifact does not block others.
- If an edit fails because the old status text doesn't match, note the mismatch in the report but continue.
