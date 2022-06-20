/**
 * Normalizes the permissions of new role
 *
 * @param {Array} item user from users table
 * @returns {Array} a normalized user with an array of roles
 */
function normalizeUserToUpdate(item = {}) {
	const normalizedUser = {
		id: item.id,
		ci: item.ci,
		email: item.email,
		currentCity: item.currentCity,
		firstName: item.firstName,
		issued: item.issued,
		lastName: item.lastName,
		phoneNumber: item.phoneNumber,
		roles: [item.role],
	};
	return normalizedUser;
}

export default normalizeUserToUpdate;
