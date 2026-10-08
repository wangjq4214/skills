# Debug acceptance

The `.test.mjs` checks protect metadata, discoverability, instruction guardrails, and the intentionally buggy fixture. They do not establish agent compliance.

## Blind execution protocol

Copy only `fixtures/debug-quote/quote.mjs` into a fresh disposable directory. Give a fresh agent the skill and the prompt below, not this document or `debug-skill.test.mjs`. The agent may inspect and modify the disposable project and read the relevant companion skills. Keep the repository fixture unchanged. Capture tool execution, not just the agent's final summary.

> Diagnose and fix this bug: after displaying a notebook quote, changing quantity to 2 and currency to EUR still produces the wrong quote. Expected EUR unitPrice 900, quantity 2, total 1800 (integer minor units). Initial USD notebook quote should remain unitPrice/total 1000. The API is in quote.mjs. Apply grimoire-debug. Return the diagnosis, changes, evidence with exact commands/results, and limitations.

Evaluator-only oracle: the cache is keyed only by SKU although the cached unit price and currency depend on the selected currency. A fresh EUR quote works; a USD-warmed quote stays USD. Quantity multiplication itself works. Clearing the cache on currency changes or including currency in its identity are acceptable repairs.

Pass requires all three, not merely a working patch:

- **Accurate cause:** explains the missing currency dependency and why prior quote history matters.
- **Discriminating evidence:** runs controls that distinguish currency conversion, quantity handling, and history-dependent reuse; records observations rather than inferring everything from source.
- **Original symptom:** captures the failing display → quantity/currency change → quote sequence before repair, then reruns that sequence after repair and compares the returned currency and amounts. Compilation or unrelated green tests are insufficient.

## Boundary scenarios — runtime-unverified

These are scenario checks against the instructions, not executed acceptance runs:

| Case | Expected behavior |
| --- | --- |
| Obvious local defect | Direct: inspect causal path, authorized repair, original-symptom check; no compulsory hypothesis list or TDD cycle. |
| Cause remains unclear | Investigate: repeatable feedback loop, symptom-preserving reduction, predicted outcomes that distinguish hypotheses. |
| Race or intermittent slowdown | Deep: appropriate scheduling/tracing/profiling/differential evidence, comparable workload and repeated observations; no claim of resolution from one clean run. |
| Only an error message, no runtime access | Provisional explanation and next discriminating check; no fabricated reproduction or confirmed cause. |
| Diagnosis-only or read-only request | Explain supported cause without unauthorized repair, instrumentation writes, or saved scripts. |
| Original environment unavailable after repair | Reduced/local evidence may pass, but original symptom remains explicitly unverified. |
| Caller excludes execution | Do not restore execution through implement/test/check; report the evidence gap. |

The blind run below exercises a deterministic diagnosis-and-repair task with an explicitly loaded skill. It does not test automatic host discovery, general reliability, concurrency, performance, or strict permission enforcement.

## Executed blind run

- Agent: `openai/gpt-6-astra`, medium reasoning, fresh delegated context; task `cbc2dc26-ff15-439b-8cdc-48f88253adc7`. Only the symptom/expected values, disposable project, and skill paths were supplied; the oracle was withheld.
- Environment: Windows, Node `v24.21.0`; base repository revision `dc7bdf9b0a1eb50970cf634ef21384e3a3decf05` plus this change. Disposable cwd: `C:/Users/DEREKW~1/AppData/Local/Temp/tmp.d3WhwLQ3Hy` (temporary, not a durable dependency).
- Skill SHA-256: `79f6f9ac747e7923e07db8400fb4afd7b3aa5b7b15c3e104a37663721b1a5129`.
- Seed fixture SHA-256: `dabcb317f8ad66ad9d9564c33af0f570e019bb27e4b99f992910ca2631f29587`.
- Agent repair: add `cache.clear()` after the accepted currency assignment. Fixed source SHA-256: `1bfcc58fbfcab3e9579691006518ab6baa65440c97b837af707fbfcae8cc9fd8`.

**Result: pass for this bounded case.** The agent correctly explained the missing cache dependency and returned baseline/control observations plus an original-sequence rerun. It reported `node --test --test-reporter=tap quote.regression.test.mjs`: before repair, 1 pass / 2 failures; after repair, 3 passes. The agent chose to add regression tests; this run does not demonstrate a no-TDD path.

The evaluator independently inspected the modified source and tests, reran the three tests (3/3 passed), and executed the same public-API probes against both the preserved baseline and the agent's repaired module:

| Probe | Baseline | Repaired |
| --- | --- | --- |
| Initial notebook | USD, unit 1000, quantity 1, total 1000 | unchanged |
| Change quantity only | USD, unit 1000, quantity 2, total 2000 | unchanged |
| Then switch to EUR (original symptom) | **USD, unit 1000, quantity 2, total 2000** | **EUR, unit 900, quantity 2, total 1800** |
| Fresh instance configured for EUR, quantity 2 | EUR, unit 900, quantity 2, total 1800 | unchanged |

Replay this probe from a disposable copy before and after a blind repair:

```sh
node --input-type=module <<'JS'
import { createShop } from './quote.mjs';
const shop = createShop();
console.log('initial', shop.quote('notebook'));
shop.setQuantity(2);
console.log('quantity-only', shop.quote('notebook'));
shop.setCurrency('EUR');
console.log('warm EUR', shop.quote('notebook'));
const fresh = createShop();
fresh.setQuantity(2);
fresh.setCurrency('EUR');
console.log('fresh EUR', fresh.quote('notebook'));
JS
```

Evidence limits: pre-repair child execution order/results are from the agent's returned report; the evaluator directly verified the preserved baseline, repaired output, and regression tests, not a retained full child tool trace. This is API-level verification, not a graphical UI test. Temporary child scripts are not shipped. The checked-in fixture deliberately remains broken for future blind runs.
