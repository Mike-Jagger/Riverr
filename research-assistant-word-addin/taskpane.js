// taskpane.js - Research Assistant Word Add-in Main Logic

let allNotes = [];
let filteredNotes = [];
let currentFilter = "all";
let selectedNote = null;

const MOCK_NOTES = [
	{
		id: "note-9",
		type: "note",
		title: "Sample Note 9",
		content: "This is the content of sample note 9.",
		excerpt: "Preview text...",
		tags: ["tag1", "tag2"],
		taskId: "task-1",
		sourceTitle: "Source Name",
		createdAt: Date.now(),
		updatedAt: Date.now(),
	},
];

// Initialize Office.js
Office.onReady((info) => {
	if (info.host === Office.HostType.Word) {
		console.log("Research Assistant Word Add-in loaded");
		initializeAddIn();
	}
});

function initializeAddIn() {
	// Load mock data
	loadNotes();

	// Setup event listeners
	setupEventListeners();

	// Initial render
	renderNotes();
	updateNoteCount();

	console.log("Add-in initialized");
}

function setupEventListeners() {
	// Search input
	const searchInput = document.getElementById("search-input");
	searchInput.addEventListener("input", handleSearch);

	// Filter tabs
	document.querySelectorAll(".filter-tab").forEach((tab) => {
		tab.addEventListener("click", handleFilterChange);
	});

	// Modal close
	document
		.getElementById("modal-close")
		.addEventListener("click", closeModal);

	// Modal buttons
	document.getElementById("copy-btn").addEventListener("click", handleCopy);
	document
		.getElementById("insert-btn")
		.addEventListener("click", handleInsert);

	// Click outside modal to close
	document.getElementById("note-modal").addEventListener("click", (e) => {
		if (e.target.id === "note-modal") {
			closeModal();
		}
	});
}

// ============================================================================
// DATA LOADING
// ============================================================================

function loadNotes() {
	showLoading();

	// Simulate loading delay
	setTimeout(() => {
		allNotes = MOCK_NOTES || [];
		filteredNotes = [...allNotes];
		hideLoading();
		renderNotes();
		updateNoteCount();
	}, 500);
}

// ============================================================================
// RENDERING
// ============================================================================

function renderNotes() {
	const container = document.getElementById("notes-list");
	const emptyState = document.getElementById("empty-state");

	// Clear container
	container.innerHTML = "";

	if (filteredNotes.length === 0) {
		container.style.display = "none";
		emptyState.style.display = "flex";
		return;
	}

	container.style.display = "block";
	emptyState.style.display = "none";

	// Render each note
	filteredNotes.forEach((note) => {
		const noteElement = createNoteElement(note);
		container.appendChild(noteElement);
	});
}

function createNoteElement(note) {
	const div = document.createElement("div");
	div.className = "note-item";
	div.dataset.noteId = note.id;

	// Format date
	const dateStr = formatDate(note.createdAt);

	// Create tags HTML
	const tagsHtml = note.tags
		.slice(0, 3)
		.map((tag) => `<span class="note-tag">#${tag}</span>`)
		.join("");

	const moreTagsHtml =
		note.tags.length > 3
			? `<span class="note-tag">+${note.tags.length - 3}</span>`
			: "";

	div.innerHTML = `
    <div class="note-item-header">
      <div class="note-item-title">${escapeHtml(note.title)}</div>
      <div class="note-item-type type-${note.type}">${note.type}</div>
    </div>
    <div class="note-item-content">${escapeHtml(note.excerpt)}</div>
    <div class="note-item-footer">
      <div class="note-tags">
        ${tagsHtml}
        ${moreTagsHtml}
      </div>
      <div class="note-meta-text">${dateStr}</div>
    </div>
  `;

	// Click to open detail
	div.addEventListener("click", () => openNoteDetail(note));

	return div;
}

function openNoteDetail(note) {
	selectedNote = note;

	const modal = document.getElementById("note-modal");
	const title = document.getElementById("modal-title");
	const content = document.getElementById("modal-content");
	const tags = document.getElementById("modal-tags");
	const meta = document.getElementById("modal-meta");

	// Set content
	title.textContent = note.title;
	content.value = note.content;

	// Set tags
	tags.innerHTML = note.tags
		.map((tag) => `<span class="note-tag">#${tag}</span>`)
		.join("");

	// Set metadata
	const dateStr = formatDate(note.createdAt);
	const sourceStr = note.sourceTitle
		? `<span>Source: ${escapeHtml(note.sourceTitle)}</span>`
		: "";
	meta.innerHTML = `
    <span>Created: ${dateStr}</span>
    ${sourceStr}
    <span>Type: ${note.type}</span>
  `;

	// Show modal
	modal.style.display = "flex";
}

function closeModal() {
	const modal = document.getElementById("note-modal");
	modal.style.display = "none";
	selectedNote = null;
}

// ============================================================================
// FILTERING & SEARCHING
// ============================================================================

function handleFilterChange(e) {
	const filter = e.target.dataset.filter;
	currentFilter = filter;

	// Update active tab
	document.querySelectorAll(".filter-tab").forEach((tab) => {
		tab.classList.remove("active");
	});
	e.target.classList.add("active");

	// Apply filter
	applyFilters();
}

function handleSearch(e) {
	const query = e.target.value.toLowerCase().trim();
	applyFilters(query);
}

function applyFilters(searchQuery = "") {
	filteredNotes = allNotes.filter((note) => {
		// Type filter
		if (currentFilter !== "all" && note.type !== currentFilter) {
			return false;
		}

		// Search filter
		if (searchQuery) {
			const matchesTitle = note.title.toLowerCase().includes(searchQuery);
			const matchesContent = note.content
				.toLowerCase()
				.includes(searchQuery);
			const matchesTags = note.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery)
			);

			if (!matchesTitle && !matchesContent && !matchesTags) {
				return false;
			}
		}

		return true;
	});

	renderNotes();
	updateNoteCount();
}

// ============================================================================
// WORD OPERATIONS
// ============================================================================

async function handleCopy() {
	if (!selectedNote) return;

	try {
		// Copy to clipboard
		await navigator.clipboard.writeText(selectedNote.content);
		showToast("Copied to clipboard!");
	} catch (error) {
		console.error("Copy failed:", error);
		showToast("Failed to copy", true);
	}
}

async function handleInsert() {
	if (!selectedNote) return;

	try {
		await Word.run(async (context) => {
			// Get the current selection
			const range = context.document.getSelection();

			// Insert note title as heading
			const titleRange = range.insertText(
				selectedNote.title + "\n",
				Word.InsertLocation.end
			);
			titleRange.font.bold = true;
			titleRange.font.size = 14;

			// Insert note content
			const contentRange = titleRange.insertText(
				"\n" + selectedNote.content + "\n\n",
				Word.InsertLocation.end
			);
			contentRange.font.size = 11;

			// Insert source if available
			if (selectedNote.sourceTitle) {
				const sourceRange = contentRange.insertText(
					`Source: ${selectedNote.sourceTitle}\n\n`,
					Word.InsertLocation.end
				);
				sourceRange.font.italic = true;
				sourceRange.font.size = 10;
				sourceRange.font.color = "#6B7280";
			}

			// Sync to apply changes
			await context.sync();

			showToast("Note inserted successfully!");
			closeModal();
		});
	} catch (error) {
		console.error("Insert failed:", error);
		showToast("Failed to insert note", true);
	}
}

// ============================================================================
// UI HELPERS
// ============================================================================

function updateNoteCount() {
	const countEl = document.getElementById("note-count");
	const count = filteredNotes.length;
	countEl.textContent = `${count} note${count !== 1 ? "s" : ""}`;
}

function showLoading() {
	document.getElementById("loading-overlay").style.display = "flex";
}

function hideLoading() {
	document.getElementById("loading-overlay").style.display = "none";
}

function showToast(message, isError = false) {
	const toast = document.getElementById("toast");
	const toastMessage = document.getElementById("toast-message");

	toastMessage.textContent = message;
	toast.style.display = "block";

	if (isError) {
		toast.style.background = "#EF4444";
	} else {
		toast.style.background = "#111827";
	}

	setTimeout(() => {
		toast.style.display = "none";
	}, 3000);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatDate(timestamp) {
	const date = new Date(timestamp);
	const now = new Date();
	const diffMs = now - date;
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffMins < 60) {
		return `${diffMins}m ago`;
	} else if (diffHours < 24) {
		return `${diffHours}h ago`;
	} else if (diffDays < 7) {
		return `${diffDays}d ago`;
	} else {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year:
				date.getFullYear() !== now.getFullYear()
					? "numeric"
					: undefined,
		});
	}
}

function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}
