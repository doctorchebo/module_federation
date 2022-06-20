import { ScholarDetailActions } from './enums';
import apiScholar from 'api/models/scholars';
import apiScholarStageSummary from 'api/models/scholarStageSummary';
import apiScholarLastEvaluationSummary from 'api/models/scholarLastEvaluationSummary';
import LoggerService from 'services/LoggerService';
import { showErrorToast, showSuccessToast } from 'helpers/toast';
import locale from 'pages/dashboard/sections/scholars/locale/en.json';
import trainningByScholar from 'api/models/trainnings';
import apiScholarStageScore from 'api/models/scholarStageScore';
import apiEventsSummary from 'api/models/eventsSummary';

/**
 *
 * @param {Function} dispatch - function to change state of onImporting.
 * @param {boolean} payload - activate or deactivate sidebar.
 */
function OnGetScholarById(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiScholar
		.getSingle(payload, token)
		.then((response) => {
			let { data, success, error } = response;
			if (success) {
				dispatch({ type: ScholarDetailActions.OnGetScholarById, payload: data });
			} else {
				errorAction(error, dispatch);
			}
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 * Set loading on true or false
 *
 * @param {Function} payload -
 * @param {Function} dispatch -
 */
function setLoading(payload, dispatch) {
	dispatch({ type: ScholarDetailActions.Loading, payload: payload });
}

/**
 *
 * @param {Array} payload -
 * @param {Function} dispatch -
 */
function errorAction(payload, dispatch) {
	dispatch({ type: ScholarDetailActions.Error, payload: payload });
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - scholar object.
 */
function onScholarUpdate(dispatch, payload) {
	dispatch({ type: ScholarDetailActions.updateScholar, payload: true });
	const token = localStorage.getItem('token');
	apiScholar
		.put(payload, token, `${payload.id}/details`)
		.then((response) => {
			dispatch({ type: ScholarDetailActions.Loading, payload: response });
			showSuccessToast({
				title: locale.updateScholarForm.updateSuccess,
			});
		})
		.catch((err) => {
			dispatch({ type: ScholarDetailActions.Error, payload: err.message });
			showErrorToast({
				title: locale.updateScholarForm.updateError,
			});
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: ScholarDetailActions.Loading, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} params - Object to add params to request
 */
function onLoadStageSummaryOfScholar(dispatch, params) {
	setLoading({ type: ScholarDetailActions.Loading, payload: true }, dispatch);
	const token = localStorage.getItem('token');
	apiScholarStageSummary
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ScholarDetailActions.OnGetScholarStageSummary,
				payload: response.data,
			});
			dispatch({ type: ScholarDetailActions.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 *
 * @param {Function} dispatch - Action to change state of onImporting.
 * @param {object} payload - object with data to import of specific trainnin by scholar.
 */
function onGetTrainingsByScholar(dispatch, payload) {
	const token = localStorage.getItem('token');
	trainningByScholar
		.getSingle(payload, token)
		.then((response) => {
			let { error } = response;
			if (response) {
				dispatch({ type: ScholarDetailActions.OnGetTrainingsByScholar, payload: response });
			} else {
				errorAction(error, dispatch);
			}
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - params.
 */
function onCountEvents(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiEventsSummary
		.getSingle(payload, token)
		.then((response) => {
			let { error } = response;
			if (response) {
				dispatch({
					type: ScholarDetailActions.onCountEvents,
					payload: response,
				});
			} else {
				errorAction(error, dispatch);
			}
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 *
 * @param {Function} dispatch - function to change state of onImporting.
 * @param {boolean} params - Object to add params to request
 */
function OnGetLastStageEvaluationSkills(dispatch, params) {
	const token = localStorage.getItem('token');
	apiScholarLastEvaluationSummary
		.getAllWithParams(params, token)
		.then((response) => {
			let { data, success, error } = response;
			if (success) {
				dispatch({
					type: ScholarDetailActions.OnGetLastStageEvaluationSkills,
					payload: data,
				});
				dispatch({
					type: ScholarDetailActions.LoadingLastEvaluationSummary,
					payload: false,
				});
			} else {
				dispatch({
					type: ScholarDetailActions.ErrorLastStageEvaluationSkills,
					payload: error,
				});
			}
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 *
 * @param {Function} dispatch - Action to change state of onImporting.
 * @param {object} payload - object with data to import of specific stage score by scholar.
 */
function onGetStageScoreByScholar(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiScholarStageScore
		.getSingle(payload, token)
		.then((response) => {
			let { error } = response;
			if (response) {
				dispatch({
					type: ScholarDetailActions.OnGetStageScoreByScholar,
					payload: response.data,
				});
			} else {
				errorAction(error, dispatch);
			}
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 *
 * @param {Function} dispatch - Action to be ejecuted.
 * @returns {object} - Object with specific Scholar function.
 */
export default function ScholarActionFactory(dispatch) {
	return {
		OnGetScholarById: (payload) => OnGetScholarById(dispatch, payload),
		setLoading: (payload) => setLoading(payload, dispatch),
		onError: (payload) => errorAction(payload, dispatch),
		onScholarUpdate: (payload) => onScholarUpdate(dispatch, payload),
		onLoadStageSummaryOfScholar: (params) => onLoadStageSummaryOfScholar(dispatch, params),
		onGetTrainingsByScholar: (payload) => onGetTrainingsByScholar(dispatch, payload),
		onGetStageScoreByScholar: (payload) => onGetStageScoreByScholar(dispatch, payload),
		onCountEvents: (payload) => onCountEvents(dispatch, payload),
		OnGetLastStageEvaluationSkills: (payload) =>
			OnGetLastStageEvaluationSkills(dispatch, payload),
	};
}
