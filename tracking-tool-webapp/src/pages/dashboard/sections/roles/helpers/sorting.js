/**
 * Sorting alphabetically ascending a role list by name
 *
 * @param {Array} items the list to sort
 * @returns {Array} sorted list by default
 */
function sortingAscendingByName(items) {
	return items.sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
}

export { sortingAscendingByName };
