# Vertical Slice Ticket Template

## Template

```markdown
# [Ticket Title]

**Ticket ID:** TNNNN
**Source:** [Spec: NNNN-title](../NNNN-title-with-dashes.md) | Conversation
**Status:** Todo

## Goal

[One sentence. What observable outcome does completing this ticket produce?]

## Layers

Check every layer confirmed for this project. State what changes in each.

- [ ] **[layer-1]:** [what changes]
- [ ] **[layer-2]:** [what changes]
- [ ] ...

If a layer has no work, state: "None — [reason]."

## Approach

[How to implement this ticket. Specific enough to guide execution. Include key decisions, file paths where possible, and integration points.]

1. [Step]
2. [Step]
...

## Blocked by

[List of ticket IDs that must be complete before this ticket can start. Empty if this is pre-refactoring or has no dependencies.]

- T0001 — [reason this blocks]
- ...

## Blocks

[List of ticket IDs that depend on this ticket. Empty if nothing depends on this.]

- T0003 — [reason this depends]
- ...

## Acceptance

[Observable criteria that verify completion. Every item must be testable.]

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] ...

## Out of Scope

[What this ticket explicitly does NOT do, even if related. Prevents scope creep.]

- [Excluded item 1]
- [Excluded item 2]
- ...
```

---

## Examples

### Web application example

Project layers: data store → service → API → UI → tests

```markdown
# OAuth2 Login — Happy Path

**Ticket ID:** T0002
**Source:** [Spec: 0001-user-authentication](../0001-user-authentication.md)
**Status:** Todo

## Goal

A registered user can click "Sign in with Google," complete the OAuth2 consent screen, and be redirected to the dashboard with a valid session.

## Layers

- [ ] **data store:** Create `users` table with columns: id, email, name, avatar_url, created_at. Migration `0002_create_users`.
- [ ] **service:** Implement user lookup-or-create logic, JWT issue/verify functions.
- [ ] **API:** `GET /auth/google` (redirect to Google), `GET /auth/google/callback` (handle code exchange, upsert user, issue JWT).
- [ ] **UI:** Login page with "Sign in with Google" button. Dashboard header displaying user name. Protected route wrapper.
- [ ] **tests:** E2E test for successful OAuth2 flow. API test for callback token issuance. UI component test for protected route redirect.

## Approach

1. Run migration to create `users` table with unique index on email.
2. Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` to environment config.
3. Implement `GET /auth/google` — construct Google OAuth2 URL with scopes (openid, profile, email) and redirect.
4. Implement `GET /auth/google/callback` — exchange code for tokens, fetch userinfo, upsert user record, issue JWT, redirect to frontend with token.
5. Create `LoginPage` component with Google sign-in button.
6. Create `ProtectedRoute` wrapper that checks for JWT, redirects to /login if missing.
7. Create `DashboardHeader` that decodes JWT and displays user name.
8. Write E2E test: mock Google OAuth2 responses, verify user lands on dashboard.

## Blocked by

- T0001 — Shared auth infrastructure (JWT utilities, config loader, HTTP client)

## Blocks

- T0003 — OAuth2 Error Handling (consumes the /auth/google/callback error path)
- T0004 — Token Refresh (consumes JWT issuance and validation)

## Acceptance

- [ ] Clicking "Sign in with Google" redirects to Google's OAuth2 consent page.
- [ ] Completing consent creates a user record if first login, or matches existing user.
- [ ] After consent, user is redirected to dashboard with name visible.
- [ ] Refreshing the dashboard page preserves the session.
- [ ] Accessing a protected route without a JWT redirects to /login.
- [ ] Migration rolls back cleanly.

## Out of Scope

- Error handling for OAuth2 failures (expired code, denied consent, network error). Covered in T0003.
- Token refresh mechanism. Covered in T0004.
- Logout. Covered in T0005.
- Multi-provider OAuth2. Google only.
- Role-based access control. All authenticated users have same access.
```

### CLI tool example

Project layers: data model → core logic → CLI interface → output formatting → tests

```markdown
# Config file validation

**Ticket ID:** T0002
**Source:** Conversation
**Status:** Todo

## Goal

User runs `tool validate --config path/to/config.yaml` and sees either "Config is valid" or a list of specific validation errors.

## Layers

- [ ] **data model:** Define `Config` struct with all fields and their validation annotations.
- [ ] **core logic:** Implement `Config::validate()` — checks required fields, value ranges, cross-field consistency.
- [ ] **CLI interface:** Add `validate` subcommand that accepts `--config` flag. Wire to validation logic.
- [ ] **output formatting:** Format validation errors as human-readable list with field paths and messages. Support `--json` flag for machine-readable output.
- [ ] **tests:** Unit tests for each validation rule. Integration test that runs the CLI binary against fixture config files.

## Approach

1. Define `Config` struct in `src/config.rs` with serde derives and custom validation.
2. Implement `validate()` method — iterate fields, collect errors into `Vec<ValidationError>`.
3. Add `Validate` variant to CLI enum in `src/cli.rs`, with `--config` and `--json` flags.
4. Implement handler: read file, parse YAML, call `validate()`, format errors or print success.
5. Create test fixtures: valid.yaml, missing-field.yaml, bad-range.yaml, inconsistent.yaml.
6. Write integration tests that shell out to the binary and assert stdout/stderr.

## Blocked by

- T0001 — CLI framework setup, config file loader, error formatting utility

## Blocks

- (none)

## Acceptance

- [ ] `tool validate --config valid.yaml` exits 0 and prints "Config is valid".
- [ ] `tool validate --config missing-field.yaml` exits 1 and prints field path + message per error.
- [ ] `tool validate --config bad-range.yaml` exits 1 with range violation messages.
- [ ] `tool validate --config inconsistent.yaml` exits 1 with cross-field error.
- [ ] `tool validate --config valid.yaml --json` outputs `{"valid": true}`.
- [ ] `tool validate --config missing-field.yaml --json` outputs structured error array.
- [ ] Running without `--config` prints usage error.

## Out of Scope

- Auto-fixing invalid configs (`tool fix`). Separate feature.
- Remote config fetching. Separate feature.
- Config schema generation (JSON Schema output). Deferred.
```

---

## Anti-patterns

### Hardcoded layer names

Bad: using "schema, API, UI, tests" for a CLI project.

Good: layers match the project's actual architecture, discovered from its structure.

### Vague layers

Bad:
```
- [ ] **data:** changes
- [ ] **logic:** changes
```

Good: specific modules, files, or contracts that change. Use the project's own terminology.

### Missing layer without justification

Bad: a web project with 5 confirmed layers but a ticket only lists 3.

Good: every confirmed layer appears in every ticket. If a layer genuinely has no work, state: "None — [reason]."

### Mixed concerns

Bad:
```
## Goal
A user can log in, log out, and reset their password.
```

Three independent outcomes. Split into three tickets.

### Approach as implementation script

Bad:
```
## Approach
1. Open src/db/migrations/0002.sql
2. Type: CREATE TABLE users...
3. Save the file.
```

Good: describe what to build and why, not keystrokes.
