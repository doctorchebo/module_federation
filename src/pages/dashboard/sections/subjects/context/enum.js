const namespace = 'SubjectDetails';
const subjectEvaluationNameSpace = 'SubjectEvaluations';

export const SubjectDetailsActionTypes = {
	loadSubjects: `${namespace}.load`,
	loadPermissions: `${namespace}.loadPermissions`,
	loading: `${namespace}.loading`,
	Error: `${namespace}.Error`,
	subjects: `${namespace}.subjects`,
	changeActualSubject: `${namespace}.changeActualSubject`,
	getSubjectById: `${namespace}.getSubjectById`,
	onAddView: `${namespace}.onAddView`,
	onPopView: `${namespace}.onPopView`,
	loadEvaluations: `${namespace}.loadEvaluations`,
	evaluationHistory: `${namespace}.evaluationHistory`,
	deleteEvaluation: `${namespace}.deleteEvaluation`,
};

export const SubjectEvaluationsActionTypes = {
	loadScholars: `${subjectEvaluationNameSpace}.load`,
	Error: `${subjectEvaluationNameSpace}.Error`,
	getScholarEvaluationsBySubjectId: `${subjectEvaluationNameSpace}.getScholarEvaluationsBySubjectId`,
};

export const GradesActionTypes = {
	loadingGrades: `${namespace}.loadingGrades`,
	onGetGrades: `${namespace}.onGetGrades`,
	Error: `${namespace}.Error`,
};
