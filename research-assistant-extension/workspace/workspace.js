// workspace.js - Research workspace main logic with full implementations

// ============================================================================
// SAMPLE DATA FOR DEMO
// ============================================================================

const SAMPLE_DATA = {
	tasks: [
		{
			id: "task-1",
			title: "AI Research Paper",
			color: "#3B82F6",
			createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
			lastActiveAt: Date.now() - 2 * 60 * 60 * 1000,
			subtasks: [
				{
					id: "sub-1",
					title: "Transformer Models",
					tabs: [
						{
							id: "tab-1",
							title: "Attention Is All You Need",
							url: "arxiv.org/paper1",
							favicon: "📄",
							salienceScore: 0.9,
							timeSpent: 1247,
						},
						{
							id: "tab-2",
							title: "BERT: Pre-training",
							url: "arxiv.org/paper2",
							favicon: "📄",
							salienceScore: 0.75,
							timeSpent: 892,
						},
					],
				},
				{
					id: "sub-2",
					title: "Background Reading",
					tabs: [
						{
							id: "tab-3",
							title: "Neural Networks Intro",
							url: "wikipedia.org",
							favicon: "🌐",
							salienceScore: 0.5,
							timeSpent: 456,
						},
					],
				},
			],
			salience: 0.85,
			metadata: { totalTimeSpent: 8340, tabCount: 3, noteCount: 5 },
		},
		{
			id: "task-2",
			title: "Product Design Research",
			color: "#10B981",
			createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
			lastActiveAt: Date.now() - 5 * 60 * 60 * 1000,
			subtasks: [
				{
					id: "sub-3",
					title: "Competitor Analysis",
					tabs: [
						{
							id: "tab-4",
							title: "Figma Design System",
							url: "figma.com",
							favicon: "🎨",
							salienceScore: 0.8,
							timeSpent: 2340,
						},
						{
							id: "tab-5",
							title: "Adobe XD Features",
							url: "adobe.com",
							favicon: "🎨",
							salienceScore: 0.6,
							timeSpent: 1120,
						},
					],
				},
				{
					id: "sub-4",
					title: "User Research",
					tabs: [
						{
							id: "tab-6",
							title: "UX Best Practices",
							url: "nngroup.com",
							favicon: "📊",
							salienceScore: 0.7,
							timeSpent: 1890,
						},
					],
				},
			],
			salience: 0.7,
			metadata: { totalTimeSpent: 5350, tabCount: 3, noteCount: 8 },
		},
		{
			id: "task-3",
			title: "Meeting Preparation",
			color: "#F59E0B",
			createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
			lastActiveAt: Date.now() - 30 * 60 * 1000,
			subtasks: [
				{
					id: "sub-5",
					title: "Agenda Items",
					tabs: [
						{
							id: "tab-7",
							title: "Q4 Strategy Doc",
							url: "docs.google.com",
							favicon: "📝",
							salienceScore: 0.9,
							timeSpent: 780,
						},
					],
				},
			],
			salience: 0.65,
			metadata: { totalTimeSpent: 780, tabCount: 1, noteCount: 3 },
		},
	],
	notes: [
		{
			id: "note-1",
			title: "Key Transformer Insights",
			content: "Self-attention mechanism allows...",
			type: "note",
			taskId: "task-1",
			tags: ["important", "cite"],
			createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
			citations: 3,
		},
		{
			id: "note-2",
			title: "Research Questions",
			content: "How does attention mechanism improve over RNNs?",
			type: "note",
			taskId: "task-1",
			tags: ["todo", "question"],
			createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
			citations: 0,
		},
		{
			id: "note-3",
			title: "BERT Training Details",
			content: "Pre-training on large corpus, then fine-tuning...",
			type: "clip",
			taskId: "task-1",
			tags: ["technical"],
			createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
			citations: 2,
		},
		{
			id: "note-4",
			title: "Design System Patterns",
			content: "Atomic design principles, component libraries...",
			type: "note",
			taskId: "task-2",
			tags: ["design", "patterns"],
			createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
			citations: 1,
		},
		{
			id: "note-5",
			title: "User Feedback Summary",
			content: "Users want simpler navigation, better search...",
			type: "note",
			taskId: "task-2",
			tags: ["feedback", "important"],
			createdAt: Date.now() - 6 * 60 * 60 * 1000,
			citations: 0,
		},
		{
			id: "note-6",
			title: "Meeting Action Items",
			content:
				"1. Review budget proposal\n2. Assign team leads\n3. Set Q1 goals",
			type: "note",
			taskId: "task-3",
			tags: ["todo", "meeting"],
			createdAt: Date.now() - 1 * 60 * 60 * 1000,
			citations: 0,
		},
	],
	recentActivity: [
		{
			type: "note_created",
			title: "Created note: Meeting Action Items",
			time: Date.now() - 1 * 60 * 60 * 1000,
			icon: "📝",
		},
		{
			type: "tab_opened",
			title: "Opened: Q4 Strategy Doc",
			time: Date.now() - 2 * 60 * 60 * 1000,
			icon: "🔗",
		},
		{
			type: "annotation_created",
			title: "Highlighted text in BERT paper",
			time: Date.now() - 3 * 60 * 60 * 1000,
			icon: "✏️",
		},
		{
			type: "task_updated",
			title: "Updated task: Product Design Research",
			time: Date.now() - 5 * 60 * 60 * 1000,
			icon: "📋",
		},
		{
			type: "note_created",
			title: "Created note: User Feedback Summary",
			time: Date.now() - 6 * 60 * 60 * 1000,
			icon: "📝",
		},
	],
	inbox: [
		{
			id: "inbox-1",
			title: "Screenshot from lecture",
			type: "image",
			source: "phone",
			time: Date.now() - 2 * 60 * 60 * 1000,
		},
		{
			id: "inbox-2",
			title: "Voice memo: Research ideas",
			type: "audio",
			source: "phone",
			time: Date.now() - 4 * 60 * 60 * 1000,
		},
		{
			id: "inbox-3",
			title: "Quick note about paper",
			type: "text",
			source: "clipboard",
			time: Date.now() - 1 * 24 * 60 * 60 * 1000,
		},
	],
	sessionEvents: [
		{
			eventId: "m1",
			taskId: "task-1",
			timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
			eventType: "NOTE_CREATED",
			url: "https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction",
			snapshot: {
				title: "HCI Overview",
				content:
					"Human-computer interaction studies the design and use of computer technology.",
			},
		},
		{
			eventId: "m2",
			taskId: "task-1",
			timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
			eventType: "ANNOTATION_ADDED",
			url: "https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction",
			snapshot: {
				color: "#FFEB3B",
				selectedText:
					"focused on the interfaces between people and computers",
			},
		},
		{
			eventId: "m3",
			taskId: "task-2",
			timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
			eventType: "CLIP_CREATED",
			url: "https://developer.chrome.com/docs/extensions/",
			snapshot: {
				title: "Extensions API",
				excerpt:
					"Extensions are software programs, built on web technologies...",
			},
		},
	],
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let currentView = "dashboard";
let currentData = SAMPLE_DATA;

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
	//initializeWorkspace();
	setupEventListeners();
	loadData();
});

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function setupEventListeners() {
	document
		.querySelectorAll(".view-tab")
		.forEach((tab) =>
			tab.addEventListener("click", () => switchView(tab.dataset.view)),
		);

	document
		.getElementById("global-search")
		?.addEventListener("input", handleGlobalSearch);
	document
		.getElementById("new-task-from-dashboard")
		?.addEventListener("click", createNewTask);
	document
		.getElementById("settings-btn")
		?.addEventListener("click", openSettings);
}

// ============================================================================
// VIEW SWITCHING
// ============================================================================

function switchView(viewName) {
	currentView = viewName;
	document
		.querySelectorAll(".view-tab")
		.forEach((tab) =>
			tab.classList.toggle("active", tab.dataset.view === viewName),
		);
	document
		.querySelectorAll(".view-container")
		.forEach((view) => view.classList.remove("active"));
	document.getElementById(`${viewName}-view`)?.classList.add("active");

	switch (viewName) {
		case "dashboard":
			renderDashboard();
			break;
		case "graph":
			renderGraph();
			break;
		case "notes":
			renderNotes();
			break;
		case "replay":
			renderReplay();
			break;
	}
}

// ============================================================================
// DASHBOARD
// ============================================================================

function renderDashboard() {
	renderDashboardTasks();
	renderRecentActivity();
	renderQuickStats();
	renderQuickNotes();
	renderInbox();
}

function renderDashboardTasks() {
	const container = document.getElementById("dashboard-tasks");
	container.innerHTML = "";
	currentData.tasks.forEach((task) => {
		const taskEl = document.createElement("div");
		taskEl.className = "task-preview";
		taskEl.innerHTML = `
      <div class="task-preview-header" style="border-left-color: ${
			task.color
		};">
        <span class="task-preview-title">${task.title}</span>
        <span class="task-preview-count">${task.metadata.tabCount} tabs</span>
      </div>
      <div class="task-preview-meta">
        <span>${task.metadata.noteCount} notes</span>
        <span>${formatTime(task.metadata.totalTimeSpent)}</span>
      </div>
    `;
		taskEl.addEventListener("click", () => openTask(task.id));
		container.appendChild(taskEl);
	});
}

function renderRecentActivity() {
	const container = document.getElementById("recent-activity");
	container.innerHTML = "";

	if (
		!currentData.recentActivity ||
		currentData.recentActivity.length === 0
	) {
		container.innerHTML = '<p class="empty-message">No recent activity</p>';
		return;
	}
	currentData.recentActivity?.forEach((activity) => {
		const el = document.createElement("div");
		el.className = "activity-item";
		el.innerHTML = `<span class="activity-icon">${activity.icon}</span>
      <div class="activity-content">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-time">${formatRelativeTime(activity.time)}</div>
      </div>`;
		container.appendChild(el);
	});
}

function renderQuickStats() {
	const totalTabs = currentData.tasks.reduce(
		(sum, t) => sum + t.metadata.tabCount,
		0,
	);
	const totalTime = currentData.tasks.reduce(
		(sum, t) => sum + t.metadata.totalTimeSpent,
		0,
	);
	document.getElementById("stat-tasks").textContent =
		currentData.tasks.length;
	document.getElementById("stat-tabs").textContent = totalTabs;
	document.getElementById("stat-notes").textContent =
		currentData.notes.length;
	document.getElementById("stat-time").textContent = `${Math.round(
		totalTime / 3600,
	)}h`;
}

function renderQuickNotes() {
	const container = document.getElementById("quick-notes");
	container.innerHTML = "";
	currentData.notes
		.sort((a, b) => b.createdAt - a.createdAt)
		.slice(0, 3)
		.forEach((note) => {
			const el = document.createElement("div");
			el.className = "note-preview";
			el.innerHTML = `<div class="note-preview-title">${note.title}</div>
      <div class="note-preview-content">${note.content.substring(
			0,
			80,
		)}...</div>
      <div class="note-preview-tags">${note.tags
			.map((tag) => `<span class="tag">${tag}</span>`)
			.join("")}</div>`;
			el.addEventListener("click", () => openNote(note.id));
			container.appendChild(el);
		});
}

function renderInbox() {
	const container = document.getElementById("inbox-items");
	const countBadge = document.getElementById("inbox-count");
	container.innerHTML = "";

	if (!currentData.inbox || currentData.inbox.length === 0) {
		currentData.inbox = [
			{
				id: "inbox-sample",
				title: "Inbox from iphone",
				type: "text",
				source: "",
				time: Date.now(),
			},
			{
				id: "inbox-sample-2",
				title: "Voice memo from meeting",
				type: "text",
				source: "",
				time: Date.now(),
			},
		];
	}

	countBadge.textContent = currentData.inbox.length;
	if (currentData.inbox.length === 0) {
		container.innerHTML = '<p class="empty-message">No items in inbox</p>';
		return;
	}
	currentData.inbox.forEach((item) => {
		const el = document.createElement("div");
		el.className = "inbox-item";
		el.innerHTML = `<div class="inbox-icon">${getInboxIcon(item.type)}</div>
      <div class="inbox-content"><div class="inbox-title">${item.title}</div>
      <div class="inbox-meta">${item.source} • ${formatRelativeTime(
			item.time,
		)}</div></div>
      <button class="inbox-action" data-id="${item.id}">Process</button>`;
		container.appendChild(el);
	});
}

// ============================================================================
// NOTES VIEW
// ============================================================================

function renderNotes() {
	const container = document.getElementById("notes-list");
	container.innerHTML = "";
	currentData.notes.forEach((note) => {
		const el = document.createElement("div");
		el.className = "note-list-item";
		el.innerHTML = `<div class="note-list-title">${note.title}</div>
      <div class="note-list-preview">${note.content.substring(0, 100)}...</div>
      <div class="note-list-meta">
        <span class="note-type">${note.type}</span>
        ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>`;
		el.addEventListener("click", () => openNoteInEditor(note));
		container.appendChild(el);
	});
}

function openNoteInEditor(note) {
	const editor = document.getElementById("note-editor");
	editor.innerHTML = `<div class="note-editor-header">
    <input type="text" class="note-title-input" value="${note.title}">
    <button class="save-note-btn">Save</button>
  </div>
  <div class="note-editor-body">
    <textarea class="note-content-textarea">${note.content}</textarea>
  </div>
  <div class="note-editor-footer">
    <div class="note-tags">${note.tags
		.map(
			(tag) =>
				`<span class="tag">${tag} <button class="remove-tag">×</button></span>`,
		)
		.join("")}<button class="add-tag-btn">+ Add Tag</button></div>
    <div class="note-meta-info"><span>Created: ${new Date(
		note.createdAt,
	).toLocaleDateString()}</span><span>${note.citations} citations</span></div>
  </div>`;

	// Save button handler
	editor.querySelector(".save-note-btn").addEventListener("click", () => {
		note.title = editor.querySelector(".note-title-input").value;
		note.content = editor.querySelector(".note-content-textarea").value;
		renderNotes();
		renderQuickNotes();
	});
}

// ============================================================================
// TASK ACTIONS (CHROME TAB GROUPS)
// ============================================================================

async function openTask(taskId) {
	const task = currentData.tasks.find((t) => t.id === taskId);
	if (!task) return;

	try {
		for (const subtask of task.subtasks) {
			// Open all tabs of this subtask and collect their IDs
			const tabIds = [];
			for (const tab of subtask.tabs) {
				const createdTab = await chrome.tabs.create({
					url: `https://${tab.url}`,
					active: false,
				});
				tabIds.push(createdTab.id);
			}

			// Group the tabs into a new tab group
			if (tabIds.length > 0) {
				const groupId = await chrome.tabs.group({ tabIds });
				// Optional: set group color and title
				await chrome.tabGroups.update(groupId, {
					title: subtask.title,
					color: task.color.replace("#", ""), // remove # for Chrome API
				});
			}
		}
	} catch (err) {
		console.error("Failed to open task tabs:", err);
	}
}

function openNote(noteId) {
	switchView("notes");
	const note = currentData.notes.find((n) => n.id === noteId);
	if (note) openNoteInEditor(note);
}

function createNewTask() {
	const name = prompt("Enter task name:");
	if (name) {
		const newTask = {
			id: "task-" + Date.now(),
			title: name,
			color: "#888",
			createdAt: Date.now(),
			lastActiveAt: Date.now(),
			subtasks: [],
			metadata: { totalTimeSpent: 0, tabCount: 0, noteCount: 0 },
		};
		currentData.tasks.push(newTask);
		renderDashboard();
	}
}

function openSettings() {
	alert("Settings panel would open here!");
}

function handleGlobalSearch(e) {
	const query = e.target.value.toLowerCase();
	console.log("Search for:", query);
	// Filter notes
	const filteredNotes = currentData.notes.filter(
		(n) =>
			n.title.toLowerCase().includes(query) ||
			n.content.toLowerCase().includes(query),
	);
	const container = document.getElementById("notes-list");
	container.innerHTML = "";
	filteredNotes.forEach((note) => {
		const el = document.createElement("div");
		el.className = "note-list-item";
		el.innerHTML = `<div class="note-list-title">${note.title}</div>
      <div class="note-list-preview">${note.content.substring(
			0,
			100,
		)}...</div>`;
		el.addEventListener("click", () => openNoteInEditor(note));
		container.appendChild(el);
	});
}

// ============================================================================
// GRAPH & REPLAY PLACEHOLDER
// ============================================================================

function renderGraph() {
	const container = document.getElementById("graph-canvas");
	container.innerHTML = "<p class='coming-soon'>Graph view coming soon!</p>";
}

function renderReplay() {
	// Find the container. Support both possible container IDs
	let container = document.getElementById("timeline-events");
	if (!container) container = document.getElementById("replay-view");
	if (!container) return;

	// Build the basic layout: Task selector + Grid
	container.innerHTML = `
		<div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #eee;">
			<label for="replay-task-selector" style="font-weight: 600; margin-right: 12px; color: #333;">Select Task to Replay:</label>
			<select id="replay-task-selector" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; min-width: 250px;">
				${currentData.tasks.map((t) => `<option value="${t.id}">${t.title}</option>`).join("")}
			</select>
		</div>
		<div id="replay-grid" class="replay-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;"></div>
	`;

	const taskSelector = document.getElementById("replay-task-selector");
	const grid = document.getElementById("replay-grid");

	// Listen for changes
	taskSelector.addEventListener("change", (e) => {
		renderSessionEventsForTask(e.target.value, grid);
	});

	// Initial render for the first task
	if (currentData.tasks.length > 0) {
		renderSessionEventsForTask(currentData.tasks[0].id, grid);
	}
}

function renderSessionEventsForTask(taskId, grid) {
	grid.innerHTML = "";

	const events = (currentData.sessionEvents || []).filter(
		(e) => e.taskId === taskId,
	);

	if (events.length === 0) {
		grid.innerHTML =
			"<p style='grid-column: 1 / -1; color: #666;'>No session history recorded for this task yet.</p>";
		return;
	}

	const grouped = groupEventsByDay(events);

	for (const [date, dayEvents] of Object.entries(grouped)) {
		const dayHeader = document.createElement("h3");
		dayHeader.textContent = date;
		dayHeader.className = "replay-date-header";
		dayHeader.style.gridColumn = "1 / -1";
		dayHeader.style.marginTop = "20px";
		dayHeader.style.borderBottom = "2px solid #f0f0f0";
		dayHeader.style.paddingBottom = "8px";
		grid.appendChild(dayHeader);

		dayEvents.forEach((event) => {
			const card = document.createElement("div");
			card.className = "replay-card";
			card.style.cssText =
				"background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; cursor: pointer; display: flex; flex-direction: column; gap: 8px; transition: transform 0.2s ease, box-shadow 0.2s ease;";

			let title = event.eventType.replace("_", " ");
			let excerpt = "";
			let badgeColor = "#E8F5E9";
			let badgeTextColor = "#2E7D32";

			if (event.eventType.includes("ANNOTATION")) {
				badgeColor = "#FFFDE7";
				badgeTextColor = "#F57F17";
			} else if (event.eventType.includes("CLIP")) {
				badgeColor = "#E3F2FD";
				badgeTextColor = "#0288D1";
			}

			if (event.snapshot) {
				title = event.snapshot.title || title;
				excerpt =
					event.snapshot.content ||
					event.snapshot.selectedText ||
					event.snapshot.excerpt ||
					"";
			}

			card.innerHTML = `
				<div style="display: flex; justify-content: space-between; align-items: center;">
					<span class="replay-badge" style="font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 12px; text-transform: uppercase; background: ${badgeColor}; color: ${badgeTextColor};">${event.eventType.split("_")[0]}</span>
					<div style="font-size: 11px; color: #888;">${new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
				</div>
				<div style="font-weight: 600; color: #333; margin-top: 4px;">${title}</div>
				<div style="font-size: 13px; color: #555; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; background: #fafafa; padding: 8px; border-radius: 4px; font-style: italic;">
					"${excerpt}"
				</div>
			`;

			card.onmouseenter = () => {
				card.style.transform = "translateY(-2px)";
				card.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
				card.style.borderColor = "#FF9800";
			};
			card.onmouseleave = () => {
				card.style.transform = "none";
				card.style.boxShadow = "none";
				card.style.borderColor = "#e0e0e0";
			};

			card.onclick = () => {
				chrome.runtime.sendMessage({ action: "RECALL_EVENT", event });
			};

			grid.appendChild(card);
		});
	}
}

// ============================================================================
// DATA LOADING
// ============================================================================

async function loadData() {
	// try {
	// 	const response = await chrome.runtime.sendMessage({
	// 		action: "get_workspace_state",
	// 	});
	// 	if (response && response.tasks && response.tasks.length > 0)
	// 		currentData = response;
	// 	else currentData = SAMPLE_DATA;
	// } catch (e) {
	// 	currentData = SAMPLE_DATA;
	// }

	currentData = SAMPLE_DATA;
	renderDashboard();
}

// Formats seconds into human-readable time, e.g., 1247 -> "20m 47s"
function formatTime(seconds) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	let parts = [];
	if (h > 0) parts.push(`${h}h`);
	if (m > 0) parts.push(`${m}m`);
	if (s > 0 && h === 0) parts.push(`${s}s`); // show seconds only if less than 1 hour
	return parts.join(" ") || "0s";
}

// Formats a timestamp into a relative string, e.g., "2h ago"
function formatRelativeTime(timestamp) {
	const diff = Date.now() - timestamp;
	const sec = Math.floor(diff / 1000);
	const min = Math.floor(sec / 60);
	const hr = Math.floor(min / 60);
	const day = Math.floor(hr / 24);

	if (day > 0) return `${day}d ago`;
	if (hr > 0) return `${hr}h ago`;
	if (min > 0) return `${min}m ago`;
	return `${sec}s ago`;
}

// Optional: icon for inbox items
function getInboxIcon(type) {
	switch (type) {
		case "image":
			return "🖼️";
		case "audio":
			return "🎵";
		case "text":
			return "📝";
		default:
			return "📎";
	}
}

function groupEventsByDay(events) {
	return events.reduce((groups, event) => {
		const date = new Date(event.timestamp).toLocaleDateString(undefined, {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
		if (!groups[date]) groups[date] = [];
		groups[date].push(event);
		return groups;
	}, {});
}
