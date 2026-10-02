# Relationship diagrams

Include a Mermaid diagram only when it clarifies non-obvious relationships. Select the relevant boundaries, not every predicted type. Use actual repository names; do not rename interfaces to satisfy a drawing convention.

For class diagrams:
- `A --> B`: A uses B.
- `A *-- B`: A owns B's lifetime.
- `A o-- B`: shared/reference association.
- `Base <|-- Child`: inheritance.
- `Interface <|.. Implementation`: realization.

Keep members and syntax minimal; avoid complex annotations when the preview renderer cannot support them. A module/dependency flowchart may communicate the plan better than a class diagram. Put detailed tradeoffs in prose rather than decorative diagrams.
