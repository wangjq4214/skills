---
name: commit
description: Use when explicitly invoked to draft a commit message for staged changes or create a local commit with a gitmoji-prefixed Conventional Commit message.
disable-model-invocation: true
---

Commit only the user's staged changes. Do not stage or repartition files, manage
branches, resolve conflicts, create merge commits, amend history, push, or
interact with remotes.

## Prepare and confirm

1. Check `git status` and read `git diff --cached`, not just filenames or stats.
   Stop for an in-progress merge or unresolved conflicts. If nothing is staged,
   report modified/untracked files and ask the user to stage their selection or
   authorize a separate staging task; recheck the index afterward.
2. Read [references/format.md](./references/format.md) to choose type and one
   emoji. Classify by primary semantic intent, not line count or generated-file
   volume. Inspect large diffs in coherent file/package groups; ask about intent
   only if material ambiguity remains. For independent changes, propose a split
   for the user to arrange rather than altering the index.
3. Draft the message using the rules below, display it in a code block, and ask
   “Commit with this message?” Wait for approval clearly referring to this
   message and the reviewed staged changes; a brief affirmation can suffice.

## Message

```text
<gitmoji> <type>(<scope>): <summary>

<optional body>
```

- Scope: lowercase, hyphenated module/component name; use its directory or
  package when unclear. For multiple scopes, choose the most meaningful change;
  omit scope and parentheses for project-wide changes with no useful scope.
- Summary: imperative, lowercase initial unless a proper noun, no trailing
  period. Aim for 50 characters or fewer, maximum 72; do not pad short summaries.
- Body: explain why and what effect the change has, not implementation details
  already visible in the diff. Omit it if it only repeats the header or diff.
  Separate it from the header with a blank line and wrap at 72 characters.
  Include applicable issue references as `Closes #123` or `Refs #456`.

## Execute

Recheck the staged diff before committing. If the message or staged content has
materially changed, present the revised draft and obtain approval again. Clarify
ambiguous approval rather than treating it as permission.

Run `git commit` with the approved message only: use `-m` for the header and a
second `-m` only when there is a body, or `-F` with a message file. Pass the text
literally using safe quoting for the active shell; do not let message contents
expand as shell commands or variables. Do not use `-a` or path arguments, which
would change the staged-only scope.

If the commit fails, report the failure; do not bypass hooks or report an
existing HEAD as success. Reinspect staged changes before any retry and renew
approval if materially changed. After a successful commit, report its short
hash from `git rev-parse --short HEAD`. Do not push.
