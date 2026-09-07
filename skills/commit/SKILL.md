---
name: commit
description: Write commit messages in Conventional Commits format with gitmoji and execute the commit — type, scope, summary, and body.
disable-model-invocation: true
---

# Purpose

Guide the agent to produce a commit message in `<gitmoji> <type>(<scope>): <summary>\n\n<body>` format and execute the commit.

# Scope

This skill writes commit messages and commits staged changes. It does NOT stage files, manage branches, resolve merge conflicts, amend history, push, or interact with remotes. The user decides what to commit; the skill decides how to format it.

---

# Leading words

- **header** — the first line: `<gitmoji> <type>(<scope>): <summary>`
- **body** — the optional paragraph(s) after the blank line, explaining why and what
- **summary** — the imperative, one-line description in the header
- **scope** — the module, component, or area affected (lowercase, hyphenated when multi-word)

---

# Workflow

## 1. Pre-flight

Check the staging area:

```bash
git diff --cached --stat
```

If staged changes exist, proceed to step 2.

If no staged changes exist, run `git status`, report modified/untracked files, and ask the user to stage the intended changes or authorize a separate staging task. This skill does not stage files; resume by checking the index again once staging is complete.

Completion: Staged changes are confirmed and ready for analysis, or execution is paused with the staging prerequisite explained.

---

## 2. Analyze changes

Read the staged diff:

```bash
git diff --cached
```

Determine from the diff content, not the file names alone:

- **type** — one of the conventional commit types (see [references/format.md](./references/format.md))
- **scope** — the affected module, component, or area (lowercase, hyphenated)
- **gitmoji** — one emoji matching the primary intent (see [references/format.md](./references/format.md))

Decision rules:

- When changes span multiple types, pick the primary intent by semantic impact; generated churn or line count need not dominate.
- When scope is ambiguous, use the directory or package name of the affected files.
- For a large diff, inspect coherent file/package groups and distinguish generated changes from behavioral changes. Ask about primary intent only when material ambiguity remains after inspection, not because the diff crosses a line-count threshold.

Completion: type, scope, and gitmoji are selected. Every selection has a reason traceable to the diff.

---

## 3. Draft message

Apply [references/format.md](./references/format.md) for message syntax. Write a concise header expressing the primary intent and add a body when rationale, impact, or issue references need explanation. Omit a body that would only repeat the header or diff.

Draft the full message and present it to the user as a code block:

```
✨ feat(auth): add OAuth2 token refresh

Invalid tokens were silently rejected after expiry, causing unexpected
login prompts. This adds automatic refresh via the /token endpoint.
```

Completion: A draft message is displayed. The user has not yet approved.

---

## 4. Confirm

Ask the user: "Commit with this message?"

Wait for approval that clearly refers to committing the displayed message and staged changes. A brief affirmation can suffice in that context; ask again if its referent is ambiguous or the message or staged content materially changes.

If the user asks for changes, return to step 3 and revise.

Completion: User has explicitly approved the message. Execution proceeds to step 5.

---

## 5. Commit

Execute:

```bash
git commit -m "<header>" -m "<body>"
```

If the body is empty, use only `-m "<header>"`.

After commit, confirm with the commit hash from `git rev-parse --short HEAD`.

Do NOT push.

Completion: Commit is created. Short hash is reported. Execution ends.

---

# Rules

- Never stage files. The user controls what goes into the commit.
- Never push. Commits stay local.
- Never amend or force-push without an explicit user request.
- Never generate a message without reading the diff. Guessing from file names is not sufficient.
- Format details live in [references/format.md](./references/format.md). SKILL.md controls workflow only.

---

# References

- [format.md](./references/format.md) — full type list, gitmoji mapping, scope naming rules, and edge cases
