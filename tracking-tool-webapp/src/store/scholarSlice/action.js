import apiScholar from 'api/models/scholars';
import { showErrorToast, showSuccessToast } from 'helpers/toast';
import { ScholarActions } from './types';
import LoggerService from 'services/LoggerService';
import locale from 'pages/dashboard/sections/scholars/locale/en.json';
import apiScholarStageSummary from 'api/models/scholarStageSummary';
import trainningByScholar from 'api/models/trainnings';
import apiEventsSummary from 'api/models/eventsSummary';
import apiScholarLastEvaluationSummary from 'api/models/scholarLastEvaluationSummary';
import apiScholarStageScore from 'api/models/scholarStageScore';

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadScholarById(payload) {
	return { type: ScholarActions.onGetScholarById, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onLoadScholar(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(setLoading(true));
		apiScholar
			.getSingle(payload, token)
			.then((response) => {
				let { data, success, error } = response;
				if (success) {
					dispatch(onLoadScholarById(data));
				} else {
					dispatch(errorAction(error, dispatch));
				}
			})
			.catch((err) => {
				LoggerService.error(err);
				dispatch(errorAction(err, dispatch));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function setLoading(payload) {
	return {
		type: ScholarActions.loading,
		payload: payload,
	};
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadLastStageEvaluationSkills(payload) {
	return { type: ScholarActions.onGetLastStageEvaluationSkills, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function errorAction(payload) {
	return { type: ScholarActions.error, payload: payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onScholarUpdate(payload) {
	return (dispatch) => {
		dispatch(setLoading(true));
		const token = localStorage.getItem('token');
		apiScholar
			.put(payload, token, `${payload.id}/details`)
			.then((response) => {
				dispatch(setLoading(response));
				showSuccessToast({
					title: locale.updateScholarForm.updateSuccess,
				});
			})
			.catch((err) => {
				dispatch(errorAction(err.message));
				showErrorToast({
					title: locale.updateScholarForm.updateError,
				});
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadScholarStageSummary(payload) {
	return { type: ScholarActions.onGetScholarStageSummary, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onLoadStageSummaryOfScholar(payload) {
	return (dispatch) => {
		dispatch(setLoading(true));
		const token = localStorage.getItem('token');
		apiScholarStageSummary
			.getAllWithParams(payload, token)
			.then((response) => {
				dispatch(onLoadScholarStageSummary(response.data));
				dispatch(setLoading(true));
			})
			.catch((err) => {
				LoggerService.error(err);
				dispatch(errorAction(err, dispatch));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadTrainingsByScholar(payload) {
	return { type: ScholarActions.onGetTrainingsByScholar, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onGetTrainingsByScholar(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(setLoading(true));
		trainningByScholar
			.getSingle(payload, token)
			.then((response) => {
				let { error } = response;
				if (response) {
					dispatch(onLoadTrainingsByScholar(response));
				} else {
					dispatch(errorAction(error, dispatch));
				}
			})
			.catch((err) => {
				LoggerService.error(err);
				dispatch(errorAction(err, dispatch));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadCountEvents(payload) {
	return { type: ScholarActions.onCountEvents, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onCountEvents(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(setLoading(true));
		apiEventsSummary
			.getSingle(payload, token)
			.then((response) => {
				let { error } = response;
				if (response) {
					dispatch(onLoadCountEvents(response));
				} else {
					dispatch(errorAction(error, dispatch));
				}
			})
			.catch((err) => {
				LoggerService.error(err);
				dispatch(errorAction(err, dispatch));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadingLastEvaluationSummary(payload) {
	return { type: ScholarActions.loadingLastEvaluationSummary, payload };
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadErrorLastStageEvaluationSkills(payload) {
	return { type: ScholarActions.errorLastStageEvaluationSkills, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onGetLastStageEvaluationSkills(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(setLoading(true));
		apiScholarLastEvaluationSummary
			.getAllWithParams(payload, token)
			.then((response) => {
				let { data, success, error } = response;
				if (success) {
					dispatch(onLoadLastStageEvaluationSkills(data));
					dispatch(onLoadingLastEvaluationSummary(false));
				} else {
					dispatch(onLoadErrorLastStageEvaluationSkills(error));
				}
			})
			.catch((err) => {
				LoggerService.error(err);
				dispatch(errorAction(err, dispatch));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function onLoadStageScoredByScholar(payload) {
	return { type: ScholarActions.onGetStageScoreByScholar, payload };
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function onGetStageScoreByScholar(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(setLoading(true));
		apiScholarStageScore
			.getSingle(payload, token)
			.then((response) => {
				let { error } = response;
				if (response) {
					dispatch(onLoadStageScoredByScholar(response.data));
				} else {
					dispatch(errorAction(error, dispatch));
				}
			})
			.catch((err) => {
				LoggerService.error(err);
				dispatch(errorAction(err, dispatch));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}
