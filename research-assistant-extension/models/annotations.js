// From chapter 2.3 - Annotation: The Core of Active Reading - of the Electronic Book by CC Marshall

// Annotation types:

// Telegraphic marks: Underlines, circles and asterisks (for now we will focus on underlines)

// Explicit Notes (clips): Special kind of Notes (Writing words or sentences in the margin)
/**
 * - Appears exactly where note wants to be created on web page, exactly how margin notes would appear in books
 * - Has the same properties as Notes
 */

// Header/Footer/Title Marks: Special kind of ExplicitNotes (Readers often circle chapter titles or headings to map the structure of the argument.)
/**
 * - Exhibits the same behaviour as explicit notes
 * - Mostly for titles (Heading-like elements for instance), header and footers on PageBreaks
 */

// [web]PageBreaks + Special scrollbar (TODO: Check notes for exact specification on this one)

/**
 * @typedef {Object} Annotation
 * @property {String} color
 * @property {AnnotationType} annotationType
 * @property {(Object|String)} xpath
 * @property {SerializedRange} range
 *
 * // id is inherited from Note
 * // selectedText is excerpt from parent
 * // pageUrl can be gotten from Note.links<Tab>.url
 * // pageTitle can be gotten from NOte.links<Tab>.title
 * @property {TabCoordinates} tabCoordinates // TODO: Should probably be stored in open canvas workspace and managed by some kind of interface
 *
 */

class Annotation {}

const annotation = {
	id: generateUUID(),
	type: "highlight",
	color,
	selectedText: state.selection.text,
	xpath: state.selection.xpath,
	pageUrl: window.location.href,
	pageTitle: document.title,
	range: serializeRange(state.selection.range),
};

function serializeRange(range) {
	return {
		startContainer: getXPath(range.startContainer.parentElement),
		startOffset: range.startOffset,
		endContainer: getXPath(range.endContainer.parentElement),
		endOffset: range.endOffset,
	};
}

/**
 * @typedef {Note & Annotation} TelegraphicMarks
 */

/**
 * @typedef {Note & Annotation} Clips
 */

/**
 * @typedef {Note & Annotation} HeaderFooterNotes
 */
