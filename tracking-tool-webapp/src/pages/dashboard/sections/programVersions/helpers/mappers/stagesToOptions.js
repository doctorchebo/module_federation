/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} stages This is an array of stages.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function stagesToOptions(stages = []) {
	return stages.map(({ id, name, subjects, approvalRequired, endDate, startDate }) => ({
		key: id,
		text: name,
		endDate: endDate,
		startDate: startDate,
		approvalRequired: Boolean(approvalRequired),
		value: id,
		subjects: subjects.map(({ id, name, userId }) => ({
			key: id,
			text: name,
			value: id,
			userId,
		})),
	}));
}
