/**
 * @param {string} attribute name attribute.
 * @param {object[]} data objects list.
 * @returns {object[]} object list sorted.
 */
export default function mergeSort(attribute, data) {
	if (data.length < 2) {
		return data;
	}
	const middle = Math.floor(data.length / 2);
	const subLeft = mergeSort(attribute, data.slice(0, middle));
	const subRight = mergeSort(attribute, data.slice(middle));

	return merge(attribute, subLeft, subRight);
}

/**
 * @param {string} attribute name attribute.
 * @param {object[]} left a object list.
 * @param {object[]} right a object list.
 * @returns {object[]} object list sorted.
 */
export function merge(attribute, left, right) {
	let result = [];

	while (left.length > 0 && right.length > 0) {
		result.push(left[0][attribute] < right[0][attribute] ? left.shift() : right.shift());
	}

	return result.concat(left.length ? left : right);
}
