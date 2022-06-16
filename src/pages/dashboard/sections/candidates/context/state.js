import produce from 'immer';
import { CandidatesActionTypes } from './enum';

/**
 * Set an initial state for scholars view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		title: 'Candidates',
		errorMessages: [],
		candidates: [],
		reports: null,
		loading: false,
		programVersions: [],
		statusType: [],
		fileTypes: '.csv',
		dataJson: [],
		candidate: {},
		data: {},
		isMessageDisplayed: true,
	};
}

/**
 * Reducer for scholars view.
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case CandidatesActionTypes.loadCandidates:
				draft.candidates = payload;
				break;
			case CandidatesActionTypes.loading:
				draft.loading = payload;
				break;
			case CandidatesActionTypes.Error:
				draft.errorMessages = payload;
				break;
			case CandidatesActionTypes.loadStatus:
				draft.statusType = payload;
				break;
			case CandidatesActionTypes.loadPrograms:
				draft.programVersions = payload;
				break;
			case CandidatesActionTypes.updateCandidate:
				draft.isUpdated = payload;
				break;
			case CandidatesActionTypes.OnImportFile:
				draft.data = payload;
				draft.dataJson = payload.data;
				break;
			case CandidatesActionTypes.OnImportCandidate:
				draft.reports = payload;
				break;
			case CandidatesActionTypes.OnImportedRestore:
				draft.reports = payload;
				break;
			case CandidatesActionTypes.resetMessages:
				draft.isMessageDisplayed = payload;
				break;
			default:
				return state;
		}
	});
}
