/**
 * @typedef {Object} Tab
 *
 * @property {String} id
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
 */

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
	{
		id: "sample-tab-2",
		taskId: "sample-task-1",
		subtaskId: "sample-sub-1",
		url: "https://arxiv.org/abs/1810.04805",
		title: "BERT: Pre-training of Deep Bidirectional Transformers",
		favicon: "📄",
		provenance: {
			source: "link",
			sourceUrl: "https://arxiv.org/abs/1706.03762",
			timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 5 * 24 * 60 * 60 * 1000,
				end: Date.now() - 5 * 24 * 60 * 60 * 1000 + 892000,
			},
		],
		totalTimeSpent: 892,
		lastVisited: Date.now() - 3 * 60 * 60 * 1000,
		visitCount: 5,
		scrollDepth: 0.7,
		interactionSignals: {
			clicks: 10,
			copies: 2,
			searches: 0,
			keystrokes: 30,
		},
		salienceScore: 0.75,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
	{
		id: "sample-tab-3",
		taskId: "sample-task-1",
		subtaskId: "sample-sub-2",
		url: "https://en.wikipedia.org/wiki/Artificial_neural_network",
		title: "Neural Networks - Wikipedia",
		favicon: "🌐",
		provenance: {
			source: "direct",
			type: "typed",
			timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 4 * 24 * 60 * 60 * 1000,
				end: Date.now() - 4 * 24 * 60 * 60 * 1000 + 456000,
			},
		],
		totalTimeSpent: 456,
		lastVisited: Date.now() - 12 * 60 * 60 * 1000,
		visitCount: 3,
		scrollDepth: 0.5,
		interactionSignals: {
			clicks: 5,
			copies: 1,
			searches: 0,
			keystrokes: 10,
		},
		salienceScore: 0.5,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
	{
		id: "sample-tab-4",
		taskId: "sample-task-2",
		subtaskId: "sample-sub-3",
		url: "https://www.figma.com/design-systems",
		title: "Figma Design Systems",
		favicon: "🎨",
		provenance: {
			source: "search",
			type: "google",
			timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 4 * 24 * 60 * 60 * 1000,
				end: Date.now() - 4 * 24 * 60 * 60 * 1000 + 2340000,
			},
		],
		totalTimeSpent: 2340,
		lastVisited: Date.now() - 6 * 60 * 60 * 1000,
		visitCount: 7,
		scrollDepth: 0.9,
		interactionSignals: {
			clicks: 25,
			copies: 5,
			searches: 2,
			keystrokes: 80,
		},
		salienceScore: 0.8,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
	{
		id: "sample-tab-5",
		taskId: "sample-task-2",
		subtaskId: "sample-sub-3",
		url: "https://www.adobe.com/products/xd.html",
		title: "Adobe XD - UI/UX Design Tool",
		favicon: "🎨",
		provenance: {
			source: "search",
			type: "google",
			timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 3 * 24 * 60 * 60 * 1000,
				end: Date.now() - 3 * 24 * 60 * 60 * 1000 + 1120000,
			},
		],
		totalTimeSpent: 1120,
		lastVisited: Date.now() - 8 * 60 * 60 * 1000,
		visitCount: 4,
		scrollDepth: 0.65,
		interactionSignals: {
			clicks: 12,
			copies: 2,
			searches: 1,
			keystrokes: 35,
		},
		salienceScore: 0.6,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
	{
		id: "sample-tab-6",
		taskId: "sample-task-2",
		subtaskId: "sample-sub-4",
		url: "https://www.nngroup.com/articles/",
		title: "UX Best Practices - Nielsen Norman Group",
		favicon: "📊",
		provenance: {
			source: "link",
			sourceUrl: "https://www.figma.com/design-systems",
			timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 2 * 24 * 60 * 60 * 1000,
				end: Date.now() - 2 * 24 * 60 * 60 * 1000 + 1890000,
			},
		],
		totalTimeSpent: 1890,
		lastVisited: Date.now() - 10 * 60 * 60 * 1000,
		visitCount: 6,
		scrollDepth: 0.8,
		interactionSignals: {
			clicks: 18,
			copies: 4,
			searches: 0,
			keystrokes: 55,
		},
		salienceScore: 0.7,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
	{
		id: "sample-tab-7",
		taskId: "sample-task-3",
		subtaskId: "sample-sub-5",
		url: "https://docs.google.com/document/d/sample-doc-id",
		title: "Q4 Strategy Planning",
		favicon: "📝",
		provenance: {
			source: "direct",
			type: "bookmark",
			timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
		},
		dwellHistory: [
			{
				start: Date.now() - 1 * 24 * 60 * 60 * 1000,
				end: Date.now() - 1 * 24 * 60 * 60 * 1000 + 780000,
			},
		],
		totalTimeSpent: 780,
		lastVisited: Date.now() - 30 * 60 * 1000,
		visitCount: 4,
		scrollDepth: 0.95,
		interactionSignals: {
			clicks: 8,
			copies: 1,
			searches: 0,
			keystrokes: 120,
		},
		salienceScore: 0.9,
		archived: false,
		archivedAt: null,
		chromeTabId: null,
		groupId: null,
	},
];
