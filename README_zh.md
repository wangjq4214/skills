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
- **可以按风险组合** — 各技能既能独立使用，也能按任务规模组合；流程是工具箱，不是必须走完的流水线。

> 目标是在稳定性与自主判断之间取得平衡：相同约束应得到一致质量，但简单任务不承担复杂流程的成本。

---

## ✨ 特性

| 特性               | 说明                                             | 作用                           |
| ------------------ | ------------------------------------------------ | ------------------------------ |
| 🎯 **两种调用方式** | 用户可显式调用，模型也可按风险选择适用技能       | 避免误触发完整工作流           |
| 🚦 **可验证的结果** | 对关键结果定义可检查条件                         | 防止提前完成，而非制造机械步骤 |
| 📐 **弹性职责边界** | 技能有明确主责，同时允许用户授权安全的相邻工作   | 减少不必要的来回交接           |
| 🗺️ **按需加载**     | 只读取当前决策需要的上下文和 references          | 降低上下文负担                 |
| 🌲 **定点澄清**     | 只询问会显著改变方向的阻塞性问题                 | 保持执行动量                   |
| 🔄 **自适应 QA**    | 小改动直接验证，高风险改动再并行运行完整检查     | 把成本投入真正的风险           |
| ✂️ **弹性拆分**     | 优先垂直价值切片，也支持迁移、基础设施和组件切片 | 避免人为跨层和伪依赖           |
| 🔨 **Skill Forge**  | 用于创建、审查和精简技能                         | 持续提升规则信号密度           |
| 📂 **自动初始化**   | 创建 `.grimoire/` 项目知识目录                   | 按需采用项目知识库             |
| 🏷️ **版本管理就绪** | 使用 changesets 管理版本                         | 支持审计与回退                 |

---

## 🚀 快速开始

```bash
pnpx skills@latest add wangjq4214/skills
```

> 💡 每个技能都可单独使用。无需先完成整条 Grimoire 流程。

### 怎么用

直接描述目标；需要特定产物时再显式调用对应技能：

```bash
# 小型改动：直接实现并运行相关测试
修复登录按钮的重复提交问题并验证

# 高风险功能：先规格/计划，再执行完整 QA
用 grimoire-spec 设计账户迁移

# 只做质量验证
运行 grimoire-loop，按风险选择检查
```

### 自适应工作流

根据任务选择最小充分流程：

```text
refine 讨论阶段    clarify + 同步 record
简单任务          → plan → 结束
需契约／拆分      → 用户选择 spec → plan → 结束
                  → 用户选择 [spec →] slice → 结束
loop 内部循环      implement → test → review + check → 评估 ↺
小型、可回滚       implement → 定向验证
已有规格或工单     从下一个有价值的阶段进入
```

[refine](./skills/grimoire-refine/SKILL.md) 协调 clarify，并在讨论期间同步调度 record 自动记录知识；再按任务复杂度推荐是否进行 spec／slice，简单任务直接 plan。slice 或 plan 完成即结束本轮 refine。路由选择、知识边界和验证以其工作流为准：产物阶段只消费已澄清知识，发现缺口交回讨论，不能自行产生新知识。[loop](./skills/grimoire-loop/SKILL.md) 是另行选择的实现与 QA 工作流。每个阶段实际加载并应用对应 skill，允许同一 agent 内联执行。

`clarify` 负责需求讨论，`record` 持久化领域上下文与决策，`spec` 负责需求契约，`slice` 负责工单，`plan` 负责实现计划。loop 内由 implement 负责生产改动、test 负责测试工作、review 评估代码风险、check 核对需求满足情况。

较窄的请求仍可直接选择专业技能。按风险调整深度，但保留选定交付物和必要验证。技能组合须遵守授权范围和宿主调用规则；讨论不等于授权实现。

### 大型代码库改造

`map`、`improve`、`simplify` 均可独立使用。需要编排时选择 `refactor`：持久化地图 → 多切面发现 → 统一依赖计划 → 分批实施 → 集成后 test/review/check → 复扫与验收。授权后可让独立修改单元使用 subagent/worktree，也支持按同一标准串行执行。

地图保存在 `.grimoire/map/index.json` 和按模块划分的快照中，记录源文件哈希、新鲜度、覆盖率与证据；它是导航缓存，不是行为正确的证明。改造进度保存在 `.grimoire/refactor/<run-id>/`。全面简化默认以生产代码净 LOC 至少减少 30% 为目标，同时验收行为与可读性；局部任务不强加该比例。未达标如实报告，禁止靠搬代码或压行凑数。

```text
用 grimoire-map 梳理这个仓库，并持久化结果。
用 grimoire-simplify 压平这个函数，保持行为不变。
用 grimoire-refactor 全面简化这个仓库，使用并行 subagent 和 worktree。
```

维护验证：`pnpm run test:skills`（或 `node --test tests/refactoring-skills.test.mjs`）检查技能元数据、本地引用、注册项、JSON 示例和保留的 QA 阶段。这是静态检查，不等于真实 agent 执行的端到端验证。

---

## 🗂️ 技能列表

Grimoire Skills 分为两种调用方式：

- 👤 **用户调用** — 只有在用户明确提出请求后才执行，适合需要确认意图的设计阶段工作。
- 🤖 **模型调用** — Agent 会根据上下文判断是否需要使用，无需用户手动触发。

---

### 👤 用户调用

这类技能设置了 `disable-model-invocation: true`，需要用户明确选择。

| 技能                                                       | 描述                                   |
| ---------------------------------------------------------- | -------------------------------------- |
| 🔨 **[skill-forge](./skills/skill-forge/SKILL.md)**         | 创建、审查和精简 Agent 技能            |
| 📦 **[grimoire-init](./skills/grimoire-init/SKILL.md)**     | 按需初始化 `.grimoire` 项目知识库      |
| 🧺 **[grimoire-tidy](./skills/grimoire-tidy/SKILL.md)**     | 整理知识库，保留长期信息并清理已完成、已验证的 spec 和 ticket |
| 🗣️ **[grimoire-refine](./skills/grimoire-refine/SKILL.md)** | 协调澄清、上下文落盘、规格、工单与计划 |
| 📝 **[grimoire-spec](./skills/grimoire-spec/SKILL.md)**     | 根据需求和相关上下文生成适量规格       |
| ✂️ **[grimoire-slice](./skills/grimoire-slice/SKILL.md)**   | 将需求拆成连贯的价值或使能工单         |
| 🗺️ **[grimoire-plan](./skills/grimoire-plan/SKILL.md)**     | 生成按风险缩放、可修订的实现计划       |
| 🔄 **[grimoire-loop](./skills/grimoire-loop/SKILL.md)**     | 根据改动风险运行自适应实现和 QA        |
| 🧩 **[grimoire-refactor](./skills/grimoire-refactor/SKILL.md)** | 按依赖分批编排大规模改造，并在集成后验收 |
| ✍️ **[commit](./skills/commit/SKILL.md)**                   | 准备并执行经确认的 Conventional Commit |

---

### 🤖 模型调用

这些技能可由模型按任务选择，也可由用户显式调用。自动选择不代表允许超出用户请求修改内容，也不应强制触发整条流水线。

| 技能                                                             | 描述                                       |
| ---------------------------------------------------------------- | ------------------------------------------ |
| 🔍 **[grimoire-clarify](./skills/grimoire-clarify/SKILL.md)**     | 只解决会阻塞行动的关键歧义                 |
| 🧠 **[grimoire-record](./skills/grimoire-record/SKILL.md)**       | 维护持久的项目术语和架构决策               |
| ⚙️ **[grimoire-implement](./skills/grimoire-implement/SKILL.md)** | 根据明确的计划、工单、规格或对话实现代码   |
| ✅ **[grimoire-check](./skills/grimoire-check/SKILL.md)**         | 对照意图、验收标准、相关产物和证据审计实现 |
| 📋 **[grimoire-review](./skills/grimoire-review/SKILL.md)**       | 使用证据、严重度和置信度审查代码           |
| 🧪 **[grimoire-test](./skills/grimoire-test/SKILL.md)**           | 选择合适结构和边界编写适量测试             |
| 🧭 **[grimoire-map](./skills/grimoire-map/SKILL.md)** | 持久化代码库地图，并按源文件变化增量刷新 |
| 🏗️ **[grimoire-improve](./skills/grimoire-improve/SKILL.md)** | 审查整体结构，实施已授权的职责与依赖改进 |
| 🧹 **[grimoire-simplify](./skills/grimoire-simplify/SKILL.md)** | 保持行为，从单函数到全仓简化与减量 |

---

## 🎨 设计理念

| 原则                   | 含义                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| 🥇 **单一事实来源**     | 每条规则只定义一次，在其他地方引用，避免重复与漂移。             |
| 🚦 **可验证的完成状态** | 每一步都以 Agent 能检查的条件结束，而不是凭感觉判断。            |
| 📐 **连贯边界**         | 共享意图、风险和验证方式的工作保持在一起；拆分应当真正降低耦合。 |
| 🧹 **及时删减**         | 不影响执行的内容不保留。文档本身不是目标。                       |
| 🗺️ **渐进式展开**       | 必要内容直接写在流程中，深入资料放在 `references/`，按需读取。   |
| 🎮 **明确调用责任**     | 技能自行声明由模型还是用户调用，双方都不需要猜测。               |

---

## 📜 许可证

MIT © 2025 — 详见 [LICENSE](./LICENSE)。

---

<div align="center">

为 Pi Coding Agent 制作 🧠 + ❤️

🌟 **[给这个仓库点个 Star](https://github.com/your-org/grimoire-skills)**

</div>
