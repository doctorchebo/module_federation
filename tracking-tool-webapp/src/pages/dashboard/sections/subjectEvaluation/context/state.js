import produce from 'immer';
import { ScholarsActionTypes } from './enums';

/**
 * Set an initial state for scholars view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		title: 'Scholars',
		errorMessages: [],
		scholars: [],
		data: {},
		reports: null,
		pagination: {
			currentPage: 1,
			pageSize: 5,
			totalCount: 0,
		},
		loading: false,
		sendEvaluation: false,
		stages: [],
	};
}

/**
 * Reducer for subjects view.
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case ScholarsActionTypes.loadScholars:
				draft.scholars = payload.data;
				draft.pagination = payload.pagination;
				break;
			case ScholarsActionTypes.loading:
				draft.loading = payload;
				break;
			case ScholarsActionTypes.Error:
				draft.errorMessages = payload;
				break;
			case ScholarsActionTypes.getStages:
				return produce(state, (draft) => {
					draft.stages = payload.data;
				});
			default:
				return state;
		}
	});
}
