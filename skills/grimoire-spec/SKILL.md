---
name: grimoire-spec
description: Synthesize requirements, relevant repository context, and applicable decisions into one or more proportionate specs.
disable-model-invocation: true
---

# Purpose

Write specifications that preserve all requested outcomes, expose material decisions and seams, and scale detail to risk.

# Scope

This skill writes to `.grimoire/spec/`. It may ask about irreversible or scope-changing decisions, but it does not implement production code unless separately authorized.

Completion: Every independent requirement is represented in an appropriate spec file, with meaningful decisions and verification guidance.

---

# Workflow

## 1. Pre-flight

Verify `.grimoire/` exists. If not, stop and tell the user to run grimoire-init first.

Verify `.grimoire/spec/` exists. If not, create it.

Determine the next available sequence number from `.grimoire/spec/`. Identify independent requirements provisionally and derive concise kebab-case titles; defer consequential split/merge decisions to step 6.

Completion: The target directory and provisional file identities are known.

---

## 2. Gather

Load the sources relevant to this requirement:

1. Conversation context and the user's stated goals.
2. Relevant domain entries from `.grimoire/CONTEXT.md` and any referenced domain files.
3. ADRs referenced by the requirement, affected modules, or context index. Scan ADR titles/statuses first; read unrelated ADRs only when repository-wide policy may apply.
4. Relevant repository modules and integration surfaces.

Completion: The requirement and its material constraints are understood without loading unrelated project history.

---

## 3. Cross-check decisions

Compare the proposed requirement against applicable ADRs. For each conflict, distinguish:

- **Resolvable in the spec** — document the tradeoff and recommended resolution.
- **Requires authority** — ask the user before committing to an irreversible or policy-breaking direction.

Non-blocking conflicts may remain visible in the draft with an explicit assumption.

Completion: Applicable decisions are checked; blocking conflicts are resolved or clearly marked.

---

## 4. Identify seams

A seam is an integration point where the feature touches another module, service, data store, or external system.

Apply the minimum seams principle (see [references/minimum-seams.md](./references/minimum-seams.md)):

- Include seams necessary for the feature to function or to preserve a required boundary.
- Record what each seam connects, expects, and provides.
- Move speculative seams to Out of Scope or Future Evolution.

Completion: Necessary integration points are identified without speculative architecture.

---

## 5. Draft spec

Use [references/spec-template.md](./references/spec-template.md) as the default structure. Include the sections that carry useful information:

1. **Requirement(s)** — preserve every independent requirement supplied by the user. Split into multiple spec files when they have independent lifecycles or approval paths.
2. **Solution** — how each requirement is satisfied, including necessary seams.
3. **End-to-End Tests** — representative input-to-outcome cases.
4. **Decisions** — material choices and applicable ADR references.
5. **Test Plan** — additional integration, manual, performance, or edge-case verification when relevant.
6. **Out of Scope** — meaningful exclusions, not boilerplate.
7. **Future Evolution** — include only known limitations or credible extension triggers.

Sections may be shortened or omitted when they add no decision or verification value; note the omission in the draft.

Completion: Every user requirement is represented, decisions are traceable, and the document contains no filler.

---

## 6. Present and decide

Show the draft and summarize material assumptions, ADR usage, seams, and exclusions.

Write immediately when the draft contains only reversible choices. Ask for approval before writing when it commits to an irreversible decision, changes scope, resolves an ADR conflict, or separates/combines user requirements consequentially. If the user rejects or adjusts the draft, return to the affected decision, gather, or drafting step and present the revision.

Completion: The draft is safe to write or explicitly approved; rejected paths have been revised or intentionally stopped.

---

## 7. Write

Write one or more files to `.grimoire/spec/NNNN-title-with-dashes.md`. Verify each file exists and represents its assigned requirements.

Completion: All requested requirements are captured in valid spec files.

---

# Rules

- Preserve all independent requirements; never silently pick only the first.
- Scale context loading to relevance rather than reading every ADR by default.
- Treat the template as a useful default, not a reason to produce empty sections.
- Ask before committing irreversible, scope-changing, or policy-conflicting decisions.
- Specs describe what and why. Tickets describe execution slices and ordering.
