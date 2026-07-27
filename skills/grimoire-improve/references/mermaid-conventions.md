# Mermaid Diagram Conventions

Use the simplest diagram that communicates the structural change. Prefer fewer nodes over completeness.

---

## Diagram Type Selection

| Structural concern                        | Diagram type                         | Example                                  |
| ----------------------------------------- | ------------------------------------ | ---------------------------------------- |
| Type splitting / god object decomposition | `graph TD` with boxes                | Split a fat class into 3 focused classes |
| Dependency direction                      | `graph LR` or `graph TD` with arrows | Show import direction between modules    |
| Method ownership / API surface            | `classDiagram`                       | Show methods moving between types        |
| Data flow / state leak                    | `graph LR`                           | Show internal state escaping to callers  |

---

## Simplicity Rules

### Node limit
Keep nodes to 3–7 per diagram. If you need more, reconsider: the diagram is trying to show too much. Split into two diagrams or simplify the view.

### Node naming
- Use short, descriptive names: `UserRepo` not `UserRepositoryImplementation`.
- Use the actual type/struct name from the codebase when referencing a real type.
- For proposed new types, use names that match the fix strategy.

### Arrow style
- `-->` for dependency/import arrows.
- `--|>` for inheritance/implementation.
- `..>` for data flow or weak dependency.
- Add labels only when the arrow's meaning is not obvious from context.

### Avoid
- Subgraphs unless the nesting is essential to understanding the problem.
- `style` declarations unless highlighting one specific problem node.
- Click handlers, CSS classes, or any interactive features.
- Complex arrows like `o--`, `x--` unless strictly necessary.

---

## Diagram Patterns

### Before: God object (problem)

```mermaid
graph TD
    A[AppContext] --> B[Database]
    A --> C[Cache]
    A --> D[Mailer]
    A --> E[Config]
    A --> F[JobQueue]
```

### After: God object (fix)

```mermaid
graph TD
    A[OrderService] --> B[OrderRepo]
    A --> C[Cache]
    D[Notifier] --> E[Mailer]
    F[Worker] --> G[JobQueue]
```

### Before: Leaked state (problem)

```mermaid
graph LR
    C[Cache] -->|pub fn entries| M[&mut HashMap]
    X[Caller] -->|mutates| M
```

### After: Leaked state (fix)

```mermaid
graph LR
    C[Cache] -->|pub fn get| V[Value clone]
    X[Caller] -->|receives owned copy| V
```

### Before: Wrong method placement (problem)

```mermaid
classDiagram
    class OrderUtil {
        +calculateTotal(Order) Money
        +validateItems(Order) bool
    }
    class Order {
        +items: Vec~Item~
    }
```

### After: Wrong method placement (fix)

```mermaid
classDiagram
    class Order {
        +items: Vec~Item~
        +total() Money
        +validate() bool
    }
```

### Before: Speculative abstraction (problem)

```mermaid
graph TD
    A[PaymentTrait] --> B[StripeImpl]
    A -.->|no other impl| C[???]
```

### After: Speculative abstraction (fix)

```mermaid
graph TD
    B[StripePayment] 
```

---

## Anti-patterns

- **Too many nodes:** A diagram with 15 boxes is a wall of text. Split it.
- **No change between before/after:** If both diagrams look the same, the finding is not structural.
- **Orphan nodes:** Every node should have at least one edge unless it's the root of a new standalone concept.
- **Bidirectional arrows:** Use two separate arrows or reconsider the dependency. Bidirectional arrows hide cycles.
