import locale from '../locale/en.json';
const all = {
	text: locale.any.name,
	value: locale.any.value,
};
/**
 * @param {Array} listPrograms list of all program
 * @returns {object} Programs mapped options for filter
 */
export function mapProgramVersionOptions(listPrograms) {
	const programVersions = {
		name: locale.filters.programVersion.name,
		key: locale.filters.programVersion.key,
		list: listPrograms.map((programVersions) => ({
			text: programVersions.name,
			value: programVersions.name,
		})),
	};
	programVersions.list.push(all);
	return programVersions;
}

/**
 * @param {Array} statusList list of all Status Type from a Scholar
 * @returns {object} Status Type mapped options for filter
 */
export function mapStatusTypeOptions(statusList) {
	const statusTypes = {
		name: locale.filters.scholar.name,
		key: locale.filters.scholar.key,
		list: statusList.map((statusType) => ({
			text: statusType.name,
			value: statusType.id,
		})),
	};
	statusTypes.list.push(all);
	return statusTypes;
}

/**
 * @param {Array} applicantsTypeList list of all Applicants Type
 * @returns {object} Applicants Type mapped options for filter
 */
export function mapApplicantsTypeOptions(applicantsTypeList) {
	const applicantsTypes = {
		name: locale.filters.types.name,
		key: locale.filters.types.key,
		list: applicantsTypeList.map((applicantType) => ({
			text: applicantType.name,
			value: applicantType.name,
		})),
	};
	applicantsTypes.list.push(all);
	return applicantsTypes;
}
