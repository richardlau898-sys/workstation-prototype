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
