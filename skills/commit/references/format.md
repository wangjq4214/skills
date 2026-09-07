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

| Gitmoji | Type(s)             | Intent                  |
| ------- | ------------------- | ----------------------- |
| ✨       | `feat`              | New feature             |
| 🐛       | `fix`               | Bug fix                 |
| 📝       | `docs`              | Documentation           |
| 🎨       | `style`             | Formatting / style      |
| ♻️       | `refactor`          | Code restructuring      |
| ⚡       | `perf`              | Performance             |
| ✅       | `test`              | Tests                   |
| 👷       | `build`             | Build system            |
| 💚       | `ci`                | CI/CD                   |
| 🔧       | `chore`             | Configuration / tooling |
| ⏪       | `revert`            | Revert                  |
| 🔥       | `chore`, `refactor` | Remove code/files       |
| 🚀       | `feat`, `build`     | Deploy / release        |
| 🔒       | `fix`, `feat`       | Security                |
| 🚨       | `test`, `fix`       | Linting / failing tests |
| 🩹       | `fix`               | Simple/hot fix          |
| 💡       | `docs`, `refactor`  | Add or update comments  |

## Scope Rules

- Lowercase, hyphenated for multi-word: `token-refresh`, `user-auth`
- Use the module, package, directory, or component name
- When changes span multiple scopes, pick the most affected one
- For truly project-wide changes with no useful scope, omit both scope and parentheses: `<gitmoji> <type>: <summary>`.

## Summary Rules

- Imperative mood: "add" not "adds" or "added"
- No trailing period
- Aim for 50 characters or fewer; maximum 72. There is no minimum length: preserve meaning without padding.
- Lowercase first letter unless it is a proper noun

## Body Rules

- Blank line after header
- Explain **why** the change exists and **what** effect it has
- Do not explain **how** — the diff already shows that
- Wrap at 72 characters
- Reference issues: `Closes #123` or `Refs #456`

## Edge Cases

### Monorepo with multiple changed packages

Pick the package with the most meaningful change. If staged changes are genuinely independent and separate commits would improve clarity, propose that split for the user to arrange; this skill does not repartition the index.

### Generated files (lockfiles, build artifacts)

For standalone tooling or generated-file maintenance, `chore` or `build` often fits. When generated changes accompany a feature or fix, classify the whole commit by its primary intent rather than the generated file volume.

### Merge commits

This skill does not handle merge commits. Skip.

### Revert of a revert

Treat as a normal change. Determine intent from the resulting code state, not from the revert chain.
