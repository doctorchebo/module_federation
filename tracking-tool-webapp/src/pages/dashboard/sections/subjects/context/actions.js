import apiGrades from 'api/models/grades';
import {
	SubjectDetailsActionTypes,
	SubjectEvaluationsActionTypes,
	GradesActionTypes,
} from './enum';
import apiSubjectDetails from 'api/models/subjectDetails';
import apiSubjectEvaluations from 'api/models/subjectEvaluations';
import apiSubjectEvaluation from 'api/models/subjectEvaluation';
import LoggerService from 'services/LoggerService';
import { showSuccessToast, showErrorToast } from 'helpers/toast';
import locale from '../locale/en.json';
import { decodeToken } from 'helpers/tokenDecoder';

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 * @param {string} complement - Complement for the url.
 */
async function onLoadSubjects(dispatch, payload, complement) {
	dispatch({ type: SubjectDetailsActionTypes.loadSubjects, payload: true });
	const token = localStorage.getItem('token');
	await apiSubjectDetails
		.getAll(token, complement)
		.then((response) => {
			dispatch({ type: SubjectDetailsActionTypes.subjects, payload: response });
		})
		.catch((error) => {
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() => dispatch({ type: SubjectDetailsActionTypes.loadSubjects, payload: false }));
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 */
function onChangeActualSubject(dispatch, payload) {
	dispatch({ type: SubjectDetailsActionTypes.changeActualSubject, payload });
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 */
function onGetSubjectById(dispatch, payload) {
	dispatch({ type: SubjectDetailsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiSubjectDetails
		.getSingle(payload, token)
		.then((response) => {
			dispatch({ type: SubjectDetailsActionTypes.getSubjectById, payload: response });
		})
		.catch((error) => {
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() => dispatch({ type: SubjectDetailsActionTypes.loading, payload: false }));
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 */
function onGetScholarEvaluationsBySubjectId(dispatch, payload) {
	dispatch({ type: SubjectEvaluationsActionTypes.loadScholars, payload: true });
	const token = localStorage.getItem('token');
	apiSubjectEvaluations
		.getSingle(payload, token)
		.then((response) => {
			dispatch({
				type: SubjectEvaluationsActionTypes.getScholarEvaluationsBySubjectId,
				payload: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: SubjectEvaluationsActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() =>
			dispatch({ type: SubjectEvaluationsActionTypes.loadScholars, payload: false })
		);
}

/**
 * @param {Function} dispatch - Function to change context state.
 */
function onGetGrades(dispatch) {
	dispatch({ type: GradesActionTypes.loadingGrades, payload: true });
	const token = localStorage.getItem('token');
	const route = 'subjectevaluation';
	apiGrades
		.getAll(token, route)
		.then((response) => {
			let grades = [];
			response.map((item) => {
				grades.push({
					key: item.id,
					text: item.name,
					value: item.id,
					color: item.color,
					gpa: item.gpa,
				});
			});

			dispatch({ type: GradesActionTypes.onGetGrades, payload: grades });
		})
		.catch((err) => {
			dispatch({ type: GradesActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: GradesActionTypes.loadingGrades, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {any} payload - Data in payload.
 */
function onPutEvaluation(dispatch, payload) {
	const token = localStorage.getItem('token');
	const decodedToken = decodeToken();
	payload.id = decodedToken.sub;
	apiSubjectEvaluation
		.put(payload, token, payload.subjectEvaluationId)
		.then((response) => {
			showSuccessToast({
				title: locale.message.updateSuccess,
			});
			onLoadEvaluationHistory(dispatch, response.data.scholarId);
			onPopView(dispatch);
		})
		.catch((err) => {
			showSuccessToast({
				title: locale.message.errorUpdate,
			});
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Event object to be created.
 */
function onPostBulkEvaluation(dispatch, payload) {
	const token = localStorage.getItem('token');
	const { data, handleRedirect } = payload;
	dispatch({ type: SubjectDetailsActionTypes.loading, payload: true });
	apiSubjectEvaluation
		.post(data, token, 'bulkEdit')
		.then((response) => {
			showSuccessToast({
				title: locale.message.successPost,
			});
			handleRedirect();
			dispatch({ type: SubjectDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			showSuccessToast({
				title: locale.message.errorPost,
			});
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Event object to be created.
 */
function onPostEvaluate(dispatch, payload) {
	const token = localStorage.getItem('token');
	const params = {
		subjectId: payload.subjectId,
		gradeId: payload.gradeId,
		comment: payload.comment,
		isPublished: payload.isPublished,
	};
	apiSubjectEvaluation
		.post(params, token, `scholars/${payload.scholarId}`)
		.then(() => {
			showSuccessToast({
				title: locale.message.successPost,
			});
			dispatch({ type: SubjectDetailsActionTypes.loading, payload: false });
			onGetScholarEvaluationsBySubjectId(dispatch, params.subjectId);
		})
		.catch((err) => {
			showErrorToast({
				title: locale.message.errorPost,
			});
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Object to change current page.
 */
function onLoadEvaluationHistory(dispatch, payload) {
	dispatch({ type: SubjectDetailsActionTypes.loadEvaluations, payload: true });
	const token = localStorage.getItem('token');
	apiSubjectEvaluation
		.getAllWithParams(payload, token, 'evaluateHistory')
		.then((response) => {
			const { data, pagination } = response;
			dispatch({
				type: SubjectDetailsActionTypes.evaluationHistory,
				payload: { data, pagination },
			});
		})
		.catch((err) => {
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: SubjectDetailsActionTypes.loadEvaluations, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Data to delete an subect evaluation.
 */
function onDeleteEvaluation(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiSubjectEvaluation
		.deleteSingle(`scholar/${payload}`, token)
		.then((response) => {
			showSuccessToast({
				title: locale.messageDelete.success,
			});
		})
		.catch((err) => {
			dispatch({ type: SubjectDetailsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
			showErrorToast({
				title: locale.messageDelete.error,
			});
		})
		.finally(() => {
			dispatch({ type: SubjectDetailsActionTypes.loadEvaluations, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to add a view.
 * @param {object} payload - view to be render.
 */
function onAddView(dispatch, payload) {
	dispatch({ type: SubjectDetailsActionTypes.onAddView, payload: payload });
}

/**
 * @param {Function} dispatch - Function to remove last view.
 */
function onPopView(dispatch) {
	dispatch({ type: SubjectDetailsActionTypes.onPopView });
}

function onChangeUser(dispatch) {
	dispatch({ type: SubjectDetailsActionTypes.changeActualSubject, payload: null });
	dispatch({ type: SubjectDetailsActionTypes.subjects, payload: [] });
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function SubjectDetailsFactory(dispatch) {
	return {
		onLoadSubjects: (payload, complement) => onLoadSubjects(dispatch, payload, complement),
		onChangeActualSubject: (payload) => onChangeActualSubject(dispatch, payload),
		onGetSubjectById: (payload) => onGetSubjectById(dispatch, payload),
		onGetScholarEvaluationsBySubjectId: (payload) =>
			onGetScholarEvaluationsBySubjectId(dispatch, payload),
		// onGetGrades: () => onGetGrades(dispatch),
		onPostBulkEvaluation: (payload) => onPostBulkEvaluation(dispatch, payload),
		onGetGrades: (payload, complement) => onGetGrades(dispatch, payload, complement),
		onPostEvaluate: (payload) => onPostEvaluate(dispatch, payload),
		onAddView: (payload) => onAddView(dispatch, payload),
		onPopView: () => onPopView(dispatch),
		onLoadEvaluationHistory: (payload) => onLoadEvaluationHistory(dispatch, payload),
		onDeleteEvaluation: (payload) => onDeleteEvaluation(dispatch, payload),
		onPutEvaluation: (payload) => onPutEvaluation(dispatch, payload),
		onChangeUser: () => onChangeUser(dispatch),
	};
}
