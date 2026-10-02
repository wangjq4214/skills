# Spec template

Omit sections that add no requirement, decision, or verification value.

```markdown
# Feature title

**Spec ID:** NNNN
**Status:** Draft
**Date:** YYYY-MM-DD
**Sources:** Requirement source paths or a concise conversation contract.

## Requirements

Observable outcomes and invariants, preserving every requested requirement.

## Solution

How the outcomes are satisfied within established constraints.

### Seams

| Seam | Connects | Expects | Provides |
| --- | --- | --- | --- |
| Boundary | Side A → Side B | Required contract | Exposed guarantee |

## End-to-End Tests

### Scenario name
- **Given:** Preconditions.
- **When:** Trigger.
- **Then:** Observable result.

## Decisions

- **Choice:** Material choice.
- **Reason/source:** Rationale and applicable ADR link.

## Test Plan

Additional integration, manual, performance, or edge-case evidence as needed.

## Out of Scope

Meaningful exclusions established by the source or approved decision.

## Future Evolution

Known limitation or concrete trigger for revisiting the design.
```

An end-to-end case describes a user's/system's input-to-outcome path, not an isolated function return. Use supplied performance thresholds rather than inventing numbers. Requirements may include mandated technology, but distinguish that constraint from the outcome it serves. ADR links must support the actual claim; a deployment decision is not evidence for an authentication provider.
