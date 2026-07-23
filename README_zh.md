# 🔮 Grimoire Skills

<div align="center">

> *"一次只处理一个技能，让执行结果更可预测。"* ✨

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

</div>

---

## 📦 这是什么？

**Grimoire Skills** 是一套面向 AI 编程 Agent 的工作规范。它不只是提示词集合，而是一组带有完成条件、职责边界和调用规则的结构化操作指南。

很多 Agent 技能库只是把提示词按主题放在一起：这里有一个处理 X 的提示词，那里有一个处理 Y 的提示词；至于何时使用，交给模型自行判断。Grimoire Skills 则把这些规则提前说明：

- **调用方式明确** — 技能要么由模型自动调用，要么必须由用户明确请求。无需猜测由谁触发。
- **职责范围清楚** — 每个技能都会说明自己负责什么，以及明确不负责什么，避免任务不断扩张。
- **完成状态可验证** — 每一步都有可检查的完成条件，不再以“看起来完成了”为准。
- **按需加载内容** — 核心流程放在一个文件中，详细资料放在 `references/`，需要时再读取。
- **可以组合使用** — clarify → record → refine → spec → slice → plan → implement → check → review → test → loop → commit。每个环节的输出可以继续交给后续环节使用。

目标很简单：让相同的输入，尽量得到稳定一致的结果。

---

## ✨ 特性

| 特性                   | 说明                                                     | 作用                                                 |
| ---------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| 🎯 **两种调用方式**     | 技能会声明是由用户调用，还是由模型自动调用               | 减少误触发，也不会遗漏该用的流程                     |
| 🚦 **可验证的完成条件** | 工作流中的每一步都有对应的检查条件                       | 完成与否有据可查，交接也更明确                       |
| 📐 **明确的职责边界**   | 每个技能都会定义包含范围与排除范围                       | 写规格的技能只写规格，不会越过边界去改代码           |
| 🗺️ **渐进式展开**       | 核心内容在 `SKILL.md`，详细资料在 `references/`          | 初始上下文更轻，需要细节时再加载                     |
| 🌲 **设计树**           | 通过多轮问答，在编码前逐项澄清隐含假设                   | 尽早发现理解偏差，减少返工                           |
| 🔄 **质量循环**         | `grimoire-loop` 自动执行实现 → 检查 → 审查 → 测试 → 修复 | 一条命令跑完整个质量流程，直到问题清理完毕后再格式化 |
| ✂️ **垂直切片**         | 每张工单都会覆盖必要的架构层，并可单独演示               | 交付的是端到端的价值，而不是半成品                   |
| 🔨 **Skill Forge**      | 用于创建、审查和重构其他技能的元技能                     | 技能体系本身也可以持续维护和改进                     |
| 📂 **自动初始化**       | 一条命令创建 `.grimoire/` 项目知识目录                   | 不需要额外配置，开箱即可使用                         |
| 🏷️ **版本管理就绪**     | 使用 `@changesets/cli` 为技能做语义化版本管理            | 可以记录变更、安心回退并发布更新                     |

---

## 🚀 快速开始

```bash
pnpx skills@latest add wangjq4214/skills
```

> 💡 无需额外配置。每个技能的 frontmatter 都包含 Pi 可识别的 `name` 和 `description` 字段。

### 怎么用

需要用户主动调用的技能列在下面。由模型调用的技能会在 Agent 判断有必要时自动运行。

**👤 用户调用的技能** — 直接告诉 Agent 你要做什么即可：

```
# 初始化项目知识
运行 grimoire-init，创建 .grimoire

# 编写规格
用 grimoire-spec 为用户登录功能编写规格说明

# 生成计划
用 grimoire-plan 为待办事项功能生成实现计划

# 拆分工单
用 grimoire-slice 将规格拆分为工单

# 运行质量循环
运行 grimoire-loop，验证当前实现

# 提交
暂存我的改动并运行 commit
```

**🤖 模型调用的技能** — Agent 会根据上下文自动调用，不需要额外指令。

### 常见工作流

讨论需求后，`grimoire-refine` 会根据任务范围建议使用**完整流程**或**简化流程**。

**完整流程**（适合复杂功能）：

```
grimoire-init  →  refine  →  spec  →  slice  →  plan  →  loop  →  commit
```

1. 使用 `grimoire-init` 初始化项目知识目录
2. 使用 `grimoire-refine` 梳理项目知识和需求；讨论过程中，**clarify** 与 **record** 会自动运行
3. 使用 `grimoire-spec` 编写规格说明
4. 使用 `grimoire-slice` 将规格拆分为垂直切片工单
5. 使用 `grimoire-plan` 为每张工单生成实现计划
6. 运行 `grimoire-loop`；它会自动执行 **实现 → 检查 → 审查 → 测试 → 修复**，直到通过所有检查
7. 使用 `commit` 提交结果

**简化流程**（适合直接、范围较小的任务）：

```
grimoire-init  →  refine  →  plan  →  loop  →  commit
```

1. 使用 `grimoire-init` 初始化项目知识目录
2. 使用 `grimoire-refine` 梳理项目知识和需求；**clarify** 与 **record** 会自动运行
3. 直接使用 `grimoire-plan` 生成实现计划
4. 使用 `grimoire-loop` 运行质量循环
5. 使用 `commit` 提交结果

---

## 🗂️ 技能列表

Grimoire Skills 分为两种调用方式：

- 👤 **用户调用** — 只有在用户明确提出请求后才执行，适合需要确认意图的设计阶段工作。
- 🤖 **模型调用** — Agent 会根据上下文判断是否需要使用，无需用户手动触发。

---

### 👤 用户调用

这类技能都设置了 `disable-model-invocation: true`，必须由用户明确请求。

| 技能                                                       | 描述                                                                       |
| ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| 🔨 **[skill-forge](./skills/skill-forge/SKILL.md)**         | 创建、审查和重构 Agent 技能，让执行过程更稳定                              |
| 📦 **[grimoire-init](./skills/grimoire-init/SKILL.md)**     | 初始化 `.grimoire` 项目知识目录，并注册到 Agent 配置中                     |
| 🗣️ **[grimoire-refine](./skills/grimoire-refine/SKILL.md)** | 与用户讨论，更新项目知识并细化需求                                         |
| 📝 **[grimoire-spec](./skills/grimoire-spec/SKILL.md)**     | 综合上下文、仓库结构、领域知识和 ADR，生成结构化规格文档                   |
| ✂️ **[grimoire-slice](./skills/grimoire-slice/SKILL.md)**   | 将规格拆分为垂直切片工单；每张工单都可独立演示，规模适合一个上下文窗口处理 |
| 🗺️ **[grimoire-plan](./skills/grimoire-plan/SKILL.md)**     | 根据工单、规格或对话生成代码级实现计划                                     |
| 🔄 **[grimoire-loop](./skills/grimoire-loop/SKILL.md)**     | 编排实现 → 检查 → 审查 → 测试 → 修复，全部通过后再格式化                   |
| ✍️ **[commit](./skills/commit/SKILL.md)**                   | 按 Conventional Commits 格式编写含 gitmoji 的提交信息并执行提交            |

---

### 🤖 模型调用

Agent 会根据上下文自动发现并调用这些技能。

| 技能                                                             | 描述                                                     |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| 🔍 **[grimoire-clarify](./skills/grimoire-clarify/SKILL.md)**     | 通过多轮问答构建设计树，在行动前澄清所有隐含假设         |
| 🧠 **[grimoire-record](./skills/grimoire-record/SKILL.md)**       | 从对话中记录领域术语和架构决策到 `.grimoire` 知识库      |
| ⚙️ **[grimoire-implement](./skills/grimoire-implement/SKILL.md)** | 按计划实现生产代码，关注生命周期边界、组合与精确改动     |
| ✅ **[grimoire-check](./skills/grimoire-check/SKILL.md)**         | 对照计划审计代码，找出符合项、缺口、偏差和多余内容       |
| 📋 **[grimoire-review](./skills/grimoire-review/SKILL.md)**       | 系统审查代码的正确性与可维护性，并区分阻塞问题和改进建议 |
| 🧪 **[grimoire-test](./skills/grimoire-test/SKILL.md)**           | 编写隔离、结构清晰的单元测试，验证模块行为               |

---

## 🎨 设计理念

| 原则                   | 含义                                                           |
| ---------------------- | -------------------------------------------------------------- |
| 🥇 **单一事实来源**     | 每条规则只定义一次，在其他地方引用，避免重复与漂移。           |
| 🚦 **可验证的完成状态** | 每一步都以 Agent 能检查的条件结束，而不是凭感觉判断。          |
| 📐 **清晰的边界**       | 每项工作的范围应当能用一句话说明；说明不清时，就该拆分。       |
| 🧹 **及时删减**         | 不影响执行的内容不保留。文档本身不是目标。                     |
| 🗺️ **渐进式展开**       | 必要内容直接写在流程中，深入资料放在 `references/`，按需读取。 |
| 🎮 **明确调用责任**     | 技能自行声明由模型还是用户调用，双方都不需要猜测。             |

---

## 📜 许可证

MIT © 2025 — 详见 [LICENSE](./LICENSE)。

---

<div align="center">

为 Pi Coding Agent 制作 🧠 + ❤️

🌟 **[给这个仓库点个 Star](https://github.com/your-org/grimoire-skills)**

</div>
