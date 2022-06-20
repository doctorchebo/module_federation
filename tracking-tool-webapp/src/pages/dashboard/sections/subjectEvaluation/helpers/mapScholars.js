/**
 * @param {Array} data list of all subjects
 * @returns {object} headers and rows of all scholars
 */
function mapScholars(data) {
	const subjects = ['All', 'Scholar', 'AverageGrade'];
	const rows = data.scholars.scholars.map((scholar) => {
		const { evaluations } = scholar;
		const gradeNote = evaluations.map((note) => {
			return note;
		});
		return {
			id: scholar.id,
			Scholar: scholar.scholarName,
			grade: gradeNote,
			AverageGrade: scholar.average,
		};
	});

	return {
		headers: subjects,
		rows,
	};
}

export default mapScholars;
