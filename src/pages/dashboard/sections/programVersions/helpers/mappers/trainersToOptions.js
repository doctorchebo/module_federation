/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} trainers This is an array of trainers.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function trainersToOptions(trainers = []) {
	return trainers.map(({ id, firstName, lastName }) => ({
		key: id,
		text: `${firstName} ${lastName}`,
		value: id,
	}));
}
