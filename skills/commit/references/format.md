# Type and emoji selection

Choose the type by primary intent, then exactly one emoji. Use the default
below unless an alternative describes that intent more precisely.

| Type | Default | Intent |
| --- | --- | --- |
| `feat` | ✨ | New feature or user-visible functionality |
| `fix` | 🐛 | Correct unintended behavior |
| `docs` | 📝 | Documentation only, including comments and help text |
| `style` | 🎨 | Formatting or whitespace without logic changes |
| `refactor` | ♻️ | Code change that neither fixes a bug nor adds a feature |
| `perf` | ⚡ | Performance improvement |
| `test` | ✅ | Add or correct tests |
| `build` | 👷 | Build system, tooling, or dependencies |
| `ci` | 💚 | CI/CD configuration |
| `chore` | 🔧 | Maintenance or configuration cleanup |
| `revert` | ⏪ | Revert a previous commit |

Alternatives (allowed types):

- 🔥 Remove code/files (`chore`, `refactor`)
- 🚀 Deploy/release (`feat`, `build`)
- 🔒 Security (`fix`, `feat`)
- 🚨 Linting/failing tests (`test`, `fix`)
- 🩹 Simple/hot fix (`fix`)
- 💡 Add/update comments (`docs`, `refactor`)

Standalone generated-file or tooling maintenance often fits `chore` or `build`;
when it accompanies a feature or fix, use the feature/fix intent instead.
Treat a revert of a revert as a normal change, classifying the resulting code
state rather than the revert chain.
