import produce from 'immer';
import { ScholarDetailActions } from './enums';

/**
 *
 * @returns {object} - Context Initial State.
 */
export function State() {
	return {
		data: undefined,
		error: undefined,
		loading: true,
		success: true,
		trainnings: [],
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
		case ScholarDetailActions.onGetScholarById:
			return produce(state, (draft) => {
				draft.data = payload;
				draft.success = true;
				draft.loading = false;
			});
		case ScholarDetailActions.Loading:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		case ScholarDetailActions.Error:
			return produce(state, (draft) => {
				draft.error = payload;
				draft.success = false;
				draft.loading = false;
			});
		default:
			return state;
	}
}
