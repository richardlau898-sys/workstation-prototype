# 数据模型草稿

这不是数据库迁移文件，只是给后续开发看的草图。真正接 Supabase 前，让 Codex 参考官方文档并生成正式 migration。

## folders

用于保存文件夹。

| 字段 | 含义 |
| --- | --- |
| id | 文件夹 ID |
| user_id | 用户 ID |
| name | 文件夹名称 |
| color | UI 颜色 |
| sort_order | 排序 |
| created_at | 创建时间 |
| updated_at | 更新时间 |

## notes

用于保存笔记主体。

| 字段 | 含义 |
| --- | --- |
| id | 笔记 ID |
| user_id | 用户 ID |
| folder_id | 所属文件夹 |
| title | 标题 |
| body | 正文 |
| brief | 摘要或 AI 输出 |
| pinned | 是否置顶 |
| created_at | 创建时间 |
| updated_at | 更新时间 |

## note_tags

用于保存标签。早期也可以先把标签存在 `notes.tags` 里，等功能复杂后再拆出来。

| 字段 | 含义 |
| --- | --- |
| id | 标签记录 ID |
| note_id | 笔记 ID |
| name | 标签名 |

## entities

用于把笔记关联到公司、人物、项目等对象。

| 字段 | 含义 |
| --- | --- |
| id | 实体 ID |
| user_id | 用户 ID |
| type | company / person / project / topic |
| name | 名称 |
| description | 简短说明 |

## note_entities

用于保存笔记和实体之间的多对多关系。

| 字段 | 含义 |
| --- | --- |
| note_id | 笔记 ID |
| entity_id | 实体 ID |

## files

后续上传 PDF、图片、音频时使用。

| 字段 | 含义 |
| --- | --- |
| id | 文件 ID |
| user_id | 用户 ID |
| note_id | 关联笔记 |
| filename | 文件名 |
| storage_path | 存储路径 |
| mime_type | 文件类型 |
| size_bytes | 文件大小 |
| created_at | 上传时间 |

## 安全原则

- 每张用户数据表都要有 `user_id`。
- 暴露给前端的表要默认开启 Row Level Security。
- 不要把 service role key 放到浏览器。
- AI provider key 只放在服务端环境变量里。
- 文件上传要限制大小和类型。
