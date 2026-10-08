# Loop routing Eval

The maintenance suite protects skill text and the deliberately unfixed fixture. It does not execute a model. The runs below exercise actual agents in disposable projects; they are not scenario reasoning or proof of general reliability.

## Replay

Copy `fixtures/loop-lightweight/` into a fresh disposable Git repository for each case, commit the baseline, and use a fresh agent context. No `.grimoire/` exists initially. Resolve loop and companion skills to this checkout, not older installed copies. Allow writes only in the disposable project and read-only access to skill instructions/references. Withhold this document and the skills repository's tests from the agent; fixture-local tests may be used. Never give the agent the expected routing outcome.

Supply one of these user requests:

- **Simple:** Use grimoire-loop to fix normalizeLabel: trim surrounding whitespace and lowercase string input; whitespace-only input returns ''. Preserve internal spacing. Non-string input is outside scope. This is a local change for this session, with no handoff or resumption needed. Verify it. Execute inline.
- **Paraphrase:** Run grimoire-loop for this small fix and check the result: normalizeLabel('  HeLLo  ') should return 'hello', blank strings should normalize to '', and spaces between words must stay as they are. Inputs are strings only. Finish it here; nobody needs to pick it up later. Execute inline.
- **Inferred route:** Use grimoire-loop to implement normalizeLabel: trim surrounding whitespace and lowercase string input; whitespace-only input returns ''. Preserve internal spacing; non-string input is outside scope. Verify the result. Execute inline.
- **Explicit-plan control:** Use grimoire-loop for normalizeLabel: trim surrounding whitespace and lowercase string input; whitespace-only input returns ''. Preserve internal spacing; non-string input is outside scope. Save an implementation plan first and stop for my approval before editing production code. Execute inline.

Evaluator-only criteria:

| Case | Required observations |
| --- | --- |
| Simple / paraphrase / inferred route | Loads implement, repairs the function, runs targeted checks, and reports evidence. Does not invoke plan or create plan files/directories/viewers. No separate QA stage is needed merely to fill the pipeline. |
| Explicit-plan control | Loads plan, saves a useful requirements-preserving plan, reports waiting for user, and leaves production/tests unchanged. No downstream implementation or approval substitute. |

Inspect full tool traces where available, not just final claims. Compare all project files (including untracked/ignored files) to the baseline, and independently run `node --test normalize-label.test.mjs` after the lightweight cases. Plan control should retain the original defect: green tests are not its completion condition. A final filesystem snapshot cannot rule out transient writes; no-plan invocation requires trace evidence.

## Executed bounded runs

Environment: Pi delegated fresh contexts, `openai/gpt-6-astra`, high reasoning; Windows, Node `v24.21.0`. Base revision `fcac7d5505b4b8e68832d30075efd26c815b52de` plus this change. Explicit skill paths were supplied, so this does not test automatic host discovery. Temporary projects were under `C:/Users/DEREKW~1/AppData/Local/Temp/tmp.9JuzCVmX8c/`; these paths are evidence locations, not replay dependencies.

| Case / task ID | Agent-reported execution | Independently observed outcome |
| --- | --- | --- |
| Simple — `086d2e22-f9e1-44d5-95d1-187027496ce6` | Implement → targeted verification; 6 inline Node assertion cases passed | Only the implementation changed; no `.grimoire/` or other added files; fixture tests 3/3 passed |
| Paraphrase — `6fa21690-a495-4faa-bcef-73f5b4b0e47c` | Same lightweight route; 8 inline cases passed | Same bounded diff and absence of artifacts; fixture tests 3/3 passed |
| Inferred route — `34dcfc7f-0bfd-486f-9853-aaa403525879` | Same lightweight route without an explicit small-task cue; `node --test normalize-label.test.mjs`, 3/3 passed | Same bounded diff and absence of artifacts; independent rerun 3/3 passed |
| Explicit plan — `a6f0ecf2-8985-4a6b-b865-64d977392f73` | Saved plan; waiting for user; no behavioral verification | Only `.grimoire/plans/0001-normalize-label.md` added; production/tests byte-identical to baseline; plan preserves all criteria and the approval checkpoint |

The initial inferred-route attempt (`2fadb4f7-8adc-4eef-bfb7-14e8242584b5`) ended in a connection error before changing project files. It is **blocked**, not a behavior failure or pass; the retry used a fresh context and the verified unchanged baseline.

Evaluator verification: recursive file manifests excluding `.git`, SHA-256 comparison of all project files, explicit absence check for `.grimoire/` in each lightweight case, plan content review, `git diff --check`, and independent `node --test normalize-label.test.mjs` in each repaired project. The preserved baseline fails all three tests as intended. All repairs are `return text.trim().toLowerCase();`; no test file changed.

SHA-256 provenance:

| File / state | SHA-256 |
| --- | --- |
| Evaluated loop skill | `7636404db53a3401a169b871ce6c9b0f6b40ec46864246abacab5677d3a789ba` |
| Implement skill | `9a48c36bdf69f9b4878e5cc0f7fde3fa2ecc2be3f23cff606e7ea1e157f38e9c` |
| Baseline source | `42b19f7e78292c30f5f28eba2257b998063e3af79536f42c9684bb1e94eaf292` |
| Fixture tests | `b70fcc5f3212798a9dbd52e540a2e1da76ae228e4cbb9d64c0dd3f38b246a5bb` |
| All three repaired sources | `88bdc6bb9f1037940d611821bcfd4318f5ff1da22d55dc37056671b011cd4dde` |
| Saved control plan | `982ecabe85d9aafe14fe4d3298926b7bbd9dbe0998c9ec9c291f9124d3430cef` |

**Observed outcome: pass for all four completed cases; trace-dependent criteria remain unverified.** Full child tool traces were not exposed (`PI_SESSION_FILE` was unset). Skill-loading order, no plan invocation, and child check execution are therefore agent-reported, not independently traced. Final manifests establish no leftover artifacts, not absence of transient writes. The original setup's phrase “do not read repository tests” was interpreted by the first three agents to exclude fixture tests too; the inferred-route retry clarified that local tests were allowed. Do not extrapolate these bounded results to general routing reliability, recovery workflows, refine batching, or tidy deletion safety.

## Selection and boundary reasoning — runtime-unverified

Descriptions should select refine for a requested coordinated requirements discussion, loop for requested implementation/QA coordination, spec for a requirements-spec request, slice for execution/handoff tickets, and tidy for explicit document cleanup. Plain implementation does not automatically invoke loop; code cleanup does not select tidy. Invocation restrictions still apply.

Explicit conversation-only planning must not create files. Staged work requiring recovery should retain useful planning. Disabled test execution must remain disabled even on the lightweight route. Refine batching and spec/ticket retirement cases are listed in [skill-invocation-scenarios.md](./skill-invocation-scenarios.md); those are not claimed as executed by this loop Eval.
