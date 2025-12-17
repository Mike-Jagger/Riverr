/**
 * Note
 * @typedef {Object} Note
 *
 * @property {String} id
 * @property {ModelType} type // just easier for parsing and validation though not necessary with type definitions now in place
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
 * @property {GraphPositions} graphPositions // TODO: Should probably be stored in personal knowledge graph workspace
 * @property {CanvasPositions} canvasPositions // TODO: Should probably be stored in open canvas workspace
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
	{
		id: "sample-note-2",
		type: "note",
		taskId: "sample-task-1",
		subtaskId: "sample-sub-1",
		sourceTabId: null,
		title: "Research Questions",
		content:
			"Need to investigate:\n1. How does attention mechanism improve over RNNs?\n2. What are the computational trade-offs?\n3. Can transformers be applied to domains other than NLP?\n4. What are the limitations of the attention mechanism?",
		excerpt: "",
		tags: ["todo", "question"],
		linkedNotes: ["sample-note-1"],
		linkedTabs: ["sample-tab-1", "sample-tab-2"],
		linkedFiles: [],
		citations: 0,
		createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
		updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
		accessedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
		isPinned: true,
		isTodo: true,
		todoStatus: "pending",
		annotations: [],
		position: { x: 100, y: 100 },
		versionHistory: [],
	},
	{
		id: "sample-note-3",
		type: "clip",
		taskId: "sample-task-1",
		subtaskId: "sample-sub-1",
		sourceTabId: "sample-tab-2",
		title: "BERT Training Details",
		content:
			"Pre-training on large corpus using masked language modeling, then fine-tuning on specific tasks. The key innovation is bidirectional training which allows the model to learn context from both directions.",
		excerpt: "Pre-training on large corpus using masked language modeling",
		tags: ["technical", "bert"],
		linkedNotes: [],
		linkedTabs: ["sample-tab-2"],
		linkedFiles: [],
		citations: 2,
		createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
		updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
		accessedAt: Date.now() - 5 * 60 * 60 * 1000,
		isPinned: false,
		isTodo: false,
		todoStatus: "completed",
		annotations: [],
		position: { x: 200, y: 150 },
		versionHistory: [],
	},
	{
		id: "sample-note-4",
		type: "note",
		taskId: "sample-task-2",
		subtaskId: "sample-sub-3",
		sourceTabId: "sample-tab-4",
		title: "Design System Patterns",
		content:
			"Key principles observed:\n- Atomic design methodology\n- Component libraries with clear hierarchies\n- Design tokens for consistency\n- Documentation as first-class citizen\n- Versioning and change management",
		excerpt: "",
		tags: ["design", "patterns", "figma"],
		linkedNotes: [],
		linkedTabs: ["sample-tab-4"],
		linkedFiles: [],
		citations: 1,
		createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
		updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
		accessedAt: Date.now() - 3 * 60 * 60 * 1000,
		isPinned: false,
		isTodo: false,
		todoStatus: "pending",
		annotations: [],
		position: { x: 300, y: 200 },
		versionHistory: [],
	},
	{
		id: "sample-note-5",
		type: "note",
		taskId: "sample-task-2",
		subtaskId: "sample-sub-4",
		sourceTabId: "sample-tab-6",
		title: "User Feedback Summary",
		content:
			"Common themes from user research:\n- Users want simpler navigation (mentioned by 80%)\n- Better search functionality is critical\n- Faster load times are expected\n- Mobile experience needs significant improvement\n- Dark mode is highly requested",
		excerpt: "",
		tags: ["feedback", "important", "user-research"],
		linkedNotes: ["sample-note-4"],
		linkedTabs: ["sample-tab-6"],
		linkedFiles: [],
		citations: 0,
		createdAt: Date.now() - 6 * 60 * 60 * 1000,
		updatedAt: Date.now() - 6 * 60 * 60 * 1000,
		accessedAt: Date.now() - 1 * 60 * 60 * 1000,
		isPinned: true,
		isTodo: false,
		todoStatus: "pending",
		annotations: [],
		position: { x: 400, y: 100 },
		versionHistory: [],
	},
	{
		id: "sample-note-6",
		type: "note",
		taskId: "sample-task-3",
		subtaskId: "sample-sub-5",
		sourceTabId: "sample-tab-7",
		title: "Meeting Action Items",
		content:
			"1. Review Q4 budget proposal by Friday\n2. Assign team leads for new initiatives\n3. Set concrete Q1 goals and KPIs\n4. Schedule follow-up meetings with stakeholders\n5. Document decisions in wiki",
		excerpt: "",
		tags: ["todo", "meeting", "urgent"],
		linkedNotes: [],
		linkedTabs: ["sample-tab-7"],
		linkedFiles: [],
		citations: 0,
		createdAt: Date.now() - 1 * 60 * 60 * 1000,
		updatedAt: Date.now() - 1 * 60 * 60 * 1000,
		accessedAt: Date.now() - 30 * 60 * 1000,
		isPinned: true,
		isTodo: true,
		todoStatus: "pending",
		annotations: [],
		position: { x: 150, y: 250 },
		versionHistory: [],
	},
];
