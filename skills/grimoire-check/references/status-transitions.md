# Status Transitions

Examples for step 7 — determining and writing artifact status updates under the main skill's evidence rule. Leave status unchanged when evidence cannot justify a transition; report needs-verification.

---

## Ticket status lifecycle

```
Todo → In Progress → Done
```

### Determination rules

| Condition                                      | Status        |
| ---------------------------------------------- | ------------- |
| All acceptance criteria are verified satisfied | `Done`        |
| At least one criterion satisfied, not all      | `In Progress` |
| No criteria satisfied                          | `Todo`        |
| Ticket has no acceptance criteria              | Do not update |

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

Assess all spec requirements, including necessary seams, not seams alone.

| Verified condition                                  | Status        |
| --------------------------------------------------- | ------------- |
| All requirements satisfied                          | `Implemented` |
| At least one requirement satisfied, others unmet    | `In Progress` |
| No requirements satisfied                           | `Draft`       |
| No assessable requirements or insufficient evidence | Do not update |

### Requirement classification mapping

From step 5 cross-check:
- Match → requirement satisfied.
- Missing required behavior or necessary seam → unsatisfied (gap).
- Defensible alternative meeting requirements and constraints without concrete risk → satisfied, despite design deviation.
- Blocking deviation → unsatisfied.
- Needs-verification → leave status unchanged.

### Example

Spec 0001 has four requirements, including necessary seams:
- OAuth2 handshake: match
- Token issuance: match
- Token validation: advisory deviation (different algorithm; required behavior and constraints verified, no concrete risk)
- User storage: gap (required persistence absent)

→ Status: `In Progress`. Three requirements satisfied, one unmet.

---

## ADR status lifecycle

```
Proposed → Implementing → Testing → Completed
                ↓                      ↓
          Deprecated ←────────── Superseded
```

### Determination rules

| Condition                                         | Status         |
| ------------------------------------------------- | -------------- |
| Decision fully realized in code                   | `Completed`    |
| Decision partially realized                       | `Implementing` |
| Decision not yet acted on                         | `Proposed`     |
| Explicit approved evidence retires the decision   | `Deprecated`   |
| Referenced newer ADR explicitly replaces this one | `Superseded`   |

### How to assess ADR realization

1. Identify the decision: what approach was chosen?
2. Search the codebase for evidence that this approach is used.
3. If the decision is a constraint (e.g., "AWS cannot be used"), verify the constraint is honored.

### Evidence thresholds

- **Fully realized**: The decision is consistently applied across all relevant modules. No counterexamples found.
- **Partially realized**: The decision is applied in some places but not others, or the implementation is incomplete.
- **Not yet acted on**: No code evidence that the decision has been implemented.
- **Deprecated**: Explicit approved retirement evidence establishes that the decision no longer applies; removed code alone is insufficient.
- **Superseded**: A newer ADR exists that explicitly replaces this one. Only set if the superseding ADR is referenced.
- Without retirement or supersession evidence, removed code indicates an implementation gap or needs-verification, not retirement. Leave status unchanged when evidence is insufficient.

### Edge case: constraint ADRs

Some ADRs define constraints (what NOT to do) rather than approaches (what TO do).

Example: "AWS Cannot Be Used Due to Compliance."

Assessment: inspect relevant implementation, dependencies, deployment configuration, and available operational evidence. A verified compliant implementation can support `Completed`; an empty keyword search alone cannot. Confirmed prohibited usage is a constraint violation to report, not evidence that the ADR was retired. Update implementation status only when the evidence supports it; otherwise retain the current status and report the gap or uncertainty.

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
