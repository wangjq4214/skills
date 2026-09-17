# HTML Report Template

Generate `.grimoire/improve-report.html` using this adaptable structure. Evidence, impact, strategy, and benefit are required for emphasized findings. Diagrams are optional.

---

## Minimal page

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Grimoire Improve — Code Quality Audit</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: auto; padding: 2rem; }
    .finding { border: 1px solid #ddd; border-radius: 8px; padding: 1.25rem; margin: 1.25rem 0; }
    .meta, .deferred { color: #666; }
    pre { overflow-x: auto; background: #f6f6f6; padding: .75rem; }
  </style>
</head>
<body>
  <h1>Grimoire Improve — Code Quality Audit</h1>
  <p class="meta">{REPORT_SCOPE_AND_COUNTS}</p>

  <!-- Repeat for emphasized findings -->
  <section class="finding">
    <h2>{TITLE} — Priority {PRIORITY}</h2>
    <p><strong>Location:</strong> {LOCATION}</p>
    <p><strong>Confidence:</strong> {CONFIDENCE}</p>
    <h3>Evidence and impact</h3>
    <p>{EVIDENCE_AND_IMPACT}</p>
    <pre>{OPTIONAL_CODE_SNIPPET}</pre>
    {OPTIONAL_DIAGRAM_BLOCK}
    <h3>Strategy and tradeoffs</h3>
    <p>{STRATEGY_AND_TRADEOFFS}</p>
    <h3>Expected benefit</h3>
    <p>{EXPECTED_BENEFIT}</p>
  </section>

  <section class="deferred">
    <h2>Summarized or deferred findings</h2>
    {DEFERRED_FINDINGS}
  </section>
</body>
</html>
```

## Optional diagram block

Include only when relationships, control flow, or ownership are clearer visually. Add Mermaid's script to the page only when this block is used.

```html
<div class="diagrams">
  <div>
    <h4>Before</h4>
    <div class="mermaid">{MERMAID_BEFORE}</div>
  </div>
  <div>
    <h4>After</h4>
    <div class="mermaid">{MERMAID_AFTER}</div>
  </div>
</div>
```

Use raw Mermaid source inside `.mermaid`; do not wrap it in another code fence.

## Report rules

- State audit scope and the counts emphasized, summarized, and deferred.
- Priorities reflect current impact, confidence, and effort—not cosmetic preference.
- Omit empty snippets, diagrams, and deferred sections.
- Keep enough evidence that another agent can verify the finding without repeating the entire audit.
- For broad work, show source snapshot, mode, inspected/total coverage, unread or blocked regions, and links to the full finding ledger. Separate report emphasis from implementation scope.
- For implementation reports, include each finding's disposition, actual changes, validation commands/results, remaining work, and measured acceptance status. Do not present proposed after-diagrams as already implemented.
- Include a compact module/connection summary when architecture changed, plus before/after metrics when requested. File splitting alone is not net LOC reduction.
- Escape repository text inserted into HTML and diagram labels; do not embed secrets, executable repository content, or untrusted scripts.
- Under orchestration, workers return finding data to the coordinator instead of racing to overwrite the shared report.
