(function () {
  const STORAGE_KEY = "workstation-prototype-v2";

  const folders = [
    { id: "all", name: "全部材料", color: "#23705a", system: true },
    { id: "inbox", name: "Inbox", color: "#23705a" },
    { id: "company", name: "Company Workspace", color: "#245da8" },
    { id: "research", name: "Research Notes", color: "#6941c6" },
    { id: "meetings", name: "Meetings", color: "#b7791f" },
    { id: "models", name: "Models & Tables", color: "#c05621" },
    { id: "archive", name: "Archive", color: "#667085" },
  ];

  const demoNotes = [
    {
      id: "n-ai-roadmap",
      folderId: "research",
      type: "note",
      title: "AI Workstation 产品路线",
      source:
        "目标不是做一个普通笔记软件，而是把上传、转录、阅读、公司研究、周报素材和 AI 操作连接起来。\n\n短期：先把本地资料流做好，支持搜索、标签、文件夹、可编辑 View。\n中期：接入 Supabase，保存 notes、folders、files、entities。\n长期：每个工作区有自己的 agent，可以生成摘要、问题清单、公司跟踪和周报。",
      view:
        "## 工作台定位\n\n- 资料入口：上传 PDF、音频、网页、会议记录。\n- 工作区：围绕公司、主题、项目组织材料。\n- AI 动作：摘要、行动项、问题清单、周报素材。\n- View：AI 输出必须可编辑，不能只藏在弹窗里。\n\n下一步先做 Markdown 预览和实体字段。",
      tags: ["AI", "产品", "路线图"],
      entity: "Workstation",
      pinned: true,
      status: "completed",
      createdAt: "2026-05-01T09:00:00.000Z",
      updatedAt: "2026-05-04T10:30:00.000Z",
    },
    {
      id: "n-company-prep",
      folderId: "company",
      type: "meeting",
      title: "样例公司：会前问题清单",
      source:
        "背景：准备一次公司交流。已有材料包括上一季度纪要、几条行业新闻和内部模型假设。\n\n关注点：收入质量、客户集中度、库存周期、AI 相关投入是否真的带来效率。\n\n希望输出：适合开会时直接问的问题，按财务、产品、竞争、管理层四个方向组织。",
      view:
        "## 会前问题清单\n\n1. 财务：毛利率改善主要来自价格、成本还是产品 mix？\n2. 产品：AI 功能是独立收费，还是提升主产品留存？\n3. 竞争：最近两个季度有没有看到价格战？\n4. 管理层：2026 年最可能超预期和低于预期的变量分别是什么？",
      tags: ["公司", "会议", "问题清单"],
      entity: "SampleCo",
      pinned: false,
      status: "completed",
      createdAt: "2026-05-02T12:00:00.000Z",
      updatedAt: "2026-05-04T08:20:00.000Z",
    },
    {
      id: "n-transcript",
      folderId: "inbox",
      type: "transcript",
      title: "播客转录：Agentic Workflow",
      source:
        "主持人讨论了 agentic workflow 的几个阶段：任务拆解、工具调用、记忆、人工确认和结果回写。最关键的不是模型一次回答多聪明，而是系统能不能把过程保存下来。\n\n嘉宾认为，个人知识系统会从搜索框变成操作台。",
      view:
        "## 核心摘录\n\n- Agent 不只是聊天框，而是可以处理资料的工作流。\n- 个人知识系统需要把操作结果回写到笔记。\n- 人工确认应该出现在部署、删除、发邮件、分享等关键动作前。",
      tags: ["转录", "Agent", "知识库"],
      entity: "AI Tools",
      pinned: false,
      status: "processing",
      createdAt: "2026-05-03T08:20:00.000Z",
      updatedAt: "2026-05-05T07:30:00.000Z",
    },
    {
      id: "n-model",
      folderId: "models",
      type: "model",
      title: "收入模型假设记录",
      source:
        "模型假设：核心业务收入增长 12%，新业务增长 35%，毛利率提升 120bp。风险在于销售费用率可能上升，以及海外市场贡献低于预期。\n\n这个 prototype 不解析 Excel，只保留模型笔记入口。",
      view:
        "## 模型观察\n\nBase case: 收入增长 16%，利润率小幅提升。\nBull case: 新业务渗透更快，估值切换。\nBear case: 销售费用吃掉毛利率改善。",
      tags: ["模型", "财务", "假设"],
      entity: "SampleCo",
      pinned: false,
      status: "draft",
      createdAt: "2026-05-04T11:00:00.000Z",
      updatedAt: "2026-05-04T11:20:00.000Z",
    },
    {
      id: "n-weekly",
      folderId: "archive",
      type: "report",
      title: "本周研究素材池",
      source:
        "本周值得沉淀的材料：AI coding 工具对比、数据库权限设计、公司会前问题清单、音频转录工作流。\n\n需要把零散材料变成周报，而不是只保存在各个文件夹里。",
      view:
        "## 周报素材\n\n- AI coding: 更适合把复杂任务拆成可验证的小步。\n- 数据库：RLS 和 key 管理要尽早设计。\n- 公司研究：最近笔记应该自动进入会前准备上下文。",
      tags: ["周报", "研究", "沉淀"],
      entity: "Weekly",
      pinned: false,
      status: "completed",
      createdAt: "2026-05-05T06:00:00.000Z",
      updatedAt: "2026-05-05T06:40:00.000Z",
    },
  ];

  const uploads = [
    { id: "u1", title: "earnings-call-sample.mp3", kind: "MP3", status: "processing", folderId: "inbox", noteId: "n-transcript" },
    { id: "u2", title: "sample-company-report.pdf", kind: "PDF", status: "completed", folderId: "company", noteId: "n-company-prep" },
    { id: "u3", title: "financial-model.xlsx", kind: "XLS", status: "draft", folderId: "models", noteId: "n-model" },
  ];

  const agents = [
    { id: "a1", title: "Note Processor", detail: "转录和清洗上传材料", state: "working" },
    { id: "a2", title: "Company Prep", detail: "把最近笔记变成会前问题", state: "ready" },
    { id: "a3", title: "Weekly Digest", detail: "收集本周可复用素材", state: "paused" },
  ];

  const defaultState = {
    notes: demoNotes,
    ui: {
      view: "home",
      selectedFolderId: "all",
      selectedNoteId: "n-ai-roadmap",
      query: "",
      editorTab: "view",
    },
  };

  const viewMeta = {
    home: { label: "Home", title: "今日工作台", icon: "H" },
    notes: { label: "Notes", title: "资料流", icon: "N" },
    company: { label: "Company", title: "公司工作区", icon: "C" },
    daily: { label: "Daily Brief", title: "Daily Brief", icon: "D" },
    agents: { label: "Agents", title: "Agent Monitor", icon: "A" },
    search: { label: "Search", title: "全局搜索", icon: "S" },
  };

  let state = loadState();

  const els = {
    workspaceNav: document.getElementById("workspaceNav"),
    queueBadge: document.getElementById("queueBadge"),
    queueList: document.getElementById("queueList"),
    folderTree: document.getElementById("folderTree"),
    newFolderButton: document.getElementById("newFolderButton"),
    resetDemoButton: document.getElementById("resetDemoButton"),
    viewEyebrow: document.getElementById("viewEyebrow"),
    viewTitle: document.getElementById("viewTitle"),
    searchInput: document.getElementById("searchInput"),
    newNoteButton: document.getElementById("newNoteButton"),
    mockUploadButton: document.getElementById("mockUploadButton"),
    dashboardView: document.getElementById("dashboardView"),
    timelineView: document.getElementById("timelineView"),
    emptyState: document.getElementById("emptyState"),
    editorPanel: document.getElementById("editorPanel"),
    titleInput: document.getElementById("titleInput"),
    selectedMeta: document.getElementById("selectedMeta"),
    folderSelect: document.getElementById("folderSelect"),
    typeSelect: document.getElementById("typeSelect"),
    tagsInput: document.getElementById("tagsInput"),
    pinButton: document.getElementById("pinButton"),
    deleteNoteButton: document.getElementById("deleteNoteButton"),
    sourceTabButton: document.getElementById("sourceTabButton"),
    viewTabButton: document.getElementById("viewTabButton"),
    sourceInput: document.getElementById("sourceInput"),
    viewInput: document.getElementById("viewInput"),
    contextStatus: document.getElementById("contextStatus"),
    contextSummary: document.getElementById("contextSummary"),
    relatedList: document.getElementById("relatedList"),
    agentList: document.getElementById("agentList"),
  };

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.notes)) return structuredClone(defaultState);
      return {
        notes: parsed.notes,
        ui: { ...defaultState.ui, ...(parsed.ui || {}) },
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  }

  function persistAndRender() {
    saveState();
    render();
  }

  function render() {
    const meta = viewMeta[state.ui.view] || viewMeta.home;
    els.viewEyebrow.textContent = meta.label;
    els.viewTitle.textContent = meta.title;
    els.searchInput.value = state.ui.query;

    renderNav();
    renderQueue();
    renderFolders();
    renderMain();
    renderEditor();
    renderContext();
  }

  function renderNav() {
    const counts = {
      home: state.notes.length,
      notes: state.notes.length,
      company: state.notes.filter((note) => note.folderId === "company").length,
      daily: 1,
      agents: agents.length,
      search: getFilteredNotes().length,
    };

    els.workspaceNav.innerHTML = Object.entries(viewMeta)
      .map(([key, item]) => {
        const active = state.ui.view === key ? "active" : "";
        return `
          <button class="nav-button ${active}" data-view="${key}" type="button">
            <span class="nav-left">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
            </span>
            <span class="nav-count">${counts[key] || 0}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderQueue() {
    const queueItems = uploads.filter((item) => item.status !== "completed");
    els.queueBadge.textContent = queueItems.length;
    els.queueList.innerHTML = queueItems
      .map((item) => {
        const tone = item.status === "processing" ? "processing" : "warning";
        return `
          <button class="queue-item queue-tone-${tone}" data-note-id="${item.noteId}" type="button">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${item.kind} · ${statusLabel(item.status)}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderFolders() {
    const counts = state.notes.reduce((acc, note) => {
      acc[note.folderId] = (acc[note.folderId] || 0) + 1;
      return acc;
    }, {});

    els.folderTree.innerHTML = folders
      .map((folder) => {
        const count = folder.id === "all" ? state.notes.length : counts[folder.id] || 0;
        const active = state.ui.selectedFolderId === folder.id ? "active" : "";
        return `
          <button class="folder-button ${active}" data-folder-id="${folder.id}" type="button">
            <span class="folder-title">
              <span class="folder-dot" style="background:${folder.color}"></span>
              <span>${escapeHtml(folder.name)}</span>
            </span>
            <span class="nav-count">${count}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderMain() {
    if (state.ui.view === "home") {
      els.dashboardView.hidden = false;
      els.timelineView.hidden = true;
      renderDashboard();
      return;
    }

    els.dashboardView.hidden = true;
    els.timelineView.hidden = false;

    if (state.ui.view === "daily") {
      renderDaily();
    } else if (state.ui.view === "agents") {
      renderAgentsTimeline();
    } else {
      renderTimeline();
    }
  }

  function renderDashboard() {
    const completed = state.notes.filter((note) => note.status === "completed").length;
    const companyCount = new Set(state.notes.map((note) => note.entity).filter(Boolean)).size;
    const processing = uploads.filter((item) => item.status === "processing").length;

    els.dashboardView.innerHTML = `
      <section class="metric-grid">
        ${metricTile("材料", state.notes.length)}
        ${metricTile("已整理", completed)}
        ${metricTile("处理中", processing)}
      </section>

      <section class="section-block">
        <div class="block-title">
          <span>工作区</span>
          <span class="nav-count">${companyCount} entities</span>
        </div>
        <div class="folder-card-grid">
          ${folders
            .filter((folder) => !folder.system && folder.id !== "archive")
            .map(renderFolderCard)
            .join("")}
        </div>
      </section>

      <section class="section-block">
        <div class="block-title">
          <span>最近笔记</span>
          <span class="nav-count">${formatDate(new Date().toISOString())}</span>
        </div>
        ${getFilteredNotes()
          .slice(0, 5)
          .map(renderNoteCard)
          .join("")}
      </section>

      <section class="section-block">
        <div class="block-title">
          <span>上传入口</span>
          <span class="nav-count">demo only</span>
        </div>
        ${uploads.map(renderUploadRow).join("")}
      </section>
    `;
  }

  function renderTimeline() {
    const notes = getFilteredNotes();
    els.timelineView.innerHTML = `
      <section class="section-block">
        <div class="block-title">
          <span>${viewMeta[state.ui.view]?.title || "资料流"}</span>
          <span class="nav-count">${notes.length} items</span>
        </div>
        ${notes.length ? notes.map(renderNoteCard).join("") : emptyInline("没有匹配的材料")}
      </section>
    `;
  }

  function renderDaily() {
    const notes = getFilteredNotes().slice(0, 4);
    els.timelineView.innerHTML = `
      <section class="brief-card">
        <h3>今日摘要</h3>
        <p>今天的重点是把上传材料、公司问题清单和周报素材串起来。这个区域未来可以由后端定时任务生成，当前只是本地 demo。</p>
      </section>
      <section class="section-block">
        <div class="block-title">
          <span>可进入 Daily Brief 的材料</span>
          <span class="nav-count">${notes.length}</span>
        </div>
        ${notes.map(renderNoteCard).join("")}
      </section>
    `;
  }

  function renderAgentsTimeline() {
    els.timelineView.innerHTML = `
      <section class="section-block">
        <div class="block-title">
          <span>Agent 任务</span>
          <span class="nav-count">mock</span>
        </div>
        ${agents
          .map(
            (agent) => `
              <div class="agent-card agent-${agent.state}">
                <strong>${escapeHtml(agent.title)}</strong>
                <span>${escapeHtml(agent.detail)} · ${agentStateLabel(agent.state)}</span>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="section-block">
        <div class="block-title">
          <span>处理队列</span>
          <span class="nav-count">${uploads.length}</span>
        </div>
        ${uploads.map(renderUploadRow).join("")}
      </section>
    `;
  }

  function renderEditor() {
    const note = getSelectedNote();
    els.emptyState.hidden = Boolean(note);
    els.editorPanel.hidden = !note;
    if (!note) return;

    els.titleInput.value = note.title;
    els.selectedMeta.innerHTML = `
      <span>${typeLabel(note.type)}</span>
      <span>${escapeHtml(folderName(note.folderId))}</span>
      <span>${formatDate(note.updatedAt)}</span>
      <span>${escapeHtml(note.entity || "No entity")}</span>
    `;
    els.folderSelect.innerHTML = folders
      .filter((folder) => !folder.system)
      .map((folder) => `<option value="${folder.id}" ${folder.id === note.folderId ? "selected" : ""}>${escapeHtml(folder.name)}</option>`)
      .join("");
    els.typeSelect.value = note.type;
    els.tagsInput.value = note.tags.join(", ");
    els.pinButton.textContent = note.pinned ? "取消置顶" : "置顶";
    els.sourceInput.value = note.source;
    els.viewInput.value = note.view;

    const showView = state.ui.editorTab === "view";
    els.sourceInput.hidden = showView;
    els.viewInput.hidden = !showView;
    els.sourceTabButton.classList.toggle("active", !showView);
    els.viewTabButton.classList.toggle("active", showView);
  }

  function renderContext() {
    const note = getSelectedNote();
    const related = getRelatedNotes(note);
    els.contextSummary.innerHTML = note
      ? `
        ${contextCard("当前实体", note.entity || "未设置")}
        ${contextCard("状态", statusLabel(note.status))}
        ${contextCard("标签", note.tags.length ? note.tags.join(" / ") : "暂无")}
      `
      : contextCard("当前实体", "未选择");

    els.relatedList.innerHTML = related.length
      ? related
          .map(
            (item) => `
              <button class="related-card" data-note-id="${item.id}" type="button">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(folderName(item.folderId))} · ${typeLabel(item.type)}</span>
              </button>
            `,
          )
          .join("")
      : emptyInline("暂无相关材料");

    els.agentList.innerHTML = agents
      .map(
        (agent) => `
          <div class="agent-card agent-${agent.state}">
            <strong>${escapeHtml(agent.title)}</strong>
            <span>${escapeHtml(agent.detail)}</span>
          </div>
        `,
      )
      .join("");
  }

  function metricTile(label, value) {
    return `<div class="metric-tile"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function renderFolderCard(folder) {
    const notes = state.notes.filter((note) => note.folderId === folder.id);
    const chips = notes
      .slice(0, 4)
      .map((note) => `<span class="sub-chip">${escapeHtml(note.title)}</span>`)
      .join("");
    return `
      <div class="folder-card">
        <button data-folder-id="${folder.id}" type="button">
          <div class="folder-card-header">
            <h3>${escapeHtml(folder.name)}</h3>
            <span class="nav-count">${notes.length}</span>
          </div>
          <div class="folder-chip-row">${chips || '<span class="nav-count">暂无内容</span>'}</div>
        </button>
      </div>
    `;
  }

  function renderNoteCard(note) {
    const active = state.ui.selectedNoteId === note.id ? "active" : "";
    const tags = note.tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("");
    return `
      <button class="note-card ${active}" data-note-id="${note.id}" type="button">
        <div class="note-title-row">
          <strong>${escapeHtml(note.title || "未命名")}</strong>
          <span class="type-pill">${typeLabel(note.type)}</span>
        </div>
        <div class="note-preview">${escapeHtml(note.view || note.source || "暂无内容")}</div>
        <div class="pill-row">${tags}</div>
        <div class="note-meta-row">
          <span>${note.pinned ? "Pinned" : "Recent"}</span>
          <span>${escapeHtml(folderName(note.folderId))}</span>
          <span>${formatDate(note.updatedAt)}</span>
        </div>
      </button>
    `;
  }

  function renderUploadRow(item) {
    return `
      <button class="upload-row" data-note-id="${item.noteId}" type="button">
        <span class="file-icon">${item.kind}</span>
        <span>
          <strong>${escapeHtml(item.title)}</strong>
          <span class="upload-meta">${escapeHtml(folderName(item.folderId))} · ${statusLabel(item.status)}</span>
        </span>
        <span class="status-label status-${item.status}">${statusLabel(item.status)}</span>
      </button>
    `;
  }

  function contextCard(label, value) {
    return `<div class="context-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function emptyInline(text) {
    return `<div class="brief-card"><p>${escapeHtml(text)}</p></div>`;
  }

  function getFilteredNotes() {
    const query = state.ui.query.trim().toLowerCase();
    return state.notes
      .filter((note) => {
        const matchesFolder =
          state.ui.selectedFolderId === "all" || note.folderId === state.ui.selectedFolderId;
        const matchesView =
          state.ui.view === "home" ||
          state.ui.view === "notes" ||
          state.ui.view === "search" ||
          state.ui.view === "daily" ||
          (state.ui.view === "company" && note.folderId === "company") ||
          state.ui.view === "agents";
        const haystack = `${note.title} ${note.source} ${note.view} ${note.tags.join(" ")} ${note.entity}`.toLowerCase();
        return matchesFolder && matchesView && (!query || haystack.includes(query));
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }

  function getSelectedNote() {
    const selected = state.notes.find((note) => note.id === state.ui.selectedNoteId) || null;
    if (state.ui.view === "home" || state.ui.view === "agents" || state.ui.view === "daily") {
      return selected || getFilteredNotes()[0] || null;
    }
    const visibleNotes = getFilteredNotes();
    if (selected && visibleNotes.some((note) => note.id === selected.id)) return selected;
    return visibleNotes[0] || selected || null;
  }

  function getRelatedNotes(note) {
    if (!note) return [];
    return state.notes
      .filter((item) => item.id !== note.id)
      .filter((item) => item.entity === note.entity || item.tags.some((tag) => note.tags.includes(tag)))
      .slice(0, 4);
  }

  function updateSelectedNote(patch) {
    const note = getSelectedNote();
    if (!note) return;
    Object.assign(note, patch, { updatedAt: new Date().toISOString() });
    state.ui.selectedNoteId = note.id;
    persistAndRender();
  }

  function createNote() {
    const folderId = state.ui.selectedFolderId !== "all" ? state.ui.selectedFolderId : "inbox";
    const now = new Date().toISOString();
    const note = {
      id: createId("note"),
      folderId,
      type: "note",
      title: "新材料",
      source: "",
      view: "",
      tags: [],
      entity: "",
      pinned: false,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    };
    state.notes.unshift(note);
    state.ui.view = "notes";
    state.ui.selectedNoteId = note.id;
    state.ui.editorTab = "source";
    persistAndRender();
    els.titleInput.focus();
    els.titleInput.select();
  }

  function createFolder() {
    alert("这个 starter 里先保留固定文件夹。下一步可以让 Codex 把文件夹也写进 state，并支持拖拽排序。");
  }

  function deleteSelectedNote() {
    const note = getSelectedNote();
    if (!note) return;
    if (!confirm(`删除「${note.title || "未命名"}」？`)) return;
    state.notes = state.notes.filter((item) => item.id !== note.id);
    state.ui.selectedNoteId = getFilteredNotes()[0]?.id || "";
    persistAndRender();
  }

  function mockUpload() {
    const now = new Date().toISOString();
    const note = {
      id: createId("upload"),
      folderId: "inbox",
      type: "transcript",
      title: "新上传材料",
      source: "这里模拟一个刚上传的文件。真实版本可以接 Supabase Storage / Cloudflare R2，再由后端触发转录和分析。",
      view: "等待处理。点击上方 AI 动作可以生成 mock 输出。",
      tags: ["上传", "待处理"],
      entity: "New Material",
      pinned: false,
      status: "processing",
      createdAt: now,
      updatedAt: now,
    };
    state.notes.unshift(note);
    state.ui.selectedNoteId = note.id;
    state.ui.view = "notes";
    state.ui.editorTab = "view";
    persistAndRender();
  }

  function runAiAction(action) {
    const note = getSelectedNote();
    if (!note) return;

    const output = {
      summary: `\n\n## AI 摘要\n\n这条材料围绕「${note.title}」展开。核心是把原始信息整理成可以复用的工作视图，并保留后续追问空间。`,
      actions: "\n\n## 行动项\n\n- 补充来源和日期。\n- 标记关联公司 / 项目 / 人物。\n- 判断是否进入 Daily Brief 或周报素材。",
      questions: "\n\n## 问题清单\n\n1. 这条材料支持什么判断？\n2. 哪些地方还缺证据？\n3. 下一次沟通应该问谁、问什么？",
      company: `\n\n## 公司视图\n\n实体：${note.entity || "未设置"}\n\n需要沉淀：业务变化、财务影响、竞争格局、管理层表述。`,
      weekly: "\n\n## 周报素材\n\n可归入本周研究进展，建议保留一句结论、两条证据和一个待验证问题。",
    }[action];

    updateSelectedNote({
      view: `${note.view || ""}${output}`,
      status: "completed",
    });
    state.ui.editorTab = "view";
    persistAndRender();
  }

  function createId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function normalizeTags(value) {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 10);
  }

  function folderName(folderId) {
    return folders.find((folder) => folder.id === folderId)?.name || "未分类";
  }

  function typeLabel(type) {
    return {
      note: "笔记",
      transcript: "转录",
      report: "研报",
      model: "模型",
      meeting: "会议",
    }[type] || "材料";
  }

  function statusLabel(status) {
    return {
      completed: "已完成",
      processing: "处理中",
      draft: "草稿",
    }[status] || status;
  }

  function agentStateLabel(stateValue) {
    return {
      ready: "Ready",
      working: "Working",
      paused: "Paused",
    }[stateValue] || stateValue;
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    if (target.dataset.view) {
      state.ui.view = target.dataset.view;
      if (target.dataset.view === "company") state.ui.selectedFolderId = "company";
      persistAndRender();
      return;
    }

    if (target.dataset.folderId) {
      state.ui.selectedFolderId = target.dataset.folderId;
      state.ui.view = target.dataset.folderId === "company" ? "company" : "notes";
      persistAndRender();
      return;
    }

    if (target.dataset.noteId) {
      state.ui.selectedNoteId = target.dataset.noteId;
      persistAndRender();
      return;
    }

    if (target.dataset.aiAction) {
      runAiAction(target.dataset.aiAction);
    }
  });

  els.searchInput.addEventListener("input", (event) => {
    state.ui.query = event.target.value;
    if (state.ui.query.trim()) state.ui.view = "search";
    persistAndRender();
  });

  els.newNoteButton.addEventListener("click", createNote);
  els.mockUploadButton.addEventListener("click", mockUpload);
  els.newFolderButton.addEventListener("click", createFolder);
  els.resetDemoButton.addEventListener("click", () => {
    if (!confirm("重置为新版示例数据？")) return;
    state = structuredClone(defaultState);
    persistAndRender();
  });
  els.deleteNoteButton.addEventListener("click", deleteSelectedNote);
  els.pinButton.addEventListener("click", () => {
    const note = getSelectedNote();
    if (note) updateSelectedNote({ pinned: !note.pinned });
  });
  els.sourceTabButton.addEventListener("click", () => {
    state.ui.editorTab = "source";
    persistAndRender();
  });
  els.viewTabButton.addEventListener("click", () => {
    state.ui.editorTab = "view";
    persistAndRender();
  });

  els.titleInput.addEventListener("input", (event) => updateSelectedNote({ title: event.target.value }));
  els.folderSelect.addEventListener("change", (event) => updateSelectedNote({ folderId: event.target.value }));
  els.typeSelect.addEventListener("change", (event) => updateSelectedNote({ type: event.target.value }));
  els.tagsInput.addEventListener("input", (event) => updateSelectedNote({ tags: normalizeTags(event.target.value) }));
  els.sourceInput.addEventListener("input", (event) => updateSelectedNote({ source: event.target.value }));
  els.viewInput.addEventListener("input", (event) => updateSelectedNote({ view: event.target.value }));

  render();
})();
