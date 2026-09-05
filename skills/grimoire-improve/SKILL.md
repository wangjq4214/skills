---
name: grimoire-improve
description: Audit codebase structure, prioritize evidence-backed improvements, and optionally hand approved findings to implementation.
disable-model-invocation: true
---

# Purpose

Audit structural quality across relevant dimensions, retain the strongest evidence-backed findings, and present actionable improvements at a level of detail proportionate to each issue.

# Scope

This skill analyzes code and writes `.grimoire/improve-report.html`. Discovery is not capped; the report may summarize lower-priority findings while emphasizing the most valuable work. Code changes require explicit user selection unless the user already authorized implementation.

Completion: The report distinguishes prioritized findings from the broader discovery set and gives each retained issue enough evidence to act on.

# Workflow

## 1. Survey

Map relevant modules, dependency direction, change hotspots, and unusually connected or complex types. Scale breadth to the requested target; do not scan the entire repository for a bounded audit.

Completion: The audit surface and its important structural relationships are known.

---

## 2. Audit relevant dimensions

Use `references/dimensions.md` as a lens set, not a mandatory checklist. Examine dimensions capable of producing material findings for the target: responsibility, encapsulation, method placement, API expression, domain modeling, dependency direction, change isolation, speculative abstraction, concentration of responsibility, and leaked state.

Record concrete locations, evidence, impact, confidence, and rough remediation cost. A single-implementation abstraction is suspicious only when it lacks present boundary value.

Completion: Relevant dimensions have been examined and unsupported observations discarded.

---

## 3. Prioritize

Rank all retained findings by current impact, confidence, change frequency, blast-radius reduction, and effort. The HTML report should emphasize a manageable top set—five by default—but state how many lower-priority findings were summarized or deferred. Do not silently cap discovery.

Completion: Priority reflects repository pain rather than abstract preference.

---

## 4. Generate report

Use `references/report-template.md` as a presentation default. Each emphasized finding includes location, evidence, concrete impact, confidence, strategy, expected benefit, and important tradeoffs.

Add before/after Mermaid diagrams only when relationships, control flow, or ownership are difficult to explain clearly in prose. Simple local findings do not require diagrams. Keep diagrams minimal and follow `references/mermaid-conventions.md`.

Summarize deferred findings compactly so repeated runs are optional rather than required for disclosure.

Completion: `.grimoire/improve-report.html` communicates priorities without decorative overhead.

---

## 5. Present and hand off

Open the report when the environment supports it. Ask which findings to implement unless implementation was already authorized. Related findings may be implemented together when they touch the same invariant or would otherwise cause repeated churn; independent findings may be parallelized safely.

After implementation, run verification appropriate to the changed behavior rather than compiling mechanically after every finding.

Completion: Approved work is implemented or clearly handed off; unapproved findings remain recommendations.

---

# Rules

- Report how many findings were emphasized, summarized, or deferred; do not imply the display set is the full discovery set.
- Require diagrams only when they improve understanding.
- Prioritize concrete impact and confidence over checklist completeness.
- Combine or parallelize findings according to coupling, not a fixed one-at-a-time rule.
- Preserve user approval for scope-expanding code changes.
---

# References

- [dimensions.md](./references/dimensions.md) — detailed explanation of each quality dimension with concrete examples
- [mermaid-conventions.md](./references/mermaid-conventions.md) — diagram types, node naming, and simplicity rules
- [report-template.md](./references/report-template.md) — full HTML template structure with placeholder slots
