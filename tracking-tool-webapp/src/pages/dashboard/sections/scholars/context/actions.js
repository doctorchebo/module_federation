import apiScholar from 'api/models/scholars';
import programVersionsAPI from 'api/models/programVersions';
import apiStatusType from 'api/models/status';
import apiApplicantsTypes from 'api/models/applicantsTypes';
import apiApplicants from 'api/models/applicants';
import programsInProgressAPI from 'api/models/programsInProgress';
import updateProgramVersionAPI from 'api/models/updateProgramVersion';
import LoggerService from 'services/LoggerService';
import { ScholarsActionTypes } from './enums';
import { ProgramVersionsActionTypes } from '../../programVersions/context/enums';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Object to change current page.
 */
function onLoadScholars(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiApplicants
		.getAllWithParams(payload, token)
		.then((response) => {
			const { data, pagination } = response;
			dispatch({
				type: ScholarsActionTypes.load,
				payload: { data, pagination },
			});
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: ScholarsActionTypes.loading, payload: false });
		});
}

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
			dispatch({
				type: ProgramVersionsActionTypes.load,
				payload: response.data,
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
function onLoadStatus(dispatch) {
	const token = localStorage.getItem('token');
	apiStatusType
		.getAll(token)
		.then((response) => {
			dispatch({ type: ScholarsActionTypes.loadStatus, payload: response.data });
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadApplicantsTypes(dispatch) {
	const token = localStorage.getItem('token');
	apiApplicantsTypes
		.getAll(token)
		.then((response) => {
			dispatch({ type: ScholarsActionTypes.loadApplicantsTypes, payload: response.data });
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Object to change current page.
 */
function onLoadProgramsInProgress(dispatch, payload) {
	const token = localStorage.getItem('token');
	const params = { status: 'InProgress' };
	programsInProgressAPI
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ScholarsActionTypes.loadProgramsInProgress,
				payload: response,
			});
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Object to change current page.
 */
function onChangeProgramVersion(dispatch, payload) {
	const token = localStorage.getItem('token');
	updateProgramVersionAPI
		.put(payload, token)
		.then((response) => {
			onLoadScholars(dispatch);
			dispatch({
				type: ScholarsActionTypes.onChangeProgramVersion,
				payload: response,
			});
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * Action triggered on import scholars.
 *
 * @param {Function} dispatch action to reducer.
 * @param {object} payload .
 */
function onImportScholars(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiScholar
		.post(payload, token, null, {})
		.then((response) => {
			dispatch({ type: ScholarsActionTypes.OnImportScholar, payload: response });
			onLoadScholars(dispatch, { pageNumber: 1 });
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: ScholarsActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change set selected scholar.
 * @param {object} payload - selected scholar.
 */
function onSelectScholar(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.onSelectScholar, payload: payload });
}

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch - Function to open the right side bar.
 * @param {boolean} payload - Sets right side bar visible attribute.
 */
function openRightSideBarEvent(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.openRightSideBarEvent, payload: payload });
}

/**
 *
 * @param {Function} dispatch - Function to open the right side bar program.
 * @param {boolean} payload - Sets right side bar visible attribute.
 */
function openRightSideBarProgram(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.openRightSideBarProgram, payload: payload });
}

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch - Clean sidebar content.
 */
function RemoveReports(dispatch) {
	dispatch({ type: ScholarsActionTypes.OnImportedRestore, payload: null });
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} params - Object to add params to request
 */
function onLoadStageSummaryOfScholar(dispatch, params) {
	dispatch({ type: ProgramVersionsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	programVersionsAPI
		.getAllWithParams(params, token)
		.then((response) => {
			dispatch({
				type: ProgramVersionsActionTypes.load,
				payload: response.data,
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
 * @param {object} payload - Object to add params to request
 */
function changePaginator(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.OnChangePagination, payload });
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function ScholarsActionFactory(dispatch) {
	return {
		onLoadScholars: (payload) => onLoadScholars(dispatch, payload),
		onLoadProgramsInProgress: (payload) => onLoadProgramsInProgress(dispatch, payload),
		onImportFiles: (payload) => onImportScholars(dispatch, payload),
		onChangeProgramVersion: (payload) => onChangeProgramVersion(dispatch, payload),
		openRightSideBarEvent: (payload) => openRightSideBarEvent(dispatch, payload),
		openRightSideBarProgram: (payload) => openRightSideBarProgram(dispatch, payload),
		onSelectScholar: (payload) => onSelectScholar(dispatch, payload),
		onRemoveReports: () => RemoveReports(dispatch),
		onLoadProgramVersions: (payload) => onLoadProgramVersions(dispatch, payload),
		onLoadStatus: () => onLoadStatus(dispatch),
		onLoadApplicantsTypes: () => onLoadApplicantsTypes(dispatch),
		searchScholar: (payload) => onLoadScholars(dispatch, payload),
		onLoadStageSummaryOfScholar: (params) => onLoadStageSummaryOfScholar(dispatch, params),
		changePaginator: (payload) => changePaginator(dispatch, payload),
	};
}
