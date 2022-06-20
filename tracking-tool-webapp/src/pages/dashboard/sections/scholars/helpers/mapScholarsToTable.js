const EventStatus = {
	Active: 1,
	Complete: 2,
	Inactive: 3,
	onHold: 4,
};

/**
 * Get a classname for a color for each status
 *
 * @param {number} statusCode A number with id of a status type
 * @returns {string} Return the classname for a status type
 */
export function statusClassName(statusCode) {
	switch (statusCode) {
		case EventStatus.Active:
			return 'actived';
		case EventStatus.Complete:
			return 'completed';
		case EventStatus.Inactive:
			return 'inactive';
		case EventStatus.onHold:
			return 'onhold';
		default:
			return 'actived';
	}
}

/**
 * Get name for a status type id
 *
 * @param {number} statusCode A number with id of a status type
 * @returns {string} Return the name for a status type
 */
export function statusName(statusCode) {
	switch (statusCode) {
		case EventStatus.Active:
			return 'Active';
		case EventStatus.Complete:
			return 'Completed';
		case EventStatus.Inactive:
			return 'Inactive';
		case EventStatus.onHold:
			return 'Onhold';
		default:
			return 'Active';
	}
}
/**
 * @param {Array} listScholars list of all scholars
 * @returns {object} headers and rows of all scholars
 */
function mapScholarsToTable(listScholars) {
	const rows = listScholars.map((scholar) => {
		const { person, programVersionName, programVersionId, statusTypeId, applicantsType } =
			scholar;

		return {
			id: scholar.id,
			User: person.fullName,
			Type: applicantsType,
			EmailAddress: person.personalEmail,
			PhoneNumber: person.phoneNumber,
			City: person.currentCity,
			Version: programVersionName,
			programVersionId: programVersionId,
			Status: statusName(statusTypeId),
			StatusClass: statusClassName(statusTypeId),
		};
	});
	return {
		headers: [
			'All',
			'User',
			'Type',
			'EmailAddress',
			'PhoneNumber',
			'Version',
			'Status',
			'Actions',
		],
		rows,
	};
}

export default mapScholarsToTable;
