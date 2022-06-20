import { EvaluationSummaryActionTypes } from './enums';
import apiProgramVersions from 'api/models/programVersions';
import evaluationScholarsApi from 'api/models/evaluationScholars';
import LoggerService from 'services/LoggerService';
import { ProgramVersionsActionTypes } from '../enums';
import locale from '../../locale/en.json';
import { OnSendEvaluationReports } from '../../helpers/sendEvaluation';

/**
 * @param {Function} dispatch - Function to load the program version.
 * @param {string} payload - Program Version Id.
 */
function onLoadProgramVersion(dispatch, payload) {
	const token = localStorage.getItem('token');

	apiProgramVersions
		.getSingle(payload, token)
		.then((response) => {
			dispatch({
				type: EvaluationSummaryActionTypes.loadProgramVersion,
				payload: response,
			});
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: EvaluationSummaryActionTypes.error, payload: err.message });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - Program Version GUID Id.
 */
function onGetStages(dispatch, payload) {
	const route = `${payload}/stages`;
	const token = localStorage.getItem('token');
	apiProgramVersions
		.getSingle(route, token)
		.then((response) => {
			dispatch({ type: EvaluationSummaryActionTypes.getStages, payload: response });
		})
		.catch((err) => {
			dispatch({ type: EvaluationSummaryActionTypes.error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * @param {Function} dispatch - Function to load all scholar in program version.
 * @param {object} payload - Program Version Id.
 */
function onLoadScholars(dispatch, payload) {
	dispatch({ type: EvaluationSummaryActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	const route = `program-version/${payload.programVersionId}/stage/${payload.stageId}`;
	const pendingScholars = [];
	const approvedScholars = [];
	const failedScholars = [];

	evaluationScholarsApi
		.getSingle(route, token)
		.then((response) => {
			let { data, success, error } = response;
			if (success) {
				data.forEach((scholar) => {
					if (scholar.evaluationStatus === locale.EvaluationColumns.Pending) {
						pendingScholars.push(scholar);
					} else if (scholar.evaluationStatus === locale.EvaluationColumns.Approved) {
						approvedScholars.push(scholar);
					} else if (scholar.evaluationStatus === locale.EvaluationColumns.Failed) {
						failedScholars.push(scholar);
					}
				});
				if (pendingScholars.length === 0 && data.length > 0) {
					dispatch({ type: EvaluationSummaryActionTypes.sendEvaluation, payload: true });
				} else {
					dispatch({ type: EvaluationSummaryActionTypes.sendEvaluation, payload: false });
				}
				dispatch({
					type: EvaluationSummaryActionTypes.loadScholars,
					payload: { pendingScholars, approvedScholars, failedScholars },
				});
			} else {
				dispatch({ type: EvaluationSummaryActionTypes.error, payload: error });
			}
			dispatch({ type: EvaluationSummaryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: EvaluationSummaryActionTypes.error, payload: err.message });
			dispatch({ type: EvaluationSummaryActionTypes.loading, payload: false });
		});
}

/**
 * Factory actions.
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - Actions.
 */
export default function EvaluationSummaryActionFactory(dispatch) {
	return {
		onLoadProgramVersion: (payload) => onLoadProgramVersion(dispatch, payload),
		onGetStages: (payload) => onGetStages(dispatch, payload),
		OnSendEvaluationReports: (payload) =>
			OnSendEvaluationReports(dispatch, payload, ProgramVersionsActionTypes),
		onLoadScholars: (payload) => onLoadScholars(dispatch, payload),
	};
}
