import locale from '../locale/en.json';
const all = {
	text: locale.any.name,
	value: locale.any.value,
};
/**
 * @param {Array} listPrograms list of all program
 * @returns {object} Programs mapped options for filter
 */
export function mapProgramOptions(listPrograms) {
	const programs = {
		name: locale.program.name,
		key: locale.program.key,
		list: listPrograms.map((program) => ({
			text: program,
			value: program,
		})),
	};
	programs.list.push(all);
	return programs;
}
/**
 * @param {Array} candidates list of promoted candidates
 * @param {number} activityId activityId activity promoved
 * @returns {object} Candidates mapped options for filter
 */
export function mapPromotedCandidates(candidates, activityId) {
	return candidates.map((candidate) => ({
		idResource: candidate.id,
		idActivity: activityId,
	}));
}
/**
 * @param {Array} listCoordinators list of all coordinators
 * @returns {object} Coordinators mapped options for filter
 */
export function mapCoordinatorOptions(listCoordinators) {
	const coordinators = {
		name: locale.coordinator.name,
		key: locale.coordinator.key,
		list: listCoordinators.map((coordinator) => ({
			text: coordinator.firstName + ' ' + coordinator.lastName,
			value: coordinator.id,
		})),
	};
	coordinators.list.push(all);
	return coordinators;
}
/**
 * @param {Array} listStatus list of all Status
 * @returns {object} Status mapped options for filter
 */
export function mapStatusOption(listStatus) {
	const status = {
		name: locale.status,
		key: locale.status,
		list: listStatus.map((status) => ({
			text: status,
			value: status,
		})),
	};
	status.list.push(all);
	return status;
}
/**
 * @param {Array} listGraphics list of all graphics
 * @returns {object} Graphics mapped options for filter
 */
export function mapGraphicsOption(listGraphics) {
	return listGraphics.map((graphic) => ({
		name: graphic.name,
		key: graphic.key,
	}));
}
/**
 * @param {Array} listFormats list of all formats
 * @returns {object} formats mapped options for filter
 */
export function mapFormatsOption(listFormats) {
	return listFormats.map((format) => ({
		name: format.name,
		key: format.key,
	}));
}
