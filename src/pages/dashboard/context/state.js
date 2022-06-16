import produce from 'immer';
import { DashBoardActions } from './enums';

/**
 *
 * @returns {object} - Context Initial State.
 */
export function State() {
	return {
		importing: false,
		dimmed: false,
		title: '',
		fileTypes: '',
		reports: null,
		loading: false,
		errorMessages: [],
		handleImport: () => null,
		validateFunction: () => null,
	};
}

/**
 *
 * @param {object} state - actual state.
 * @param {object} action - action to change the state.
 * @returns {object} - new state.
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case DashBoardActions.SetImportContent:
			return produce(state, (draft) => {
				draft.title = payload.title;
				draft.fileTypes = payload.fileTypes;
				draft.handleImport = payload.handleImport;
				draft.validateFunction = payload.validateFunction;
			});
		case DashBoardActions.OnImporting:
			return produce(state, (draft) => {
				draft.importing = payload;
				draft.dimmed = payload;
			});
		case DashBoardActions.OnReports:
			return produce(state, (draft) => {
				draft.reports = payload;
			});
		case DashBoardActions.Loading:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		case DashBoardActions.OnDimmed:
			return produce(state, (draft) => {
				draft.dimmed = payload;
			});
		case DashBoardActions.Error:
			return produce(state, (draft) => {
				draft.errorMessages = payload;
			});
		default:
			return state;
	}
}
