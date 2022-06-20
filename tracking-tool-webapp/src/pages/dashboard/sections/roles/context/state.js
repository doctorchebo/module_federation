import produce from 'immer';
import { RolesActionTypes } from './enums';

/**
 * Set an initial state for users view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		title: 'Roles',
		errorMessages: [],
		roles: [],
		permissions: [],
		reports: null,
		pagination: {
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
		},
		loading: false,
		sideBar: false,
	};
}

/**
 * Reducer for roles view.
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case RolesActionTypes.loadRoles:
				draft.roles = payload.data;
				draft.pagination = payload.pagination;
				break;
			case RolesActionTypes.loadPermissions:
				draft.permissions = payload;
				break;
			case RolesActionTypes.loading:
				draft.loading = payload;
				break;
			case RolesActionTypes.Error:
				draft.errorMessages = payload;
				break;
			default:
				return state;
		}
	});
}
