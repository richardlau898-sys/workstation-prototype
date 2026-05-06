# Workstation Build Playbook

这份文档是给 Codex 用的。目标不是复制 Richard 的私人 Workstation，也不是照抄一个 UI 壳，而是帮你从零搭一个属于自己的个人知识工作台。

你可以参考 Richard 的公开产品形态：

```text
https://workstation.richardlau898.workers.dev/
```

但请只参考产品思路和交互结构，不要复制源码，不要爬取私人内容，不要绕过登录或权限。

## 先复制给 Codex 的总 Prompt

```text
我正在 build 一个自己的 Workstation / 个人知识工作台。

我可以参考这个公开产品的产品形态：
https://workstation.richardlau898.workers.dev/

但这只是 inspiration，不是模板仓库。请不要复制 Richard 的源码，不要爬取私人数据，不要尝试绕过登录或权限，也不要照抄 UI。我的版本要有自己的数据模型、界面和 AI 工作流。

我现在的目标不是做一个漂亮空壳，而是先做一个真正可用的最小闭环：
1. 创建或上传一条材料
2. 保存 Source 原文
3. 生成或编辑 View
4. 材料可以放进文件夹、打标签、搜索
5. 至少有一个 AI 动作，例如“生成摘要”或“问题清单”
6. AI 输出必须写回可编辑的 View，而不是只弹出来

技术背景：
- 我已经有 Codex、GitHub、Cloudflare、Supabase
- 编程经验不多，所以请你每次只做一个小功能
- 每次改代码前先说明你要改什么
- 做完后告诉我怎么本地验证
- 不要把 API key 写进前端
- 不要直接部署、删除数据、跑数据库 migration 或推到 main/master，除非我明确确认

请先不要写代码。请先给我：
1. 你看到的参考产品的信息架构总结
2. 我自己的 MVP 范围
3. 数据模型草图
4. 页面结构
5. 第一周开发计划
6. 第一个最小功能和验收标准
```

## 产品原则

Workstation 不是普通笔记 app。它的核心是把“资料进入、整理、AI 输出、回写、复用”串起来。

好的 Workstation 至少应该有这些原则：

- 原始材料不要丢：任何上传、转录、网页摘录或会议记录都要保留 Source。
- AI 结果必须可编辑：AI 生成的内容写入 View，用户可以继续修改。
- 先做闭环，再做大功能：不要一开始就做复杂 agent、复杂权限、多模型路由。
- 文件夹只是入口，不是全部：后续还需要公司、项目、人物、主题等实体关系。
- 搜索必须真的有用：标题、Source、View、标签、实体都应该能搜到。
- AI 动作要贴近工作流：摘要、行动项、问题清单、公司视图、周报素材，比“聊天”更重要。
- 重要动作要人工确认：部署、删除、分享、发邮件、改权限、跑数据库迁移之前都要确认。

## 最小可用闭环

先做这个，不要跳过：

```text
新建材料 -> 写 Source -> 点击 AI 动作 -> 生成 View -> 编辑 View -> 文件夹/标签/搜索能找到它
```

如果这个闭环不好用，后面加 Supabase、Cloudflare、Agent 都会变成复杂但不好用的壳。

## MVP 页面结构

第一版建议只有四个主区域：

```text
左侧导航
- Home
- Notes
- Company
- Daily Brief
- Agents
- Search

中间列表
- 最近材料
- 文件夹过滤
- 上传队列
- 搜索结果

右侧编辑区
- 标题
- 文件夹
- 类型
- 标签
- Source
- View
- AI 动作按钮

上下文侧栏
- 当前实体
- 相关材料
- 最近更新
- Agent 状态
```

如果屏幕不够宽，可以先隐藏上下文侧栏，保证 Source / View 编辑体验优先。

## 第一阶段：本地 Prototype

目标：不接后端，不接真实 AI，不需要登录。

功能：

- 新建笔记
- 编辑标题
- 编辑 Source
- 编辑 View
- 文件夹
- 标签
- 搜索
- 本地保存
- Mock AI 动作

验收标准：

- 刷新页面后笔记不丢
- 搜索能搜标题、Source、View、标签
- AI 摘要按钮会把内容追加到 View
- View 可以继续编辑
- 删除笔记前有确认

给 Codex 的任务：

```text
请先做本地 Prototype，不接任何后端。

实现：
- notes 存在 localStorage
- 每条 note 有 title、source、view、folderId、tags、type、createdAt、updatedAt
- 页面有 Source / View 两个 tab
- AI 摘要按钮先用 mock 规则生成内容，并写入 View

做完后请运行本地页面，并告诉我如何验证：
1. 新建笔记
2. 写 Source
3. 点击摘要
4. View 有输出
5. 刷新后数据还在
```

## 第二阶段：更像工作台

目标：让它不只是笔记列表，而是有资料流和工作区感。

功能：

- Home dashboard
- 最近材料
- 上传队列 mock
- Company workspace
- Daily Brief mock
- Agent monitor mock

验收标准：

- Home 可以看到材料数量、最近笔记、上传队列
- Company 页面只聚合公司相关材料
- Daily Brief 能从最近材料生成一个简单 summary
- Agent monitor 只是状态展示，不需要真实 agent

给 Codex 的任务：

```text
请把这个 prototype 从普通 notes app 升级成个人工作台。

新增：
- Home dashboard
- 最近材料列表
- mock 上传队列
- Company workspace
- Daily Brief 页面
- Agent monitor 页面

注意：
- 先用假数据和本地数据
- 不要接真实 AI
- 不要做登录
- 不要部署
- 保持 Source / View 闭环不被破坏
```

## 第三阶段：数据模型

目标：准备接 Supabase，但先不要急着迁移。

建议数据结构：

```text
folders
- id
- user_id
- name
- color
- sort_order
- created_at
- updated_at

notes
- id
- user_id
- folder_id
- title
- source
- view
- type
- status
- pinned
- created_at
- updated_at

note_tags
- id
- note_id
- name

entities
- id
- user_id
- type
- name
- description

note_entities
- note_id
- entity_id

files
- id
- user_id
- note_id
- filename
- storage_path
- mime_type
- size_bytes
- created_at
```

Supabase 安全原则：

- 用户数据表都要有 user_id。
- 暴露给前端的表默认开启 Row Level Security。
- service role key 绝对不能放进浏览器。
- 前端只能用 publishable / anon 类 key。
- AI provider key 只放服务端。
- 真正写 migration 前，让 Codex 查最新 Supabase 官方文档。

给 Codex 的任务：

```text
我准备把 localStorage 数据迁移到 Supabase。

请先不要改代码，不要创建 migration。
请先给我：
- 表结构
- RLS 策略
- 前端数据读取方式
- 哪些 key 可以在前端，哪些必须在服务端
- 从 localStorage 平滑迁移的步骤

确认方案后，再一步一步实现。
```

## 第四阶段：AI 功能

目标：AI 先作为工作流按钮，不要一开始做复杂聊天系统。

优先做这些动作：

- 生成摘要
- 提取行动项
- 生成问题清单
- 生成公司视图
- 生成 Daily Brief
- 生成周报素材

AI 输出规则：

- 输出写入 View。
- 保留用户原有 View，不要直接覆盖。
- 输出包含时间戳和动作名称。
- 用户可以继续编辑。
- 如果 AI 失败，显示清楚错误，不要吞掉。

给 Codex 的任务：

```text
请设计 AI provider 抽象，但先不要绑定某一个模型供应商。

要求：
- 前端只调用 /api/ai-action
- 请求包含 noteId、action、source、currentView
- 后端根据 action 生成结果
- API key 只放服务端环境变量
- 先实现 mock provider
- 后续再替换成 OpenAI / Claude / Gemini / 其他模型

AI 输出必须追加到 View，不能只显示在弹窗里。
```

## 第五阶段：Cloudflare 部署

目标：先安全部署可看的版本，再逐步接 Worker API。

建议顺序：

1. 静态前端先上 Cloudflare Pages。
2. AI / Supabase 写操作放到 Cloudflare Worker 或 Pages Functions。
3. 环境变量放在 Cloudflare dashboard，不写进代码。
4. 部署前确认不会指向错误项目或生产数据。

给 Codex 的任务：

```text
我想部署到 Cloudflare。

请先不要直接部署。
请先判断：
- 这个阶段适合 Cloudflare Pages 还是 Workers
- 需要哪些环境变量
- 哪些密钥只能在服务端
- 本地如何测试
- 部署前检查清单

我确认后，再执行部署。
```

## 不要做的事

早期不要做这些：

- 不要复制 Richard 的源码。
- 不要照抄公开页面的 UI 细节。
- 不要绕过登录或权限。
- 不要把 API key 写进前端。
- 不要一开始做复杂 agent 框架。
- 不要一口气做十个页面。
- 不要在没有 RLS 的情况下把 Supabase 表暴露给前端。
- 不要直接部署或改生产数据。
- 不要让 AI 输出只存在弹窗里。

## 每一步都要问 Codex 的问题

每次开始新功能前，先问：

```text
这个功能是不是服务于 Source -> View -> 复用 这个闭环？
```

如果不是，先不要做。

每次 Codex 改完后，让它回答：

```text
请告诉我：
1. 改了哪些文件
2. 新功能怎么用
3. 怎么本地验证
4. 有没有安全风险
5. 下一步最小改动是什么
```

## 一周开发路线

Day 1:

- 跑通本地 app
- 新建笔记
- localStorage 保存

Day 2:

- Source / View
- Mock AI 摘要写入 View

Day 3:

- 文件夹、标签、搜索

Day 4:

- Home dashboard
- 最近材料
- 上传队列 mock

Day 5:

- Company workspace
- 问题清单 mock

Day 6:

- Daily Brief mock
- 周报素材 mock

Day 7:

- 整理数据模型
- 准备 Supabase 方案
- 写 README 和部署计划

## 最重要的一句话

不要先做一个像 Workstation 的壳。先做一个真的能把材料变成可复用 View 的小闭环。

## Self-Service Manual

这一部分是为了让你尽量少问 Richard。遇到问题时，先把对应段落复制给 Codex，让 Codex 自己检查、自己修、自己验证。

### 你和 Codex 的分工

你负责：

- 描述你想要的工作流。
- 决定哪些功能对你真的有用。
- 确认是否部署、是否改数据库、是否接真实 AI。
- 提供自己的 API key 和项目配置，但不要直接贴在公开聊天或代码里。

Codex 负责：

- 读当前 repo。
- 解释现有代码。
- 拆小任务。
- 改代码。
- 本地运行。
- 验证结果。
- 写清楚改了什么。
- 遇到错误时先定位原因，而不是乱试。

Richard 只应该在这些情况出现时被问：

- 你不理解 Workstation 的产品方向。
- 你已经让 Codex 查过代码、跑过验证、读过错误，但还是无法判断下一步。
- 你准备借鉴 Richard 的公开产品形态，但不确定是否会涉及隐私或边界。
- 你想讨论产品策略，而不是普通代码 bug。

不要因为下面这些问题去问 Richard：

- npm install 报错。
- 页面样式不好看。
- Supabase 表名不知道怎么起。
- Codex 改太多了。
- 本地端口冲突。
- AI key 应该放哪里。
- Git 不知道怎么 commit。

这些都应该先让 Codex 按本文档处理。

### 第一次打开 repo 时

复制给 Codex：

```text
请先完整阅读这个 repo，特别是 README.md、WORKSTATION_BUILD_PLAYBOOK.md 和现有代码。

不要马上写代码。请先回答：
1. 这个 repo 当前能做什么？
2. 当前数据存在什么地方？
3. Source 和 View 分别是什么？
4. 当前哪些功能只是 mock？
5. 如果我要继续 build，最小的下一步是什么？
6. 运行和验证这个 repo 的命令是什么？

回答完以后，等我确认，再开始改代码。
```

如果 Codex 开始直接重构，发：

```text
停。请不要重构整个项目。请先只解释当前代码结构和一个最小下一步。
```

### 每次新功能开始前

复制给 Codex：

```text
请把这个功能拆成最小可交付版本。

你需要先告诉我：
1. 这个功能服务于哪个工作流？
2. 需要改哪些文件？
3. 会新增什么数据字段？
4. 有没有安全风险？
5. 怎么本地验证？

先不要写代码，等我确认。
```

确认后再发：

```text
可以开始。请只实现刚才确认的最小版本。
不要顺手做无关重构。
做完后请运行验证，并给我一个简短 changelog。
```

### 每次 Codex 改完后

复制给 Codex：

```text
请做收尾检查：
1. 当前 git diff 是什么？
2. 是否有无关改动？
3. 本地运行是否成功？
4. 我应该点击哪里验证？
5. 有哪些已知限制？
6. 下一步最小功能是什么？
```

如果 Codex 没有运行验证，发：

```text
请不要只告诉我理论上可以。请实际运行本地验证，或者说明为什么不能运行。
```

## 详细模块说明

### Module 1: Notes Core

目标：先让系统能保存材料。

数据字段：

```text
note.id
note.title
note.source
note.view
note.folderId
note.tags
note.type
note.status
note.pinned
note.createdAt
note.updatedAt
```

最小功能：

- 新建 note。
- 编辑 title。
- 编辑 source。
- 编辑 view。
- 删除 note。
- 刷新页面后还在。

不要做：

- 不要先做富文本编辑器。
- 不要先做复杂权限。
- 不要先做多用户。
- 不要先接真实 AI。

给 Codex 的 prompt：

```text
请实现 Notes Core 的最小版本。

要求：
- 使用 localStorage 保存 notes
- 每条 note 有 id、title、source、view、folderId、tags、type、status、pinned、createdAt、updatedAt
- 支持新建、编辑、删除
- 删除前确认
- 刷新后数据不丢

请不要接后端，不要接真实 AI，不要做登录。
做完后请告诉我如何验证。
```

验收标准：

- 新建一条 note，刷新页面后还存在。
- 修改 title，刷新后 title 仍然正确。
- 修改 source，刷新后 source 仍然正确。
- 修改 view，刷新后 view 仍然正确。
- 删除时有确认。
- 取消删除不会误删。

### Module 2: Source / View

目标：把原始资料和整理后的资料分开。

Source 是：

- 原始笔记。
- 转录文本。
- 会议记录。
- PDF 摘录。
- 网页摘录。
- 模型假设原文。

View 是：

- 用户整理后的版本。
- AI 摘要。
- 行动项。
- 公司问题清单。
- 周报素材。
- 可以继续编辑的输出。

重要规则：

- Source 不应该被 AI 随便覆盖。
- View 可以被 AI 追加内容。
- View 永远可编辑。
- AI 输出要写入 View，不要只显示在弹窗里。

给 Codex 的 prompt：

```text
请把 note 编辑器改成 Source / View 双区域。

要求：
- Source 用来保存原始材料
- View 用来保存整理后的内容
- 可以通过 tab 或分栏切换
- AI 输出只能追加到 View
- 不要覆盖用户已有 View，除非用户明确确认

做完后请验证：
1. Source 能编辑并保存
2. View 能编辑并保存
3. 点击 mock AI 后，内容追加到 View
4. Source 不被改动
```

验收标准：

- Source 和 View 都能独立保存。
- AI 输出不污染 Source。
- View 里已经有内容时，新 AI 输出追加在后面。
- 用户可以继续修改 AI 输出。

### Module 3: Folder / Tag / Search

目标：让材料能找回来。

文件夹适合放：

- Inbox
- Company
- Research
- Meetings
- Models
- Archive

标签适合表达：

- AI
- 公司
- 会议
- 问题清单
- 周报
- 模型
- 待处理

搜索范围：

- title
- source
- view
- tags
- folder name
- entity name

给 Codex 的 prompt：

```text
请实现文件夹、标签和搜索。

要求：
- 左侧有文件夹列表
- 点击文件夹可以过滤 notes
- 每条 note 可以编辑 tags
- 搜索能查 title、source、view、tags
- 搜索结果要即时更新
- 不要引入后端

做完后请创建几条 demo notes 用来测试搜索。
```

验收标准：

- 点击 Inbox 只显示 Inbox 的 note。
- 点击 Company 只显示 Company 的 note。
- 搜索一个 Source 里的词能找到 note。
- 搜索一个 View 里的词能找到 note。
- 搜索一个 tag 能找到 note。
- 清空搜索后恢复列表。

### Module 4: Home Dashboard

目标：打开 app 后知道今天该看什么。

Home 不应该只是欢迎页。它应该显示：

- 总材料数。
- 今日新增。
- 处理中。
- 最近更新。
- 上传队列。
- 快速入口。

给 Codex 的 prompt：

```text
请实现 Home Dashboard。

要求：
- 显示材料总数
- 显示最近更新 notes
- 显示 mock 上传队列
- 显示常用工作区入口
- 点击最近 note 能打开编辑器
- 不要做营销 landing page

页面要像工具，不要像宣传页。
```

验收标准：

- Home 首屏能看到最近材料。
- 点击最近材料能进入对应 note。
- 上传队列能显示 processing / completed / draft 状态。
- 页面信息密度足够，不要只有大标题。

### Module 5: Mock Upload

目标：先模拟资料进入系统，不急着真的上传文件。

Mock upload 应该做：

- 创建一条新 note。
- type 设置为 transcript / report / model。
- status 设置为 processing。
- Source 写入一段模拟原始内容。
- View 写入“等待处理”。

给 Codex 的 prompt：

```text
请实现一个 mock 上传按钮。

点击后：
- 新建一条 note
- type = transcript
- status = processing
- source 里写入模拟转录内容
- view 里写入等待处理提示
- 自动选中新 note

不要接真实文件上传，不要接 Supabase Storage。
```

验收标准：

- 点击 mock upload 后列表多一条 note。
- 新 note 自动打开。
- Source 有模拟内容。
- View 显示等待处理。
- 刷新后 note 还在。

### Module 6: AI Actions

目标：AI 变成工作流按钮，而不是只有聊天框。

优先按钮：

- 摘要
- 行动项
- 问题清单
- 公司视图
- Daily Brief
- 周报素材

第一版只做 mock，不接真实模型。

给 Codex 的 prompt：

```text
请实现 mock AI actions。

按钮：
- 摘要
- 行动项
- 问题清单
- 公司视图
- 周报素材

规则：
- 根据当前 note.source 和 note.title 生成简单 mock 输出
- 输出追加到 note.view
- 输出前加时间和 action 名称
- 不要覆盖已有 View
- 不要接真实 AI API
```

验收标准：

- 点击“摘要”后 View 增加摘要段落。
- 点击“问题清单”后 View 增加问题清单。
- 连续点击两个 action，两个输出都保留。
- Source 不变化。
- 刷新后 View 仍然包含输出。

接真实 AI 时再用这个 prompt：

```text
请把 mock AI actions 抽象成 provider 架构。

要求：
- 前端调用统一函数 runAiAction(action, note)
- 先保留 mock provider
- 后续可以替换成后端 /api/ai-action
- 不要把 API key 放到前端
- 不要在这一步接真实模型
```

### Module 7: Company Workspace

目标：围绕一个公司或项目聚合材料。

第一版可以很简单：

- note 有 entity 字段。
- entity 可以是公司名、项目名或主题。
- Company 页面显示 entity = 当前公司的 notes。
- AI 问题清单从这些 notes 里生成。

不要一开始做：

- 不要先做股票行情。
- 不要先做复杂图表。
- 不要先做自动公司识别。
- 不要先接真实财报 API。

给 Codex 的 prompt：

```text
请实现最小 Company Workspace。

要求：
- note 增加 entity 字段
- Company 页面按 entity 聚合 notes
- 点击一个 company 能看到相关 notes
- 有一个“生成问题清单”mock AI action
- 问题清单要写入当前 company note 的 View

先用 demo entity，例如 SampleCo。
```

验收标准：

- 多条 notes 可以属于同一个 entity。
- Company 页面能看到这些 notes。
- 生成问题清单会参考相关 notes 的 title/source/view。
- 输出写入 View。

### Module 8: Daily Brief

目标：从最近材料生成每日回顾。

Daily Brief 第一版：

- 读取最近更新的 notes。
- 按 tags / folder / type 分组。
- 生成一个 mock summary。
- 显示“今天新增”“今天处理”“待跟进”。

给 Codex 的 prompt：

```text
请实现 Daily Brief 的本地 mock 版本。

要求：
- 读取最近更新的 notes
- 生成一个本地 summary，不接真实 AI
- 显示今日新增、最近处理、待跟进
- 点击 brief 里的材料能跳到对应 note
- 不要接后端定时任务
```

验收标准：

- 修改一条 note 后，它出现在 Daily Brief。
- Daily Brief 显示最近材料列表。
- 点击材料能打开 note。
- summary 不需要很聪明，但结构要清楚。

### Module 9: Agent Monitor

目标：先展示“未来可以自动处理”的概念。

第一版只做 mock 状态：

- Note Processor
- Company Prep
- Weekly Digest
- Upload Queue

状态：

- ready
- working
- paused
- error

给 Codex 的 prompt：

```text
请实现 Agent Monitor 的 mock 页面。

要求：
- 展示几个 agent 卡片
- 每个 agent 有 name、status、description、lastRun
- 不执行真实后台任务
- 不接真实 agent framework
- 点击 agent 可以看到它未来负责什么
```

验收标准：

- Agents 页面能看到状态。
- 状态颜色清楚。
- 不会真的调用外部服务。

### Module 10: Supabase Migration

目标：把本地数据变成多设备持久化。

只有当本地闭环已经顺了，才开始 Supabase。

先让 Codex做方案，不要直接 migration。

给 Codex 的 prompt：

```text
我准备接 Supabase。请先做方案，不要改代码，不要创建 migration。

请输出：
1. 表结构
2. 字段解释
3. RLS 策略
4. 前端怎么读写
5. localStorage 如何迁移
6. 哪些 key 可以在前端
7. 哪些 key 必须只在服务端
8. 需要查哪些 Supabase 官方文档
```

方案确认后，再让 Codex做第一张表：

```text
请只实现 notes 表相关功能。

要求：
- 先查 Supabase 官方文档
- 创建 migration 前先给我 SQL
- RLS 必须开启
- 用户只能读写自己的 notes
- service_role key 不能进入前端
- 做完后用本地或测试项目验证
```

验收标准：

- 登录用户只能看到自己的 notes。
- 前端没有 service_role key。
- 刷新后数据来自 Supabase。
- localStorage fallback 仍然可用，或者有清楚迁移按钮。

### Module 11: Cloudflare Deployment

目标：让别人能打开你的版本。

部署前先问：

- 是静态前端还是有 API？
- 适合 Pages 还是 Worker？
- 是否需要环境变量？
- 是否会连接 Supabase？
- 是否会调用 AI provider？

给 Codex 的 prompt：

```text
请帮我准备 Cloudflare 部署方案。

先不要部署。
请告诉我：
1. 当前项目适合 Cloudflare Pages 还是 Workers
2. build 命令是什么
3. output 目录是什么
4. 需要哪些环境变量
5. 哪些环境变量是 secret
6. 本地如何预览
7. 部署前检查清单
```

确认后再发：

```text
可以部署到 Cloudflare 测试环境。

要求：
- 不要覆盖生产项目
- 不要使用 Richard 的任何配置
- 部署完给我 URL
- 访问 URL 后做一次基本功能检查
```

验收标准：

- 公开 URL 能打开。
- 页面没有白屏。
- 基本交互可用。
- 控制台没有明显 error。
- 没有泄露 secret。

## 常见问题和处理方式

### 页面白屏

给 Codex：

```text
页面白屏。请先不要重写代码。

请检查：
1. 浏览器 console error
2. 构建是否成功
3. 入口文件是否正确
4. 静态资源路径是否正确
5. 最近一次改动是什么

请定位具体错误后再修。
```

### 样式很丑

给 Codex：

```text
请改善 UI，但不要改业务逻辑。

目标：
- 更像工作台，不像 landing page
- 信息密度高一点
- 字体不要太大
- 卡片不要套卡片
- 移动端不要重叠
- Source / View 编辑体验优先

请只改样式文件，除非必须改 HTML/组件结构。
```

### Codex 改太多

给 Codex：

```text
你这次改动太大。请暂停。

请先回答：
1. 哪些改动是完成当前任务必须的？
2. 哪些是顺手重构？
3. 能否只保留必须改动？
4. 当前功能最小版本是什么？

不要继续扩大范围。
```

### AI 不工作

给 Codex：

```text
AI action 不工作。请按顺序检查：
1. 按钮点击事件是否触发
2. 当前 note 是否存在
3. source/view 是否传入
4. mock provider 是否返回内容
5. 内容是否写入 View
6. 是否保存到存储层

请先用 mock provider 跑通，不要急着接真实模型。
```

### Supabase 权限错误

给 Codex：

```text
Supabase 出现权限错误。

请先不要关闭 RLS。
请检查：
1. 当前用户是否登录
2. 表是否有 user_id
3. SELECT policy 是否存在
4. INSERT policy 是否存在
5. UPDATE 是否同时需要 SELECT policy
6. 前端是否误用了 service_role key

请查最新 Supabase 官方文档后再修。
```

### 部署后本地可以、线上不行

给 Codex：

```text
本地可用，线上不可用。请检查：
1. 环境变量是否配置到 Cloudflare
2. build output 是否正确
3. 路由是否 fallback 到 index.html
4. API 路径是否不同
5. CORS 是否有问题
6. 浏览器 console 和 network 里具体错误是什么

请先定位，不要盲目重写。
```

### Git 不会用了

给 Codex：

```text
请帮我检查 git 状态。

要求：
- 先显示当前分支
- 显示 changed files
- 总结每个文件为什么改了
- 不要直接 push
- 不要 reset
- 如果要 commit，先给我 commit message 建议
```

## 让 Codex 少犯错的固定前缀

每次开新任务，都可以在最前面加：

```text
请注意：
- 不要复制 Richard 的源码
- 不要爬取私人数据
- 不要绕过登录
- 不要把 API key 放进前端
- 不要直接部署
- 不要直接改数据库
- 不要一次性重构
- 每次只做一个小功能
- 做完必须告诉我如何验证
```

## 让 Codex 做 code review

每完成一个阶段，发：

```text
请 review 当前实现。

重点看：
1. 有没有数据丢失风险
2. Source/View 是否被混淆
3. AI 输出是否可能覆盖用户内容
4. 搜索是否遗漏重要字段
5. localStorage/Supabase 是否有迁移风险
6. 是否有 secret 泄露风险
7. 是否有移动端布局问题
8. 是否有无关重构

请按严重程度列出问题，并给出修复建议。
```

## 功能优先级

如果不知道下一步做什么，按这个顺序：

1. Notes Core
2. Source / View
3. Local persistence
4. Folders
5. Tags
6. Search
7. Mock AI summary
8. Mock AI questions
9. Home dashboard
10. Mock upload queue
11. Company workspace
12. Daily Brief
13. Agent Monitor
14. Supabase schema
15. Supabase auth
16. Supabase notes CRUD
17. Cloudflare deploy
18. Real AI provider
19. File upload
20. Real background jobs

不要跳到第 18 步，然后回来发现第 2 步还不好用。

## 数据字段解释

### note.source

用途：保存原始材料。

例子：

```text
会议原文、转录内容、PDF 摘录、网页摘录、手写原始想法。
```

不应该：

- 被摘要覆盖。
- 被问题清单覆盖。
- 被自动清空。

### note.view

用途：保存整理后的材料。

例子：

```text
摘要、行动项、问题清单、公司视图、周报素材、用户整理后的最终版本。
```

应该：

- 可编辑。
- 可追加 AI 输出。
- 可被用户重写。

### note.entity

用途：把材料关联到公司、项目、人物或主题。

例子：

```text
SampleCo
AI Tools
Personal CRM
Project Atlas
```

第一版可以只是字符串。后续再拆成 entities 表。

### note.status

建议值：

```text
draft
processing
completed
error
archived
```

用处：

- 上传队列。
- Agent Monitor。
- Daily Brief。
- 筛选待处理材料。

## 真实 AI 接入前的检查

接真实模型前，先确认：

- Mock AI 已经跑通。
- 输出能写入 View。
- View 不会被覆盖。
- 错误能显示。
- API key 不在前端。
- 后端 route 有输入校验。
- 请求体不会过大。
- 用户知道这会消耗额度。

给 Codex：

```text
请检查当前项目是否已经准备好接真实 AI。

请逐项检查：
1. mock provider 是否存在
2. AI action contract 是否清楚
3. 前端是否只传必要字段
4. 后端 route 是否存在
5. API key 是否只在服务端
6. 错误处理是否清楚
7. 输出是否追加到 View
8. 是否有额度消耗提示

不满足的地方先列出来，不要直接接真实模型。
```

## 真实文件上传前的检查

文件上传很容易变复杂。先确认：

- Mock upload 已经可用。
- note 和 file 的关系清楚。
- 文件大小限制明确。
- 文件类型限制明确。
- 上传失败有错误提示。
- Storage 权限清楚。

给 Codex：

```text
请设计文件上传方案，但先不要实现。

请回答：
1. 文件存在哪里？
2. note 和 file 如何关联？
3. 最大文件多大？
4. 支持哪些 mime type？
5. 上传失败怎么处理？
6. 谁可以读这个文件？
7. 是否需要 Supabase Storage 或 Cloudflare R2？
8. 需要哪些环境变量？
```

## 每天收工 checklist

每天开发结束前，发给 Codex：

```text
请帮我做今日收工检查：
1. 今天完成了什么
2. 哪些功能已经本地验证
3. 哪些功能还只是 mock
4. 当前 git status
5. 是否需要 commit
6. 是否有敏感信息风险
7. 明天第一步应该做什么
```

如果要 commit：

```text
请准备一个小而清楚的 commit。

要求：
- 只包含今天相关改动
- 不包含 .env
- 不包含 node_modules
- commit message 简洁
- commit 前先显示 changed files
```

## 什么时候可以问 Richard

先完成这个 checklist：

```text
我已经：
1. 让 Codex 阅读了 WORKSTATION_BUILD_PLAYBOOK.md
2. 让 Codex 阅读了当前 repo
3. 让 Codex 解释了错误
4. 让 Codex 尝试了最小修复
5. 让 Codex 跑了本地验证
6. 我能说清楚卡在哪里
```

然后再问 Richard，问题要这样问：

```text
我现在做到第 X 阶段。
目标是 Y。
Codex 已经尝试了 A/B/C。
现在卡在 Z。
我不确定这是产品方向问题还是实现问题。
你建议我下一步怎么拆？
```

不要这样问：

```text
我这个不行，你看看。
```

## 最后提醒

你不是在做 Richard Workstation 的复制品。你是在做自己的工作台。

Richard 的公开页面只能回答“产品长什么样、工作流大概怎么组织”。你的 Codex 应该回答“在你的 repo 里，下一步怎么安全地做出来”。
