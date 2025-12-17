/**
 * Represents a file system entry with metadata and utility methods,
 * mirroring a Go-like FileInfo structure.
 * @typedef {Object} file
 *
 * @property {string} name - The base name of the file.
 * @property {number} size - Length in bytes for regular files; system-dependent for others.
 * @property {number} mode - File mode bits (permissions and type).
 * @property {Date} modTime - The last modification time.
 * @property {boolean} isDir - Convenience flag for directory check.
 * @property {string} extension - The file extension (e.g., ".js").
 * @property {string} mimeType - The detected MIME type (e.g., "text/javascript").
 *
 * @property {function(): string} getName - Returns the base name of the file.
 * @property {function(): number} getSize - Returns the size of the file in bytes.
 * @property {function(): boolean} checkIsDir - Returns true if the entry is a directory.
 * @property {function(): Date} getModTime - Returns the last modification time.
 * @property {function(): string} getExtension - Returns the file extension.
 * @property {function(): Promise<string>} readAsText - Async method to read file content as text.
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
