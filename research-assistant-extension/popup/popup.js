document
	.getElementById("open-workspace")
	.addEventListener("click", async () => {
		await chrome.runtime.sendMessage({ action: "open_workspace" });
		window.close();
	});

document.getElementById("new-task").addEventListener("click", async () => {
	// Open workspace with new task dialog
	await chrome.tabs.create({
		url: "workspace/workspace.html?action=new-task",
	});
	window.close();
});

document.getElementById("toggle-notes")?.addEventListener("click", async () => {
	try {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		console.log("Active tab:", tab);

		if (!tab || !tab.id) {
			console.warn("No active tab found or invalid tab id");
			return;
		}

		const response = await chrome.tabs.sendMessage(tab.id, {
			action: "toggle_notes_sidebar",
		});
		console.log("Message response:", response);
		window.close();
	} catch (err) {
		console.error("Error sending toggle_notes_sidebar:", err);
	}
});

// Load stats
async function loadStats() {
	const response = await chrome.runtime.sendMessage({
		action: "get_workspace_state",
	});

	if (response.tasks) {
		document.getElementById("active-tasks").textContent =
			response.tasks.length;
	}

	if (response.notes) {
		document.getElementById("total-notes").textContent =
			response.notes.length;
	}

	const tabs = await chrome.tabs.query({});
	document.getElementById("open-tabs").textContent = tabs.length;
}

loadStats();
