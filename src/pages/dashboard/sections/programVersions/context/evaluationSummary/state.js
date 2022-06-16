import produce from 'immer';
import { EvaluationSummaryActionTypes } from './enums';

/**
 * @returns {object} Init State.
 */
export function State() {
	return {
		errorMessages: [],
		loading: false,
		sendEvaluation: false,
		programVersion: [],
		stages: [],
		pendingScholars: [],
		approvedScholars: [],
		failedScholars: [],
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
		case EvaluationSummaryActionTypes.loading:
			return produce(state, (draft) => {
				draft.loading = payload;
			});
		case EvaluationSummaryActionTypes.sendEvaluation:
			return produce(state, (draft) => {
				draft.sendEvaluation = payload;
			});
		case EvaluationSummaryActionTypes.getStages:
			return produce(state, (draft) => {
				draft.stages = payload.data;
			});
		case EvaluationSummaryActionTypes.loadScholars:
			return produce(state, (draft) => {
				draft.pendingScholars = payload.pendingScholars;
				draft.approvedScholars = payload.approvedScholars;
				draft.failedScholars = payload.failedScholars;
			});
		case EvaluationSummaryActionTypes.loadProgramVersion:
			return produce(state, (draft) => {
				draft.programVersion = payload;
			});
		case EvaluationSummaryActionTypes.error:
			return produce(state, (draft) => {
				draft.errorMessages = payload;
			});
		default:
			return state;
	}
}
