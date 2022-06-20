import { CandidatesActionTypes } from './enum';
import apiCandidate from 'api/models/candidates';
import LoggerService from 'services/LoggerService';
import programVersionsAPI from 'api/models/programVersions';
import apiStatusType from 'api/models/status';
import apiParse from 'api/models/apiParse';
import apiCandidatesBatch from 'api/models/apiCandidatesBatch';
import { showSuccessToast, showErrorToast } from 'helpers/toast';
import locale from 'pages/dashboard/sections/candidates/locale/en.json';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadCandidates(dispatch) {
	dispatch({ type: CandidatesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiCandidate
		.getAll(token)
		.then((response) => {
			dispatch({ type: CandidatesActionTypes.loadCandidates, payload: response.data });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			dispatch({ type: CandidatesActionTypes.resetMessages, payload: true });
		})
		.catch((err) => {
			dispatch({ type: CandidatesActionTypes.Error, payload: err.message });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			LoggerService.error(err);
			dispatch({ type: CandidatesActionTypes.resetMessages, payload: true });
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadProgramVersions(dispatch) {
	dispatch({ type: CandidatesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	programVersionsAPI
		.getAllWithParams(token)
		.then((response) => {
			dispatch({
				type: CandidatesActionTypes.loadPrograms,
				payload: response.data,
			});
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
		})
		.catch((err) => {
			dispatch({ type: CandidatesActionTypes.Error, payload: err.message });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadStatus(dispatch) {
	dispatch({ type: CandidatesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiStatusType
		.getAll(token)
		.then((response) => {
			dispatch({ type: CandidatesActionTypes.loadStatus, payload: response.data });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
		})
		.catch((err) => {
			dispatch({ type: CandidatesActionTypes.Error, payload: err.message });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			LoggerService.error(err);
		});
}

/**
 * Action triggered on import scholars.
 *
 * @param {Function} dispatch action to reducer.
 * @param {object} payload .
 */
function onImportFiles(dispatch, payload) {
	dispatch({ type: CandidatesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiParse
		.post(payload, token, null, {})
		.then((response) => {
			dispatch({ type: CandidatesActionTypes.OnImportFile, payload: response });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			dispatch({ type: CandidatesActionTypes.resetMessages, payload: true });
		})
		.catch((err) => {
			dispatch({ type: CandidatesActionTypes.Error, payload: err.message });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			LoggerService.error(err);
		});
}

/**
 * Action triggered on import scholars.
 *
 * @param {Function} dispatch action to reducer.
 * @param {object} payload .
 */
function onImportCandidates(dispatch, payload) {
	dispatch({ type: CandidatesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiCandidatesBatch
		.post(payload, token)
		.then((response) => {
			dispatch({ type: CandidatesActionTypes.OnImportCandidate, payload: response });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			onLoadCandidates(dispatch);
		})
		.catch((err) => {
			dispatch({ type: CandidatesActionTypes.Error, payload: err.message });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			LoggerService.error(err);
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Candidate object.
 */
function onCandidateUpdate(dispatch, payload) {
	dispatch({ type: CandidatesActionTypes.updateCandidate, payload: true });
	const token = localStorage.getItem('token');
	apiCandidate
		.put(payload, token, payload.id)
		.then((response) => {
			dispatch({ type: CandidatesActionTypes.updateCandidate, payload: response.success });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			if (response.success) {
				onLoadCandidates(dispatch);
				showSuccessToast({
					title: locale.updateCandidateForm.updateSuccess,
				});
			}
		})
		.catch((err) => {
			dispatch({ type: CandidatesActionTypes.Error, payload: err.message });
			dispatch({ type: CandidatesActionTypes.loading, payload: false });
			showErrorToast({
				title: locale.updateCandidateForm.updateError,
			});
			LoggerService.error(err);
		});
}

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch - Clean sidebar content.
 */
function RemoveReports(dispatch) {
	dispatch({ type: CandidatesActionTypes.OnImportedRestore, payload: null });
}

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch - Clean sidebar content.
 * @param {boolean} payload - isMessageDisplayed value.
 */
function ResetMessages(dispatch, payload) {
	dispatch({ type: CandidatesActionTypes.resetMessages, payload: payload });
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function CandidateActionFactory(dispatch) {
	return {
		onLoadCandidates: () => onLoadCandidates(dispatch),
		onLoadProgramVersions: () => onLoadProgramVersions(dispatch),
		onLoadStatus: () => onLoadStatus(dispatch),
		onImportFiles: (payload) => onImportFiles(dispatch, payload),
		onImportCandidates: (payload) => onImportCandidates(dispatch, payload),
		onRemoveReports: () => RemoveReports(dispatch),
		onCandidateUpdate: (payload) => onCandidateUpdate(dispatch, payload),
		ResetMessages: (payload) => ResetMessages(dispatch, payload),
	};
}
