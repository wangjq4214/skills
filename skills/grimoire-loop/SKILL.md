---
name: grimoire-loop
description: Coordinate implement, test, review, and check in an adaptive loop scaled to change risk.
disable-model-invocation: true
---

# Purpose

Own the implement-and-verify cycle: route work to specialist skills, assess their evidence, fix confirmed blockers, and finish with integrated verification. Loop coordinates the work; it does not replace the specialists' methods.

# Leading words

- **iteration** — one cycle of change, verification, and assessment
- **clean** — the selected quality gates have no confirmed blocking findings and required evidence is available
- **needs-verification** — plausible concern requiring evidence before it can block

# Skill composition

Default cycle: **implement → test → review + check → assess → affected fixes/checks**.

| Responsibility | Skill to use |
| --- | --- |
| Production changes and confirmed fixes | `grimoire-implement` |
| Test strategy, missing regression tests, and test diagnosis | `grimoire-test` |
| Code-level risks and regressions | `grimoire-review` |
| Alignment with intent, acceptance criteria, and relevant artifacts | `grimoire-check` |

Load each selected skill before doing its work, inline or delegated; an already loaded skill need not be reread. Loading a skill does not require a separate agent or a separate report. Use its relevant steps at the selected depth rather than replacing it with a generic instruction to “verify.” If a skill is unavailable, disclose the fallback and preserve its responsibility with available tools.

This is a default, not a fixed sequence: tests may precede implementation, review may expose missing tests, and check may reveal misunderstood intent. Combine overlapping exploration and reuse valid evidence. Skip implementation for an existing change; skip new test authoring when existing checks adequately cover the behavior. Keep both code quality and intent alignment in view, even when one inline pass covers them. Briefly explain material omissions or ordering changes, not every micro-decision.

# Workflow

## 1. Resolve source and scope

Accept a plan, ticket, spec, diff, or clear conversation goal. If implementation is already complete, begin from the current diff. Honor verification-only requests: do not infer permission to fix production code. Ask only when the target cannot be identified safely.

Classify risk:

- **Low** — local, reversible, no security/data/schema/public API impact.
- **Medium** — multi-file behavior or meaningful integration change.
- **High** — security, data migration, concurrency, public API, architecture, or broad cross-module impact.

Completion: Target, authority, current state, and risk level are known.

---

## 2. Implement if needed

Load and apply grimoire-implement using the available source. Capture the resulting diff, including untracked files. Reuse its verification evidence in subsequent QA rather than running identical commands again against unchanged code.

Completion: The intended change exists and the complete diff is available, or the request is explicitly assessment-only.

---

## 3. Select and perform QA

Use the skill composition above to select methods and scale their depth:

- **Low risk** — inline grimoire-review and grimoire-check with focused executable verification; use grimoire-test when coverage needs design, additions, or diagnosis.
- **Medium risk** — apply review, check, and relevant test work; delegate independent dimensions when this improves coverage or protects context.
- **High risk** — assess intent alignment, code risks, and test evidence distinctly using check, review, and test. Use independent assessment where practical; high risk alone does not authorize multi-agent orchestration.

Keep checks inline when delegation overhead exceeds its value. When delegating, use [references/agent-prompts.md](./references/agent-prompts.md) and supply the selected skill's name, source of intent, scope, and write permissions. Sequence checks when one result should inform the next. Test authors change files: finish those changes before final review/check, or isolate writes and recheck the combined result.

Completion: Selected skills have been applied, every gate has a risk-based reason and evidence, and material omissions are explained.

---

## 4. Assess findings

Classify findings as confirmed blocking, advisory, praise, or needs-verification. A finding blocks only when supported by code evidence, a failing command, a violated acceptance criterion, or a credible concrete impact. Deduplicate issues shared by review, test, and check without discarding evidence.

Resolve needs-verification findings through targeted inspection or execution before deciding. Feed grimoire-implement all confirmed blockers within authorized scope and any adjacent advisory fix that is low-risk, directly related, and cheaper to address now; report other advisory findings separately. Route test defects to grimoire-test. If a finding changes the requirement or approved scope, return to clarification or the relevant design skill rather than quietly redefining acceptance.

Completion: Every finding has an evidence-backed disposition and unresolved work has an owner or stopping reason.

---

## 5. Iterate adaptively

Fix confirmed blockers and rerun the specialist checks affected by the fix. Do not rerun clean, unrelated gates on every iteration. Run a final integrated verification of the resulting change when all blockers are resolved.

Use progress rather than a fixed count: continue while each iteration removes blockers and the next fix is safe. Stop when blocked by missing authority/information, failures do not converge, or additional work exceeds the requested scope. Missing required verification prevents a clean result even when no defect is confirmed.

Completion: Selected gates are clean, or the stopping reason and remaining evidence are reported.

---

## 6. Format and report

When edits are authorized and a project formatter exists, format files within the permitted write scope after behavioral QA is stable; use [references/format-detection.md](./references/format-detection.md) when detection is not obvious. For verification-only requests, use non-writing format checks or report formatting findings without applying them. If formatting changes files, rerun affected verification before reporting. Report risk level, skills/checks used, material workflow adaptations, iterations, confirmed blockers fixed, advisory findings, and final status in one concise summary.

Completion: Final status is **clean**, **blocked**, or **issues remaining**, with supporting evidence.

---

# Rules

- Scale depth and delegation, not away the selected specialist's responsibility.
- Prefer executable verification over model judgment when a claim can be tested.
- Parallelize independent checks; sequence dependent checks and coordinate writes.
- Rerun affected checks after fixes and perform one final integrated pass.
- Stop based on convergence, authority, and scope rather than an arbitrary iteration count.
