import produce from 'immer';
import { ApprovalHistoryActionTypes } from './enums';

/**
 * @returns {object} Init State.
 */
export function State() {
	return {
		errorMessages: [],
		programVersion: [],
		activities: [],
		postulantsApproved: [],
		postulantsFailed: [],
		postulantsInProgress: [],
		infTalkApproved: [],
		infTalkFailed: [],
		infTalkInProgress: [],
		loading: false,
	};
}

/**
 * @param {object} state Actual State.
 * @param {object} action Action perfomed.
 * @returns {object} New State.
 */
export function Reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case ApprovalHistoryActionTypes.loadProgramVersion:
			return produce(state, (draft) => {
				draft.programVersion = payload;
			});
		case ApprovalHistoryActionTypes.error:
			return produce(state, (draft) => {
				draft.errorMessages = payload;
			});
		case ApprovalHistoryActionTypes.loadActivities:
			return produce(state, (draft) => {
				draft.activities = payload;
			});
		case ApprovalHistoryActionTypes.loadPostulationsApproved:
			return produce(state, (draft) => {
				draft.postulantsApproved = payload;
			});
		case ApprovalHistoryActionTypes.loadPostulationsFailed:
			return produce(state, (draft) => {
				draft.postulantsFailed = payload;
			});
		case ApprovalHistoryActionTypes.loadPostulationsInProgress:
			return produce(state, (draft) => {
				draft.postulantsInProgress = payload;
			});
		case ApprovalHistoryActionTypes.loadInfTalksApproved:
			return produce(state, (draft) => {
				draft.infTalkApproved = payload;
			});
		case ApprovalHistoryActionTypes.loadInfTalksInProgress:
			return produce(state, (draft) => {
				draft.infTalkInProgress = payload;
			});
		case ApprovalHistoryActionTypes.loadInfTalksFailed:
			return produce(state, (draft) => {
				draft.infTalkFailed = payload;
			});
		case ApprovalHistoryActionTypes.loading:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		default:
			return state;
	}
}
