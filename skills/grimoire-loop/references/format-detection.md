# Format Detection

Use during loop's Format and report step when the project's formatting approach is unclear. The permission and verification rules in [grimoire-loop](../SKILL.md) govern execution; this reference helps select tooling and scope.

## Determine the project's convention

Inspect package/build scripts, contributor instructions, CI commands, installed tooling, and configuration applicable to the changed files. In a monorepo, inspect the affected package and inherited root settings; root configuration alone may not govern every file.

Use evidence of the maintained workflow to choose among tools. Coexisting configurations are not a first-match contest: they may apply to different paths or represent a migration. Resolve material conflicts from repository evidence, asking only when the intended convention remains consequentially ambiguous.

## Candidate tools

These are discovery hints, not defaults to install or unconditional commands to execute. Prefer the project's pinned tool and runner. Select the installed version's check/write options and file filters after inspecting its invocation.

| Language                           | Evidence to inspect                                                                     | Candidate tooling                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| JS / TS / JSX / TSX / Vue / Svelte | Package scripts, Prettier configuration or package key, `biome.json[c]`, `deno.json[c]` | Prettier, Biome, Deno formatter                     |
| Rust                               | Cargo scripts/CI, `rustfmt.toml`, `.rustfmt.toml`, toolchain configuration              | cargo fmt / rustfmt                                 |
| Python                             | Project scripts, `pyproject.toml`, `ruff.toml`, `.ruff.toml`, CI                        | Ruff formatter, Black, project-selected alternative |
| Go                                 | Project scripts, CI, module/tool dependencies                                           | gofmt, goimports                                    |
| C / C++                            | Build scripts, `.clang-format`                                                          | clang-format                                        |
| Java / Kotlin                      | Maven/Gradle tasks and plugins, ktlint configuration                                    | Spotless, ktlint, project-selected formatter        |
| C# / .NET                          | Project/solution scripts, `.editorconfig`, build properties                             | dotnet format                                       |
| Dart / Flutter                     | Project scripts, `pubspec.yaml`, SDK version                                            | dart format                                         |

`.editorconfig` can supply formatting settings but does not by itself select an executable. If no formatter is established or available, report the limitation rather than adopting a new one solely because the language is recognized. Tool installation is a separate dependency/network action, not implicit formatting permission.

## Select an invocation within scope

Build an explicit list of relevant changed files, including new files, and respect ignore/generated-file conventions. Prefer commands with exact file arguments or supported include filters. For example, when established by the project:

| Tool     | Non-writing check                                         | Authorized write           |
| -------- | --------------------------------------------------------- | -------------------------- |
| Prettier | `prettier --check <files>`                                | `prettier --write <files>` |
| Ruff     | `ruff format --check <files>`                             | `ruff format <files>`      |
| Black    | `black --check <files>`                                   | `black <files>`            |
| gofmt    | `gofmt -l <files>`                                        | `gofmt -w <files>`         |
| Dart     | `dart format --output=none --set-exit-if-changed <files>` | `dart format <files>`      |

Adapt these examples to the project's runner and installed tool version. `gofmt -l` requires inspecting its output, not just its exit code.

Commands such as `cargo fmt`, `go fmt ./...`, unfiltered `dotnet format`, and build-wide Spotless apply tasks can touch files outside the intended change. Check their actual scope before using them. If a safe write filter is unavailable, use a non-writing check where supported and report the limitation, or obtain authorization for the wider scope. Do not run a broad write and then revert unrelated user changes to hide its effects.

For multiple tools, consider overlapping file ownership and order-sensitive transformations. After authorized formatting, inspect the diff for unexpected changes and follow loop's affected-verification rule; do not assume multiple formatters commute or share the same style.
