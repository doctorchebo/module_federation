import programVersionsAPI from 'api/models/programVersions';
import apiUsers from 'api/models/users';
import apiProgramVersionsStatus from 'api/models/programVersionsStatus';
import apiPrograms from 'api/models/programs';
import LoggerService from 'services/LoggerService';
import { ProgramVersionsActionTypes } from './enums';
import { OnSendEvaluationReports } from '../helpers/sendEvaluation';
import locale from '../locale/en.json';
import { showSuccessToast } from 'helpers/toast';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Object to change current page.
 */
function onLoadProgramVersions(dispatch, payload) {
	dispatch({ type: ProgramVersionsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	programVersionsAPI
		.getAllWithParams(payload, token)
		.then((response) => {
			const { data, pagination } = response;
			dispatch({
				type: ProgramVersionsActionTypes.load,
				payload: { data, pagination },
			});
			dispatch({ type: ProgramVersionsActionTypes.loading, payload: false });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
			dispatch({ type: ProgramVersionsActionTypes.loading, payload: false });
		});
}
/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadProgramVersionsStatus(dispatch) {
	apiProgramVersionsStatus
		.getAllWithParams()
		.then((response) => {
			dispatch({ type: ProgramVersionsActionTypes.loadStatus, payload: response });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadCoordinators(dispatch) {
	const params = { pageSize: 100, filterOption: 'roles', filterValue: locale.coordinator.name };
	const token = localStorage.getItem('token');
	apiUsers
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({ type: ProgramVersionsActionTypes.loadCoordinators, payload: response });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadPrograms(dispatch) {
	apiPrograms
		.getAllWithParams()
		.then((response) => {
			dispatch({ type: ProgramVersionsActionTypes.loadPrograms, payload: response });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * Action triggered on import program version.
 *
 * @param {Function} dispatch action to reducer.
 * @param {object} payload .
 */
function onImportVersions(dispatch, payload) {
	dispatch({ type: ProgramVersionsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	programVersionsAPI
		.post(payload, token, null, {})
		.then((response) => {
			dispatch({ type: ProgramVersionsActionTypes.OnImportVersion, payload: response });
			onLoadProgramVersions(dispatch, { pageNumber: 1 });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: ProgramVersionsActionTypes.loading, payload: false });
		});
}

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch -
 */
function RemoveReports(dispatch) {
	dispatch({ type: ProgramVersionsActionTypes.OnImportVersion, payload: null });
}

/**
 *
 * @param {Function} dispatch - Function to get stages.
 * @param {string} payload - Stage Guid Id.
 */
function onGetStages(dispatch, payload) {
	dispatch({ type: ProgramVersionsActionTypes.loadingStages, payload: true });
	const route = `${payload}/stages`;
	const token = localStorage.getItem('token');
	programVersionsAPI
		.getSingle(route, token)
		.then((response) => {
			dispatch({ type: ProgramVersionsActionTypes.onGetStages, payload: response.data });
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: ProgramVersionsActionTypes.loadingStages, payload: false });
		});
}

/**
 *	Get All Trainers and Coordinator users
 *
 * @param {Function} dispatch - Function to get trainers os subject.
 */
function onGetTrainers(dispatch) {
	dispatch({ type: ProgramVersionsActionTypes.loadingTrainers, payload: true });

	const paramsCoordinator = {
		pageSize: 100,
		filterOption: 'roles',
		filterValue: locale.coordinator.name,
	};
	const paramsTrainer = {
		pageSize: 100,
		filterOption: 'roles',
		filterValue: locale.trainer.name,
	};

	const token = localStorage.getItem('token');
	const promises = [
		apiUsers.getAllWithParams(paramsCoordinator, token),
		apiUsers.getAllWithParams(paramsTrainer, token),
	];
	Promise.all(promises)
		.then((response) => {
			dispatch({
				type: ProgramVersionsActionTypes.onGetTrainers,
				payload: response.reduce((previousUser, currentUser) =>
					previousUser.data.concat(currentUser.data)
				),
			});
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: ProgramVersionsActionTypes.loadingTrainers, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch - Function to change a program version.
 * @param {string} payload - new program version information.
 */
function onPutProgramVersion(dispatch, payload) {
	dispatch({ type: ProgramVersionsActionTypes.OnPutProgramVersion, payload: true });
	const token = localStorage.getItem('token');
	programVersionsAPI
		.put(payload, token)
		.then(() => {
			showSuccessToast({
				title: locale.updateSuccess,
			});
		})
		.catch((err) => {
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch -
 * @returns {object} - actions
 */
export default function ProgramVersionsActionFactory(dispatch) {
	return {
		onLoadProgramVersionsStatus: () => onLoadProgramVersionsStatus(dispatch),
		onLoadPrograms: () => onLoadPrograms(dispatch),
		onLoadProgramVersions: (payload) => onLoadProgramVersions(dispatch, payload),
		onImportFiles: (payload) => onImportVersions(dispatch, payload),
		onRemoveReports: () => RemoveReports(dispatch),
		OnSendEvaluationReports: (payload) =>
			OnSendEvaluationReports(dispatch, payload, ProgramVersionsActionTypes),
		onGetStages: (payload) => onGetStages(dispatch, payload),
		onGetTrainers: (payload) => onGetTrainers(dispatch, payload),
		OnPutProgramVersion: (payload) => onPutProgramVersion(dispatch, payload),
		searchProgramVersion: (payload) => onLoadProgramVersions(dispatch, payload),
		onLoadCoordinators: () => onLoadCoordinators(dispatch),
	};
}
