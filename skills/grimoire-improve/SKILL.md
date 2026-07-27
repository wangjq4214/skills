---
name: grimoire-improve
description: Audit codebase structure against 10 quality dimensions and deliver a prioritized top-5 HTML report with before/after diagrams. Iterative — run repeatedly to refine the codebase incrementally.
disable-model-invocation: true
---

# Purpose

Systematic codebase quality audit across 10 structural dimensions. Each run selects up to 5 most impactful issues, produces an HTML report with before/after Mermaid diagrams, priority scores (1–5), and actionable fix strategies. Designed for iterative use — run, fix, run again.

# Scope

This skill audits existing code structure and produces a browser-viewable improvement report.

This skill does NOT:
- Implement fixes (use grimoire-implement after reviewing the report)
- Audit non-structural concerns (performance benchmarks, security scans, style formatting)
- Write to any code file
- Generate more than 5 findings per run

Completion: An HTML report exists at `.grimoire/improve-report.html` with up to 5 findings, each scored and diagrammed. The report is opened in the browser.

# Leading words

- **quality dimension** — one of the 10 structural checks applied during audit
- **finding** — a single discovered issue with score, diagrams, problem description, strategy, and benefit
- **priority score** — integer 1–5 rating whether this issue is worth fixing now (5 = fix immediately, 1 = cosmetic)

---

# Workflow

## 1. Survey codebase

Explore the repository structure to understand its shape:

- Identify the primary language and framework.
- List top-level modules, packages, or directories.
- Find the largest files and most-referenced types (god object candidates).
- Map the dependency direction between modules.

Use `references/dimensions.md` to understand what each dimension checks.

Completion: A rough module map exists. The 3–5 largest files and most-connected types are identified.

---

## 2. Audit against 10 dimensions

Examine the codebase through each quality dimension. For each dimension, ask the key question and record concrete evidence.

The 10 quality dimensions:

| # | Dimension | Key question |
|---|-----------|--------------|
| 1 | Clear responsibility | Does each struct/class have one clear job? |
| 2 | Hidden implementation | Are internal details concealed behind public APIs? |
| 3 | Method placement | Does each method belong to the right type? |
| 4 | Expressive API | Does the public API communicate intent? |
| 5 | Domain types | Do types express domain concepts directly? |
| 6 | Dependency direction | Do dependencies flow toward stability? |
| 7 | Change isolation | Would a requirement change ripple broadly? |
| 8 | Speculative abstraction | Are there abstractions with only one real implementation? |
| 9 | God object | Is there a type that knows or does too much? |
| 10 | Leaked state | Does internal state escape through public interfaces? |

Detailed explanations and examples for each dimension live in [references/dimensions.md](./references/dimensions.md).

For each dimension, note:

- Which files/types triggered the concern.
- A concrete code snippet or pattern.
- A rough severity assessment.

Completion: All 10 dimensions have been examined. Evidence is recorded for each.

---

## 3. Select top findings

From all evidence collected, pick up to 5 findings with the highest impact-to-effort ratio.

Selection criteria:

- Does the issue cause real bugs or confusion today?
- Would fixing it reduce the blast radius of future changes?
- Is the fix achievable without rewriting the entire module?
- Does the issue touch code that changes frequently?

Drop findings that:
- Are purely cosmetic (rename a variable, reorder a method).
- Require a full rewrite to address.
- Have no observable impact on current development.

Rank the selected findings by priority.

Completion: Up to 5 findings selected. Each has a priority score (1–5) and a concrete code location.

---

## 4. Generate HTML report

Write `.grimoire/improve-report.html` using the template structure in [references/report-template.md](./references/report-template.md).

For each finding, include:

1. **Header** — dimension name, priority score (1–5), file location.
2. **Problem** — what exists now, why it violates the dimension, concrete evidence (code snippet).
3. **Before diagram** — Mermaid diagram showing current (problematic) structure.
4. **After diagram** — Mermaid diagram showing proposed (improved) structure.
5. **Strategy** — specific, actionable steps to fix the issue.
6. **Expected benefit** — what changes after the fix (measurable if possible).

Mermaid conventions:

- Use `graph TD` or `graph LR` for structure diagrams. `classDiagram` for type relationships.
- Keep nodes to 3–7. Simpler diagrams render more reliably.
- Before diagrams show the problem (e.g., tangled dependencies, fat class). After diagrams show the fix (e.g., split responsibilities, clean boundaries).
- Use `style` only when highlighting is essential. Avoid complex subgraphs unless necessary.
- Detailed conventions live in [references/mermaid-conventions.md](./references/mermaid-conventions.md).

Completion: `.grimoire/improve-report.html` exists and contains all findings with diagrams.

---

## 5. Open report

Open the report in the default browser:

```bash
start .grimoire/improve-report.html   # Windows
open .grimoire/improve-report.html    # macOS
xdg-open .grimoire/improve-report.html # Linux
```

Completion: Browser window displays the report. User can review findings and decide which to fix.

---

## 6. Hand off to implementation

After the user has reviewed the report, ask:

> Ready to fix these? Reply with the finding numbers to implement (e.g. "fix 1,3,4") or "all". I'll hand each off to grimoire-implement.

For each finding the user selects:

1. Read the finding's problem, strategy, and after-diagram from the report.
2. Construct a focused implementation prompt that includes: the file location, the problem description, the fix strategy, and the after-diagram as the target design.
3. Invoke `grimoire-implement` with that prompt.

Rules for implementation hand-off:

- Implement one finding at a time, in priority order (highest score first).
- After each finding is implemented, verify the changes compile before moving to the next.
- Do not implement findings the user did not approve.

Completion: All approved findings have been implemented and compile. User is prompted to run `grimoire-improve` again to surface the next priorities.

- Maximum 5 findings per run. Fewer is fine — quality over quantity.
- Every finding must reference a specific file and line range, or a specific type name.
- Before/after diagrams are mandatory for every finding. Two diagrams per finding.
- Priority scores are relative to current codebase pain, not abstract ideals. Score 5 = this is actively hurting development.
- This skill reads and analyzes code. It never modifies code.
- Run repeatedly. Each iteration should surface new issues after previous ones are fixed.

---

# References

- [dimensions.md](./references/dimensions.md) — detailed explanation of each quality dimension with concrete examples
- [mermaid-conventions.md](./references/mermaid-conventions.md) — diagram types, node naming, and simplicity rules
- [report-template.md](./references/report-template.md) — full HTML template structure with placeholder slots
