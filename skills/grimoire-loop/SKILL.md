---
name: grimoire-loop
description: Run an adaptive implement-and-verify loop, scaling checks and delegation to change risk.
disable-model-invocation: true
---

# Purpose

Implement or assess a change, select proportionate quality checks, fix confirmed blocking findings, and finish with a final verification pass.

# Leading words

- **iteration** — one cycle of change, verification, and assessment
- **clean** — the selected quality gates have no confirmed blocking findings
- **needs-verification** — plausible concern requiring evidence before it can block

# Workflow

## 1. Resolve source and scope

Accept a plan, ticket, spec, diff, or clear conversation goal. If implementation is already complete, begin from the current diff. Ask only when the target cannot be identified safely.

Classify risk:

- **Low** — local, reversible, no security/data/schema/public API impact.
- **Medium** — multi-file behavior or meaningful integration change.
- **High** — security, data migration, concurrency, public API, architecture, or broad cross-module impact.

Completion: Target, current state, and risk level are known.

---

## 2. Implement if needed

Invoke or follow grimoire-implement using the available source. Capture the resulting diff, including untracked files.

Completion: The intended change exists and the complete diff is available.

---

## 3. Select QA

Choose checks by evidence and risk:

- **Low risk** — main agent performs focused review plus targeted compile/test.
- **Medium risk** — delegate one or more independent review/test dimensions when this improves coverage or protects context.
- **High risk** — run check, review, and relevant tests independently; parallelize only genuinely independent work.

Use sub-agents for broad, independent, or context-heavy analysis. Keep checks inline when delegation overhead exceeds its value. Sequence checks when one result should inform the next.

Completion: Every selected gate has a reason tied to changed behavior or risk.

---

## 4. Assess findings

Classify findings as confirmed blocking, advisory, praise, or needs-verification. A finding blocks only when supported by code evidence, a failing command, a violated acceptance criterion, or a credible concrete impact.

Resolve needs-verification findings through targeted inspection or execution before deciding. Feed implement all confirmed blockers and any adjacent advisory fix that is low-risk, directly related, and cheaper to address now; report other advisory findings separately.

Completion: Every finding has an evidence-backed disposition.

---

## 5. Iterate adaptively

Fix confirmed blockers and rerun checks affected by the fix. Do not rerun clean, unrelated gates on every iteration. Run a final integrated verification when all blockers are resolved.

Use progress rather than a fixed count: continue while each iteration removes blockers and the next fix is safe. Stop when blocked by missing authority/information, failures do not converge, or additional work exceeds the requested scope.

Completion: Selected gates are clean, or the stopping reason and remaining evidence are reported.

---

## 6. Format and report

Format modified files after behavioral QA is stable when a project formatter exists; use [references/format-detection.md](./references/format-detection.md) when detection is not obvious. Report risk level, checks selected, iterations, confirmed blockers fixed, advisory findings, and final status.

Completion: Final status is **clean**, **blocked**, or **issues remaining**, with supporting evidence.

---

# Rules

- Scale orchestration to risk; three sub-agents are an option, not a mandatory baseline.
- Prefer executable verification over model judgment when a claim can be tested.
- Parallelize independent checks; sequence dependent checks.
- Rerun affected checks after fixes and perform one final integrated pass.
- Stop based on convergence, authority, and scope rather than an arbitrary iteration count.
