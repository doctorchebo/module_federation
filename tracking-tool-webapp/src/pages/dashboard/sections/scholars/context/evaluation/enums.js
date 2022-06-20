const namespace = 'ScholarsEvaluations';

export const ScholarEvaluationsActionTypes = {
	loadStageId: `${namespace}.load.stage.id`,
	loadStages: `${namespace}.load.stages`,
	loadScholar: `${namespace}.load.scholar`,
	loadApprovals: `${namespace}.loadApprovals`,
	loadScholarId: `${namespace}.load.scholar.id`,
	loadScholarEvaluation: `${namespace}.load.scholar.evaluation`,
	loading: `${namespace}.loading`,
	loadingApprovals: `${namespace}.loadingApprovals`,
	error: `${namespace}.Error`,
	checkApproval: `${namespace}.checkApproval`,
	setCurrentStage: `${namespace}.setCurrentStage`,
};
