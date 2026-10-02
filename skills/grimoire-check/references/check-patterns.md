# Classification examples

Classify required outcomes against authorized scope, not a plan's inventory of files or helpers.

| Evidence | Classification |
| --- | --- |
| Required notification behavior exists through a different module and relevant checks establish its contract | **match**, or **deviation** if the design difference is material |
| Planned notifier filename is absent; behavior has not been traced | **needs-verification**, not gap |
| Relevant path is inspected and neither it nor its collaborators implements required timeout handling | **gap** |
| Runtime unavailable and code inspection cannot establish required concurrency behavior | **needs-verification** |
| Required public field is absent and no compatible contract is provided | **gap** |
| Different algorithm demonstrably violates a performance requirement | Blocking **deviation** |
| A different design meets behavior and constraints with sufficient evidence | Non-blocking **deviation** |
| Extra helper or test supports authorized behavior but was omitted from the plan | Not a scope **extra** merely because it was unplanned |
| Only email notifications authorized, but SMS/push behavior also added | **extra**; assess concrete scope/risk, not automatic blocking |

Incidental iteration syntax, naming, or private decomposition need not become findings. Equivalent behavior without a material design difference is a match. New APIs or dependencies warrant inspection, but absence from a plan alone does not prove scope expansion.

For each finding distinguish:
- Evidence demonstrates satisfaction → match or defensible deviation.
- Evidence demonstrates absence/violation → gap or blocking deviation.
- Evidence cannot decide → needs-verification.
- Related behavior exceeds authorized scope → extra.

Do not label existing unrelated repository behavior as an extra introduced by the current change. Report unrelated risky changes only within the assigned review scope; do not silently expand the audit.
