import produce from 'immer';
import { ScholarsActionTypes } from './enums';
import { ProgramVersionsActionTypes } from '../../programVersions/context/enums';

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
		fileTypes: '.csv .xlsx',
		pagination: {
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
		},
		loading: false,
		rightSideBar: false,
		rightSideBarProgram: false,
		selectedScholar: {},
		showEventForm: false,
		showChangeStatusForm: false,
		programsInProgress: [],
		programVersions: [],
		statusType: [],
		applicantsType: [],
		isChangePaginator: false,
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
			case ScholarsActionTypes.load:
				draft.scholars = payload.data;
				draft.pagination = payload.pagination;
				break;
			case ScholarsActionTypes.loading:
				draft.loading = payload;
				break;
			case ScholarsActionTypes.onSelectScholar:
				draft.selectedScholar = payload;
				break;
			case ScholarsActionTypes.OnImportScholar:
				draft.reports = payload;
				break;
			case ScholarsActionTypes.OnImportedRestore:
				draft.reports = payload;
				break;
			case ScholarsActionTypes.Error:
				draft.errorMessages = payload;
				break;
			case ScholarsActionTypes.onSelectEvent:
				draft.selectedEvent = payload;
				break;
			case ScholarsActionTypes.openRightSideBarEvent:
				draft.rightSideBar = payload.rightSideBar;
				draft.showEventForm = payload.showEventForm;
				draft.showChangeStatusForm = payload.showChangeStatusForm;
				break;
			case ScholarsActionTypes.openRightSideBarProgram:
				draft.rightSideBarProgram = payload.rightSideBarProgram;
				break;
			case ScholarsActionTypes.loadProgramsInProgress:
				draft.programsInProgress = payload;
				break;
			case ProgramVersionsActionTypes.load:
				draft.programVersions = payload;
				break;
			case ScholarsActionTypes.loadStatus:
				draft.statusType = payload;
				break;
			case ScholarsActionTypes.loadApplicantsTypes:
				draft.applicantsType = payload;
				break;
			case ScholarsActionTypes.OnChangePagination:
				draft.isChangePaginator = payload;
				break;
			default:
				return state;
		}
	});
}
