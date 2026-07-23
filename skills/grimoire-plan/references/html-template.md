# HTML Plan Template

Use this template when writing the plan in step 7. Write the output to `.grimoire/plans/NNNN-title.html`.

---

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PLAN_TITLE</title>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true, theme:'default'});</script>
<style>
  :root {
    --bg: #fafafa;
    --card-bg: #ffffff;
    --text: #1a1a1a;
    --text-muted: #555;
    --border: #e0e0e0;
    --accent: #2563eb;
    --accent-light: #eff6ff;
    --code-bg: #f5f5f5;
    --tag-bg: #f0f0f0;
    --radius: 8px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    padding: 2rem 1rem;
  }
  .plan {
    max-width: 960px;
    margin: 0 auto;
  }
  header {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
  header h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
  header .meta { color: var(--text-muted); font-size: 0.9rem; display: flex; gap: 2rem; flex-wrap: wrap; }
  .meta-item { display: flex; gap: 0.35rem; }
  .meta-item strong { font-weight: 600; }

  section {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
  section h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--accent);
    display: flex; align-items: center; gap: 0.5rem;
  }
  section h2 .num {
    background: var(--accent);
    color: #fff;
    border-radius: 50%;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; font-weight: 700;
  }
  section h3 { font-size: 1.05rem; margin: 1.25rem 0 0.5rem; color: #333; }

  .table-wrap { overflow-x: auto; border-radius: var(--radius); border: 1px solid var(--border); }
  .table-wrap table { border: none; }
  .table-wrap th:first-child, .table-wrap td:first-child { padding-left: 0.75rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { padding: 0.6rem 0.75rem; text-align: left; border-bottom: 1px solid var(--border); }
  th { background: var(--accent-light); font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.03em; color: var(--accent); }
  tr:last-child td { border-bottom: none; }
  tbody tr:hover { background: #f8fafd; }

  .mermaid-wrap {
    background: #fcfcfc;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    overflow-x: auto;
    text-align: center;
    margin: 1rem 0;
  }

  pre {
    background: #1e1e1e;
    color: #d4d4d4;
    border-radius: var(--radius);
    padding: 1rem 1.25rem;
    overflow-x: auto;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.85rem;
    line-height: 1.55;
    margin: 0.75rem 0;
  }
  pre.mermaid {
    background: transparent;
    color: inherit;
  }
  code { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: 0.85em; }
  :not(pre) > code {
    background: var(--code-bg);
    padding: 0.15em 0.4em;
    border-radius: 3px;
    border: 1px solid #e8e8e8;
  }

  .step {
    border-left: 3px solid var(--accent);
    padding: 1rem 1.25rem;
    margin: 1rem 0;
    background: var(--accent-light);
    border-radius: 0 var(--radius) var(--radius) 0;
  }
  .step h4 { font-size: 0.95rem; margin-bottom: 0.4rem; color: var(--accent); }
  .step p, .step ul { font-size: 0.9rem; margin: 0.25rem 0; }
  .step ul { padding-left: 1.25rem; }
  .step .outcome { margin-top: 0.5rem; padding: 0.4rem 0.6rem; background: #e6f4ea; border-radius: 4px; font-size: 0.85rem; color: #137333; }
  .step .files { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.3rem; }

  .badge {
    display: inline-block;
    padding: 0.15em 0.55em;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--tag-bg);
    color: var(--text-muted);
  }
  .badge.create { background: #e6f4ea; color: #137333; }
  .badge.modify { background: #fef3c7; color: #92400e; }

  .decision-list { list-style: none; }
  .decision-list li { padding: 0.4rem 0; padding-left: 1.2rem; position: relative; }
  .decision-list li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); }

  .test-grid { display: grid; gap: 1rem; }
  .test-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
  }
  .test-card h3 {
    font-size: 0.95rem;
    margin: 0 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
    color: #333;
  }
  .test-card h3 code { font-weight: 700; color: var(--accent); background: none; border: none; padding: 0; }
  .test-row {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  .test-label {
    font-weight: 600;
    color: var(--text-muted);
    text-align: right;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding-top: 0.1rem;
  }
  .test-card ul {
    margin: 0.25rem 0 0 0;
    padding-left: 1.25rem;
    font-size: 0.9rem;
    color: #444;
  }
  .test-card ul li { margin-bottom: 0.2rem; }

  @media print {
    body { background: #fff; padding: 0; }
    section { break-inside: avoid; border: 1px solid #ccc; }
    .step { background: #f9f9f9; }
  }
  @media (max-width: 640px) {
    body { padding: 0.5rem; }
    section { padding: 1.25rem; }
    header { padding: 1.25rem; }
    table { font-size: 0.8rem; }
    th, td { padding: 0.4rem 0.5rem; }
  }
</style>
</head>
<body>
<div class="plan">

<header>
  <h1>PLAN_TITLE</h1>
  <div class="meta">
    <div class="meta-item"><strong>Input:</strong> <span>INPUT_SOURCE</span></div>
    <div class="meta-item"><strong>Date:</strong> <span>DATE</span></div>
  </div>
</header>

<!-- ── Section 1: Type Design ── -->
<section>
  <h2><span class="num">1</span> Type Design</h2>

  <h3>Modified Types</h3>
  <div class="table-wrap">
  <table>
    <thead><tr><th>Type</th><th>File</th><th>Concept</th><th>Change</th><th>Rationale</th></tr></thead>
    <tbody>
      <!-- MODIFIED_TYPES_ROWS -->
    </tbody>
  </table>
  </div>

  <h3>New Types</h3>
  <div class="table-wrap">
  <table>
    <thead><tr><th>Type</th><th>File</th><th>Concept</th><th>Responsibility</th><th>Relationships</th><th>Rationale</th></tr></thead>
    <tbody>
      <!-- NEW_TYPES_ROWS -->
    </tbody>
  </table>
  </div>

  <h3>Design Decisions</h3>
  <ul class="decision-list">
    <!-- DESIGN_DECISIONS -->
  </ul>
</section>

<!-- ── Section 2: Type Relationship Diagram ── -->
<section>
  <h2><span class="num">2</span> Type Relationship Diagram</h2>
  <div class="mermaid-wrap">
    <pre class="mermaid">
MERMAID_DIAGRAM
    </pre>
  </div>
</section>

<!-- ── Section 3: Implementation Steps ── -->
<section>
  <h2><span class="num">3</span> Implementation Steps</h2>
  <!-- IMPLEMENTATION_STEPS -->
</section>

<!-- ── Section 4: Edge Cases ── -->
<section>
  <h2><span class="num">4</span> Edge Cases</h2>
  <div class="table-wrap">
  <table>
    <thead><tr><th>#</th><th>Condition</th><th>Expected Behavior</th><th>Owning Step</th></tr></thead>
    <tbody>
      <!-- EDGE_CASES_ROWS -->
    </tbody>
  </table>
  </div>
</section>

<!-- ── Section 5: Test Strategy ── -->
<section>
  <h2><span class="num">5</span> Test Strategy</h2>
  <!-- TEST_STRATEGY -->
</section>

<!-- ── Section 6: Affected Files ── -->
<section>
  <h2><span class="num">6</span> Affected Files</h2>
  <div class="table-wrap">
  <table>
    <thead><tr><th>File</th><th>Action</th><th>Referenced By</th></tr></thead>
    <tbody>
      <!-- AFFECTED_FILES_ROWS -->
    </tbody>
  </table>
  </div>
</section>

</div>
</body>
</html>
```

---

## How to fill the template

### Placeholder reference

| Placeholder              | Replacement                                                                     |
| ------------------------ | ------------------------------------------------------------------------------- |
| `PLAN_TITLE`             | Plan title (same as the file title)                                             |
| `INPUT_SOURCE`           | Ticket path, spec path, or "Conversation: &lt;one-line goal&gt;"                   |
| `DATE`                   | `YYYY-MM-DD`                                                                    |
| `MERMAID_DIAGRAM`        | The raw Mermaid classDiagram content (no outer ```mermaid fence needed)        |
| `MODIFIED_TYPES_ROWS`    | `<tr>` rows for each modified type                                             |
| `NEW_TYPES_ROWS`         | `<tr>` rows for each new type                                                  |
| `DESIGN_DECISIONS`       | `<li>` items for each design decision                                          |
| `IMPLEMENTATION_STEPS`   | A sequence of `.step` blocks (see Step block below)                            |
| `EDGE_CASES_ROWS`        | `<tr>` rows for each edge case                                                 |
| `TEST_STRATEGY`          | `<h3>` + `<p>` + `<ul>` for each type's test strategy                          |
| `AFFECTED_FILES_ROWS`    | `<tr>` rows for each affected file                                             |

### Step block

Each implementation step uses this structure:

```html
<div class="step">
  <h4>Step N: ACTION_VERB + TARGET + BRIEF_DESCRIPTION</h4>
  <div class="files">Files: FILE_PATHS</div>
  <p><strong>Action:</strong> CONCRETE_CHANGE</p>
  <div class="outcome"><strong>Outcome:</strong> OBSERVABLE_RESULT</div>
  <!-- Only when logic changes: -->
  <pre>PSEUDO_CODE</pre>
</div>
```

### Test strategy block

Wrap all test cards in a `<div class="test-grid">`. Each type's test strategy uses this structure:

```html
<div class="test-card">
  <h3><code>TYPE_NAME</code></h3>
  <div class="test-row">
    <span class="test-label">Verify</span>
    <span>OBSERVABLE_BEHAVIOR</span>
  </div>
  <div class="test-row">
    <span class="test-label">Mock</span>
    <span>DEPENDENCIES</span>
  </div>
  <div class="test-row">
    <span class="test-label">Variations</span>
    <ul>
      <li>VARIATION_1</li>
      <li>VARIATION_2</li>
    </ul>
  </div>
</div>
```

### Table rows

**Modified type row:**
```html
<tr><td>Name</td><td>path</td><td>one sentence</td><td>what changes</td><td>why extend, not split</td></tr>
```

**New type row:**
```html
<tr><td>Name</td><td>path</td><td>one sentence</td><td>rules it owns</td><td>what it composes/implements</td><td>why split, not extend</td></tr>
```

**Edge case row:**
```html
<tr><td>N</td><td>condition</td><td>expected behavior</td><td>Step N</td></tr>
```

**Affected file row:**
```html
<tr><td>path</td><td><span class="badge create">Create</span> / <span class="badge modify">Modify</span></td><td>Step N, Test Strategy</td></tr>
```
