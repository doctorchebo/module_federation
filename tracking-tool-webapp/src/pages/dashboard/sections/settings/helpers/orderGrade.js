/**
 * Order grades
 *
 * @param {Array} allGrades Array with all grades
 * @returns {Array} a array ordered with all grades
 */
function orderGrades(allGrades) {
	allGrades.sort((a, b) => {
		return b.value - a.value;
	});
	return allGrades;
}

export default orderGrades;
