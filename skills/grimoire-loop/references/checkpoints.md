# Human checkpoints

Read before preparing or resuming a human gate. The execution contract in [../SKILL.md](../SKILL.md) remains authoritative.

Honor user-specified checkpoints. Select discretionary checkpoints only when the user authorizes that judgment; record each concrete risk, uncertainty, reversibility, or human-evidence reason before reaching it, revising as evidence changes. Otherwise add no routine approvals.

1. Prepare only up to the checkpoint. Present the artifact/build/version, requested action/decision, expected feedback/evidence, and paused work.
2. Set **waiting for user** and end the turn. Do not substitute automated approval, mark the checkpoint passed, launch downstream work, poll, or continue. Independent work during a pause requires explicit user permission.
3. Bind feedback to the checkpoint and current code/artifact version. Record satisfaction, requested changes, or contract revisions. Resume only released work; partial or ambiguous feedback leaves unresolved checkpoint work paused. Invalidate affected evidence if files changed while waiting.

For manual E2E, include the environment and relevant scenarios. Preserve partial pass/fail evidence; route failures to fixes only when authorized. Feedback on an older build needs an applicability check before release. If the user cancels E2E, revise the remaining contract without claiming E2E acceptance.
