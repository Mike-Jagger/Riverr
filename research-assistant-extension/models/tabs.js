/**
 * @typedef {Object} Tab
 *
 * @property {String} id
 * @property {ModelType} modelType // just easier for parsing and validation though not necessary with type definitions now in place
 *
 * @property {Task} task
 * @property {SubTask} subTask
 *
 * @property {String} url
 * // property Request - TODO: This could be associted with specific URL to see what kinda tab it is (form filling page, landing page... etc)
 * @property {String} title
 * @property {File} favicon
 * @property {Provenance} provenance // TODO: could add the Request thingy in here
 * @property {DwellHistory} dwellHistory // getTotalTimeSpent // Should probably be handled in dwell manager. Interface with this property and concrete methods to retrieve/display it cleanly (could be retrieved from DB/provided History type/interface for instance)
 *
 * @property {VisitHistory} // getVisitCount && getlastVisited // TODO: could have some kind of functionality extension but I digress for now
 * @property {number} scrollDepth
 * @property {InteractionSignals} interactionSignals // dedicated type
 *
 * @property {Salience} salience // dedicated type // for CalculateMetrics interface
 * @property {Productivity} productivity // interface // for CalculateMetrics interface
 * @property {ArchiveHistory} // getLastArchived, isArchived, archivedAt // Should probably be handled in archive manager. interface ... bla bla. In addition, could leverage the bookmarks api from chrome to molest this part properly. i.e, could have a dedicated type Archive
 *
 * @property {SessionData} sessionData // chromeGroupId, chromeTabId, ... other chrome or browser specific session data that might be useful.
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
 */

class Tab {}

const sampleTabs = [
	{
		id: "sample-tab-1",
		taskId: "sample-task-1",
		subtaskId: "sample-sub-1",
		url: "https://arxiv.org/abs/1706.03762",
		title: "Attention Is All You Need",
		favicon: "📄",
		provenance: {
			source: "search",
			type: "google",
			sourceUrl: "https://google.com",
			timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 6 * 24 * 60 * 60 * 1000,
				end: Date.now() - 6 * 24 * 60 * 60 * 1000 + 1247000,
			},
		],
		totalTimeSpent: 1247,
		lastVisited: Date.now() - 2 * 60 * 60 * 1000,
		visitCount: 8,
		scrollDepth: 0.85,
		interactionSignals: {
			clicks: 15,
			copies: 3,
			searches: 0,
			keystrokes: 45,
		},
		salienceScore: 0.9,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
];
