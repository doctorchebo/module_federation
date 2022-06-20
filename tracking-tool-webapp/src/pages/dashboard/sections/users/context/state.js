import produce from 'immer';
import { UsersActionTypes } from './enums';
import { all, pagination } from './../locale/en.json';

/**
 * Set an initial state for users view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		title: 'Users',
		errorMessages: [],
		users: [],
		reports: null,
		fileTypes: '.csv .xlsx',
		loading: false,
		sideBar: false,
		roles: [],
		role: all,
		pagination: {
			currentPage: 1,
			pageSize: pagination.defaultSize,
			totalPages: 1,
			sort: pagination.defaultSort,
			filterValue: '',
			filterOption: '',
			criteria: '',
			totalResults: 10,
		},
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
			case UsersActionTypes.load:
				draft.users = payload.data;
				draft.pagination = {
					...payload.pagination,
					totalResults: payload.pagination.totalCount,
				};
				break;
			case UsersActionTypes.loading:
				draft.loading = payload;
				break;
			case UsersActionTypes.OnImportUsers:
				draft.reports = payload;
				break;
			case UsersActionTypes.OnImportedRestore:
				draft.importedResponse = payload;
				break;
			case UsersActionTypes.Error:
				draft.errorMessages = payload;
				break;
			case UsersActionTypes.loadRoles:
				draft.roles = payload;
				break;
			case UsersActionTypes.SaveRole:
				draft.role = payload;
				break;
			default:
				return state;
		}
	});
}
