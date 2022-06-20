const namespace = 'ProgramVersions';

export const ProgramVersionsActionTypes = {
	load: `${namespace}.load`,
	loadStatus: `${namespace}.loadStatus`,
	loadPrograms: `${namespace}.loadPrograms`,
	loadCoordinators: `${namespace}.loadCoordinators`,
	loading: `${namespace}.loading`,
	OnImportVersion: `${namespace}.OnImportVersion`,
	OnImportedRestore: `${namespace}.OnImportedRestore`,
	OnSendEvaluationReports: `${namespace}.OnSendEvaluationReports`,
	Error: `${namespace}.Error`,
	OnPutProgramVersion: `${namespace}.onPutProgramVersion`,
	loadingStages: `${namespace}.loadingStages`,
	onGetStages: `${namespace}.onGetStages`,
	onGetTrainers: `${namespace}.onGetTrainers`,
};
