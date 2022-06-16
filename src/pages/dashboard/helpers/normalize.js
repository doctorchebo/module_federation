/**
 * Normalizes the permissions of new role
 *
 * @param {Array} items the list of permissions
 * @returns {Array} the list of permissions normalized
 */
function normalizePermissionsNewRole(items = []) {
	return items.map((item) => {
		return {
			permissions: {
				id: item.id,
			},
			name: item.name,
			description: item.description,
			canView: false,
			canAdd: false,
			canEdit: false,
			canDelete: false,
		};
	});
}

/**
 * Normalize the new role to save
 *
 * @param {object} model the role model
 * @returns {object} role normalized
 */
function normalizeNewRole(model) {
	const actions = [...model.permissions];
	return {
		...model,
		actions,
	};
}

/**
 * Normalizes the permissions to update a role
 *
 * @param {Array} items the list of permissions
 * @param {string} roleId id of permission role
 * @returns {Array} the list of permissions normalized
 */
function normalizePermissionsUpdateRole(items = [], roleId) {
	return items.map((item) => {
		return {
			id: item.id,
			name: item.permissions.name,
			canView: item.canView,
			canAdd: item.canAdd,
			canEdit: item.canEdit,
			canDelete: item.canDelete,
		};
	});
}

/**
 * Converts stages array to new array to use into Select Component.
 *
 * @param {object[]} stages Array of stages.
 * @returns {object[]} stages converted to options of Select component.
 */
function convertStagesToOptions(stages) {
	const stagesConverted = stages.map((stage) => ({
		key: stage.id,
		text: stage.name,
		value: stage.id,
	}));
	return stagesConverted;
}

/**
 * Normalizes a scholar according to API requirements
 *
 * @param {Array} item scholar
 * @returns {Array} a normalized scholar
 */
function normalizeScholarToUpdate(item = {}) {
	const normalizedScholar = {
		id: item.scholarId,
		personalEmail: item.email,
		currentCity: item.currentCity,
		phoneNumber: item.phoneNumber,
		academicDegree: item.degree,
		career: item.career,
		university: item.university,
	};
	return normalizedScholar;
}

export {
	normalizeNewRole,
	normalizePermissionsUpdateRole,
	normalizePermissionsNewRole,
	convertStagesToOptions,
	normalizeScholarToUpdate,
};
