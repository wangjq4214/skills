# Format Detection

Detection logic for step 5 (Format). Identify and run the project's formatter on modified files.

---

## Detection order

Check for config files in project root. First match wins per language group.

### JavaScript / TypeScript / JSX / TSX / Vue / Svelte

| Config file                                                                                                                                                                       | Formatter                                  | Command                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| `.prettierrc`, `.prettierrc.json`, `.prettierrc.yaml`, `.prettierrc.js`, `.prettierrc.mjs`, `.prettierrc.cjs`, `prettier.config.js`, `prettier.config.mjs`, `prettier.config.cjs` | prettier                                   | `npx prettier --write <files>`     |
| `.editorconfig` (no prettier config)                                                                                                                                              | (use editorconfig-aware formatter or skip) | —                                  |
| `deno.json`, `deno.jsonc` (with `"fmt"` config)                                                                                                                                   | deno fmt                                   | `deno fmt <files>`                 |
| `biome.json`, `biome.jsonc`                                                                                                                                                       | biome                                      | `npx biome format --write <files>` |
| None found                                                                                                                                                                        | prettier (default for JS/TS)               | `npx prettier --write <files>`     |

### Rust

| Config file                     | Formatter         | Command     |
| ------------------------------- | ----------------- | ----------- |
| `rustfmt.toml`, `.rustfmt.toml` | rustfmt           | `cargo fmt` |
| None found (Cargo.toml exists)  | rustfmt (default) | `cargo fmt` |

### Python

| Config file                          | Formatter       | Command               |
| ------------------------------------ | --------------- | --------------------- |
| `pyproject.toml` with `[tool.black]` | black           | `black <files>`       |
| `pyproject.toml` with `[tool.ruff]`  | ruff format     | `ruff format <files>` |
| `.ruff.toml`                         | ruff format     | `ruff format <files>` |
| `setup.cfg` with `[black]`           | black           | `black <files>`       |
| None found                           | black (default) | `black <files>`       |

### Go

| Config file     | Formatter         | Command                                  |
| --------------- | ----------------- | ---------------------------------------- |
| `go.mod` exists | gofmt / goimports | `go fmt ./...` or `goimports -w <files>` |

### C / C++

| Config file     | Formatter    | Command                   |
| --------------- | ------------ | ------------------------- |
| `.clang-format` | clang-format | `clang-format -i <files>` |
| None found      | skip         | —                         |

### Java

| Config file                    | Formatter           | Command                |
| ------------------------------ | ------------------- | ---------------------- |
| `pom.xml` with spotless plugin | spotless            | `mvn spotless:apply`   |
| `build.gradle` with spotless   | spotless            | `gradle spotlessApply` |
| `.editorconfig`                | (use IDE formatter) | —                      |
| None found                     | skip                | —                      |

### Kotlin

| Config file                            | Formatter        | Command               |
| -------------------------------------- | ---------------- | --------------------- |
| `.editorconfig` with `[*.kt]`          | ktlint           | `ktlint -F <files>`   |
| `pom.xml` / `build.gradle` with ktlint | ktlint via build | depends on build tool |

### C# / .NET

| Config file             | Formatter     | Command         |
| ----------------------- | ------------- | --------------- |
| `.editorconfig`         | dotnet format | `dotnet format` |
| `Directory.Build.props` | dotnet format | `dotnet format` |

### Dart / Flutter

| Config file           | Formatter   | Command               |
| --------------------- | ----------- | --------------------- |
| `pubspec.yaml` exists | dart format | `dart format <files>` |

---

## Execution rules

1. Detect language(s) from modified files' extensions.
2. For each language, scan project root for config files in detection order.
3. Use the first matching formatter.
4. Run the formatter only on files modified in the current implementation.
5. If no formatter is detected for a language, skip it and note in the report.

## Multi-language projects

When a project contains multiple languages, run each detected formatter once. Order does not matter — formatting is idempotent.

Example: a project with Rust backend and TypeScript frontend:
```
cargo fmt
npx prettier --write frontend/src/**/*.ts frontend/src/**/*.tsx
```
