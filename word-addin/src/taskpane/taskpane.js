Office.onReady((info) => {
	if (info.host === Office.HostType.Word) {
		document.getElementById("search-btn").onclick = handleSearch;
		document.getElementById("settings-btn").onclick = configureFolder;

		// Tab switching
		document.querySelectorAll(".tab").forEach((tab) => {
			tab.addEventListener("click", () => switchTab(tab.dataset.tab));
		});

		loadNotes();
	}
});

async function loadNotes() {
	const notes = dataReader.getNotes();
	renderNotesList(notes);
}

function renderNotesList(notes) {
	const container = document.getElementById("notes-list");
	container.innerHTML = "";

	if (notes.length === 0) {
		container.innerHTML =
			'<p class="empty-state">No notes found. Configure your shared folder to sync data.</p>';
		return;
	}

	notes.forEach((note) => {
		const noteEl = createNoteElement(note);
		container.appendChild(noteEl);
	});
}

function createNoteElement(note) {
	const el = document.createElement("div");
	el.className = "note-item";
	el.innerHTML = `
    <div class="note-header">
      <h3 class="note-title">${escapeHtml(note.title)}</h3>
      <button class="insert-btn" data-note-id="${note.id}">Insert</button>
    </div>
    <div class="note-content">${escapeHtml(note.content).substring(
		0,
		150
	)}...</div>
    <div class="note-meta">
      ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
  `;

	el.querySelector(".insert-btn").addEventListener("click", () =>
		insertNote(note)
	);
	return el;
}

async function insertNote(note) {
	await Word.run(async (context) => {
		const range = context.document.getSelection();
		range.insertText(`\n\n${note.content}\n\n`, Word.InsertLocation.end);

		// Insert citation
		const citation = `[${note.title}]`;
		range.insertText(citation, Word.InsertLocation.end);

		await context.sync();
		showNotification("Note inserted successfully!");
	});
}

async function handleSearch() {
	const query = document.getElementById("search-input").value;
	const results = dataReader.searchNotes(query);
	renderNotesList(results);
}

function switchTab(tabName) {
	// Hide all tabs
	document
		.querySelectorAll(".tab")
		.forEach((t) => t.classList.remove("active"));
	document
		.querySelectorAll(".tab-content")
		.forEach((c) => c.classList.remove("active"));

	// Show selected tab
	document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
	document.getElementById(`${tabName}-view`).classList.add("active");

	// Load data for tab
	if (tabName === "tasks") loadTasks();
	if (tabName === "annotations") loadAnnotations();
}

async function configureFolder() {
	// Show folder picker dialog
	const folderPath = prompt("Enter the path to your shared folder:");
	if (folderPath) {
		await dataReader.setDataFolder(folderPath);
		loadNotes();
	}
}

function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

function showNotification(message) {
	// Simple notification
	alert(message);
}

// Update UI when data changes
window.updateUI = (data) => {
	loadNotes();
};
