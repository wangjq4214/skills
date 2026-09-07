# 🔮 Grimoire Skills

<div align="center">

> *"Predictable execution, one skill at a time."* ✨

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

</div>

---

## 📦 What is this?

**Grimoire Skills** is a discipline system for AI coding agents — not just prompts, but structured playbooks with completion criteria, scope boundaries, and invocation rules.

Most agent skill collections are flat prompt libraries: "Here's a prompt for X, here's one for Y." They rely on the model to guess when and how to apply them. Grimoire Skills are different:

- **Two invocation modes** — Some skills activate automatically (model-invoked), others wait for your explicit request (user-invoked). The agent doesn't guess; it follows the mode.
- **Surgical scope** — Every skill explicitly defines what it does *and* what it doesn't do. No scope creep.
- **Observable completion** — Every step ends with a checkable condition. You know when it's done.
- **Progressive disclosure** — The core workflow fits in one file. Deep knowledge lives in `references/`, loaded only when needed.
- **Risk-scaled composition** — Skills work independently or compose according to task size; the pipeline is a toolbox, not a mandatory ceremony.

> The goal is balanced predictability: equivalent constraints should produce equivalent quality without charging simple tasks the cost of a complex workflow.

---

## ✨ Features

| Feature                      | What it means                                                                 | Why it matters                                         |
| ---------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| 🎯 **Two invocation modes**   | Users can invoke explicitly; models select skills by risk                     | Avoids accidental full-workflow activation             |
| 🚦 **Verifiable outcomes**    | Important results have checkable evidence                                     | Prevents premature completion without mechanical steps |
| 📐 **Elastic boundaries**     | Skills have a primary responsibility but may perform authorized adjacent work | Reduces unnecessary hand-offs                          |
| 🗺️ **On-demand context**      | Load only context and references needed for the current decision              | Preserves context capacity                             |
| 🌲 **Targeted clarification** | Ask only blocking questions that materially change direction                  | Maintains execution momentum                           |
| 🔄 **Adaptive QA**            | Verify small changes directly; use full parallel QA for high-risk work        | Spends effort where risk exists                        |
| ✂️ **Flexible slicing**       | Prefer value slices while supporting migration, enabling, and component work  | Avoids artificial layers and dependencies              |
| 🔨 **Skill Forge**            | Create, review, and prune skills                                              | Improves instruction signal density                    |
| 📂 **Auto bootstrap**         | Create the `.grimoire/` knowledge directory when useful                       | Keeps project knowledge optional                       |
| 🏷️ **Changeset ready**        | Version skills with changesets                                                | Supports audit and rollback                            |

---

## 🚀 Quick Start

```bash
pnpx skills@latest add wangjq4214/skills
```

> 💡 Every skill can be used independently. You do not need to complete the whole Grimoire pipeline first.

### How to use

Describe the outcome directly; invoke a specific skill when you need its artifact or workflow:

```bash
# Small change: implement directly and run relevant tests
Fix duplicate submission on the login button and verify it

# High-risk feature: design first, then run full QA
Use grimoire-spec to design the account migration

# Verification only
Run grimoire-loop and scale checks to risk
```

### Adaptive workflows

Choose the smallest sufficient path:

```text
Default delivery route   refine → spec → slice → plan → loop
Inside loop              implement → test → review + check → assess ↺
Small and reversible     implement → targeted verification
Existing spec/tickets    enter at the next useful stage
```

These are defaults, not mandatory stages. [Refine](./skills/grimoire-refine/SKILL.md) owns delivery routing; [loop](./skills/grimoire-loop/SKILL.md) owns the implementation/QA cycle. At each selected stage, load and apply the responsible skill rather than replacing it with generic instructions. Inline execution and combined passes are valid; separate agents and reports are optional.

`clarify` resolves material ambiguity; `record` captures durable knowledge; `spec` owns requirement contracts; `slice` owns tickets, not a second spec-writing method. Clear requirements can go directly to slice, and adequate existing artifacts should be reused. Loop uses implement for production changes, test for test work, review for code risks, and check for intent alignment.

Adapt depth, order, and artifacts to evidence and risk, briefly explaining material departures. Preserve requested deliverables and essential verification. A user-selected workflow may compose downstream skills only within authorized scope and host invocation rules; discussion does not authorize implementation.

---

## 🗂️ Skills

Grimoire Skills are divided into two invocation modes:

- 👤 **User-invoked** — You explicitly request these skills. Ideal for design-time workflows that require conscious intent.
- 🤖 **Model-invoked** — The agent automatically detects when to use these skills. No explicit user command needed.

---

### 👤 User-invoked

These skills require explicit user selection. They have `disable-model-invocation: true`.

| Skill                                                      | Description                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| 🔨 **[skill-forge](./skills/skill-forge/SKILL.md)**         | Create, review, and prune agent skills                                  |
| 📦 **[grimoire-init](./skills/grimoire-init/SKILL.md)**     | Bootstrap optional `.grimoire` project knowledge                        |
| 🗣️ **[grimoire-refine](./skills/grimoire-refine/SKILL.md)** | Resolve material uncertainty and recommend the smallest useful workflow |
| 📝 **[grimoire-spec](./skills/grimoire-spec/SKILL.md)**     | Produce proportionate specs from requirements and relevant context      |
| ✂️ **[grimoire-slice](./skills/grimoire-slice/SKILL.md)**   | Decompose requirements into coherent value or enabling tickets          |
| 🗺️ **[grimoire-plan](./skills/grimoire-plan/SKILL.md)**     | Produce a risk-scaled, revisable implementation plan                    |
| 🔄 **[grimoire-loop](./skills/grimoire-loop/SKILL.md)**     | Run adaptive implementation and QA based on change risk                 |
| ✍️ **[commit](./skills/commit/SKILL.md)**                   | Prepare and execute an approved Conventional Commit                     |

---

### 🤖 Model-invoked

These skills are available when their behavior fits the current task; they should not force the rest of the pipeline.

| Skill                                                            | Description                                                           |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| 🔍 **[grimoire-clarify](./skills/grimoire-clarify/SKILL.md)**     | Resolve only material blocking ambiguity                              |
| 🧠 **[grimoire-record](./skills/grimoire-record/SKILL.md)**       | Maintain durable project terminology and decisions                    |
| ⚙️ **[grimoire-implement](./skills/grimoire-implement/SKILL.md)** | Implement from a clear plan, ticket, spec, or conversation            |
| ✅ **[grimoire-check](./skills/grimoire-check/SKILL.md)**         | Audit behavior against intent, criteria, artifacts, and evidence      |
| 📋 **[grimoire-review](./skills/grimoire-review/SKILL.md)**       | Review with evidence-backed severity and confidence                   |
| 🧪 **[grimoire-test](./skills/grimoire-test/SKILL.md)**           | Write proportionate tests using appropriate structures and boundaries |

---

## 🎨 Design Philosophy

| Principle                    | Meaning                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| 🥇 **One source of truth**    | Every rule defined once, referenced everywhere. No duplication, no drift.                                 |
| 🚦 **Observable completion**  | Every step ends with a condition the agent can check. Not "done when it feels right."                     |
| 📐 **Coherent boundaries**    | Keep work together when it shares intent, risk, and verification; split when separation reduces coupling. |
| 🧹 **Ruthless pruning**       | If it doesn't shape execution, it doesn't stay. Documentation is not a feature.                           |
| 🗺️ **Progressive disclosure** | Essentials inline, deep dives in `references/`. Loaded on demand, not by default.                         |
| 🎮 **Invocation ownership**   | The skill declares who invokes it — the model or the user. Neither side guesses.                          |

---

## 📜 License

MIT © 2025 — See [LICENSE](./LICENSE) for full terms.

---

<div align="center">

Made with 🧠 + ❤️ for the Pi Coding Agent

🌟 **[Star this repo](https://github.com/your-org/grimoire-skills)** to show some love!

</div>
