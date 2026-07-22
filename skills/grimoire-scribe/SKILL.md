---
name: grimoire-scribe
description: Synthesize conversation context, repo structure, domain knowledge, and ADRs into a structured spec document in .grimoire/spec/.
disable-model-invocation: true
---

# Purpose

Write a structured spec document to `.grimoire/spec/` by synthesizing conversation context, repository structure, domain concepts, and architecture decisions.

# Scope

This skill writes to `.grimoire/spec/`.

This skill does NOT:
- Bootstrap `.grimoire/` (use grimoire-bootstrapper)
- Record domain concepts or ADRs (use grimoire-modeler)
- Interrogate the user for requirements (use grimoire-interrogator)
- Write `ticket/` files or implement code

Completion: A spec file exists at `.grimoire/spec/NNNN-title-with-dashes.md` with all required sections filled.

---

# Workflow

## 1. Pre-flight

Verify `.grimoire/` exists. If not, stop and tell the user to run grimoire-bootstrapper first.

Verify `.grimoire/spec/` exists. If not, create it.

Determine the next sequence number by listing existing files in `.grimoire/spec/`. The naming convention is `NNNN-title-with-dashes.md` (zero-padded, e.g., `0001-user-authentication.md`).

Ask the user for the spec title. If the user does not provide one, derive a short kebab-case title from the requirement.

Completion: `.grimoire/spec/` exists. Next sequence number known. Title confirmed with user.

---

## 2. Gather

Read every source that constrains the spec:

1. `.grimoire/CONTEXT.md` — domain concepts and terminology. If domain split files exist (`CONTEXT-[domain].md`), read those too.
2. `.grimoire/adr/*.md` — every architecture decision record. Every one.
3. Repository structure — explore the project tree to understand existing modules, services, and integration surfaces.
4. Conversation context — the user's stated goal, constraints, and any decisions already discussed.

Completion: All ADRs are read. Domain context is loaded. Repo structure is understood. Conversation goal is captured.

---

## 3. Cross-check ADRs

Compare the proposed requirement against every ADR. For each ADR, answer:

- Does the requirement comply with this decision?
- Does the requirement introduce a new decision that contradicts an existing ADR?

If any conflict is found, stop and present the conflict to the user. Do not proceed until the conflict is resolved (user either revises the requirement or updates the ADR).

Completion: Every ADR is checked. No unresolved conflicts remain. Conflicts found are reported to the user.

---

## 4. Identify seams

A seam is an integration point where the feature touches another part of the system — another module, service, data store, or external system.

Apply the minimum seams principle (see [references/minimum-seams.md](./references/minimum-seams.md)):

- List only seams that are necessary for the feature to function.
- For each seam, record: what it connects, what it expects, what it provides.
- If a seam is optional or speculative, move it to Out of Scope or Future Evolution.

Completion: Every necessary integration point is identified. No speculative seams are included in the solution.

---

## 5. Draft spec

Write the spec following the template (see [references/spec-template.md](./references/spec-template.md)).

Required sections:

1. **Requirement** — one sentence. What must the system do?
2. **Solution** — how the requirement is satisfied. Include identified seams.
3. **End-to-End Tests** — test cases that exercise the feature from input to observable outcome. Not unit test granularity.
4. **Decisions** — implementation choices made during spec writing. Every decision must reference relevant ADRs. No decision may contradict an ADR.
5. **Test Plan** — how the feature will be verified beyond E2E tests: integration test strategy, manual test steps, performance thresholds, edge cases.
6. **Out of Scope** — what is explicitly excluded from this spec. Include rejected alternatives and deferred seams.
7. **Future Evolution** — suggested directions this feature may take. Anticipated extensions, known limitations to revisit, conditions that would trigger re-evaluation.

Completion: Draft contains all seven sections. Every decision cites relevant ADRs. Seams are restricted to necessary integrations.

---

## 6. Present draft

Show the complete draft to the user. Do not write the file yet.

Highlight:
- Which ADRs were referenced and how.
- Which seams were included and why.
- What was placed in Out of Scope and why.

Wait for explicit user approval. The user may request revisions — loop back to the relevant step.

Completion: User approves the draft.

---

## 7. Write

Write the approved spec to `.grimoire/spec/NNNN-title-with-dashes.md`.

Verify the file exists and all seven sections are present.

Completion: Spec file exists. All sections present. Sequence number is correct.

---

# Rules

- Never write a spec before user approval.
- Never violate an existing ADR. If the requirement demands it, flag the conflict and stop.
- One requirement per spec. If the user describes multiple independent requirements, ask which one to spec first.
- Use the template. Do not improvise section structure.
- Minimum seams: include only necessary integration points. Move everything else to Out of Scope or Future Evolution.
- Specs describe what and why. Tickets (in `.grimoire/ticket/`) describe how and in what order. Do not cross-contaminate.
