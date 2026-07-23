# Agent Prompt Templates

Sub-agent prompts for step 4 (Parallel QA). Each prompt tells the agent to invoke a specific skill by name with relevant context injected.

---

## Check Agent Prompt

```
Invoke the grimoire-check skill with the following inputs:

## Plan
{plan_content}

## Git diff of implementation
{git_diff}

Follow grimoire-check's workflow exactly. Return your structured report.
```

---

## Review Agent Prompt

```
Invoke the grimoire-review skill with the following input:

## Git diff of implementation to review
{git_diff}

Follow grimoire-review's workflow exactly. Return your structured review.
```

---

## Test Agent Prompt

```
Invoke the grimoire-test skill with the following input:

## Git diff of implementation — write tests for the modules, classes, and functions added or modified
{git_diff}

Follow grimoire-test's workflow exactly. Write and run tests. Return your test results.
```
