import { ApprovalHistoryActionTypes } from './enums';
import programVersionsMockAPI from 'api/models/programVersionsMock';
import LoggerService from 'services/LoggerService';
import activitiesAPI from 'api/models/activities';
import candidateActivitiesApi from 'api/models/candidate-activity';

/**
 * @param {Function} dispatch - Function to load the program version.
 * @param {string} payload - Program Version Id.
 */
function onLoadProgramVersion(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	programVersionsMockAPI
		.getSingle(payload, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadProgramVersion,
				payload: response,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load the program version.
 * @param {string} payload - Program Version Id.
 */
function onLoadActivitiesByProgramVersion(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = { programVersionId: payload };
	const token = localStorage.getItem('token');
	activitiesAPI
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadActivities,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load postulations approved.
 * @param {object} payload - activityId.
 */
function onLoadPostulationsApproved(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = {
		activityType: 'Postulation',
		activityId: payload,
		status: 'Passed',
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadPostulationsApproved,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}
/**
 * @param {Function} dispatch - Function to load postulations failed.
 * @param {object} payload - activityId.
 */
function onLoadPostulationsFailed(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = {
		activityType: 'Postulation',
		activityId: payload,
		status: 'Failed',
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadPostulationsFailed,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load postulations in progress.
 * @param {object} payload - activityId.
 */
function onLoadPostulationsInProgress(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = {
		activityType: 'Postulation',
		activityId: payload,
		status: 'InProgress',
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadPostulationsInProgress,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load info talks in progress.
 * @param {object} payload - activityId.
 */
function onLoadInfoTalksInProgress(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = {
		activityType: 'Informative Talk',
		activityId: payload,
		status: 'InProgress',
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadInfTalksInProgress,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load info talks approved.
 * @param {object} payload - activityId.
 */
function onLoadInfoTalksApproved(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = {
		activityType: 'Informative Talk',
		activityId: payload,
		status: 'Passed',
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadInfTalksApproved,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load info talks failed.
 * @param {object} payload - activityId.
 */
function onLoadInfoTalksFailed(dispatch, payload) {
	dispatch({ type: ApprovalHistoryActionTypes.loading, payload: true });
	const params = {
		activityType: 'Informative Talk',
		activityId: payload,
		status: 'Failed',
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ApprovalHistoryActionTypes.loadInfTalksFailed,
				payload: response.data,
			});
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ApprovalHistoryActionTypes.error, payload: err.message });
			dispatch({ type: ApprovalHistoryActionTypes.loading, payload: false });
		});
}
/**
 * Factory actions.
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - Actions.
 */
export default function ApprovalHistoryActionFactory(dispatch) {
	return {
		onLoadProgramVersion: (payload) => onLoadProgramVersion(dispatch, payload),
		onLoadActivitiesByProgramVersion: (payload) =>
			onLoadActivitiesByProgramVersion(dispatch, payload),
		onLoadInfoTalksFailed: (payload) => onLoadInfoTalksFailed(dispatch, payload),
		onLoadInfoTalksApproved: (payload) => onLoadInfoTalksApproved(dispatch, payload),
		onLoadInfoTalksInProgress: (payload) => onLoadInfoTalksInProgress(dispatch, payload),
		onLoadPostulationsApproved: (payload) => onLoadPostulationsApproved(dispatch, payload),
		onLoadPostulationsFailed: (payload) => onLoadPostulationsFailed(dispatch, payload),
		onLoadPostulationsInProgress: (payload) => onLoadPostulationsInProgress(dispatch, payload),
	};
}
