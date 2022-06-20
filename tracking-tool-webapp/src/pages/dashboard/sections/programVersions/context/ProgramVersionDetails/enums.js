const namespace = 'ProgramVersionDetails';

export const ProgramVersionDetailsActionTypes = {
	loadProgramVersion: `${namespace}.load.programVersion`,
	error: `${namespace}.Error`,
	loading: `${namespace}.loading`,
	loadActivities: `${namespace}.load.activities`,
	loadCandidates: `${namespace}.load.candidates`,
	loadCurrentActivity: `${namespace}.load.currentActivity`,
	loadCandidatesActivities: `${namespace}.load.candidates.activities`,
	loadPromoteCandidatesBetweenActivities: `${namespace}.load.promote.candidates.between.activities`,
	loadPostulationsInProgress: `${namespace}.load.postulations.inProgress`,
	loadInfTalksInProgress: `${namespace}.load.infTalks.inProgress`,
	loadingActivities: `${namespace}.loading.activities`,
};
