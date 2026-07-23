# Design Principles

Apply every principle during step 3 (Design structure). Each principle has a decision question, concrete guidance, and a violation signal.

---

## 1. Structure by lifecycle

**Core idea:** Objects with the same lifecycle belong together. Objects with different lifecycles should not be tightly coupled.

**Ask:** "When is this created? When is it destroyed? What else shares that timeline?"

**Do:**
- Group fields that are initialized, updated, and cleaned up at the same time.
- Split a type when one subset of its fields has a meaningfully different lifetime.
- Use ownership to encode lifecycle: the owner creates and destroys the owned.

**Red flag:** A type has fields where some are initialized in `new()` and others are set later via setters with different call sites. The lifecycle is scattered.

**Example — good:**
```rust
struct Connection {
    stream: TcpStream,       // created together
    buffer: Vec<u8>,          // lives as long as the connection
}
```

**Example — bad:**
```rust
struct Connection {
    stream: TcpStream,
    buffer: Vec<u8>,
    metrics: Option<Metrics>, // set later, cleared independently — different lifecycle
    auth_token: Option<String>, // renewed on a timer — different lifecycle
}
```

Fix: extract `Metrics` and `AuthToken` into their own types with their own lifecycles.

---

## 2. Clear ownership, unidirectional dependency

**Core idea:** Upper layers own lower layers. Dependency flows one way. No cycles.

**Ask:** "Who owns this? Which direction does the dependency arrow point?"

**Do:**
- Higher-level modules depend on lower-level modules, never the reverse.
- Owned things don't know about their owners.
- Use dependency injection to pass dependencies downward, not upward.

**Red flag:** File A imports file B, and file B imports file A. Or type `Parent` holds `Child` and `Child` holds a reference back to `Parent`.

**Example — good:**
```rust
// Service owns Repository, Repository does not know about Service
struct UserService {
    repo: Arc<UserRepository>,
}

struct UserRepository {
    pool: ConnectionPool,
}
```

**Example — bad:**
```rust
struct UserRepository {
    pool: ConnectionPool,
    service: Weak<UserService>, // lower layer knows about upper layer — cycle
}
```

---

## 3. Composition over inheritance

**Core idea:** Build complex objects by composing small, focused components. Don't build deep inheritance hierarchies.

**Ask:** "Can I express this as a has-a relationship instead of an is-a relationship?"

**Do:**
- Use fields to compose behavior: a `User` has an `Address`, not a `User` is a subtype of `Addressable`.
- Use traits/interfaces for shared capability (can-do), not for shared data (has-data).
- Limit inheritance to one level when truly needed. Two is suspicious. Three is wrong.

**Red flag:** A class hierarchy deeper than 2 levels. A base class that exists only to share fields, not behavior.

**Example — good:**
```rust
struct Order {
    items: Vec<LineItem>,
    shipping: ShippingInfo,   // composed
    payment: PaymentMethod,   // composed
}
```

**Example — bad:**
```rust
class Entity { id, created_at }
class PurchasableEntity extends Entity { price }
class ShippablePurchasableEntity extends PurchasableEntity { weight }
class Order extends ShippablePurchasableEntity { ... }  // 4-level chain
```

---

## 4. Abstract stable points, not everything

**Core idea:** Introduce interfaces/traits only when multiple real implementations exist or are imminent. Don't abstract preemptively.

**Ask:** "Does a second implementation exist today? If not, is one concretely planned and imminent?"

**Do:**
- Start with a concrete type. Extract an interface when the second implementation arrives.
- Abstract at stable seams: I/O boundaries, platform differences, pluggable strategies that already have variants.
- Prefer parametric polymorphism (generics) over dynamic dispatch when the variant is known at compile time.

**Red flag:** An interface/trait with exactly one implementation in the entire codebase. "Future-proofing" abstractions.

**Example — good (one impl, no abstraction):**
```rust
struct SmtpEmailSender {
    host: String,
    port: u16,
}
```

**Example — good (two impls, abstraction earned):**
```rust
trait EmailSender {
    fn send(&self, to: &str, body: &str) -> Result<(), EmailError>;
}

struct SmtpEmailSender { ... }
struct SendgridEmailSender { ... }
```

---

## 5. Clear responsibility boundaries

**Core idea:** One type manages one core state or resource. It should be describable with a single "manages..." sentence.

**Ask:** "What one thing does this type manage? Can I name it without using 'and'?"

**Do:**
- Name the type after its single responsibility: `ConnectionPool`, not `ConnectionManagerAndLogger`.
- If a type grows to manage two things, extract one into a separate type.
- Low-level resource types should not know about high-level business rules.

**Red flag:** A type name with "And" in it. A struct with two distinct groups of fields used by different callers. A type whose methods serve two unrelated audiences.

**Example — good:**
```rust
struct ConfigLoader { ... }   // one thing: loading config
struct ConfigValidator { ... } // one thing: validating config
```

**Example — bad:**
```rust
struct ConfigManager {
    // loading
    path: PathBuf,
    cache: HashMap<String, Value>,
    // validation
    schema: JsonSchema,
    errors: Vec<ValidationError>,
    // logging
    logger: Logger,            // unrelated responsibility
}
```

---

## 6. Separate data, resources, and logic

**Core idea:** Distinguish between actual resources (GPU buffers, file handles, connections), logical domain objects (Mesh, Scene), and pure logic (algorithms, transformations).

**Ask:** "Is this a resource handle, a domain value, or a stateless operation?"

**Do:**
- Resource types wrap handles and manage lifecycle (open, close, allocate, free).
- Domain types model business concepts using plain data.
- Logic lives in functions or stateless services, not on resource types.
- Don't mix resource management code with business logic code.

**Red flag:** A type that both manages a file handle and implements business rules. A struct mixing `Arc<Mutex<RawFd>>` with `customer_name: String`.

---

## 7. Make illegal states unrepresentable

**Core idea:** Use the type system to prevent invalid states. Don't rely on boolean flags or runtime checks.

**Ask:** "Can the combination of my fields represent a state that should not exist?"

**Do:**
- Use enums/sum types instead of boolean pairs: `enum ConnectionState { Connected(TcpStream), Disconnected }` not `{ stream: Option<TcpStream>, is_connected: bool }`.
- Use `Result`, `Option`, `NonZero*`, and newtypes with validation at construction time.
- Push validation to the boundary: validate at construction, then safe interior access.

**Red flag:** Multiple boolean fields that interact. Optional fields where some combinations are invalid. A comment saying "must call X before Y."

**Example — good:**
```rust
enum Connection {
    Connected { stream: TcpStream, since: Instant },
    Disconnected,
    Reconnecting { attempt: u32, backoff: Duration },
}
```

**Example — bad:**
```rust
struct Connection {
    stream: Option<TcpStream>,
    is_connected: bool,
    is_reconnecting: bool,
    reconnect_attempt: u32,   // meaningless when is_reconnecting is false
}
```

---

## 8. Design stable interfaces

**Core idea:** Interfaces should express what a type can do, not how it does it. Small and stable beats large and comprehensive.

**Ask:** "If I change the internal implementation, does the public API stay the same?"

**Do:**
- Expose capabilities (verbs): `send()`, `lookup()`, `render()`. Not internals (nouns): `buffer`, `handle`, `cache`.
- Keep public methods few and orthogonal. Five well-named methods are better than twenty convenience methods.
- Return data, not internal references. Prefer owned values or copies over `&InternalState`.

**Red flag:** A public method name that names an implementation detail. Public fields that are not truly public concepts. Getters that expose internal mutable state.

**Example — good:**
```rust
pub trait Cache {
    fn get(&self, key: &str) -> Option<String>;
    fn set(&mut self, key: &str, value: String);
    fn invalidate(&mut self, key: &str);
}
```

**Example — bad:**
```rust
pub trait Cache {
    fn get_hash_map(&self) -> &HashMap<String, String>;      // exposes implementation
    fn set_with_eviction_policy(&mut self, key: &str, value: String, policy: EvictionPolicy); // too specific
}
```

---

## Decision shortcut

When stuck between two designs, apply in order:

1. **Lifecycle first** — which things share a lifetime? Group them.
2. **Ownership second** — who owns whom? Draw the arrow.
3. **Composition third** — has-a or is-a? Prefer has-a.
4. **Abstract last** — is there a second implementation? If no, stay concrete.

This ordering resolves most design questions without needing all eight principles at once.
