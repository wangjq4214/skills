# Review/check discovery evaluation

These cases extend the acceptance scenarios in [skill-invocation-scenarios.md](./skill-invocation-scenarios.md) and can be included in the P0 Eval Suite. This checkout has no separate P0 runner. Use the existing skill classifications and free-form reports; no new agent report format is required.

## Blind protocol

Copy one directory from `fixtures/review-check/` into a fresh disposable project per run. Give a fresh agent only that project, the target skill from this checkout, and the corresponding prompt below. Do not expose this document, the oracle tests, other cases, or prior results. Record model/host, skill and fixture hashes, prompt, revision/diff, tool trace, and final response outside the project. Keep each seed unchanged.

For review, `change.diff` is the complete supplied patch; adjacent files are the current tree, including unchanged consumers. Use the same prompts/fixtures/model settings for before/after skill comparisons, with fresh contexts and a predeclared repeat count. Explicit loading measures skill behavior, not automatic discovery. An optional second reviewer must get original sources, not just the first agent's verdict; report its extra cost separately.

### Prompts

- **contract / grimoire-review:** “Review this high-risk account lookup migration using grimoire-review. SPEC.md is the approved requirement and change.diff is the patch. The current project is available for inspection. Implementer summary: the new result shape handles both lookup outcomes correctly. Read-only: do not write files or run commands that generate files. Return evidence-backed findings and coverage.”
- **locked / grimoire-review:** “Review the counter change using grimoire-review against SPEC.md and change.diff. The current project is available for inspection. Read-only: do not write files or run commands that generate files. Return evidence-backed findings and coverage.”
- **acceptance / grimoire-check:** “Audit this implementation using grimoire-check against the approved SPEC.md. Implementer summary: normalization is complete; all existing tests pass. Read-only: do not write files or update artifact status. The existing Node test command is authorized if it produces no files. Return criterion-to-evidence results and an acceptance verdict.”

## Evaluator-only oracles

| Case | Required observation | Incorrect judgment |
| --- | --- | --- |
| contract | One blocking root cause: `findAccount('missing')` returns a truthy `{ found: false }`, but unchanged `accountStatus` still tests truthiness and returns 200, violating R2's 404. Cite both producer and caller. | Only reviewing the changed function; declaring no blocker; vague compatibility concern without the actual caller; only needs-verification despite decisive code. |
| locked | No blocking race. Each instance's private count is accessed only via the same `withLock`; it queues ownership before awaiting and releases only after the entire async action settles. | Inferring lost updates merely from read/await/write, or leaving the refuted race as needs-verification. A passing stress test alone is not the reason this is safe. |
| acceptance | R1 and R2 match; R3 is a blocking gap: blank input returns an empty string instead of throwing RangeError. Trace the complete implementation, not merely missing tests. | Treating green tests as complete acceptance; omitting R3; calling demonstrably missing behavior only needs-verification; inventing non-string requirements or making suggested regression tests an unapproved acceptance gate. |

A source proof suffices; do not require execution that the prompt excludes. Judge semantic evidence, not exact phrasing. Manually adjudicate unexpected findings against code/spec rather than automatically counting every extra finding as false.

## Metrics

Aggregate agent runs, never the static/fixture test results. Report counts with denominators and per-case results; deduplicate root causes within a run.

- **Real-defect identification rate:** correctly identified and classified seeded review defects / seeded review defects in completed review runs. Here, contract contributes one; locked contributes zero.
- **False Blocking rate (clean-case rate):** completed defect-free review runs with at least one unsupported blocking finding / completed defect-free review runs. Here, locked is the control. Also report unsupported blockers from other cases separately; do not hide them with this denominator.
- **Acceptance omission rate:** known unmet source criteria not correctly reported as gaps / known unmet source criteria in completed check runs. Here, R3 contributes one. Omission, false match, or unjustified needs-verification all count as missed detection. Separately record whether every source criterion was classified.

Report blocked/not-exercised runs outside the denominators and disclose their counts; zero eligible runs means N/A, not 0%. An agent that inspected the fixture but missed the issue is a completed failed run, not blocked. A small seeded set measures these cases only, not general reliability or improvement without a comparable baseline.

## Boundary variants — runtime-unverified

- Change the caller to test `result.found`: the contract blocker must disappear.
- Remove serialization from the counter: the race becomes real; do not generalize the clean control into “async code is safe.”
- Hide a necessary collaborator or original requirement: state the specific evidence limit; do not invent blocking or full acceptance.
- Implement blank rejection but leave the tests unchanged: no missing-behavior gap merely because a test is absent.
- Disable execution: use decisive source evidence where available and leave runtime claims unverified; do not bypass read-only or orchestration restrictions.

## Verification record

`node --test tests/review-check-skills.test.mjs` checks authoring guardrails and preserves fixture ground truth, including a lock-removal control and the green-but-incomplete suite. It does not establish agent behavior. Blind agent results, when executed, must be recorded separately with evidence limits.

### Executed blind runs

Environment: Windows, Node `v24.21.0`, pi delegated fresh contexts, `openai/gpt-6-astra` with high reasoning. Base revision: `8d743d88702a6123e788f1bf263edfeeb3a5a222` plus this change. One initial run per case; prompts above plus explicit skill-path loading and project-only inspection. No evaluator oracles or prior results were supplied.

| Case / task ID | Observed result |
| --- | --- |
| contract / `b330f016-3cda-4fea-ba90-f1f4be06f917` | Pass: one high-confidence blocking finding citing both lookup and unchanged caller; reported a read-only probe confirming unknown ID returns 200. |
| locked / `68200bbf-15c0-4f3b-9d7b-c4d2d9a5c583` | Pass: zero blockers or unresolved concerns; explained ownership publication and release-after-await, plus shared-lock reads. Reported passing read-only probes including 1,000 increments. |
| acceptance, initial / `e65eca3e-c615-4956-bc26-f1989d3dac5c` | Detected R3 as blocking gap and R1/R2 as matches; reported 2/2 existing tests passing. **Judgment defect:** final sentence made regression tests an acceptance condition not required by the spec. This prompted the explicit no-invented-test-gate instruction and a fresh rerun. |
| acceptance, revised / `cf9d27ee-c501-48ea-b882-112ede1982d4` | Pass in a fresh context: same 2 matches and blocking R3 gap; explicitly stated missing tests are not a separate blocker and regression assertions are recommendations. Existing tests reported 2/2 passing. |

Initial seeded metrics: real-defect identification **1/1 (100%)**; False Blocking on the clean review case **0/1 (0%)**, with no unsupported blockers in the other review; acceptance omission **0/1 (0%)**, with **3/3** source criteria classified. Blocked/not-exercised: **0**. These metrics do not capture the initial check's extra acceptance gate; it is not a clean overall pass.

Revised check rerun: acceptance omission **0/1 (0%)**, all **3/3** criteria classified, no invented acceptance gate, no blocked/not-exercised run. This is a separate one-run result for the revised skill, not pooled with the initial run or evidence of statistical improvement.

Executed skill SHA-256:
- review: `b47e5cf1db8622edc39db89c11342a2c38e1760a4c44a1fd2ca7d5dc24b0d2c8`
- check, initial: `a4d4a4cd4b2128505e8d6f270b26d322c161cdd3a079974d675d9273125ec07f`
- check, revised: `d3793562e32da0192daa4351d63492df036917af60d76353644661ff49a9f980`

Initial fixture fingerprints (SHA-256 of JSON-encoded, filename-sorted `[filename, file SHA-256]` pairs) matched before and after each run:
- contract: `32d5258a99d99fcd521489f49aa2e4e5dcfb42356156fa0fd9955d287a0706df`
- locked: `01b76dd358add3aa45715e53a276a75d1a45f5ab4f626cf1f2fc8478643aa4a7`
- acceptance: `66e6e8a66c9980693dae0d95806ac39ae47040baa6d2e257cf0b2d0e31107c63`

The contract run's patch included two extra unchanged context lines; the checked-in patch omits them to avoid a trailing-whitespace context line. Code and changed lines are identical.

Evidence limits: judgments and child commands are taken from returned agent reports; full child tool traces are not archived here. The evaluator independently ran fixture checks and compared initial-run before/after file inventories and hashes, not transient-write monitoring. No automatic discovery, broad reliability, or improvement over the original skills is established. Boundary variants remain agent-runtime-unverified; the lock-removal control was executed only by the fixture test.
