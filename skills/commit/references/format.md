# Commit Format Reference

## Header Structure

```
<gitmoji> <type>(<scope>): <summary>
```

No blank line between gitmoji and type. One space between each token.

## Conventional Commit Types

| Type       | Use when                                                     |
| ---------- | ------------------------------------------------------------ |
| `feat`     | New feature or user-visible functionality                    |
| `fix`      | Bug fix (corrects unintended behavior)                       |
| `docs`     | Documentation only — README, comments, help text             |
| `style`    | Formatting, whitespace, missing semicolons (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature      |
| `perf`     | Performance improvement                                      |
| `test`     | Adding or correcting tests                                   |
| `build`    | Build system, tooling, dependency changes                    |
| `ci`       | CI/CD pipeline configuration                                 |
| `chore`    | Maintenance — cleanup, .gitignore, mundane tasks             |
| `revert`   | Reverting a previous commit                                  |

## Gitmoji Mapping

Pick exactly one emoji. Match the primary intent, not every side effect.

| Gitmoji | Type(s)           | Intent                                 |
| ------- | ----------------- | -------------------------------------- |
| ✨       | `feat`            | New feature                            |
| 🐛       | `fix`             | Bug fix                                |
| 📝       | `docs`            | Documentation                          |
| 🎨       | `style`           | Formatting / style                     |
| ♻️       | `refactor`        | Code restructuring                     |
| ⚡       | `perf`            | Performance                            |
| ✅       | `test`            | Tests                                  |
| 👷       | `build`           | Build system                           |
| 💚       | `ci`              | CI/CD                                  |
| 🔧       | `chore`           | Configuration / tooling                |
| ⏪       | `revert`          | Revert                                 |
| 🔥       | `chore`, `refactor` | Remove code/files                    |
| 🚀       | `feat`, `build`   | Deploy / release                       |
| 🔒       | `fix`, `feat`     | Security                               |
| 🚨       | `test`, `fix`     | Linting / failing tests                |
| 🩹       | `fix`             | Simple/hot fix                         |
| 💡       | `docs`, `refactor` | Add or update comments                |

## Scope Rules

- Lowercase, hyphenated for multi-word: `token-refresh`, `user-auth`
- Use the module, package, directory, or component name
- When changes span multiple scopes, pick the most affected one
- Omit scope (empty parentheses) only when the change is truly project-wide (`chore` type or monorepo root changes)

## Summary Rules

- Imperative mood: "add" not "adds" or "added"
- No trailing period
- 50–72 characters (ideal ≤ 50, hard max 72)
- Lowercase first letter unless it is a proper noun

## Body Rules

- Blank line after header
- Explain **why** the change exists and **what** effect it has
- Do not explain **how** — the diff already shows that
- Wrap at 72 characters
- Reference issues: `Closes #123` or `Refs #456`

## Edge Cases

### Monorepo with multiple changed packages

Pick the package that has the most meaningful change. If changes are truly independent across packages, commit them separately.

### Generated files (lockfiles, build artifacts)

Use `chore` or `build`. No body needed unless the diff is unusual.

### Merge commits

This skill does not handle merge commits. Skip.

### Revert of a revert

Treat as a normal change. Determine intent from the resulting code state, not from the revert chain.
