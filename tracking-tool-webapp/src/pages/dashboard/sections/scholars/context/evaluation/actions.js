import { ScholarEvaluationsActionTypes } from './enums';
import evaluations from 'api/models/evaluations';
import stages from 'api/models/stages';
import scholar from 'api/models/scholars';
import approvals from 'api/models/approvals';
import LoggerService from 'services/LoggerService';
import { validateApprovals, validateCloseEvaluationRole } from '../../helpers/validation';
import { showSuccessToast, showWarningToast, showErrorToast } from 'helpers/toast';
import locale from '../../locale/en.json';

/**
 * @param {Function} dispatch - Function to save scholar Id.
 * @param {string} payload - Scholar Id.
 */
function onLoadScholarId(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loadScholarId, payload });
}

/**
 * @param {Function} dispatch - Function to load all data.
 * @param {string} payload - Scholar Id.
 */
function onLoad(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	const params = { scholarId: payload };

	scholar
		.getSingle(payload, token)
		.then((response) => {
			let { data, success, error } = response;
			if (success) {
				dispatch({ type: ScholarEvaluationsActionTypes.loadScholar, payload: data });
			} else {
				dispatch({ type: ScholarEvaluationsActionTypes.error, payload: error });
			}
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ScholarEvaluationsActionTypes.error, payload: err });
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		});

	stages
		.getAllWithParams(params, token)
		.then((response) => {
			let { data, success, error } = response;
			if (success) {
				dispatch({ type: ScholarEvaluationsActionTypes.loadStages, payload: data });
			} else {
				dispatch({ type: ScholarEvaluationsActionTypes.error, payload: error });
			}
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			dispatch({ type: ScholarEvaluationsActionTypes.error, payload: err.message });
			LoggerService.error(err);
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change the current stage and change the evaluation.
 * @param {object} payload - New current Stage.
 */
function onChangeStage(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: true });
	dispatch({ type: ScholarEvaluationsActionTypes.loadStageId, payload: payload.stageId });

	const token = localStorage.getItem('token');
	evaluations
		.getAllWithParams(payload, token)
		.then((response) => {
			dispatch({
				type: ScholarEvaluationsActionTypes.loadScholarEvaluation,
				payload: response,
			});
			dispatch({
				type: ScholarEvaluationsActionTypes.setCurrentStage,
				payload: payload.stage[0],
			});
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			dispatch({ type: ScholarEvaluationsActionTypes.error, payload: err.message });
			LoggerService.error(err);
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch To Change in ui a realoaded evaluation
 * @param {object} payload Current stage
 */
function onReload(dispatch, payload) {
	onChangeStage(dispatch, payload);
}

/**
 * @param {Function} dispatch - Function to save the evaluation.
 * @param {object} payload - Evaluation for save.
 */
function onSaveEvaluation(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: true });

	const token = localStorage.getItem('token');
	evaluations
		.post(payload, token)
		.then((response) => {
			onChangeStage(dispatch, response.data);
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
			showSuccessToast({ title: locale.successSaving });
		})
		.catch((err) => {
			dispatch({ type: ScholarEvaluationsActionTypes.error, payload: err.message });
			showErrorToast({ title: locale.somethingHappened, description: locale.errorSaving });
			LoggerService.error(err);
			dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to close evaluation in reducer
 * @param {object} payload - Id of evaluation to close
 */
function onCloseEvaluation(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	try {
		validateCloseEvaluationRole(payload.currentUser);
		validateApprovals(payload.approvals);
		evaluations
			.put({ evaluationId: payload.evaluationId }, token)
			.then((response) => {
				onChangeStage(dispatch, response.data);
				dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
			})
			.catch((err) => {
				showWarningToast({
					title: locale.errorClosing,
					description: err.message,
				});
				dispatch({ type: ScholarEvaluationsActionTypes.error, payload: err.message });
				LoggerService.error(err);
				dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
			});
	} catch (err) {
		LoggerService.error(err);
		showWarningToast({
			title: locale.errorClosing,
			description: err.message,
		});
		dispatch({ type: ScholarEvaluationsActionTypes.error, payload: err.message });
		dispatch({ type: ScholarEvaluationsActionTypes.loading, payload: false });
	}
}

/**
 * Load all approvals depending the evaluation loaded
 *
 * @param {Function} dispatch updates in ui approvals loaded
 * @param {object} payload Id of evaluation to load approvals
 */
function onLoadApprovals(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loadingApprovals, payload: true });

	const token = localStorage.getItem('token');
	approvals
		.post(payload, token)
		.then((response) => {
			dispatch({ type: ScholarEvaluationsActionTypes.loadApprovals, payload: response });
			dispatch({ type: ScholarEvaluationsActionTypes.loadingApprovals, payload: false });
		})
		.catch((error) => {
			showErrorToast({
				title: locale.errorLoadingApprovals,
				description: error.message,
			});
			LoggerService.error(error);
			dispatch({ type: ScholarEvaluationsActionTypes.loadingApprovals, payload: false });
		});
}

/**
 * Change status of approval message when has error
 *
 * @param {Function} dispatch To Update in Ui
 * @param {object} payload error state
 */
function onSetApprovalsError(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.approvalsError, payload });
}

/**
 * Change status of approval when is clicked
 *
 * @param {Function} dispatch To Update in Ui
 * @param {object} payload Approval with issuer and evaluation version
 */
function onCheckApproval(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.loadingApprovals, payload: true });
	const token = localStorage.getItem('token');

	approvals
		.put(payload, token)
		.then((response) => {
			showSuccessToast({
				title: response.checked
					? locale.approvals.markSuccess
					: locale.approvals.unmarkSuccess,
			});
			onLoadApprovals(dispatch, response.evaluationId);
			dispatch({ type: ScholarEvaluationsActionTypes.loadingApprovals, payload: false });
		})
		.catch((err) => {
			showWarningToast({
				title: locale.approvals.markFailTitle,
				list: locale.approvals.markFailList,
			});
			LoggerService.error(err);
			dispatch({ type: ScholarEvaluationsActionTypes.loadingApprovals, payload: false });
		});
}

/**
 * @param {Function} dispatch function to update in ui
 * @param {object} payload Error message
 */
function onError(dispatch, payload) {
	dispatch({ type: ScholarEvaluationsActionTypes.error, payload });
}

/**
 * Factory actions.
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - Actions.
 */
export default function ScholarEvaluationsActionFactory(dispatch) {
	return {
		onLoadApprovals: (payload) => onLoadApprovals(dispatch, payload),
		onLoadScholarId: (payload) => onLoadScholarId(dispatch, payload),
		onLoad: (payload) => onLoad(dispatch, payload),
		onReload: (payload) => onReload(dispatch, payload),
		onChangeStage: (payload) => onChangeStage(dispatch, payload),
		onSaveEvaluation: (payload) => onSaveEvaluation(dispatch, payload),
		onCloseEvaluation: (payload) => onCloseEvaluation(dispatch, payload),
		onSetApprovalsError: (payload) => onSetApprovalsError(dispatch, payload),
		onCheckApproval: (payload) => onCheckApproval(dispatch, payload),
		onError: (payload) => onError(dispatch, payload),
	};
}
