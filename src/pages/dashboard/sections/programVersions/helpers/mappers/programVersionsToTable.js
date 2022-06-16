/**
 * @param {Array} listProgramVersions list of all program versions
 * @returns {object} headers and rows of all program versions
 */
function programVersionsToTable(listProgramVersions) {
	const rows = listProgramVersions.map((program) => {
		const { startDate, endDate, name, status, coordinator, id } = program;

		const start = new Date(startDate).toDateString().replace(/^\S+\s/, '');
		const end = new Date(endDate).toDateString().replace(/^\S+\s/, '');

		return {
			duration: `From ${start} to ${end}`,
			version: name,
			stage: status,
			coordinator: `${coordinator.firstName} ${coordinator.lastName}`,
			email: coordinator.email,
			id: id,
		};
	});
	return {
		headers: ['version', 'stage', 'duration', 'coordinator', 'actions'],
		rows,
	};
}

export default programVersionsToTable;
