# Review situations

- **Large change:** partition by behavior, dependency, directory, or commit without pausing an authorized full review for a slicing preference. Track inspected, partial, and unread coverage; continue authorized portions or state the concrete stopping reason.
- **Unfamiliar domain:** seek available contracts and examples. Separate conclusions supported by code from domain behavior you cannot establish; report the latter as unverified, not correct.
- **Disputed finding:** recheck intent and evidence. Drop optional suggestions the owner declines; for a claimed blocker, identify what evidence resolves the disagreement rather than silently treating disagreement as a fix.
- **Urgent/hotfix:** prioritize correctness and security. Disclose reduced coverage instead of claiming a full review.
- **No findings:** summarize the inspected scope and evidence limits. Do not invent criticism or praise to fill a report.
