---
name: grimoire-plan
description: Use when asked to plan how to implement a change or revise an existing implementation approach, including steps, affected code, dependencies, and verification. For required behavior and acceptance criteria, use grimoire-spec.
---

Plan the implementation approach; do not implement production code or treat a saved plan as implementation authorization.

## Invocation and permissions

Under orchestration, the caller's execution contract governs inputs, persistence, checkpoints, reporting, and completion. Apply only enabled responsibilities; do not restore excluded work through this skill's defaults.

Standalone, save the plan by default and end with the handoff. If persistence is disabled, keep the approach in conversation: do not create directories, files, or a viewer. Under loop, return control without adding an approval gate.

## Source and destination

Accept conversation, spec, ticket, selected slice tickets plus their relationship README, or an existing plan. Preserve source paths or a concise intent/acceptance/constraints contract. User intent and acceptance criteria outrank incidental plan details.

Reuse an adequate existing plan; revise the same file for the same goal. Keep unrelated goals separate. For a new persisted plan, use `.grimoire/plans/NNNN-title.md`, with a short kebab-case title and one more than the highest existing plan number (or `0001`), ignoring `viewer.html`.

Persistence needs only `.grimoire/plans/`: create missing parent directories when authorized. Do not require grimoire-init or change registration, knowledge files, or Git configuration. A path/type conflict or denied write is a blocker to persistence, not permission to replace existing content.

## Plan content

Read relevant repository code, integration surfaces, available domain knowledge, and applicable ADRs. Scan metadata before expanding unrelated history; missing optional knowledge files are not prerequisites.

Describe:
- Source intent, material acceptance criteria, constraints, and scope.
- Coherent implementation steps ordered by real dependencies, each with an observable outcome or verification method. Name files/symbols when known, otherwise the discovery point.
- Material boundary changes: responsibility, location, dependencies, rationale, and meaningful alternatives. Predicted types/files are hypotheses, not acceptance criteria.
- Credible edge cases, expected behavior, and their owning step or check.
- Verification appropriate to behavior and risk. Distinguish proposed methods from authorized execution and unavailable/excluded evidence.

Keep detail proportional. Coupled changes may land atomically; do not force type-by-type sequencing. Use pseudocode only for non-trivial logic and diagrams only for non-obvious relationships. For a consequential boundary decision, consult [design-principles.md](./references/design-principles.md); for uncertain edge-case selection, [edge-case-guide.md](./references/edge-case-guide.md).

## Handoff

For persisted plans, adapt [markdown-template.md](./references/markdown-template.md), omit irrelevant sections, save and read back. For conversation-only plans, return the same essential content without a file. Record material revisions with the prior approach, reason, and evidence; revisions cannot erase acceptance criteria.

Complete when every material criterion has an owning step/check or an explicit unresolved limitation, and the selected deliverable is available. Return path or conversation context, assumptions, and blockers when reporting is enabled. Never claim a failed save succeeded.

Only on an explicit preview request, follow [preview.md](./references/preview.md); if persistence is disabled, resolve the conflict before creating preview files.
