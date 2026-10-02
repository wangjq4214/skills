# Refactoring and batch evidence

Read for refactoring, batch, or integrated-tree assignments; the main skill's permissions still apply.

Accept preserved contracts, owned test paths, base/current revision or fingerprints, baseline failures, and relevant map/test links. Verify source behind map claims: candidate test paths do not prove coverage or passing execution.

Before risky rewrites, characterize public outcomes and material edge cases on the baseline. Reuse those cases against the new implementation; differential/property tests can expose unintended differences. Cover routing precedence, failure/cleanup, shared-helper consumers, and state transitions by risk. Do not lock tests to obsolete private decomposition or delete useful tests for a LOC target.

Run branch-local checks during authorized iteration, then affected consumer/integration suites against the integrated tree. Prevent shared-state, port, database, and build-output collisions from invalidating parallel results.

Return covered contracts, test paths, source snapshot, commands/working directories, exit statuses/log locations, baseline versus new failures, and skipped/unavailable evidence. Branch-local success does not establish integrated acceptance.
