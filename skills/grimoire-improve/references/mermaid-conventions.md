# Optional relationship diagrams

Use only when a diagram explains ownership, dependencies, or behavior paths better than a short description.

- Prefer a small flowchart for dependencies/data flow or a class diagram for type ownership. Split unreadably large views rather than enforcing a node quota.
- Use actual names for existing code; label proposed structures as proposals.
- Define arrow meaning (import, call, data flow, ownership); label distinctions when needed.
- Show relevant before/after changes without pretending the diagram is a complete graph. Identical high-level shapes can hide structural changes; explain changed semantics in prose.
- Quote and escape labels for Mermaid syntax and the enclosing format. Do not add click handlers, executable repository content, or secrets.
- For HTML, use text content rather than interpreting repository-derived labels as markup; use only a trusted renderer allowed by the environment. If rendering is unavailable, return the source and state it was not rendered.
