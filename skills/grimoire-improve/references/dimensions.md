# Quality Dimensions

Each dimension below describes a structural quality concern, a key question to ask, and concrete indicators to look for.

---

## 1. Clear Responsibility

**Key question:** Does each struct/class have one clear job?

**Indicators of a problem:**
- A type's name uses "And" or "Or" (e.g., `UserAndOrderManager`).
- A type has methods that operate on entirely different data sets.
- Describing the type's responsibility requires multiple sentences joined by "and".
- A single file is >500 lines with multiple unrelated method groups.

**Good example:**
```rust
// One responsibility: validate email format
struct EmailValidator { ... }
```

**Bad example:**
```rust
// Mixes validation, persistence, and notification
struct UserService {
    fn validate(&self, user: &User) -> bool { ... }
    fn save(&self, user: &User) -> Result<()> { ... }
    fn send_welcome_email(&self, user: &User) { ... }
}
```

---

## 2. Hidden Implementation

**Key question:** Are internal details concealed behind public APIs?

**Indicators of a problem:**
- Public fields on structs that should be encapsulated.
- Internal helper methods marked `pub`.
- Leaked database types (e.g., `sqlx::Row`) in public function signatures.
- Callers reach into nested objects: `obj.inner.field` instead of `obj.do_thing()`.

**Good example:**
```rust
pub struct Cache {
    store: HashMap<String, Entry>,  // private
}
impl Cache {
    pub fn get(&self, key: &str) -> Option<&Value> { ... }
}
```

**Bad example:**
```rust
pub struct Cache {
    pub store: HashMap<String, Entry>,  // exposed
}
```

---

## 3. Method Placement

**Key question:** Does each method belong to the right type?

**Indicators of a problem:**
- A method on type A that only uses fields from type B.
- "Manager" or "Util" classes that collect methods that should live on data types.
- Methods that take a single argument of another type and operate entirely on it — that method probably belongs on the argument type.

**Good example:**
```rust
impl Order {
    fn total(&self) -> Money { /* uses self.items */ }
}
```

**Bad example:**
```rust
// OrderCalculator only touches Order's data
struct OrderCalculator;
impl OrderCalculator {
    fn calculate_total(order: &Order) -> Money { ... }
}
```

---

## 4. Expressive API

**Key question:** Does the public API communicate intent?

**Indicators of a problem:**
- Boolean parameters that obscure meaning: `process(true, false)`.
- Return types that require the caller to interpret raw data: `-> HashMap<String, Vec<String>>`.
- Method names that describe mechanism rather than purpose: `insert_if_not_exists_and_lock` instead of `acquire`.
- Multiple parameters of the same primitive type in a row: `fn connect(host: &str, port: u16, timeout: u64)`.

**Good example:**
```rust
fn notify_user(user_id: UserId, message: Notification) -> Result<DeliveryReceipt> { ... }
```

**Bad example:**
```rust
fn notify(id: i64, msg: &str, urgent: bool, channel: i32) -> Result<String> { ... }
```

---

## 5. Domain Types

**Key question:** Do types express domain concepts directly?

**Indicators of a problem:**
- Primitive obsession: `String` for email, `i64` for user ID, `f64` for money amount.
- Domain concepts encoded as strings or integers throughout the codebase.
- Validation logic repeated everywhere a primitive is used instead of being in a domain type's constructor.

**Good example:**
```rust
struct Email(String);  // newtype with validation
struct Money { amount: Decimal, currency: Currency }
struct UserId(i64);
```

**Bad example:**
```rust
fn send_email(address: &str, user_id: i64, balance: f64) { ... }
// Is balance in dollars? Cents? What currency?
```

---

## 6. Dependency Direction

**Key question:** Do dependencies flow toward stability?

**Indicators of a problem:**
- Stable core module imports from volatile feature modules.
- Circular dependencies between modules.
- High-level policy depends on low-level detail.
- Every module imports from every other module (high coupling).

**Good example:**
```
domain/ ──does NOT import──> infra/
infra/  ──imports──────────> domain/
```

**Bad example:**
```
domain/models.rs imports from api/handlers.rs
api/handlers.rs imports from domain/models.rs  (cycle)
```

---

## 7. Change Isolation

**Key question:** Would a requirement change ripple broadly?

**Indicators of a problem:**
- A single business rule change requires modifying 5+ files.
- UI, business logic, and database code are interleaved in one function.
- Constants duplicated across files — changing one value means editing multiple places.
- Feature toggles or configuration values scattered through unrelated modules.

**Good example:**
```rust
// Tax calculation lives in one place
struct TaxCalculator { rate: Decimal, region: Region }
impl TaxCalculator {
    fn apply(&self, subtotal: Money) -> Money { ... }
}
```

**Bad example:**
```rust
// Tax logic copied in checkout.rs, invoice.rs, and reporting.rs
// Changing the rate means hunting down every copy
```

---

## 8. Speculative Abstraction

**Key question:** Does the abstraction add cost without current boundary, isolation, test-substitution, or invariant value?

**Clues to investigate, not findings by themselves:**
- Interfaces/traits with a single implementor; useful test substitution counts as present value.
- "Plugin systems" for features that were never plugged in.
- Generic code that is only instantiated with one concrete type.
- Abstract base classes with one subclass.

Implementation count alone does not justify removal; show both the lack of present value and concrete cost.

**Good example:**
```rust
// No boundary, isolation, test-substitution, or invariant value from a trait
struct PaymentProcessor { ... }
```

**Bad example:**
```rust
// Pass-through trait adds maintenance cost, with none of the present value above
trait PaymentGateway { ... }
struct StripeGateway { ... }  // sole implementation
```

---

## 9. God Object

**Key question:** Is there a type that knows or does too much?

**Indicators of a problem:**
- A class/struct with >20 public methods.
- A type whose fields are used by disjoint method groups (some methods use fields A,B; others use fields C,D).
- A type named "Context", "Manager", "System", "Engine", or "Core".
- A single type that crosses 3+ architectural layers (e.g., handles HTTP, database, and business rules).

**Good example:**
```rust
struct OrderRepository { db: Connection }   // persistence only
struct OrderService { repo: OrderRepository } // business logic
struct OrderController { service: OrderService } // HTTP
```

**Bad example:**
```rust
struct AppContext {
    db: Connection,
    cache: Redis,
    config: Config,
    mailer: Mailer,
    queue: JobQueue,
    // Used by everything, owns too much, hard to test
}
```

---

## 10. Leaked State

**Key question:** Does internal state escape through public interfaces?

**Indicators of a problem:**
- A method returns `&mut` to internal collection.
- Public fields that are mutated by external code without the type's knowledge.
- A getter returns a reference to mutable internal data that callers can modify.
- Internal cache entries, counters, or flags exposed directly.

**Good example:**
```rust
impl Cache {
    pub fn get(&self, key: &str) -> Option<Value> {
        self.store.get(key).cloned()  // returns owned copy
    }
}
```

**Bad example:**
```rust
impl Cache {
    pub fn entries(&mut self) -> &mut HashMap<String, Value> {
        &mut self.store  // caller can corrupt internal state
    }
}
```
