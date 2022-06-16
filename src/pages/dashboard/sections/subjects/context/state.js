import produce from 'immer';
import {
	SubjectDetailsActionTypes,
	SubjectEvaluationsActionTypes,
	GradesActionTypes,
} from './enum';

/**
 * Set an initial state for subjet details view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		title: 'SubjectDetails',
		errorMessages: [],
		roles: [],
		permissions: [],
		reports: null,
		pagination: {
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
		},
		loading: false,
		loadSubjects: false,
		sideBar: false,
		subjects: [],
		actualSubject: null,
		scholars: [],
		loadScholars: false,
		grades: [],
		viewStack: [],
		evaluationHistory: [],
		selectedEvent: {},
	};
}

/**
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case SubjectDetailsActionTypes.loadSubjects:
				draft.loadSubjects = payload;
				break;
			case SubjectDetailsActionTypes.subjects:
				draft.subjects = payload;
				break;
			case SubjectDetailsActionTypes.changeActualSubject:
				draft.actualSubject = payload;
				break;
			case SubjectDetailsActionTypes.loadPermissions:
				draft.permissions = payload;
				break;
			case SubjectDetailsActionTypes.loading:
				draft.loading = payload;
				break;
			case SubjectDetailsActionTypes.Error:
				draft.errorMessages = payload;
				break;
			case SubjectDetailsActionTypes.getSubjectById:
				draft.actualSubject = payload;
				break;
			case SubjectEvaluationsActionTypes.getScholarEvaluationsBySubjectId:
				draft.scholars = payload;
				break;
			case SubjectEvaluationsActionTypes.loadScholars:
				draft.loadScholars = payload;
				break;
			case GradesActionTypes.onGetGrades:
				draft.grades = payload;
				break;
			case SubjectDetailsActionTypes.onAddView:
				draft.viewStack.push(payload);
				break;
			case SubjectDetailsActionTypes.onPopView:
				draft.viewStack.pop();
				break;
			case SubjectDetailsActionTypes.loadEvaluations:
				draft.loadingEvaluateHistory = payload;
				break;
			case SubjectDetailsActionTypes.evaluationHistory:
				draft.evaluationHistory = payload.data;
				draft.pagination = payload.pagination;
				break;
			default:
				return state;
		}
	});
}
