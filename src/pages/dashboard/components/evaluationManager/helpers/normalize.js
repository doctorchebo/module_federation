/**
 * Returns a new array to use into Select Component.
 *
 * @param {Array} eventTypes This is an array of event types.
 * @returns {Array} Returns a new array to Options into Select Component.
 */
export function gradesToOptions(eventTypes) {
	return eventTypes.map(({ key, text, value }) => ({
		key: key,
		text: text,
		value: value,
	}));
}
