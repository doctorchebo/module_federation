/**
 * @param {Array} listSubjectScholars list of all program versions
 * @returns {object} headers and rows of all program versions
 */
function subjectScholarsToTable(listSubjectScholars) {
	return {
		headers: ['scholarName', 'lastGradeDate', 'grade', 'lastComment', 'actions'],
		rows: listSubjectScholars,
	};
}

export default subjectScholarsToTable;
