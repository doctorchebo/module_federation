import produce from 'immer';
import { ProgramVersionDetailsActionTypes } from './enums';

/**
 * @returns {object} Init State.
 */
export function State() {
	return {
		errorMessages: [],
		programVersion: [],
		activities: [],
		candidates: [],
		promoteCandidates: false,
		allCandidates: [],
		postulantsInProgress: [],
		infTalkInProgress: [],
		loading: false,
		load: false,
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
		case ProgramVersionDetailsActionTypes.loadProgramVersion:
			return produce(state, (draft) => {
				draft.programVersion = payload;
			});
		case ProgramVersionDetailsActionTypes.error:
			return produce(state, (draft) => {
				draft.errorMessages = payload;
			});
		case ProgramVersionDetailsActionTypes.loadActivities:
			return produce(state, (draft) => {
				draft.activities = payload;
			});
		case ProgramVersionDetailsActionTypes.loadCandidatesActivities:
			return produce(state, (draft) => {
				draft.candidates = payload;
			});
		case ProgramVersionDetailsActionTypes.loadCandidates:
			return produce(state, (draft) => {
				draft.candidates = payload;
				draft.allCandidates = payload;
			});
		case ProgramVersionDetailsActionTypes.loadPromoteCandidatesBetweenActivities:
			return produce(state, (draft) => {
				draft.promoteCandidates = payload;
			});
		case ProgramVersionDetailsActionTypes.loadInfTalksInProgress:
			return produce(state, (draft) => {
				draft.infTalkInProgress = payload;
			});
		case ProgramVersionDetailsActionTypes.loadPostulationsInProgress:
			return produce(state, (draft) => {
				draft.postulantsInProgress = payload;
			});
		case ProgramVersionDetailsActionTypes.loadingActivities:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		case ProgramVersionDetailsActionTypes.loading:
			return produce(state, (draft) => {
				draft.load = payload;
			});
		default:
			return state;
	}
}
