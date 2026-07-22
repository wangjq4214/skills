# Spec Template

## Full template

```markdown
# [Feature Title]

**Spec ID:** NNNN
**Status:** Draft
**Date:** YYYY-MM-DD

## Requirement

[One sentence. What must the system do?]

## Solution

[How the requirement is satisfied. Describe the approach, key components, and integration seams.]

### Seams

| Seam        | Connects                | Expects                   | Provides                    |
| ----------- | ----------------------- | ------------------------- | --------------------------- |
| [seam name] | [module A] ↔ [module B] | [what this feature needs] | [what this feature exposes] |


## End-to-End Tests

### E2E: [Test Name]

- **Given:** [precondition state]
- **When:** [trigger action]
- **Then:** [observable outcome]

[Repeat for each E2E test case. Cover happy path, failure modes, and boundary conditions.]

## Decisions

### [Decision Title]

- **Choice:** [what was chosen]
- **Reason:** [why, referencing relevant ADRs]
- **ADR reference:** [NNNN-title](./../adr/NNNN-title.md)

[Repeat for each implementation decision.]

## Test Plan

- **Integration tests:** [what integration points to test and how]
- **Manual tests:** [steps that require human verification, if any]
- **Performance thresholds:** [measurable limits this feature must meet]
- **Edge cases:** [boundary conditions to verify]

## Out of Scope

- [What is explicitly excluded from this spec.]
- [Rejected alternatives and why they were rejected.]
- [Deferred seams that are not needed now.]

## Future Evolution

- [Suggested directions this feature may take.]
- [Known limitations to revisit.]
- [Conditions that would trigger re-evaluation (e.g., "when throughput exceeds X").]
```

---

## Example

```markdown
# User Authentication via OAuth2

**Spec ID:** 0001
**Status:** Draft
**Date:** 2025-07-22

## Requirement

Registered users must authenticate via OAuth2 to access protected resources.

## Solution

Integrate an OAuth2 provider (Google) as the primary authentication mechanism. The auth module issues short-lived JWTs after successful OAuth2 handshake. All protected endpoints validate JWT via middleware.

### Seams

| Seam             | Connects                   | Expects                         | Provides                      |
| ---------------- | -------------------------- | ------------------------------- | ----------------------------- |
| OAuth2 handshake | Auth module ↔ Google OAuth | Client ID, secret, redirect URI | Authorization code            |
| Token issuance   | Auth module ↔ Client       | Valid authorization code        | JWT (access + refresh tokens) |
| Token validation | Auth middleware ↔ Auth API | JWT in Authorization header     | User identity or 401          |
| User storage     | Auth module ↔ Database     | User profile from OAuth2        | Persistent user record        |

## End-to-End Tests

### E2E: Successful login flow

- **Given:** A registered user with a Google account
- **When:** User clicks "Sign in with Google" and completes the OAuth2 consent screen
- **Then:** User is redirected to the dashboard with a valid JWT in local storage

### E2E: Expired token

- **Given:** A user with an expired JWT
- **When:** User requests a protected resource
- **Then:** Server returns 401, client redirects to login page

### E2E: Unregistered user

- **Given:** A Google user who has never logged into the application
- **When:** User completes OAuth2 consent screen
- **Then:** User account is created, user is redirected to onboarding

## Decisions

### Use Google OAuth2 as sole provider

- **Choice:** Google OAuth2 only for initial implementation.
- **Reason:** All target users have Google Workspace accounts per ADR-0003 (deployment target). Adding more providers now adds complexity without demand.
- **ADR reference:** [0003-azure-deployment-target](../adr/0003-azure-deployment-target.md)

### JWT over session cookies

- **Choice:** Stateless JWT (access + refresh token pattern).
- **Reason:** Aligns with ADR-0005 (stateless services). Avoids server-side session storage, which would add a Redis dependency.
- **ADR reference:** [0005-stateless-service-architecture](../adr/0005-stateless-service-architecture.md)

## Test Plan

- **Integration tests:** OAuth2 callback handling, token refresh flow, middleware rejection of invalid/expired tokens.
- **Manual tests:** Full OAuth2 consent flow against Google test application.
- **Performance thresholds:** Token validation under 5ms at p99. Token issuance under 500ms at p95.
- **Edge cases:** User revokes Google access while logged in; Google OAuth2 service unavailable during login; concurrent refresh token races.

## Out of Scope

- Multi-provider OAuth2 (Google + GitHub + etc.). Google only for now.
- Social login beyond authentication (no friend import, no profile sync).
- Role-based access control. All authenticated users have the same access level.
- Password-based login fallback.

## Future Evolution

- Add additional OAuth2 providers when non-Google users become a requirement.
- Introduce refresh token rotation if token theft becomes a concern.
- Add role-based access control when admin vs. user distinction is needed.
- Consider WebAuthn/passkeys for passwordless re-authentication of sensitive operations.
```

---

## Anti-patterns

### Requirement that describes implementation

Bad:
```
Build a React component that calls POST /api/auth with OAuth2 token.
```

Good:
```
Registered users must authenticate via OAuth2 to access protected resources.
```

The requirement describes what the system must do, not how it is built.

### Too many seams

Bad: listing every function signature, every prop, every internal API call.

Good: listing only the integration points where this feature touches external systems, other bounded contexts, or shared infrastructure.

See [minimum-seams.md](./minimum-seams.md).

### Decisions that contradict ADRs

Bad: choosing session-based auth when ADR-0005 mandates stateless services, without acknowledging the conflict.

Good: either following the ADR, or explicitly flagging the conflict and proposing an ADR update before the spec proceeds.

### E2E tests at unit granularity

Bad:
```
E2E: Token validation function returns 401 for expired token
```

Good:
```
E2E: Expired token
- Given: A user with an expired JWT
- When: User requests a protected resource
- Then: Server returns 401, client redirects to login page
```

### Vague Out of Scope

Bad:
```
Out of Scope: Everything else.
```

Good: specific exclusions with reasons.
