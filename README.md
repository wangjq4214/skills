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
- **Composable pipeline** — Skills chain together into workflows: clarify → record → refine → spec → slice → plan → implement → check → review → test → loop → commit. Each skill hands off to the next.

The goal: **predictable execution** — the same inputs produce the same quality, every time.

---

## ✨ Features

| Feature                      | What it means                                                                  | Why it matters                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| 🎯 **Two invocation modes**   | User-invoked vs model-invoked — the skill declares who triggers it             | No guessing. The agent never misfires a workflow; you never forget a skill exists.          |
| 🚦 **Observable completion**  | Every workflow step has a checkable condition                                  | You know when it's done. No ambiguous hand-offs, no "I think it's finished."                |
| 📐 **Surgical scope**         | Every skill defines what it does *and* what it explicitly excludes             | No scope creep. A spec skill writes specs, not code. A plan skill plans, doesn't implement. |
| 🗺️ **Progressive disclosure** | Core workflow in `SKILL.md`, deep knowledge in `references/`                   | Low context load at startup. Details loaded on demand, when the agent needs them.           |
| 🌲 **Design tree**            | Round-based Q&A that resolves every assumption before writing code             | Catch misunderstandings early. No "I thought you meant X" after implementation.             |
| 🔄 **QA loop**                | `grimoire-loop` automates implement → check → review → test → fix              | One command runs the full quality gate. Fix until clean, then format.                       |
| ✂️ **Vertical-slice slicing** | Tickets cut through every architectural layer, each independently demonstrable | No half-implemented features. Every ticket delivers end-to-end value.                       |
| 🔨 **Skill Forge**            | Meta-skill to create, review, and refactor new skills                          | Self-documenting. The skill system builds itself.                                           |
| 📂 **Auto bootstrap**         | One command scaffolds `.grimoire/` knowledge directory                         | Zero friction setup. No reading docs to get started.                                        |
| 🏷️ **Changeset ready**        | Versioned with `@changesets/cli`, semver for skills                            | Track changes, roll back confidently, publish updates.                                      |

---

## 🚀 Quick Start

```bash
pnpx skills@latest add wangjq4214/skills
```

> 💡 One command, zero config. Each skill includes a frontmatter block with `name` and `description` fields recognized by Pi.

### How to use

Skills you explicitly request are listed below. Model-invoked skills run automatically — no action needed.

**👤 User-invoked skills** — You explicitly tell the agent what to do. Just ask naturally:

```
# Initialize project knowledge
Run grimoire-init to set up .grimoire

# Write a spec
Use grimoire-spec to write a spec for the user auth feature

# Generate a plan
Create a plan with grimoire-plan for implementing the todo list

# Slice into tickets
Slice the spec with grimoire-slice

# Run QA loop
Run grimoire-loop to verify the implementation

# Commit
Stage my changes and run commit
```

**Model-invoked skills** run automatically when the agent detects they're needed — you don't need to invoke them.

### Typical workflow

After discussing your requirements, `grimoire-refine` will recommend either the **complete workflow** or the **simple workflow** depending on scope.

**Complete workflow** (for complex features):

```
grimoire-init  →  refine  →  spec  →  slice  →  plan  →  loop  →  commit
```

1. **Bootstrap** with `grimoire-init`
2. **Refine** project knowledge — model-invoked skills **clarify** and **record** run automatically during discussion
3. Write a **spec** with `grimoire-spec`
4. **Slice** the spec into vertical-slice tickets with `grimoire-slice`
5. **Generate a plan** for each ticket with `grimoire-plan`
6. Run the QA **loop** (`grimoire-loop`) — internally triggers **implement → check → review → test → fix** until clean, all model-invoked
7. **Commit** the result with `commit`

**Simple workflow** (for straightforward tasks):

```
grimoire-init  →  refine  →  plan  →  loop  →  commit
```

1. **Bootstrap** with `grimoire-init`
2. **Refine** project knowledge — **clarify** and **record** run automatically
3. **Generate a plan** directly with `grimoire-plan`
4. Run the QA **loop** with `grimoire-loop`
5. **Commit** the result

---

## 🗂️ Skills

Grimoire Skills are divided into two invocation modes:

- 👤 **User-invoked** — You explicitly request these skills. Ideal for design-time workflows that require conscious intent.
- 🤖 **Model-invoked** — The agent automatically detects when to use these skills. No explicit user command needed.

---

### 👤 User-invoked

These skills must be explicitly requested by the user. They have `disable-model-invocation: true`.

| Skill                                                      | Description                                                                                          |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 🔨 **[skill-forge](./skills/skill-forge/SKILL.md)**         | Create, review, and refactor agent skills for predictable execution                                  |
| 📦 **[grimoire-init](./skills/grimoire-init/SKILL.md)**     | Bootstrap `.grimoire` project knowledge directory and register with agent configs                    |
| 🗣️ **[grimoire-refine](./skills/grimoire-refine/SKILL.md)** | Discuss with the user to update project knowledge and refine requirements                            |
| 📝 **[grimoire-spec](./skills/grimoire-spec/SKILL.md)**     | Synthesize context, repo structure, domain knowledge & ADRs into structured spec documents           |
| ✂️ **[grimoire-slice](./skills/grimoire-slice/SKILL.md)**   | Decompose a spec into vertical-slice tickets — each independently demonstrable, context-window sized |
| 🗺️ **[grimoire-plan](./skills/grimoire-plan/SKILL.md)**     | Generate a code-level implementation plan from a ticket, spec, or conversation                       |
| 🔄 **[grimoire-loop](./skills/grimoire-loop/SKILL.md)**     | Orchestrate implement → check + review + test → fix loop until clean, then format                    |
| ✍️ **[commit](./skills/commit/SKILL.md)**                   | Write Conventional Commits messages with gitmoji and execute the commit                              |

---

### 🤖 Model-invoked

These skills are automatically discovered and triggered by the agent based on context.

| Skill                                                            | Description                                                                                  |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 🔍 **[grimoire-clarify](./skills/grimoire-clarify/SKILL.md)**     | Round-based Q&A that builds a design tree — every implicit assumption resolved before action |
| 🧠 **[grimoire-record](./skills/grimoire-record/SKILL.md)**       | Watch conversations and record domain terminology, ADRs into `.grimoire` knowledge store     |
| ⚙️ **[grimoire-implement](./skills/grimoire-implement/SKILL.md)** | Implement production code from a plan — lifecycle boundaries, composition, surgical changes  |
| ✅ **[grimoire-check](./skills/grimoire-check/SKILL.md)**         | Audit code against plan — identify every match, gap, deviation, and extra                    |
| 📋 **[grimoire-review](./skills/grimoire-review/SKILL.md)**       | Systematic code review — correctness & maintainability, blocking vs suggestions              |
| 🧪 **[grimoire-test](./skills/grimoire-test/SKILL.md)**           | Write unit tests that verify module behavior through isolated, well-structured test cases    |

---

## 🎨 Design Philosophy

| Principle                    | Meaning                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| 🥇 **One source of truth**    | Every rule defined once, referenced everywhere. No duplication, no drift.             |
| 🚦 **Observable completion**  | Every step ends with a condition the agent can check. Not "done when it feels right." |
| 📐 **Clear boundaries**       | Scope is always one sentence. If it can't fit in one sentence, split it.              |
| 🧹 **Ruthless pruning**       | If it doesn't shape execution, it doesn't stay. Documentation is not a feature.       |
| 🗺️ **Progressive disclosure** | Essentials inline, deep dives in `references/`. Loaded on demand, not by default.     |
| 🎮 **Invocation ownership**   | The skill declares who invokes it — the model or the user. Neither side guesses.      |

---

## 📜 License

MIT © 2025 — See [LICENSE](./LICENSE) for full terms.

---

<div align="center">

Made with 🧠 + ❤️ for the Pi Coding Agent

🌟 **[Star this repo](https://github.com/your-org/grimoire-skills)** to show some love!

</div>
