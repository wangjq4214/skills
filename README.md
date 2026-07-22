# 🔮 Grimoire Skills

<div align="center">

> *"Predictable execution, one skill at a time."* ✨

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

</div>

---

## 📦 What is this?

**Grimoire Skills** is a curated collection of agent skills purpose-built for the **Pi Coding Agent** 🧠.  
Each skill is a self-contained playbook 📖 that guides the agent through a specific workflow — no guesswork, no ambiguity, just predictable execution. 🎯

Think of it as an **instruction manual for your AI pair programmer** 🤖. Every step has a completion criteria. Every rule has an owner. Nothing is left to chance. 🔒

---

## ✨ Features

- 🎯 **Predictable Execution** — Every step has observable completion criteria. No "just wing it."
- 🏗️ **Progressive Disclosure** — Core workflow in the skill file, deep knowledge in references. Clean & crisp.
- 🔧 **Skill Forge** — A meta-skill that helps you *build* skills. Skills all the way down! 🐢
- 🌲 **Design Tree** — Interrogate decisions before writing code. Resolve every assumption first.
- 📂 **Auto Bootstrap** — One command to scaffold your project's knowledge directory.
- 🔄 **Changeset Ready** — Versioned with `@changesets/cli`. Semver for skills!

---

## 🗂️ Skills

| Skill                                                                  | Description                                                                         | Invocation |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------- |
| 🔨 **[skill-forge](./skills/skill-forge/SKILL.md)**                     | Create, review, and refactor agent skills with predictable execution paths          | User       |
| 📦 **[grimoire-bootstrapper](./skills/grimoire-bootstrapper/SKILL.md)** | Initialize `.grimoire` directories and inject them into agent configs               | User       |
| 🔍 **[grimoire-interrogator](./skills/grimoire-interrogator/SKILL.md)** | Round-based Q&A that builds a design tree — every assumption resolved before action | User       |

---

## 🚀 Quick Start

```bash
pnpx skills@latest add wangjq4214/skills
```

> 💡 One command, zero config. Each skill includes a frontmatter block with `name` and `description` fields recognized by Pi.

---

## 🏗️ Project Structure

```
.
├── skills/
│   ├── skill-forge/           🔨 Meta-skill: build better skills
│   │   ├── SKILL.md           📋 Core workflow
│   │   └── references/        📚 Deep dives (hierarchy, pruning, etc.)
│   ├── grimoire-bootstrapper/ 📦 Project knowledge bootstrapper
│   │   ├── SKILL.md           📋 Core workflow
│   │   └── references/        📚 Directory structure & injection targets
│   └── grimoire-interrogator/ 🔍 Design tree interrogator
│       └── SKILL.md           📋 Core workflow
├── .changeset/                🏷️ Version bump changesets
├── package.json               ⚙️ pnpm workspace config
└── README.md                  📖 You are here!
```

---

## 🎨 Design Philosophy

<div align="center">

| Principle                    | Meaning                                        |
| ---------------------------- | ---------------------------------------------- |
| 🥇 **One source of truth**    | Every rule defined once, referenced everywhere |
| 🚦 **Observable completion**  | Every step ends with a checkable condition     |
| 📐 **Clear boundaries**       | Scope is always one sentence. No scope creep.  |
| 🧹 **Ruthless pruning**       | If it doesn't shape execution, it doesn't stay |
| 🗺️ **Progressive disclosure** | Essentials inline, deep dives in `references/` |

</div>

---

---

## 📜 License

MIT © 2025 — See [LICENSE](./LICENSE) for full terms.

---

<div align="center">

Made with 🧠 + ❤️ for the Pi Coding Agent

🌟 **[Star this repo](https://github.com/your-org/grimoire-skills)** to show some love!

</div>
