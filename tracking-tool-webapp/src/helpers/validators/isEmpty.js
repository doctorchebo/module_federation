/**
 * Check if a value given is empty
 *
 * @param {*} value - This value can be a string, number, array, object.
 * @returns {boolean} - Return true if the value is empty, otherwise return false.
 */
export function isEmpty(value) {
	return !value || (value instanceof Object && ObjectIsEmpty(value));
}

/**
 * Check if an object given is empty
 *
 * @param {object} object - This value can be an array or only object.
 * @returns {boolean} - Return true if the value is empty, otherwise return false.
 */
export function ObjectIsEmpty(object) {
	return (Array.isArray(object) && object.length === 0) || Reflect.ownKeys(object).length === 0;
}
