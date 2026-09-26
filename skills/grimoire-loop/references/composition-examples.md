# Composition examples

These scenarios illustrate the composition policy in [../SKILL.md](../SKILL.md). They are walkthrough cases, not additional rules or evidence of runtime compliance.

| User request | Expected execution path | Observable boundary |
| --- | --- | --- |
| “Implement this feature.” | Default plan, implementation, applicable QA, assessment/fixes, finalization, report | No routine approval gate is inserted. |
| “Skip planning; implement directly from this ticket.” | Ticket supplies implementation context; other applicable defaults remain | No plan file is created or demanded by a delegate. |
| “Plan first, but don't save a file.” | Keep the approach in conversation, then continue applicable defaults | Plan persistence is disabled independently of planning. |
| “Only review this diff; don't change anything.” | Read-only review and requested results | No plan creation, implementation, test authoring, fixes, or writing formatter. “Only” excludes other work stages. |
| “No review or intent check.” | Other applicable defaults without either assessment skill | Neither responsibility is silently assigned to another agent. |
| “Write tests, but don't run them.” | Test authoring without execution | Implementation verification and final verification do not run the excluded tests; test results remain unavailable. |
| “No tests at all.” | Other enabled work without test design, authoring, or execution | No hidden test run through specialist defaults or finalization. |
| “Pause before E2E; I'll test manually.” | Authorized preparation → waiting for user → resume on applicable feedback | No automatic E2E substitute, downstream launch, or clean result while required human evidence is pending. |
| “Run E2E automatically, then wait for my approval.” | E2E execution → present results → waiting for user | Passing automation does not release the approval checkpoint. |
| “Decide where you need my involvement based on risk; automate the rest.” | Record justified model-selected checkpoints → execute until each checkpoint → wait for feedback | Each discretionary pause has a concrete reason and stays within authorized scope. |
| “Always stop after planning; you may choose any other checkpoints.” | Mandatory post-plan pause plus justified model-selected checkpoints | Model discretion cannot remove the user's post-plan checkpoint. |
| “Run automatically; don't ask for routine approvals.” | Continue enabled stages automatically; pause only if a necessary blocker arises | No discretionary approval gates; missing authority or an unresolved unsafe decision is not bypassed. |
| “Do one pass; report issues but don't fix or loop.” | Enabled one-pass work and findings | No repair writes or repeated fix cycle. |
| “Skip final verification and formatting.” | Other enabled stages only | No integrated command or formatter is invoked under finalization. |
| “Just implement; no planning, QA, fixes, formatting, or summary.” | Source → implementation only | No automatic verification or routine report; necessary blocker/checkpoint communication remains available. No claim of verified success. |
| “Turn review back on before continuing.” | Revise the remaining contract and review the current applicable diff | The earlier exclusion does not permanently disable the stage. |
| “Stop after the plan and wait for me.” | Plan → waiting for user | No production changes until the user releases implementation. |
| “Disable every stage.” | No work stages execute | No default stage is restored merely to give the loop something to do. |

## Resume walkthrough

For a manual E2E checkpoint, hand off the build/version, environment, relevant scenarios, and feedback needed. End the turn with those stages pending. If the user reports one scenario passing and another failing, preserve the partial evidence; route the failure to fixes only when authorized. If feedback targets an older build, establish applicability before releasing the checkpoint. If the user instead explicitly cancels E2E, update the contract and retain the fact that E2E acceptance was not established.
