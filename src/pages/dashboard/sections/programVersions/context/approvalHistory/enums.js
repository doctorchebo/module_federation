const namespace = 'ApprovalHistory';

export const ApprovalHistoryActionTypes = {
	loadProgramVersion: `${namespace}.load.programVersion`,
	error: `${namespace}.Error`,
	loading: `${namespace}.loading`,
	loadActivities: `${namespace}.load.activities`,
	loadPostulationsApproved: `${namespace}.load.postulations.approved`,
	loadPostulationsFailed: `${namespace}.load.postulations.failed`,
	loadPostulationsInProgress: `${namespace}.load.postulations.inProgress`,
	loadInfTalksApproved: `${namespace}.load.infTalks.approved`,
	loadInfTalksFailed: `${namespace}.load.infTalks.failed`,
	loadInfTalksInProgress: `${namespace}.load.infTalks.inProgress`,
};
