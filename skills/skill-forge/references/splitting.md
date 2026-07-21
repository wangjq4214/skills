# Splitting Skills

Splitting exists to improve execution predictable.

Do not split skills only because they become long.
Split only when separation reduces cognitive load or improves predictability.

---

## Invocation Split

Create a separate skill when:

- it has an independent trigger
- users need to discover it separately
- another skill needs to call it
- it represents a distinct capability

Example:

Bad:

    engineering-helper
        - Rust debugging
        - Git workflows
        - API design
        - Documentation writing

Better:

    rust-debugging
    git-workflow
    api-design
    documentation-writing

when these capabilities have independent usage patterns.

---

## Sequence Split

Split a workflow when later steps interfere with current execution.

Symptoms:

- the agent jumps ahead
- current steps receive insufficient attention
- future instructions distract from present reasoning
- completion happens before verification

Example:

Large workflow:

    research → write → review → publish

Possible split:

    research-skill
    writing-skill
    review-skill
    publishing-skill

when each phase requires different behavior.

---

## Do Not Split When

Keep a skill together when:

- all parts always execute together
- splitting adds navigation cost
- the new skill has no independent purpose
- separation does not improve predictable

---

## Decision Rule

Before splitting, ask: "Does this separation make execution more predictable?"

- If no: keep the skill together.
- If yes: split.

---

## Split Quality Check

A good split has:

- a clear boundary
- an independent purpose
- a meaningful trigger or sequence boundary

A bad split only creates more files.
