import produce from 'immer';
import { StatusActionTypes } from './enums';

/**
 * Set an initial state for scholars view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		loadingStatusHistory: false,
		scholarStatusHistory: [],
		showFormEvent: false,
		selectedStatusHistory: {},
		eventTypes: [],
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
			case StatusActionTypes.loadingStatusHistory:
				draft.loadingStatusHistory = payload;
				break;
			case StatusActionTypes.onStatusHistoryGet:
				draft.scholarStatusHistory = payload;
				break;
			case StatusActionTypes.onStatusHistorySelect:
				draft.selectedStatusHistory = payload;
				break;
			case StatusActionTypes.onStatusHistoryUpdate:
				draft.scholarStatusHistory = draft.scholarStatusHistory.map((statusHistory) =>
					statusHistory.id === payload.id ? payload : statusHistory
				);
				break;
			default:
				return state;
		}
	});
}
