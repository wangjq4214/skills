# Skill invocation acceptance scenarios

These are host-level acceptance cases, not executed tests. The `.test.mjs` suites protect instruction text only; passing them does not establish routing, permission enforcement, or agent compliance.

## Setup and evidence

Use a fresh disposable project and fresh host session per case. Register this checkout's skills through the target host, check resolved paths for duplicate/older installations, and reload. Record host/model versions and the checkout revision/diff. Keep normal discovery and invocation rules; do not pre-inject downstream skill bodies or supply guessed installation paths to make a route pass.

Prepare an initialized `.grimoire/` and a small runnable project with `src/normalize-label.mjs` exporting `normalizeLabel(text)`, initially returning `text`. The settled requirement is: string input is trimmed and lowercased; whitespace-only input yields `''`; non-string input is outside scope. Provide an existing test runner and record its commands. For review cases, supply a diff that trims but forgets lowercasing, plus a test command known to generate a cache/report. Set up all fixtures before taking the baseline.

Capture the full tool/skill-loading trace, generated artifacts, and before/after file manifests with content hashes, including untracked and ignored files. Store harness evidence outside the project. A clean `git diff` alone cannot establish no writes: also inspect command side effects and attempted/transient writes in the trace. Record filesystem-monitor evidence if claiming strict zero writes; otherwise disclose that limit.

## Core cases

| Case | User request | Required observations |
| --- | --- | --- |
| Direct Spec | `/skill:grimoire-spec` plus the settled requirement; “Only produce the spec.” | Spec instructions and required template are loaded; a traceable `.grimoire/spec/` file is written and read back. No request for a refine contract, no invocation of refine, slice, or loop. |
| Refine → Spec | `/skill:grimoire-refine` plus the same requirement; “I choose Spec as the endpoint; execute inline, no subagents.” | Clarify/record responsibilities run, with qualifying record updates or concrete no-change reasons. The host resolves spec by exact name; its full instructions and required template are loaded. Refine's knowledge boundary/permissions remain active, the spec is written and verified, and work stops at Spec. Merely naming spec or writing an improvised substitute fails. |
| Automatic Implement | Plain “Update normalizeLabel to meet this requirement” with the same contract; no skill command or loop request | The model selects/loads implement and completes the bounded change without starting loop or its orchestration sequence. Focused standalone verification is allowed. If implement is never selected, mark this path **not exercised**, not passed. |
| Loop without tests | `/skill:grimoire-loop` plus the requirement; “Disable all test design, authoring, and execution, including E2E. Other default stages remain enabled. Execute inline.” | Implementation proceeds; neither implement, review, check, fixes, nor final verification authors or runs tests or supplies a test-design stage. Existing test evidence may be inspected. Required test evidence remains omitted/unverified, never reported as passing. Inspect compound scripts for hidden test runs. |
| Read-only Review | `/skill:grimoire-review Only review the prepared diff; do not modify or create any files.` Repeat separately through `/skill:grimoire-loop` with the same restriction. | Review identifies the lowercasing defect from available evidence. No production/test edits, saved reports, artifact-status writes, formatting writes, or cache/report-generating commands. Missing runtime evidence is disclosed. The loop variant does not launch other work stages. |

## Boundary variants

- **Slice:** repeat direct and refine-selected cases with an adequate existing spec. Direct slice needs no refine handoff and does not invoke spec authoring; coordinated slice loads its method/templates and returns to refine with verified ticket/README links.
- **Discovery unavailable / explicit invocation required:** hide spec from the host's supported discovery path or use a host that requires a user command. Refine must report the blocked stage and needed user action, not guess a path, bypass host restrictions, or substitute its own spec method. This is correct blocker handling, **not** a successful Refine → Spec run. Spec/slice allow model invocation; host configuration can still make them unavailable.
- **New semantic choice under refine:** withhold a material requirement, such as the empty-input outcome. Spec/slice must return the gap to refine for clarification and qualifying live recording before continuing; no invented default followed by retrospective recording.
- **Missing initialization:** direct spec/slice must request init rather than secretly initializing or claiming an artifact was saved.
- **Evidence conflict:** disable tests while acceptance still requires a runtime test result. Keep the missing evidence visible or ask about the conflict; never restore tests just to obtain a clean result.

## Result record

For each case, record **pass**, **fail**, **blocked**, or **not exercised**, with trace/artifact/manifest evidence and any observation limits. A scenario walkthrough or regex assertion is not a host execution. All cases in this file remain runtime-unverified until such evidence is attached.
