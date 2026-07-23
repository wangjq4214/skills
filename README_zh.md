# 🔮 Grimoire Skills

<div align="center">

> *"可预测的执行，一个 skill 一个脚印。"* ✨

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

</div>

---

## 📦 这是什么？

**Grimoire Skills** 是一套专为 **Pi Coding Agent** 🧠 精心打造的技能合集。  
每个技能都是一本独立的操作手册 📖，引导 Agent 完成特定工作流——不靠猜测、没有歧义，只有可预测的执行。🎯

可以把它理解为**你的 AI 结对编程伴侣的操作指南** 🤖。每一步都有完成标准，每条规则都有负责人，不留任何不确定性。🔒

---

## ✨ 特性

- 🎯 **可预测执行** — 每一步都有可观测的完成标准，绝不「随便试试」
- 🏗️ **渐进式披露** — 核心工作流在主文件中，深度知识在引用文档里，简洁清爽
- 🔧 **Skill Forge（技能熔炉）** — 一个帮你*构建*技能的元技能。技能之上，还是技能！🐢
- 🌲 **设计树** — 在写代码之前，通过逐轮问答理清所有设计决策，解决所有隐含假设
- 📂 **自动引导** — 一条命令即可为你的项目搭建知识目录结构
- 🔄 **变更管理** — 使用 `@changesets/cli` 进行版本管理，技能也有语义化版本！

---

## 🗂️ 技能列表

| 技能                                                          | 描述                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------- |
| 🔨 **[skill-forge](./skills/skill-forge/SKILL.md)**           | 创建、审查和重构 Agent 技能，实现可预测执行            |
| 📦 **[grimoire-init](./skills/grimoire-init/SKILL.md)**       | 初始化 `.grimoire` 目录并注册到 Agent 配置中           |
| 🔍 **[grimoire-clarify](./skills/grimoire-clarify/SKILL.md)** | 基于轮次的问答，构建设计树——在行动前解决所有假设         |
| 🧠 **[grimoire-record](./skills/grimoire-record/SKILL.md)**   | 从对话中记录领域术语与架构决策                         |
| 🗣️ **[grimoire-refine](./skills/grimoire-refine/SKILL.md)**   | 与用户讨论，更新项目知识并细化需求                     |
| 📝 **[grimoire-spec](./skills/grimoire-spec/SKILL.md)**       | 将上下文、仓库结构、领域知识和 ADR 综合为结构化规格说明  |
| 🗺️ **[grimoire-plan](./skills/grimoire-plan/SKILL.md)**       | 从工单、规格说明或对话生成代码级实现计划                |
| ✂️ **[grimoire-slice](./skills/grimoire-slice/SKILL.md)**     | 将规格说明分解为垂直切片工单——每张都可独立演示            |

---

## 🚀 快速开始

```bash
pnpx skills@latest add wangjq4214/skills
```

> 💡 一条命令，零配置。每个技能的 frontmatter 块中包含 `name` 和 `description` 字段，Pi 会自动识别。

---

## 🏗️ 项目结构

```
.
├── skills/
│   ├── skill-forge/              🔨 元技能：打造更好的技能
│   │   ├── SKILL.md              📋 核心工作流
│   │   └── references/           📚 深度参考（层级、裁剪、失败模式等）
│   ├── grimoire-init/            📦 项目知识初始化器
│   │   ├── SKILL.md              📋 核心工作流
│   │   └── references/           📚 目录结构与注入目标
│   ├── grimoire-clarify/         🔍 设计树澄清器
│   │   └── SKILL.md              📋 核心工作流
│   ├── grimoire-record/          🧠 领域知识与 ADR 记录器
│   │   ├── SKILL.md              📋 核心工作流
│   │   └── references/           📚 ADR 与上下文模板
│   ├── grimoire-refine/          🗣️ 项目知识讨论器
│   │   └── SKILL.md              📋 核心工作流
│   ├── grimoire-spec/            📝 规格编写器
│   │   ├── SKILL.md              📋 核心工作流
│   │   └── references/           📚 规格模板与最小接缝
│   ├── grimoire-plan/            🗺️ 实现规划器
│   │   ├── SKILL.md              📋 核心工作流
│   │   └── references/           📚 计划模板、图解与边界情况指南
│   └── grimoire-slice/           ✂️ 工单切片器
│       ├── SKILL.md              📋 核心工作流
│       └── references/           📚 切片规则、垂直切片与预重构指南
├── .changeset/                   🏷️ 版本变更记录
├── skills.sh.json                🔗 skills.sh 分组清单
├── package.json                  ⚙️ pnpm 工作区配置
└── README.md                     📖 你在这里！
```

---

## 🎨 设计理念

<div align="center">

| 原则                      | 含义                                       |
| ------------------------- | ------------------------------------------ |
| 🥇 **唯一事实来源**       | 每条规则只定义一次，到处引用                 |
| 🚦 **可观测的完成标准**   | 每一步以可检查的条件结束                    |
| 📐 **清晰的边界**         | 范围永远用一句话说清楚，杜绝漫延              |
| 🧹 **无情裁剪**           | 不影响执行决策的内容，一律不留                |
| 🗺️ **渐进式披露**         | 核心内容直接呈现，深度知识放在 `references/` |

</div>

---

## 📜 许可证

MIT © 2025 — 详见 [LICENSE](./LICENSE)。

---

<div align="center">

用 🧠 + ❤️ 为 Pi Coding Agent 打造

🌟 **[给这个仓库点个 Star](https://github.com/your-org/grimoire-skills)** 来表示支持吧！

</div>
