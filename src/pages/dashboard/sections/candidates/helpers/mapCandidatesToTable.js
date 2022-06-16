/**
 * @returns {object} headers and rows of all candidates
 */
function mapCandidatesToTable() {
	return {
		headers: [
			'All',
			'User',
			'EmailAddress',
			'PhoneNumber',
			'Resume',
			'Version',
			'Status',
			'Actions',
		],
	};
}

export default mapCandidatesToTable;
