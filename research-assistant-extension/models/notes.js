/**
 * Note
 * @typedef {Object} Note
 *
 * @property {String} id
 * @property {ModelType} modelType // just easier for parsing and validation though not necessary with type definitions now in place
 *
 * @property {Task} task
 * @property {SubTask} subTask
 *
 * @property {String} title
 * @property {String} content
 * @property {Excerpt} excerpt // This will be used more by annotations
 *
 * @property {Tag[]} tags
 * @property {Link[]} links // model links (for now) or citations (TODO: future)
 * // property {} annotations // Already handled in links
 * // property {} isPinned // TODO: Pinned is determined by task/subtask/file/inbox/notespace associated to
 * @property {Todo} TodoStatus
 *
 * @property {GraphCoordinates} graphCoordinates // TODO: Should probably be stored in personal knowledge graph workspace
 * @property {CanvasCoordinates} canvasCoordinates // TODO: Should probably be stored in open canvas workspace
 *
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {number} accessedAt
 * @property {VersionHistory} versionHistory // TODO: should probably be stored in version control manager. Interface with this property and concrete methods to retrieve/display it cleanly (could be retrieved from DB/provided History type/interface for instance)
 *
 * @property {Salience} salience // dedicated type // for CalculateMetrics interface
 * @property {Productivity} productivity // interface // for CalculateMetrics interface
 * @property {ArchiveHistory} // getLastArchived, isArchived, archivedAt // Should probably be handled in archive manager. interface ... bla bla. In addition, could leverage the bookmarks api from chrome to molest this part properly. i.e, could have a dedicated type Archive
 * @property {VisitHistory} // getVisitCount && getlastVisited // TODO: could have some kind of functionality extension but I digress for now
 */

// TODO: actually defining the behaviours of NOte and removing the typedef
class Note {}

const sampleNotes = [
	{
		id: "sample-note-1",
		type: "note",
		taskId: "sample-task-1",
		subtaskId: "sample-sub-1",
		sourceTabId: "sample-tab-1",
		title: "Key Transformer Insights",
		content:
			"Self-attention mechanism allows the model to weigh the importance of different words in a sentence. This is fundamentally different from RNNs which process sequentially. The transformer can parallelize computation across all positions, making it much more efficient for training on GPUs.",
		excerpt: "",
		tags: ["important", "cite", "attention"],
		linkedNotes: [],
		linkedTabs: ["sample-tab-1"],
		linkedFiles: [],
		citations: 3,
		createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
		updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
		accessedAt: Date.now() - 2 * 60 * 60 * 1000,
		isPinned: false,
		isTodo: false,
		todoStatus: "pending",
		annotations: [],
		position: { x: 0, y: 0 },
		versionHistory: [],
	},
];
