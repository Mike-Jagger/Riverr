// background/service-worker.js - Main background service worker
// Handles all extension events, tab monitoring, and coordination

// Import modules
import { SessionLogger } from "./session-logger.js";
import { initializeSampleData } from "../lib/sample-data.js";

// ============================================================================
// INITIALIZATION
// ============================================================================

const sessionLogger = new SessionLogger();
let currentSessionId = null;
let activeTasks = new Map();
let db = null;

// Initialize IndexedDB connection
async function initDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("ResearchAssistantDB", 1);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};

		request.onupgradeneeded = (event) => {
			const database = event.target.result;

			if (!database.objectStoreNames.contains("tasks")) {
				const taskStore = database.createObjectStore("tasks", {
					keyPath: "id",
				});
				taskStore.createIndex("lastActiveAt", "lastActiveAt", {
					unique: false,
				});
			}

			if (!database.objectStoreNames.contains("tabs")) {
				const tabStore = database.createObjectStore("tabs", {
					keyPath: "id",
				});
				tabStore.createIndex("taskId", "taskId", { unique: false });
				tabStore.createIndex("chromeTabId", "chromeTabId", {
					unique: false,
				});
			}

			if (!database.objectStoreNames.contains("notes")) {
				const noteStore = database.createObjectStore("notes", {
					keyPath: "id",
				});
				noteStore.createIndex("taskId", "taskId", { unique: false });
			}

			if (!database.objectStoreNames.contains("sessionEvents")) {
				const eventStore = database.createObjectStore("sessionEvents", {
					keyPath: "id",
				});
				eventStore.createIndex("sessionId", "sessionId", {
					unique: false,
				});
				eventStore.createIndex("timestamp", "timestamp", {
					unique: false,
				});
			}

			if (!database.objectStoreNames.contains("settings")) {
				database.createObjectStore("settings", { keyPath: "key" });
			}

			// TODO: Resolve with DB if this is an intermittent request (i.e separate request response other than
			// onSuccess or sumn IDK when function is called)
		};
	});
}

// Initialize on extension load
chrome.runtime.onInstalled.addListener(async (details) => {
	console.log("Research Assistant installed:", details.reason);

	// TODO: db = initDB(); instead of doing it within the initDB() function
	await initDB();

	if (details.reason === "install") {
		await initializeExtension();
	}
});

chrome.runtime.onStartup.addListener(async () => {
	// TODO: db = initDB(); same comment as above
	await initDB();
	await startNewSession();
});

async function initializeExtension() {
	// Create default settings
	await saveToStorage("settings", {
		key: "settings",
		value: {
			autoGroupTabs: true,
			salienceIndicators: true,
			showProductivityReports: true,
			edgeLighting: false,
		},
	});

	// Initialize sample data for demo
	// const { initializeSampleData } = await import("../lib/sample-data.js");
	if (db) {
		await initializeSampleData({
			add: (store, item) => saveToStorage(store, item),
			get: (store, id) => getFromStorage(store, id),
			getAll: (store) => getAllFromStorage(store),
		});
	}

	// Open welcome page
	chrome.tabs.create({
		url: chrome.runtime.getURL("workspace/workspace.html?welcome=true"),
	});

	await startNewSession();
}

async function startNewSession() {
	currentSessionId = generateUUID();
	await sessionLogger.startSession(currentSessionId);
	console.log("New session started:", currentSessionId);
}

// ============================================================================
// TAB MONITORING & EVENT TRACKING
// ============================================================================

chrome.tabs.onCreated.addListener(async (tab) => {
	await sessionLogger.logEvent({
		sessionId: currentSessionId,
		eventType: "tab_open", // TODO: event_type.TAB_OPEN use constants boi
		tabId: tab.id.toString(),
		data: {
			url: tab.url,
			title: tab.title,
			openerTabId: tab.openerTabId,
		},
	});
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		await sessionLogger.logEvent({
			sessionId: currentSessionId,
			eventType: "tab_loaded", // TODO: event_type.TAB_LOADED same as constants
			tabId: tabId.toString(),
			data: {
				url: tab.url,
				title: tab.title,
			},
		});
	}
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
	await sessionLogger.logEvent({
		sessionId: currentSessionId,
		eventType: "tab_close", // TODO: event_type.TAB_CLOSED same as constants
		tabId: tabId.toString(),
		data: {
			windowClosing: removeInfo.windowClosing,
		},
	});
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
	const tab = await chrome.tabs.get(activeInfo.tabId);

	await sessionLogger.logEvent({
		sessionId: currentSessionId,
		eventType: "tab_switch", // TODO: event_type.TAB_SWITCH same as constants

		tabId: activeInfo.tabId.toString(),
		data: {
			url: tab.url,
			title: tab.title,
		},
	});
});

// ============================================================================
// CONTEXT MENU
// ============================================================================

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "save-clip",
		title: "Save as Clip",
		contexts: ["selection"],
	});

	chrome.contextMenus.create({
		id: "add-note",
		title: "Add Note",
		contexts: ["selection"],
	});

	chrome.contextMenus.create({
		id: "highlight-yellow",
		title: "Highlight (Yellow)",
		contexts: ["selection"],
	});
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	const action = info.menuItemId;
	const selection = info.selectionText;

	switch (action) {
		case "save-clip":
			await handleSaveClip(tab, selection);
			break;
		case "add-note":
			await chrome.tabs.sendMessage(tab.id, {
				action: "open_note_popup",
				data: { selectedText: selection },
			});
			break;
		case "highlight-yellow":
			await chrome.tabs.sendMessage(tab.id, {
				action: "create_highlight",
				data: { selectedText: selection, color: "#FFEB3B" },
			});
			break;
	}
});

// ============================================================================
// MESSAGE HANDLING
// ============================================================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	handleMessage(message, sender)
		.then(sendResponse)
		.catch((error) => {
			console.error("Message handling error:", error);
			sendResponse({ error: error.message });
		});
	return true; // Keep channel open for async response
});

async function handleMessage(message, sender) {
	const { action, data } = message;

	switch (action) {
		case "log_event":
			await sessionLogger.logEvent({
				sessionId: currentSessionId,
				...data,
			});
			return { success: true };

		case "get_all_tasks":
			const tasks = await getAllTasksWithDetails();
			return { tasks };

		case "create_task":
			await saveToStorage("tasks", data);
			return { success: true, task: data };

		case "create_note":
			const noteId = generateUUID();
			const note = { id: noteId, ...data, createdAt: Date.now() };
			await saveToStorage("notes", note);
			return { success: true, note };

		case "get_notes_count":
			const notes = await getAllFromStorage("notes");
			return { count: notes.length };

		case "open_task_tabs":
			await openTaskTabs(data.taskId);
			return { success: true };

		case "open_workspace":
			await chrome.tabs.create({
				url: chrome.runtime.getURL("workspace/workspace.html"),
			});
			return { success: true };

		case "get_workspace_state":
			const state = await getWorkspaceState();
			return state;

		case "calculate_salience":
			const salience = calculateTabSalience(data.tabId);
			return salience;

		case "get_notes_for_page": {
			const allNotes = await getAllFromStorage("notes");
			const pageUrl = data?.url || "";
			// Match notes saved from the same page
			const notesForPage = allNotes.filter(
				(n) => n.pageUrl && n.pageUrl.startsWith(pageUrl)
			);
			return { notes: notesForPage };
		}

		default:
			return { error: "Unknown action" };
	}
}

// ============================================================================
// COMMANDS
// ============================================================================

chrome.commands.onCommand.addListener(async (command) => {
	const [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});

	switch (command) {
		case "toggle-notes-sidebar":
			await chrome.tabs.sendMessage(tab.id, {
				action: "toggle_notes_sidebar",
			});
			break;
		case "open-workspace":
			await chrome.tabs.create({
				url: chrome.runtime.getURL("workspace/workspace.html"),
			});
			break;
	}
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function handleSaveClip(tab, selection) {
	// TODO: check note on clip vs annotation/note
	const clip = {
		id: generateUUID(),
		type: "clip",
		excerpt: selection,
		content: selection,
		title: `Clip from ${tab.title}`,
		sourceTabId: tab.id.toString(),
		taskId: null,
		tags: [],
		createdAt: Date.now(),
	};

	await saveToStorage("notes", clip);

	await chrome.tabs.sendMessage(tab.id, {
		action: "show_notification", // TODO: no message handler defined
		data: { message: "Clip saved!" },
	});
}

async function getAllTasksWithDetails() {
	const tasks = await getAllFromStorage("tasks");
	const tabs = await getAllFromStorage("tabs");

	return tasks.map((task) => {
		const taskTabs = tabs.filter((t) => t.taskId === task.id);
		const subtaskMap = new Map();

		taskTabs.forEach((tab) => {
			if (!subtaskMap.has(tab.subtaskId)) {
				subtaskMap.set(tab.subtaskId, {
					id: tab.subtaskId,
					title: tab.subtaskId, // TODO: tab.subTask.name When you create proper models then fine
					tabs: [],
				});
			}
			subtaskMap.get(tab.subtaskId).tabs.push(tab);
		});

		return {
			...task,
			subtasks: Array.from(subtaskMap.values()),
		};
	});
}

// TODO: This is supposed to open sub-tasks (if defined) as tab groups then the associated tabs
async function openTaskTabs(taskId) {
	const tabs = await getAllFromStorage("tabs");
	const taskTabs = tabs.filter((t) => t.taskId === taskId);

	for (const tab of taskTabs) {
		await chrome.tabs.create({ url: tab.url });
	}
}

async function getWorkspaceState() {
	const [tasks, notes, tabs] = await Promise.all([
		getAllFromStorage("tasks"),
		getAllFromStorage("notes"),
		getAllFromStorage("tabs"),
	]);

	return { tasks, notes, tabs };
}

// TODO: will have to refer to research paper or the way the original tab salience was calcualted to give accurate measurement
function calculateTabSalience(tabId) {
	return {
		timeSpent: 1247,
		origin: "Google Search",
		visits: 8,
		productivity: 0.85,
	};
}

// TODO: Persisting with filesys for add-in integration
// ============================================================================
// STORAGE HELPERS
// ============================================================================

async function saveToStorage(storeName, item) {
	if (!db) await initDB();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([storeName], "readwrite");
		const store = transaction.objectStore(storeName);
		const request = store.put(item);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function getFromStorage(storeName, id) {
	if (!db) await initDB();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([storeName], "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.get(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function getAllFromStorage(storeName) {
	if (!db) await initDB();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction([storeName], "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.getAll();

		request.onsuccess = () => resolve(request.result || []);
		request.onerror = () => reject(request.error);
	});
}

// TODO: Well, gotta check existing ID's before generating new ones
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
