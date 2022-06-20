const base = 'ScholarDetail';

export const ScholarActions = {
	onGetScholarById: `${base}.SetImportContent`,
	onGetScholarStageSummary: `${base}.OnGetScholarStageSummary`,
	loading: `${base}.Loading`,
	loadingLastEvaluationSummary: `${base}.LoadingLastEvaluationSummary`,
	error: `${base}.Error`,
	updateScholar: `${base}.update`,
	onGetTrainingsByScholar: `${base}.OnGetTrainingsByScholar`,
	onGetStageScoreByScholar: `${base}.OnGetStageScoreByScholar`,
	onCountEvents: `${base}.onCountEvents`,
	onGetLastStageEvaluationSkills: `${base}.OnGetLastStageEvaluationSkills`,
	errorLastStageEvaluationSkills: `${base}.ErrorLastStageEvaluationSkills`,
};
