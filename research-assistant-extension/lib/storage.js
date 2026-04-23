// const MAX_SESSION_EVENTS = 10000;
// const MAX_NOTES_PER_TASK = 500;

const MAX_SESSION_EVENTS = 10000;

export async function logHistoryEvent(taskId, eventType, tabId, url, snapshot) {
	const db = await openDB(); // Assuming you have a standard IDB open function
	const tx = db.transaction("sessions", "readwrite");
	const store = tx.objectStore("sessions");

	const event = {
		eventId: crypto.randomUUID(),
		taskId,
		timestamp: Date.now(),
		eventType,
		tabId,
		url,
		snapshot,
	};

	await store.add(event);

	// Rolling eviction limit
	const count = await store.count();
	if (count > MAX_SESSION_EVENTS) {
		const cursor = await store.openCursor(null, "next"); // Gets the oldest
		if (cursor) {
			await cursor.delete();
		}
	}
	return tx.complete;
}

export async function getTaskHistory(taskId) {
	const db = await openDB();
	const tx = db.transaction("sessions", "readonly");
	const store = tx.objectStore("sessions");
	const index = store.index("taskId"); // Requires a taskId index in your IDB init
	const events = await index.getAll(taskId);

	// Return sorted chronologically (newest first)
	return events.sort((a, b) => b.timestamp - a.timestamp);
}
