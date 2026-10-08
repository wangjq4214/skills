---
name: grimoire-debug
description: Use when a program crashes, produces incorrect results, fails unexpectedly or intermittently, or becomes unexpectedly slow, or when a failing test has an unexplained cause. For an already-understood fix with no diagnosis needed, use grimoire-implement.
---

Find, reproduce, locate, and explain failures. An error message is a clue, not proof of a root cause; connect the observed symptom to a mechanism with code inspection and discriminating runtime evidence where available. Separate observations, hypotheses, and confirmed causes.

## Choose depth automatically

Use the smallest sufficient depth; change it when evidence warrants, without asking the user to select a mode.

| Mode | When | Method |
| --- | --- | --- |
| **Direct** | The cause is clear and the impact local | Inspect the causal path, make an authorized fix, and verify the original symptom. No mandatory hypothesis list or minimization exercise. Escalate if the explanation or fix fails. |
| **Investigate** | The cause is unclear | Establish a failing feedback loop, reduce the case while preserving the symptom, and test competing explanations. |
| **Deep** | Concurrency, performance, intermittent failures, or interacting causes | Use targeted traces, profiling, controlled scheduling, bisect, or differential experiments as relevant; not a checklist of required tools. |

## Establish and narrow the failure

Capture expected versus actual behavior and the triggering input, environment, version, and command or interaction. Preserve a baseline for comparison. Reuse existing evidence when it describes the same failure and conditions.

For Investigate/Deep, prefer a repeatable reproducer before changing production behavior. Minimize inputs, dependencies, or steps without removing the triggering conditions. For each useful hypothesis, predict an observation that would distinguish it from alternatives, vary one relevant factor, and compare the result with the prediction. Update or reject the hypothesis before stacking speculative patches. A passing unrelated test does not discriminate causes.

For intermittent or performance failures, record workload, scheduling/seed where controllable, repetitions, and failure rate or timing distribution. Compare equivalent before/after conditions; a single clean run does not establish resolution. Avoid unsafe production experiments; use an isolated reproduction or request the necessary access.

If reproduction or instrumentation is unavailable, use the available code/log evidence, label the cause provisional where unsupported, and identify the next discriminating check. Do not invent execution results or block all useful diagnosis on a mandatory failing test.

## Repair boundary and verification

Diagnosis alone does not authorize repairs. For authorized code fixes, load and apply `grimoire-implement`; use `grimoire-test` for test design, execution, and durable regression protection, and `grimoire-check` to judge whether the original problem and requirements are resolved. The same agent may continue inline: no mandatory handoff or full pipeline. Do not start `grimoire-loop` without explicit user invocation. Under orchestration, honor the caller's write and execution limits; omitted checks remain unverified.

TDD is not required. Existing tests, temporary reproduction scripts, logs, profiler output, and real program runs are valid evidence. Add durable regression tests when recurrence risk warrants them, not merely to satisfy a workflow gate.

After a fix, rerun the original failing command or interaction under comparable triggering conditions and check its observable outcome, not just compilation or a green suite. If diagnosis used a reduced case, also verify the original scenario. If that is unavailable or prohibited, report the fix as unverified for the original symptom. Remove diagnostic changes that are no longer needed without discarding evidence needed to explain the result.

Finish with the symptom, supported cause and causal evidence (or remaining hypotheses), decisive experiments and results, and original-symptom verification status. Diagnosis may complete without a fix; do not equate a plausible cause, a patch, or an unexecuted check with a resolved failure.
