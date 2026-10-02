# Which integration points belong in a spec?

Include a boundary when the feature needs its contract for behavior, correctness, ownership, or an applicable ADR. This includes in-process modules, external APIs, events, shared schemas, and externally managed configuration/secrets.

Exclude incidental calls, standard middleware, and routine logging/metrics unless they carry feature-specific acceptance or policy requirements. Infrastructure is not automatically irrelevant; audit logging may be essential.

Describe the exchange, not merely the two component names:

| Seam | Connects | Expects | Provides |
| --- | --- | --- | --- |
| Order events | Ordering → Notifications | OrderCompleted with customer ID | — |
| Preferences | Notifications → Customer | Notification preferences by ID | — |
| Email delivery | Notifications → Mail provider | Credentials, recipient, template | Delivery result |

Speculative boundaries are not current requirements. Mention future evolution only when supported by a known limitation or credible trigger.
