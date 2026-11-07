# Failures, repairs, and resumption

Read when checks fail, fixes need repetition, or execution is interrupted. The execution contract in [../SKILL.md](../SKILL.md) controls all checks, writes, and retries; recovery never restores disabled work.

Deduplicate findings into confirmed blocking, advisory, praise, or **needs-verification**. A failed command alone does not prove a product defect: distinguish baseline failures, missing prerequisites, and change-induced failures. A prerequisite can block execution without proving a code defect. Resolve uncertainty only with authorized checks; otherwise retain it.

Fix only with both fix and corresponding write permission. Adjacent advisory fixes must be low-risk, related, and in scope. Clarify requirement/scope changes rather than redefining acceptance. Material approach changes revise enabled planning context without erasing acceptance criteria or introducing disabled planning/persistence.

Repeat only while authorized, making progress, safe, and in scope; honor single-pass/user limits. Stop with a reason on nonconvergence, missing authority/information, or exhausted scope. Report partial results and the next needed decision/evidence rather than treating a stopped loop as clean.

On interruption, establish what actually completed and what changed before retrying; do not blindly replay writes or commands with side effects. Reconcile current instructions and pending human gates. Refresh only affected enabled checks after writes or changed source/dependencies/environment; disclose evidence that cannot be refreshed within authority.
