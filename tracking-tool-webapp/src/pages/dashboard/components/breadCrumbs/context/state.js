import produce from 'immer';
import { BreadcrumbsActionTypes } from './enums';

/**
 * Set an initial state for users view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		breadCrumbs: {},
	};
}

/**
 * Reducer for users view.
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case BreadcrumbsActionTypes.load:
				draft.breadCrumbs = payload;
				break;
			default:
				return state;
		}
	});
}
