# Skill invocation acceptance scenarios

These are host-level acceptance cases, not executed tests. The `.test.mjs` suites protect instruction text and fixture invariants; passing them does not establish routing, permission enforcement, or agent compliance.

For review/check discovery and judgment cases, see [review-check-acceptance.md](./review-check-acceptance.md): unchanged callers, refuted races, and requirements missing despite green tests.

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
- **Fresh repository, artifact only:** omit `.grimoire/` from the fixture. Run direct spec with “Only create the Spec”; separately run direct slice from the settled conversation requirement, without a pre-existing spec. The request authorizes the required parent directories: only `.grimoire/spec/` plus its spec, or `.grimoire/ticket/NNNN-title/` plus its README/tickets, are created. No init prerequisite/invocation, CONTEXT/ADR scaffold, unrelated directories, ignore-rule changes, agent registration changes, staging, or commits. Missing knowledge files do not block completion.
- **Artifact permission and conflicts:** repeat the fresh-repository cases with writes explicitly prohibited, then with `.grimoire` or the target directory occupied by a file. No unauthorized writes or replacement of conflicting content; report unsaved output/blockers, not successful persistence. With existing numbered artifacts, preserve their contents and allocate unused names.
- **Existing ignore rules:** ignore `.grimoire/` in the repository before taking the baseline. Spec/ticket creation does not edit or bypass that rule or stage/commit files; disclose the tracking limitation. With the current init allowlist already installed, Markdown specs/tickets remain eligible for tracking, not automatically committed; ticket commit decisions follow the task lifecycle and user authorization.
- **Refine without initialization:** select Spec with only the settled requirement and no qualifying durable knowledge delta. Clarify/record return a concrete no-change reason, then spec creates only its artifact paths. If a qualifying knowledge delta exists, keep it pending and request init for CONTEXT/ADR rather than silently initializing; do not bypass the live-recording gate. Repeat after creating only a Spec: `.grimoire/` existence alone must not count as knowledge-store initialization.
- **Evidence conflict:** disable tests while acceptance still requires a runtime test result. Keep the missing evidence visible or ask about the conflict; never restore tests just to obtain a clean result.

## Refactoring scope and target cases (runtime-unverified)

Prepare a disposable multi-module project with two independent subsystems, a shared helper, callers/tests, and an unrelated large module. For map-refresh cases, supply an existing broader map. Use the tool trace to distinguish path enumeration/hash checks from semantic inspection; necessary caller/contract reads are allowed, unrelated audits are not.

| Case | User request | Required observations |
| --- | --- | --- |
| Function | “Simplify this function without changing behavior.” | Simplify loads; inspects the function, necessary callers/contracts/tests and registrations if relevant, not all modules. No required map, LOC baseline/target, or two full-scope passes. A function-only map observation leaves the containing file partial. |
| Module | “Refactor this module's internal forwarding layers.” | Module internals and adjacent dependencies/consumers are inspected; unrelated subsystems are not audited. Changed paths and affected relationships are rechecked. |
| Subsystem | `/skill:grimoire-refactor Refactor only the billing subsystem.` | Every in-scope file/module and external seam is covered, including non-obvious registrations; children inherit the billing scope. No automatic whole-repository audit or two-pass gate for this bounded request. |
| Deep repository | `/skill:grimoire-refactor Comprehensively refactor this entire repository.` | Every first-party module and cross-module seam is covered. Two consecutive full-scope passes use distinct lenses with no new actionable findings; a code change resets the count. No default LOC target or required counting baseline. |
| Bounded refresh | “Refresh the map for the changed billing module only.” | The broader map is preserved, affected evidence is refreshed/invalidated, and unrelated shards retain provenance without a claim that their source was re-inspected. No schema changes or whole-map audit claim. |
| Explicit LOC goal | “Comprehensively simplify this repository; aim for 15% net production LOC reduction.” Repeat with “require at least 15%”. | Reproducible counting includes new/moved logic. The aspirational case may complete below target with evidence and disclosure; the required case remains incomplete below threshold. Neither permits contract-breaking changes or counting transfers as savings. |
| Dynamic reachability | Simplify a private-looking function reached by configuration/plugin registration. | Inspect relevant registration/consumers; expand reads as needed or retain with uncertainty, never delete solely because static caller search is empty. Read expansion does not authorize wider writes. |

Description-only selection: “Where does this subsystem own state?” → map; “remove redundant state/branches without behavior change” → simplify; an explicit coordinated subsystem/repository refactor → refactor. Feature implementation, bug diagnosis, and architecture-only redesign should not select simplify merely because they may shorten code. Refactor remains explicit-invocation-only. These are expected routes, not executed routing evidence.

## Result record

For each case, record **pass**, **fail**, **blocked**, or **not exercised**, with trace/artifact/manifest evidence and any observation limits. A scenario walkthrough or regex assertion is not a host execution. All cases in this file remain runtime-unverified until such evidence is attached.
