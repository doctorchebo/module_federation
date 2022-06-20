const base = 'ScholarDetail';

export const ScholarDetailActions = {
	OnGetScholarById: `${base}.SetImportContent`,
	OnGetScholarStageSummary: `${base}.OnGetScholarStageSummary`,
	Loading: `${base}.Loading`,
	LoadingLastEvaluationSummary: `${base}.LoadingLastEvaluationSummary`,
	Error: `${base}.Error`,
	updateScholar: `${base}.update`,
	OnGetTrainingsByScholar: `${base}.OnGetTrainingsByScholar`,
	OnGetStageScoreByScholar: `${base}.OnGetStageScoreByScholar`,
	onCountEvents: `${base}.onCountEvents`,
	OnGetLastStageEvaluationSkills: `${base}.OnGetLastStageEvaluationSkills`,
	ErrorLastStageEvaluationSkills: `${base}.ErrorLastStageEvaluationSkills`,
};
