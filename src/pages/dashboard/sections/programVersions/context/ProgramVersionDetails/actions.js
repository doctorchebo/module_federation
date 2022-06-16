import { ProgramVersionDetailsActionTypes } from './enums';
import programVersionsMockAPI from 'api/models/programVersionsMock';
import LoggerService from 'services/LoggerService';
import activitiesAPI from 'api/models/activities';
import candidateActivitiesApi from 'api/models/candidate-activity';
import apiCandidate from 'api/models/candidates';
import { mapCandidatesActivitiesToCandidate } from '../../helpers/mappers/mapCandidatesActivitiesToTable';
import locale from '../../locale/en.json';
import { showSuccessToast, showErrorToast, showWarningToast } from 'helpers/toast';

/**
 * @param {Function} dispatch - Function to load the program version.
 * @param {string} payload - Program Version Id.
 */
function onLoadProgramVersion(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	programVersionsMockAPI
		.getSingle(payload, token)
		.then((response) => {
			dispatch({
				type: ProgramVersionDetailsActionTypes.loadProgramVersion,
				payload: response,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.error, payload: err.message });
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load the program version.
 * @param {string} payload - Program Version Id.
 */
function onLoadActivitiesByProgramVersion(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
	const params = { programVersionId: payload };
	const token = localStorage.getItem('token');
	activitiesAPI
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ProgramVersionDetailsActionTypes.loadActivities,
				payload: response.data,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.error, payload: err.message });
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to load the candidates - activity.
 * @param {object} payload - object with the Activity Type and Id.
 */
function onLoadCandidatesByActivityId(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
	const params = {
		activityType: payload.activityType,
		activityId: payload.activityId,
		status: payload.status,
	};
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.getAllWithParams(params, token)
		.then((response) => {
			const candidates = mapCandidatesActivitiesToCandidate(response.data);
			dispatch({
				type: ProgramVersionDetailsActionTypes.loadCandidatesActivities,
				payload: candidates,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.error, payload: err.message });
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - Program Version Id.
 */
function onLoadCandidatesByProgramVersion(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
	const params = { programVersionId: payload };
	const token = localStorage.getItem('token');
	apiCandidate
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ProgramVersionDetailsActionTypes.loadCandidates,
				payload: response.data,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionDetailsActionTypes.error, payload: err.message });
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Candidate array of objects.
 */
function onLoadPromoteCandidatesBetweenActivities(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
	const params = '?activityType=Postulation';
	const token = localStorage.getItem('token');
	candidateActivitiesApi
		.put(payload.candidates, token, `bulk${params}`)
		.then((response) => {
			dispatch({
				type: ProgramVersionDetailsActionTypes.loadPromoteCandidatesBetweenActivities,
				payload: response.success,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
			if (response.success && response.error === '') {
				showSuccessToast({
					title: locale.PromoteCandidates.candidatesUpdatedSuccesslly,
				});
			}
			if (response.success && response.error !== '') {
				showWarningToast({
					title: `${response.error}`,
				});
			}
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionDetailsActionTypes.Error, payload: err.message });
			showErrorToast({
				title: locale.PromoteCandidates.candidatesUpdateFailed,
			});
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.finally(() => {
			onLoadBoardData(dispatch, payload);
			dispatch({
				type: ProgramVersionDetailsActionTypes.loadingActivities,
				payload: false,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}
/**
 * @param {Function} dispatch - Function to load info talks in progress.
 * @param {object} payload - activityId.
 */
function onLoadInfoTalksInProgress(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
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
				type: ProgramVersionDetailsActionTypes.loadInfTalksInProgress,
				payload: response.data,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.error, payload: err.message });
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}
/**
 * @param {Function} dispatch - Function to load postulations in progress.
 * @param {object} payload - activityId.
 */
function onLoadPostulationsInProgress(dispatch, payload) {
	dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: true });
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
				type: ProgramVersionDetailsActionTypes.loadPostulationsInProgress,
				payload: response.data,
			});
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			LoggerService.error(err);
			dispatch({ type: ProgramVersionDetailsActionTypes.error, payload: err.message });
			dispatch({ type: ProgramVersionDetailsActionTypes.loading, payload: false });
		});
}
/**
 * @param {Function} dispatch - Function to load two types of activities in progress.
 * @param {object} payload - state to check the state of loading
 */
function onLoadBoardData(dispatch, payload) {
	dispatch({
		type: ProgramVersionDetailsActionTypes.loadingActivities,
		payload: false,
	});
	const { postulationId, infoTalkId } = payload;
	onLoadInfoTalksInProgress(dispatch, infoTalkId);
	onLoadPostulationsInProgress(dispatch, postulationId);
	dispatch({
		type: ProgramVersionDetailsActionTypes.loadingActivities,
		payload: true,
	});
}
/**
 * Factory actions.
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - Actions.
 */
export default function ProgramVersionDetailsActionFactory(dispatch) {
	return {
		onLoadProgramVersion: (payload) => onLoadProgramVersion(dispatch, payload),
		onLoadActivitiesByProgramVersion: (payload) =>
			onLoadActivitiesByProgramVersion(dispatch, payload),
		onLoadCandidatesByActivityId: (payload) => onLoadCandidatesByActivityId(dispatch, payload),
		onLoadCandidatesByProgramVersion: (payload) =>
			onLoadCandidatesByProgramVersion(dispatch, payload),
		onLoadPromoteCandidatesBetweenActivities: (payload) =>
			onLoadPromoteCandidatesBetweenActivities(dispatch, payload),
		onLoadInfoTalksInProgress: (payload) => onLoadInfoTalksInProgress(dispatch, payload),
		onLoadPostulationsInProgress: (payload) => onLoadPostulationsInProgress(dispatch, payload),
		onLoadBoardData: (payload) => onLoadBoardData(dispatch, payload),
	};
}
