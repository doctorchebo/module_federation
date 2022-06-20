import produce from 'immer';
import { ProgramVersionsActionTypes } from './enums';

/**
 * Set an initial state for program versions page
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		title: 'Program versions',
		status: [],
		programs: [],
		coordinators: [],
		errorMessages: [],
		programVersions: [],
		stages: [],
		trainers: [],
		reports: null,
		fileTypes: '.json',
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
 * Reducer for program versions page
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case ProgramVersionsActionTypes.load:
				draft.programVersions = payload.data;
				draft.pagination = payload.pagination;
				break;
			case ProgramVersionsActionTypes.loading:
				draft.loading = payload;
				break;
			case ProgramVersionsActionTypes.OnImportVersion:
				draft.reports = payload;
				break;
			case ProgramVersionsActionTypes.OnImportedRestore:
				draft.importedResponse = payload;
				break;
			case ProgramVersionsActionTypes.Error:
				draft.errorMessages = payload;
				break;
			case ProgramVersionsActionTypes.onGetStages:
				draft.stages = payload;
				break;
			case ProgramVersionsActionTypes.onGetTrainers:
				draft.trainers = payload;
				break;
			case ProgramVersionsActionTypes.loadStatus:
				draft.status = payload;
				break;
			case ProgramVersionsActionTypes.loadPrograms:
				draft.programs = payload;
				break;
			case ProgramVersionsActionTypes.loadCoordinators:
				draft.coordinators = payload.data;
				break;
			default:
				return state;
		}
	});
}
