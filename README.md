# Workstation Prototype

这是一个可以交给同事或上司参考的干净 prototype。它不是从任何私人 Workstation 代码里抽出来的版本，也不包含 API key、数据库地址、Cloudflare 配置、端口配置或私人数据。

## 怎么打开

直接用浏览器打开 `index.html` 即可。

也可以在这个文件夹里启动一个普通静态服务器：

```bash
python3 -m http.server 5173
```

然后访问：

```text
http://localhost:5173
```

## 当前功能

- 文件夹：收件箱、研究、会议、归档，也可以新增文件夹。
- 笔记：新建、编辑、删除、置顶。
- 检索：按标题、正文、标签搜索。
- 标签：每条笔记可以有多个标签，左侧会自动聚合。
- 本地摘要：用简单规则生成一个摘要视图，不连接任何外部 AI 服务。
- 导入导出：用 JSON 备份或迁移本地笔记。
- 存储：全部保存在浏览器 `localStorage`，没有后端。

## 给 Codex 继续开发

如果使用者也是通过 Codex 开发，先看：

```text
CODEX_HANDOFF.md
WORKSTATION_BUILD_PLAYBOOK.md
```

里面有可以直接复制给 Codex 的分阶段 prompt，适合编程经验不多、但已经装好 Codex / GitHub / Cloudflare / Supabase 的使用者。`WORKSTATION_BUILD_PLAYBOOK.md` 更偏产品逻辑和开发路线，能避免只复制一个 UI 壳。

## 建议的后续开发路线

第一阶段可以继续保持本地优先：

- 加 Markdown 预览。
- 加最近更新视图。
- 支持拖拽上传 PDF、Word、图片。
- 给笔记增加公司、人物、项目等实体字段。

第二阶段再加后端：

- 用户登录。
- 数据库持久化。
- 文件存储。
- 权限管理。
- 多设备同步。

第三阶段再加 AI：

- 摘要、行动项、会议问题清单。
- 文件解析和全文搜索。
- 基于最近笔记的上下文推荐。
- 给每个用户配置自己的模型供应商和 API key。

## 文件结构

```text
workstation-prototype/
  index.html
  styles.css
  app.js
  README.md
  CODEX_HANDOFF.md
  docs/
    data-model.md
```

这个 prototype 的重点是产品骨架：笔记、文件夹、搜索、标签、摘要、导入导出。真正上线前建议把 `localStorage` 换成数据库，把摘要逻辑换成后端 API，并把密钥放在服务端环境变量里。
