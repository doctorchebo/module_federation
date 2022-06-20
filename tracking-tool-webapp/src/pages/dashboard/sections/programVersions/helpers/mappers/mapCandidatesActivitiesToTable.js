/**
 * @param {Array} activities - activities
 * @param {Array} candidatesPostulants - Array with candidates
 * @param {Array} candidatesInfTalks - Array with candidates
 * @returns {Array} - which is greater to be used in sort function
 */
export const dataBuilder = (activities, candidatesPostulants, candidatesInfTalks) => {
	const activityData = {
		['1']: {
			activityType: activities['1']?.activityType?.description,
			id: activities['1']?.id,
			candidates: candidatesPostulants,
		},
		['2']: {
			activityType: activities['2']?.activityType?.description,
			id: activities['2']?.id,
			candidates: candidatesInfTalks,
		},
	};
	return activityData;
};

/**
 * @param {object} candidatePrev - string that represents a name
 * @param {object} candidateNext - string that represents a name
 * @returns {Array} - which is greater to be used in sort function
 */
const compare_person_fullName = (candidatePrev, candidateNext) => {
	if (candidatePrev.person.fullName.toLowerCase() < candidateNext.person.fullName.toLowerCase()) {
		return -1;
	}
	if (candidatePrev.person.fullName.toLowerCase() > candidateNext.person.fullName.toLowerCase()) {
		return 1;
	}
	return 0;
};

/**
 * @param {object} data program version and its candidates
 * @param {object} state program version and its candidates in state
 * @returns {boolean} whether the data is equal to state in candidates
 */
export const checkChangesInCandidates = (data, state) => {
	const stateTest = JSON.parse(JSON.stringify(state));
	const dataTest = JSON.parse(JSON.stringify(data));
	const noChangesInCandidates = Object.keys(stateTest).reduce((prev, key) => {
		const a = JSON.stringify(stateTest[key].candidates.sort(compare_person_fullName));
		const b = JSON.stringify(dataTest[key].candidates.sort(compare_person_fullName));
		return prev && a === b;
	}, true);
	return noChangesInCandidates;
};

/**
 * @param {Array} candidates candidates in a program version
 * @param {number} activityId activity id
 * @returns {Array} candidates in an activity
 */
export function getCandidatesByActivityId(candidates, activityId) {
	return candidates.filter((candidate) => candidate.activity.id === activityId);
}

/**
 * @param {Array} activities activities in a program version
 * @param {Array} candidates candidates in a program version
 * @returns {object} candidates activities data
 */
export function handleOnPromoteCandidates(activities, candidates) {
	let realData;
	let activitiesIds = [];
	let candidatesActivity;
	let count = 1;
	activities.slice(1).forEach((activity) => {
		const candidatesByActivity = getCandidatesByActivityId(candidates, activity.id);
		let activityData = {
			[count]: {
				id: activity.id,
				activityType: activity.activityType.description,
				candidates: candidatesByActivity,
			},
		};
		activitiesIds.push(activity.id);
		candidatesActivity = Object.assign({}, activityData, candidatesActivity);
		count++;
	});
	const listsId = {
		listsId: activitiesIds,
	};
	const lists = {
		lists: candidatesActivity,
	};
	realData = Object.assign({}, lists, realData);
	realData = Object.assign({}, listsId, realData);
	return realData;
}

/**
 * @param {Array} candidatesActivities list of all candidates activities
 * @returns {object} candidates activities
 */
export function mapCandidatesActivitiesToCandidate(candidatesActivities) {
	return candidatesActivities.map((candidateActivity) => {
		return candidateActivity.candidate;
	});
}

/**
 * @param {Array} candidates list of candidates
 * @returns {object} array of objects
 */
export function mapCandidatesToObjects(candidates) {
	return candidates.map((candidate) => ({
		Name: candidate.person.Name,
		FullName: candidate.person.fullName,
		Email: candidate.person.email,
		PhoneNumber: candidate.person.phoneNumber,
		Activity: candidate.activity.ActivityType,
	}));
}
/**
 * @returns {object} headers for candidates activities
 */
function mapCandidatesActivitiesToTable() {
	return {
		headers: ['All', 'User', 'Activity', ''],
	};
}

export default mapCandidatesActivitiesToTable;
