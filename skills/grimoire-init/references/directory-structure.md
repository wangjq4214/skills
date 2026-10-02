# Directory structure

The base layout (not an exhaustive list of allowed content):

```text
.grimoire/
├── .gitignore
├── CONTEXT.md
├── adr/
├── spec/
└── ticket/
```

- `CONTEXT.md`: shared domain concepts and terminology, maintained by grimoire-record. It may instead index `CONTEXT-[domain].md` files; preserve existing indexes. When creating a missing file, use only the initial scaffold from [the context template](../../grimoire-record/references/context-template.md), not its examples; do not invent project concepts.
- `adr/`: architecture decision records, maintained by grimoire-record; filenames use `NNNN-title-with-dashes.md` with a zero-padded sequence number.
- `spec/`: requirements describing what must be built and why.
- `ticket/`: implementation plans and cross-cutting aspects: changes, sequence, and verification, not implementation code.

Create missing directories empty; do not generate sample records or plans.

## Git allowlist

Create `.grimoire/.gitignore` from [the allowlist template](../assets/grimoire.gitignore). It allows only itself, root `CONTEXT.md` / `CONTEXT-*.md`, and `.md` files recursively under `adr/`, `spec/`, and `ticket/`. Everything else, including `map/` and `refactor/`, stays local.

If an ignore file already exists, show its proposed diff and obtain approval rather than overwriting it silently. This configuration file is the exception to add-only initialization; preserve knowledge files. Check effective rules with `git check-ignore --no-index` when Git is available; parent or nested ignore rules may change the result. Report any mismatch rather than claiming the allowlist is enforced.

Ignore rules do not affect already tracked files. Inspect `git ls-files -- .grimoire` and report tracked paths outside the allowlist; do not delete or untrack them without separate approval. Without Git verification, report the policy as written but unverified.
